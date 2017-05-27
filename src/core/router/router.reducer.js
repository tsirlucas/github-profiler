import {CHANGE_ROUTE} from './router.constants';

const initialState = {
	path: '/'
};

export const RouterReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_ROUTE:
			return {
				...state,
				path: action.payload.path
			};
		default:
			return state;
	}
};

export default RouterReducer;
