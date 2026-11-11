'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { initialState } from '@/context/reducer';
import { solarYield, SOLAR_ASSUMPTIONS } from '@/lib/audit';
import SectionHeading from '@/components/sectionHeading';

// An illustrative day for a typical home on a PowerCubeXtra + solar bundle.
// Solar uses the same assumptions as the energy audit (lib/audit.js), spread
// over daylight hours. The household below uses about 3,800 Wh a day.
const PRODUCT = initialState.products.find(p => p.id === '3');
const SUNRISE = 6;
const SUNSET = 18;
const STEP = 0.25; // hours

const SCHEDULE = [
  { from: 0, to: 6, load: 130, running: ['Fridge', 'Fan', 'Wi-Fi'] },
  { from: 6, to: 8, load: 125, running: ['Fridge', 'Lights', 'Wi-Fi'] },
  { from: 8, to: 12, load: 115, running: ['Fridge', 'Wi-Fi', 'Phone charging'] },
  { from: 12, to: 18, load: 85, running: ['Fridge', 'Wi-Fi'] },
  { from: 18, to: 23, load: 340, running: ['Fridge', 'Lights', 'TV', 'Fan', 'Wi-Fi'] },
  { from: 23, to: 24, load: 130, running: ['Fridge', 'Fan', 'Wi-Fi'] },
];

const periodAt = (hour) => SCHEDULE.find(p => hour >= p.from && hour < p.to) || SCHEDULE[0];

function simulate() {
  const capacity = Number(PRODUCT.battery);
  const daily = solarYield(PRODUCT);
  // Spread the day's solar over a sine curve so it peaks at midday.
  const peak = (daily * Math.PI) / (2 * (SUNSET - SUNRISE));
  const solarAt = (h) => (h <= SUNRISE || h >= SUNSET ? 0 : peak * Math.sin((Math.PI * (h - SUNRISE)) / (SUNSET - SUNRISE)));

  // Run two days and keep the second, so the battery starts the day where a
  // typical day would leave it.
  let stored = capacity * 0.6;
  let points = [];
  for (let day = 0; day < 2; day++) {
    points = [];
    for (let h = 0; h <= 24 + 1e-9; h += STEP) {
      const solar = solarAt(h);
      const load = periodAt(h % 24).load;
      points.push({ hour: h, solar, load, battery: stored / capacity });
      stored = Math.min(capacity, Math.max(0, stored + (solar - load) * STEP));
    }
  }
  return { points, daily, capacity, peak };
}

const fmtTime = (hour) => {
  const h = Math.floor(hour) % 24;
  const m = Math.round((hour % 1) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

// Chart geometry (SVG units).
const W = 460;
const H = 190;
const PAD = { top: 22, right: 6, bottom: 26, left: 6 };

function DayChart({ points, hour, maxW }) {
  const x = (h) => PAD.left + (h / 24) * (W - PAD.left - PAD.right);
  const y = (w) => PAD.top + (1 - w / maxW) * (H - PAD.top - PAD.bottom);
  const base = y(0);

  const solarLine = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.hour).toFixed(1)},${y(p.solar).toFixed(1)}`).join('');
  const solarArea = `${solarLine}L${x(24)},${base}L${x(0)},${base}Z`;
  const loadLine = points.map((p, i) => {
    const prev = points[i - 1];
    const step = prev && prev.load !== p.load ? `L${x(p.hour).toFixed(1)},${y(prev.load).toFixed(1)}` : '';
    return `${step}${i ? 'L' : 'M'}${x(p.hour).toFixed(1)},${y(p.load).toFixed(1)}`;
  }).join('');

  const current = points[Math.round(hour / STEP)];
  const solarLabel = points.reduce((a, b) => (b.solar > a.solar ? b : a));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className='h-auto w-full' role='img' aria-label='Solar power coming in and power the home uses over 24 hours'>
      <defs>
        <linearGradient id='solarFill' x1='0' x2='0' y1='0' y2='1'>
          <stop offset='0%' stopColor='#2FA85B' stopOpacity='0.55' />
          <stop offset='100%' stopColor='#2FA85B' stopOpacity='0.04' />
        </linearGradient>
      </defs>
      {[6, 12, 18].map(h => (
        <g key={h}>
          <line x1={x(h)} x2={x(h)} y1={PAD.top} y2={base} stroke='rgba(255,255,255,0.06)' />
          <text x={x(h)} y={H - 8} textAnchor='middle' fontSize='12' fill='rgba(255,255,255,0.5)'>{fmtTime(h)}</text>
        </g>
      ))}
      <line x1={PAD.left} x2={W - PAD.right} y1={base} y2={base} stroke='rgba(255,255,255,0.12)' />
      <path d={solarArea} fill='url(#solarFill)' />
      <path d={solarLine} fill='none' stroke='#2FA85B' strokeWidth='2' strokeLinejoin='round' />
      <path d={loadLine} fill='none' stroke='#A9B4AE' strokeWidth='2' strokeDasharray='5 4' strokeLinejoin='round' />

      {/* direct labels */}
      <text x={x(solarLabel.hour)} y={y(solarLabel.solar) - 8} textAnchor='middle' fontSize='13' fontWeight='600' fill='rgba(255,255,255,0.85)'>Solar in</text>
      <text x={x(20.5)} y={y(340) - 8} textAnchor='middle' fontSize='13' fontWeight='600' fill='rgba(255,255,255,0.85)'>Home use</text>

      {/* scrubber */}
      <line x1={x(hour)} x2={x(hour)} y1={PAD.top} y2={base} stroke='rgba(255,255,255,0.5)' strokeWidth='1' />
      <circle cx={x(hour)} cy={y(current.solar)} r='5' fill='#2FA85B' stroke='#161A18' strokeWidth='2' />
      <circle cx={x(hour)} cy={y(current.load)} r='5' fill='#A9B4AE' stroke='#161A18' strokeWidth='2' />
    </svg>
  );
}

function SolarDay() {
  const { points, daily, capacity, peak } = useMemo(simulate, []);
  const [hour, setHour] = useState(7);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef(null);
  const startedRef = useRef(false);

  // Start playing the first time the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        setPlaying(true);
      }
    }, { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setHour(h => (h + STEP >= 24 ? 0 : h + STEP)), 90);
    return () => clearInterval(id);
  }, [playing]);

  const point = points[Math.round(hour / STEP)];
  const isDay = hour > SUNRISE && hour < SUNSET;
  const daylight = isDay ? Math.sin((Math.PI * (hour - SUNRISE)) / (SUNSET - SUNRISE)) : 0;
  // Sun travels along an arc from sunrise to sunset; the moon does the night.
  const arcProgress = isDay ? (hour - SUNRISE) / (SUNSET - SUNRISE) : (((hour - SUNSET + 24) % 24) / (24 - (SUNSET - SUNRISE)));
  const angle = Math.PI * (1 - arcProgress);
  const orbX = 50 + 42 * Math.cos(angle);
  const orbY = 70 - 52 * Math.sin(angle);
  const batteryPct = Math.round(point.battery * 100);
  const net = point.solar - point.load;
  const running = periodAt(hour % 24).running;

  return (
    <section ref={sectionRef} id='solar-day' className='relative overflow-hidden bg-graphite-900'>
      <div className='container-x section'>
        <SectionHeading
          eyebrow='A day on solar'
          title={<>Watch the sun <span className='text-gradient'>do the work</span></>}
          intro='Solar tops up your PowerCube during the day, and the battery carries you through the evening and night. Drag the slider to explore a typical day.'
        />

        <div className='mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr]'>
          {/* sky */}
          <div className='card relative min-h-[380px] overflow-hidden p-0 lg:min-h-0'>
            <div className='absolute inset-0 bg-gradient-to-b from-[#0B1310] to-graphite-950' />
            <div className='absolute inset-0 bg-gradient-to-b from-brand-500/50 via-brand-700/20 to-transparent transition-opacity duration-500' style={{ opacity: daylight }} />
            {/* stars at night */}
            <div className='absolute inset-0 transition-opacity duration-700' style={{ opacity: isDay ? 0 : 0.8 }} aria-hidden='true'>
              {[[12, 18], [28, 10], [44, 22], [63, 12], [78, 20], [88, 8], [20, 32], [70, 30], [52, 6]].map(([l, t], i) => (
                <span key={i} className='absolute h-1 w-1 rounded-full bg-white/70' style={{ left: `${l}%`, top: `${t}%` }} />
              ))}
            </div>
            {/* arc */}
            <svg viewBox='0 0 100 100' preserveAspectRatio='none' className='absolute inset-0 h-full w-full' aria-hidden='true'>
              <path d='M8,70 A42,52 0 0 1 92,70' fill='none' stroke='rgba(255,255,255,0.12)' strokeDasharray='1.5 1.5' vectorEffect='non-scaling-stroke' />
            </svg>
            <div className='absolute -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-100 ease-linear' style={{ left: `${orbX}%`, top: `${orbY}%` }} aria-hidden='true'>
              {isDay ? (
                <span className='flex h-14 w-14 items-center justify-center rounded-full bg-brand-200 text-brand-700 shadow-[0_0_60px_20px_rgba(123,217,154,0.55)]'><WbSunnyRoundedIcon /></span>
              ) : (
                <span className='flex h-12 w-12 items-center justify-center rounded-full bg-graphite-200 text-graphite-700 shadow-[0_0_40px_8px_rgba(255,255,255,0.15)]'><DarkModeRoundedIcon /></span>
              )}
            </div>
            {/* ground + house readout */}
            <div className='absolute inset-x-0 bottom-0 h-[30%] border-t border-white/10 bg-gradient-to-b from-graphite-900/90 to-graphite-950 backdrop-blur' />
            <div className='absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4'>
              <div>
                <p className='font-display text-5xl font-bold tabular-nums text-white md:text-6xl'>{fmtTime(hour)}</p>
                <p className='mt-1 text-sm text-white/60'>{isDay ? 'Daytime: solar is charging' : 'Night: running on battery'}</p>
              </div>
              <ul className='flex flex-wrap justify-end gap-1.5' aria-label='Running now'>
                {running.map(item => <li key={item} className='chip bg-white/10 text-white/80'>{item}</li>)}
              </ul>
            </div>
          </div>

          {/* readouts */}
          <div className='flex flex-col gap-5'>
            <div className='card p-6'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-muted'>Battery</p>
                <p className={`text-sm font-medium ${net > 0 && batteryPct < 100 ? 'text-pop' : 'text-muted'}`}>
                  {batteryPct >= 100 && net >= 0 ? 'Full' : net > 0 ? 'Charging' : 'Discharging'}
                </p>
              </div>
              <div className='mt-3 flex items-center gap-4'>
                <div className='relative h-14 flex-1 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-inset ring-white/10'>
                  <div className='absolute inset-y-0 left-0 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-400 shadow-[0_0_30px_rgba(63,191,106,0.5)] transition-[width] duration-100 ease-linear' style={{ width: `${batteryPct}%` }} />
                </div>
                <p className='w-20 text-right font-display text-3xl font-bold tabular-nums'>{batteryPct}%</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='card p-6'>
                <p className='flex items-center gap-2 text-sm text-muted'><span className='h-0.5 w-4 rounded-full bg-[#2FA85B]' /> Solar in</p>
                <p className='mt-2 font-display text-3xl font-bold tabular-nums'>{Math.round(point.solar)} W</p>
              </div>
              <div className='card p-6'>
                <p className='flex items-center gap-2 text-sm text-muted'><span className='h-0 w-4 border-t-2 border-dashed border-[#A9B4AE]' /> Home use</p>
                <p className='mt-2 font-display text-3xl font-bold tabular-nums'>{point.load} W</p>
              </div>
            </div>
            <div className='card flex-1 p-6 pb-3'>
              <DayChart points={points} hour={hour} maxW={Math.max(peak, 340) * 1.15} />
            </div>
          </div>
        </div>

        {/* controls */}
        <div className='mt-5 flex items-center gap-4 rounded-full bg-white/5 p-2 pr-6 ring-1 ring-inset ring-white/10'>
          <button
            type='button'
            onClick={() => setPlaying(p => !p)}
            className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition hover:bg-brand-400'
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </button>
          <label htmlFor='day-hour' className='sr-only'>Time of day</label>
          <input
            id='day-hour'
            type='range'
            min='0'
            max={24 - STEP}
            step={STEP}
            value={hour}
            onChange={(e) => { setPlaying(false); setHour(Number(e.target.value)); }}
            className='h-2 w-full cursor-pointer'
            aria-valuetext={fmtTime(hour)}
          />
        </div>

        <div className='mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
          <p className='max-w-2xl text-sm text-muted'>
            Illustrative example: {PRODUCT.name[1]} ({Number(capacity).toLocaleString()} Wh battery, {PRODUCT.solarPanels} × {SOLAR_ASSUMPTIONS.panelWatts} W panels,
            about {daily.toLocaleString()} Wh of solar a day at {SOLAR_ASSUMPTIONS.peakSunHours} peak sun hours) for a home using about 3,800 Wh a day.
            Real results depend on weather, panel placement and how you use power.
          </p>
          <Link href='/audit' className='btn-primary group shrink-0'>
            Size a system for my home <ArrowForwardIcon sx={{ fontSize: 18 }} className='transition group-hover:translate-x-1' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SolarDay
