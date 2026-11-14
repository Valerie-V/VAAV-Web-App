import React from 'react'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COMPONENTS } from '@/lib/customSystem';
import { naira } from '@/lib/format';

// The cheapest system the builder allows: one battery and one inverter.
export const customFromPrice = COMPONENTS.battery.price + COMPONENTS.inverter.price;

// "Build your own system" card, shown as the last option in the products grid.
// Styled to match the product cards; it links to the custom builder.
function CustomCard() {
  return (
    <Link href='/custom' className='glow-card card card-hover group flex h-full w-full flex-col overflow-hidden p-2 text-left'>
      <div className='stage relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.4rem] p-8'>
        <span className='absolute left-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white'>Custom system</span>
        <img className='max-h-full w-auto object-contain mix-blend-multiply transition duration-700 group-hover:scale-110' src='/illustrations/custom-system.svg' alt='' />
      </div>
      <div className='flex w-full flex-1 flex-col p-5'>
        <h2 className='text-2xl font-bold'>Build your own system</h2>
        <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-muted'>
          Need more than a PowerCube? Choose your batteries, inverters and solar panels, and see the price as you go.
        </p>

        <dl className='mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-line/10 text-center ring-1 ring-line/10'>
          {[
            ['Battery', `${COMPONENTS.battery.wattHours / 1000} kWh`],
            ['Inverter', `${COMPONENTS.inverter.kva} kVA`],
            ['Panel', `${COMPONENTS.panel.watts} W`],
          ].map(([label, value]) => (
            <div key={label} className='bg-card px-2 py-3'>
              <dt className='text-[11px] uppercase tracking-wide text-muted'>{label}</dt>
              <dd className='mt-0.5 font-display font-bold'>{value}</dd>
            </div>
          ))}
        </dl>

        <div className='mt-6 flex items-end justify-between gap-4'>
          <div>
            <p className='font-display text-2xl font-bold text-pop'>From {naira(customFromPrice)}</p>
            <p className='text-sm text-muted'>Priced by component</p>
          </div>
          <span className='flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition duration-300 group-hover:bg-brand-500'>
            <ArrowForwardIcon fontSize='small' className='transition group-hover:-rotate-45' />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CustomCard
