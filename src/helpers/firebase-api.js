import fetch from 'isomorphic-fetch';

const request = (user, method, params = {}, noteId) => {

    let config = {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (method !== 'GET') {
        config.body = JSON.stringify(params)
    }

    return fetch(`https://github-profiler-1ac46.firebaseio.com/${user}/notes/${noteId || ''}.json?format=export`, config)
};

export const listNotes = (user) => request(user, 'GET');

export const addNote = (user, params) => request(user, 'PATCH', params);


export const editNote = (user, params) => request(user, 'PATCH', params);

export const removeNote = (user, params) => request(user, 'DELETE', params, params.id);
