import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import Goal from '../components/Goal'
import Activity from '../components/Activity'
import Exercise from '../components/Exercise'

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

    renderExercises = () => {
        return(
            <Exercise addExercise={this.props.addExercise}/>
        )
    }

    render(){
        return(
            <div>
                User Navigation
                {this.renderGoals()}
                {this.renderActivities()}
                {this.renderExercises()}
            </div>
        )
    }
}

export default withRouter(UserNavContainer)