import React, { useEffect, useState } from 'react'
import logo from "../assets/unsplash_logo.svg";
type Props ={
    location:string;
}
function Empty({location}) {
    const [Message, setMessage] = useState('Oops! no photos at the moment');
      
    useEffect(() => {
    
      if(location === '/') return;
        setMessage('Make something awesome')
     
      return () => {
      
      }
    }, [])
    
  return (
    // for the profile page when there is no photo upload by a user or home page when there are no images
    <div className={`flex flex-col ${location !== '\\'? 'h-full':' '}`}>
    <div className='justify-self-end flex items-center justify-center flex-col'>
         <img src={`${logo}`} alt="logo" className='d-block'  />
         <p className='text-[1.1rem] text-[rgba(0,0,0,0.65)] fw-300'>{Message}</p>
    </div>
    </div>
  )
}

export default Empty