import {combineReducers} from 'redux';
import UserReducer from './pages/user/UserReducer';
import NotesReducer from './pages/notes/NotesReducer';

const reducers = combineReducers({
    UserReducer,
    NotesReducer
});

export default reducers;
