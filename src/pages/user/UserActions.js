import {SEARCH_USER} from './UserActionsTypes';
import {getUser, getRepos} from '../../core/api/github-api';

export default searchText => {
    let user, repos;
    return dispatch => Promise.all([getUser(searchText), getRepos(searchText)])
        .then(([user, repos]) =>
            dispatch({type: SEARCH_USER, payload: {user, repos}}))
        .catch((err) =>
            dispatch({type: SEARCH_USER + '_ERROR', payload: {user, repos}}));
}


