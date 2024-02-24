import React from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'
import { getBasketTotal } from '@/context/reducer'
import { useStateValue } from '@/context/StateProvider'

function SubTotal() {
  const [{basket}, dispatch] = useStateValue()

  return (
    <div className='md:w-[280px] w-full h-auto  p-2 z-[1] rounded-xl shadow-2xl'>
      <h1 className=' border-b border-primary border-opacity-[0.4] text-xl py-2'>Cart summary</h1>
      <div className=' border-b border-primary border-opacity-[0.4] flex text-lg justify-between py-2 mb-4'>
        <p>Subtotal</p>
        <p>&#x20A6;{getBasketTotal(basket).toLocaleString()}</p>
      </div>
      <Link href='/products' className='mt-2 '>
        <Button variant='contained' className='bg-primary ' sx={{background: '#0c6525',width:'100%',padding:'5px', marginRight: '5px','&:hover': {backgroundColor:'#0c6525',opacity:'0.4'}}}>Checkout</Button>
      </Link>
    </div>
  )
}

export default SubTotal
