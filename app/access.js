import React from 'react'

function Access() {
  return (
    <div>
      <section className='access md:pt-[80px] pb-[30px]'>
        <div className="access__container md:mx-6 mt-[15px] px-5 md:px-8 pb-[50px] flex flex-col md:flex-row justify-center">

          <div className="access__left md:w-[50%] text-center md:text-left w-full md:pt-[100px] md:mr-[50px] mb-[50px] md:mb-0">
            <p id='first' className='md:text-base text-[12px] tracking-widest mb-4 text-primary font-bold'>EQUITABLE ENERGY ACCESS</p>
            <h2 className='md:text-[40px] text-2xl mb-6 md:font-bold font-semibold leading-tight'>Where ever you are, you are never out of reach</h2>
            <p id='second' className='md:text-base text-[15px] leading-loose text-primary mb-[30px]'>With our various powerCubes, we are eliminating the existing barriers in Africa. Your journey to affordable, clean and constant energy just got simple. Get more for less today!!!</p>
            <button className='bg-primary text-white py-[15px] px-7 rounded-3xl text-base font-medium leading-tight'>Get Started</button>
          </div>
          <div className="access__right">
            <img className='md:w-[90%] w-[100%] rounded-[90px]' src='/illustrations/camp.jpeg' alt="" />
          </div>
        </div>
    </section>
    </div>
  )
}

export default Access
