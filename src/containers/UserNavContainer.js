import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';

class UserNavContainer extends React.Component {
    render(){
        return(
            <div>
                User Navigation
            </div>
        )
    }

}

export default withRouter(UserNavContainer)