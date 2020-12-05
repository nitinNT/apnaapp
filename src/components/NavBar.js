import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../contexts/AuthContext';
import { AlignEnd, PeopleFill } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import db from '../firebase';
import { useToasts } from 'react-toast-notifications';

function NavBar({email}) {
  const history= useHistory();
  const {logout} = useAuth();
  const {addToast} =useToasts();
  const buttonLogout= (e)=>{
    logout();
    history.push("/")
  }
  const addTeamFeature=()=>{
    db.collection('users').doc(email).set({
      email:email
    }).then(()=>{
      addToast('Now You can use Board Feature',{appearance:'info',autoDismiss:true})
    })
    .catch(err=>{
      addToast('You are Already Error or Please Try Again ....',{appearance:'warning',autoDismiss:true})
    })
    
  }
  return (

      <Navbar bg="primary" variant="dark">
      <Nav className="container-fluid">
        <Nav.Item>
          <Navbar.Brand>ApnaApp</Navbar.Brand>
        </Nav.Item>
        <Nav.Item className="ml-auto">
            <h6>{email}</h6>
        </Nav.Item>
        <Nav.Item className="mr-sm-2">
          <AlignEnd onClick={(e) =>buttonLogout(e)} />
        </Nav.Item>
        <Nav.Item className="mr-sm-2">
          <PeopleFill onClick={addTeamFeature}/>
        </Nav.Item>

      </Nav>
    </Navbar>    
  )
}

export default NavBar
