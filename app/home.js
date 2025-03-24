import Link from 'next/link'
import React from 'react'

function HomePage() {
  return (
    <section id='home' className='home flex flex-col md:flex-row md:pt-36 pt-20 pb-7 px-5 md:px-7'>
      <div className="left w-auto md:mr-5 mb-6 md:mb-0" >
        <h1 className='text-[32px] md:text-[46px] md:font-bold font-semibold leading-tight mb-6 mt-9'>
            Green Energy for All
        </h1>
        <h2 className='text-[26px] md:text-[38px] leading-tight mb-6 md:font-bold font-semibold'>
        Find, rent or buy our powerCube- easily and quickly!
        </h2>
        <p className='text-[16px] md:text-[17px] md:pr-[110px] leading-loose font-normal mb-6'>
        Be part of an ecosystem that enjoys clean and affordable energy with our customized energy systems.
        </p>
        <Link href='/audit'>
        <button className='bg-primary text-white py-[15px] px-7 rounded-3xl text-base font-medium leading-tight'>Get Started</button>
        </Link>
      </div>
      <div className="right md:pr-8 pr-1">
        <img src='/illustrations/solar-house.png' alt="" className='w-full' />
      </div>
    </section>
  )
}

export default HomePage

