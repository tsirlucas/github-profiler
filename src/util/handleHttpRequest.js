import {Observable} from 'rxjs/Observable';

const handleHttpRequest = (error, handler) => {
	let errorMessage = Observable.throw(error);

	return Observable.concat(
		Observable.of(handler()),
		errorMessage
	);
};

export default handleHttpRequest;
