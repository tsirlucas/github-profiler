import {combineEpics} from 'redux-observable';

import {searchUserEpic as userEpic} from './core/user/user.epics';
import notesEpics from './core/notes/notes.epics';

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
