import React, { memo } from "react";
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
    <div
      className={`gd-sendBank-item${
        plant?.key !== choosePlant?.key ? " active" : ""
      }`}
      onClick={() => handleSendBank()}
    >
      <img src={plant.image1b} />
      <img src={noMoney ? plant.image1b : plant.image2b} />
      <div className="gd-sendBank-item-price">{plant.purchasePrice}</div>
    </div>
  );
});
