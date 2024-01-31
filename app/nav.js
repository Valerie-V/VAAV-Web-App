import React from 'react'
import Link from 'next/link'

function Nav() {
  return (
    <div className='nav flex justify-between items-center h-[64px] w-full  px-7 fixed bg-white z-10'>
        <Link href="/#home" className='w-[118px]'>
            <img src='/illustrations/logo-vaav.png' alt="logo" className='w-full' />
        </Link>
        
      <nav>
        
        <Link href='/#home' className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Home</Link>
        <Link href='/#features' className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Features</Link>
        <Link href='/#team' className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Our Team</Link>
        <Link href='/#testimonial' className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Testimonial</Link>
        <Link href="/products" className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Products</Link>
        <Link href="/audit" className='no-underline text-black text-base font-normal px-6 cursor-pointer leading-tight active:text-primary'>Energy Audit</Link>
      </nav>
      <button id='nav__btn' className='bg-primary text-white py-[15px] px-7 rounded-3xl text-base font-medium leading-tight'>Get Started</button>
    </div>
  )
}

export default Nav
