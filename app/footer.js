import React from 'react'
import Link from 'next/link'
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { business } from '@/lib/business';
import Logo from '@/components/logo';

const columns = [
  {
    title: 'Shop',
    links: [
      { href: '/products', label: 'All products' },
      { href: '/products#compare', label: 'Compare models' },
      { href: '/checkout', label: 'Cart' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/audit', label: 'Energy audit' },
      { href: '/book?service=consultation', label: 'Consultation' },
      { href: '/book?service=installation', label: 'Installation' },
      { href: '/book?service=maintenance', label: 'Maintenance' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/#features', label: 'Why VAAV' },
      { href: '/#how-it-works', label: 'How it works' },
      { href: '/#faq', label: 'FAQ' },
      { href: '/#contact', label: 'Contact' },
    ],
  },
];

function Footer() {
  return (
    <footer className='relative overflow-hidden border-t border-white/10 bg-graphite-950'>
      <div className='pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]' />
      <div className='container-x relative grid gap-12 py-20 md:grid-cols-[1.5fr_repeat(3,1fr)]'>
        <div>
          <Link href="/" aria-label='VAAV home' className='inline-block'>
            <Logo tagline />
          </Link>
          <p className='mt-6 max-w-xs text-white/55'>Clean, affordable, portable power for homes and businesses across Africa.</p>
          {(business.linkedin || business.x) && (
            <div className='mt-6 flex gap-2'>
              {business.linkedin && (
                <a href={business.linkedin} target='_blank' rel='noopener noreferrer' aria-label='VAAV on LinkedIn' className='flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition hover:bg-brand-500'>
                  <LinkedInIcon fontSize='small'/>
                </a>
              )}
              {business.x && (
                <a href={business.x} target='_blank' rel='noopener noreferrer' aria-label='VAAV on X' className='flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition hover:bg-brand-500'>
                  <XIcon fontSize='small'/>
                </a>
              )}
            </div>
          )}
        </div>
        {columns.map(column => (
          <div key={column.title}>
            <h3 className='text-xs font-semibold uppercase tracking-[0.16em] text-white/40'>{column.title}</h3>
            <ul className='mt-5 space-y-3'>
              {column.links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className='text-white/75 transition hover:text-brand-300'>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* oversized wordmark */}
      <div className='container-x relative select-none' aria-hidden='true'>
        <p className='bg-gradient-to-b from-white/[0.12] to-transparent bg-clip-text text-center font-display text-[26vw] font-bold leading-[0.8] tracking-tighter text-transparent lg:text-[20rem]'>VAAV</p>
      </div>

      <div className='relative border-t border-white/10'>
        <div className='container-x flex flex-col justify-between gap-2 py-6 text-sm text-white/45 md:flex-row'>
          <p>&copy; {new Date().getFullYear()} VAAV, Ltd. All rights reserved.</p>
          <p>Engineering a better future.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
