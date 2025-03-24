import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import VaavLogo from "../../assets/img/logo-vaav.png";
import BurgerIcon from "../../assets/svg/BurgerIcon";
// Cart Context
import { useCart } from "../Sections/CartContext";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const { cartItems } = useCart();
  
  // Count total items in cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate" style={y > 100 ? { height: "75px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <StyledLink to="/">
            <img style={{ width: "125px", height: "75px" }} src={VaavLogo} alt="Logo" />
          </StyledLink>
          <BurderWrapper onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper>
            <li><StyledLink to="/">Home</StyledLink></li>
            <li><StyledLink to="">Our Services</StyledLink></li>
            <li><StyledLink to="">Our Team</StyledLink></li>
            <li><StyledLink to="">Testimonial</StyledLink></li>
            <li><StyledLink to="/products">Products</StyledLink></li>
            <li><StyledLink to="">Energy Audit</StyledLink></li>
            <li>
              <CartLink to="/checkout">
                <CartIcon>🛒</CartIcon>
                {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
              </CartLink>
            </li>
          </UlWrapper>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: white;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  color: #0c6525;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const UlWrapper = styled.ul`
  display: flex;
  justify-content:space-evenly;
  align-items: center;
  list-style: none;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  padding: 10px 15px;
  font-size: 15px;
  font-weight: 600;
  color: #0c6525;
  text-decoration: none;
  &:hover {
    color: #0a4f1c;
  }
`;

const CartLink = styled(Link)`
  position: relative;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: 600;
  color: #0c6525;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    color: #0a4f1c;
  }
`;

const CartIcon = styled.span`
  font-size: 20px;
`;

const CartBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #0c6525;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
`;