import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Goal extends React.Component {
    
    state = {
        id: null, 
        name: null,
        goalAdd: true,
        deleteGoal: false
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addGoal, updateGoal, deleteGoal) => {
        e.preventDefault()
        let {name} = this.state
        if(name !== null ){
            let date_info = {
                name: name,
                user_id: parseInt(this.props.user.id)
            }
            // persist to database
            if(this.state.goalAdd){
                addGoal(date_info)
            } 
            else if(!this.state.goalAdd && e.target.name === "update"){
                updateGoal(this.state.id, date_info)
            }
            else {
                deleteGoal(this.state.id, date_info)
            }
            // reset state
            this.setState({
                id: null,
                name: null,
                goalAdd: true,
                deleteGoal: false
            })
            e.target.parentElement.reset()
        }
        
        else{
            alert("You must include a name to create a new goal.")
        }
        console.log(this.state)
    }

    autoFillForm = (selectedValue, dates) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                name: null,
                goalAdd: true
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                name: find_date.name,
                goalAdd: false
            })
        }
    }

    generateDateDropdownOptions = (goals) => {
        return goals.map(goal => {
            return <option id={goal.id} key={goal.id} value={goal.id}>
                    {goal.date}, {goal.name}
                </option>
            }
        )
    }

    render() {
        let {addGoal, updateGoal, deleteGoal, goals} = this.props
        return (
            <div>
                Add Goal
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addGoal, updateGoal, deleteGoal)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="name" id="name" placeholder="Goal name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, goals)}>
                            <Label for="edit-schedule">Change goal</Label>
                            <Input type="select" name="select" id="edit-schedule">
                                <option value={"n/a"}>Select goal</option>
                                {goals ? this.generateDateDropdownOptions(goals) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" name="update" onClick={(e) => this.handleSubmit(e, addGoal, updateGoal, deleteGoal)}>Add or update Goal</Button>
                        {this.state.deleteGoal ? 
                            <Button className="button"onClick={(e) => this.handleSubmit(e, addGoal, updateGoal, deleteGoal)}>Delete Goal</Button> : false
                        }
                    </Form> 
                </CardBody>
            </div>
        )
    }
}

export default withRouter(Goal)