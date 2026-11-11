import Link from 'next/link'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { initialState } from '@/context/reducer';
import { rangeStats } from '@/lib/format';
import CountUp from '@/components/countUp';
import Model3D from '@/components/model3d/model3d';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

const trust = ['2-year warranty', 'LiFePO4 battery', 'Solar or grid charging'];

function HomePage() {
  const stats = rangeStats(initialState.products);
  const maxKWh = stats.maxBattery / 1000;

  return (
    <section id='home' className='relative isolate overflow-hidden bg-graphite-950'>
      {/* moving aurora + grid */}
      <div className='pointer-events-none absolute inset-0 -z-10' aria-hidden='true'>
        <div className='absolute -left-[10%] top-[-20%] h-[640px] w-[640px] rounded-full bg-brand-600/40 blur-[120px] animate-aurora' />
        <div className='absolute right-[-15%] top-[10%] h-[560px] w-[560px] rounded-full bg-brand-400/25 blur-[120px] animate-aurora [animation-delay:-6s]' />
        <div className='absolute bottom-[-30%] left-[30%] h-[520px] w-[720px] rounded-full bg-graphite-700/60 blur-[120px] animate-aurora [animation-delay:-12s]' />
        <div className='grid-bg absolute inset-0' />
        <div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-graphite-950' />
      </div>

      <div className='container-x grid min-h-[calc(100svh-72px)] items-center gap-12 pb-10 pt-12 lg:grid-cols-[1.2fr_1fr] lg:pt-6'>
        <div>
          <span className='eyebrow animate-fade-up'>Solar-ready portable power</span>
          <h1 className='h-display mt-7 animate-fade-up [animation-delay:100ms]'>
            Power that moves <span className='text-gradient whitespace-nowrap'>with you.</span>
          </h1>
          <p className='lead mt-7 max-w-xl animate-fade-up text-white/70 [animation-delay:200ms]'>
            PowerCube portable power stations keep your home or shop running through every blackout.
            Charge from the sun or the grid, with no fuel, no fumes and no noise.
          </p>
          <div className='mt-9 flex flex-wrap gap-3 animate-fade-up [animation-delay:300ms]'>
            <Link href='/audit' className='btn-primary group px-7 py-4 text-base'>
              Find my PowerCube <ArrowForwardIcon sx={{ fontSize: 18 }} className='transition group-hover:translate-x-1' />
            </Link>
            <Link href='/book?service=consultation' className='btn-secondary px-7 py-4 text-base'>
              Book a consultation
            </Link>
          </div>
          <ul className='mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/60 animate-fade-up [animation-delay:400ms]'>
            {trust.map(item => (
              <li key={item} className='flex items-center gap-2'>
                <span className='h-1.5 w-1.5 rounded-full bg-brand-400' /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* product orb */}
        <div className='relative mx-auto w-full max-w-[560px] animate-fade-up [animation-delay:250ms]'>
          <div className='relative aspect-square'>
            <div className='pointer-events-none absolute inset-[-6%] rounded-full border border-dashed border-brand-400/25 animate-spin-slow' aria-hidden='true' />
            <div className='pointer-events-none absolute inset-[-14%] rounded-full border border-white/[0.06] animate-spin-slower' aria-hidden='true'>
              <span className='absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300 shadow-[0_0_16px_4px_rgba(63,191,106,0.8)]' />
            </div>
            {/* spotlight disc and green glow behind the unit */}
            <div className='pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_55%,transparent_70%)] ring-1 ring-white/10' aria-hidden='true' />
            <div className='pointer-events-none absolute inset-[14%] rounded-full bg-brand-500/45 blur-[80px]' aria-hidden='true' />
            <Model3D model='powercube' className='absolute inset-0 text-[8.5px] sm:text-[12px] lg:text-[13px]' />
            <p className='pointer-events-none absolute inset-x-0 top-[5%] flex items-center justify-center gap-1.5 text-xs font-medium text-white/50'>
              <ThreeSixtyIcon sx={{ fontSize: 16 }} /> Drag to turn
            </p>
          </div>

          <div className='glass absolute -left-2 top-[12%] flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl animate-float [animation-delay:-2s] md:-left-10'>
            <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300'><BoltOutlinedIcon /></span>
            <div>
              <p className='text-xs text-white/60'>Output</p>
              <p className='text-sm font-bold text-white'>{stats.minOutput.toLocaleString()}W – {stats.maxOutput.toLocaleString()}W</p>
            </div>
          </div>
          <div className='glass absolute -right-2 bottom-[18%] flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl animate-float [animation-delay:-4s] md:-right-8'>
            <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300'><WbSunnyOutlinedIcon /></span>
            <div>
              <p className='text-xs text-white/60'>Charges from</p>
              <p className='text-sm font-bold text-white'>Sun or grid</p>
            </div>
          </div>
          <div className='glass absolute bottom-[-2%] left-[14%] flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl animate-float [animation-delay:-1s]'>
            <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300'><BatteryChargingFullOutlinedIcon /></span>
            <div>
              <p className='text-xs text-white/60'>Storage</p>
              <p className='text-sm font-bold text-white'>Up to {maxKWh.toLocaleString()} kWh</p>
            </div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className='container-x pb-16 md:pb-20'>
        <dl className='glass grid grid-cols-2 divide-white/10 overflow-hidden rounded-3xl md:grid-cols-4 md:divide-x'>
          {[
            { label: 'Output range', value: <><CountUp value={stats.minOutput / 1000} decimals={1} />–<CountUp value={stats.maxOutput / 1000} /> kW</> },
            { label: 'Battery storage', value: <>Up to <CountUp value={maxKWh} /> kWh</> },
            { label: 'Battery cycles', value: <CountUp value={4000} suffix='+' /> },
            { label: 'Warranty', value: <><CountUp value={2} /> years</> },
          ].map(stat => (
            <div key={stat.label} className='px-6 py-6 md:px-8 md:py-8'>
              <dt className='text-sm text-white/55'>{stat.label}</dt>
              <dd className='mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-4xl'>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <a href='#marquee' className='mx-auto mt-10 hidden w-fit flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-white/40 transition hover:text-white/70 md:flex'>
          Scroll
          <KeyboardArrowDownIcon className='animate-bounce' />
        </a>
      </div>
    </section>
  )
}

export default HomePage
