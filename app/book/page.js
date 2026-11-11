import React, { Suspense } from 'react'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookingForm from './bookingForm'
import Footer from '../footer'
import { business, phoneLink } from '@/lib/business';

export const metadata = {
  title: 'Book a Consultation or Installation | VAAV Innovations',
  description:
    'Book a free consultation, PowerCube installation, or maintenance visit with the VAAV team.',
};

const nextSteps = [
  { title: 'We review your request', text: 'Our team looks at what you need and checks availability for your preferred date.' },
  { title: 'We call to confirm', text: 'We confirm the date, time and any costs with you before anything is booked in.' },
  { title: 'We meet or visit', text: 'Your consultation, installation or service goes ahead as agreed.' },
];

export default function BookPage() {
  return (
    <>
      <main className='relative isolate'>
        <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(30,158,76,0.28),transparent_70%)]' />
        <div className='grid-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]' />
        <div className='container-x grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.7fr]'>
          <aside className='lg:sticky lg:top-28 lg:self-start'>
            <span className='eyebrow'>Bookings</span>
            <h1 className='h-display mt-6 text-5xl lg:text-6xl'>Book a consultation <span className='text-gradient'>or installation</span></h1>
            <p className='lead mt-5'>
              Tell us what you need and when suits you. Booking is free, and our team will contact you to confirm.
            </p>

            <h2 className='mt-10 text-sm font-semibold uppercase tracking-wide text-muted'>What happens next</h2>
            <ol className='mt-4 space-y-5'>
              {nextSteps.map((step, index) => (
                <li key={step.title} className='flex gap-4'>
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white'>{index + 1}</span>
                  <div>
                    <p className='font-semibold'>{step.title}</p>
                    <p className='text-sm text-muted'>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {(business.phone || business.email) && (
              <div className='mt-10 space-y-2 rounded-2xl bg-surface p-5 text-sm ring-1 ring-line/10'>
                <p className='font-semibold'>Prefer to talk now?</p>
                {business.phone && <a href={phoneLink()} className='flex items-center gap-2 text-muted hover:text-pop'><PhoneOutlinedIcon fontSize='small' /> {business.phone}</a>}
                {business.email && <a href={`mailto:${business.email}`} className='flex items-center gap-2 text-muted hover:text-pop'><MailOutlineIcon fontSize='small' /> {business.email}</a>}
              </div>
            )}
          </aside>

          <Suspense fallback={<div className='card p-10 text-center text-muted'>Loading booking form…</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
