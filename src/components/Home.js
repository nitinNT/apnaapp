import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Menu from './Menu';

import NavBar from './NavBar'



function Home() {
    const { user}  = useAuth();
    console.log(user)
    return (
        <div>
            <NavBar email={user.email}  /> 
            <Menu user={user}/>
            {/* <AddNewPost/> */}
        </div>
    )
}

export default Home
