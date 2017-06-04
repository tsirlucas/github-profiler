import {combineReducers} from 'redux';

import UserReducer from './core/user/user.reducer';
import NotesReducer from './core/notes/notes.reducer';
import RoutesReducer from './core/router/router.reducer';
import SnackBarReducer from './core/snackbar/snackbar.reducer';

const reducers = combineReducers({
	user: UserReducer,
	notes: NotesReducer,
	route: RoutesReducer,
	snackbar: SnackBarReducer
});

export default reducers;
