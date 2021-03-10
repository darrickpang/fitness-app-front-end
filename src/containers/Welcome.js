import React from "react";
import { Button, Container } from "reactstrap";
import { useHistory } from 'react-router-dom'

const Welcome = () => {
  let history = useHistory()

    return (
      <div style={{backgroundImage: "url(" + require("../image/0_WUXWP_yjzJKLJmGm.jpg") + ")",}} className="page-header">
        <Container className='welcome-page'>
            <h1>Fitness</h1>
            <h3>Record your fitness here.</h3>
            <br />
            <Button className="button" onClick={() => history.push('/user_signup')}> User Sign Up</Button>
            <Button className="button" onClick={() => history.push('/user_login')}>User Login</Button>
        </Container>
      </div>
  );
}

export default Welcome