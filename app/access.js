import React from 'react'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import Reveal from '@/components/reveal';
import Parallax from '@/components/parallax';

const uses = [
  { icon: HomeOutlinedIcon, title: 'Homes', text: 'Lights, fans, TV, fridge and more through every outage.' },
  { icon: StorefrontOutlinedIcon, title: 'Shops & offices', text: 'Keep serving customers when the grid goes down.' },
  { icon: ForestOutlinedIcon, title: 'Off-grid & outdoors', text: 'Portable power for remote sites, events and trips.' },
];

// Full-bleed photo section. The photo stays fixed while the page scrolls
// over it on larger screens.
function Access() {
  return (
    <section className='relative isolate overflow-hidden'>
      <Parallax className='absolute inset-x-0 -inset-y-[15%] -z-20' speed={0.2}>
        <img src='/illustrations/camp.jpeg' alt='' className='h-full w-full object-cover object-[70%_center] brightness-125 saturate-[0.85]' />
      </Parallax>
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-graphite-950 via-graphite-950/75 to-transparent' aria-hidden='true' />
      <div className='absolute inset-0 -z-10 bg-brand-900/20 mix-blend-color' aria-hidden='true' />
      <div className='absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-canvas to-transparent' aria-hidden='true' />
      <div className='absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-canvas to-transparent' aria-hidden='true' />

      <div className='container-x flex min-h-[90vh] flex-col justify-center py-28'>
        <Reveal className='max-w-2xl'>
          <span className='eyebrow'>Equitable energy access</span>
          <h2 className='h-display mt-6 text-5xl lg:text-7xl'>
            Wherever you are, you&apos;re <span className='text-gradient'>never out of reach.</span>
          </h2>
          <p className='lead mt-6 text-white/75'>
            With our range of PowerCubes, we&apos;re breaking down the barriers to energy access in Africa. Your journey to
            affordable, clean and constant power just got simple.
          </p>
        </Reveal>

        <ul className='mt-14 grid gap-4 md:max-w-4xl md:grid-cols-3'>
          {uses.map(({ icon: Icon, title, text }, index) => (
            <Reveal as='li' key={title} delay={index * 120} className='glass rounded-3xl p-6'>
              <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300'>
                <Icon fontSize='small' />
              </span>
              <p className='mt-4 text-lg font-semibold text-white'>{title}</p>
              <p className='mt-1 text-sm text-white/65'>{text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <Link href='/audit' className='btn-primary group mt-12 px-7 py-4 text-base'>
            Get started <ArrowForwardIcon sx={{ fontSize: 18 }} className='transition group-hover:translate-x-1' />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default Access
