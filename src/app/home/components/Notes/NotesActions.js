import {ADD_NOTE, REMOVE_NOTE, EDIT_NOTE, LIST_NOTES} from './NotesActionsTypes';
import {addNote, editNote, removeNote, listNotes} from '../../../../../src/helpers/firebase-api';

let nextActionId = 0;

export const listNotesAction = user =>
    dispatch => listNotes(user)
        .then(data => dispatch({type: LIST_NOTES, data}));

export const addNoteAction = (note, user) =>
    dispatch => addNote(user, {[nextActionId]: note})
        .then(() => dispatch({type: ADD_NOTE, data: {id: nextActionId++, text: note}}));

export const removeNoteAction = (note, user) =>
    dispatch => removeNote(user, note)
        .then(() => dispatch({type: REMOVE_NOTE, data: note}));

export const editNoteAction = (note, text, user) =>
    dispatch => editNote(user, {[note.id]: text})
        .then(() => dispatch({type: EDIT_NOTE, data: {note: note, text: text}}));
