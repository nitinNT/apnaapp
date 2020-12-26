import React, { useContext, useState , useEffect} from 'react'
import {auth, googleprovider ,githubprovider } from '../firebase'

const AuthContext = React.createContext()



export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [user,setUser] = useState()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    
    function logout() {
        return auth.signOut()
    }
    
    function googleSignIn(){
        return auth.signInWithPopup(googleprovider)
        
    }
    function githubSignIn(){
        return auth.signInWithPopup(githubprovider)
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setUser(user)
        })
    
        return unsubscribe
    }, [])
    const value={
        user,
        signup,
        signin,
        resetPassword,
        logout,
        googleSignIn,
        githubSignIn
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
