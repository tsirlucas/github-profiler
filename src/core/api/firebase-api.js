import fetch from 'isomorphic-fetch';

export default (user, method, params = {}, noteId = '') => {
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

    return fetch(`https://github-profiler-1ac46.firebaseio.com/${user}/notes/${noteId}.json?format=export`, config)
        .then(result => result.json())
};
