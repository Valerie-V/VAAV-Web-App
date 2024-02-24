'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import { useStateValue } from '@/context/StateProvider'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Typography,
  } from "@mui/material";
  import { Helmet } from "react-helmet";
  import Auditing from './audit';
  import Recommend from './recommend';
  import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GetStarted from './getStarted';


function Audit() {
    const [{audit,products}, dispatch] = useStateValue()

    const [audits, setAudits] = useState([...audit]);
    // const [myProduct, setMyProduct] = useState(products);
    const [total, setTotal] = useState(0);
    const [myPower, setMyPower] = useState(0);

   

  
    const theme = createTheme({
      palette: {
        primary: {
          main: "#0c6525", // Change this to your desired primary color
        },
      },
    });
  
    const steps = ["Step 1", "Step 2"];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };


    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return (
              <Auditing
                audits={audits}
                setAudits={setAudits}
                total={total}
                setTotal={setTotal}
                myPower={myPower}
                setMyPower={setMyPower}
              />
            );
         
          case 1:
            return (
              <Recommend
                audits={audits}
                myProduct={products}
                total={total}
                setTotal={setTotal}
                myPower={myPower}
                setMyPower={setMyPower}
              />
            );
        }
      };
    
      const [activeStep, setActiveStep] = useState(0);
    
      const handleNext = () => {
        
        setActiveStep((prevStep) => prevStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
      };
  return (
    <div className="App text-center text-base pt-20">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Audit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Other meta tags */}
      </Helmet>
      <ThemeProvider theme={theme}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {getStepContent(activeStep)}
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} >
              Back
            </Button>
            {activeStep !== steps.length - 1 ? (
              <Button variant="contained" disabled={activeStep === 1}  className='bg-[#0c6525]' onClick={activeStep === 0 ? handleClickOpen : handleNext}>
                Next
              </Button>
            ) : null}
          </div>
        </div>
      </ThemeProvider>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth= 'sm' sx={{zIndex:20, }}>
                  <DialogTitle className='text-base md:text-lg' sx={{ borderBottom: '1px solid #0c6525', padding: '5px', marginBottom:'5px',color:'#0c6525',fontWeight:'500', display:'flex',justifyContent:'center'}}>Do you want a copy of the result to be sent to your mail</DialogTitle>
                      <DialogContent  >
                       <GetStarted close={handleClose} next={handleNext}/>

                      </DialogContent>
                      
                  </Dialog>
    </div>
  )
}

export default Audit
