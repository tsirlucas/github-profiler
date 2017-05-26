import {SEARCH_USER} from './user.constants';

const UserReducer = (state = {login: true, repos: []}, {payload, type}) => {
    switch (type) {
        case SEARCH_USER:
            return {
                ...payload.user,
                repos: payload.repos
            };
        default:
            return state;
    }
};

export default UserReducer;
