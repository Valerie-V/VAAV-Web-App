'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { initialState } from '@/context/reducer';
import SectionHeading from '@/components/sectionHeading';
import Reveal from '@/components/reveal';
import { naira } from '@/lib/format';
import { COMPONENTS } from '@/lib/customSystem';
import { customFromPrice } from './products/customCard';

// "Meet the range" rail on the home page (white section). Each card opens
// that product on the products page.
function ProductShowcase() {
  const products = initialState.products;
  const railRef = useRef(null);

  const scrollBy = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('a');
    rail.scrollBy({ left: direction * ((card?.offsetWidth || 320) + 20), behavior: 'smooth' });
  };

  return (
    <section id='range' className='theme-light section relative overflow-hidden'>
      <div className='container-x'>
        <div className='flex flex-col items-start justify-between gap-8 md:flex-row md:items-end'>
          <SectionHeading
            align='left'
            eyebrow='The PowerCube range'
            title={<>A size for every <span className='text-gradient'>home and business</span></>}
            intro='From a compact unit for the essentials to a whole-shop power station. Every model comes with or without solar panels.'
          />
          <div className='flex shrink-0 items-center gap-2'>
            <button type='button' onClick={() => scrollBy(-1)} className='flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-inset ring-line/15 transition hover:bg-graphite-950 hover:text-white' aria-label='Previous products'>
              <ArrowBackIcon fontSize='small' />
            </button>
            <button type='button' onClick={() => scrollBy(1)} className='flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-inset ring-line/15 transition hover:bg-graphite-950 hover:text-white' aria-label='More products'>
              <ArrowForwardIcon fontSize='small' />
            </button>
            <Link href='/products' className='btn ml-2 bg-graphite-950 text-white hover:bg-graphite-800'>
              View all
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className='mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden'
      >
        {products.map((product, index) => (
          <Reveal key={product.id} delay={index * 80} className='shrink-0 snap-start'>
            <Link
              href={`/products?product=${product.id}`}
              className='group flex w-[82vw] flex-col overflow-hidden rounded-[2rem] bg-graphite-950 text-white transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-30px_rgba(12,101,37,0.6)] sm:w-[380px]'
            >
              <div className='stage relative m-2 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.6rem] p-8'>
                <span className='absolute left-4 top-4 rounded-full bg-graphite-950 px-3 py-1 font-display text-xs font-semibold text-white'>0{index + 1}</span>
                <img src={product.image[0]} alt={product.name[0]} className='max-h-full w-auto object-contain feather mix-blend-multiply transition duration-700 group-hover:scale-110' />
              </div>
              <div className='flex flex-1 flex-col p-6 pt-4'>
                <h3 className='text-2xl font-bold text-white'>{product.name[0]}</h3>
                <div className='mt-3 flex flex-wrap gap-1.5'>
                  <span className='chip bg-white/10 text-white/80 ring-white/10'>{Number(product.inverter).toLocaleString()} W output</span>
                  <span className='chip bg-white/10 text-white/80 ring-white/10'>{Number(product.battery).toLocaleString()} Wh battery</span>
                </div>
                <div className='mt-6 flex items-end justify-between gap-4'>
                  <div>
                    <p className='text-xs uppercase tracking-wider text-white/50'>From</p>
                    <p className='font-display text-2xl font-bold text-brand-300'>{naira(product.price1)}</p>
                  </div>
                  <span className='flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-brand-500'>
                    <ArrowForwardIcon fontSize='small' className='transition group-hover:-rotate-45' />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
        <Reveal delay={products.length * 80} className='shrink-0 snap-start'>
          <Link
            href='/custom'
            className='group flex h-full w-[82vw] flex-col overflow-hidden rounded-[2rem] bg-graphite-950 text-white transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-30px_rgba(12,101,37,0.6)] sm:w-[380px]'
          >
            <div className='stage relative m-2 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.6rem] p-8'>
              <span className='absolute left-4 top-4 rounded-full bg-graphite-950 px-3 py-1 font-display text-xs font-semibold text-white'>0{products.length + 1}</span>
              <span className='absolute right-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white'>Custom</span>
              <img src='/illustrations/custom-system.svg' alt='' className='max-h-full w-auto object-contain mix-blend-multiply transition duration-700 group-hover:scale-110' />
            </div>
            <div className='flex flex-1 flex-col p-6 pt-4'>
              <h3 className='text-2xl font-bold text-white'>Build your own system</h3>
              <div className='mt-3 flex flex-wrap gap-1.5'>
                <span className='chip bg-white/10 text-white/80 ring-white/10'>{COMPONENTS.battery.wattHours / 1000} kWh batteries</span>
                <span className='chip bg-white/10 text-white/80 ring-white/10'>{COMPONENTS.inverter.kva} kVA inverters</span>
                <span className='chip bg-white/10 text-white/80 ring-white/10'>{COMPONENTS.panel.watts} W panels</span>
              </div>
              <div className='mt-6 flex items-end justify-between gap-4'>
                <div>
                  <p className='text-xs uppercase tracking-wider text-white/50'>From</p>
                  <p className='font-display text-2xl font-bold text-brand-300'>{naira(customFromPrice)}</p>
                </div>
                <span className='flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-brand-500'>
                  <ArrowForwardIcon fontSize='small' className='transition group-hover:-rotate-45' />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default ProductShowcase
