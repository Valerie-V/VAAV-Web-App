import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Assets
import VaavLogo from "../../assets/img/logo-vaav.png";

export default function Contact() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="">
        <div className="container">
          <InnerWrapper className="flexSpaceCenter" style={{ padding: "30px 0" }}>
            <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
            <img src={VaavLogo} alt="Logo" />
              <h1 className="font15 extraBold green" style={{ marginLeft: "15px" }}>
                VaaV Innovations
              </h1>
            </Link>
            <StyleP className="green font13">
              © {getCurrentYear()} - <span className="font13">VaaV</span> All Right Reserved
            </StyleP>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;