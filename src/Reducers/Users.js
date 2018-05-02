import { FETCH_USERS, MORE_USERS, SEARCH_USER, FETCH_GROUP_USERS } from '../Actions/List';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload.data;
        case MORE_USERS:
            return state.concat(action.payload.data);
        case SEARCH_USER:
            return action.payload.data;
        case FETCH_GROUP_USERS:
            return action.payload.data;
        default:
            return state;
    }
};