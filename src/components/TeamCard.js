import React from "react";
import { Card, Row } from "react-bootstrap";
import { Eye, People } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import "../components/Home.css";

function TeamCard({ name, createdBy, desc, numberOfMembers, teamId, members }) {
  const history = useHistory();
  const viewTeam = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/team",
      state: { id: teamId, teamName: name },
    });
  };
  return (
    <div class="card-body">
      <h4 class="card-title black-text">{name}
      <Eye style={{float:'right'}} onClick={viewTeam}/>
      </h4>
      
      <p class="card-text black-text">
        {desc}
      </p>
      <p class="card-text black-text">
        <People/>{numberOfMembers}
        
      </p>
      <p class="card-text black-text">
        created By {createdBy.split('@')[0]}
      </p>

    </div>
  );
}

export default TeamCard;
