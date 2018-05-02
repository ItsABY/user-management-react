import React, {Component} from 'react';
import {handleModal} from "../Actions/Global";
import {updateUser} from '../Actions/Update';
import {addUser} from '../Actions/Create';
import {connect} from "react-redux";

class UserModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            usermodal: null,
            loading: false,
            msgContent: null,
            msgType: null,
            fullname: "",
            email: "",
            group: "",
            type: "edit",
            userupdates: props.userupdates
        }
        this.setModalRef = this.setModalRef.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.modalClickOutside = this.modalClickOutside.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    setModalRef(node) {
        this.modalRef = node;
    }
    modalClickOutside(event){
        if (this.modalRef && !this.modalRef.contains(event.target)) {
            this.props.handleModal(null);
        }
    }
    closeModal(){
        this.setState({msgContent: null, msgType: null, loading: false})
        this.props.handleModal(null);
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value.replace(/(<([^>]+)>)/ig,"")});
    }
    handleSubmit(e) {
        e.preventDefault();
        const { fullname, email, group } = this.state;
        if(!fullname){
            this.setState({msgContent: 'Please enter Full Name', msgType: 'alert error'})
        }else if(!email){
            this.setState({msgContent: 'Please provide email address', msgType: 'alert error'})
        }else if(!group){
            this.setState({msgContent: 'Please select group', msgType: 'alert error'})
        }else{
            this.setState({loading: true}, function(){
                if(this.state.type === "add"){
                    this.props.addUser({fullname, email, group});
                }else{
                    this.props.updateUser(this.state.usermodal._id, {fullname, email, group});
                }
            })
        }
    }
    componentDidMount(){
        document.addEventListener('mousedown', this.modalClickOutside);
    }
    static getDerivedStateFromProps(props, state) {
        // check modal open/close
        if(props.usermodal && props.usermodal !== state.usermodal){
            return{
                usermodal: props.usermodal,
                fullname: props.usermodal.fullname,
                email: props.usermodal.email,
                group: props.usermodal.group._id,
                type: props.usermodal.type
            }
        }else if(!props.usermodal){
            return{
                usermodal: props.usermodal
            }
        }else if(props.userupdates && props.userupdates !== state.userupdates){
            // Check user update response
            window.scrollTo(0, 0);
            if(props.userupdates.code === 200){
                props.handleModal(null);
                return{
                    msgContent: null,
                    msgType: null,
                    loading: false,
                    fullname: "",
                    email: "",
                    group: "",
                    type: ""
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
    render(){
        const groups = this.props.groups;
        return(
            <div className={this.state.usermodal ? 'modal' : 'modal closed'}>
                <div className="modal-box" ref={this.setModalRef}>
                <div className="card">
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                {this.state.type === "add" ? (
                                <div className="card-header">
                                    <i className="fa fa-user-plus"></i> Add User
                                </div>
                                ):(
                                <div className="card-header">
                                    <i className="fa fa-edit"></i> Edit User
                                </div>
                                )}
                                <div className="card-body">
                                    {this.state.msgContent &&
                                    <div className={this.state.msgType} role="alert">
                                        {this.state.msgContent}
                                    </div>
                                    }
                                    <div className="form-group wrap">
                                        <div className="col-full">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                                                </div>
                                                <input 
                                                    onChange={this.handleInput} 
                                                    value={this.state.fullname} 
                                                    name="fullname" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Full Name" 
                                                    type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group wrap">
                                        <div className="col-full">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                                </div>
                                                <input 
                                                    onChange={this.handleInput} 
                                                    value={this.state.email} 
                                                    name="email" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Email" 
                                                    type="email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group wrap">
                                        <div className="col-full">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-users"></i></span>
                                                </div>
                                                <select onChange={this.handleInput} 
                                                name="group" 
                                                value={this.state.group}
                                                className="form-control form-control-lg">
                                                    <option value="">Select Group</option>
                                                    {groups.map((group)=>
                                                    <option value={group._id} key={group._id}>{group.title}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                {this.state.loading ?(
                                    <button type="button" className="btn btn-success loading" disabled><i className="fas fa-sync-alt fa-spin"></i></button>
                                ):(
                                    <span>
                                        <button type="submit" className="btn btn-success"><i className="far fa-dot-circle"></i> Submit</button>
                                        <button type="button" className="btn btn-danger" onClick={this.closeModal}><i className="fa fa-times"></i> Close</button>
                                    </span>
                                )}
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        usermodal: globalState.usermodal,
        groups: globalState.groups,
        userupdates: globalState.userupdates
    };
};
export default connect(mapStateToProps, {handleModal, updateUser, addUser})(UserModal);