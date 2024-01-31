'use client'
import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import Product from './product';
import ProductInfo from './productInfo';

function MyDialog({ product }) {
  

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='dialog'>
        
        <Button variant="text" onClick={handleClickOpen} className='dialog__button hover:shadow-2xl' sx={{textTransform: 'none',margin:'0',lineHeight:'1.3'}}>
            <Product product={product}/>
        </Button>
        <Dialog open={open} fullWidth maxWidth= 'md' sx={{zIndex:1, }}>
        <DialogTitle sx={{ borderBottom: '1px solid #0c6525', padding: '5px', marginBottom:'10px',color:'#0c6525',fontWeight:'600', display:'flex',justifyContent:'space-between'}}>{product.name}
            <CancelOutlinedIcon fontSize='large' onClick={handleClose} sx={{color:'#d62828', cursor:'pointer'}}/> 
        </DialogTitle>
            <DialogContent  >
            <ProductInfo product={product}/>
            </DialogContent>
            
        </Dialog>
    </div>
  )
}

export default MyDialog
