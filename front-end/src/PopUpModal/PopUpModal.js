import React, { useContext, useEffect } from 'react';
import  Modal  from 'react-modal';
import { CgClose } from 'react-icons/cg';
import './PopUpModal.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

const PopUpModal = ({modalBool,setModalBool,modalContent}) => {
  const navigate = useNavigate();
  const closeHandler=()=>{
    setModalBool(!modalBool)
    navigate(modalContent.url)

  }
 
  return (
      <Modal isOpen={modalBool} ariaHideApp={false} className='modal-container'>
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">
                {modalContent.title}
              </span>
              <div className='close'>
                <CgClose className='close-btn'onClick={()=>closeHandler()} />
              </div>
            </div>

            <div>
              {
                modalContent.component
              }
            </div>
          </div>
        </div>
      </Modal>
  )
}

export default PopUpModal