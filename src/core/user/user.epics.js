import * as rxjs from './index';
import {SEARCH_USER} from './user.constants';
import {resolveUser} from './user.actions';
import {listNotes} from '../../core/notes/notes.actions';
import {getUser, getRepos} from '../api';
import {dispatchChangeRoute} from '../router/router.service';

const requestInfo = (payload) =>
    rxjs.Observable.forkJoin(
        getUser(payload),
        getRepos(payload)
    );

export const searchUserEpic = (action$, store) => {
    let user, repos;
    return action$
        .ofType(SEARCH_USER)
        .concatMap(({payload}) => requestInfo(payload)
            .map(([user, repos]) => resolveUser(user.response, repos.response))
            .finally(() => {
                const {user} = store.getState();
                store.dispatch(listNotes(user.login));
                return dispatchChangeRoute('/user')
            })
            .catch(console.log.bind(console)));
};
