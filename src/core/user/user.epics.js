import {route} from 'preact-router';

import baseUrl from '../../util/baseUrl';
import {getUser, getRepos} from '../api';
import {SEARCH_USER} from './user.constants';
import * as Rxjs from '../../util/rx.imports';
import {listNotes} from '../../core/notes/notes.actions';
import {searchUserError, resolveUser} from './user.actions';
import handleHttpRequest from '../../util/handleHttpRequest';

const requestInfo = payload =>
	Rxjs.Observable.forkJoin(
		getUser(payload),
		getRepos(payload)
	);

export const searchUserEpic = (action$, store) =>
	action$
		.ofType(SEARCH_USER)
		.concatMap(({payload}) => requestInfo(payload)
			.map(([user, repos]) => {
				store.dispatch(resolveUser(user.response, repos.response));
				route(baseUrl + '/user');
				return listNotes(user.response.login);
			})
			.catch((err) => handleHttpRequest(err, searchUserError)));
