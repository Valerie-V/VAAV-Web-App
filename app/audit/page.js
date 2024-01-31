'use client'
import React from 'react'
import { useState } from 'react'
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

function Audit() {
    const [{products}, dispatch] = useStateValue()

    const [audits, setAudits] = useState([]);
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
              <Button variant="contained"  className='bg-[#0c6525]' onClick={handleNext}>
                Next
              </Button>
            ) : null}
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Audit
