import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function NavBar() {
    return (
        <Navbar bg="primary" variant="dark" fixed="top">
        <Nav className="container-fluid">
          <Nav.Item>
            <Navbar.Brand>DH App</Navbar.Brand>
          </Nav.Item>
          <Nav.Item className="ml-auto">
              <h6>Testing</h6>
          </Nav.Item>
          <Nav.Item className="mr-sm-2">
          <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Nav.Item>
        </Nav>
      </Navbar>    
    )
}

export default NavBar
