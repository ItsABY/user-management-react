import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchUsers, moreUsers, fetchGroups, searchUser} from '../Actions/List';
import {handleModal} from "../Actions/Global";

import UserModal from '../Components/UserModal';
import UsersList from '../Components/UsersList';

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            skip: 0,
            perPage: 24,
            inPage: 24,
            loading: false,
            msgContent: null,
            msgType: null,
            searchterm: "",
            userupdates: props.userupdates
        };
        this.loadMore = this.loadMore.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    loadMore(){
        this.setState({skip: this.state.skip + this.state.perPage, inPage: this.state.inPage + this.state.perPage}, function () {
            this.props.moreUsers(this.state.skip , this.state.perPage);
        });
    }
    handleSearch(e) {
        this.setState({ searchterm: e.target.value.replace(/(<([^>]+)>)/ig,"")}, function(){
            if(this.state.searchterm){
                this.props.searchUser(this.state.searchterm);
            }else{
                this.props.fetchUsers(this.state.skip , this.state.perPage);
            }
        });
    }
    addUser(){
        const user = {
            _id: "",
            fullname: "",
            email: "",
            group: {
                _id: ""
            },
            type: "add"
        }
        this.props.handleModal(user);
    }
    componentDidMount(){
        this.props.fetchUsers(this.state.skip , this.state.perPage);
        this.props.fetchGroups();
        window.scrollTo(0, 0);
    }
    static getDerivedStateFromProps(props, state) {
        if(props.userupdates && props.userupdates !== state.userupdates){
            window.scrollTo(0, 0);
            if(props.userupdates.code === 200){
                props.fetchUsers(state.skip , state.perPage);
                return{
                    msgContent: props.userupdates.message,
                    msgType: 'alert success',
                    userupdates: props.userupdates,
                    loading: false
                }
            }else{
                return{
                    msgContent: props.userupdates.error,
                    msgType: 'alert error',
                    userupdates: props.userupdates,
                    loading: false
                }
            }
        }else{
            return null;
        }
  }
    render() {
        const users = this.props.users;
        let loadMore = users.length === this.state.inPage;
        return (
            <div className="list-page">
                {this.state.msgContent &&
                <div className={this.state.msgType} role="alert">
                    {this.state.msgContent}
                </div>
                }
                <div className="wrap">
                    <div className="col-full">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"></i> Users List
                                <div className="card-actions">
                                    <button className="btn btn-success" onClick={this.addUser}>
                                        <i className="fa fa-user-plus"></i> Add User
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-group wrap">
                                    <div className="col-full">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-search"></i></span>
                                            </div>
                                            <input 
                                                onChange={this.handleSearch} 
                                                value={this.state.searchterm} 
                                                name="searchterm" 
                                                className="form-control form-control-lg" 
                                                placeholder="Search User" 
                                                type="text" />
                                        </div>
                                    </div>
                                </div>
                                <UsersList users={users}/>
                            </div>
                            {loadMore &&
                            <div className="card-footer">
                                <button type="button" className="btn btn-sm btn-success" onClick={this.loadMore}><i className="fa fa-more"></i> Load more</button>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <UserModal />
            </div>
        )
    }
}
                
function mapStateToProps(globalState) {
    return {
        users: globalState.users,
        userupdates: globalState.userupdates
    };
}

export default connect(mapStateToProps, {fetchUsers, moreUsers, fetchGroups, searchUser, handleModal})(Users);