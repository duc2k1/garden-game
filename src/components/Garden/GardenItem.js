import React, { Fragment, memo, useEffect, useState } from "react";
import Coin from "./Coin";
import PlantImage from "./PlantImage";
import Timer from "./Timer";
//
const soundRemovePlant = new Audio("./assets/sounds/plant.ogg");
const soundPlantGrow = new Audio("./assets/sounds/plant-grow.ogg");
const soundCoin = new Audio("./assets/sounds/coin.ogg");
const soundDiamond = new Audio("./assets/sounds/diamond.wav");
const soundTreeFood = new Audio("./assets/sounds/tree-food.ogg");
const soundWateringCan = new Audio("./assets/sounds/watering-can.ogg");
const soundBugSpray = new Audio("./assets/sounds/bug-spray.ogg");
const soundPhonograph = new Audio("./assets/sounds/phonograph.ogg");
const soundPause = new Audio("./assets/sounds/pause.ogg");
const playSoundPause = () => {
  soundPause.load();
  soundPause.play();
};
//
export default memo(function GardenItem({
  plant,
  choosePlant,
  setPlant,
  deletePlant,
  tool,
  coinBankVal,
  setCoinBankVal,
  costTreeFood,
  costWateringCan,
}) {
  const [plantOpacity, setPlantOpacity] = useState(null);
  const [plantStatus, setPlantStatus] = useState(0); // 0: Seed, 1: Can't harvested, 2: Can harvested
  const [timer, setTimer] = useState(0);
  const [isPlanted, setIsPlanted] = useState(false);
  const [numberOfHarvest, setNumberOfHarvest] = useState(0);
  const timeTreeFood = 3;
  const timeWateringCan = 1;
  //
  useEffect(() => {
    if (isPlanted) {
      if (plantStatus === 3) {
        setPlantStatus(1);
        setNumberOfHarvest(numberOfHarvest + 1);
        setTimer(plant?.timer);
      }
      if (plantStatus === 1 && timer === -1) {
        soundPlantGrow.load();
        soundPlantGrow.play();
      }
      if (timer === -1) {
        //Plant status increase
        setPlantStatus(plantStatus + 1);
        setTimer(plant?.timer);
      }
      if (numberOfHarvest === 3) {
        handleDeletePlantAndSetDefaultState();
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
  const handleDeletePlantAndSetDefaultState = () => {
    deletePlant();
    setPlantOpacity(null);
    setPlantStatus(0);
    setTimer(null);
    setIsPlanted(false);
    setNumberOfHarvest(0);
  };
  //
  const handleInteractWithPlant = () => {
    if (tool === null) {
      //Plant a tree
      if (choosePlant && !isPlanted && coinBankVal >= choosePlant?.salePrice) {
        setPlantStatus(0);
        setIsPlanted(true);
        setTimer(choosePlant?.timer);
        setPlant();
        return;
      }
      //Harvest plant
      if (!choosePlant && plantStatus === 2) {
        if (sale >= 100) {
          soundDiamond.load();
          soundDiamond.play();
        } else {
          soundCoin.load();
          soundCoin.play();
        }
        setCoinBankVal(
          coinBankVal + plant?.salePrice ? coinBankVal + plant?.salePrice : 0
        );
        setPlantStatus(1);
        setNumberOfHarvest(numberOfHarvest + 1);
        setTimer(plant?.timer);
        return;
      }
    }
    if (isPlanted) {
      switch (tool) {
        case "shovel":
          soundRemovePlant.load();
          soundRemovePlant.play();
          handleDeletePlantAndSetDefaultState();
          break;
        case "tree-food":
          if (plantStatus != 2 && coinBankVal >= costTreeFood) {
            soundTreeFood.load();
            soundTreeFood.play();
            setCoinBankVal(
              coinBankVal - costTreeFood ? coinBankVal - costTreeFood : 0
            );
            setTimer(timer - timeTreeFood);
            if (timeTreeFood > timer) {
              setPlantStatus(plantStatus + 1);
              setTimer(plant?.timer);
            }
          }
          break;
        case "watering-can":
          if (plantStatus != 2 && coinBankVal >= costWateringCan) {
            soundWateringCan.load();
            soundWateringCan.play();
            setCoinBankVal(
              coinBankVal - costWateringCan ? coinBankVal - costWateringCan : 0
            );
            setTimer(timer - timeWateringCan);
            if (timeWateringCan > timer) {
              setPlantStatus(plantStatus + 1);
              setTimer(plant?.timer);
            }
          }
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
    } else playSoundPause();
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
          <PlantImage
            plant={plant}
            plantStatus={plantStatus}
            plantOpacity={plantOpacity}
          />
          {isPlanted && (
            <>
              <Timer plantStatus={plantStatus} timer={timer} />
              <Coin plantStatus={plantStatus} sale={sale} />
            </>
          )}
        </Fragment>
      )}
    </div>
  );
});
