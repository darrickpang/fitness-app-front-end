import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import Goal from '../components/Goal'
import Activity from '../components/Activity'
import Exercise from '../components/Exercise'

class UserNavContainer extends React.Component {

    renderGoals = () => {
        let {addGoal, updateGoal, deleteGoal, goals, user} = this.props
        return(
            <Goal addGoal={addGoal} updateGoal={updateGoal} deleteGoal={deleteGoal} goals={goals} user={user}/>
        )
    }

    renderActivities = () => {
        let {addActivity, updateActivity, deleteActivity, activities, user} = this.props
        return(
            <Activity addActivity={addActivity} updateActivity={updateActivity} deleteActivity={deleteActivity} activities={activities} user={user}/>
        )
    }

    renderExercises = () => {
        let {addExercise, updateExercise, deleteExercise, exercises} = this.props
        return(
            <Exercise addExercise={addExercise} updateExercise={updateExercise} deleteExercise={deleteExercise} exercises={exercises}/>
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