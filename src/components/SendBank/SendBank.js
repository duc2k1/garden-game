import React, { memo } from "react";
import SendBackItem from "./SendBankItem";

export default memo(function SendBank({
  coinBankVal,
  plants,
  choosePlant,
  setChoosePlant,
  tool,
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
          tool={tool}
        />
      ))}
    </div>
  );
});
