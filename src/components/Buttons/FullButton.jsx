import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#0c6515" : "#0c6525")};
  background-color: ${(props) => (props.border ? "transparent" : "#0c6525")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#0c6525")};
    border: 1px solid #0c6525;
    color: ${(props) => (props.border ? "#0c6525" : "#fff")};
  }
`;

