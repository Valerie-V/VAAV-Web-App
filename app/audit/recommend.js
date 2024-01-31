'use client'
import React from 'react'
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

function Recommend({ audits, myProduct, total, myPower }) {
    let device = myProduct.find(
        (device) => total <= device.battery && myPower <= device.inverter,
      );
      const router = useRouter();
  return (
    <div className="priority flex justify-center">
    <div className="bg-[rgba(0, 0, 0, 0.04)] h-auto w-[90%] md:w-auto flex flex-col p-8 rounded-3xl">
      {device ? (
        total ? (
          <Card sx={{ minWidth: "auto" }}>
            <CardMedia
            className='object-fill'
              component="img"
              height="194"
              image={device.image[0]}
              alt="cube"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {device.name}
              </Typography>
              <Typography variant="h6">
                <b>Specification</b>:<br />
                Inverter:{device.inverter}(W)
                <br />
                battery:{device.battery}(W/hr)
              </Typography>
              <Typography variant="h6">
                <b>Price:</b> &#x20A6;{device.price1}
              </Typography>
              <Button variant="contained"  className='bg-[#0c6525]' onClick={() => router.push('/products')}>Product Catalog</Button>
            </CardContent>
          </Card>
        ) : (
          <p>No recommendation </p>
        )
      ) : (
        <p>
          We do not have a product for your consumpution, pls contatct us to
          get a customized device.
        </p>
      )}
    </div>
  </div>
  )
}

export default Recommend
