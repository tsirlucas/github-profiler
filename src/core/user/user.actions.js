import {SEARCH_USER, SEARCH_USER_ERROR, RESOLVE_USER} from './user.constants';

export const searchUserError = () => ({type: SEARCH_USER_ERROR});

export const searchUser = searchText => ({type: SEARCH_USER, payload: searchText});

export const resolveUser = (user, repos) => ({type: RESOLVE_USER, payload: {user, repos}});

