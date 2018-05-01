import { ADD_USER } from '../Actions/Create';
import { DELETE_USER, UPDATE_USER } from '../Actions/Update';

export default (state = null, action) => {
    switch (action.type) {
        case ADD_USER:
            return action.payload;
        case DELETE_USER:
            return action.payload;
        case UPDATE_USER:
            return action.payload;
        default:
            return state;
    }
};