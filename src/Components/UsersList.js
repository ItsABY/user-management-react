import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteUser} from '../Actions/Update';
import {handleModal} from "../Actions/Global";

class UsersList extends Component{
    editUser(user){
        this.props.handleModal(user);
    }
    handleDelete(userid){
        this.props.deleteUser(userid);
    }
    renderUsers(users){
        return users.map((user) => {
            return (
                <tr key={user._id}>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.group.title}</td>
                    <td>
                        <button className="btn btn-primary" onClick={()=> this.editUser(user)}><i className="fa fa-edit"></i></button>
                        <button 
                        className="btn btn-danger"
                        onClick={() => { if (window.confirm('Are you sure to delete this user?')) this.handleDelete(user._id) } }><i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            );
        })
    }
    render(){
        return(
            <table className="table table-responsive-sm">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderUsers(this.props.users)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(globalState) {
    return {

    };
}

export default connect(mapStateToProps, { deleteUser, handleModal })(UsersList);