import React from 'react'

function Features() {
  return (
    <section className='feature bg-pattern bg-no-repeat bg-cover bg-center bg-primary py-[120px]' id='features'>
      <div className='container mx-6 px-7' aria-label='container'>
        <div className="title w-full flex flex-col items-center justify-start mb-16">
            <p className='text-white opacity-70 text-sm tracking-wide mb-3'>KEY DIFFERENTIATORS</p>
            <h2 className='text-[32px] text-white tracking-tight leading-tight'>Meet the features of our product</h2>
        </div>
        <div className='feature__body'>
            <div className="clean">
                <img src='/illustrations/performance.svg' alt="" />
                <div>
                    <h2>clean</h2>
                    <span>The powerCube offers clean energy source that eliminates carbon footprints associated with fossil fuels.</span>
                </div>
            </div>
            <div className="affordable">
                <img src='/illustrations/partnership.svg' alt="" />
                <div>
                    <h2>Affordable</h2>
                    <span>The powerCube provides equitable access to energy at affordable price.</span>
                </div>
            </div>
            <div className="reliable">
                <img src='/illustrations/subscription.svg' alt="" />
                <div>
                    <h2>Reliable</h2>
                    <span>The powerCube is durable, reliable, and has long lifespan on a single charge.</span>
                </div>
            </div>
            <div className="monitoring">
                <img src='/illustrations/support.svg' alt="" />
                <div>
                    <h2>Monitoring</h2>
                    <span>Our new energy management module offers users unique way to monitor and track their daily power consumption.</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Features
