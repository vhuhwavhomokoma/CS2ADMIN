import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FcSearch } from 'react-icons/fc';
import './ListView.css'

const ListView = ({List}) => {
  const [listView,setListView] = useState(List);
  const [searchValue,setSearchValue] = useState('');
  const searchHandler=()=>{
    const arr = listView.filter((item)=>item.firstName.includes(searchValue) || item.lastName.includes(searchValue) || item.email.includes(searchValue))
    setListView(arr)
  }

  useEffect(()=>{
    if (searchValue===''){
      setListView(List)
    }else{
      searchHandler()
    }
  },[searchValue])
  return (
    <div className='container'>
      <div className='row px-2'>
        <div class="input-group mt-4 ">
          <div class="form-inline ">
            <input placeholder='Search student...' value={searchValue} className='col-sm-6 form-control' onChange={(e)=>setSearchValue(e.target.value)} />
            <button className='btn btn-light' onClick={()=>searchHandler()}><FcSearch/></button>
            <button className='btn btn-primary ml-3' disabled={true}>Email Students</button>
          </div>
        </div>
      </div>

     <div className='row'>
      <table className='table admin-request'>
          <thead>
              <tr>
              <th scope='col'>Firstname</th>
              <th scope='col'>Surname</th>
              <th scope='col'>DP%</th>
              <th scope='col'>Email</th>
              </tr>
          </thead>
          <tbody>
              {
              listView.map((item)=>(
                  <tr>
                    <td scope='row' >{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.dp}</td>
                    <td>{item.email}</td>
                  </tr>
                  ))
              }  
              </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListView