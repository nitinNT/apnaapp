import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../contexts/AuthContext';
import { AlignEnd } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';

function NavBar({email}) {
  const history= useHistory();
  const {logout} = useAuth();
  const buttonLogout= (e)=>{
    logout();
    history.push("/")
  }

  return (
      <Navbar bg="primary" variant="dark">
      <Nav className="container-fluid">
        <Nav.Item>
          <Navbar.Brand>DH App</Navbar.Brand>
        </Nav.Item>
        <Nav.Item className="ml-auto">
            <h6>{email}</h6>
        </Nav.Item>
        <Nav.Item className="mr-sm-2">
          <AlignEnd onClick={(e) =>buttonLogout(e)} />
        </Nav.Item>
      </Nav>
    </Navbar>    
  )
}

export default NavBar
