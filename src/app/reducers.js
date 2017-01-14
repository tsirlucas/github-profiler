import {combineReducers} from 'redux'
import UserReducer from './home/components/User/UserReducer.js'
import NotesReducer from './home/components/Notes/NotesReducer.js'

const reducers = combineReducers({
    UserReducer,
    NotesReducer
});

export default reducers