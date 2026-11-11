'use client'
import React from 'react'
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';

// Styled MUI Dialog used for product details and the audit follow-up form.
// Goes full screen on phones.
function Modal({ open, onClose, title, maxWidth = 'md', children }) {
  const fullScreen = useMediaQuery('(max-width:640px)');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      sx={{ zIndex: 50 }}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : '28px',
          fontFamily: 'inherit',
          backgroundColor: '#121614',
          backgroundImage: 'radial-gradient(600px circle at 100% 0%, rgba(30,158,76,0.14), transparent 60%)',
          color: '#F4F7F5',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 120px -20px rgba(0,0,0,0.8)',
        },
      }}
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(8, 10, 9, 0.7)', backdropFilter: 'blur(8px)' } } }}
    >
      <div className='font-sans'>
        <div className='sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#121614]/85 px-6 py-4 backdrop-blur'>
          <h2 className='text-lg font-bold text-ink'>{title}</h2>
          <button type='button' onClick={onClose} className='rounded-full p-2 text-muted transition hover:bg-white/10 hover:text-ink' aria-label='Close'>
            <CloseIcon fontSize='small' />
          </button>
        </div>
        <div className='p-6'>{children}</div>
      </div>
    </Dialog>
  )
}

export default Modal
