//Fetch all users
export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = (skip, limit) => async (dispatch, getState, api) => {
    const usersData = {
        skip,
        limit
    };
    const res = await api.post('/user/all', usersData)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: FETCH_USERS,
        payload: res.data
    });
};

//Fetcj more users
export const MORE_USERS = 'MORE_USERS';
export const moreUsers = (skip, limit) => async (dispatch, getState, api) => {
    const usersData = {
        skip,
        limit
    };
    const res = await api.post('/user/all', usersData)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: MORE_USERS,
        payload: res.data
    });
};


//Fetch all groups
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const fetchGroups = () => async (dispatch, getState, api) => {
    const res = await api.post('/group/all', null)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: FETCH_GROUPS,
        payload: res.data
    });
};
