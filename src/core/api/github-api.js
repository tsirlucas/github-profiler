import fetch from 'isomorphic-fetch';

export default (searchText ,path = '') => {
    const apiUrl = `https://api.github.com/users/${searchText}`;
    return fetch(apiUrl + path)
        .then((response) => response.json());
};
