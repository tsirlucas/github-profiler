import is from 'is_js';

export const firebaseParser = (data) => {
    switch (true) {
        case is.array(data):
            return data.map(item => item ? {id: data.indexOf(item), text: item} : null)
                .filter((item) => item);

        case (is.object(data) && !data.hasOwnProperty('error')):
            return Object.keys(data).map(item => {
                return {'id': parseInt(item, 10), 'text': data[item]}
            })
                .filter(item => is.not.null(item.text));
        default:
            return []
    }
};

export const getLastId = (arr) => {
    const response = arr || [];
    const lastItem = response[response.length - 1];
    return lastItem ? lastItem.id + 1 : 0;
};
