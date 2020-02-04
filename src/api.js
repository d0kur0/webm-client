import axios from "axios";
const apiAddress = "http://localhost:3500";

export function getSchema () {
	return axios.get(`${apiAddress}/schema/get`)
}

export function getFiles () {
	return axios.get(`${apiAddress}/files/getAll`)
}

export function getFilesByStruct (struct) {
	return axios.post(`${apiAddress}/files/getByStruct`, {
		body: JSON.stringify(struct)
	});
}
