import {combineReducers} from 'redux';

import UserReducer from './core/user/user.reducer';
import NotesReducer from './core/notes/notes.reducer';
import RoutesReducer from './core/router/router.reducer';

const reducers = combineReducers({
	route: RoutesReducer,
	user: UserReducer,
	notes: NotesReducer
});

export default reducers;
