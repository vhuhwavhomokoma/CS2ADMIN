import './App.css';
import React, {useMemo, useState} from "react";
import Login from './Login/Login';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import StudentPortal from './StudentPortal/StudentPortal';
import { UserContext } from './UserContext/UserContext';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import AdminPortal from './AdminPortal/AdminPortal';
import RequestList from './RequestList/RequestList';
import AdminRequests from './AdminRequests/AdminRequests';
import PopUpModal from './PopUpModal/PopUpModal';
import ViewRequest from './ViewRequest/ViewRequest';
import Students from './Students/Students';


function App() {
  const [userData, setUserData] = useState({});
  const [modalContent,setModalContent] = useState({});
  const [modalBool,setModalBool] = useState(false)

  const providerValue = useMemo(()=>({userData,setUserData,setModalBool,modalBool,modalContent,setModalContent}),[userData,setUserData,setModalBool,modalContent,setModalContent])
  return (
    <div className='container-fluid '>
      <div className='row app'>
        <UserContext.Provider value={providerValue}> 
          <Router>
              <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route element={<ProtectedRoutes/>}>
                    <Route path='/student-portal' element={<StudentPortal/>}>
                      <Route path='/student-portal/request/new' element={<PopUpModal modalBool={modalBool} setModalBool={setModalBool} modalContent={modalContent}/>}/>
                      <Route path='/student-portal/request/:id' element={<PopUpModal modalBool={modalBool} setModalBool={setModalBool} modalContent={modalContent}/>}/>
                    </Route>
                    <Route path='/admin-portal' element={<AdminPortal/>}>
                      <Route index element={<AdminRequests/>}/>
                      <Route path='/admin-portal/requests' element={<AdminRequests/>}>
                        <Route path='/admin-portal/requests/request/:id' element={<PopUpModal modalBool={modalBool} setModalBool={setModalBool} modalContent={modalContent}/>}/>
                      </Route>
                      <Route path='/admin-portal/students' element={<Students/>}>
                        <Route path='/admin-portal/students/list/critical-students' element={<PopUpModal modalBool={modalBool} setModalBool={setModalBool} modalContent={modalContent}/>}/>
                        <Route path='/admin-portal/students/list/good-students' element={<PopUpModal modalBool={modalBool} setModalBool={setModalBool} modalContent={modalContent}/>}/>
                        <Route path='/admin-portal/students/list/excellent-students' element={<PopUpModal modalBool={modalBool} setModalBool={setModalBool} modalContent={modalContent}/>}/>
                      </Route>
                    </Route>
                  </Route>
              </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </div>
    
  );
}

export default App;

