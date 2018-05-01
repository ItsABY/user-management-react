import { FETCH_GROUPS } from '../Actions/List';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_GROUPS:
            return action.payload.data;
        default:
            return state;
    }
};