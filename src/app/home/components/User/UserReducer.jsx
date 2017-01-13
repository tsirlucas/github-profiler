const SEARCH_USER = 'SEARCH_USER';
const SEARCH_USER_FAILURE= 'SEARCH_USER_FAILURE';

const UserReducer = (state = {data: {user: {}, repos: []}}, action) => {
    switch (action.type) {
        case SEARCH_USER:
            return {data: {user: action.data[0], repos: action.data[1]}};
        case SEARCH_USER_FAILURE:
            console.warn('HEY THERE, YOU FAILED THIS APPLICATION');
            return state;
        default:
            return state
    }
};

export default UserReducer;