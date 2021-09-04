import React, { memo } from "react";
import GardenItem from "./GardenItem";
//
export default memo(function Garden({
  plants,
  choosePlant,
  setPlant,
  deletePlant,
  isGetShovel,
  isGetGlove,
  isGetTreeFood,
  isGetWateringCan,
  coinBankVal,
  setCoinBankVal,
}) {
  //
  return (
    <div className="gd-garden">
      {plants.map((plant, index) => (
        <GardenItem
          key={index}
          plant={plant}
          choosePlant={choosePlant}
          setPlant={() => setPlant(index)}
          deletePlant={() => deletePlant(index)}
          isGetGlove={isGetGlove}
          isGetShovel={isGetShovel}
          isGetTreeFood={isGetTreeFood}
          isGetWateringCan={isGetWateringCan}
          coinBankVal={coinBankVal}
          setCoinBankVal={setCoinBankVal}
        />
      ))}
    </div>
  );
});
