'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import { useStateValue } from '@/context/StateProvider'
import { naira } from '@/lib/format';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import Model3D from '@/components/model3d/model3d';
import Info from './info';

function ProductInfo({ product }) {
  const [, dispatch] = useStateValue()
  // '3d' shows the interactive model; a number shows that photo
  const [activeImage, setActiveImage] = useState(product.model3d ? '3d' : 0)
  const [withSolar, setWithSolar] = useState(false)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [showRental, setShowRental] = useState(false)

  const name = withSolar ? product.name[1] : product.name[0]
  const price = withSolar ? product.price2 : product.price1

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      payload: { name, image: product.image[0], price, qty },
    })
    setAdded(true)
  }

  const options = [
    { id: false, label: 'PowerCube only', sub: naira(product.price1), icon: BatteryChargingFullOutlinedIcon },
    { id: true, label: `With ${product.solarPanels} solar panel${product.solarPanels === '1' ? '' : 's'}`, sub: naira(product.price2), icon: WbSunnyOutlinedIcon },
  ]

  return (
    <div>
      <div className='grid gap-8 md:grid-cols-2'>
        {/* gallery */}
        <div>
          {activeImage === '3d' ? (
            <div className='stage relative aspect-square overflow-hidden rounded-3xl'>
              <Model3D model={product.model3d} product={product} className='absolute inset-0 text-[8px] sm:text-[11px] lg:text-[14px]' />
              <p className='pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5 text-xs font-medium text-graphite-500'>
                <ThreeSixtyIcon sx={{ fontSize: 16 }} /> Drag to turn
              </p>
            </div>
          ) : (
            <div className='stage flex aspect-square items-center justify-center rounded-3xl p-8'>
              <img src={product.image[activeImage]} alt={product.name[0]} className='max-h-full w-auto object-contain feather mix-blend-multiply' />
            </div>
          )}
          <div className='mt-3 flex gap-3'>
            {product.model3d && (
              <button
                type='button'
                onClick={() => setActiveImage('3d')}
                className={`stage flex h-20 w-20 flex-col items-center justify-center gap-0.5 rounded-2xl text-graphite-700 transition ${activeImage === '3d' ? 'ring-2 ring-brand-400' : 'ring-1 ring-line/10 hover:ring-line/25'}`}
                aria-label='Show 3D view'
              >
                <ThreeSixtyIcon />
                <span className='text-xs font-bold'>3D</span>
              </button>
            )}
            {product.image.map((img, index) => (
              <button
                key={index}
                type='button'
                onClick={() => setActiveImage(index)}
                className={`stage flex h-20 w-20 items-center justify-center rounded-2xl p-2 transition ${activeImage === index ? 'ring-2 ring-brand-400' : 'ring-1 ring-line/10 hover:ring-line/25'}`}
                aria-label={`Show image ${index + 1}`}
              >
                <img src={img} alt='' className='max-h-full w-auto object-contain feather mix-blend-multiply' />
              </button>
            ))}
          </div>
        </div>

        {/* purchase panel */}
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-muted'>{Number(product.inverter).toLocaleString()} W output · {Number(product.battery).toLocaleString()} Wh battery</p>
          <h3 className='mt-1 text-3xl font-bold'>{name}</h3>
          <p className='mt-3 text-3xl font-bold text-pop'>{naira(price * qty)}</p>
          {qty > 1 && <p className='text-sm text-muted'>{naira(price)} each</p>}

          <fieldset className='mt-6'>
            <legend className='label'>Choose your setup</legend>
            <div className='grid gap-3 sm:grid-cols-2'>
              {options.map(({ id, label, sub, icon: Icon }) => (
                <button
                  key={label}
                  type='button'
                  aria-pressed={withSolar === id}
                  onClick={() => { setWithSolar(id); setAdded(false) }}
                  className={`flex items-center gap-3 rounded-2xl p-4 text-left transition ${withSolar === id ? 'bg-brand-500/10 ring-2 ring-brand-400' : 'ring-1 ring-line/15 hover:ring-line/25'}`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${withSolar === id ? 'bg-brand-500 text-white' : 'bg-surface text-muted'}`}><Icon fontSize='small' /></span>
                  <span>
                    <span className='block text-sm font-semibold'>{label}</span>
                    <span className='block text-sm text-muted'>{sub}</span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className='mt-6 flex flex-wrap items-center gap-3'>
            <div className='flex items-center rounded-full ring-1 ring-line/15'>
              <button type='button' onClick={() => { setQty(Math.max(qty - 1, 1)); setAdded(false) }} className='rounded-full p-3 transition hover:bg-surface' aria-label='Decrease quantity'><RemoveIcon fontSize='small' /></button>
              <span className='w-8 text-center font-semibold' aria-live='polite'>{qty}</span>
              <button type='button' onClick={() => { setQty(qty + 1); setAdded(false) }} className='rounded-full p-3 transition hover:bg-surface' aria-label='Increase quantity'><AddIcon fontSize='small' /></button>
            </div>
            <button type='button' onClick={addToBasket} className='btn-primary flex-1 py-3.5 text-base'>Add to cart</button>
          </div>

          {added && (
            <div className='mt-4 flex items-center justify-between gap-3 rounded-2xl bg-brand-500/10 p-4 text-sm ring-1 ring-inset ring-brand-400/25' role='status'>
              <span className='flex items-center gap-2 font-medium text-pop'><CheckCircleIcon fontSize='small' /> Added to your cart</span>
              <Link href='/checkout' className='font-semibold text-pop underline underline-offset-4'>View cart</Link>
            </div>
          )}

          <div className='mt-6 grid gap-3 border-t border-line/10 pt-6 sm:grid-cols-2'>
            <Link href={`/book?service=installation&product=${encodeURIComponent(name)}`} className='btn-secondary'>
              Book installation
            </Link>
            <button type='button' onClick={() => setShowRental(!showRental)} className='btn-secondary' aria-expanded={showRental}>
              Rent instead?
            </button>
          </div>
          {showRental && (
            <p className='mt-3 rounded-2xl bg-brand-500/10 p-4 text-sm text-ink ring-1 ring-inset ring-brand-400/25'>
              Rental is coming soon.{' '}
              <Link href={`/book?service=consultation&product=${encodeURIComponent(product.name[0])}&notes=${encodeURIComponent("I'm interested in renting this PowerCube.")}`} className='link'>
                Ask us about renting the {product.name[0]}
              </Link>
            </p>
          )}
        </div>
      </div>

      <Info product={product} />
    </div>
  )
}

export default ProductInfo
