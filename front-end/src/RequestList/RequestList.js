import React, { useContext, useState } from 'react'
import RequestDetails from '../RequestDetails/RequestDetails';
import { FaRegEye } from 'react-icons/fa';

import './RequestList.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';

const RequestList = ({requestlist,setRefresh,refresh,notify,notifyError}) => {
    const {userData,setUserData,setModalBool,modalBool,modalContent,setModalContent} = useContext(UserContext);
    const navigate = useNavigate();
    const requestDetailHandler=(request)=>{
        setModalContent({title:'View request',component:<RequestDetails request={request} refresh={refresh} setRefresh={setRefresh} notify={notify} notifyError={notifyError}/>})
        setModalBool(true);
        navigate(`/student-portal/request/${request.id}`);
    }
    
    const deleteHandler = async(id)=>{
        const url = `http://127.0.0.1:8000/deleteRequest/`
        try{  
            const res = await axios.post(url,{'id':id});
            setRefresh(!refresh);
            notify('Request deleted!')
        }catch (err){
            notifyError('An error occured! Please try again!! ')
        }
        
    }

    const list =()=>{
        return(
            <table className='pt-4 table admin-request'>
                    <thead>
                        <tr>
                        <th scope='col'>Date requested</th>
                        <th scope='col'>Details</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                    requestlist.map((request)=>(
                        <tr>
                        <td>{request.created.split('T')[0].replace(/-/g,'/')}</td>
                        <td>{request.type+': '+request.fromDate.split('T')[0].replace(/-/g,'/')+' - '+request.toDate.split('T')[0].replace(/-/g,'/')}</td>
                        <td>
                            {request.status}
                        </td>
                        <td>
                            <div className='row'>
                                <div>
                                    <button className='btn btn-primary d-flex justify-content-center align-items-center' onClick={()=>requestDetailHandler(request)}>
                                    <FaRegEye/>
                                    <span className='px-2'>
                                        View
                                    </span>    
                                    </button>
                                </div>
                                <div className='px-2'>
                                    {
                                    request.status==='Pending'? <button className='btn btn-danger' onClick={()=>deleteHandler(request.id)}>Delete</button>:<></>
                                    }
                                </div>
                            </div>
                        </td>
                        </tr>
                        ))
                    }  

                    </tbody>
                </table>
        )
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                {
                    list()
                }
            </div>
        </div>
    )
}

export default RequestList
