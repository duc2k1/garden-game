import React, { memo } from "react";

export default memo(function sendBankItem({
  coinBankVal,
  plant,
  choosePlant,
  setChoosePlant,
}) {
  const handleSendBank = () => {
    if (coinBankVal < plant.purchasePrice) {
      setChoosePlant;
    }
    else{
      setChoosePlant(null);
    }
  };

  return (
    <div
      className={`gd-sendBank-item${
        plant?.key !== choosePlant?.key ? " active" : ""
      }`}
      onClick={() =>handleSendBank()}
    >
      <img src={plant.image1b} />
      <img
        src={coinBankVal >= plant.purchasePrice ? plant.image2b : plant.image1b}
      />
      <div className="gd-sendBank-item-price">{plant.purchasePrice}</div>
    </div>
  );
});
