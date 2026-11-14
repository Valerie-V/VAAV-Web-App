'use client'
import React from 'react'
import Link from 'next/link';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { recommendSetup, SOLAR_ASSUMPTIONS } from '@/lib/audit';
import { CUSTOM_ASSUMPTIONS, customSystemText, inverterWatts, panelYield } from '@/lib/customSystem';
import { naira, wattHours as wh } from '@/lib/format';
import CoverageBar from '@/components/coverageBar';

const bookHref = (service, product, notes) => {
  const params = new URLSearchParams({ service });
  if (product) params.set('product', product);
  if (notes) params.set('notes', notes);
  return `/book?${params.toString()}`;
};

// Shown when the load is bigger than any PowerCube: a system built from
// separate batteries, inverters and panels.
function CustomRecommendation({ system, need, peakPower }) {
  const customiseHref = `/custom?${new URLSearchParams({ load: peakPower, daily: need }).toString()}`;
  const notes = `Custom system: ${customSystemText(system.counts)} (${naira(system.price)}). Total load: ${peakPower.toLocaleString()} W. Daily use: ${need.toLocaleString()} Wh.`;
  const kw = (w) => `${(w / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} kW`;

  return (
    <div className='grid gap-6 lg:grid-cols-[1.2fr_1fr]'>
      <div className='card overflow-hidden'>
        <div className='grid md:grid-cols-[1fr_1.2fr]'>
          <div className='stage flex items-center justify-center p-8'>
            <img src='/illustrations/custom-system.svg' alt='' className='max-h-48 w-auto mix-blend-multiply' />
          </div>
          <div className='p-6 md:p-8'>
            <span className='eyebrow'><AutoAwesomeIcon sx={{ fontSize: 14 }} /> Custom system</span>
            <h2 className='mt-4 text-3xl font-bold'>A system built for your load</h2>
            <p className='mt-2 text-3xl font-bold text-pop'>{naira(system.price)}</p>
            <p className='mt-4 leading-relaxed text-muted'>
              Your appliances draw {peakPower.toLocaleString()} W and use about {wh(need)} a day, more than our largest PowerCube
              can handle. This system gives you {kw(system.output)} of output, {wh(system.battery)} of storage and about{' '}
              <b className='text-ink'>{wh(system.solarYield)}</b> a day from solar.
            </p>
          </div>
        </div>
        <div className='border-t border-line/10 p-6 md:p-8'>
          <ul className='divide-y divide-line/10 rounded-2xl ring-1 ring-line/10'>
            {system.lines.map(line => (
              <li key={line.id} className='flex items-center justify-between gap-4 px-4 py-3 text-sm'>
                <span><b className='text-ink'>{line.qty} ×</b> {line.name}</span>
                <span className='font-medium tabular-nums'>{naira(line.subtotal)}</span>
              </li>
            ))}
          </ul>
          <div className='mt-6'>
            <CoverageBar option={system} need={need} />
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Link href={customiseHref} className='btn-primary'>Customise this system</Link>
            <Link href={bookHref('consultation', 'Custom system', notes)} className='btn-secondary'>Book a consultation</Link>
          </div>
        </div>
      </div>

      <div className='rounded-3xl bg-surface p-6 text-sm leading-relaxed text-muted ring-1 ring-line/10 lg:self-start'>
        <p className='font-semibold text-ink'>How we worked this out</p>
        <ul className='mt-2 list-disc space-y-1.5 pl-5'>
          <li>Enough 650 W panels to produce your whole day&apos;s energy (about {wh(panelYield)} each a day).</li>
          <li>Enough 15 kWh batteries to cover what you use after dark, taken as {Math.round(CUSTOM_ASSUMPTIONS.nightShare * 100)}% of your day.</li>
          <li>Enough 12 kVA inverters (about {kw(inverterWatts)} each) for your {peakPower.toLocaleString()} W load and the solar array.</li>
        </ul>
        <p className='mt-3'>
          Prices are for the equipment only. Installation depends on your site and is quoted after a visit. Solar estimates assume about{' '}
          {SOLAR_ASSUMPTIONS.peakSunHours} hours of full sun a day and {Math.round(SOLAR_ASSUMPTIONS.systemEfficiency * 100)}% efficiency.
        </p>
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
        from {option.panels} × {option.panelWatts} W solar panels gives roughly{' '}
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
  const { best, alternative, custom } = recommendSetup(myProduct, total, myPower);

  if (!total) {
    return <p className='card p-8 text-center text-muted'>Add at least one appliance to get a recommendation.</p>;
  }

  if (!best) {
    return <CustomRecommendation system={custom} need={total} peakPower={myPower} />;
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
