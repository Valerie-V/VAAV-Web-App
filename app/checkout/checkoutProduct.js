'use client'
import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useStateValue } from '@/context/StateProvider';
import { naira } from '@/lib/format';

function CheckoutProduct({item}) {
  const [, dispatch] = useStateValue()

  const removeFromBasket = () => {
    dispatch({ type: 'REMOVE_FROM_BASKET', payload: item.name })
  }

  const setQty = (qty) => {
    dispatch({
      type: 'UPDATE_BASKET_ITEM',
      payload: { name: item.name, qty: Math.max(qty, 1) }
    });
  };

  return (
    <div className='flex gap-4 p-5 md:gap-6 md:p-6'>
      <div className='flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl stage p-2 md:h-32 md:w-32'>
        <img src={item.image} alt={item.name} className='max-h-full w-auto object-contain feather mix-blend-multiply'/>
      </div>
      <div className='flex flex-1 flex-col justify-between gap-3'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h3 className='text-lg font-bold'>{item.name}</h3>
            <p className='text-sm text-muted'>{naira(item.price)} each</p>
          </div>
          <p className='text-lg font-bold'>{naira(item.price * item.qty)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center rounded-full ring-1 ring-line/15'>
            <button type='button' onClick={() => setQty(item.qty - 1)} aria-label='Decrease quantity' className='rounded-full p-2 transition hover:bg-surface'><RemoveIcon fontSize='small'/></button>
            <span className='w-8 text-center text-sm font-semibold'>{item.qty}</span>
            <button type='button' onClick={() => setQty(item.qty + 1)} aria-label='Increase quantity' className='rounded-full p-2 transition hover:bg-surface'><AddIcon fontSize='small'/></button>
          </div>
          <button type='button' className='flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-red-500/10 hover:text-red-400' onClick={removeFromBasket}>
            <DeleteOutlineIcon fontSize='small'/> Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct
