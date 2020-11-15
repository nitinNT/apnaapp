import React,{useState} from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {auth} from "../firebase";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const signIn = ()=>{
    auth.signInWithEmailAndPassword(email,password)
    .catch(error=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    })
    .then(data=>{
      console.log(data)
    })
    
  }
  const forgotPassword= ()=>{
    auth.sendPasswordResetEmail(email).then(()=>{
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
          <Button as={Col} variant="primary" onClick={signIn}>
            Login
          </Button>
        </Form.Row>
      </div>
    </div>
  );
}

export default SignIn;
