'use client'
import React, { useState } from 'react'
import { useStateValue } from '@/context/StateProvider'
import { submitNetlifyForm } from '@/lib/netlifyForms'
import { auditSummaryText } from '@/lib/audit'

// Optional lead capture shown before the recommendation. Sends the visitor's
// details plus their audit to the "audit-lead" Netlify form so the team can
// follow up. Skipping goes straight to the results.
function GetStarted({close,next}) {
  const [{ audit, products }] = useStateValue();
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', heard_about_us: '', bot_field: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | error

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const goToResults = () => {
    close();
    next();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { bot_field, ...fields } = form;
      await submitNetlifyForm('audit-lead', {
        ...fields,
        'bot-field': bot_field,
        audit_summary: auditSummaryText(audit, products),
      });
      goToResults();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <div>
      <p className='text-muted'>
        Leave your details and our team will follow up with advice on your results. Or skip to see your recommendation now.
      </p>
      <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-4'>
        <input type='text' value={form.bot_field} onChange={update('bot_field')} className='hidden' tabIndex={-1} autoComplete='off' aria-hidden='true' />
        <div className='grid gap-4 sm:grid-cols-2'>
          <div>
            <label htmlFor="firstName" className='label'>First name</label>
            <input type="text" id='firstName' required autoComplete='given-name' value={form.first_name} onChange={update('first_name')} className='input'/>
          </div>
          <div>
            <label htmlFor="lastName" className='label'>Last name</label>
            <input type="text" id='lastName' required autoComplete='family-name' value={form.last_name} onChange={update('last_name')} className='input'/>
          </div>
        </div>
        <div>
          <label htmlFor="email" className='label'>Email</label>
          <input type="email" id='email' required autoComplete='email' value={form.email} onChange={update('email')} className='input'/>
        </div>
        <div>
          <label htmlFor="number" className='label'>Phone number</label>
          <input type="tel" id='number' placeholder='0801 234 5678' required autoComplete='tel' value={form.phone} onChange={update('phone')} className='input'/>
        </div>
        <div>
          <label htmlFor="heard" className='label'>How did you hear about us? <span className='font-normal text-muted'>(optional)</span></label>
          <textarea id="heard" rows="2" value={form.heard_about_us} onChange={update('heard_about_us')} className='input h-auto py-3'></textarea>
        </div>
        {status === 'error' && (
          <p className='rounded-xl bg-red-500/10 p-3 text-sm text-red-300'>We couldn&apos;t send your details right now. You can still skip to see your results.</p>
        )}
        <div className='mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
          <button type='button' onClick={goToResults} className='btn-secondary'>Skip to results</button>
          <button type='submit' disabled={status === 'sending'} className='btn-primary'>
            {status === 'sending' ? 'Sending…' : 'Send & see results'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default GetStarted
