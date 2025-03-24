import React from "react";
import styled from "styled-components";

export default function ProjectBox({ img, title, text, action, textLimit=200}) {

  const truncatedText = text.length > textLimit ? text.substring(0, textLimit) + "..." : text;


  return (
    <Wrapper onClick={action}>
      <ImgBtn className="animate pointer" onClick={action}>
        <img className="radius8" src={img} alt="project"></img>
      </ImgBtn>
      <h3 className="font20 extraBold">{title}</h3>
      <p className="alignLeft font15">{truncatedText}</p>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5vw auto;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1); 
  border-radius: 8px;
   &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
  img {
    width: 100%;
    height: 400px;
    margin: 20px 0;
  }

  h3 {
    padding-bottom: 10px;
  }
`;

const ImgBtn = styled.button`
  background-color: transparent;
  width:100%;
   display: flex;
   align-items: center;
   justify-content: center;
  border: 0px;
  outline: none;
  padding: 0px;
  margin: 0px;
  :hover > img {
    opacity: 0.8;
  }


`;