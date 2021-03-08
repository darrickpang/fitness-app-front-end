import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

class Activity extends React.Component {
    
    state = {
        id: null, 
        name: null,
        date: null, 
        activityAdd: true
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addActivity) => {
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
            // else if(!this.state.activityAdd && e.target.name === "update"){
            //     updateDate(this.state.id, date_info)
            // }
            // else {
            //     deleteDate(this.state.id, date_info)
            // }
            // reset state
            this.setState({
                id: null,
                name: null,
                date: null, 
                activityAdd: true
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

    render() {
        let {addActivity, updateDate, deleteDate, classes, student_dates, show} = this.props
        if (!classes) {
            return <span>Loading...</span>;
        }
        console.log(this.props.student_classes)
        return (
            <div>
                 <div>
                Add Activity
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addActivity)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="level" id="level" placeholder="Activity name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="level" id="level" placeholder="Activity date" value={this.state.date} onChange={this.handleOnChange}/>
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

export default withRouter(Activity)