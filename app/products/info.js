'use client'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import SpecsInPicture from './specsInPicture';
import { solarKitText } from '@/lib/solar';


function SpecGroup({ title, items }) {
  return (
    <div>
      <h4 className='text-sm font-semibold uppercase tracking-wide text-muted'>{title}</h4>
      <dl className='mt-3 divide-y divide-line/10 rounded-2xl ring-1 ring-line/10'>
        {items.map(([label, value]) => (
          <div key={label} className='flex justify-between gap-4 px-4 py-3 text-sm'>
            <dt className='text-muted'>{label}</dt>
            <dd className='text-right font-medium'>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Info({ product }) {
  const tabs = ['Overview', 'Specifications', ...(product.model3d ? ['Specs in picture'] : [])];
  const [tab, setTab] = useState(0);

  return (
    <div className='mt-10'>
      <div className='inline-flex max-w-full overflow-x-auto rounded-full bg-surface p-1 ring-1 ring-line/10' role='tablist'>
        {tabs.map((label, index) => (
          <button
            key={label}
            type='button'
            role='tab'
            aria-selected={tab === index}
            onClick={() => setTab(index)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm sm:px-5 font-semibold transition ${tab === index ? 'bg-white text-graphite-950 shadow-sm' : 'text-muted hover:text-ink'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className='mt-6' role='tabpanel'>
          <p className='leading-relaxed text-muted'>{product.description}</p>

          <h4 className='mt-8 text-lg font-bold'>What it can power</h4>
          <p className='text-sm text-muted'>Approximate runtime on a full charge, running one appliance at a time.</p>
          <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
            {product.power.map(power => (
              <div key={power.device} className='flex flex-col items-center rounded-2xl bg-surface p-4 text-center'>
                <img src={power.img} alt='' className='h-10 w-10 opacity-90 invert' />
                <p className='mt-2 text-sm font-medium'>{power.device}</p>
                <p className='text-xs text-muted'>{power.rating}</p>
                <p className='mt-1 font-bold text-pop'>{power.hours}</p>
              </div>
            ))}
          </div>

          <h4 className='mt-8 text-lg font-bold'>Features</h4>
          <ul className='mt-3 grid gap-2 sm:grid-cols-2'>
            {['Fast dual charging (AC / solar)', ...(product.mppt ? ['Built-in MPPT solar charger'] : []), 'Easy to use (plug and play)', 'Portable', 'Automatic switching'].map(feature => (
              <li key={feature} className='flex items-center gap-2 text-sm'>
                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/15 text-pop'><CheckIcon sx={{ fontSize: 14 }} /></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 1 && (
        <div className='mt-6 grid gap-6 md:grid-cols-2' role='tabpanel'>
          <SpecGroup title='Battery' items={[
            ['Capacity', `${Number(product.battery).toLocaleString()} Wh`],
            ['Cell chemistry', 'BYD LiFePO4'],
            ['Cycle life', '4,000 cycles to 70%+ capacity'],
          ]} />
          <SpecGroup title='Ports' items={[
            ['AC output', '230V~ 50Hz'],
            ['AC input', '220V, 50Hz (1500W max)'],
            ['DC input', '13V, 10A max, car charging'],
          ]} />
          <SpecGroup title='Charging time (0–100%)' items={[
            ['AC adapter', product.AcCharging],
            ['Solar panels', product.solarCharging],
            ['Solar kit', solarKitText(product)],
            ...(product.mppt ? [['Solar charger', 'Built-in MPPT, takes 500 W+ panels']] : []),
          ]} />
          <SpecGroup title='Dimensions & warranty' items={[
            ['Length', product.length],
            ['Width', product.width],
            ['Height', product.height],
            ['Weight', product.weight],
            ['Warranty', '2 years'],
          ]} />
        </div>
      )}

      {tab === 2 && <SpecsInPicture product={product} />}
    </div>
  )
}

export default Info
