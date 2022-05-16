
import { useEffect, useState } from 'react'
import Login from '../Routes/Login';
import { Outlet } from 'react-router'

const userAuthenticated = (email, password, token) => {
    let user;
     if ( [email , password] === token){
         user = { loggedIn : true }
         return user && user.loggedIn;
     } else {
        user = { loggedIn : true }
        return user && user.loggedIn;
     } 
}

const ProtectedRoutes = () => {
    
    // useEffect(() => {
    //        const token = localStorage.getItem('token')
    //  if(token) {
    //      const user = jwt.decode(token)
    //      if(!user) {
    //          localStorage.removeItem('token')
    //          history.replace('/login')
    //      }
    //      else {
    //          populateQuote();
    //      }
    //     }
    // }, [])
    const isAuthenticated = userAuthenticated();
    return isAuthenticated ? <Outlet /> : <Login />
}

export default ProtectedRoutes;