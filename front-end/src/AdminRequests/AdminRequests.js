import axios from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Select from 'react-select'; 
import { MdPendingActions } from 'react-icons/md';
import { GrConfigure, GrList } from 'react-icons/gr';
import { FcApproval } from 'react-icons/fc';
import { IoCloseCircle } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa';
import PopUpModal from '../PopUpModal/PopUpModal';

import './AdminRequests.css'
import ViewRequest from '../ViewRequest/ViewRequest';
import  {Outlet, useNavigate} from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

const AdminRequests = () => {
    const [requestlist,setRequestlist] = useState([]);
    const navigate = useNavigate();
    const {userData,setUserData,setModalBool,modalBool,modalContent,setModalContent} = useContext(UserContext);
    const [filterList,setFilterList] = useState([]);
    const [filterStatus,setFilterStatus] = useState('All');
    const [refresh,setRefresh] = useState(true);
    const [num, setNum] = useState(0);
    const options = [
        {label: 'All', value: 'all'},
        {label: 'Pending', value: 'pending'},
        {label: 'Approved', value: 'approved'},
        {label: 'Declined', value: 'declined'},
      ]

    const viewHandler =(req)=>{
        navigate(`/admin-portal/requests/request/${req.id}`);
        setModalContent({title:'View request',component:<ViewRequest request={req} setRefresh={setRefresh} refresh={refresh}/>})
        setModalBool(true);
    }
    
    const requetsLength =()=>{
        return(requestlist.length)
    }

    const requestPending = ()=>{
        return(requestlist.filter(x => x.status=='Pending').length)

    }

    const requestApproved = ()=>{
        return(requestlist.filter(x => x.status=='Approved').length)
    }

    const requestDeclined = ()=>{
        return(requestlist.filter(x => x.status=='Declined').length)
        
    }
    
    
    const filterHandler=async(x)=>{
        if (x==='All'){
            const url = 'http://127.0.0.1:8000/request-view/';
            try{  
                const res = await axios.get(url);
                setRequestlist(res.data)
                setFilterList(res.data)
            }catch (err){
                console.log(err)       
            }
        }else {
            const url = `http://127.0.0.1:8000/request-filter?status=${x}`;
            try{  
                const res = await axios.get(url);
                setFilterList(res.data);      
            }catch (err){
                console.log(err)       
            }
        }
    } 

    const triggerAll = () =>{
        setRefresh(!refresh);
        setFilterStatus('All')
    }
    const triggerPending=()=>{
        setRefresh(!refresh);
        setFilterStatus('Pending')
    }
    const triggerApproved = ()=>{
        setRefresh(!refresh);
        setFilterStatus('Approved')
    }
    const triggerDeclined = ()=>{
        setRefresh(!refresh);
        setFilterStatus('Declined')
    }

    useEffect(()=>{
        filterHandler(filterStatus);
    },[refresh])
    
  return (
    <div>  
        <div className='row section-bar'>
            <span>Requests</span>
        </div>
        
        <div className="form-inline">
            <button className='btn btn-link' onClick={()=>triggerAll()}>
                <small  className="form-text d-flex align-items-center">
                    <GrList/>
                    <span >
                        All ({requetsLength()})
                    </span>
                </small>
            </button>
            
            <button className='btn btn-link' onClick={()=>triggerPending()}>
                <small  className="form-text d-flex align-items-center">
                    <MdPendingActions/>
                    <span>
                        Pending ({requestPending()})
                    </span>
                </small>
            </button>

            <button className='btn btn-link' onClick={()=>triggerApproved()}>
                <small  className="form-text d-flex align-items-center">
                    <FcApproval/>
                    <span>
                        Approved ({requestApproved()})
                    </span>
                </small>
            </button>
                
            <button className='btn btn-link' onClick={()=>triggerDeclined()}>
                <small  className="form-text d-flex align-items-center ">
                    <IoCloseCircle className='decline-icon'/>
                    <span>
                        Declined ({requestDeclined()})
                    </span>
                </small>
            </button>
                
        </div>

        <div><Outlet/></div>
        <div className='request-list'>
            <table className='table admin-request'>
            <thead>
                <tr>
                <th scope='col'>Date requested</th>
                <th scope='col'>Student number</th>
                <th scope='col'>Details</th>
                <th scope='col'>Status</th>
                <th scope='col'>Action</th>
                </tr>
            </thead>

            <tbody>
            {
            filterList.map((request)=>(
                <tr>
                <th scope='row' >{request.created.split('T')[0].replace(/-/g,'/')}</th>
                <td>{request.studentNum}</td>
                <td>{request.type+': '+request.fromDate.split('T')[0].replace(/-/g,'/')+'-'+request.toDate.split('T')[0].replace(/-/g,'/')}</td>
                <td>
                    {request.status}    
                </td>
                <td>
                    <button className='btn btn-primary d-flex justify-content-center align-items-center' onClick={()=>viewHandler(request)}>
                        <FaRegEye/>
                        <span className='px-2'>
                            View
                        </span>    
                    </button>
                </td>
                </tr>
                ))
            }  
            </tbody>
            </table>
        </div>

    </div>
  )
}

export default AdminRequests