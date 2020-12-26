import React,{useState} from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import {GoogleLoginButton } from "react-social-login-buttons";
import { useToasts } from "react-toast-notifications";

import {useAuth} from '../contexts/AuthContext';
import db from "../firebase";
import "./SignIn.css";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const { signin } = useAuth();
  const { resetPassword , googleSignIn } = useAuth();

  const history = useHistory();
  const {addToast} = useToasts();
  const submitSignIn = async (e)=>{
    e.preventDefault();
    try{
      await signin(email,password)
      addToast('Successfully Logged',{appearance:'success',autoDismiss:true})
      db.collection('profile').doc(email).set({})
      history.push("/home")
    }
    catch{
      addToast('Wrong Credentials ',{appearance:'error',autoDismiss:true})
    }
  }
  const forgotPassword= async()=>{
    try{
      await resetPassword(email)
      addToast('Password Reset Link Sent Successfully ',{appearance:'info',autoDismiss:true})
    }
    catch{
      addToast('Invalid Email ',{appearance:'error',autoDismiss:true})
    }
  }

  const handleGoogleLogin=async()=>{
    try{
      await googleSignIn();
      addToast('Successfully Logged',{appearance:'success',autoDismiss:true})
      
      history.push("/home")
    }
    catch{
      addToast('Some Error Please Try Again ',{appearance:'error',autoDismiss:true})
      
    }
    
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
          <Form.Control type="password" placeholder="Enter Password"
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
        <Form.Row>
          <Link to="/register">New User ? </Link>
        </Form.Row>
        <GoogleLoginButton onClick={handleGoogleLogin}/>
      </div>
      
    </div>
  );
}

export default SignIn;
