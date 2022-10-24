import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext'

const TokenPresent = () =>{
    const {userData,setUserData,setModalBool,modalContent,setModalContent} = useContext(UserContext);
    const token = userData.token;
    return(token!=null);
}
const ProtectedRoutes = ()=>{
    const isToken = TokenPresent();
    return isToken ? <Outlet/> : <Navigate to='/'/>; 
}


export default ProtectedRoutes