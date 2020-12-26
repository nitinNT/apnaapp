import React, { useState, useEffect } from "react";
import {  CardColumns, Spinner, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import db from "../firebase";
import TeamCard from "./TeamCard";

function Teams() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    db.collection("teams")
      .where('members','array-contains',user.email)
      .onSnapshot((snapshot) => {
        setLoading(false);
        setTeams(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
      });
      
  },[]);
  return (
    <Container>
      {loading ? (
        <div className="center">
          <Spinner animation="grow" variant="dark" />
        </div>
      ) : (
        <Container>
          <CardColumns>
            {teams.map((a, i) => (
              <TeamCard key= {i} 
              teamId={a.id}
              name={a.teamName} 
              createdBy={a.createdBy} 
              desc={a.teamDesc}
              numberOfMembers={a.members.length}
              members={a.members} />
          
            ))}
          </CardColumns>
        </Container>
      )}
    </Container>
  );
}

export default Teams;
