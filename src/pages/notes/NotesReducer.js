import {ADD_NOTE, REMOVE_NOTE, EDIT_NOTE, LIST_NOTES} from './NotesActionsTypes';

const NotesReducer = (state = {notes: []}, action) => {
    switch (action.type) {
        case LIST_NOTES:
            return {notes: [...action.data]};
        case ADD_NOTE:
            return {
                notes: [
                    ...state.notes,
                    action.data
                ]
            };
        case REMOVE_NOTE:
            return {
                notes: state.notes.filter((note) => {
                    return note.id !== action.data.id;
                })
            };
        case EDIT_NOTE:
            return {
                notes: state.notes.map((note) => {
                    if (note.id === action.data.note.id) {
                        note.text = action.data.text;
                    }
                    return note;
                })
            };
        default:
            return state;
    }
};

export default NotesReducer;
