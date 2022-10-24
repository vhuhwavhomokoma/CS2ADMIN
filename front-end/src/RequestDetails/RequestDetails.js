import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select'; 
import './RequestDetails.css'
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import Document from '../Document/Document';


const RequestDetails = ({request,setRefresh,refresh,notify,notifyError}) => { 
  const [status,setStatus] = useState({label:request.status,value:request.status});
  const [comment,setComment] = useState(request.comment);
  const {setModalBool} = useContext(UserContext);
  const [editRequest,setEditRequest] = useState(true);
  const navigate = useNavigate();


  const options = [
    {label:'Choose Status', value: 'choose-status', disabled: true},
    {label: 'Pending', value: 'Pending'},
    {label: 'Approved', value: 'Approved'},
    {label: 'Declined', value: 'Declined'},
  ]

  const deleteHandler = async(id)=>{
    const url = `http://127.0.0.1:8000/deleteRequest/`
    try{  
        const res = await axios.post(url,{'id':id});
        setRefresh(!refresh);
        setModalBool(false);
        notify('Request deleted!!')
    }catch (err){
      notifyError('An error occured! Please try again!!')
    }
    
}

  return (
      <div className="container">
        <div className='row'>
        <div className='modal-body'>
            <div className='form'>
              <div className="form-group">
                <label for="status" className='view-request-heading px-2'>Status</label>
                <div>
                  {
                    !editRequest?<span className='text-danger'>*</span>:<></>
                  }
                  <Select isDisabled={editRequest} value={status} options={options} isOptionDisabled={(option) => option.disabled} onChange={(e)=>setStatus({label: e.label, value: e.label})}/>
                </div>

              </div>

              <div className="form-group">
                <label for="dateRequested" className='view-request-heading px-2'>Date requested</label>
                <div className='px-2 text-muted'>{request.created.split('T')[0]}</div>
              </div>

              <div className="form-group">
                <label for="requestType" className='view-request-heading px-2'>Request type</label>
                <div className='px-2 text-muted'>{request.type}</div>
              </div>

              <div className="form-group">
                <label for="dateRange" className='view-request-heading px-2'>Date range</label>
                <div className='px-2 text-muted'>
                  {
                    request.fromDate.split('T')[0] + ' - ' +   request.toDate.split('T')[0]
                  }
                </div>
              </div>

              <div className="form-group ">
                <label for="reason" className='view-request-heading px-2'>Reason</label>
                <div className='px-2 text-muted'>{request.motivation}</div>
              </div>

              <div className="form-group">
                <label for="file" className='view-request-heading px-2'>support document(s)</label>
                <div className='px-2 text-muted'>
                  <Document filename={request.filepath.split('/')[request.filepath.split('/').length -1]} link={'http://127.0.0.1:8000'+request.filepath}/>
                </div>
              </div>

              <div className="form-group">
            <label for="comment" className='view-request-heading px-2'>Comment</label>
            <textarea className="form-control" placeholder='Type comment here...' rows={3} value={comment} onChange={(e)=>setComment(e.target.value)} disabled={editRequest}/>
          </div>
            </div>
        </div>
        </div>
        {
          request.status!=='Pending'?<></>:<div className='row'>
            <div className='modal-footer'>
              <button className='btn btn-danger' onClick={()=>deleteHandler(request.id)}>Delete</button>
            </div>
          </div>   
        } 
      </div>
  )
}

export default RequestDetails