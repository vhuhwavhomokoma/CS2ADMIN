import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StudentList = () => {
    const [allStudents,setAllStudents] = useState([])
    
    const getStudentList = async()=>{
        const url = 'http://127.0.0.1:8000/allstudents/';
        try{  
            const res = await axios.get(url);
            setAllStudents(res.data)
            
        }catch (err){
            console.log(err)       
        }
    }

    const requetsLength =()=>{
        return(allStudents.length)
    }

   



    useEffect(()=>{
        getStudentList()
    },[])

    return (
        <div>
            <table className='table admin-request'>
                <thead>
                            <tr>
                            <th scope='col'>Student Number</th>
                            <th scope='col'>Test 1</th>
                            <th scope='col'>Test 2</th>
                            <th scope='col'>Assignment 1</th>
                            <th scope='col'>Assignment 2</th>
                            <th scope='col'>Assignment 3</th>
                            <th scope='col'>Assignment 4</th>
                            <th scope='col'>Assignment 5</th>
                            <th scope='col'>Assignment 6</th>

                            </tr>
                        </thead>
                        <tbody>
                    {
                    allStudents.map((student)=>(
                        <tr>
                        <th scope='row'>{student[1].studentNum}</th>
                        <td>{student[1].test1}</td>
                        <td>{student[1].test2}</td>
                        <td>{student[1].assignment1}</td>
                        <td>{student[1].assignment2}</td>
                        <td>{student[1].assignment3}</td>
                        <td>{student[1].assignment4}</td>                        
                        </tr>
                        ))
                    }  

                    </tbody>
                        
                    </table>
        </div>
  )
}

export default StudentList


