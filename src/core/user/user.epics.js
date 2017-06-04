import * as Rxjs from './index';
import {getUser, getRepos} from '../api';
import {SEARCH_USER} from './user.constants';
import {listNotes} from '../../core/notes/notes.actions';
import {searchUserError, resolveUser} from './user.actions';
import {dispatchChangeRoute} from '../router/router.service';

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
				store.dispatch(listNotes(user.response.login));
				store.dispatch(resolveUser(user.response, repos.response));
				return dispatchChangeRoute('/user');
			})
			.catch(() => Rxjs.Observable.of(searchUserError())));
