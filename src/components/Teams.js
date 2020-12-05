import React, { useState, useEffect } from "react";
import { CardDeck,  Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import db from "../firebase";
import TeamCard from "./TeamCard";

function Teams() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    db.collection("teams")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setLoading(false);
        snapshot.docs.map((doc) => {
          if (doc.data().members.includes(user.email) || doc.data().createdBy===user.email) {
            setTeams(
              snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
          }
        });
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div className="center">
          <Spinner animation="grow" variant="dark" />
        </div>
      ) : (
        <div>
          <CardDeck>
            {teams.map((a, i) => (
              <TeamCard key= {i} 
              teamId={a.id}
              name={a.teamName} 
              createdBy={a.createdBy} 
              desc={a.teamDesc}
              numberOfMembers={a.members.length} />
            ))}
          </CardDeck>
        </div>
      )}
    </div>
  );
}

export default Teams;
