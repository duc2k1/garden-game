import React, { memo } from "react";
import GardenItem from "./GardenItem";
//
export default memo(function Garden({
  plants,
  choosePlant,
  setPlant,
  deletePlant,
  tool,
  coinBankVal,
  setCoinBankVal,
  costTreeFood,
  costWateringCan,
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
          tool={tool}
          coinBankVal={coinBankVal}
          setCoinBankVal={setCoinBankVal}
          costTreeFood={costTreeFood}
          costWateringCan={costWateringCan}
        />
      ))}
    </div>
  );
});
