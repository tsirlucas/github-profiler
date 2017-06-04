import {POP_MESSAGE, CLEAR_SNACKBAR} from './snackbar.constants';

const SnackBarReducer = (state = {}, action) => {
	switch (action.type) {
		case POP_MESSAGE:
			return {text: action.payload};
		case CLEAR_SNACKBAR:
			return {};
		default:
			return {};
	}
};

export default SnackBarReducer;
