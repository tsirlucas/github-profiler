import {combineReducers} from 'redux'
import UserReducer from './home/components/User/UserReducer'
import NotesReducer from './home/components/Notes/NotesReducer'

const reducers = combineReducers({
    UserReducer,
    NotesReducer
});

export default reducers