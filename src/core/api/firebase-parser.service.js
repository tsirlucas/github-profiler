import is from 'is_js';

export default (data) => {
    switch (true) {
        case is.array(data):
            return data.map(item => item ? {id: data.indexOf(item), text: item} : null)
                .filter((item) => item);

        case (is.object(data) && !data.hasOwnProperty('error')):
            return Object.keys(data).map(item => {
                return {'id': item, 'text': data[item]}
            })
                .filter(item => is.not.null(item.text));
        default:
            return []
    }
};
