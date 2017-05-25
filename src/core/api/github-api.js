import fetch from 'isomorphic-fetch';

const request = (searchText ,path = '') => {
    const apiUrl = `https://api.github.com/users/${searchText}`;
    return fetch(apiUrl + path)
        .then((response) => response.json());
};

export const getUser = (searchText) => request(searchText);

export const getRepos = (searchText) => request(searchText, '/repos?');
