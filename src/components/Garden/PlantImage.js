import React from "react";
import { isEmptyObject } from "../../helpers/commonFunctions";
//
export default function PlantImage({ plant, plantStatus, plantOpacity }) {
  return (
    <div className="gd-garden-image">
      <img src={plant[`image${plantStatus + 1}`]} />
      {isEmptyObject(plant) && (
        <img className="gd-garden-image-opacity" src={plantOpacity} />
      )}
    </div>
  );
}
