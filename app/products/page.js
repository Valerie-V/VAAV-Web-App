import React, { Suspense } from 'react'
import Link from 'next/link'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import ProductsView from './productsView'
import Footer from '../footer'

export const metadata = {
  title: 'PowerCube Portable Power Stations | VAAV Innovations',
  description: 'Compare PowerCube portable power stations from 500W to 5000W, with or without solar panels.',
};

export default function Products() {
  return (
    <>
      <main>
        <section className='relative isolate overflow-hidden border-b border-line/10'>
          <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(30,158,76,0.28),transparent_70%)]' />
          <div className='grid-bg pointer-events-none absolute inset-0 -z-10' />
          <div className='container-x flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24'>
            <div className='max-w-3xl animate-fade-up'>
              <span className='eyebrow'>Shop</span>
              <h1 className='h-display mt-6 text-5xl lg:text-7xl'>The PowerCube <span className='text-gradient'>range</span></h1>
              <p className='lead mt-6 max-w-2xl'>Clean, quiet power for your home or business. Every model charges from solar or the grid, and comes with a 2-year warranty.</p>
            </div>
            <Link href='/audit' className='glow-card card group flex max-w-sm items-center gap-4 p-5 transition hover:ring-brand-400/40 animate-fade-up [animation-delay:150ms]'>
              <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300'><InsightsOutlinedIcon /></span>
              <span>
                <span className='block font-semibold'>Not sure which one?</span>
                <span className='block text-sm text-muted transition group-hover:text-pop'>Take the free energy audit &rarr;</span>
              </span>
            </Link>
          </div>
        </section>
        <Suspense fallback={<div className='container-x py-20 text-center text-muted'>Loading products…</div>}>
          <ProductsView />
        </Suspense>

      </main>
      <Footer />
    </>
  )
}
