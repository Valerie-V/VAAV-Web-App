'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useStateValue } from '@/context/StateProvider';
import { getBasketCount } from '@/context/reducer';
import Logo from '@/components/logo';

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/audit', label: 'Energy Audit' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
];

function CartButton({ count }) {
  return (
    <Link
      href="/checkout"
      className='relative rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white'
      aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
    >
      <ShoppingCartOutlinedIcon fontSize='small' />
      {count > 0 && (
        <span className='absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-400 px-1 text-[11px] font-bold text-graphite-950 ring-2 ring-graphite-950'>
          {count}
        </span>
      )}
    </Link>
  );
}

function Nav() {
  const [{ basket }] = useStateValue();
  const count = getBasketCount(basket);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 8);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Close the mobile menu when navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Stop the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href) => !href.startsWith('/#') && pathname.startsWith(href);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'border-b border-white/10 bg-graphite-950/70 backdrop-blur-xl' : 'border-b border-transparent bg-graphite-950'}`}>
      <div className='container-x flex h-16 items-center justify-between gap-6 md:h-[72px]'>
        <Link href="/" className='shrink-0' aria-label='VAAV home'>
          <Logo />
        </Link>

        <nav className='hidden items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-inset ring-white/10 lg:flex' aria-label='Main'>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive(link.href) ? 'bg-white text-graphite-950' : 'text-white/70 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <Link href="/#contact" className='hidden rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:text-white md:block'>
            Help
          </Link>
          <CartButton count={count} />
          <Link href="/book" className='btn-primary group hidden sm:inline-flex'>
            Book a consultation <ArrowForwardIcon sx={{ fontSize: 16 }} className='transition group-hover:translate-x-0.5' />
          </Link>
          <button type='button' className='rounded-full p-2.5 text-white transition hover:bg-white/10 lg:hidden' onClick={() => setOpen(true)} aria-label='Open menu' aria-expanded={open}>
            <MenuIcon fontSize='small' />
          </button>
        </div>
      </div>

      {/* reading progress */}
      <div className='absolute inset-x-0 bottom-0 h-px' aria-hidden='true'>
        <div className='h-full origin-left bg-gradient-to-r from-brand-600 via-brand-400 to-brand-300 shadow-[0_0_10px_rgba(63,191,106,0.8)]' style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-graphite-950/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-hidden bg-graphite-950 p-6 ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl' />
          <div className='relative flex items-center justify-between'>
            <Logo />
            <button type='button' onClick={() => setOpen(false)} className='rounded-full p-2.5 text-white hover:bg-white/10' aria-label='Close menu'>
              <CloseIcon fontSize='small' />
            </button>
          </div>
          <nav className='relative mt-10 flex flex-col' aria-label='Mobile'>
            {[{ href: '/', label: 'Home' }, ...links, { href: '/#contact', label: 'Contact' }].map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-semibold text-white transition duration-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
                style={{ transitionDelay: open ? `${100 + index * 50}ms` : '0ms' }}
              >
                {link.label}
                <ArrowForwardIcon sx={{ fontSize: 18 }} className='text-brand-400' />
              </Link>
            ))}
          </nav>
          <div className='relative mt-auto flex flex-col gap-3'>
            <Link href="/book" onClick={() => setOpen(false)} className='btn-primary w-full py-3.5'>Book a consultation</Link>
            <Link href="/checkout" onClick={() => setOpen(false)} className='btn-secondary w-full py-3.5'>View cart{count > 0 ? ` (${count})` : ''}</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav
