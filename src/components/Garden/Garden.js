import React, { memo } from "react";
import GardenItem from "./GardenItem";
import styled from "styled-components";
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
  costBugSpray,
  costMusicPlayer,
}) {
  //
  return (
    <Con>
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
          costBugSpray={costBugSpray}
          costMusicPlayer={costMusicPlayer}
        />
      ))}
    </Con>
  );
});
//
const Con = styled.div`
  position: absolute;
  left: 21.2%;
  top: 14%;
  width: 606px;
  height: 405px;
  display: grid;
  grid-template-columns: repeat(9, auto);
`;
