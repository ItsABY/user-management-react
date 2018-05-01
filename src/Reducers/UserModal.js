import { HANDLE_MODAL } from '../Actions/Global';

export default (state = null, action) => {
    switch (action.type) {
        case HANDLE_MODAL:
            return action.payload;
        default:
            return state;
    }
};