import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteGroup, updateGroup} from '../Actions/Update';

class GroupsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            updatedtitle: "",
            updatedid: ""
        };
        this.submitUpdate = this.submitUpdate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleUpdateBox = this.handleUpdateBox.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
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
    //Open edit group box
    handleUpdateBox(id, title){
        this.setState({updatedid: id, updatedtitle: title});
    }
    renderGroups(groups){
        return groups.map((group) => {
            return (
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
            );
        })
    }
    render(){
        return(
            <table className="table table-responsive-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="xs-visible">Created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderGroups(this.props.groups)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(globalState) {
    return {
        
    };
}

export default connect(mapStateToProps, {deleteGroup, updateGroup})(GroupsList);