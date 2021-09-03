import React, { memo } from "react";

const image = "./assets/images/tools/shovel.png";

export default memo(function Shovel(props) {
  const { isGetShovel, setIsGetShovel } = props;

  const handleGetShovel = () => {
    setIsGetShovel(!isGetShovel);
    isGetShovel
      ? (document.body.style.cursor = `auto`)
      : (document.body.style.cursor = `url(${image}) 40 40, auto`);
  };

  return (
    <div
      className="gd-bank"
      style={{ top: "105px" }}
      onClick={() => handleGetShovel()}
    >
      <div
        className={isGetShovel ? "" : "gd-bank-image"}
        style={{ backgroundImage: `url(${image})`, width: "60px" }}
      ></div>
    </div>
  );
});
