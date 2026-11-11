import React from 'react'

const items = ['Solar ready', 'Zero fumes', 'Silent power', 'LiFePO4 cells', '4,000+ cycles', 'Plug & play', 'Grid or sun charging', '2-year warranty', 'Installed by our team'];

// Endless ticker of selling points between the hero and the next section.
function Marquee() {
  const row = [...items, ...items];
  return (
    <div id='marquee' className='relative overflow-hidden border-y border-white/10 bg-brand-600 py-5 text-white'>
      <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-600 to-transparent' />
      <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-600 to-transparent' />
      <ul className='flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]' aria-label='Why PowerCube'>
        {row.map((item, index) => (
          <li key={index} className='flex items-center gap-10 font-display text-xl font-semibold tracking-tight md:text-2xl' aria-hidden={index >= items.length}>
            {item}
            <span className='text-brand-200' aria-hidden='true'>✦</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Marquee
