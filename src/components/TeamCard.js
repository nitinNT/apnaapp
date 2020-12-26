import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { People } from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'
import '../components/Home.css'

function TeamCard({name,createdBy,desc,numberOfMembers,teamId,members}) {
    const  history = useHistory();
    const viewTeam =(e)=>{
        e.preventDefault()
        history.push({
            pathname:"/team",
            state:{id:teamId,teamName:name}
        })

    }
    return (
        <div>
            <Row>
            <Card border="dark" style={{ width: '18rem' }} >
    <Card.Header onClick={e => viewTeam(e)}>{name}</Card.Header>
    <Card.Body>
      <Card.Text>
        {desc}
      </Card.Text>
      
      <Card.Footer>
    <small className="text-muted">admin:{createdBy}</small>
    <br/><People/><small className="text-muted">{numberOfMembers}</small>
    </Card.Footer>

    </Card.Body>
  </Card>
  </Row>

            
        </div>
    )
}

export default TeamCard
