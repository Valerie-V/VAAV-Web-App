'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useStateValue } from '@/context/StateProvider'
import Modal from '@/components/modal'
import Product from './product'
import CustomCard from './customCard'
import ProductInfo from './productInfo'
import Compare from './compare'
import Reveal from '@/components/reveal'

function ProductsView() {
  const [{ products }] = useStateValue()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selected, setSelected] = useState(null)

  // Open a product straight away from links like /products?product=2
  useEffect(() => {
    const id = searchParams.get('product')
    if (id) setSelected(products.find(p => p.id === id) || null)
  }, [searchParams, products])

  const close = () => {
    setSelected(null)
    if (searchParams.get('product')) router.replace('/products', { scroll: false })
  }

  return (
    <>
      <section className='container-x py-14 md:py-20'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 100}>
              <Product product={item} onOpen={() => setSelected(item)} />
            </Reveal>
          ))}
          <Reveal delay={(products.length % 3) * 100}>
            <CustomCard />
          </Reveal>
        </div>
      </section>

      <Compare products={products} />

      <Modal open={Boolean(selected)} onClose={close} title={selected?.name[0] || ''} maxWidth='lg'>
        {selected && <ProductInfo key={selected.id} product={selected} />}
      </Modal>
    </>
  )
}

export default ProductsView
