import React from 'react'
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SectionHeading from '@/components/sectionHeading';
import Reveal from '@/components/reveal';
import CountUp from '@/components/countUp';

const tile = 'glow-card card h-full p-7 md:p-8';
const icon = 'flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300 ring-1 ring-inset ring-brand-400/25';

// "Why the PowerCube" bento grid.
function Features() {
  return (
    <section id='features' className='relative overflow-hidden'>
      <div className='pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand-600/15 blur-[120px]' />

      <div className='container-x section relative'>
        <SectionHeading
          eyebrow='Why the PowerCube'
          title={<>Built for the way you <span className='text-gradient'>actually use power</span></>}
          intro='Everything you need from a power source, without the fuel, fumes or noise of a generator.'
        />

        <div className='mt-16 grid auto-rows-[minmax(0,auto)] gap-5 md:grid-cols-6'>
          {/* solar, large */}
          <Reveal className='md:col-span-4 md:row-span-2'>
            <div className='glow-card card relative grid h-full overflow-hidden md:grid-cols-[1fr_1.1fr]'>
              <div className='flex flex-col justify-end p-7 md:p-10'>
                <span className={icon}><WbSunnyOutlinedIcon /></span>
                <h3 className='mt-6 text-3xl font-bold md:text-4xl'>Charge from the sun. Or the grid. Or both.</h3>
                <p className='mt-3 leading-relaxed text-muted'>
                  Every PowerCube charges from solar panels or NEPA with the AC adapter, so you&apos;re covered on cloudy days and long outages alike.
                  The bigger models roll on wheels, so the power goes where you need it.
                </p>
              </div>
              <div className='relative m-2 min-h-[280px] overflow-hidden rounded-[1.4rem] stage md:m-3'>
                <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-300/50 blur-3xl' aria-hidden='true' />
                <img src='/product_Img/Xtra-iso.jpeg' alt='PowerCubeXtra with its trolley handle extended' className='feather absolute inset-0 m-auto w-[88%] mix-blend-multiply transition duration-700 group-hover:scale-105 hover:scale-105' />
              </div>
            </div>
          </Reveal>

          <Reveal className='md:col-span-2' delay={100}>
            <div className={tile}>
              <span className={icon}><BatteryChargingFullOutlinedIcon /></span>
              <p className='mt-6 font-display text-5xl font-bold tracking-tight text-white'><CountUp value={4000} suffix='+' /></p>
              <h3 className='mt-1 text-lg font-bold'>Charge cycles</h3>
              <p className='mt-2 text-sm leading-relaxed text-muted'>Durable LiFePO4 cells that keep over 70% of their capacity after 4,000 cycles.</p>
            </div>
          </Reveal>

          <Reveal className='md:col-span-2' delay={200}>
            <div className={tile}>
              <span className={icon}><EnergySavingsLeafOutlinedIcon /></span>
              <h3 className='mt-6 text-2xl font-bold'>Clean & silent</h3>
              <p className='mt-2 text-sm leading-relaxed text-muted'>No fumes, no noise, and none of the carbon footprint of a fuel generator. Safe to run indoors.</p>
            </div>
          </Reveal>

          <Reveal className='md:col-span-3' delay={100}>
            <div className={tile}>
              <div className='flex items-start justify-between gap-6'>
                <div>
                  <span className={icon}><MonitorHeartOutlinedIcon /></span>
                  <h3 className='mt-6 text-2xl font-bold'>Know your usage</h3>
                  <p className='mt-2 max-w-xs text-sm leading-relaxed text-muted'>Our energy management module lets you monitor and track your daily power consumption.</p>
                </div>
                {/* decorative live meter */}
                <div className='flex h-28 items-end gap-1.5' aria-hidden='true'>
                  {[0.5, 0.8, 0.35, 0.9, 0.6, 1, 0.45].map((h, i) => (
                    <span key={i} className='w-2.5 origin-bottom rounded-full bg-gradient-to-t from-brand-600 to-brand-300 animate-bars' style={{ height: `${h * 100}%`, animationDelay: `${i * -0.35}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className='md:col-span-3' delay={200}>
            <div className={tile}>
              <span className={icon}><SavingsOutlinedIcon /></span>
              <h3 className='mt-6 text-2xl font-bold'>Affordable, fair access</h3>
              <p className='mt-2 max-w-md text-sm leading-relaxed text-muted'>
                Fair, equitable access to energy, at a price that makes sense for homes and small businesses. Buy on its own or with a solar bundle.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Features
