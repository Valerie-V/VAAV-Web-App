import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Info({product}) {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0c6525', // Override primary color to red
      },
      secondary: {
        main: '#ffff', // Override secondary color to green
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <div className='border-b border-primary text-base '>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='text-primary' indicatorColor="primary" >
          <Tab label="Description" {...a11yProps(0)}  className='text-primary md:text-base text-[11px] font-semibold w-[33.3%] px-0'  sx={{'@media (max-width:768px)': {
          fontSize: "11px",  // Adjust font size for smaller screens
        },}} />
          <Tab label="Specification" {...a11yProps(1)}  className='text-primary md:text-base text-[11px] font-semibold w-[33.3%] px-0' sx={{ '@media (max-width:600px)': {
          fontSize: "11px" ,// Adjust font size for smaller screens
        },}}/>
          <Tab label="Spec in Pictures" {...a11yProps(2)}  className='text-primary md:text-base text-[11px] font-semibold w-[33.3%] px-0' sx={{ '@media (max-width:600px)': {
          fontSize: "11px", // Adjust font size for smaller screens
        },}}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div className=" ">
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
        <div className="border-t border-primary text-base pb-1 mt-2">
        <p className='text-primary text-lg font-semibold mt-3'>Features :</p>
        <div className="feature__list grid grid-cols-1 md:grid-cols-2">
          <p className='bg-primary text-center text-white py-1 px-2 rounded m-1'>Fast dual charging&#40;AC/Solar&#41;</p>
          <p className='bg-primary text-center text-white py-1 px-2 rounded m-1'>Easy to use&#40;plug and play&#41;</p>
          <p className='bg-primary text-center text-white py-1 px-2 rounded m-1'>Portable</p>
          <p className='bg-primary text-center text-white py-1 px-2 rounded m-1'>Automatic switching</p>
        </div>
      </div>
      </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className="specification__info">
                <div className='mb-5'>
                  <h3 className='text-lg font-bold'>Battery</h3>
                  <div className='grid grid-cols-1 gap-y-1 md:grid-cols-3 gap-x-5 md:gap-y-2 mt-2 text-base'>
                  <p>Capacity:<br/>
                    <span>{product.battery}</span></p>
                  <p>Cell Chemistry:<br/>
                  <span>BYD (LiFePO4 battery) </span></p>
                  <p>Cycle life:<br/>
                  <span>4000 cycles to 70%+ capacity </span></p>
                  </div>
                </div>
                <div className='mb-5'>
                  <h3 className='text-lg font-bold'>Ports</h3>
                  <div className='grid grid-cols-1 gap-y-1 md:grid-cols-3 gap-x-5 md:gap-y-2 mt-2 text-base'>
                  <p>AC Output:<br/>
                  <span>230V~ 50Hz, AC </span></p>
                  <p>AC Input:<br/>
                  <span>220V, 50Hz, (1500W Max) </span></p>
                  <p>DC Input:<br/>
                  <span> 13V, 10A Max, Car Charging</span></p>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Spec in pictures
      </CustomTabPanel>
    </Box>
    </div>
    </ThemeProvider>
  )
}

export default Info
