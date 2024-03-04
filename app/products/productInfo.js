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
        qty: 1
        
      },
    })
  }

  const [activeImage, setActiveImage] = useState(0)
  const[price,setPrice] = useState(product.price1)
  const[name,setName] = useState(product.name[0])
  const [focusedButton, setFocusedButton] = useState('alone');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
        <div className="md:w-[350px] w-full mr-2">
          <img src={product.image[activeImage]} alt="" className='w-full'/>
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
            {/* <button id='batt1' onClick={handleAlone}>Alone</button> */}
            {/* <button id='batt2' onClick={handleSolar}>With solar </button> */}
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
            {/* <button className='btn2'>Rent</button> */}
            {/* <button className='btn3'>Pay Installmentally</button> */}
          </div>
        </div>
      </section>
      <Info product={product}/>
      {/* <div className="border-b border-primary text-base pb-1 mb-2">
        <p className='text-primary text-lg font-bold'>Description :</p>
        <p>{product.description}</p>
          <div className="power grid grid-cols-3 md:grid-cols-5 mt-2 place-items-center gap-y-1 md:gap-y-2">
            {
              product.power.map(power=>(

            <div className='w-fit-content flex flex-col items-center'>
              <img src={power.img} alt={power.device} className='icon w-[50px] h-[50px]'/>
              <p className='text-center leading-4'>
                  <small>{power.device}<br/>
                  &#40;{power.rating}&#41;</small><br/>
                  <strong>{power.hours}</strong>
              </p>
            </div>
              ))
            }
            
          </div>
      </div> */}
      
      <div className="text-sm mb-2">
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{color:'#0c6525',fontSize:'18px',fontWeight:'600'}}>Specification</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{fontSize:'16px', fontWeight:'600', color:'#0c6525'}}>Specs in picture</Typography>
            </AccordionSummary>
            <AccordionDetails>
              
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{fontSize:'16px', fontWeight:'600', color:'#0c6525'}}>Product Specification</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="specification__info">
                <div className='mb-5'>
                  <h3 className='text-lg font-bold'>Battery</h3>
                  <div className='grid grid-cols-1 gap-y-1 md:grid-cols-3 gap-x-5 md:gap-y-2 mt-2 text-base'>
                  <p>Capacity:<br/>
                    <span>{product.battery}</span></p>
                  <p>Cell Chemistry:<br/>
                  <span>FP (LiFePO4 battery) </span></p>
                  <p>Cycle life:<br/>
                  <span>4000 cycles to 70%+ capacity </span></p>
                  </div>
                </div>
                <div className='mb-5'>
                  <h3 className='text-lg font-bold'>Ports</h3>
                  <div className='grid grid-cols-1 gap-y-1 md:grid-cols-3 gap-x-5 md:gap-y-2 mt-2 text-base'>
                  <p>AC Output:<br/>
                  <span>230V~ 50Hz, 25A Max, AC </span></p>
                  <p>AC Input:<br/>
                  <span>120V, 60Hz, 15A Max </span></p>
                  <p>DC Input:<br/>
                  <span> 11V-17.5V, 8A Max, Double to 8A Max 17.5V-60V</span></p>
                  </div>
                </div>
                <div className='mb-5'>
                  <h3 className='text-lg font-bold'>Dimensions</h3>
                  <div className='grid grid-cols-1 gap-y-1 md:grid-cols-3 gap-x-5 md:gap-y-2 mt-2 text-base'>
                  <p>Length:<br/>
                  <span>{product.length} </span></p>
                  <p>Width:<br/>
                  <span>{product.width}</span></p>
                  <p>Height:<br/>
                  <span>{product.height} </span></p>
                  <p>Weight:<br/>
                  <span>{product.weight}</span></p>
                  </div>
                </div>
                <div className='mb-5'>
                  <h3 className='text-lg font-bold'>Charging Time(0-100%)</h3>
                  <div className='grid grid-cols-1 gap-y-1 md:grid-cols-3 gap-x-5 md:gap-y-2 mt-2 text-base'>
                  <p>AC Adapter:<br/>
                  <span>{product.AcCharging}</span></p>
                  <p>Solar Panel:<br/>
                  <span> {product.solarCharging}</span></p>
                  </div>
                </div>
                <div className='mb-5'>
                  <h3 className='text-lg font-bold'>General</h3>
                  <div className='grid grid-cols-1 gap-y-1 md:grid-cols-3 gap-x-5 md:gap-y-2 mt-2 text-base'>
                  <p>Warranty:<br/>
                  <span> 2 Years</span></p>
                  </div>
                </div>
                <div className='mb-5'>
                  <h3 className='text-lg font-bold'>Solar Panel Combination</h3>
                  <div className='grid grid-cols-1 gap-y-1 md:grid-cols-3 gap-x-5 md:gap-y-2 mt-2 text-base'>
                  <p>180 W Panel:<br/>
                  <span>{product.solarPanels}panels </span></p>
                  </div>
                </div>
              </div>
              
            </AccordionDetails>
          </Accordion>
          
        </AccordionDetails>
      </Accordion> */}
      </div>
    </div>
  )
}

export default ProductInfo
