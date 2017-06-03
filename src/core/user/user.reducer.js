import {SEARCH_USER, SEARCH_USER_ERROR, RESOLVE_USER} from './user.constants';

const UserReducer = (state = {login: false, repos: []}, {payload, type}) => {
    console.log(type, payload);
    switch (type) {
        case SEARCH_USER:
            return {
                ...state,
                loading: true
            };
        case SEARCH_USER_ERROR:
            return {
                ...state,
                loading: false
            };
        case RESOLVE_USER:
            return {
                ...payload.user,
                repos: payload.repos,
                loading: false
            };
        default:
            return state;
    }
};

export default UserReducer;
