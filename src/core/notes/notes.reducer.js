import {RESOLVE_ADD_NOTE, RESOLVE_REMOVE_NOTE, RESOLVE_EDIT_NOTE, RESOLVE_LIST_NOTES} from './notes.constants';

const NotesReducer = (state = [], {payload, type}) => {
    switch (type) {
        case RESOLVE_LIST_NOTES:
            return [...payload];
        case RESOLVE_ADD_NOTE:
            return [
                ...state,
                payload
            ];
        case RESOLVE_REMOVE_NOTE:
            return state.filter((note) => {
                return note.id !== payload.note.id;
            });
        case RESOLVE_EDIT_NOTE:
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
