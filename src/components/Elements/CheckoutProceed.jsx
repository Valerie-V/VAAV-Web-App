import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CheckoutProceed({showPop}) {
  const[isVisible, setIsVisible] = useState(true)

  if(!showPop || !isVisible) return null

  return (
    <div class="overlay">
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#0c6525",
        backgroundColor: "white",
        width: "90%",
        maxWidth: "500px", 
        height: "auto",
        minHeight: "200px",
        padding: "20px",
        boxSizing: "border-box",
        borderRadius: "10px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "0 auto", 
      }}
    >
      <h1 style={{ padding: "3px", borderBottom: "1px solid #0c6525" }}>Product has been added to cart!</h1>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Link to="/checkout">
          <button style={{ margin: "3vw", color: "white", backgroundColor: "#0c6525", borderRadius: "10px", border:"1px solid white", width: "9vw", height: "4vw"}}>Proceed to Checkout</button>
        </Link>
          <button style={{ margin: "3vw", color: "white", backgroundColor: "#0c6525", borderRadius: "10px", border:"1px solid white", width: "9vw", height: "4vw"  }} onClick={() => setIsVisible(false)}>Continue shopping</button>
      </div>
    </div>
    </div>
  )
}

export default CheckoutProceed




