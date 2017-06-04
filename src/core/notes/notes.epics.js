import {combineEpics} from 'redux-observable';

import handleHttpRequest from '../../util/handleHttpRequest';
import {addNote, editNote, removeNote, listNotes} from '../api';
import {firebaseParser, getLastId} from '../api/firebase-parser.service';
import {ADD_NOTE, REMOVE_NOTE, EDIT_NOTE, LIST_NOTES} from './notes.constants';
import {
	addNoteError, removeNoteError, resolveAddNotes,
	resolveEditNote, resolveListNotes, resolveRemoveNote
} from './notes.actions';

let nextActionId = 0;

const listNotesEpic = action$ =>
	action$
		.ofType(LIST_NOTES)
		.mergeMap(({payload}) => listNotes(payload.user)
			.map(({response}) => {
				response = firebaseParser(response);
				nextActionId = getLastId(response);
				return resolveListNotes(response);
			}));

const addNoteEpic = action$ =>
	action$
		.ofType(ADD_NOTE)
		.mergeMap(({payload}) => addNote(payload.user, {[nextActionId]: payload.note})
			.map(() => resolveAddNotes({id: nextActionId++, text: payload.note}))
			.catch((err) => handleHttpRequest(err, addNoteError)));

const removeNoteEpic = (action$) =>
	action$
		.ofType(REMOVE_NOTE)
		.mergeMap(({payload}) => removeNote(payload.user, payload.note)
			.map(() => resolveRemoveNote(payload.note))
			.catch((err) => handleHttpRequest(err, () => removeNoteError(payload.note))));

const editNoteEpic = action$ =>
	action$
		.ofType(EDIT_NOTE)
		.mergeMap(({payload}) => editNote(payload.user, {[payload.note.id]: payload.text})
			.map(() => resolveEditNote(payload.note, payload.text)));

export default combineEpics(listNotesEpic, addNoteEpic, removeNoteEpic, editNoteEpic);
