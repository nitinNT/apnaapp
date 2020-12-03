import React, { useState , useEffect } from 'react'
import { Spinner, Container } from 'react-bootstrap';
import db from '../firebase';

function Teams() {
    const [loading,setLoading ] = useState(true)
    const [teams,setTeams] = useState([])
    useEffect(()=>{
        db.collection('teams').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
            setLoading(false);
            setTeams(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        }
        ); 
      },[])
    return (
        <div>
            {loading ?  
          <div className="center">
            <Spinner animation="grow" variant="dark" />
          </div>
          :
    <Container>
      {console.log(teams)}
      
      </Container>
 }
        </div>
    )
}

export default Teams
