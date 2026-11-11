'use client'
import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { whatsappLink } from '@/lib/business';

// Floating "chat with us" button. Hidden until a WhatsApp number is set in
// lib/business.js.
function WhatsAppButton() {
  const href = whatsappLink("Hello VAAV, I'd like to know more about the PowerCube.");
  if (!href) return null;

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Chat with us on WhatsApp'
      className='fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.7)] transition hover:-translate-y-0.5'
    >
      <span className='absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring' aria-hidden='true' />
      <WhatsAppIcon fontSize='large' className='relative' />
    </a>
  )
}

export default WhatsAppButton
