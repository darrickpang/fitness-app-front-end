import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import UserNavContainer from './UserNavContainer'

class UserMainContent extends React.Component {

    state = {
        activities: []
    }

    componentDidMount(){
        fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${process.env.REACT_APP_access_token}`)
        .then(res => res.json())
        .then(json => this.setState({activities: json}))
    }

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

    renderActivities =() => {
        return(
            <div>
                {this.state.activities.map(activity => {
                    return(
                        <p>{activity.name}, {activity.start_date_local}, {activity.type}, {activity.kudos_count}</p>
                    )
                })}
            </div>
        )
    }

    render(){
        console.log(this.state.activities)
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
                {this.renderActivities()}     
            </div> 
        )
    }
}

export default withRouter(UserMainContent)