import React, { memo } from "react";
//
const image = "./assets/images/tools/shovel.png";
//
export default memo(function Shovel({ isGetShovel, setIsGetShovel }) {
  const handleGetShovel = () => {
    setIsGetShovel(!isGetShovel);
    isGetShovel
      ? (document.body.style.cursor = `auto`)
      : (document.body.style.cursor = `url(${image}) 40 40, pointer`);
  };
  //
  return (
    <div
      className="gd-bank"
      style={{ top: 105 }}
      onClick={() => handleGetShovel()}
    >
      <div
        className={isGetShovel ? "" : "gd-bank-image"}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
});
