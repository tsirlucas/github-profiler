import {CHANGE_ROUTE} from './router.constants';

export const changeRoute = path => ({
	type: CHANGE_ROUTE,
	payload: {path}
});
