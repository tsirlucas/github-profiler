import {
    ADD_NOTE,
    ADD_NOTE_ERROR,
    RESOLVE_ADD_NOTE,
    REMOVE_NOTE,
    RESOLVE_EDIT_NOTE,
    RESOLVE_LIST_NOTES
} from './notes.constants';

const NotesReducer = (state = {content: []}, {payload, type}) => {
    switch (type) {
        case RESOLVE_LIST_NOTES:
            return {content: [...payload]};
        case ADD_NOTE:
            return {
                sending: true,
                content: state.content
            };
        case ADD_NOTE_ERROR:
            return {
                sending: false,
                content: state.content
            };
        case RESOLVE_ADD_NOTE:
            return {
                sending: false,
                content: [
                    ...state.content,
                    payload,
                ]
            };
        case REMOVE_NOTE:
            return {
                content: state.content.filter((note) => {
                    return note.id !== payload.note.id;
                })
            };
        case RESOLVE_EDIT_NOTE:
            return {
                content: state.content.map((note) => {
                    if (note.id === payload.note.id) {
                        note.text = payload.note.text;
                    }
                    return note;
                })
            };
        default:
            return state;
    }
};

export default NotesReducer;
