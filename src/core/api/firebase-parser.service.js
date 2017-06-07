export const firebaseParser = (data) => {
	switch (true) {
		case data && data.constructor === Array:
			return data.map(item => item ? {id: data.indexOf(item), text: item} : null)
				.filter(item => item);

		case (data !== null && typeof data === 'object'):
			return Object.keys(data).map(item => ({id: parseInt(item, 10), text: data[item]}))
				.filter(item => item.text !== null);
		default:
			return [];
	}
};

export const getLastId = (arr) => {
	const response = arr || [];
	const lastItem = response[response.length - 1];
	return lastItem ? lastItem.id + 1 : 0;
};
