import React, {Component} from 'react';
import { connect } from 'react-redux';
import {handleLeft} from '../Actions/Global'

class Header extends Component{
    constructor(props){
        super(props)
        this.handleBar = this.handleBar.bind(this);
    }
    handleBar(){
        this.props.handleLeft(!this.props.leftbar)
    }
    render(){
        return(
            <header>
                <div className="brand-w-button">
                    <img className="brand" alt="logotype" src="/images/logo.png" />
                    <i className="fa fa-bars" onClick={this.handleBar}></i>
                </div>
            </header>
        )
    }
}

function mapStateToProps(globalState) {
    return {
        leftbar: globalState.leftbar
    };
}
export default connect(mapStateToProps, {handleLeft})(Header);