import { FETCH_GROUP } from '../Actions/Detail';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_GROUP:
            return action.payload;
        default:
            return state;
    }
};