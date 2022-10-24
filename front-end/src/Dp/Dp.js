import React, { useState } from 'react';
import { BiCheckbox } from 'react-icons/bi';
import './Dp.css';

const Dp = ({dp}) => {
    const dpHandler = ()=>{
        if (JSON.stringify(dp) === JSON.stringify({})){
           return(<span className='red-zone'>Somthing went wrong, please refresh the page to see DP status</span>)
        }else{
            return(
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-start align-items-center'>
                            <span >
                                Your DP mark:
                            </span>
                            <span className='px-2'>
                                {
                                    dp.dp+' %'
                                }
                            </span>
                            <span
                                className={dp.dp<45 ? 'red-zone dp-status' : (dp.dp>44 && dp.dp<60) ? 'orange-zone dp-status':'green-zone dp-status'}
                                >
                                {
                                    '*'+ dp.status+'*'
                                }
                            </span>
                    </div>

                    <div className='row '>
                        <span 
                            className={dp.dp<45 ? 'red-zone msg' : (dp.dp>44 && dp.dp<60) ? 'orange-zone msg':'green-zone msg'}
                            >
                            {
                                'Note: '+dp.message
                            }
                        </span>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
          {
            dpHandler()
          }
        </div>
    )
}

export default Dp
