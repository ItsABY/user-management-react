import React, { Component } from 'react';

class Loading extends Component{
    render(){
        return(
            <div className="fullpage-loader">
                <div className="lds-hourglass"></div>
            </div>
        )
    }
}

export default Loading;