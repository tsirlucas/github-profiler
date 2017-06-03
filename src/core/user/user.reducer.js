import {SEARCH_USER, RESOLVE_USER} from './user.constants';

const UserReducer = (state = {login: false, repos: []}, {payload, type}) => {
    switch (type) {
        case SEARCH_USER:
            return {
                ...state,
                loading: true
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
