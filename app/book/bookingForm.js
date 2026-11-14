'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import { useStateValue } from '@/context/StateProvider'
import { submitNetlifyForm } from '@/lib/netlifyForms'
import { business, phoneLink, whatsappLink } from '@/lib/business'
import { auditSummaryText, summarizeAudit } from '@/lib/audit'

const SERVICES = [
  { id: 'consultation', label: 'Consultation', text: 'Talk to an energy expert about your needs and the right PowerCube.', icon: SupportAgentOutlinedIcon },
  { id: 'installation', label: 'Installation', text: 'Have our technicians set up your PowerCube and solar panels.', icon: HandymanOutlinedIcon },
  { id: 'maintenance', label: 'Maintenance / repair', text: 'Get an existing system checked, serviced or repaired.', icon: BuildCircleOutlinedIcon },
];

const CONSULTATION_MODES = ['Phone call', 'Video call', 'On-site visit'];

const TIME_SLOTS = ['Morning (9am – 12pm)', 'Afternoon (12pm – 3pm)', 'Late afternoon (3pm – 6pm)'];

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
];

const NOT_SURE = 'Not sure yet';
const OTHER_SYSTEM = 'Another brand / existing system';
const CUSTOM_SYSTEM = 'Custom system';

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function buildWhatsAppMessage(payload) {
  const lines = [
    `Hello VAAV, I'd like to book: ${payload.service}.`,
    payload.consultation_mode && `Consultation type: ${payload.consultation_mode}`,
    payload.product && `Product: ${payload.product}`,
    `Name: ${payload.full_name}`,
    `Phone: ${payload.phone}`,
    payload.email && `Email: ${payload.email}`,
    `Location: ${[payload.address, payload.state].filter(Boolean).join(', ')}`,
    `Preferred date: ${payload.preferred_date}, ${payload.preferred_time}`,
    payload.notes && `Notes: ${payload.notes}`,
    payload.audit_summary && `\nMy energy audit:\n${payload.audit_summary}`,
  ];
  return lines.filter(Boolean).join('\n');
}

function Step({ number, title, children }) {
  return (
    <fieldset>
      <legend className='mb-5 flex items-center gap-3 text-lg font-bold'>
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-pop ring-1 ring-inset ring-brand-400/25'>{number}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function BookingForm() {
  const [{ products, audit }] = useStateValue();
  const searchParams = useSearchParams();

  const productOptions = useMemo(
    () => [NOT_SURE, ...products.flatMap(p => p.name), CUSTOM_SYSTEM, OTHER_SYSTEM],
    [products]
  );

  // Pre-fill from links like /book?service=installation&product=PowerCubeX
  const initial = useMemo(() => {
    const service = SERVICES.some(s => s.id === searchParams.get('service'))
      ? searchParams.get('service')
      : 'consultation';
    const productParam = (searchParams.get('product') || '').toLowerCase();
    const product = productOptions.find(name => name.toLowerCase() === productParam) || NOT_SURE;
    return { service, product, notes: searchParams.get('notes') || '' };
  }, [searchParams, productOptions]);

  const [form, setForm] = useState({
    service: initial.service,
    consultation_mode: CONSULTATION_MODES[0],
    product: initial.product,
    full_name: '',
    phone: '',
    email: '',
    state: '',
    address: '',
    preferred_date: '',
    preferred_time: TIME_SLOTS[0],
    notes: initial.notes,
    bot_field: '',
  });
  const [includeAudit, setIncludeAudit] = useState(true);
  const [minDate, setMinDate] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => setMinDate(tomorrow()), []);

  const auditInfo = summarizeAudit(audit);
  const auditText = auditSummaryText(audit, products);
  const hasAudit = auditInfo.items.length > 0;
  const addressRequired = form.service !== 'consultation' || form.consultation_mode === 'On-site visit';

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceLabel = SERVICES.find(s => s.id === form.service).label;
    const payload = {
      service: serviceLabel,
      consultation_mode: form.service === 'consultation' ? form.consultation_mode : '',
      product: form.product,
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      state: form.state,
      address: form.address.trim(),
      preferred_date: form.preferred_date,
      preferred_time: form.preferred_time,
      notes: form.notes.trim(),
      audit_summary: hasAudit && includeAudit ? auditText : '',
    };

    setStatus('submitting');
    setSubmitted(payload);
    try {
      await submitNetlifyForm('booking', { ...payload, 'bot-field': form.bot_field });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (status === 'success' || status === 'error') {
    const whatsapp = whatsappLink(buildWhatsAppMessage(submitted));
    const phone = phoneLink();
    const ok = status === 'success';

    return (
      <div className='card p-8 text-center md:p-12'>
        <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${ok ? 'bg-brand-500/15 text-pop' : 'bg-red-500/10 text-red-300'}`}>
          {ok ? <CheckCircleIcon fontSize='large' /> : <ErrorOutlineIcon fontSize='large' />}
        </span>
        <h2 className='mt-6 text-2xl font-bold md:text-3xl'>
          {ok ? 'Booking request received' : "We couldn't send your booking"}
        </h2>
        {ok ? (
          <p className='lead mx-auto mt-3 max-w-lg'>
            Thanks, {submitted.full_name.split(' ')[0]}. We&apos;ve got your {submitted.service.toLowerCase()} request
            for {submitted.preferred_date} ({submitted.preferred_time.toLowerCase()}). Our team will call you
            on {submitted.phone} to confirm.
          </p>
        ) : (
          <p className='lead mx-auto mt-3 max-w-lg'>
            Something went wrong saving your request online.
            {whatsapp
              ? ' Send it to us on WhatsApp instead. Your details are already filled in.'
              : ' Please try again, or contact us directly.'}
          </p>
        )}

        <div className='mt-8 flex flex-col items-center gap-3'>
          {whatsapp && (
            <a href={whatsapp} target='_blank' rel='noopener noreferrer' className='btn bg-[#25D366] px-7 py-3.5 text-base text-white hover:opacity-90'>
              <WhatsAppIcon fontSize='small' /> {ok ? 'Continue on WhatsApp' : 'Send on WhatsApp'}
            </a>
          )}
          {!ok && (
            <button type='button' onClick={() => setStatus('idle')} className='btn-ghost'>
              Back to the form
            </button>
          )}
          {!ok && !whatsapp && (business.phone || business.email) && (
            <p className='text-sm text-muted'>
              {business.phone && <>Call <a href={phone} className='link'>{business.phone}</a></>}
              {business.phone && business.email && ' or email '}
              {business.email && <a href={`mailto:${business.email}`} className='link'>{business.email}</a>}
            </p>
          )}
          {ok && (
            <Link href='/products' className='btn-ghost'>Browse PowerCubes</Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='card flex flex-col gap-10 p-6 md:p-10'>
      {/* Honeypot: hidden from people, filled in by spam bots */}
      <input type='text' name='bot-field' value={form.bot_field} onChange={update('bot_field')} className='hidden' tabIndex={-1} autoComplete='off' aria-hidden='true' />

      <Step number={1} title='What do you need?'>
        <div className='grid gap-3 md:grid-cols-3'>
          {SERVICES.map(({ icon: Icon, ...service }) => {
            const selected = form.service === service.id;
            return (
              <label key={service.id} className={`relative cursor-pointer rounded-2xl p-5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-400 ${selected ? 'bg-brand-500/10 ring-2 ring-brand-400' : 'ring-1 ring-line/15 hover:ring-line/25'}`}>
                <input type='radio' name='service' value={service.id} checked={selected} onChange={update('service')} className='sr-only' />
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${selected ? 'bg-brand-500 text-white' : 'bg-surface text-muted'}`}><Icon fontSize='small' /></span>
                <span className='mt-4 block font-bold'>{service.label}</span>
                <span className='mt-1 block text-sm text-muted'>{service.text}</span>
                {selected && <CheckCircleIcon className='absolute right-4 top-4 text-pop' fontSize='small' />}
              </label>
            );
          })}
        </div>

        <div className='mt-5 grid gap-4 md:grid-cols-2'>
          {form.service === 'consultation' && (
            <div>
              <label htmlFor='consultation_mode' className='label'>How would you like to meet?</label>
              <select id='consultation_mode' value={form.consultation_mode} onChange={update('consultation_mode')} className='input'>
                {CONSULTATION_MODES.map(mode => <option key={mode}>{mode}</option>)}
              </select>
            </div>
          )}
          <div>
            <label htmlFor='product' className='label'>
              {form.service === 'consultation' ? 'Product you are interested in' : 'Which system is it for?'}
            </label>
            <select id='product' value={form.product} onChange={update('product')} className='input'>
              {productOptions.map(name => <option key={name}>{name}</option>)}
            </select>
          </div>
        </div>
      </Step>

      <Step number={2} title='When suits you?'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div>
            <label htmlFor='preferred_date' className='label'>Preferred date</label>
            <input id='preferred_date' type='date' required min={minDate} value={form.preferred_date} onChange={update('preferred_date')} className='input' />
          </div>
          <div>
            <label htmlFor='preferred_time' className='label'>Preferred time</label>
            <select id='preferred_time' value={form.preferred_time} onChange={update('preferred_time')} className='input'>
              {TIME_SLOTS.map(slot => <option key={slot}>{slot}</option>)}
            </select>
          </div>
        </div>
        <p className='mt-2 text-sm text-muted'>This is a request. We&apos;ll confirm the exact time with you.</p>
      </Step>

      <Step number={3} title='Your details'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div>
            <label htmlFor='full_name' className='label'>Full name</label>
            <input id='full_name' type='text' required autoComplete='name' value={form.full_name} onChange={update('full_name')} className='input' placeholder='Ada Okafor' />
          </div>
          <div>
            <label htmlFor='phone' className='label'>Phone number</label>
            <input id='phone' type='tel' required autoComplete='tel' pattern='[0-9+\(\)\s\-]{7,20}' title='Enter a valid phone number' value={form.phone} onChange={update('phone')} className='input' placeholder='0801 234 5678' />
          </div>
          <div>
            <label htmlFor='email' className='label'>Email <span className='font-normal text-muted'>(optional)</span></label>
            <input id='email' type='email' autoComplete='email' value={form.email} onChange={update('email')} className='input' placeholder='ada@example.com' />
          </div>
          <div>
            <label htmlFor='state' className='label'>State</label>
            <select id='state' required value={form.state} onChange={update('state')} className='input'>
              <option value='' disabled>Select your state</option>
              {NIGERIAN_STATES.map(state => <option key={state}>{state}</option>)}
            </select>
          </div>
          <div className='md:col-span-2'>
            <label htmlFor='address' className='label'>
              Address {!addressRequired && <span className='font-normal text-muted'>(optional)</span>}
            </label>
            <input id='address' type='text' autoComplete='street-address' required={addressRequired} value={form.address} onChange={update('address')} className='input' placeholder='Street, area, city' />
          </div>
          <div className='md:col-span-2'>
            <label htmlFor='notes' className='label'>Anything else we should know? <span className='font-normal text-muted'>(optional)</span></label>
            <textarea id='notes' rows={4} value={form.notes} onChange={update('notes')} className='input h-auto py-3' placeholder='e.g. type of building, appliances you want to power, access instructions' />
          </div>
        </div>
      </Step>

      {hasAudit && (
        <label className='flex cursor-pointer items-start gap-3 rounded-2xl bg-brand-500/10 p-5 ring-1 ring-inset ring-brand-400/25'>
          <input type='checkbox' checked={includeAudit} onChange={(e) => setIncludeAudit(e.target.checked)} className='mt-1 h-4 w-4 accent-brand-400' />
          <span>
            <span className='block font-semibold'>Attach my energy audit results</span>
            <span className='block text-sm text-muted'>
              {auditInfo.items.length} appliance{auditInfo.items.length === 1 ? '' : 's'} · {auditInfo.peakPower.toLocaleString()} W total load · {auditInfo.dailyEnergy.toLocaleString()} Wh per day
            </span>
          </span>
        </label>
      )}

      <div className='flex flex-col gap-4 border-t border-line/10 pt-8 md:flex-row md:items-center md:justify-between'>
        <p className='text-sm text-muted'>No payment needed to book.</p>
        <button type='submit' disabled={status === 'submitting'} className='btn-primary px-8 py-3.5 text-base'>
          {status === 'submitting' ? 'Sending…' : 'Request booking'}
        </button>
      </div>
    </form>
  )
}

export default BookingForm
