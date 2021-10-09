import React, { memo } from "react";
import styled from "styled-components";
//
export default memo(function CoinBank({ coinBankVal }) {
  //
  return (
    <Con style={{ backgroundImage: "url(./assets/images/inf/coinbank.png)" }}>
      <CoinBankVal>{coinBankVal}</CoinBankVal>
    </Con>
  );
});
//
const CoinBankVal = styled.div`
  position: absolute;
  top: 60%;
  left: 65%;
  transform: translate(-50%, -50%);
  color: yellow;
`;
const Con = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50px;
  width: 128px;
  height: 31px;
  background-repeat: no-repeat;
  background-size: cover;
`;
