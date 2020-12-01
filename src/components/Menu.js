import React from 'react'
import Tab from 'react-bootstrap/Tab'
import { Col, Nav, Row } from "react-bootstrap";
import AddNewPost from './AddNewPost';
import Search from './Search';
import JiraBoard from './JiraBoard';


function Menu({user}) {
    return (
        <div style={{marginTop:'2%'}}>
<Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={2}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">Issues</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Search</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">Board</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <AddNewPost/>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <Search/>
        </Tab.Pane>
        <Tab.Pane eventKey="third">
          <JiraBoard/>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>

        </div>
    )
}

export default Menu
