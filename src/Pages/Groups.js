import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchGroups, searchGroup} from '../Actions/List';
import {addGroup} from '../Actions/Create';

import GroupsList from '../Components/GroupsList';

class Groups extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            msgContent: null,
            msgType: null,
            title: "",
            searchterm: "",
            groupupdates: props.groupupdates
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                        title: ""
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
                                <GroupsList groups={groups} />
                            </div>
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

export default connect(mapStateToProps, {fetchGroups, addGroup, searchGroup})(Groups);