'use client'
import React from 'react'
import { useState,useRef,useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Info from './info';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useStateValue } from '@/context/StateProvider'

function ProductInfo({ product }) {
  const [{basket}, dispatch] = useStateValue()
  const addToBasket = () => {
    //add item to basket
    dispatch({
      type:'ADD_TO_BASKET',
      payload: {
        name: name,
        image: product.image[0],
        price: price,
        qty: qty, 
      },
    })
  }
  console.log({basket})
  console.log(basket)
  
  

  const [activeImage, setActiveImage] = useState(0)
  const[price,setPrice] = useState(product.price1)
  const[name,setName] = useState(product.name[0])
  const [focusedButton, setFocusedButton] = useState('alone');
  const [qty, setQty] = useState(1)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    addToBasket()
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  
  

  const defaultButtonRef = useRef(null);
  const anotherButtonRef = useRef(null);

  useEffect(() => {
  
    defaultButtonRef.current.focus() 
    
  }, []);

  const handleFocus = (buttonId) => {
    setFocusedButton(buttonId);
  };
  
  const handleAlone = ()=>{
    handleFocus('alone')
    setPrice(product.price1)
  }
  const handleSolar = ()=>{
    handleFocus('solar')
    setPrice(product.price2)
    setName(product.name[1])
  }

  
  const handleAdd = ()=>{
    setQty(Math.max(qty+1,1))
   }
   const handleMinus = ()=>{
    setQty(Math.max(qty-1,1))
   }

   
 
  
  
  const handleImageChange = (newIndex) => {
    setActiveImage(newIndex);
  };

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const handleClick = (event, anchorElSetter) => {
    addToBasket()
    anchorElSetter(event.currentTarget);
    
  };
  

  const handleClose = (anchorElSetter) => {
    anchorElSetter(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  

  return (
     <div className='w-full'>
      <section className='flex md:flex-row flex-col  mb-2 pb-1 border-b border-primary'>
        <div className="md:w-[350px]  w-full mr-2">
          <img src={product.image[activeImage]} alt="" className='w-full h-[270px]'/>
          <div className="flex">
            {product.image.map((img,index)=>(
              <button key={index} className='p-0 bg-none rounded-none focus:opacity-40 border border-primary' onClick={()=>handleImageChange(index)}>
                <img src={img} alt="" className='w-[35px] h-[35px]:' />
              </button>
            ))}
          </div>
        </div>
        <div className="productInfo__namePrice mt-2">
          
          <p className="text-xl text-heading mb-1">
            <strong>&#x20A6; </strong>
            <strong>{price.toLocaleString()}</strong>
          </p>
          <div className="productInfo__battery">
          <Button variant="contained" className='focus:opacity-40 bg-[#0c6525]' id='batt1' ref={defaultButtonRef} onClick={handleAlone} sx={{background: '#0c6525',padding:'5px', marginRight: '5px','&:hover': {backgroundColor:'#0c6525',opacity:'0.4'}}}>Alone</Button>
          <Button variant="contained" className='focus:opacity-40 bg-[#0c6525]' id='batt2' ref={anotherButtonRef}  onClick={handleSolar} sx={{background: '#0c6525',padding:'5px','&:hover': {backgroundColor:'#0c6525',opacity:'0.4'}}}>With solar</Button>
           
          </div>
          <div className="flex mt-2">
          <Button variant="contained"   onClick={handleClickOpen} className='btn1 active:opacity-40 bg-[#0c6525]' sx={{background: '#0c6525',padding:'5px', marginRight: '5px','&:hover': {backgroundColor:'#0c6525',opacity:'0.4'}}}>Add to cart</Button>
          <Dialog open={open} onClose={handleCloseDialog}  maxWidth= 'small' sx={{zIndex:20, }}>
                  <DialogTitle className='text-base md:text-lg font-bold' sx={{ borderBottom: '1px solid #0c6525', padding: '5px', marginBottom:'10px',color:'#0c6525',fontWeight:'500', display:'flex',justifyContent:'center'}}>Product added to cart successfully</DialogTitle>
                      <DialogContent  >
                       <div className='flex  flex-row gap-2 justify-center items-center'>
                        <button variant="contained" className=' hover:opacity-40 bg-[#0c6525] px-2 py-1 text-white rounded-md' onClick={handleCloseDialog} >Continue Shopping</button>
                        <Link href='/checkout'>
                        <button variant="contained" className=' hover:opacity-40 bg-[#0c6525] px-2 py-1 text-white rounded-md' >Go to cart</button>
                        </Link>
                       </div>
                      </DialogContent>
                      
                  </Dialog>
            
              
              <Button variant="contained" className='btn2 focus:opacity-30 bg-[#FFA740]' onClick={(e) => handleClick(e, setAnchorEl3)} sx={{background: '#FFA740',padding:'5px','&:hover': {backgroundColor:'#0c6525',opacity:'0.4'}}}>Rent</Button>
              <Popover
                open={open3}
                anchorEl={anchorEl3}
                onClose={() => handleClose(setAnchorEl3)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Alert severity="info">
                <AlertTitle>Rent</AlertTitle>
                Price:
                <small>&#x20A6;</small>
                 <strong>{product.price}</strong><br/>
                 Rental coming soon...
                </Alert>
              </Popover>
            
          </div>
          <div className='flex mb-2  md:w-[60%] w-[50%] justify-center items-center mt-2 bg-black bg-opacity-[0.08] py-2 px-3 rounded-2xl'>
                  <button onClick={handleMinus} className='text-white bg-primary rounded-full flex justify-center items-center'><RemoveIcon fontSize='medium'/></button>
                  <p className='md:mx-4 mx-2 '>{qty}</p>
                  <button onClick={handleAdd} className='text-white bg-primary rounded-full flex justify-center items-center'><AddIcon fontSize='medium'/></button>
               </div>
        </div>
      </section>
      <Info product={product}/>
      
      
      
    </div>
  )
}

export default ProductInfo
