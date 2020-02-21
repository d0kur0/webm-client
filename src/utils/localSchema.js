export function getLocalSchema () {
	if (!localStorage.localSchema) return false;

	let localSchema;
	try {
		localSchema = JSON.parse(localStorage.localSchema);
	} catch {
		return false;
	}

	return localSchema;
}

export function saveLocalSchema (schema) {
	localStorage.localSchema = JSON.stringify(schema);
}

export function mergeSchemes (serverSchema) {
	const localSchema = getLocalSchema();

	const getLocalVendor = vendor => localSchema.filter(schema => schema.vendor === vendor)[0];
	const getLocalBoard = (vendor, board) => {
		const localVendor = getLocalVendor(vendor);
		if (!localVendor) return false;

		return localVendor.boards.filter(eachBoard => eachBoard.name === board)[0];
	};

	return serverSchema.map(schema => {
		const localVendor = getLocalVendor(schema.vendor);
		if (localVendor) schema.expanded = localVendor.expanded;

		schema.boards = schema.boards.map(board => {
			const localBoard = getLocalBoard(schema.vendor, board.name);
			if (localBoard) board.disabled = localBoard.disabled;

			return board;
		});

		return schema;
	});
}
