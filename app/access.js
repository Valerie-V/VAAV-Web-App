import React from 'react'

function Access() {
  return (
    <div>
      <section className='access pt-[80px] pb-[30px]'>
        <div className="access__container mx-6 mt-[15px] px-8 pb-[50px] flex">

      <div className="access__left w-[50%] pt-[100px] mr-[50px]">
        <p id='first' className='text-base tracking-widest mb-4 text-primary font-bold'>EQUITABLE ENERGY ACCESS</p>
        <h2 className='text-[40px] mb-6 font-bold leading-tight'>Where ever you are, you are never out of reach</h2>
        <p id='second' className='text-base leading-loose text-primary mb-[30px]'>With our various powerCubes, we are eliminating the existing barriers in Africa. Your journey to affordable, clean and constant energy just got simple. Get more for less today!!!</p>
        <button className='access__btn bg-primary text-white py-[15px] px-[30px] rounded-[25px] border-0 text-base font-medium leading-tight'>Get Started</button>
      </div>
      <div className="access__right">
        <img className='w-[90%] rounded-[90px]' src='/illustrations/camp.jpeg' alt="" />
      </div>
        </div>
    </section>
    </div>
  )
}

export default Access
