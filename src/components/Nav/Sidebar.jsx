import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
// Cart Context
import { useCart } from "../Sections/CartContext";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const { cartItems } = useCart();
  
  // Count total items in cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Wrapper sidebarOpen={sidebarOpen}>
      <SidebarHeader>
        <div className="flexNullCenter">
          <h1 style={{ marginLeft: "15px", color: "white" }}>VaaV Innovations</h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)}>
          <CloseIcon style={{ fill: "white" }} />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle>
        <li>
          <StyledLink onClick={() => toggleSidebar(!sidebarOpen)} to="/">
            Home
          </StyledLink>
        </li>
        <li>
          <StyledLink onClick={() => toggleSidebar(!sidebarOpen)} to="">
            Our Services
          </StyledLink>
        </li>
        <li>
          <StyledLink onClick={() => toggleSidebar(!sidebarOpen)} to="">
            Our Team
          </StyledLink>
        </li>
        <li>
          <StyledLink onClick={() => toggleSidebar(!sidebarOpen)} to="">
            Testimonials
          </StyledLink>
        </li>
        <li>
          <StyledLink onClick={() => toggleSidebar(!sidebarOpen)} to="/products">
            Products
          </StyledLink>
        </li>
        <li>
          <StyledLink onClick={() => toggleSidebar(!sidebarOpen)} to="">
            Energy Audit
          </StyledLink>
        </li>
        <li>
          <CartLink onClick={() => toggleSidebar(!sidebarOpen)} to="/checkout">
            <CartIcon>🛒</CartIcon>
            {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
          </CartLink>
        </li>
      </UlStyle>
      <UlStyle className="flexSpaceCenter">
        <li>
          <GetStartedButton href="/products">Get Started</GetStartedButton>
        </li>
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  background-color: #0c6525;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CloseBtn = styled.button`
  border: 0;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px 0;
  list-style: none;
  li {
    margin: 20px 0;
  }
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 10px 15px;
  &:hover {
    text-decoration: underline;
  }
`;

const CartLink = styled(Link)`
  position: relative;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
  }
`;

const CartIcon = styled.span`
  font-size: 20px;
`;

const CartBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  text-align:center;
  background-color: white;
  color: #0c6525;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
`;

const GetStartedButton = styled.a`
  background-color: white;
  color: #0c6525;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    background-color: #0a541f;
    color: white;
  }
`;