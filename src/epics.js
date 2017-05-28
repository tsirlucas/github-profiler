import {combineEpics} from 'redux-observable';

import {searchUserEpic} from './core/user/user.epics';
import {listNotesEpic, addNoteEpic, removeNoteEpic, editNoteEpic} from './core/notes/notes.epics';

export const epics = combineEpics(
    searchUserEpic,
    listNotesEpic,
    addNoteEpic,
    removeNoteEpic,
    editNoteEpic
);
