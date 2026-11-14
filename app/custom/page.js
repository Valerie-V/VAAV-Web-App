import React, { Suspense } from 'react'
import Link from 'next/link'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Builder from './builder'
import Footer from '../footer'

export const metadata = {
  title: 'Build Your Own Solar System | VAAV Innovations',
  description: 'Need more than a PowerCube? Build a custom solar system from 15 kWh batteries, 12 kVA inverters and 650 W solar panels, and see the price as you go.',
};

export default function CustomPage() {
  return (
    <>
      <main>
        <section className='relative isolate overflow-hidden border-b border-line/10'>
          <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(30,158,76,0.28),transparent_70%)]' />
          <div className='grid-bg pointer-events-none absolute inset-0 -z-10' />
          <div className='container-x flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24'>
            <div className='max-w-3xl animate-fade-up'>
              <span className='eyebrow'>Custom systems</span>
              <h1 className='h-display mt-6 text-5xl lg:text-7xl'>Build your own <span className='text-gradient'>system</span></h1>
              <p className='lead mt-6 max-w-2xl'>
                For homes and businesses that need more than a PowerCube. Choose your batteries, inverters and solar panels,
                and see what it can run and what it costs as you go.
              </p>
            </div>
            <Link href='/products' className='glow-card card group flex max-w-sm items-center gap-4 p-5 transition hover:ring-brand-400/40 animate-fade-up [animation-delay:150ms]'>
              <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300'><Inventory2OutlinedIcon /></span>
              <span>
                <span className='block font-semibold'>Need something smaller?</span>
                <span className='block text-sm text-muted transition group-hover:text-pop'>See the PowerCube range &rarr;</span>
              </span>
            </Link>
          </div>
        </section>
        <section className='container-x py-12 md:py-16'>
          <Suspense fallback={<div className='py-20 text-center text-muted'>Loading the builder…</div>}>
            <Builder />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  )
}
