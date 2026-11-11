import React from 'react'
import Reveal from './reveal'

// Eyebrow + title + optional intro, used at the top of each section.
// Colours follow the section's theme (dark by default, or `theme-light`).
function SectionHeading({ eyebrow, title, intro, align = 'center', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow && <span className='eyebrow'>{eyebrow}</span>}
      <h2 className='h-section'>{title}</h2>
      {intro && <p className='lead max-w-2xl'>{intro}</p>}
    </Reveal>
  )
}

export default SectionHeading
