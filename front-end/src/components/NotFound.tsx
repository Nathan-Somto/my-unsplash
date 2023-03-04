import React from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
type Props ={
    message:string;
}
function NotFound({message}:Props) {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
        <p>{'Oops! '+ message}</p>
        <div><AiFillCaretLeft color={'black'}/></div>
    </div>
  )
}

export default NotFound