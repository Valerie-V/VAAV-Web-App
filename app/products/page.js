'use client'
import React from 'react'
import { useStateValue } from '@/context/StateProvider'
import MyDialog from './myDialog'


function Products() {
    const [{products}, dispatch] = useStateValue()
    
  return (
    <section className='h-auto w-full flex justify-center content-center pt-20 md:px-5 px-2 '>
      <div className='md:w-full md:grid md:grid-cols-4 grid-cols-1 gap-y-2 '>
            {
                products.map(item => (
                <MyDialog product={item}/>))
            }
      </div>
    </section>
  )
}

export default Products
