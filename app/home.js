import React from 'react'

function HomePage() {
  return (
    <section id='home' className='home flex pt-36 pb-7 px-7'>
      <div className="left w-auto mr-5">
        <h1 className='text-[46px] font-bold leading-tight mb-6 mt-9'>
            Green Energy for All
        </h1>
        <h2 className='text-[38px] leading-tight mb-6 font-bold'>
        Find, rent or buy our powerCube- easily and quickly!
        </h2>
        <p className='text-[17px] pr-[110px] leading-loose font-normal mb-6'>
        Be part of an ecosystem that enjoys clean and affordable energy with our customized energy systems.
        </p>
        <button className='bg-primary text-white py-[15px] px-7 rounded-3xl text-base font-medium leading-tight'>Get Stated</button>
      </div>
      <div className="right pr-8">
        <img src='/illustrations/solar-house.png' alt="" className='w-full' />
      </div>
    </section>
  )
}

export default HomePage

