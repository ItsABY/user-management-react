import { HANDLE_LEFT } from '../Actions/Global';

export default (state = true, action) => {
    switch (action.type) {
        case HANDLE_LEFT:
            return action.payload;
        default:
            return state;
    }
};