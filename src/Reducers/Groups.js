import { FETCH_GROUPS, SEARCH_GROUP } from '../Actions/List';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_GROUPS:
            return action.payload.data;
        case SEARCH_GROUP:
            return action.payload.data;
        default:
            return state;
    }
};