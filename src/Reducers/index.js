import { combineReducers } from 'redux';
import users from './Users';
import groups from './Groups';
import groupupdates from './GroupUpdates';
import userupdates from './UserUpdates';
import leftbar from './LeftBar';
import usermodal from './UserModal';

export default combineReducers({
    users,
    groups,
    groupupdates,
    userupdates,
    leftbar,
    usermodal
});