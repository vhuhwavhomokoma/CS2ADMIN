import React, { useContext, useEffect, useState } from 'react';
import './ViewRequest.css';
import Select from 'react-select'; 
import Document from '../Document/Document';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';


const ViewRequest = ({request,refresh,setRefresh}) => {
  const [status,setStatus] = useState({label:request.status,value:request.status});
  const [comment,setComment] = useState(request.comment);
  const {setModalBool} = useContext(UserContext);
  const [editRequest,setEditRequest] = useState(true);
  const [loading,setLoading] = useState(false);
  
  const navigate = useNavigate()
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const options = [
    {label:'Choose Status', value: 'choose-status', disabled: true},
    {label: 'Pending', value: 'Pending'},
    {label: 'Approved', value: 'Approved'},
    {label: 'Declined', value: 'Declined'},
  ]

  const updateHandler =async()=>{
    setLoading(true)
    const url = `http://127.0.0.1:8000/request-view/`
    try{  
        const res = await axios.post(url,{'id':request.id,'reason':comment,'status':status.label});
        setModalBool(false);
        notify('Request updated!');
      }catch (err){
        notifyError('An error occured, Please try again!');
      }
    setRefresh(!refresh)
    setLoading(false)
  }

  const cancelHandler=()=>{
    setEditRequest(!editRequest);
    setStatus({label:request.status,value:request.status});
    setComment(request.comment);
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
                <label for="studentNumber" className='view-request-heading px-2'>Student number</label>
                <div className='text-muted px-2'>{request.studentNum}</div>
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
              {
                    request.status==='Declined'?<span className='text-danger'>*</span>:<></>
              }
             <textarea className="form-control" placeholder='Type comment here...' rows={3} value={comment} onChange={(e)=>setComment(e.target.value)} disabled={editRequest}/>
          </div>
            </div>
        </div>
        </div>
        <div className='row'>
          <div className='modal-footer'>
              {
                !editRequest?<></>:<button className='btn btn-secondary' onClick={()=>setEditRequest(!editRequest)} > Edit</button>
              }

              {
                editRequest?<></>:<button className='btn btn-danger' onClick={()=>cancelHandler()}>Cancel</button>
              }

              {
                editRequest?<></>:<button className='btn btn-primary d-flex align-items-center' disabled={loading} onClick={()=>updateHandler()}>Update{loading?<Spinner animation="grow" />:<></>              }</button>
              }
          </div>
        </div> 

        <div>
          <Toaster toastOptions={{duration: 6000}}/>
        </div>   
      </div>
  )
}

export default ViewRequest