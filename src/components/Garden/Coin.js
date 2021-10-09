import React from "react";
import styled from "styled-components";
//
export default function Coin({ plantStatus, sale }) {
  return (
    <div>
      {plantStatus == 2 && (
        <CoinImage
          src={`./assets/images/coins/${
            sale >= 25 && sale < 50
              ? "silver"
              : sale >= 50 && sale < 100
              ? "gold"
              : "diamond"
          }.gif`}
        />
      )}
    </div>
  );
}
//
const CoinImage = styled.img`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
`;
