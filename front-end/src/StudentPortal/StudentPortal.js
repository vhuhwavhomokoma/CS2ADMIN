import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { BiPlus } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import './StudentPortal.css';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import RequestList from '../RequestList/RequestList';
import Dp from '../Dp/Dp';
import PopUpModal from '../PopUpModal/PopUpModal';
import RequestForm from '../RequestForm/RequestForm';
import axios from 'axios';

const StudentPortal = () => {
    const {userData,modalBool,setModalBool,setUserData,setModalContent,modalContent} = useContext(UserContext);
    const [dp,setDp] = useState({})
    const [requestlist,setRequestlist] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [singedIn,setSignedIn] = useState(false);
    const navigate = useNavigate();
    const notify = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const newRequestHandler =()=>{
      setModalContent({title:'New request',component:<RequestForm setRefresh={setRefresh} refresh={refresh} notify={notify} notifyError={notifyError}/>,url:'/student-portal'})
      setModalBool(true)
      navigate('/student-portal/request/new')
    }
    const signOutHandler = async()=>{
      setSignedIn(true)
      const url = `http://127.0.0.1:8000/logout/`
        try{  
            const res = await axios.post(url,{'username':userData.user_data.username});
            setUserData({})
            navigate('/');
          }catch (err){
            notifyError('An error occured! Please try again!!')
          }
      setSignedIn(false)
    }

    const requestHandler=async()=>{
      const url = `http://127.0.0.1:8000/request/?username=${userData.user_data.username}`
      try{  
            const res = await axios.get(url);
            setRequestlist(res.data)     
        }catch (err){
          setRequestlist([])
        }
    }
    const dpHandler =async()=>{
      const url = `http://127.0.0.1:8000/student-dp/?username=${userData.user_data.username}`
      try{  
            const res = await axios.get(url);
            setDp(res.data) 
        }catch (err){
            setDp({})
        }
    }

    useEffect(()=>{
      dpHandler();
      requestHandler();
    },[refresh])

    return (
        <div className='container-fluid'>
      <div className='row csc-header'>
        <div className='col-4 d-flex justify-content-start align-items-center'>
            {userData.user_data.username}
        </div>
        <div className='col-4 d-flex justify-content-center align-items-center'>  
          <span>Student portal</span>
        </div>
        <div className='col-4 d-flex justify-content-end'>
            <button 
                className='btn btn-danger'
                onClick={signOutHandler}>
                <div className='d-flex align-items-center'>
                    <FiLogOut/>
                    <span className='pl-2'>Sign out</span>
                    {
                      singedIn?<Spinner animation="grow" />:<></>
                    }
                </div> 
            </button>
        </div>
      </div>
      
      <div className='row section-bar'>
        <span>DP status</span>
      </div>

      <div className='row row-padding'>
        <Dp dp={dp}/>
      </div>

      <div className='row section-bar'>
        <span>Requests</span>
        
      </div>

      <div className='row row-padding'>
        <button 
            className='btn btn-primary d-flex justify-content-center'
            onClick={newRequestHandler}
            >
           <BiPlus className='bi-plus'/>
           <span>New request</span>
        </button>
      </div>
      <div className='row row-padding'>
          <div className='list'>
            <RequestList requestlist={requestlist} setRefresh={setRefresh} refresh={refresh} notify={notify} notifyError={notifyError}/>
          </div>
      </div>
      <div className='row' >
        <Outlet/>
      </div>

      <div>
        <Toaster toastOptions={{duration: 5000}}/>
      </div>
    </div>

    )
}

export default StudentPortal