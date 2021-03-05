import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';

class UserNavContainer extends React.Component {
    render(){
        return(
            <div>
                User Navigatiob
            </div>
        )
    }

}

export default withRouter(UserNavContainer)