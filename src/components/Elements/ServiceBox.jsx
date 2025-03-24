import React from "react";
import styled from "styled-components";
// Assets
import  Aff from "../../assets/img/services/affordableicon.png";
import  Clean from "../../assets/img/services/cleanicon.png";
import  Monitor from "../../assets/img/services/monitoricon.png";
import  Eff from "../../assets/img/services/efficienticon.png";


export default function ServiceBox({icon, title, subtitle}) {
  let getIcon;

  switch (icon) {
    case "affordable":
      getIcon = Aff;
      break;
    case "clean":
      getIcon = Clean;
      break;
    case "monitor":
      getIcon = Monitor;
      break;
    case "efficient":
      getIcon = Eff;
      break;
    default:
      getIcon = Aff;
      break;
  }


  return (
    <Wrapper className="flex flexColumn">
      <IconStyle src={getIcon} alt="Services" />
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font14">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display:flex;
  justify-content: space-evenly;
  align-items: center;
`;
const IconStyle = styled.img`
  width: 150px;
  height: 150px;

  @media (max-width: 1024px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;