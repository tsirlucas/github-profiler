import {ajax} from 'rxjs/observable/dom/ajax';

export default (user, method, params = {}, noteId = '') => {
	const config = {
		method,
		url: `https://github-profiler-1ac46.firebaseio.com/${user.toLowerCase()}/notes/${noteId}.json?format=export`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		responseType: 'json'
	};

	if (method !== 'GET') {
		config.body = JSON.stringify(params);
	}

	return ajax(config);
};
