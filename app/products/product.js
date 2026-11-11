import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { naira } from '@/lib/format';

// Product card in the products grid. Clicking it opens the details modal.
function Product({ product, onOpen }) {
  return (
    <button type='button' onClick={onOpen} className='glow-card card card-hover group flex h-full w-full flex-col overflow-hidden p-2 text-left'>
      <div className='stage relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.4rem] p-8'>
        <span className='absolute left-4 top-4 rounded-full bg-graphite-950 px-3 py-1 text-xs font-semibold text-white'>{product.solarPanels} panel solar kit</span>
        <img className='max-h-full w-auto object-contain feather mix-blend-multiply transition duration-700 group-hover:scale-110' src={product.image[0]} alt={product.name[0]} />
      </div>
      <div className='flex w-full flex-1 flex-col p-5'>
        <h2 className='text-2xl font-bold'>{product.name[0]}</h2>
        <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-muted'>{product.description}</p>

        <dl className='mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-line/10 text-center ring-1 ring-line/10'>
          {[
            ['Output', `${Number(product.inverter).toLocaleString()} W`],
            ['Battery', `${Number(product.battery).toLocaleString()} Wh`],
            ['Solar charge', product.solarCharging],
          ].map(([label, value]) => (
            <div key={label} className='bg-card px-2 py-3'>
              <dt className='text-[11px] uppercase tracking-wide text-muted'>{label}</dt>
              <dd className='mt-0.5 font-display font-bold'>{value}</dd>
            </div>
          ))}
        </dl>

        <div className='mt-6 flex items-end justify-between gap-4'>
          <div>
            <p className='font-display text-2xl font-bold text-pop'>{naira(product.price1)}</p>
            <p className='text-sm text-muted'>or {naira(product.price2)} with solar</p>
          </div>
          <span className='flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition duration-300 group-hover:bg-brand-500'>
            <ArrowForwardIcon fontSize='small' className='transition group-hover:-rotate-45' />
          </span>
        </div>
      </div>
    </button>
  )
}

export default Product
