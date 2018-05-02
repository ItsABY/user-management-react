import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {fetchGroups, searchGroup} from '../Actions/List';
import {addGroup} from '../Actions/Create';
import {deleteGroup, updateGroup} from '../Actions/Update';

class Groups extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            msgContent: null,
            msgType: null,
            title: "",
            updatedtitle: "",
            updatedid: "",
            searchterm: "",
            groupupdates: props.groupupdates
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.handleUpdateBox = this.handleUpdateBox.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleInput(event) {
        this.setState({title: event.target.value.replace(/(<([^>]+)>)/ig,"")});
    }
    handleSubmit(e) {
        e.preventDefault();
        const { title } = this.state;
        if(!title){
            this.setState({msgContent: 'Please provide group title', msgType: 'alert error'})
        }else{
            this.setState({loading: true}, function(){
                this.props.addGroup({title});
            })
        }
    };
    handleDelete(groupid){
        this.props.deleteGroup(groupid);
    }
    handleUpdate(e){
        this.setState({updatedtitle: e.target.value.replace(/(<([^>]+)>)/ig,"")});
    }
    submitUpdate(e){
        e.preventDefault();
        const { updatedtitle, updatedid } = this.state;
        if(!updatedtitle || !updatedid){
            this.setState({msgContent: 'Please provide group title', msgType: 'alert error'})
        }else{
            this.setState({loading: true}, function(){
                this.props.updateGroup(updatedtitle, updatedid);
            })
        }
    }
    handleSearch(e) {
        this.setState({ searchterm: e.target.value.replace(/(<([^>]+)>)/ig,"")}, function(){
            if(this.state.searchterm){
                this.props.searchGroup(this.state.searchterm);
            }else{
                this.props.fetchGroups();
            }
        });
    }
    componentDidMount(){
        this.props.fetchGroups();
        window.scrollTo(0, 0);
    }
    //Open edit group box
    handleUpdateBox(id, title){
        this.setState({updatedid: id, updatedtitle: title});
    }
    static getDerivedStateFromProps(props, state) {
            if(props.groupupdates && props.groupupdates !== state.groupupdates){
                window.scrollTo(0, 0);
                if(props.groupupdates.code === 200){
                    props.fetchGroups();
                    return{
                        msgContent: props.groupupdates.message,
                        msgType: 'alert success',
                        groupupdates: props.groupupdates,
                        loading: false,
                        title: "",
                        updatedid: "",
                        updatedtitle: ""
                    }
                }else{
                    return{
                        msgContent: props.groupupdates.error,
                        msgType: 'alert error',
                        groupupdates: props.groupupdates,
                        loading: false
                    }
                }
            }else{
                return null;
            }
      }
    render(){
        const groups = this.props.groups;
        let loadMore = groups.length === this.state.inPage;
        return(
            <div className="list-page">
                {this.state.msgContent &&
                <div className={this.state.msgType} role="alert">
                    {this.state.msgContent}
                </div>
                }
                <div className="wrap">
                    <div className="col-half md">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"></i> Groups List
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
                                <table className="table table-responsive-sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th className="xs-visible">Created</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groups.map((group)=>
                                         <tr key={group._id}>
                                            <td>
                                                {group.title}
                                                {this.state.updatedid === group._id &&
                                                <form onSubmit={this.submitUpdate}>
                                                    <div className="input-group">
                                                        <input 
                                                            name="title"
                                                            value={this.state.updatedtitle} 
                                                            className="form-control form-control-lg" 
                                                            placeholder="Group Name" 
                                                            type="text"
                                                            onChange={this.handleUpdate} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-success">Update</button>
                                                        </div>
                                                    </div>
                                                </form>
                                                }
                                            </td>
                                            <td className="xs-visible">{moment(group.created).format('DD.MM.YYYY - hh:mm (Z)')}</td>
                                            <td>
                                                {this.state.updatedid === group._id ? (
                                                <button className="btn btn-primary" type="button" onClick={()=> this.handleUpdateBox("", "")}><i className="fa fa-times"></i></button>
                                                ):(
                                                <button className="btn btn-primary" type="button" onClick={()=> this.handleUpdateBox(group._id, group.title)}><i className="fa fa-edit"></i></button>
                                                )}
                                                <button 
                                                className="btn btn-danger" 
                                                type="button"
                                                onClick={() => { if (window.confirm('Are you sure to delete this group?')) this.handleDelete(group._id) } }><i className="fa fa-trash"></i></button>
                                                <Link to={"/group/" + group._id}>
                                                    <button className="btn btn-success" type="button"><i className="fa fa-info"></i></button>
                                                </Link>
                                            </td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {loadMore &&
                            <div className="card-footer">
                                <button type="button" className="btn btn-sm btn-success" onClick={this.loadMore}><i className="fa fa-more"></i> Load more</button>
                            </div>
                            }
                        </div>
                    </div>

                    <div className="col-half md">
                        <div className="card">
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <div className="card-header">
                                    <i className="fa fa-user-plus"></i> Add Group
                                </div>
                                <div className="card-body">
                                    <div className="form-group wrap">
                                        <div className="col-full">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                                                </div>
                                                <input 
                                                    name="title"
                                                    value={this.state.title} 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Group Name" 
                                                    type="text"
                                                    onChange={this.handleInput} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                {this.state.loading ?(
                                    <button type="button" className="btn btn-success loading" disabled><i className="fas fa-sync-alt fa-spin"></i></button>
                                ):(
                                    <button type="submit" className="btn btn-success"><i className="far fa-dot-circle"></i> Submit</button>
                                )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
                
function mapStateToProps(globalState) {
    return {
        groups: globalState.groups,
        groupupdates: globalState.groupupdates
    };
}

export default connect(mapStateToProps, {fetchGroups, addGroup, deleteGroup, updateGroup, searchGroup})(Groups);