import {POP_MESSAGE, CLEAR_SNACKBAR} from './snackbar.constants';

const SnackBarReducer = (state = {}, action) => {
	switch (action.type) {
		case POP_MESSAGE:
			return state.merge({text: action.payload});
		case CLEAR_SNACKBAR:
			return {};
		default:
			return state;
	}
};

export default SnackBarReducer;
