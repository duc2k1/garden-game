import React from "react";
import { isEmptyObject } from "../../helpers/commonFunctions";
import styled from "styled-components";
//
export default function PlantImage({ plant, plantStatus, plantOpacity }) {
  return (
    <Con>
      <ImgStatusPlant src={plant[`image${plantStatus + 1}`]} />
      {isEmptyObject(plant) && <ImgPlantOpacity src={plantOpacity} />}
    </Con>
  );
}
//
const ImgPlantOpacity = styled.img`
  max-width: 100%;
  opacity: 0.4;
`;
const ImgStatusPlant = styled.img`
  max-width: 100%;
`;
const Con = styled.div`
  width: 56px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
