import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FcApproval } from 'react-icons/fc';
import { Outlet, useNavigate } from 'react-router-dom';
import Select from 'react-select'; 
import ListView from '../ListView/ListView';
import toast, { Toaster } from 'react-hot-toast';
import StudentList from '../StudentList/StudentList';
import { UserContext } from '../UserContext/UserContext';
import Spinner from 'react-bootstrap/Spinner';
import './Students.css'



const Students = () => {
  const {userData,setUserData,setModalBool,modalBool,modalContent,setModalContent} = useContext(UserContext);
  const [criticalV,setCriticalV] = useState();
  const [goodV,setGoodV] = useState();
  const [excellentV,setExcellentV] = useState();
  const [file,setFile] = useState();
  const [filecs1,setFileCs1] = useState();
  const [filecs2,setFileCs2] = useState();
  const [studentDoc,setStudentDoS] = useState();
  const [type,setType] =useState();
  const [data,setData] = useState();
  const navigate = useNavigate();
  const [generateReport,setGenerateReport] = useState(false);
  const [uploadCS1,setUploadCS1] = useState(false);
  const [uploadCS2,setUploadCS2] = useState(false);
  const [docUpload,setDocUpload] = useState(false);



  const calculate = async() =>{
    const url = 'http://127.0.0.1:8000//allstudents/'
    try{  
        const res = await axios.get(url);
        setExcellentV(res.data[0].length);
        setGoodV(res.data[1].length);
        setCriticalV(res.data[2].length);
        setData(res.data);
      }catch (err){
        notifyError('An error occured, Please try again!')
      }
  }

  
  const options = [
    {label:'Type of file', value: 'Type of file', disabled: true},
    {label: 'CS1 marks', value: 'CS1 marks'},
    {label: 'CS2 marks', value: 'CS2 marks'},
    {label: 'Students details', value: 'Students details'},
  ]

  const reportHandler =async()=>{
    setGenerateReport(true);
    const url = 'http://127.0.0.1:8000/report/'
    try{ 
        const res = await axios.get(url);
        notify('Report Generated, Check your mail box!!')        
      }catch (err){
        notifyError('An error occured, Please try again!')
      }
    setGenerateReport(false);
  }

  const studentListHandler =async(x)=>{
    if(x ==='critical'){
      setModalBool(true);
      setModalContent({title:'View critical students',component:<ListView List={data[2]}/>,url:'/admin-portal/students'});
      navigate('/admin-portal/students/list/critical-students');
    }else if(x==='good'){
      setModalBool(true);
      setModalContent({title:'View good students',component:<ListView List={data[1]}/>,url:'/admin-portal/students'});
      navigate('/admin-portal/students/list/good-students');
    }else{
      setModalBool(true);
      setModalContent({title:'View excellent students',component:<ListView List={data[0]}/>,url:'/admin-portal/students'});
      navigate('/admin-portal/students/list/excellent-students');
    }
  } 
  
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const uploadDocHandler = async(type)=>{
    if (type==='cs1'){
      setUploadCS1(true)
      const url = 'http://127.0.0.1:8000/loadcs1grades/'
      const formdata = new FormData();
      formdata.append('file',filecs1);
      try{  
        const res = await axios.post(url,formdata);
        notify('File uploaded!')
        
      }catch (err){
        notifyError('An error occured, Please try again!')
      }
      setUploadCS1(false)
    }else if(type ==='cs2'){
      setUploadCS2(true);
      const url = 'http://127.0.0.1:8000/loadcurrentgrades/'
      const formdata = new FormData();
      formdata.append('file',filecs2);
      try{  
        const res = await axios.post(url,formdata);
        notify('File uploaded!')
        
      }catch (err){
        notifyError('An error occured, Please try again!')
      }
      setUploadCS2(false);

    }else{
      setDocUpload(true)
      const url = 'http://127.0.0.1:8000/addstudents/'
      const formdata = new FormData();
      formdata.append('file',studentDoc);
      try{  
        const res = await axios.post(url,formdata);
        notify('File uploaded!')
        
      }catch (err){
        notifyError('An error occured, Please try again!')
      }
      setDocUpload(false)
    }
  }

  useEffect(()=>{
    calculate()
  },[])

  return (
    <div> 
      <div className='row section-bar'>
        <span>
          Students Review
        </span>
      </div>

      <div className='row'>
        <label className='view-request-heading mx-2 px-2'>Admin</label>
        <div className='px-2'>
          <a href={'http://127.0.0.1:8000/admin/'} target="_blank" className='btn btn-primary' >Click here to see admin database</a>
        </div>
        <button className='btn btn btn-primary mx-2 d-flex align-items-center' onClick={()=>reportHandler()} disabled={generateReport}>
          Generate Report
          {
            generateReport?<Spinner animation="grow" />:<></>
            
          }
          
        </button>
      </div>

      <div className='row'>
        <label className='view-request-heading mx-2 mt-4 px-2'>Performance</label>
        <div>
          <button className='btn btn-link' onClick={()=>studentListHandler('critical')}>Critical({criticalV})</button>
          <button className='btn btn-link' onClick={()=>studentListHandler('good')}>Good({goodV})</button>
          <button className='btn btn-link' onClick={()=>studentListHandler('excellent')}>Excellent({excellentV})</button>
        </div>
      </div>
      <div className='row mt-2'>
        <label className='view-request-heading mx-2 px-2'>Uploads</label>
        <div className='col-12 d-flex py-2'>
          <div className='col-2'>Upload CS1 marks:</div><input type='file' className='form-control-file col-2' onChange={(e)=>setFileCs1(e.target.files[0])}/>
            <button className='btn btn-primary d-flex align-items-center' onClick={()=>uploadDocHandler('cs1')} disabled={uploadCS1}>
              Upload
              {
                uploadCS1?<Spinner animation="grow" />:<></>
              }
            </button>
        </div>
        <div className='col-12 d-flex py-2'>
        <div className='col-2'>Upload CS2 marks:</div><input type='file' className='form-control-file col-2' onChange={(e)=>setFileCs2(e.target.files[0])}/>
          <button className='btn btn-primary d-flex align-items-center' onClick={()=>uploadDocHandler('cs2')} disabled={uploadCS2}>
            Upload
            {
              uploadCS2?<Spinner animation="grow" />:<></>
            }
          </button>

        </div>
        <div className='col-12 d-flex py-2'>
        <div className='col-2'>Upload Student list:</div><input type='file' className='form-control-file col-2' onChange={(e)=>setStudentDoS(e.target.files[0])}/>
          <button className='btn btn-primary' onClick={()=>uploadDocHandler('student')} disabled={docUpload}>
            Upload
            {
              docUpload?<Spinner animation="grow" />:<></>
            }
          </button>

        </div>
      </div>

      <div className='row'>
        <label className='view-request-heading mx-2 mt-4 px-2'>Document(s)</label>
        <div>
          <a href={'http://127.0.0.1:8000/releasedp/'} target="_blank" className='btn btn-link col-12 d-flex justify-content-start'>DP_list.xlsx</a>
          <a href={'http://127.0.0.1:8000/adjustment/'} target="_blank" className='btn btn-link col-12 d-flex justify-content-start'>Request_list.xlsx</a>
          <a href={'http://127.0.0.1:8000/needsupport/'} target="_blank" className='btn btn-link col-12 d-flex justify-content-start'>Student_support_list.xlsx</a>
        </div>
      </div>
      <div className='row'>
        <Outlet/>
      </div>

      <div>
        <Toaster toastOptions={{duration: 6000}}/>
      </div>
    </div>
  )
}

export default Students