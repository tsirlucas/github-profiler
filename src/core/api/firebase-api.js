import {ajax} from 'rxjs/observable/dom/ajax';

export default (user, method, params = {}, noteId = '') => {
    let config = {
        method,
        url: `https://github-profiler-1ac46.firebaseio.com/${user}/notes/${noteId}.json?format=export`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        responseType: 'json'
    };

    if (method !== 'GET') {
        config.body = JSON.stringify(params)
    }

    return ajax(config)
};
