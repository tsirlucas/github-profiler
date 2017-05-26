import {ADD_NOTE, REMOVE_NOTE, EDIT_NOTE, LIST_NOTES} from './notes.constants';

const NotesReducer = (state = [], {payload, type}) => {
    switch (type) {
        case LIST_NOTES:
            return [...payload];
        case ADD_NOTE:
            return [
                ...state,
                payload.note
            ];
        case REMOVE_NOTE:
            return state.filter((note) => {
                return note.id !== payload.note.id;
            });
        case EDIT_NOTE:
            return state.map((note) => {
                if (note.id === payload.note.id) {
                    note.text = payload.note.text;
                }
                return note;
            });
        default:
            return state;
    }
};

export default NotesReducer;
