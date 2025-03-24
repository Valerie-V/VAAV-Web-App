import React from 'react'
import styled from 'styled-components'
import FullButton from '../Buttons/FullButton'

const PopupContainer = styled.div`
  border-top: 2px solid #0c6525;
  padding-top: 10px;
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding:5px;
  gap: 10px;
  justify-content: space-evenly;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }`


function PopupFeatures() {
  return (
    <PopupContainer>
        <h2 className="green">Features:</h2>
        <FeaturesContainer>
        <FullButton title="Fast dual charging(AC/Solar)"/>
        <FullButton title="Easy to use(plug and play)"/>
        </FeaturesContainer>
        <FeaturesContainer>
        <FullButton title="Portable"/>
        <FullButton title="Automatic switching"/>
        </FeaturesContainer>
    </PopupContainer>
  )
}

export default PopupFeatures
