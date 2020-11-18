//Working with this file
import React, { useContext, useState } from 'react'
const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [user,setUser] = useState()

    const value={
        user
    }
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
