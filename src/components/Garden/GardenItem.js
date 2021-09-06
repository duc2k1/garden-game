import React, { Fragment, memo, useEffect, useState } from "react";
import { isEmptyObject } from "../../helpers/commonFunctions";
//
const soundRemovePlant = new Audio("./assets/sounds/plant.ogg");
const soundPLantGrow = new Audio("./assets/sounds/plant-grow.ogg");
const soundCoin = new Audio("./assets/sounds/coin.ogg");
const soundTreeFood = new Audio("./assets/sounds/tree-food.ogg");
const soundWateringCan = new Audio("./assets/sounds/watering-can.ogg");
const soundBugSpray = new Audio("./assets/sounds/bug-spray.ogg");
const soundPhonograph = new Audio("./assets/sounds/phonograph.ogg");
//
export default memo(function GardenItem({
  plant,
  choosePlant,
  setPlant,
  deletePlant,
  tool,
  coinBankVal,
  setCoinBankVal,
}) {
  const [plantOpacity, setPlantOpacity] = useState(null);
  const [plantStatus, setPlantStatus] = useState(0); // 0: Seed, 1: Can't harvested, 2: Can harvested
  const [timer, setTimer] = useState(0);
  const [isPlanted, setIsPlanted] = useState(false);
  const [numberOfHarvest, setNumberOfHarvest] = useState(0);
  //
  useEffect(() => {
    if (isPlanted) {
      if (plantStatus === 3) {
        setPlantStatus(1);
        setNumberOfHarvest(numberOfHarvest + 1);
        setTimer(plant?.timer);
      }
      if (plantStatus === 1 && timer === -1) {
        soundPLantGrow.load();
        soundPLantGrow.play();
      }
      if (timer === -1) {
        //Plant status increase
        setPlantStatus(plantStatus + 1);
        setTimer(plant?.timer);
      }
      if (numberOfHarvest === 3) {
        handleSetDefault();
        return;
      }
      //Plating
      const setTime = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => {
        clearInterval(setTime);
      };
    }
  }, [timer]);
  //
  const handleSetDefault = () => {
    deletePlant();
    setPlantOpacity(null);
    setPlantStatus(0);
    setTimer(null);
    setIsPlanted(false);
    setNumberOfHarvest(0);
  };
  //
  const handleInteractWithPlant = () => {
    if (tool == null) {
      if (choosePlant) {
        setPlantStatus(0);
        setIsPlanted(true);
        setTimer(choosePlant?.timer);
        setPlant();
        return;
      }
      //Harvest plant
      if (plantStatus === 2) {
        soundCoin.load();
        soundCoin.play();
        setCoinBankVal(
          coinBankVal + plant?.salePrice ? coinBankVal + plant?.salePrice : 0
        );
        setPlantStatus(1);
        setNumberOfHarvest(numberOfHarvest + 1);
        setTimer(plant?.timer);
        return;
      }
    }
    switch (tool) {
      case "shovel":
        soundRemovePlant.load();
        soundRemovePlant.play();
        handleSetDefault();
        break;
      case "tree-food":
        soundTreeFood.load();
        soundTreeFood.play();
        break;
      case "watering-can":
        soundWateringCan.load();
        soundWateringCan.play();
        break;
      case "bug-spray":
        soundBugSpray.load();
        soundBugSpray.play();
        break;
      case "phonograph":
        soundPhonograph.load();
        soundPhonograph.play();
        break;
      default:
        break;
    }
  };
  //
  const sale = plant?.salePrice;
  //
  return (
    <div
      className="gd-garden-item"
      onClick={() => handleInteractWithPlant()}
      onMouseEnter={() => {
        setPlantOpacity(choosePlant?.image2);
      }}
      onMouseLeave={() => {
        setPlantOpacity(null);
      }}
    >
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={plant[`image${plantStatus + 1}`]} />
            {isEmptyObject(plant) && (
              <img className="gd-garden-image-opacity" src={plantOpacity} />
            )}
          </div>
          {isPlanted ? (
            <>
              <div
                className={`gd-garden-item-timer${
                  plantStatus === 2 ? " over-timer" : ""
                }`}
              ></div>
              {plantStatus == 2 ? (
                <img
                  src={`./assets/images/inf/${
                    sale >= 25 && sale < 50
                      ? "silver"
                      : sale >= 50 && sale < 100
                      ? "gold"
                      : "diamond"
                  }.png`}
                  className="gd-coin-image"
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </Fragment>
      )}
    </div>
  );
});
