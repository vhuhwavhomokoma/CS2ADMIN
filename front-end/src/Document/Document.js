import React from 'react';
import { HiDocument } from 'react-icons/hi';

const Document = ({filename,link}) => {
  return (
    <a href={link} target="_blank">
        <HiDocument/>
        <span className='px-1'>
            {filename}
        </span>
    </a>
  )
}

export default Document