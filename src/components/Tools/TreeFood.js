import React, { memo } from "react";
//
const image = "./assets/images/tools/tree-food.png";
//
export default memo(function TreeFood({ isGetTreeFood, setIsGetTreeFood }) {
  const handleGetTreeFood = () => {
    setIsGetTreeFood(!isGetTreeFood);
    isGetTreeFood
      ? (document.body.style.cursor = `auto`)
      : (document.body.style.cursor = `url(${image}) 40 40, pointer`);
  };
  //
  return (
    <div
      className="gd-bank"
      style={{ top: 190 }}
      onClick={() => handleGetTreeFood()}
    >
      <div
        className={isGetTreeFood ? "" : "gd-bank-image"}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
});
