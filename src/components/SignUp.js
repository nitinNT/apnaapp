import React,{useState} from 'react'
import { Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../contexts/AuthContext';
import './SignIn.css';

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const {signup} = useAuth();

  const {addToast} = useToasts();
  const signUp = async (e)=>{
    e.preventDefault();
    try{
      await signup(email,password)
      addToast('Successfully Registered',{appearance:'success',autoDismiss:true})
      history.push("/")
    }
    catch{
      addToast('Wrong Details Please Try Again ... ',{appearance:'error',autoDismiss:true})

    }
  //   signup(email, password).catch((error)=>{
  //   var errorMessage = error.message;
  //   alert(errorMessage)
    
  // }).then(()=>{
  //   history.push("/");
  // })
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
          <Button as={Col} variant="primary" onClick={(e) => signUp(e)}>
            Register
          </Button>
        </Form.Row>
        <Form.Row>
          <Link to="/" >Already Registered?</Link>          
        </Form.Row>
      </div>
    </div>
  );

}

export default SignUp
