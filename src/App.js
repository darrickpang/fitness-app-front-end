import React from 'react';
import './App.css';
import Welcome from './containers/Welcome';
import UserLoginSignUp from './components/UserLoginSignUp';
import UserMainContent from './containers/UserMainContent';
import { Switch, Route, withRouter} from 'react-router-dom';

class App extends React.Component {
  state = {
    user: {
      id: null,
      name: "",
    },
    exercises: [],
    goals: [],
    activities: [],
    token: ""
  }

  componentDidMount(){
    if(localStorage.token){  
      fetch('http://localhost:3000/user_persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => this.userAuthResponse(json))
    }

    //exercises, goals, activities
    fetch('http://localhost:3000/exercises')
    .then(res => res.json())
    .then(json => this.setState({exercises: json}))

    fetch('http://localhost:3000/goals')
    .then(res => res.json())
    .then(json => this.setState({goals: json}))

    fetch('http://localhost:3000/activities')
    .then(res => res.json())
    .then(json => this.setState({activities: json}))
  }

  userAuthResponse = (json) => {
    if (json.user){
      localStorage.token = json.token
      this.setState({
        user: {
          id: json.user.data.attributes.id,
          name: json.user.data.attributes.name,
        },
        token: json.token
      }, () => this.props.history.push('/user_main'))
    }
  }

  userLogin = ({name, password}) => {
    let user = {
      name: name,
      password: password
    }

    fetch('http://localhost:3000/user_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error){
        this.userAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  userSignUp = ({name, password}) => {
    let newUser = {
      name: name,
      password: password,
    }
    
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error) {
        this.userAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  // Friend requests
  // postFriendRequests = (e, user, target) => {
  //   e.preventDefault()
  //   fetch(`http://localhost:3000/friend_requests`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     },
  //     body: JSON.stringify({
  //       requestor_id: user.id,
  //       requestor_name: user.name,
  //       receiver_id: target.id,
  //       receiver_name: target.name, 
  //       status: 'pending'
  //     })
  //   })
  //   .then(r => r.json())
  //   .then(json => {
  //     this.setState({
  //       friend_requests: [...this.state.friend_requests, {
  //         requestor_id: user.id,
  //         requestor_name: user.name,
  //         receiver_id: target.id,
  //         receiver_name: target.name, 
  //         status: 'pending'
  //       }]
  //     })
  //   })
  // }

  // handleAccept = (e, target) => {
  //   e.preventDefault()
  //   fetch(`http://localhost:3000/friend_requests/${target}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     },
  //     body: JSON.stringify({
  //       id: target,
  //       status: 'accepted'
  //     })
  //   })
  // }

  // handleDelete = (target) => {
  //   fetch(`http://localhost:3000/friend_requests/${target}`, {
  //     method: 'DELETE'
  //   })
  // }

  // Exercises
  addExercise = (newExercise) => {
    fetch(`http://localhost:3000/exercises`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newExercise),
  }) 
  .then(r => r.json())
  .then(json => {
      this.setState({
        exercises: [...this.state.exercises, {
          id: json.id,
          name: json.name
        }]
      })
    })
  }

  updateExercise = (id, date_info) => {
    fetch(`http://localhost:3000/exercises/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(date_info)
    })
    .then(res => res.json())
    .then(json => {
      console.log('updated')
      let exercises = this.state.exercises.map(date_info => {
        if(date_info.id === json.id){
            let newExercise = {
                  id: json.id,
                  name: json.name
            }
            return newExercise
            }
            else{
              return date_info
            }
        })
        this.setState({
            exercises: exercises
    })})
  }

  deleteExercise = (id, exercise) => {
    fetch(`http://localhost:3000/exercises/${id}`, {
      method: 'DELETE'
    }) 
    .then(r => r.json())
    .then(json => {
      console.log('deleted')
      let exercises = this.state.exercises.filter(exercise => exercise.id !== id)
      this.setState({
        exercises: exercises
      })
    })
  }

  // Goals
  addGoal = (newGoal) => {
    fetch(`http://localhost:3000/exercises`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newGoal),
  }) 
  .then(r => r.json())
  .then(json => {
      this.setState({
        goals: [...this.state.goals, {
          id: json.id,
          name: json.name
        }]
      })
    })
  }

  updateGoal = (id, date_info) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(date_info)
    })
    .then(res => res.json())
    .then(json => {
      console.log('updated')
      let goals = this.state.goals.map(date_info => {
        if(date_info.id === json.id){
            let newDate = {
                  id: json.id,
                  class_name: json.class_name,
                  date: json.date,
                  student_id: json.student_id
            }
            return newDate
            }
            else{
              return date_info
            }
        })
        this.setState({
            goals: goals
    })})
  }

  deleteGoal = (id, goal) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'DELETE'
    }) 
    .then(r => r.json())
    .then(json => {
      console.log('deleted')
      let goals = this.state.goals.filter(goal => goal.id !== id)
      this.setState({
        goals: goals
      })
    })
  }

  // Activities
  addActivity = (newActivity) => {
    fetch(`http://localhost:3000/activities`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newActivity),
  }) 
  .then(r => r.json())
  .then(json => {
      this.setState({
        activities: [...this.state.activities, {
          id: json.id,
          name: json.name
        }]
      })
    })
  }

  updateActivity = (id, date_info) => {
    fetch(`http://localhost:3000/activities/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(date_info)
    })
    .then(res => res.json())
    .then(json => {
      console.log('updated')
      let activities = this.state.activities.map(date_info => {
        if(date_info.id === json.id){
            let newActivity = {
                  id: json.id,
                  name: json.name,
                  user_id: json.user_id
            }
            return newActivity
            }
            else{
              return date_info
            }
        })
        this.setState({
            activities: activities
    })})
  }

  deleteActivity = (id, activity) => {
    fetch(`http://localhost:3000/activities/${id}`, {
      method: 'DELETE'
    }) 
    .then(r => r.json())
    .then(json => {
      console.log('deleted')
      let activities = this.state.activities.filter(activity => activity.id !== id)
      this.setState({
        activities: activities
      })
    })
  }

  renderUserLogin = () => {
    return <UserLoginSignUp login={true} userLogin={this.userLogin}/>
  }

  renderUserSignUp = () => {
    return <UserLoginSignUp login={false} userSignUp={this.userSignUp}/>
  }

  renderUserMainContent = () => {
    return <UserMainContent user ={this.state.user} token={this.state.token} addActivity={this.addActivity} 
            updateActivity={this.updateActivity} deleteActivity={this.deleteActivity} activities={this.state.activities} 
            addGoal={this.addGoal} updateGoal={this.updateGoal} deleteGoal={this.deleteGoal} goals={this.state.goals}
            addExercise={this.addExercise} updateExercise={this.updateExercise} deleteExercise={this.deleteExercise}
          />
  }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/user_login" render={this.renderUserLogin}/>
          <Route path="/user_signup" render={this.renderUserSignUp}/>
          <Route path="/user_main" render={this.renderUserMainContent}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);