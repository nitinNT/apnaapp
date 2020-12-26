import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Tasks from "./Tasks";
import NavBar from "./NavBar";

function ViewTeam(props) {
  const { user } = useAuth();
  const teamID = props.location.state.id;
  const teamName = props.location.state.teamName;

  return (
    <div>
      <NavBar email={user.email} />
      <Container>
        <h2>{teamName}</h2>
        <Tabs>
          <Tab eventKey="tasks" title="Tasks">
            <Tasks key={1} teamid={teamID} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default ViewTeam;
