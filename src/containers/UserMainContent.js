import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import UserNavContainer from './UserNavContainer'

class UserMainContent extends React.Component {
    renderUserInfo = () => {
        return (
            <div className="student-info">
                <h3>User name: {this.props.user.name}</h3>
            </div>
        )
    }

    renderLogout = () => {
        return (
            <Button className="button" onClick={() => {
                localStorage.clear()
                this.props.history.push('/')
                }}>Log Out
            </Button>
        )
    }

    render(){
        let {addExercise, updateExercise, deleteExercise, addGoal, addActivity, updateActivity, deleteActivity, user, activities, exercises, updateGoal, deleteGoal, goals} = this.props
        return(
            <div className="main-page">
                Welcome to your main page. 
                {this.renderUserInfo()}
                {this.renderLogout()}       
                <UserNavContainer addActivity={addActivity} addGoal={addGoal} addExercise={addExercise} user={user} 
                    updateActivity={updateActivity} deleteActivity={deleteActivity} activities={activities}
                    updateExercise={updateExercise} deleteExercise={deleteExercise} exercises={exercises}
                    updateGoal={updateGoal} deleteGoal={deleteGoal} goals={goals}
                />        
            </div> 
        )
    }
}

export default withRouter(UserMainContent)