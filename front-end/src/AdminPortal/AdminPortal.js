import React, { useContext, useState } from 'react'
import {Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { FiLogOut } from 'react-icons/fi';
import Spinner from 'react-bootstrap/Spinner';
import Sidebar from '../Sidebar/Sidebar';
import './AdminPortal.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const AdminPortal = () => {
  const {userData,setUserData} = useContext(UserContext);
  const navigate = useNavigate();
  const notifyError = (message) => toast.error(message);
  const [signedIn,setSignedIn] = useState(false);
  
  const signOutHandler = async()=>{
    setSignedIn(true)
    const url = `http://127.0.0.1:8000/logout/`
    try{  
        const res = await axios.post(url,{'username':userData.user_data.username,});
        setUserData({})
        navigate('/');
      }catch (err){
        notifyError('An error occured! Please try again!! ')
      }
    setSignedIn(false)
  }


  return (
    <div className='container-fluid'>
      <div className='row csc-header'>
        <div className='col-4 d-flex justify-content-start align-items-center'/>
        <div className='col-4 d-flex justify-content-center align-items-center'>  
          <span>Admin portal</span>
        </div>
        <div className='col-4 d-flex justify-content-end'>
            <button 
                className='btn btn-danger d-flex align-items-center'
                onClick={()=>signOutHandler()}
                disabled={signedIn}>
                <div className='d-flex align-items-center'>
                    <FiLogOut/>
                    <span className='pl-2'>
                      Sign out 
                    </span>
                    {
                        signedIn?<Spinner animation="grow" />:<></>
                    }
                </div> 
            </button>
        </div>
      </div>

      <div className='row'>
        <div className='col-2'>
          <Sidebar/>
        </div>
        <div className='col-10'> 
          <Outlet/>
        </div>
      </div>
      <div>
        <Toaster toastOptions={{duration: 5000}}/>
      </div>
    </div>
  )
}

export default AdminPortal