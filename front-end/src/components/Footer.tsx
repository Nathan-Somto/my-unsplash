import React from 'react'
import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter } from 'react-icons/ai'

function Footer() {
  return (
    <footer className='absolute w-full bottom-0 flex flex-col md:flex-row justify-evenly'>
        <p className='text-[1.2rem]'>Created by <a href='#' className='text-underline text-[rgba(110,110,110,0.5)]'>Nathan_Somto</a></p>
        <div className='flex'>
            <a href='#' target={'_blank'} className={'mr-2'}><AiOutlineTwitter size={25} color={'blue'}/>
            </a>
           <a href='#' target={'_blank'} className={'mr-2'}> <AiOutlineInstagram size={25} color={'red'}/>
           </a>
           <a href="http://" target="_blank" rel="noopener noreferrer"><AiOutlineLinkedin size={25} color={'blue'}/></a>

        </div>
    </footer>
  )
}

export default Footer