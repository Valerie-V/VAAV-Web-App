import React from 'react'

// Text wordmark for dark backgrounds. The original logo file
// (public/illustrations/logo-vaav.png) has a solid light background, so it
// doesn't sit well on the dark theme. Swap this for a transparent or white
// version of the logo when one is available.
function Logo({ className = '', tagline = false }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className='relative inline-flex w-fit items-center font-display text-[1.6rem] font-bold tracking-[0.12em] text-white'>
        <span className='pointer-events-none absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/50 blur-md' aria-hidden='true' />
        <span className='pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-brand-300/60' aria-hidden='true' />
        <span className='relative'>VAAV</span>
      </span>
      {tagline && <span className='mt-1.5 text-[10px] font-medium italic tracking-wide text-brand-300/90'>...Engineering a better future</span>}
    </span>
  )
}

export default Logo
