import React from 'react'
import Link from 'next/link'
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className='footer w-full bg-white flex flex-col items-center pb-[100px] px-5 md:px-7'>
        <hr className='w-full'/>
        <Link href="/#home" className='h-[115px] w-full text-center flex justify-center'>
            <img src='/illustrations/logo-vaav.png' alt="logo" className=' h-auto' />
        </Link>
        <div className=' mt-7 mb-5'>
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal md:px-5 px-2 cursor-pointer leading-tight '>Home</Link> 
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal md:px-5 px-2 cursor-pointer leading-tight '>About</Link> 
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal md:px-5 px-2 cursor-pointer leading-tight '>Supports</Link> 
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal md:px-5 px-2 cursor-pointer leading-tight '>Marketing</Link> 
        <Link href='/#home' className=' no-underline text-primary text-[15px] font-normal md:px-5 px-2 cursor-pointer leading-tight '>Contact</Link> 
        </div>
        <p className='text-primary'>&copy; 2024 VAAV, Ltd</p>
        <div>
            <Link href="/#home">
            <LinkedInIcon className='text-primary text-lg mr-4'/>
            </Link>
            <Link href="/#home">
            <XIcon className='text-primary text-lg'/>
            </Link>
        </div>
    </div>
  )
}

export default Footer
