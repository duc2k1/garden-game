import React, { Fragment, memo, useEffect, useState } from "react";
import Coin from "./Coin";
import PlantImage from "./PlantImage";
import Timer from "./Timer";
//
const urlSounds = "./assets/sounds/";
const soundRemovePlant = new Audio(urlSounds + "plant.ogg");
const soundPlantGrow = new Audio(urlSounds + "plant-grow.ogg");
const soundCoin = new Audio(urlSounds + "coin.ogg");
const soundDiamond = new Audio(urlSounds + "diamond.wav");
const soundTreeFood = new Audio(urlSounds + "tree-food.ogg");
const soundWateringCan = new Audio(urlSounds + "watering-can.ogg");
const soundBugSpray = new Audio(urlSounds + "bug-spray.ogg");
const soundPhonograph = new Audio(urlSounds + "phonograph.ogg");
const soundPause = new Audio(urlSounds + "pause.ogg");
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
  const [numberOfTool, setNumberOfTool] = useState(0);
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
        setNumberOfTool(0);
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
          coinBankVal + plant?.salePrice * 2
            ? coinBankVal + plant?.salePrice * 2
            : 0
        );
        setPlantStatus(1);
        setNumberOfHarvest(numberOfHarvest + 1);
        setTimer(plant?.timer);
        return;
      }
    }
    if (numberOfTool != 1) {
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
        // case "bug-spray":
        //   if (coinBankVal >= 3000 && numberOfTool != 1) {
        //     setNumberOfTool(numberOfTool + 1);
        //     setNumberOfHarvest(numberOfHarvest - 1);
        //   }
        //   soundBugSpray.load();
        //   soundBugSpray.play();
        //   break;
        // case "phonograph":
        //   if (coinBankVal >= 5000 && numberOfTool != 1) {
        //     setNumberOfTool(numberOfTool + 1);
        //     if (plantStatus === 2) {
        //       if (sale >= 100) {
        //         soundDiamond.load();
        //         soundDiamond.play();
        //       } else {
        //         soundCoin.load();
        //         soundCoin.play();
        //       }
        //       setCoinBankVal(coinBankVal + plant?.salePrice * 2);
        //       setPlantStatus(1);
        //       setNumberOfHarvest(numberOfHarvest + 1);
        //       setTimer(plant?.timer);
        //     }
        //   }
        //   soundPhonograph.load();
        //   soundPhonograph.play();
        // break;
        default:
          break;
      }
      //Update Tools
      if (numberOfTool != 1) {
        if (tool === "bug-spray" && coinBankVal >= 3000) {
          setNumberOfTool(numberOfTool + 1);
          setNumberOfHarvest(numberOfHarvest - 1);
          soundBugSpray.load();
          soundBugSpray.play();
        }
        if (tool === "phonograph" && coinBankVal >= 5000) {
          setNumberOfTool(numberOfTool + 1);
          if (plantStatus === 2) {
            if (sale >= 100) {
              soundDiamond.load();
              soundDiamond.play();
            } else {
              soundCoin.load();
              soundCoin.play();
            }
            setCoinBankVal(coinBankVal + plant?.salePrice * 2);
            setPlantStatus(1);
            setNumberOfHarvest(numberOfHarvest + 1);
            setTimer(plant?.timer);
          }
          soundPhonograph.load();
          soundPhonograph.play();
        }
      } else playSoundPause();
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
