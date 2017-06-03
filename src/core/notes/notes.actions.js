import {
    LIST_NOTES,
    RESOLVE_LIST_NOTES,
    ADD_NOTE,
    ADD_NOTE_ERROR,
    RESOLVE_ADD_NOTE,
    REMOVE_NOTE,
    RESOLVE_REMOVE_NOTE,
    EDIT_NOTE,
    RESOLVE_EDIT_NOTE
} from './notes.constants';

export const listNotes = user => ({type: LIST_NOTES, payload: {user}});

export const resolveListNotes = payload => ({type: RESOLVE_LIST_NOTES, payload});

export const addNote = (note, user) => ({type: ADD_NOTE, payload: {note, user}});

export const addNoteError = (note, user) => ({type: ADD_NOTE_ERROR});

export const resolveAddNotes = payload => ({type: RESOLVE_ADD_NOTE, payload});

export const removeNote = (note, user) => ({type: REMOVE_NOTE, payload: {note, user}});

export const resolveRemoveNote = (note) => ({type: RESOLVE_REMOVE_NOTE, payload: {note}});

export const editNote = (note, text, user) => ({type: EDIT_NOTE, payload: {note, text, user}});

export const resolveEditNote = (note, text) => ({type: RESOLVE_EDIT_NOTE, payload: {note, text}});
