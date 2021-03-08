import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import Goal from '../components/Goal'

class UserNavContainer extends React.Component {

    renderGoals = () => {
        return(
            <Goal addGoal={addGoal}/>
        )
    }

    render(){
        return(
            <div>
                User Navigation
                {this.renderGoals()}
            </div>
        )
    }
}

export default withRouter(UserNavContainer)