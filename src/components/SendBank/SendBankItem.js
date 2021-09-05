import React, { memo } from "react";
//
export default memo(function sendBankItem({
  coinBankVal,
  plant,
  choosePlant,
  setChoosePlant,
  isGetGlove,
  isGetShovel,
  isGetTreeFood,
  isGetWateringCan,
}) {
  const logicChoosePlant =
    coinBankVal < plant.purchasePrice ||
    isGetGlove ||
    isGetShovel ||
    isGetTreeFood ||
    isGetWateringCan;
  const handleSendBank = () => {
    if (logicChoosePlant) {
      return;
    } else {
      setChoosePlant(null);
    }
  };

  return (
    <div
      className={`gd-sendBank-item${
        plant?.key !== choosePlant?.key ? " active" : ""
      }`}
      onClick={() => handleSendBank()}
    >
      <img src={plant.image1b} />
      <img src={logicChoosePlant ? plant.image1b : plant.image2b} />
      <div className="gd-sendBank-item-price">{plant.purchasePrice}</div>
    </div>
  );
});
