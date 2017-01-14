import fetch from 'isomorphic-fetch'
import {SEARCH_USER} from './UserActionsTypes.jsx'

const searchUserAction = (searchText) => {
    return dispatch => Promise.all([
        fetch(`https://api.github.com/users/${searchText}`),
        fetch(`https://api.github.com/users/${searchText}/repos?`)
    ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(
            data => dispatch({type: SEARCH_USER, data}),
            err => dispatch({type: SEARCH_USER + '_FAILURE', err})
        )
};

export {searchUserAction}