import {combineReducers} from 'redux';
import UserReducer from './core/user/user.reducer';
import NotesReducer from './core/notes/notes.reducer';

const reducers = combineReducers({
    user: UserReducer,
    notes: NotesReducer
});

export default reducers;
