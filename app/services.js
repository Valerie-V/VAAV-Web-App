import React from 'react'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SectionHeading from '@/components/sectionHeading';
import Reveal from '@/components/reveal';

const services = [
  {
    icon: ShoppingBagOutlinedIcon,
    title: 'Buy a PowerCube',
    text: 'Portable power stations from 500W to 5000W, available on their own or bundled with solar panels.',
    cta: 'Shop products',
    href: '/products',
  },
  {
    icon: InsightsOutlinedIcon,
    title: 'Free energy audit',
    text: 'List the appliances you want to power and get a recommendation sized for your home or shop, with or without solar.',
    cta: 'Start the audit',
    href: '/audit',
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: 'Consultation',
    text: 'Talk to our team by phone, video call, or an on-site visit to plan the right system for your needs.',
    cta: 'Book a consultation',
    href: '/book?service=consultation',
  },
  {
    icon: HandymanOutlinedIcon,
    title: 'Installation',
    text: 'Our technicians set up your PowerCube and solar panels safely, and show you how to get the most from them.',
    cta: 'Book installation',
    href: '/book?service=installation',
  },
  {
    icon: BuildCircleOutlinedIcon,
    title: 'Maintenance & support',
    text: 'Servicing, troubleshooting and repairs to keep your system running.',
    cta: 'Request support',
    href: '/book?service=maintenance',
  },
  {
    icon: EventAvailableOutlinedIcon,
    title: 'Rental',
    text: 'Need power for an event or a short period? PowerCube rental is coming soon.',
    cta: 'Ask about rental',
    href: '/book?service=consultation&notes=I%27m%20interested%20in%20renting%20a%20PowerCube.',
    soon: true,
  },
];

function Services() {
  return (
    <section id='services' className='relative overflow-hidden'>
      <div className='pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-brand-600/15 blur-[120px]' />
      <div className='container-x section relative'>
        <SectionHeading
          eyebrow='What we do'
          title={<>From first question <span className='text-gradient'>to installation</span></>}
          intro="Whether you know exactly what you need or you're just starting out, we'll help you get it right."
        />
        <div className='mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {services.map(({ icon: Icon, ...service }, index) => (
            <Reveal key={service.title} delay={(index % 3) * 100}>
              <Link href={service.href} className='glow-card card card-hover group flex h-full flex-col p-7 md:p-8'>
                <div className='flex items-start justify-between'>
                  <span className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/25 to-brand-500/5 text-brand-300 ring-1 ring-inset ring-brand-400/25 transition duration-500 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white'>
                    <Icon />
                  </span>
                  <span className='font-display text-sm font-semibold text-white/25'>0{index + 1}</span>
                </div>
                <h3 className='mt-8 flex items-center gap-3 text-2xl font-bold'>
                  {service.title}
                  {service.soon && <span className='chip text-pop ring-brand-400/30'>Soon</span>}
                </h3>
                <p className='mt-3 flex-1 leading-relaxed text-muted'>{service.text}</p>
                <span className='mt-8 inline-flex items-center gap-2 text-sm font-semibold text-pop'>
                  {service.cta} <ArrowForwardIcon sx={{ fontSize: 16 }} className='transition group-hover:translate-x-1' />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
