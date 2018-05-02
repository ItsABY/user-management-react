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

//Search User
export const SEARCH_USER = 'SEARCH_USER';
export const searchUser = (term, groupid) => async (dispatch, getState, api) => {
    console.log(groupid);
    let data;
    if(groupid){
        data = {
            groupid
        }
    }else{
        data = {
            groupid: null
        }
    }
    const res = await api.post('/user/search/' + term, data)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: SEARCH_USER,
        payload: res.data
    });
};

// Get group users list with group id
export const FETCH_GROUP_USERS = 'FETCH_GROUP_USERS';
export const fetchGroupUsers = (id) => async (dispatch, getState, api) => {
    const res = await api.post('/user/bygroup/' + id, null)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: FETCH_GROUP_USERS,
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

//Search Group
export const SEARCH_GROUP = 'SEARCH_GROUP';
export const searchGroup = (term) => async (dispatch, getState, api) => {
    const res = await api.post('/group/search/' + term, null)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err.response;
        });

    dispatch({
        type: SEARCH_GROUP,
        payload: res.data
    });
};