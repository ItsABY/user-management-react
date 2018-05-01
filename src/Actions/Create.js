//Add new group action
export const ADD_GROUP = 'ADD_GROUP';
export const addGroup = (data) => async (dispatch, getState, api) => {
    const res = await api.post('/group/add', data)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: ADD_GROUP,
        payload: res.data
    });
};

//Add New user action
export const ADD_USER = 'ADD_USER';
export const addUser = (data) => async (dispatch, getState, api) => {
    const res = await api.post('/user/add', data)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: ADD_USER,
        payload: res.data
    });
};