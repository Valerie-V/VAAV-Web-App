'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckoutProduct from './checkoutProduct'
import SubTotal from './subTotal'
import { useStateValue } from '@/context/StateProvider'
import { getBasketCount } from '@/context/reducer'
import { naira } from '@/lib/format'
import Footer from '../footer'

function OrderConfirmation({ order }) {
  const firstItem = order.items[0]?.name || '';
  return (
    <div className='card mx-auto max-w-2xl p-8 text-center md:p-12'>
      <span className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/15 text-pop'>
        <CheckCircleIcon fontSize='large' />
      </span>
      <h1 className='mt-6 text-3xl font-bold'>Payment successful, thank you!</h1>
      <p className='lead mt-3'>
        Your payment reference is <strong className='text-ink'>{order.reference}</strong>. Please keep it for your records.
        We&apos;ll contact you on {order.phone} about delivery.
      </p>
      <div className='mt-8 divide-y divide-line/10 rounded-2xl bg-surface p-2 text-left ring-1 ring-line/10'>
        {order.items.map(item => (
          <div key={item.name} className='flex justify-between px-4 py-3'>
            <span>{item.name} × {item.qty}</span>
            <span className='font-medium'>{naira(item.price * item.qty)}</span>
          </div>
        ))}
        <div className='flex justify-between px-4 py-3 font-bold'>
          <span>Total paid</span>
          <span>{naira(order.total)}</span>
        </div>
      </div>
      <p className='mt-8 font-semibold'>Want us to set it up for you?</p>
      <div className='mt-4 flex flex-wrap justify-center gap-3'>
        <Link href={`/book?service=installation&product=${encodeURIComponent(firstItem)}`} className='btn-primary'>Book installation</Link>
        <Link href='/products' className='btn-secondary'>Continue shopping</Link>
      </div>
    </div>
  );
}

function Checkout() {
  const [{basket, hydrated}] = useStateValue()
  const [order, setOrder] = useState(null)
  const count = getBasketCount(basket)

  return (
    <>
      <section className='relative isolate'>
        <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(30,158,76,0.22),transparent_70%)]' />
        <div className='container-x min-h-[60vh] py-14 md:py-20'>
        {order ? (
          <OrderConfirmation order={order} />
        ) : !hydrated ? (
          <p className='py-20 text-center text-muted'>Loading your cart…</p>
        ) : basket.length === 0 ? (
          <div className='card mx-auto max-w-xl p-10 text-center md:p-14'>
            <span className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface text-muted ring-1 ring-line/10'>
              <ShoppingCartOutlinedIcon fontSize='large' />
            </span>
            <h1 className='mt-6 text-2xl font-bold'>Your cart is empty</h1>
            <p className='lead mt-2'>Find the PowerCube that fits your home or business.</p>
            <div className='mt-8 flex flex-wrap justify-center gap-3'>
              <Link href='/products' className='btn-primary'>Browse products</Link>
              <Link href='/audit' className='btn-secondary'>Take the energy audit</Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className='h-section'>Your <span className='text-gradient'>cart</span></h1>
            <p className='mt-2 text-muted'>{count} item{count === 1 ? '' : 's'}</p>
            <div className='mt-8 grid items-start gap-6 lg:grid-cols-[1fr_380px]'>
              <div className='card divide-y divide-line/10'>
                {basket.map(item => (
                  <CheckoutProduct key={item.name} item={item} />
                ))}
              </div>
              <SubTotal onPaid={setOrder} />
            </div>
          </>
        )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Checkout
