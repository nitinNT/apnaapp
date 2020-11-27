import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AddNewPost from './AddNewPost'

import NavBar from './NavBar'



function Home() {
    const { user}  = useAuth();
    console.log(user)
    return (
        <div>
            <NavBar email={user.email} />            
            <AddNewPost/>
        </div>
    )
}

export default Home
