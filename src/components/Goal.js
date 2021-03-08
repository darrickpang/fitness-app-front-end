import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Goal extends React.Component {
    
    state = {
        id: null, 
        name: null,
        goalAdd: true
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addGoal) => {
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
            // else if(!this.state.goalAdd && e.target.name === "update"){
            //     updateDate(this.state.id, date_info)
            // }
            // else {
            //     deleteDate(this.state.id, date_info)
            // }
            // reset state
            this.setState({
                id: null,
                name: null,
                goalAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            alert("You must include a name and date to create a new goal.")
        }
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

    render() {
        let {addGoal, updateDate, deleteDate, classes, student_dates, show} = this.props
        // if (!classes) {
        //     return <span>Loading...</span>;
        // }
        console.log(this.props.student_classes)
        return (
            <div>
                 <div>
                Add Goal
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addGoal)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="level" id="level" placeholder="Goal" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button className="button">Add goal</Button>
                    </Form> 
                </CardBody>
            </div>
            </div>
        )
    }
}

export default withRouter(Goal)