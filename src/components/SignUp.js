import React,{useState} from 'react'
import { Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SignIn.css';

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const {signup} = useAuth();
  const signUp = ()=>{
    signup(email, password).catch(error=>{
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      alert('The password is too weak.');
      } else {
      alert(errorMessage);
    }
    console.log(error);
    
  }).then(()=>{
    history.push("/");
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
          <Form.Group as={Col} controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button as={Col} variant="primary" onClick={signUp}>
            Register
          </Button>
        </Form.Row>
      </div>
    </div>
  );

}

export default SignUp
