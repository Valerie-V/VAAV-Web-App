import React from 'react'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { business, phoneLink, whatsappLink } from '@/lib/business';
import Reveal from '@/components/reveal';

function Contact() {
  const whatsapp = whatsappLink("Hello VAAV, I'd like to know more about the PowerCube.");
  const phone = phoneLink();
  const details = [
    business.phone && { icon: PhoneOutlinedIcon, label: 'Call us', value: business.phone, href: phone },
    whatsapp && { icon: WhatsAppIcon, label: 'WhatsApp', value: 'Chat with us', href: whatsapp, external: true },
    business.email && { icon: MailOutlineIcon, label: 'Email', value: business.email, href: `mailto:${business.email}` },
    business.address && { icon: PlaceOutlinedIcon, label: 'Visit', value: business.address },
  ].filter(Boolean);

  return (
    <section id='contact' className='pb-24 md:pb-32'>
      <div className='container-x'>
        <Reveal>
          <div className='relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-16 text-white ring-1 ring-inset ring-white/10 md:px-16 md:py-24'>
            <div className='grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60' />
            <div className='pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-brand-300/40 blur-[100px] animate-aurora' />
            <div className='pointer-events-none absolute -bottom-40 -left-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-graphite-950/60 blur-[100px]' />

            <div className={`grid items-center gap-12 ${details.length ? 'lg:grid-cols-[1.4fr_1fr]' : ''}`}>
              <div>
                <span className='eyebrow bg-white/10 text-white ring-white/20'>Consultation & installation</span>
                <h2 className='mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl'>Let&apos;s plan your power, together.</h2>
                <p className='mt-6 max-w-xl text-lg leading-relaxed text-white/80'>
                  Pick a date that suits you, and our team will help you choose the right PowerCube, set it up, and keep it running.
                  Booking is free.
                </p>
                <div className='mt-10 flex flex-wrap gap-3'>
                  <Link href='/book?service=consultation' className='btn-white group px-7 py-4 text-base'>
                    Book a consultation <ArrowForwardIcon sx={{ fontSize: 18 }} className='transition group-hover:translate-x-1' />
                  </Link>
                  <Link href='/book?service=installation' className='btn bg-white/10 px-7 py-4 text-base text-white ring-1 ring-inset ring-white/30 hover:bg-white/20'>Book installation</Link>
                </div>
              </div>

              {details.length > 0 && (
                <ul className='space-y-3'>
                  {details.map(({ icon: Icon, label, value, href, external }) => {
                    const content = (
                      <>
                        <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15'><Icon fontSize='small' /></span>
                        <span>
                          <span className='block text-sm text-white/65'>{label}</span>
                          <span className='block font-semibold'>{value}</span>
                        </span>
                      </>
                    );
                    return (
                      <li key={label}>
                        {href ? (
                          <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className='flex items-center gap-4 rounded-2xl bg-graphite-950/25 p-4 ring-1 ring-inset ring-white/15 backdrop-blur transition hover:bg-graphite-950/40'>
                            {content}
                          </a>
                        ) : (
                          <div className='flex items-center gap-4 rounded-2xl bg-graphite-950/25 p-4 ring-1 ring-inset ring-white/15 backdrop-blur'>{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
