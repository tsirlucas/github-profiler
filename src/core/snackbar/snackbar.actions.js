import {POP_MESSAGE, CLEAR_SNACKBAR} from './snackbar.constants';

export const clearSnackBar = () => ({type: CLEAR_SNACKBAR});

export const popMessage = (message) => ({type: POP_MESSAGE, payload: message});
