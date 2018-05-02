import React, { Component } from 'react';
import { connect } from 'react-redux';
import {contentStats} from '../Actions/Global';
import Loading from '../Components/Loading';

class Home extends Component{
    componentDidMount(){
        this.props.contentStats();
    }
    render(){
        if(this.props.home){
            return(
                <div className="home-page">
                    <div className="wrap">
                        <div className="col-half sm">
                            <div className="card widget">
                                <div className="card-body">
                                    <i className="fa fa-user bg-primary"></i>
                                    <div className="number-text text-primary">{this.props.home.users}</div>
                                    <div className="caption">Users</div>
                                </div>
                            </div>
                        </div>
    
                        <div className="col-half sm">
                            <div className="card widget">
                                <div className="card-body">
                                    <i className="fa fa-users bg-primary"></i>
                                    <div className="number-text text-primary">{this.props.home.groups}</div>
                                    <div className="caption">Groups</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <Loading />
            );
        }
    }
}

function mapStateToProps(globalState) {
    return {
        home: globalState.home
    };
}

export default connect(mapStateToProps, {contentStats})(Home);