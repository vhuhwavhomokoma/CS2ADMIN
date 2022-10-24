import React,{useContext, useEffect, useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './LoginForm.css'
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../UserContext/UserContext';
import Spinner from 'react-bootstrap/Spinner';


const LoginForm = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [routURL,setRoutURL] = useState('');
    const [loading,setLoading] = useState(false);
    const {userData,setUserData,setModalBool,modalContent,setModalContent} = useContext(UserContext);
    const [formEmpy,setFormEmpty] = useState(false);
    const navigate = useNavigate();

    const notify = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const loginHandler = async()=>{
        setLoading(true);
        const url = 'http://127.0.0.1:8000/login/'
        try{  
            const res = await axios.post(url,{username:username,password:password});
            setUserData(res.data);
            if (res.data.user_data.username==='admin'){
                navigate('/admin-portal');

                
            }else{
                navigate('/student-portal');

            }
        }catch (err){
            setErrMsg('Invalid username or password!!')
            notifyError('An error occured! Please try again!');
        }
        setLoading(false)
    }

    useEffect(()=>{
        setErrMsg('');
    },[username,password])

    return (
        <div className='container'>
            <div className='row login-form-modal'> 
                <div className='col-3'>
                    <text>Username</text>
                </div>
                <div className='col-9 username'>
                    <input
                        className='form-control'
                        name='username'
                        type={'text'}
                        value={username}
                        placeholder={'Your username'}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                        />
                </div>

                <div className='col-3'>
                    <text>Password</text>
                </div>
                <div className='col-9 password'>
                    <input
                        className='form-control'
                        password='password'
                        type={'password'}
                        value={password}
                        placeholder={'Password'}
                        onChange={(e)=>setPassword(e.target.value)}
                        
                        />
                    <text className='error-msg'>{errMsg}</text>


                </div>
                <div className='col-3'/>
                    <div className='col-9 d-flex justify-content-between'> 
                        <button 
                            className='btn btn-primary d-flex align-items-center'
                            type='submit'
                            onClick={()=>loginHandler()}
                            >
                            Login
                            {
                               loading?<Spinner animation="grow" />:<></> 
                            }
                        </button>
                        <a href={'http://localhost:8000/home/'} className='btn btn-link' target="_blank">Register</a>
                    </div>
            </div>
                <div>
                    <Toaster toastOptions={{duration: 5000}}/>
                </div>
        </div>
    )
}

export default LoginForm