import React, { memo } from "react";
import GardenItem from "./GardenItem";

export default memo(function Garden(props) {
  const { plants, choosePlant, setPlant, deletePlant } = props;
  return (
    <div className="gd-garden">
      {plants.map((plant, index) => (
        <GardenItem
          key={index}
          plant={plant}
          choosePlant={choosePlant}
          setPlant={() => setPlant(index)}
          deletePlant={() => deletePlant(index)}
        />
      ))}
    </div>
  );
});
