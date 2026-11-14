'use client'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useStateValue } from '@/context/StateProvider'
import { summarizeAudit } from '@/lib/audit'
import {
  COMPONENTS,
  CUSTOM_ASSUMPTIONS,
  DEFAULT_SYSTEM,
  customSystemName,
  customSystemText,
  describeCustomSystem,
  inverterWatts,
  limits,
  panelYield,
  sizeCustomSystem,
} from '@/lib/customSystem'
import { naira, wattHours as wh } from '@/lib/format'
import CoverageBar from '@/components/coverageBar'

const kw = (w) => `${(w / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} kW`;
const kwh = (w) => `${(w / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} kWh`;

const CARDS = [
  {
    id: 'battery',
    icon: BatteryChargingFullOutlinedIcon,
    spec: `${kwh(COMPONENTS.battery.wattHours)} of storage each`,
    role: 'Stores energy for the evening, night and cloudy days.',
    min: 1,
  },
  {
    id: 'inverter',
    icon: ElectricalServicesOutlinedIcon,
    spec: `About ${kw(inverterWatts)} of appliances each`,
    role: 'Turns stored and solar energy into power for your appliances.',
    min: 1,
  },
  {
    id: 'panel',
    icon: WbSunnyOutlinedIcon,
    spec: `About ${wh(panelYield)} a day each`,
    role: 'Charges the batteries and runs your appliances in daylight.',
    min: 0,
  },
];

const readNumber = (params, key) => {
  const n = Number(params.get(key));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
};

function Stepper({ value, min, max, onChange, label }) {
  return (
    <div className='flex items-center rounded-full ring-1 ring-line/15'>
      <button type='button' onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className='rounded-full p-2.5 transition hover:bg-surface disabled:opacity-30' aria-label={`Fewer ${label}s`}>
        <RemoveIcon fontSize='small' />
      </button>
      <span className='w-9 text-center font-semibold tabular-nums' aria-live='polite' aria-label={`${value} ${label}${value === 1 ? '' : 's'}`}>{value}</span>
      <button type='button' onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className='rounded-full p-2.5 transition hover:bg-surface disabled:opacity-30' aria-label={`More ${label}s`}>
        <AddIcon fontSize='small' />
      </button>
    </div>
  );
}

function Check({ ok, children }) {
  return (
    <li className='flex items-start gap-2.5 text-sm'>
      {ok
        ? <CheckCircleIcon sx={{ fontSize: 18 }} className='mt-0.5 shrink-0 text-pop' />
        : <ErrorOutlineIcon sx={{ fontSize: 18 }} className='mt-0.5 shrink-0 text-amber-400' />}
      <span className={ok ? 'text-ink' : 'text-muted'}>{children}</span>
    </li>
  );
}

function Builder() {
  const [{ audit }, dispatch] = useStateValue();
  const params = useSearchParams();

  // Needs come from the link (?load=&daily=), then from an energy audit taken
  // this visit, otherwise the visitor can type them in.
  const initial = useMemo(() => {
    const fromAudit = summarizeAudit(audit);
    const load = readNumber(params, 'load') || fromAudit.peakPower;
    const daily = readNumber(params, 'daily') || fromAudit.dailyEnergy;
    const source = params.get('daily') || params.get('load') ? 'link' : fromAudit.items.length ? 'audit' : null;
    const sized = daily || load ? sizeCustomSystem(daily, load) : DEFAULT_SYSTEM;
    const counts = Object.fromEntries(
      CARDS.map(({ id, min }) => [id, Math.min(limits[id], Math.max(min, readNumber(params, id) || sized[id]))])
    );
    return { load, daily, source, counts };
  }, [audit, params]);

  const [counts, setCounts] = useState(initial.counts);
  const [needs, setNeeds] = useState({ load: initial.load || '', daily: initial.daily || '' });
  const [added, setAdded] = useState(false);

  const load = Number(needs.load) || 0;
  const daily = Number(needs.daily) || 0;
  const system = describeCustomSystem(counts, daily, load);

  const setCount = (id, value) => {
    setCounts(current => ({ ...current, [id]: value }));
    setAdded(false);
  };

  const sizeForMe = () => {
    setCounts(sizeCustomSystem(daily, load));
    setAdded(false);
  };

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      payload: { name: customSystemName(counts), image: '/illustrations/custom-system.svg', price: system.price, qty: 1 },
    });
    setAdded(true);
  };

  const notes = [
    `Custom system: ${customSystemText(counts)} (${naira(system.price)}).`,
    load ? `Total load: ${load.toLocaleString()} W.` : '',
    daily ? `Daily use: ${daily.toLocaleString()} Wh.` : '',
  ].filter(Boolean).join(' ');
  const bookHref = `/book?${new URLSearchParams({ service: 'consultation', product: 'Custom system', notes }).toString()}`;

  const { checks } = system;

  return (
    <div className='grid items-start gap-8 lg:grid-cols-[1.35fr_1fr]'>
      <div className='space-y-6'>
        {/* needs */}
        <section className='card p-6 md:p-8' aria-labelledby='needs-title'>
          <div className='flex flex-wrap items-start justify-between gap-3'>
            <div>
              <h2 id='needs-title' className='text-xl font-bold'>Your needs</h2>
              <p className='mt-1 text-sm text-muted'>
                {initial.source
                  ? 'Filled in from your energy audit. Change them if you like.'
                  : <>Not sure? <Link href='/audit' className='link'>Take the free energy audit</Link> and we&apos;ll work them out.</>}
              </p>
            </div>
          </div>
          <div className='mt-5 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end'>
            <div>
              <label htmlFor='need-load' className='label'>Total load (W)</label>
              <input id='need-load' type='number' inputMode='numeric' min='0' placeholder='e.g. 12000' value={needs.load} onChange={e => setNeeds({ ...needs, load: e.target.value })} className='input' />
            </div>
            <div>
              <label htmlFor='need-daily' className='label'>Daily use (Wh)</label>
              <input id='need-daily' type='number' inputMode='numeric' min='0' placeholder='e.g. 40000' value={needs.daily} onChange={e => setNeeds({ ...needs, daily: e.target.value })} className='input' />
            </div>
            <button type='button' onClick={sizeForMe} disabled={!load && !daily} className='btn-primary disabled:opacity-40'>
              <AutoAwesomeIcon sx={{ fontSize: 18 }} /> Size it for me
            </button>
          </div>
        </section>

        {/* components */}
        <section aria-labelledby='parts-title'>
          <h2 id='parts-title' className='text-xl font-bold'>Your components</h2>
          <ul className='mt-4 space-y-3'>
            {CARDS.map(({ id, icon: Icon, spec, role, min }) => {
              const part = COMPONENTS[id];
              return (
                <li key={id} className='card glow-card flex flex-wrap items-center gap-4 p-5'>
                  <span className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300'><Icon /></span>
                  <div className='min-w-[12rem] flex-1'>
                    <p className='font-semibold'>{part.name}</p>
                    <p className='text-sm text-muted'>{spec} · {naira(part.price)} each</p>
                    <p className='mt-1 text-xs text-muted'>{role}</p>
                  </div>
                  <div className='flex w-full items-center justify-between gap-4 sm:w-auto'>
                    <Stepper value={counts[id]} min={min} max={limits[id]} label={part.unit} onChange={value => setCount(id, value)} />
                    <p className='w-32 text-right font-bold tabular-nums'>{naira(counts[id] * part.price)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className='rounded-3xl bg-surface p-6 text-sm leading-relaxed text-muted ring-1 ring-line/10'>
          <p className='font-semibold text-ink'>How we size a system</p>
          <ul className='mt-2 list-disc space-y-1.5 pl-5'>
            <li><b className='text-ink'>Solar panels</b> to produce your whole day&apos;s energy, so the batteries refill on a sunny day.</li>
            <li><b className='text-ink'>Batteries</b> to cover what you use after dark, which we take as {Math.round(CUSTOM_ASSUMPTIONS.nightShare * 100)}% of your day.</li>
            <li><b className='text-ink'>Inverters</b> to run everything you switch on at once, and to take in all the solar ({kw(CUSTOM_ASSUMPTIONS.maxSolarWattsPerInverter)} of panels each).</li>
          </ul>
          <p className='mt-3'>
            Each 650 W panel gives about {wh(panelYield)} a day, assuming 4.5 hours of full sun and 80% efficiency. Output varies with
            location, season and weather. We confirm every custom system with you before anything is installed.
          </p>
        </section>
      </div>

      {/* summary */}
      <aside className='card overflow-hidden lg:sticky lg:top-28' aria-labelledby='summary-title'>
        <div className='stage flex items-center justify-center p-6'>
          <img src='/illustrations/custom-system.svg' alt='' className='h-36 w-auto mix-blend-multiply' />
        </div>
        <div className='p-6 md:p-8'>
          <h2 id='summary-title' className='text-xl font-bold'>Your system</h2>
          <dl className='mt-4 grid grid-cols-3 gap-3 text-center'>
            {[
              ['Output', kw(system.output)],
              ['Storage', kwh(system.battery)],
              ['Solar', kw(system.solarWatts)],
            ].map(([label, value]) => (
              <div key={label} className='rounded-2xl bg-surface p-3 ring-1 ring-line/10'>
                <dt className='text-xs text-muted'>{label}</dt>
                <dd className='mt-1 font-bold'>{value}</dd>
              </div>
            ))}
          </dl>

          <div className='mt-6'>
            <CoverageBar option={system} need={daily} />
          </div>

          <ul className='mt-6 space-y-2.5'>
            {system.hasNeed && (
              <>
                <Check ok={checks.power}>
                  {checks.power
                    ? <>Runs your {load.toLocaleString()} W load</>
                    : <>Add an inverter: your {load.toLocaleString()} W load is more than {kw(system.output)}</>}
                </Check>
                <Check ok={checks.energy}>
                  {checks.energy
                    ? <>Covers your {wh(daily)} a day with battery and solar</>
                    : <>Falls short of your {wh(daily)} a day: add panels or a battery</>}
                </Check>
                <Check ok={checks.night}>
                  {checks.night
                    ? <>Batteries cover your night-time use</>
                    : <>Add a battery to cover night-time use (about {wh(daily * CUSTOM_ASSUMPTIONS.nightShare)})</>}
                </Check>
                {daily > 0 && (
                  <Check ok={system.solarShare >= 1}>
                    Solar produces about {Math.round(system.solarShare * 100)}% of your daily use
                  </Check>
                )}
              </>
            )}
            {!checks.solarFits && (
              <Check ok={false}>Too many panels for {counts.inverter} inverter{counts.inverter === 1 ? '' : 's'}: add an inverter</Check>
            )}
          </ul>

          <div className='mt-6 flex items-end justify-between gap-4 border-t border-line/10 pt-6'>
            <div>
              <p className='text-sm text-muted'>Equipment total</p>
              <p className='text-3xl font-bold text-pop'>{naira(system.price)}</p>
            </div>
          </div>

          <div className='mt-5 grid gap-3'>
            <button type='button' onClick={addToCart} className='btn-primary py-3.5 text-base'>Add to cart</button>
            <Link href={bookHref} className='btn-secondary'>Book a consultation</Link>
          </div>

          {added && (
            <div className='mt-4 flex items-center justify-between gap-3 rounded-2xl bg-brand-500/10 p-4 text-sm ring-1 ring-inset ring-brand-400/25' role='status'>
              <span className='flex items-center gap-2 font-medium text-pop'><CheckCircleIcon fontSize='small' /> Added to your cart</span>
              <Link href='/checkout' className='font-semibold text-pop underline underline-offset-4'>View cart</Link>
            </div>
          )}

          <p className='mt-4 text-xs leading-relaxed text-muted'>
            Prices are for the equipment only. Installation, mounting and cabling depend on your site, and we&apos;ll quote them after a site visit.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default Builder
