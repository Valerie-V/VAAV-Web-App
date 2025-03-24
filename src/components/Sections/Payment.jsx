
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PaystackPop from '@paystack/inline-js';
import { useCart } from ".//CartContext";


const PaymentContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const PaymentHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  color: black;
  background-color:white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  outline: none;

  &:-webkit-autofill {
    background-color: white !important;
    color: black !important;
    transition: background-color 0s ease-in-out;
  }

    input:-webkit-autofill {
    background-color: white !important;
    color: black !important;
    transition: background-color 0s ease-in-out;
  }

  &:focus:-webkit-autofill {
    background-color: white !important;
    color: black !important;
  }

  &.error {
    border-color: #ff3860;
  }
`;


const ErrorText = styled.p`
  color: #ff3860;
  font-size: 14px;
  margin-top: 5px;
`;

const CheckoutButton = styled.button`
  padding: 14px;
  background-color:#0c6525;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 10px;

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CartSummary = styled.div`
width: 100%;
display:flex;
justify-content:space-evenly;
align-items:center;
flex-direction:column;
border: 1px solid #e0e0e0;
border-radius: 8px;
padding: 20px;
background-color: white;
position: sticky;
top: 20px;

h3 {
    margin: 0 0 15px 0;
    font-size: 20px;
    color: #333;
}

@media (max-width: 768px) {
    width: 100%;
    position: static;
}
`;

const SummaryRow = styled.div`
width:100%;
display: flex;
justify-content: space-evenly;
margin-bottom: 15px;
font-size: 16px;
color: #333;

span:last-child {
    font-weight: bold;
}
`;

const Payment = () => {

    const {calculateTotal} = useCart();
    const subtotal = calculateTotal();
    


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const newErrors = {
        fullName: '',
        email: '',
      };
  
  
  
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
  
  
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
  
      setErrors(newErrors);
  
      const valid = !newErrors.fullName && !newErrors.email && 
                   formData.fullName.trim() !== '' && 
                   formData.email.trim() !== '';
      setIsFormValid(valid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();



    if (isFormValid) {
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: process.env.REACT_APP_PAYMENT_KEY, 
        email: formData.email,
        amount: subtotal * 100,
        currency: 'NGN',
        onSuccess: (response) => {
          alert(`Payment complete! Reference: ${response.reference}`);
        },
        onCancel: () => {
          alert('Payment cancelled');
        }
      });
    }
  };

  return (
    <PaymentContainer>
      <PaymentHeader>
        <Title>Complete Your Payment</Title>
        <Subtitle>Enter your details below to proceed</Subtitle>
      </PaymentHeader>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.fullName && errors.fullName ? 'error' : ''}
            placeholder="Nnamdi Kanu"
          />
          {touched.fullName && errors.fullName && (
            <ErrorText>{errors.fullName}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.email && errors.email ? 'error' : ''}
            placeholder="your@email.com"
          />
          {touched.email && errors.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}
        </FormGroup>

        <CartSummary>
            <h3>Cart summary</h3>
            <SummaryRow>
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
            </SummaryRow>
            <CheckoutButton type="submit" disabled={!isFormValid}>
                CHECKOUT
            </CheckoutButton>
        </CartSummary>
      </Form>
    </PaymentContainer>
  );
};

export default Payment;
