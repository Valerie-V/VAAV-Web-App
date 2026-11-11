'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionHeading from '@/components/sectionHeading';

const steps = [
  {
    title: 'Audit your energy use',
    text: 'Add the appliances you want to power. We work out your total load and daily energy needs.',
    href: '/audit',
    cta: 'Start audit',
  },
  {
    title: 'Book a consultation',
    text: 'Our team reviews your needs with you and confirms the right PowerCube and solar setup.',
    href: '/book?service=consultation',
    cta: 'Book now',
  },
  {
    title: 'Get your PowerCube',
    text: 'Order online and pay securely with Paystack, with or without a solar panel bundle.',
    href: '/products',
    cta: 'View products',
  },
  {
    title: 'Installation & support',
    text: 'Book a technician to set everything up, and come back to us for servicing whenever you need it.',
    href: '/book?service=installation',
    cta: 'Book installation',
  },
];

// "How it works" (white section). The green line fills in and each step
// lights up as you scroll through it.
function Roadmap() {
  const listRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const value = (start - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, value)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id='how-it-works' className='theme-light section'>
      <div className='container-x grid gap-16 lg:grid-cols-[1fr_1.3fr]'>
        <div className='lg:sticky lg:top-32 lg:self-start'>
          <SectionHeading
            align='left'
            eyebrow='How it works'
            title={<>Your journey to <span className='text-gradient'>clean, constant power</span></>}
            intro='Four simple steps from working out what you need to having it installed.'
          />
          <Link href='/audit' className='btn mt-10 bg-graphite-950 px-7 py-4 text-base text-white hover:bg-graphite-800'>
            Start with the free audit
          </Link>
        </div>

        <ol ref={listRef} className='relative'>
          <div className='absolute bottom-6 left-6 top-6 w-px bg-line/10' aria-hidden='true'>
            <div className='w-full origin-top bg-gradient-to-b from-brand-400 to-brand-700' style={{ height: '100%', transform: `scaleY(${progress})` }} />
          </div>
          {steps.map((step, index) => {
            const active = progress >= (index + 0.3) / steps.length;
            return (
              <li key={step.title} className='relative flex gap-6 pb-12 last:pb-0'>
                <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ring-8 ring-white transition duration-500 ${active ? 'bg-brand-600 text-white shadow-[0_0_30px_rgba(30,158,76,0.6)]' : 'bg-graphite-100 text-graphite-500'}`}>
                  {index + 1}
                </span>
                <div className={`card flex-1 p-7 transition duration-700 ${active ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-40'}`}>
                  <h3 className='text-2xl font-bold'>{step.title}</h3>
                  <p className='mt-2 leading-relaxed text-muted'>{step.text}</p>
                  <Link href={step.href} className='group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-pop'>
                    {step.cta} <ArrowForwardIcon sx={{ fontSize: 16 }} className='transition group-hover:translate-x-1' />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  )
}

export default Roadmap
