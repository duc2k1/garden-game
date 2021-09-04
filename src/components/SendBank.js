import React, { memo } from "react";
import SendBackItem from "./SendBankItem";

export default memo(function SendBank({
  coinBankVal,
  plants,
  choosePlant,
  setChoosePlant,
  isGetGlove,
  isGetShovel,
  isGetTreeFood,
}) {
  //
  return (
    <div className="gd-sendBank">
      {plants.map((plant) => (
        <SendBackItem
          coinBankVal={coinBankVal}
          key={plant.key}
          plant={plant}
          choosePlant={choosePlant}
          setChoosePlant={() => setChoosePlant(plant)}
          isGetGlove={isGetGlove}
          isGetShovel={isGetShovel}
          isGetTreeFood={isGetTreeFood}
        />
      ))}
    </div>
  );
});
