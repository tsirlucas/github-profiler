import {SEARCH_USER} from './user.constants';
import {getUser, getRepos} from '../api';
import {dispatchChangeRoute} from '../../core/router/router.service';

export default searchText => {
    let user, repos;
    return dispatch => Promise.all([getUser(searchText), getRepos(searchText)])
        .then(([user, repos]) =>
            dispatch({type: SEARCH_USER, payload: {user, repos}}))
        .then(() => dispatchChangeRoute('/user'))
        .catch((err) =>
            dispatch({type: SEARCH_USER + '_ERROR', payload: {user, repos}}));
}


