import React from 'react'


function Product({ product }) {
    
  return (
    <div className='w-full h-auto bg-background p-2 z-[1] rounded-xl shadow-2xl border-0'>
      
    <img className='w-full' src={product.image[0]} alt="" />
      <div className="mb-3 text-left">
          <h2 className='text-primary text-lg mb-1 border-b border-primary font-bold'>{product.name[0]}</h2>
          <p className="text-primary text-base font-semibold">Description:</p>
          <p className='text-heading opacity-75 text-sm'>{product.description.length <= 115 ? product.description :`${product.description.slice(0,115)}...` }</p>
      </div> 
</div>
  )
}

export default Product
