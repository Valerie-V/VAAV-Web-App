'use client'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useStateValue } from '@/context/StateProvider'
import { summarizeAudit } from '@/lib/audit';
import Modal from '@/components/modal';
import Footer from '../footer';
import Auditing from './audit';
import Recommend from './recommend';
import GetStarted from './getStarted';

const steps = ['Your appliances', 'Your recommendation'];

function Audit() {
  const [{ audit, products }] = useStateValue()
  const { items, dailyEnergy, peakPower } = summarizeAudit(audit);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const showResults = () => {
    setActiveStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className='relative isolate overflow-hidden'>
        <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(30,158,76,0.28),transparent_70%)]' />
        <div className='grid-bg pointer-events-none absolute inset-0 -z-10' />
        <div className='container-x py-16 md:py-20'>
          <span className='eyebrow'>Free energy audit</span>
          <h1 className='h-display mt-6 max-w-4xl text-5xl animate-fade-up lg:text-7xl'>Find the right PowerCube <span className='text-gradient'>for your needs</span></h1>
          <p className='lead mt-5 max-w-2xl'>
            Add the appliances you want to power and how long you use them each day. We&apos;ll recommend the best-value setup, with or without solar.
          </p>

          {/* step indicator */}
          <ol className='mt-10 flex items-center gap-3 text-sm font-medium'>
            {steps.map((label, index) => (
              <li key={label} className='flex items-center gap-3'>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${index <= activeStep ? 'bg-brand-500 text-white' : 'bg-surface text-muted ring-1 ring-line/15'}`}>
                  {index + 1}
                </span>
                <span className={index === activeStep ? 'text-ink' : 'text-muted'}>{label}</span>
                {index < steps.length - 1 && <span className='mx-1 h-px w-8 bg-line/15 md:w-16' aria-hidden='true' />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className='container-x pb-20 md:pb-28'>
        {activeStep === 0 ? (
          <>
            <Auditing />
            <div className='mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
              <p className='text-sm text-muted'>
                {items.length
                  ? `${items.length} appliance${items.length === 1 ? '' : 's'} added.`
                  : 'Add at least one appliance to continue.'}
              </p>
              <button type='button' disabled={!items.length} onClick={() => setOpen(true)} className='btn-primary px-7 py-3.5 text-base'>
                See my recommendation <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          </>
        ) : (
          <>
            <button type='button' onClick={() => setActiveStep(0)} className='btn-ghost -ml-4 mb-6'>
              <ArrowBackIcon sx={{ fontSize: 18 }} /> Edit appliances
            </button>
            <Recommend myProduct={products} total={dailyEnergy} myPower={peakPower} />
          </>
        )}
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title='Want our team to follow up on your results?' maxWidth='sm'>
        <GetStarted close={() => setOpen(false)} next={showResults} />
      </Modal>

      <Footer />
    </>
  )
}

export default Audit
