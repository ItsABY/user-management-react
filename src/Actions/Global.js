//open/close left bar
export const HANDLE_LEFT = 'HANDLE_LEFT';
export const handleLeft = (value) => async (dispatch) => {
    dispatch({
        type: HANDLE_LEFT,
        payload: value
    });
};

//open/close modal
export const HANDLE_MODAL = 'HANDLE_MODAL';
export const handleModal = (value) => async (dispatch) => {
    dispatch({
        type: HANDLE_MODAL,
        payload: value
    });
};