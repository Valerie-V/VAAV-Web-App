'use client'
import React from 'react'
import Link from 'next/link';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { recommendSetup, SOLAR_ASSUMPTIONS } from '@/lib/audit';
import { naira, wattHours as wh } from '@/lib/format';

const bookHref = (service, product) => {
  const params = new URLSearchParams({ service });
  if (product) params.set('product', product);
  return `/book?${params.toString()}`;
};

// Stacked bar: battery + solar supply against the day's energy need.
function CoverageBar({ option, need }) {
  const scale = Math.max(option.dailyCapacity, need);
  const batteryPct = (option.battery / scale) * 100;
  const solarPct = (option.solarYield / scale) * 100;
  const needPct = (need / scale) * 100;

  return (
    <div>
      <div className='relative flex h-4 w-full overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-line/10'>
        <div className='h-full bg-brand-600' style={{ width: `${batteryPct}%` }} />
        {option.solarYield > 0 && <div className='h-full bg-brand-300' style={{ width: `${solarPct}%` }} />}
        <div className='absolute top-0 h-full border-r-2 border-dashed border-ink' style={{ left: `${needPct}%` }} aria-hidden='true' />
      </div>
      <div className='mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted'>
        <span className='flex items-center gap-1.5'><span className='h-2.5 w-2.5 rounded-full bg-brand-600' />Battery {wh(option.battery)}</span>
        {option.solarYield > 0 && (
          <span className='flex items-center gap-1.5'><span className='h-2.5 w-2.5 rounded-full bg-brand-300' />Solar ≈ {wh(option.solarYield)}/day</span>
        )}
        <span className='flex items-center gap-1.5'><span className='h-3 border-r-2 border-dashed border-ink' />Your use {wh(need)}/day</span>
      </div>
    </div>
  );
}

function explain(option, need, peakPower) {
  const inverter = Number(option.product.inverter).toLocaleString();
  if (option.withSolar) {
    return (
      <>
        Its {wh(option.battery)} battery plus about <b className='text-ink'>{wh(option.solarYield)}</b> a day
        from {option.panels} × {SOLAR_ASSUMPTIONS.panelWatts} W solar panels gives roughly{' '}
        <b className='text-ink'>{wh(option.dailyCapacity)}</b> a day, covering your {wh(need)}. Your {peakPower.toLocaleString()} W
        load is within its {inverter} W output.
      </>
    );
  }
  return (
    <>
      Its {wh(option.battery)} battery covers your {wh(need)} a day on a single charge, and your{' '}
      {peakPower.toLocaleString()} W load is within its {inverter} W output.
    </>
  );
}

function alternativeText(option) {
  if (option.withSolar) {
    return `Its ${option.panels} solar panels add about ${wh(option.solarYield)} a day, so you can recharge without grid power.`;
  }
  return `Its ${wh(option.battery)} battery covers your day on its own, charged from grid power.`;
}

function Recommend({ myProduct, total, myPower }) {
  const { best, alternative } = recommendSetup(myProduct, total, myPower);

  if (!total) {
    return <p className='card p-8 text-center text-muted'>Add at least one appliance to get a recommendation.</p>;
  }

  if (!best) {
    return (
      <div className='card mx-auto max-w-2xl p-8 text-center md:p-12'>
        <h2 className='text-2xl font-bold'>You need a custom system</h2>
        <p className='lead mt-3'>
          Your appliances draw {myPower.toLocaleString()} W and use about {wh(total)} a day, which is more than our
          standard PowerCubes can handle, even with solar. Book a consultation and we&apos;ll design a system for you.
        </p>
        <Link href={bookHref('consultation')} className='btn-primary mt-8'>Book a consultation</Link>
      </div>
    );
  }

  return (
    <div className='grid gap-6 lg:grid-cols-[1.2fr_1fr]'>
      <div className='card overflow-hidden'>
        <div className='grid md:grid-cols-[1fr_1.2fr]'>
          <div className='stage flex items-center justify-center p-8'>
            <img src={best.product.image[0]} alt={best.product.name[0]} className='max-h-64 w-auto object-contain feather mix-blend-multiply' />
          </div>
          <div className='p-6 md:p-8'>
            <span className='eyebrow'><AutoAwesomeIcon sx={{ fontSize: 14 }} /> Best value for you</span>
            <h2 className='mt-4 text-3xl font-bold'>{best.name}</h2>
            <p className='mt-2 text-3xl font-bold text-pop'>{naira(best.price)}</p>
            <p className='mt-4 leading-relaxed text-muted'>{explain(best, total, myPower)}</p>
          </div>
        </div>
        <div className='border-t border-line/10 p-6 md:p-8'>
          <CoverageBar option={best} need={total} />
          <div className='mt-6 flex flex-wrap gap-3'>
            <Link href={bookHref('consultation', best.name)} className='btn-primary'>Book a consultation</Link>
            <Link href={`/products?product=${best.product.id}`} className='btn-secondary'>View product</Link>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        {alternative && (
          <div className='card p-6'>
            <p className='text-sm font-medium text-muted'>Other option</p>
            <div className='mt-2 flex items-start justify-between gap-4'>
              <h3 className='text-xl font-bold'>{alternative.name}</h3>
              <p className='shrink-0 text-lg font-bold text-pop'>{naira(alternative.price)}</p>
            </div>
            <p className='mt-2 text-sm leading-relaxed text-muted'>{alternativeText(alternative)}</p>
            <div className='mt-5'>
              <CoverageBar option={alternative} need={total} />
            </div>
            <Link href={`/products?product=${alternative.product.id}`} className='link mt-5 inline-block text-sm'>View product</Link>
          </div>
        )}

        <div className='rounded-3xl bg-surface p-6 text-sm leading-relaxed text-muted ring-1 ring-line/10'>
          <p className='font-semibold text-ink'>How we worked this out</p>
          <p className='mt-2'>
            Your total load ({myPower.toLocaleString()} W) must fit the PowerCube&apos;s output, and your daily energy ({wh(total)}) must
            fit what its battery, plus any solar, can supply in a day.
          </p>
          <p className='mt-2'>
            Solar estimates assume about {SOLAR_ASSUMPTIONS.peakSunHours} hours of full sun a day and{' '}
            {Math.round(SOLAR_ASSUMPTIONS.systemEfficiency * 100)}% system efficiency. Output varies with location, season and weather.
            Solar only helps in daylight, so the battery still needs to cover what you use after dark. We&apos;ll confirm the setup with you in a consultation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Recommend
