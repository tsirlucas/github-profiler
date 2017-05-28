import {SEARCH_USER, RESOLVE_USER} from './user.constants';

export const searchUser = searchText => ({type: SEARCH_USER, payload: searchText});

export const resolveUser = (user, repos) => ({type: RESOLVE_USER, payload: {user, repos}});

