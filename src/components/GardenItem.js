import React, { Fragment, memo, useEffect, useState } from "react";
import { isEmptyObject } from "../helpers/commonFunctions";
import ProgressBar from "../Progress";
//
export default memo(function GardenItem({
  plant,
  choosePlant,
  setPlant,
  deletePlant,
  isGetShovel,
  isGetGlove,
  coinBankVal,
  setCoinBankVal,
}) {
  const [plantBlur, setPlantBlur] = useState(null);
  const [plantStatus, setPlantStatus] = useState(0); // 0: Seed, 1: Can't harvested, 2: Can harvested
  const [timer, setTimer] = useState(0);
  const [isPlanted, setIsPlanted] = useState(false);
  const [numberOfHarvest, setNumberOfHarvest] = useState(0);
  //
  useEffect(() => {
    if (numberOfHarvest > 2) {
      harvest();
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
  const harvest = () => {
    deletePlant();
    setPlantBlur(null);
    setPlantStatus(0);
    setTimer(null);
    setIsPlanted(false);
    setNumberOfHarvest(0);
    return;
  };
  //
  return (
    <div
      className="gd-garden-item"
      onClick={() => {
        if (!isGetGlove) {
          if (choosePlant && !isPlanted) {
            setPlantStatus(0);
            setIsPlanted(true);
            setTimer(choosePlant?.timer);
            setPlant();
          }
        } else {
          if (plantStatus === 2) {
            setCoinBankVal(
              coinBankVal + plant?.salePrice
                ? coinBankVal + plant?.salePrice
                : 0
            );
            setPlantStatus(1);
            setNumberOfHarvest(numberOfHarvest + 1);
          }
        }
        //deletePlant by Shovel
        if (isGetShovel) {
          deletePlant();
          setPlantBlur(null);
          setPlantStatus(0);
          setTimer(null);
          setIsPlanted(false);
          setNumberOfHarvest(0);
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
            {isPlanted ? <ProgressBar value={timer} max={plant?.timer}/>  : null}
          </div>
          <img
            src={isPlanted ? "./assets/images/inf/water-drop.png" : null}
            className="gd-water-drop-image"
          />
        </Fragment>
      )}
    </div>
  );
});
