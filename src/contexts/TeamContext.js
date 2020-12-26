import React, { useContext, useState } from 'react'
import db from '../firebase'

const TeamContext = React.createContext();

export function useTeam(){
    return useContext(TeamContext)
}
export function TeamProvider({children}){
    const [team,setTeam]=useState();

    function getMembers(teamID){
        db.collection('teams').doc(teamID).get().then((snapshot)=>{
            setTeam({id:snapshot.id ,...snapshot.data()})
        })
        return team
    }

    const value={
        team,getMembers
    }

    return (
    <TeamContext.Provider value={value}>
        {children}
    </TeamContext.Provider>
)
}
export default TeamProvider;