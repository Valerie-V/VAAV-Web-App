import React from "react";
import styled from "styled-components";
// Components
import ServiceBox from "../Elements/ServiceBox";
import FullButton from "../Buttons/FullButton";
// Assets
import AddImage1 from "../../assets/img/add/tent.jpg";
import AddImage2 from "../../assets/img/add/light.jpg";



export default function Services() {
  return (
    <Wrapper id="services">
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Our Services</h1>
            <p className="font20">
               Discover what sets our product apart.
            </p>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon="affordable"
                title="Affordable"
                subtitle="The powerCube provides equitable access to energy at affordable price."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="clean"
                title="Clean"
                subtitle="The powerCube offers clean energy source that eliminates carbon footprints associated with fossil fuels."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="monitor"
                title="Monitoring"
                subtitle="Our new energy management module offers users unique way to monitor and track their daily power consumption."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox icon="efficient" title="Reliable  " subtitle="The powerCube is durable, reliable, and has long lifespan on a single charge." />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>



        <div className="lightBg">
          <div className="container">
            <Advertising className="flexSpaceCenter">
              <AddLeft>
                <h4 className="font15 semiBold">EQUITABLE ENERGY ACCESS</h4>
                <h2 className="font40 extraBold my-2">Where ever you are, you are never out of reach</h2>
                <p className="font14 ">
                With our various powerCubes, we are eliminating the existing barriers in Africa. Your journey to affordable, clean and constant energy just got simple. Get more for less today!
                </p>
                <ButtonsRow className="flexNullCenter">
                    <FullButton title="Get Started" />
                </ButtonsRow>
              </AddLeft>
              <AddRight>

                
                <AddRightInner>
                  <div className="flexNullCenter">
                    <AddImgWrapp1 className="flexCenter">
                      <img src={AddImage1} alt="office" />
                    </AddImgWrapp1>
                    <AddImgWrapp2>
                      <img src={AddImage2} alt="office" />
                    </AddImgWrapp2>
                  </div>
                </AddRightInner>
              </AddRight>
            </Advertising>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  margin: 80px 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
   max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
`;
const AddLeft = styled.div`
  width: 50%;
  p {
    max-width: 475px;
    margin-bottom:20px !important;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  position: absolute;
  top: -10px;
  right: 0;
  @media (max-width: 860px) {
    width: 80%;
    position: relative;
    order: 1;
    top: -6px;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;
const AddImgWrapp1 = styled.div`
  width: 48%;
  margin: 0 6% 10px 6%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp2 = styled.div`
  width: 30%;
  margin: 0 5% 10px 5%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;

