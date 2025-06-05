import React, { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import PaystackPop from "@paystack/inline-js";
import { getBasketTotal } from "@/context/reducer";
import { useStateValue } from "@/context/StateProvider";

function SubTotal() {
  const [{ basket }, dispatch] = useStateValue();
  const subtotal = getBasketTotal(basket).toLocaleString();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  function handleCheckout() {
    if (basket.length === 0) {
      alert(
        "Your cart is empty. Please add items to your cart before checking out."
      );
      return;
    }
    console.log("Checkout")
    const paystack = new PaystackPop();
    console.log(paystack);
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYMENT_KEY,
      email: formData.email,
      amount: getBasketTotal(basket) * 100,
      currency: "NGN",
      onSuccess: (response) => {
        alert(`Payment complete! Reference: ${response.reference}`);
      },
      onCancel: () => {
        alert("Payment cancelled");
      },
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
    handleCheckout();
  };

  return (
    <div className="md:w-[280px] w-full h-auto p-2 z-[1] rounded-xl shadow-2xl">
      <h1 className="border-b border-primary border-opacity-[0.4] text-xl py-2">
        Cart summary
      </h1>
      <div className="border-b border-primary border-opacity-[0.4] flex text-lg justify-between py-2 mb-4">
        <p>Subtotal</p>
        <p>&#x20A6;{subtotal}</p>
      </div>
      <Link href="" className="mt-2">
        <Button
          variant="contained"
          className="bg-primary"
          sx={{
            background: "#0c6525",
            width: "100%",
            padding: "5px",
            marginRight: "5px",
            "&:hover": { backgroundColor: "#0c6525", opacity: "0.4" },
          }}
          onClick={() => setShowPopup(true)}
        >
          Checkout
        </Button>
      </Link>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <form onSubmit={handleFormSubmit} className="popup-form">
              <h2>Complete Your Payment</h2>
              <label>
                Full Name
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Email Address
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .popup-form {
          display: flex;
          flex-direction: column;
        }

        .popup-form label {
          margin-bottom: 10px;
        }

        .popup-form input {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .popup-form button {
          padding: 10px;
          background-color: #0c6525;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default SubTotal;
