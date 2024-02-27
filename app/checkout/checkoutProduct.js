'use client'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import { useStateValue } from '@/context/StateProvider';
import { useState,useEffect } from 'react';

function CheckoutProduct({item}) {
  const [{basket}, dispatch] = useStateValue()
  const removeFromBasket= () => {
    dispatch({
        type: 'REMOVE_FROM_BASKET',
        payload: item.name
        
    })
  }
  const updateBasketItem = (itemName, newQty) => {
    dispatch({
      type: 'UPDATE_BASKET_ITEM',
      payload: {
        name: itemName,
        qty: newQty
      }
    });
  };
  const [qty, setQty] = useState(1)
  
  const handleAdd = ()=>{
    setQty(Math.max(qty+1,1))
   }
   const handleMinus = ()=>{
    setQty(Math.max(qty-1,1))
   }

   useEffect(()=>{
    updateBasketItem(item.name,qty)
   },[qty])

  
    
  return (
    <section className='w-full border-b border-primary border-opacity-[0.4] pb-3 mt-2'>
        <div className=' flex justify-between '>
          <div className='left flex flex-col md:flex-row gap-2'>
            <img src={item.image} alt={item.name} className='object-contain w-[90px] h-[90px] md:w-[180px] md:h-[180px]'/>
            <div className='flex flex-col  self-end'>
              <h3 className='text-primary text-base md:text-2xl font-bold'>{item.name}</h3>
              <p className='md:text-xl text-sm font-semibold text-heading'> &#x20A6; {item.price.toLocaleString()}</p>
            </div>
          </div>
            <div className='right flex flex-col justify-between '>
                <button className='text-primary text-sm'  onClick={removeFromBasket}>
                  <DeleteIcon fontSize='small'/>
                  Remove
                </button>
                <div className='flex  justify-center items-center bg-black bg-opacity-[0.08] py-2 px-3 rounded-2xl'>
                  <button onClick={handleMinus} className='text-white bg-primary rounded-full flex justify-center items-center'><RemoveIcon fontSize='small'/></button>
                  <p className='md:mx-2 mx-1'>{qty}</p>
                  <button onClick={handleAdd} className='text-white bg-primary rounded-full flex justify-center items-center'><AddIcon fontSize='small'/></button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CheckoutProduct
