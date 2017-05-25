import {SEARCH_USER} from './UserActionsTypes';

const UserReducer = (state = {data: {user: {login: true}, repos: []}}, {payload, type}) => {
    switch (type) {
        case SEARCH_USER:
            return {data: {user: payload.user, repos: payload.repos}};
        case SEARCH_USER + '_ERROR':
            return {data: {user: false, repos: []}};
        default:
            return state;
    }
};

export default UserReducer;
