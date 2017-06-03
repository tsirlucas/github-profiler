import {concatMap} from 'rxjs/add/operator/mergeMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs/Observable';

import {ADD_NOTE, REMOVE_NOTE, EDIT_NOTE, LIST_NOTES} from './notes.constants';
import {addNote, editNote, removeNote, listNotes} from '../api';
import {
    listNotes as listNotesAction,
    addNoteError,
    resolveListNotes,
    resolveAddNotes,
    resolveEditNote
} from './notes.actions';
import {firebaseParser, getLastId} from '../api/firebase-parser.service';

let nextActionId = 0;

const listNotesEpic = (action$) =>
    action$
        .ofType(LIST_NOTES)
        .mergeMap(({payload}) => listNotes(payload.user)
            .map(({response}) => {
                response = firebaseParser(response);
                nextActionId = getLastId(response);
                return resolveListNotes(response)
            }));

const addNoteEpic = (action$) =>
    action$
        .ofType(ADD_NOTE)
        .mergeMap(({payload}) => addNote(payload.user, {[nextActionId]: payload.note})
            .map(() => resolveAddNotes({id: nextActionId++, text: payload.note}))
            .catch(() => Observable.of(addNoteError())));

const removeNoteEpic = (action$, store) => {
    const {user} = store.getState();
    return action$
        .ofType(REMOVE_NOTE)
        .mergeMap(({payload}) => removeNote(payload.user, payload.note)
            .map(() => listNotesAction(user.login))
            .catch(() => Observable.of(resolveAddNotes(payload.note))));
};

const editNoteEpic = (action$) =>
    action$
        .ofType(EDIT_NOTE)
        .mergeMap(({payload}) => editNote(payload.user, {[payload.note.id]: payload.text})
            .map(() => resolveEditNote(payload.note, payload.text)));

export default combineEpics(listNotesEpic, addNoteEpic, removeNoteEpic, editNoteEpic);
