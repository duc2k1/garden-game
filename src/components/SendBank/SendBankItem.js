import React, { memo } from "react";
import styled from "styled-components";
//
export default memo(function sendBankItem({
  coinBankVal,
  plant,
  choosePlant,
  setChoosePlant,
  tool,
}) {
  const noMoney = coinBankVal < plant.purchasePrice;
  const handleSendBank = () => {
    if (noMoney || tool !== null) {
      return;
    } else {
      setChoosePlant(null);
    }
  };
  //
  return (
    <Con
      className={`${plant?.key !== choosePlant?.key ? " active" : ""}`}
      onClick={() => handleSendBank()}
    >
      <img src={plant.image1b} />
      <img src={noMoney ? plant.image1b : plant.image2b} />
      <div className="gd-sendBank-item-price">{plant.purchasePrice}</div>
    </Con>
  );
});
//
const Con = styled.div`
  position: relative;
  width: 90px;
  margin-bottom: 3px;
`;
