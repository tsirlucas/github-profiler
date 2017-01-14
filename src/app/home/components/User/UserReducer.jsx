import {SEARCH_USER} from './UserActionsTypes.jsx';

const UserReducer = (state = {data: {user: {}, repos: []}}, action) => {
    switch (action.type) {
        case SEARCH_USER:
            return {data: {user: action.data[0], repos: action.data[1]}};
        default:
            return state
    }
};

export default UserReducer;