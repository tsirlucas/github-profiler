import {combineReducers} from 'redux'
import UserReducer from '../home/components/User/UserReducer.jsx'
import NotesReducer from '../home/components/Notes/NotesReducer.jsx'

const reducers = combineReducers({
    UserReducer,
    NotesReducer
});

export default reducers