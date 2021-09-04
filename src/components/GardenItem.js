import React, { Fragment, memo, useEffect, useState } from "react";
import { isEmptyObject } from "../helpers/commonFunctions";
//
export default memo(function GardenItem(props) {
  const { plant, choosePlant, setPlant, deletePlant } = props;
  const [plantBlur, setPlantBlur] = useState(null);
  const [plantStatus, setPlantStatus] = useState(0); // 0: Seed, 1: Can't harvested, 2: Can harvested
  const [timer, setTimer] = useState(0);
  const [isPlanted, setIsPlanted] = useState(false);
  const [numberOfHarvest, setNumberOfHarvest] = useState(0);
  //
  useEffect(() => {
    if (numberOfHarvest > 2) {
      deletePlant();
      setTimer(null);
      return;
    }
    if (plantStatus > 2) {
      setPlantStatus(1);
      setNumberOfHarvest(numberOfHarvest + 1);
      setTimer(plant?.timer);
    }
    if (timer === 0) {
      //planted
      setPlantStatus(plantStatus + 1);
      setTimer(plant?.timer);
    }
    //plating
    const setTime = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => {
      clearInterval(setTime);
    };
  }, [timer]);
  //
  return (
    <div
      className="gd-garden-item"
      onClick={() => {
        if (choosePlant && !isPlanted) {
          setPlantStatus(0);
          setIsPlanted(true);
          setTimer(choosePlant?.timer);
          setPlant();
        }
      }}
      onMouseEnter={() => {
        setPlantBlur(choosePlant?.image2);
      }}
      onMouseLeave={() => {
        setPlantBlur(null);
      }}
    >
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={plant[`image${plantStatus + 1}`]} />
            {isEmptyObject(plant) && (
              <img className="gd-garden-image-blur" src={plantBlur} />
            )}
          </div>
          <div
            className={`gd-garden-item-timer${
              plantStatus === 2 ? " over-timer" : ""
            }`}
          >
            {isPlanted ? timer : null}
          </div>
        </Fragment>
      )}
    </div>
  );
});
