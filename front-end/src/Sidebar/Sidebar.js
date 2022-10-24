import React from 'react'
import {useNavigate } from 'react-router-dom'
import './Sidebar.css'
const Sidebar = () => {
    const navigate = useNavigate();

    const navigatortHandler = (type)=>{
        if(type==='requests'){
            navigate('/admin-portal/requests');
        }else{
            navigate('/admin-portal/students');
        }   
    }
  return (
        <div>
            <div className='row'>
                <div className='sidebar'>
                    <li onClick={()=>navigatortHandler('requests')}>Requests</li>
                    <li onClick={()=>navigatortHandler('students')}>Students Review</li>
                </div>
            </div>
        </div>
  )
}

export default Sidebar