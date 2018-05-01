// Delete group actions
export const DELETE_GROUP = 'DELETE_GROUP';
export const deleteGroup = (id) => async (dispatch, getState, api) => {
    const res = await api.delete('/group/' + id, null)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: DELETE_GROUP,
        payload: res.data
    });
};

// Delete user actions
export const DELETE_USER = 'DELETE_USER';
export const deleteUser = (id) => async (dispatch, getState, api) => {
    const res = await api.delete('/user/' + id, null)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: DELETE_USER,
        payload: res.data
    });
};


//Edit group action
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const updateGroup = (title, id) => async (dispatch, getState, api) => {
    const data = {
        title
    }
    const res = await api.put('/group/' + id, data)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: UPDATE_GROUP,
        payload: res.data
    });
};

//Edit user action
export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = (id, ...data) => async (dispatch, getState, api) => {
    const res = await api.put('/user/' + id, data[0])
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: UPDATE_USER,
        payload: res.data
    });
};