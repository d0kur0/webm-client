import axios from "axios";

const apiAddress = "http://localhost:3500";

export async function getSchema () {
	let response;
	try {
		response = await axios.get(`${apiAddress}/schema/get`);
	} catch (e) {
		console.log("Error load schema");
		return false;
	}

	return Object.entries(response.data).map(schema => {
		const [ vendor, boards ] = schema;

		return {
			vendor: vendor,
			expanded: true,
			boards: boards.map(board => ({...board, disabled: false}))
		}
	});
}

export async function getFilesByStruct (struct) {
	struct = struct || await getSchema();
	if (!struct) return false;

	let requestStruct = { vendors: {} };

	struct.forEach(schema => {
		if (schema.expanded) {
			requestStruct.vendors[schema.vendor] = schema.boards.
				filter(board => !board.disabled).
				map(board => board.name)
		}
	});

	let files = [];
	let response;

	try {
		response = await axios.post(`${apiAddress}/files/getByStruct`, JSON.stringify(requestStruct));
	} catch (e) {
		return Promise.reject(new Error("Error load files by struct"));
	}

	Object.entries(response.data.vendors).forEach(schema => {
		const [ vendor, boards ] = schema;

		if (!boards) return;
		boards.forEach(board => {
			board.threads.forEach(thread => {
				thread.files.forEach(file => {
					files.push({
						name:     file.name,
						path:     file.path,
						board:    board.name,
						vendor:   vendor,
						preview:  file.preview,
						threadId: file.threadId
					});
				});
			});
		});
	});

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
