import React, { memo } from "react";
import SendBackItem from "./SendBankItem";
import styled from "styled-components";

export default memo(function SendBank({
  coinBankVal,
  plants,
  choosePlant,
  setChoosePlant,
  tool,
}) {
  //
  return (
    <Con>
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
    </Con>
  );
});
//
const Con = styled.div`
  position: absolute;
  padding: 12px;
  left: 50px;
`;
