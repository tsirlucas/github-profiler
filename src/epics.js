import {combineEpics} from 'redux-observable';

import {store} from './store';
import notesEpics from './core/notes/notes.epics';
import {popMessage} from './core/snackbar/snackbar.actions';
import {searchUserEpic as userEpic} from './core/user/user.epics';

const handleUncaughtErrors = (error, stream) => {
	// Loging uncaught errors and returning stream (avoids epics to break)
	store.dispatch(popMessage('Some error occurred, please try again.'));
	console.error('Uncaught', error);
	return stream;
};

export const epics = (action$, store) => combineEpics(
	userEpic,
	notesEpics
)(action$, store)
	.catch(handleUncaughtErrors);
