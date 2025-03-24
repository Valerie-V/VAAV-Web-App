    import React from 'react';
    import styled from 'styled-components';
    import { Link } from 'react-router-dom';
    import { useCart } from ".//CartContext";


    function EmptyCart() {
        return (
            <EmptyCheckoutDiv>
                <div>🌪️</div>
                <h3>There's nothing here</h3>
                <p>Looks like you haven't added any products to your cart yet.</p>
                <StyledLink to="/products">
                    <Button>Go To Product Catalog</Button>
                </StyledLink>
            </EmptyCheckoutDiv>
        );
    }

    // Cart item component
    function CartItem({ item, removeFromCart, updateQuantity }) {
        const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ''));
        const totalValue = item.solar ? (priceValue + item.solarFee) * item.quantity : priceValue * item.quantity;
        
        return (
            <CartItemWrapper>
                <ItemImage src={item.img} alt={item.title} />
                <ItemDetails>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemPrice>₦{(totalValue).toLocaleString()}</ItemPrice>
                    {item.solar && (
                        <ActionButton>+SOLAR</ActionButton>
                    )}
                </ItemDetails>
                <QuantityControls>
                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QuantityButton>
                </QuantityControls>
                <ActionButton onClick={() => removeFromCart(item.id)}>
                    <span role="img" aria-label="remove">🗑️</span> Remove
                </ActionButton>
            </CartItemWrapper>
        );
    }

    export default function Checkout() {
        const { cartItems, removeFromCart, updateQuantity, calculateTotal } = useCart();
        
        const formatPrice = (price) => {
            return `₦${price.toLocaleString()}`;
        };

        if (cartItems.length === 0) {
            return (
                <CheckoutWrapper>
                    <EmptyCart />
                </CheckoutWrapper>
            );
        }

        const subtotal = calculateTotal()

        return (
            <CheckoutWrapper>
                <CartContainer>
                    <MainContent>
                        <CartSection>
                            <CartHeader>
                                <h2>Your Shopping Basket</h2>
                            </CartHeader>
                            
                            <CartItems>
                                {cartItems.map(item => (
                                    <CartItem 
                                        key={item.id}
                                        item={item}
                                        removeFromCart={removeFromCart}
                                        updateQuantity={updateQuantity}
                                    />
                                ))}
                            </CartItems>
                        </CartSection>

                        <CartSummary>
                            <h3>Cart summary</h3>
                            <SummaryRow>
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </SummaryRow>
                          <Link to="/payment"><CheckoutButton>CHECKOUT</CheckoutButton></Link> 
                        </CartSummary>
                    </MainContent>
                </CartContainer>
            </CheckoutWrapper>

        );
    }

    const CheckoutWrapper = styled.div`
        width: 100%;
        padding: 20px;
        margin-top: clamp(40px, 10vw, 100px);
        display: flex;
        justify-content: center;
    `;

    const CartContainer = styled.div`
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
    `;

    const MainContent = styled.div`
        display: flex;
        gap: 30px;
        align-items: flex-start;

        @media (max-width: 768px) {
            flex-direction: column;
        }
    `;

    const CartSection = styled.div`
        flex: 1;
        min-width: 0;
    `;

    const CartHeader = styled.div`
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;
        margin-bottom: 20px;

        h2 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
    `;

    const CartItems = styled.div`
        display: flex;
        flex-direction: column;
        gap: 15px;
    `;

    const CartItemWrapper = styled.div`
        display: flex;
        align-items: center;
        padding: 15px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: white;
        gap: 15px;
    `;

    const ItemImage = styled.img`
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
    `;

    const ItemDetails = styled.div`
        flex: 1;
        min-width: 0;
    `;

    const ItemTitle = styled.h4`
        margin: 0 0 5px 0;
        font-size: 18px;
        color: #333;
    `;

    const ItemPrice = styled.p`
        margin: 0;
        font-weight: bold;
        font-size: 16px;
        color: #333;
    `;

    const QuantityControls = styled.div`
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    const QuantityButton = styled.button`
        width: 30px;
        height: 30px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover {
            background-color: #e0e0e0;
        }
    `;

    const QuantityDisplay = styled.span`
        margin: 0 10px;
        font-weight: bold;
        min-width: 20px;
        text-align: center;
    `;

    const ActionButton = styled.button`
        min-width: 100px;
        height: 40px;
        border-radius: 8px;
        padding: 5px 15px;
        background-color: #0c6525;
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        
        &:hover {
            background-color: #0a5420;
        }
    `;

    const CartSummary = styled.div`
        width: 300px;
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
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        font-size: 16px;
        color: #333;

        span:last-child {
            font-weight: bold;
        }
    `;

    const CheckoutButton = styled.button`
        width: 100%;
        padding: 12px;
        background-color: #0c6525;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        font-size: 16px;
        
        &:hover {
            background-color: #0a5420;
        }
    `;

    const EmptyCheckoutDiv = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 75vw;
        max-width: 800px;
        height: 250px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        padding: 10px;
        background-color: #fff;
    `;

    const StyledLink = styled(Link)`
        text-decoration: none;
        margin-top: 15px;
    `;

    const Button = styled.button`
        padding: 10px 15px;
        font-size: 16px;
        background-color: #0c6525;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;