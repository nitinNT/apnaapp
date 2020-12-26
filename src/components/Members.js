import React, { useEffect, useState } from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import { useTeam } from '../contexts/TeamContext'

function Members({teamid}) {
    const {getMembers}= useTeam();
    const [teamMem,setTeamMem] = useState();
    useEffect(()=>{
        setTeamMem(getMembers(teamid))
    },[])
    return (
        <Container>
            <ListGroup>
                {
                    teamMem.members.map((member,i)=>{return <ListGroup.Item key={i} variant="dark">
                            {member}
                        </ListGroup.Item>
                    })
                }
                <ListGroup.Item>({teamid.toString()}</ListGroup.Item>
                
            </ListGroup>

        </Container>
    )
}

export default Members
