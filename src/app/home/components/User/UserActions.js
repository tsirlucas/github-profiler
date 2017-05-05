import fetch from 'isomorphic-fetch';
import { SEARCH_USER } from './UserActionsTypes';

export default searchText =>
    dispatch => Promise.all([
        fetch(`https://api.github.com/users/${searchText}`),
        fetch(`https://api.github.com/users/${searchText}/repos?`)
    ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(
        (data) => {
            if (!(data[0].message === 'Not Found' || data[1].message === 'Not Found')) {
                dispatch({ type: SEARCH_USER, data });
            } else {
                dispatch({ type: SEARCH_USER + '_ERROR', data });
            }
        }
        );
