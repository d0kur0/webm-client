import axios from "axios";

const apiAddress = "http://localhost:3500";

export async function getSchema () {
	const response = await axios.get(`${apiAddress}/schema/get`);

	return Object.entries(response.data).map(vendor => {
		return {
			vendor: vendor[0],
			expanded: true,
			boards: vendor[1].map(board => {
				board.disabled = false;
				return board;
			})
		}
	});
}

export async function getFilesByStruct (struct) {
	struct = struct || getSchema();

	let requestStruct = { vendors: {} };
	struct.forEach(schema => {
		if (schema.expanded) {
			requestStruct.vendors[schema.vendor] = schema.boards.filter(board => !board.disabled).map(board => board.name)
		}
	});

	let files = [];
	let response = await axios.post(`${apiAddress}/files/getByStruct`, JSON.stringify(requestStruct));
	Object.entries(response.data.vendors).map(s => s[1] && s[1].map(b => b.threads.map(t => t.files.map(f => {
		files.push({
			name:     f.name,
			path:     f.path,
			preview:  f.preview,
			threadId: f.threadId,
			board:    b.name,
			vendor:   s[0]
		});
	}))));

	let currentIndex = files.length;
	let temporaryValue;
	let randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = files[currentIndex];
		files[currentIndex] = files[randomIndex];
		files[randomIndex] = temporaryValue;
	}


	return files;
}
