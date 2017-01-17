import {SEARCH_USER} from './UserActionsTypes';

const UserReducer = (state = {data: {user: {login: true}, repos: []}}, action) => {
    switch (action.type) {
        case SEARCH_USER:
            return {data: {user: action.data[0], repos: action.data[1]}};
        case SEARCH_USER + '_ERROR':
            return {data: {user: false, repos: []}};
        default:
            return state;
    }
};

export default UserReducer;