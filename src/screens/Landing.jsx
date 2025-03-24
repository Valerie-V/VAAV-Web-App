import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Home from "../components/Sections/Home";
import Products from "../components/Sections/Products";
import Payment from "../components/Sections/Payment";
import Footer from "../components/Sections/Footer"
//router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from "../components/Sections/Checkout";
import { CartProvider } from "../components/Sections/CartContext";


export default function Landing() {
  return (
    <CartProvider>
    <BrowserRouter>
    <div>
      <TopNavbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
    </CartProvider>
  );
}


