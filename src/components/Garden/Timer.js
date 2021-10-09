import React from "react";
import styled from "styled-components";
//
export default function Timer({ plantStatus, timer }) {
  return <Con>{timer}</Con>;
}
//
const Con = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 10px;
`;
