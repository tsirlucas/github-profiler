import {concatMap} from 'rxjs/add/operator/mergeMap';

import {ADD_NOTE, REMOVE_NOTE, EDIT_NOTE, LIST_NOTES} from './notes.constants';
import {addNote, editNote, removeNote, listNotes} from '../api';
import {
    listNotes as listNotesAction,
    resolveListNotes,
    resolveAddNotes,
    resolveEditNote
} from './notes.actions';
import {firebaseParser, getLastId} from '../api/firebase-parser.service';

let nextActionId = 0;

export const listNotesEpic = (action$) =>
    action$
        .ofType(LIST_NOTES)
        .mergeMap(({payload}) => listNotes(payload.user)
            .map(({response}) => {
                response = firebaseParser(response);
                nextActionId = getLastId(response);
                return resolveListNotes(response)
            }));

export const addNoteEpic = (action$) =>
    action$
        .ofType(ADD_NOTE)
        .mergeMap(({payload}) => addNote(payload.user, {[nextActionId]: payload.note})
            .map(() => resolveAddNotes({id: nextActionId++, text: payload.note})));

export const removeNoteEpic = (action$, store) =>
    action$
        .ofType(REMOVE_NOTE)
        .mergeMap(({payload}) => removeNote(payload.user, payload.note)
            .map(() => {
                const {user} = store.getState();
                return listNotesAction(user.login);
            }));

export const editNoteEpic = (action$) =>
    action$
        .ofType(EDIT_NOTE)
        .mergeMap(({payload}) => editNote(payload.user, {[payload.note.id]: payload.text})
            .map(() => resolveEditNote(payload.note, payload.text)));
