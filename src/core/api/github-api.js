import {ajax} from 'rxjs/observable/dom/ajax';

export default (searchText ,path = '') => {
    const apiUrl = `https://api.github.com/users/${searchText}`;
    return ajax({
        method: 'get',
        url: apiUrl + path,
        responseType: 'json'
    });
};
