import React, { memo } from "react";
//
const image = "./assets/images/tools/watering-can.png";
//
export default memo(function WateringCan({
  isGetWateringCan,
  setIsGetWateringCan,
}) {
  const handleGetWateringCan = () => {
    setIsGetWateringCan(!isGetWateringCan);
    isGetWateringCan
      ? (document.body.style.cursor = `auto`)
      : (document.body.style.cursor = `url(${image}) 40 40, pointer`);
  };
  //
  return (
    <div
      className="gd-bank"
      style={{ top: 275 }}
      onClick={() => handleGetWateringCan()}
    >
      <div
        className={isGetWateringCan ? "" : "gd-bank-image"}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
});
