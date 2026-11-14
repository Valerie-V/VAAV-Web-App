import { solarKitText } from '@/lib/solar';
import React from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/sectionHeading';
import { naira } from '@/lib/format';

const rows = [
  { label: 'Output power', value: p => `${Number(p.inverter).toLocaleString()} W` },
  { label: 'Battery capacity', value: p => `${Number(p.battery).toLocaleString()} Wh` },
  { label: 'AC charging (0–100%)', value: p => p.AcCharging },
  { label: 'Solar charging (0–100%)', value: p => p.solarCharging },
  { label: 'Solar kit', value: p => solarKitText(p) },
  { label: 'Price', value: p => <span className='font-bold text-pop'>{naira(p.price1)}</span> },
  { label: 'Price with solar', value: p => <span className='font-bold text-pop'>{naira(p.price2)}</span> },
];

function Compare({ products }) {
  return (
    <section id='compare' className='section border-t border-line/10 bg-graphite-900'>
      <div className='container-x'>
        <SectionHeading
          eyebrow='Compare'
          title='Find your fit at a glance'
          intro={<>Not sure which one you need? <Link href='/audit' className='link'>Run a free energy audit</Link> or <Link href='/book?service=consultation' className='link'>book a consultation</Link>.</>}
        />
        <div className='card mt-12 overflow-x-auto'>
          <table className='w-full min-w-[760px] text-left text-sm md:text-base'>
            <thead>
              <tr className='border-b border-line/10'>
                <th scope='col' className='sticky left-0 bg-card p-5 text-sm font-medium text-muted'>Model</th>
                {products.map(p => (
                  <th key={p.id} scope='col' className='p-5 align-bottom'>
                    <span className='stage mb-3 flex h-20 w-24 items-center justify-center rounded-2xl p-2'><img src={p.image[0]} alt='' className='max-h-full w-auto object-contain feather mix-blend-multiply' /></span>
                    <span className='font-bold'>{p.name[0]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-line/10'>
              {rows.map(row => (
                <tr key={row.label} className='transition hover:bg-line/[0.03]'>
                  <th scope='row' className='sticky left-0 bg-card p-5 text-sm font-medium text-muted'>{row.label}</th>
                  {products.map(p => <td key={p.id} className='p-5'>{row.value(p)}</td>)}
                </tr>
              ))}
              <tr>
                <th scope='row' className='sticky left-0 bg-card p-5 text-sm font-medium text-muted'>Installation</th>
                {products.map(p => (
                  <td key={p.id} className='p-5'>
                    <Link href={`/book?service=installation&product=${encodeURIComponent(p.name[0])}`} className='link text-sm'>Book</Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Compare
