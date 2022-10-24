import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select'; 
import {BsDash} from 'react-icons/bs';
import './RequestForm.css';
import {UserContext } from '../UserContext/UserContext';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';




const RequestForm = ({setRefresh,refresh,notify,notifyError}) => {
  const [type,setType] = useState('Choose type of request'); 
  const [reason,setReason] = useState('');
  const [fromDate,setFromDate] = useState('2022-01-01');
  const [toDate,setToDate] = useState('2022-12-31');
  const [file,setFile] = useState('');
  const {userData,modalBool,setModalBool,setUserData,setModalContent,modalContent} = useContext(UserContext);
  const [filled,setFilled]=useState(false);
  const [loading,setLoading] = useState(false);


  const options = [
    {label:'Choose Request Type', value: 'choose-type', disabled: true},
    {label: 'Short Leave', value: 'short-leave'},
    {label: 'Extension', value: 'extension'},
    {label: 'Exemption', value: 'exemption'},
  ]

  const submitRequest =async()=>{
    setLoading(true)
    setFilled(false)
    const url = 'http://127.0.0.1:8000/request/'
    const formdata = new FormData();
    formdata.append('requesttype',type);
    formdata.append('file',file);
    formdata.append('motivation',reason);
    formdata.append('studentNum',userData.user_data.username);
    formdata.append('datefrom',fromDate + ' 00:00:00');
    formdata.append('dateTo',toDate + ' 00:00:00')

    try{  
      const res = await axios.post(url,formdata);
      setRefresh(!refresh);
      setModalBool(false);
      notify('Request submitted!');
    
    }catch (err){
      notifyError('An error occured! Please try again!! ')
    }
    setFilled(true)
    setLoading(false)
  }

  const isFilled = ()=>{
    if(type!=='Choose type of request' && reason!=='' && fromDate!=='2022-01-01' && toDate!=='2022-12-31' && file!=='') 
    {
      setFilled(true)
    }else{
      setFilled(false)
    }
  }

  useEffect(()=>{
    isFilled()
  },[type,reason,fromDate,toDate,file])

  return (
    <div className='container'>
      <div className='row'>
        <div className='modal-body'>
            <div className='form'>
              <div className='form-group'>
                <label className='view-request-heading px-2'>Request type</label>
                {
                   type!=='Choose type of request'?<></>:<span className='text-danger'>*</span>
                }
                <Select placeholder={type} options={options} isOptionDisabled={(option) => option.disabled} onChange={(e)=>setType(e.label)}/>
              </div>

              <div className='form-group'>
                <label className='view-request-heading px-2'>Date range</label>
                {
                  fromDate!=='2022-01-01' && toDate!=='2022-12-31'?<></>:<span className='text-danger'>*</span>
                }
                <div className='row'>
                  <div className = 'col-md-5'>
                    <input type='date' min={'2022-01-01'} max={toDate ==='2022-12-31' ?'2022-12-31':toDate} className='form-control' onChange={(e)=>setFromDate(e.target.value)} required={true}/>
                  </div>

                  <div className='col-md-2 d-flex align-items-center justify-content-center'>
                    <span className='input-group-addon'>
                      <BsDash/> 
                    </span>
                  </div>

                  <div className = 'col-md-5'>
                    <input type='date' min={fromDate==='2022-01-01'?'2022-01-01':fromDate} max={'2022-12-31'} className='form-control'  onChange={(e)=>setToDate(e.target.value)}/>   
                  </div>
                </div>              
              </div>

              <div className='form-group'>
                <label className='view-request-heading px-2'>Reason</label>
                {
                   reason!==''?<></>:<span className='text-danger'>*</span>
                }
                <textarea className='form-control' rows={3} placeholder= 'Type reason for request here...' onChange={(e)=>setReason(e.target.value)} />
              </div>
            </div>

            <div className='form-group'>
              <label className='view-request-heading px-2'>Support document(s)</label>
              {
                  file!==''?<></>:<span className='text-danger'>*</span>
              }
              <input type='file' className='form-control-file' onChange={(e)=>setFile(e.target.files[0])}/>
              <small  className='form-text text-muted'>PDF,DOCX, JPG,PNG</small>
            </div>
        </div>
      </div>
      <div className='row'>
          <div className='modal-footer'>
            <button className='btn btn-danger'  onClick={()=>setModalBool(false)} >Cancel</button>
            <button className='btn btn-primary' disabled={!filled}  onClick={()=>submitRequest()} >
              Submit
              {
                loading?<Spinner animation="grow" />:<></>
              }
            </button>
          </div>
        </div>    
    </div>
  )
}

export default RequestForm