import React from 'react'
import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add';
import Reveal from '@/components/reveal';

const faqs = [
  {
    q: 'Which PowerCube is right for me?',
    a: (
      <>
        It depends on which appliances you want to run and for how long. Use our{' '}
        <Link href='/audit' className='link'>free energy audit</Link> to get a
        recommendation, or <Link href='/book?service=consultation' className='link'>book a consultation</Link>{' '}
        and we&apos;ll work it out with you.
      </>
    ),
  },
  {
    q: 'Can I charge it without solar panels?',
    a: 'Yes. Every PowerCube charges from grid power (NEPA) with the AC adapter, or from solar panels. Charging times depend on the model. You can compare them on the products page.',
  },
  {
    q: 'What battery does the PowerCube use?',
    a: 'PowerCubes use LiFePO4 battery cells, rated for 4,000 charge cycles while keeping over 70% of their capacity.',
  },
  {
    q: 'Is there a warranty?',
    a: 'Yes, PowerCubes come with a 2-year warranty.',
  },
  {
    q: 'Do you install the PowerCube and solar panels?',
    a: (
      <>
        Yes. <Link href='/book?service=installation' className='link'>Book an installation</Link>{' '}
        with your preferred date, and our team will contact you to confirm the details.
      </>
    ),
  },
  {
    q: 'Do I need to pay to book a consultation or installation?',
    a: 'No payment is needed to book. Our team will confirm the details and any costs with you before any work begins.',
  },
];

function Faq() {
  return (
    <section id='faq' className='section relative overflow-hidden'>
      <div className='pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-brand-600/15 blur-[120px]' />
      <div className='container-x relative grid gap-12 lg:grid-cols-[1fr_1.6fr]'>
        <Reveal className='lg:sticky lg:top-32 lg:self-start'>
          <span className='eyebrow'>FAQ</span>
          <h2 className='h-section mt-5'>Questions we <span className='text-gradient'>often get</span></h2>
          <p className='lead mt-5'>Can&apos;t find what you&apos;re looking for? Our team is happy to help.</p>
          <Link href='/#contact' className='btn-secondary mt-8'>Contact us</Link>
        </Reveal>
        <div className='flex flex-col gap-3'>
          {faqs.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <details className='glow-card group rounded-3xl bg-card px-6 py-5 ring-1 ring-line/10 transition open:ring-brand-400/40 md:px-7'>
                <summary className='flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold md:text-xl'>
                  {item.q}
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand-300 ring-1 ring-inset ring-white/10 transition duration-300 group-open:rotate-45 group-open:bg-brand-500 group-open:text-white'>
                    <AddIcon fontSize='small' />
                  </span>
                </summary>
                <p className='mt-4 pr-12 leading-relaxed text-muted'>{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
