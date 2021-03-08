import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import Goal from '../components/Goal'
import Activity from '../components/Activity'

class UserNavContainer extends React.Component {

    renderGoals = () => {
        return(
            <Goal addGoal={this.props.addGoal}/>
        )
    }

    renderActivities = () => {
        return(
            <Activity addActivity={this.props.addActivity}/>
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