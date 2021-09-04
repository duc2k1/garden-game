import React, { memo } from "react";

export default memo(function sendBankItem({
  coinBankVal,
  plant,
  choosePlant,
  setChoosePlant,
}) {
  //
  return (
    <div
      className={`gd-sendBank-item${
        plant?.key !== choosePlant?.key ? " active" : ""
      }`}
      onClick={setChoosePlant}
    >
      <img src={plant.image1b} />
      <img src={plant.image2b} />
      <div className="gd-sendBank-item-price">{plant.purchasePrice}</div>
    </div>
  );
});
