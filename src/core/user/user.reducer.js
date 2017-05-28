import {RESOLVE_USER} from './user.constants';

const UserReducer = (state = {login: false, repos: []}, {payload, type}) => {
    switch (type) {
        case RESOLVE_USER:
            return {
                ...payload.user,
                repos: payload.repos
            };
        default:
            return state;
    }
};

export default UserReducer;
