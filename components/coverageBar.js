import React from 'react'
import { wattHours as wh } from '@/lib/format';

// Stacked bar: battery + solar supply against the day's energy need.
// `option` needs battery, solarYield and dailyCapacity (all Wh).
function CoverageBar({ option, need = 0 }) {
  const scale = Math.max(option.dailyCapacity, need);
  const batteryPct = (option.battery / scale) * 100;
  const solarPct = (option.solarYield / scale) * 100;
  const needPct = (need / scale) * 100;

  return (
    <div>
      <div className='relative flex h-4 w-full overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-line/10'>
        <div className='h-full bg-brand-600' style={{ width: `${batteryPct}%` }} />
        {option.solarYield > 0 && <div className='h-full bg-brand-300' style={{ width: `${solarPct}%` }} />}
        {need > 0 && <div className='absolute top-0 h-full border-r-2 border-dashed border-ink' style={{ left: `${needPct}%` }} aria-hidden='true' />}
      </div>
      <div className='mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted'>
        <span className='flex items-center gap-1.5'><span className='h-2.5 w-2.5 rounded-full bg-brand-600' />Battery {wh(option.battery)}</span>
        {option.solarYield > 0 && (
          <span className='flex items-center gap-1.5'><span className='h-2.5 w-2.5 rounded-full bg-brand-300' />Solar ≈ {wh(option.solarYield)}/day</span>
        )}
        {need > 0 && <span className='flex items-center gap-1.5'><span className='h-3 border-r-2 border-dashed border-ink' />Your use {wh(need)}/day</span>}
      </div>
    </div>
  );
}

export default CoverageBar
