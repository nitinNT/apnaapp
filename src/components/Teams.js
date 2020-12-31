import React, { useState, useEffect } from "react";
import { CardColumns, Spinner, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import db from "../firebase";
import TeamCard from "./TeamCard";

function Teams() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    db.collection("teams")
      .where("members", "array-contains", user.email)
      .onSnapshot((snapshot) => {
        setLoading(false);
        setTeams(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, []);
  return (
    <div class="row">
      <div class="column-2 px-2 mb-r"></div>

      <div class="column-1 px-2 mb-r"></div>

      {teams.map((a, i) => (
        <div class="column-2 px-1 mb-r">
          <div class="card color-dark">
            <TeamCard
              key={i}
              teamId={a.id}
              name={a.teamName}
              createdBy={a.createdBy}
              desc={a.teamDesc}
              numberOfMembers={a.members.length}
              members={a.members}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Teams;
