import React from 'react'
import Link from 'next/link'
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className='footer w-full bg-white flex md:flex-col flex-row items-center pb-[100px]'>
        <hr className='w-[92%]'/>
        <Link href="/#home" className='h-[115px] w-full text-center flex justify-center'>
            <img src='/illustrations/logo-vaav.png' alt="logo" className=' h-auto' />
        </Link>
        <div className=' mt-7 mb-5'>
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal px-5 cursor-pointer leading-tight '>Home</Link> 
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal px-5 cursor-pointer leading-tight '>About</Link> 
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal px-5 cursor-pointer leading-tight '>Supports</Link> 
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal px-5 cursor-pointer leading-tight '>Marketing</Link> 
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal px-5 cursor-pointer leading-tight '>Contact</Link> 
        </div>
        <p className='text-primary'>&copy; 2024 VAAV, Ltd</p>
        <div>
            <LinkedInIcon className='text-primary text-lg mr-4'/>
            <XIcon className='text-primary text-lg'/>
        </div>
    </div>
  )
}

export default Footer
