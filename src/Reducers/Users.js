import { FETCH_USERS, MORE_USERS } from '../Actions/List';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload.data;
        case MORE_USERS:
            return state.concat(action.payload.data);
        default:
            return state;
    }
};