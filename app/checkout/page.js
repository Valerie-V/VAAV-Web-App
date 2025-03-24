'use client'
import React from 'react'
import CheckoutProduct from './checkoutProduct'
import SubTotal from './subTotal'
import { useStateValue } from '@/context/StateProvider'
import Link from 'next/link'
import { Button } from '@mui/material'



function Checkout() {
  const [{basket}, dispatch] = useStateValue()


  return (
    <section className='pt-20 md:px-20 px-2'>
      <div className='w-full'>
      {basket?.length === 0 ? (
        <section className='flex justify-center items-center'>
          <div className='w-full h-auto flex justify-center items-center flex-col pt-0 p-6 z-[1] rounded-xl shadow-2xl'>
            <img src="/illustrations/—Pngtree—shopping cart_8648831.png" className='w-[200px] h-[200px]' alt="" />
              <h2 className='text-xl font-semibold text-primary'>Your Shopping Basket is empty!!!</h2>
              <p className='text-base font-medium '>
                  You have no items in your basket. To see our prodcuts click the "Product Catalog" button.    
              </p>    
                <Link href='/products' className='mt-2'>
                  <Button variant='contained' className='bg-primary ' sx={{background: '#0c6525',padding:'5px', marginRight: '5px','&:hover': {backgroundColor:'#0c6525',opacity:'0.4'}}}>Product Catalog</Button>
                </Link>
          </div>
        </section>
        ):(
          <section className='flex md:gap-7 gap-1 md:flex-row flex-col-reverse'>

            <div className='w-full p-2 z-[1] rounded-xl shadow-2xl '>
                <h2 className='checkout__title border-b border-primary text-lg font-bold text-primary pb-1 mb-1'>Your Shopping Basket</h2>
                {basket.map(item=>(
                    <CheckoutProduct
                    item={item}
                    />
                ))}
            </div>
            <div className='right  '>
          <SubTotal/>
        </div>
          </section>
        )}
      </div>
      
    </section>
  )
}

export default Checkout
