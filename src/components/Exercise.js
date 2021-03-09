import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Exercise extends React.Component {
    
    state = {
        id: null, 
        name: null,
        exerciseAdd: true
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addExercise) => {
        e.preventDefault()
        let {name} = this.state
        if(name !== null ){
            let date_info = {
                name: name
            }
            // persist to database
            if(this.state.exerciseAdd){
                addExercise(date_info)
            } 
            // else if(!this.state.exerciseAdd && e.target.name === "update"){
            //     updateDate(this.state.id, date_info)
            // }
            // else {
            //     deleteDate(this.state.id, date_info)
            // }
            // reset state
            this.setState({
                id: null,
                name: null,
                exerciseAdd: true
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
                exerciseAdd: true
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                name: find_date.name,
                exerciseAdd: false
            })
        }
    }

    render() {
        let {addExercise, updateDate, deleteDate, classes, student_dates, show} = this.props

        return (
            <div>
                Add Exercise
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addExercise)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="level" id="level" placeholder="Exercise name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button className="button">Add Exercise</Button>
                    </Form> 
                </CardBody>
            </div>
        )
    }
}

export default withRouter(Exercise)