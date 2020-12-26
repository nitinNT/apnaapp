import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../contexts/AuthContext';

import { useHistory } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function NavBar({email}) {
  const history= useHistory();
  const {logout} = useAuth();
  const buttonLogout= ()=>{
    logout();
    history.push("/")
  }
  return (
      <Navbar bg="primary" variant="dark">
      <Nav className="container-fluid">
        <Nav.Item>
          <Navbar.Brand>ApnaApp</Navbar.Brand>
        </Nav.Item>
        <Nav.Item className="mr-sm-2">
        <NavDropdown title={`Welcome, ${email.split('@')[0]}`} id="collasible-nav-dropdown">
        <NavDropdown.Item onSelect={buttonLogout}>
        Logout
        </NavDropdown.Item>
        </NavDropdown>
          
        </Nav.Item>
        
      </Nav>
    </Navbar>    
  )
}

export default NavBar
