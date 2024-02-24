'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function GetStarted({close,next}) {
  const router = useRouter();

  const handleSkip = () => {
    close();
    next();
  }
  return (
    <section className=' flex justify-center items-center flex-col z-10'>
      <form className=' bg-black bg-opacity-[0.04] h-auto w-auto md:p-8 p-3 py-4 rounded-3xl md:mb-2 mb-1'>
      <div className='flex mb-3 flex-col md:flex-row'>
        <div className='flex flex-col  '>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' placeholder='John' required className='h-7 w-full border-0 mr-3 rounded-xl pl-3 mb-2 md:mb-0'/>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' placeholder='Doe' required className='w-full h-7 border-0 mr-3 rounded-xl pl-3'/>
        </div>
      </div>
      <div className='flex flex-col mb-3'>
          <label htmlFor="email">Email</label>
          <input type="text" id='email' placeholder='john.doe@example.com' required className='h-7 w-full border-0 mr-3 rounded-xl pl-3'/>
      </div>
      <div className='flex flex-col mb-3'>
          <label htmlFor="number">Number</label>
          <input type="number" id='number' placeholder='+234 xxx xxx xxx' required className='h-7 w-full border-0 mr-3 rounded-xl pl-3'/>
      </div>
      <div className='flex flex-col mb-3'>
          <label htmlFor="heard">How you heard of us</label>
          <textarea name="" id="heard" cols="30" rows="5" required className=' border-0 w-full mr-3 rounded-xl pl-3'></textarea>
        </div>   
        <div className='flex justify-center items-center'>
        <button type='submit' onSubmit={close}  className='bg-[#FFA740] hover:opacity-70 text-white py-[15px] px-7 rounded-3xl text-base font-medium leading-tight'>Submit</button>
        </div>
      </form>
        <button type='submit' onClick={handleSkip}  className='bg-primary hover:opacity-70 text-white py-[15px] px-7 rounded-3xl text-base font-medium leading-tight  self-end'>Skip</button>
    </section>
  )
}

export default GetStarted
