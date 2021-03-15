import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Activity extends React.Component {
    
    state = {
        id: null, 
        name: null,
        date: null, 
        activityAdd: true,
        deleteActivity: false
    }

    componentDidMount(){
        
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addActivity, updateActivity, deleteActivity) => {
        e.preventDefault()
        let {name, date} = this.state
        if(name !== null ){
            let date_info = {
                name: name,
                date: date, 
                user_id: parseInt(this.props.user.id)
            }
            // persist to database
            if(this.state.activityAdd){
                addActivity(date_info)
            } 
            else if(!this.state.activityAdd && e.target.name === "update"){
                updateActivity(this.state.id, date_info)
            }
            else {
                deleteActivity(this.state.id, date_info)
            }
            //reset state
            this.setState({
                id: null,
                name: null,
                date: null, 
                activityAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            alert("You must include a name and date to create a new activity.")
        }
    }

    autoFillForm = (selectedValue, dates) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                name: null,
                date: null, 
                activityAdd: true
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                name: find_date.name,
                date: find_date.date, 
                activityAdd: false
            })
        }
    }

    generateDateDropdownOptions = (activities) => {
        return activities.map(activity => {
            return <option id={activity.id} key={activity.id} value={activity.id}>
                    {activity.date}, {activity.name}
                </option>
            }
        )
    }

    render() {
        let {addActivity, updateActivity, deleteActivity, activities} = this.props

        return (
            <div>
                Add Activity
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addActivity)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="name" id="name" placeholder="Activity name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="date" name="date" id="date" placeholder="Activity date" value={this.state.date} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, activities)}>
                            <Label for="edit-schedule">Change activity</Label>
                            <Input type="select" name="select" id="edit-schedule">
                                <option value={"n/a"}>Select activity</option>
                                {activities ? this.generateDateDropdownOptions(activities) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" name="update" onClick={(e) => this.handleSubmit(e, addActivity, updateActivity, deleteActivity)}>Add or update Activity</Button>
                        {this.state.deleteActivity ? 
                            <Button className="button"onClick={(e) => this.handleSubmit(e, addActivity, updateActivity, deleteActivity)}>Delete Schedule</Button> : false
                        }
                    </Form> 
                </CardBody>
            </div>
        )
    }
}

export default withRouter(Activity)