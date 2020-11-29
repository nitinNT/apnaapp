import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AddNewPost from './AddNewPost'
import Menu from './Menu';

import NavBar from './NavBar'



function Home() {
    const { user}  = useAuth();
    return (
        <div>
            <NavBar email={user.email} />            
            <Menu/>
            {/* <AddNewPost/> */}
        </div>
    )
}

export default Home
