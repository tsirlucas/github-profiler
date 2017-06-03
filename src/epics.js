import {combineEpics} from 'redux-observable';

import notesEpics from './core/notes/notes.epics';
import {searchUserEpic as userEpic} from './core/user/user.epics';

const handleUncaughtErrors = (error, stream) => {
    //Loging uncaught errors and returning stream (avoids epics to break)
    console.error('Uncaught', error);
    return stream;
};

export const epics = (action$, store) => combineEpics(
    userEpic,
    notesEpics
)(action$, store)
    .catch(handleUncaughtErrors);
