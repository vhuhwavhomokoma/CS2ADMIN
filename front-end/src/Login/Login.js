import React from 'react'
import  Modal  from 'react-modal'
import LoginForm from '../LoginForm/LoginForm';
import './Login.css';

const Login = () => {

  return (
    <div className='container-fluid login-bg'>
        <div className='row log-in-container-modal d-flex justify-content-center align-items-center'>
          <div className='log-in-modal '>
            <h1 className='login-title text-center'>Login</h1>
            <LoginForm/>
          </div>
        </div>
    </div>
  )
}

export default Login