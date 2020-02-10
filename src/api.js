import axios from "axios";

const apiAddress = "http://localhost:3500";

export async function getSchema () {
	const response = await axios.get(`${apiAddress}/schema/get`);

	return Object.entries(response.data).map(vendor => {
		return {
			vendor: vendor[0],
			boards: vendor[1]
		}
	});
}

export function getFiles () {
	return axios.get(`${apiAddress}/files/getAll`);
}

export function getFilesByStruct (struct) {
	return axios.post(`${apiAddress}/files/getByStruct`, {
		body: JSON.stringify(struct)
	});
}
