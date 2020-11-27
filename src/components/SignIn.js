import React,{useState} from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

import {useAuth} from '../contexts/AuthContext';
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const { signin } = useAuth();
  const { resetPassword } = useAuth();

  const history = useHistory();
  const submitSignIn = (e)=>{
    e.preventDefault();
    signin(email,password).catch((error)=>{
      var errorMessage = error.message;
      alert(errorMessage);

    }).then(()=>{
      alert('SUCCESS')
      history.push("/home")
    })
    
  }
  const forgotPassword= ()=>{
    resetPassword(email).then(()=>{
      alert("Password Reset Email Sent")
    })
    .catch(error=>{
      let errorCode = error.code;
      
      if (errorCode === 'auth/invalid-email')
      {
        alert('Email Address is Not Valid ')
      }
      if (errorCode ===  'auth/user-not-found'){
        alert('User Not Found ')
      }
    })
  }
  return (
    <div>
      <div className="login__form">
        <Form.Group controlId="formBasicText">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Email" 
          value={email}
          onChange={e=> setEmail(e.target.value)}
          
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
          value={password}
          onChange = {e=> setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Row>
          <Button as={Col} variant="danger" onClick={forgotPassword}>
            Forgot Password  
          </Button>  
          <Button as={Col} variant="primary" onClick={(e) =>submitSignIn(e)}>
            Login
          </Button>
        </Form.Row>
      </div>
    </div>
  );
}

export default SignIn;
