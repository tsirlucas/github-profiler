import githubRequest from './github-api';
import firebaseRequest from './firebase-api';
import FirebaseParser from './firebase-parser.service';

export const getUser = (searchText) => githubRequest(searchText);

export const getRepos = (searchText) => githubRequest(searchText, '/repos?');

export const listNotes = (user) => firebaseRequest(user, 'GET').then(result => FirebaseParser(result));

export const addNote = (user, params) => firebaseRequest(user, 'PATCH', params);

export const editNote = (user, params) => firebaseRequest(user, 'PATCH', params);

export const removeNote = (user, params) => firebaseRequest(user, 'DELETE', params, params.id);
