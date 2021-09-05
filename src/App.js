import React, { useState, useEffect, memo } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden/Garden";
import SendBack from "./components/SendBank/SendBank";
import Tools from "./components/Tools/Tools";
import plants from "./constants/plants";
import { objectToArray, isEmptyObject } from "./helpers/commonFunctions";
//
const plantsList = objectToArray(plants);
const soundtrack = new Audio("./assets/sounds/soundtrack.mp3");
//
export default memo(function App() {
  const [coinBankVal, setCoinBankVal] = useState(5000); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);
  const [isGetGlove, setIsGetGlove] = useState(false);
  const [isGetShovel, setIsGetShovel] = useState(false);
  const [isGetTreeFood, setIsGetTreeFood] = useState(false);
  const [isGetWateringCan, setIsGetWateringCan] = useState(false);
  //
  useEffect(() => {
    // block dragging of images
    window.ondragstart = () => false;
  }, []);
  //
  const handleSetPlant = (index) => {
    // check plant exists and selected
    if (!choosePlant) {
      return;
    }
    if (!isEmptyObject(plants[index])) {
      return;
    }
    // price action
    const coinPrice = coinBankVal - choosePlant.purchasePrice;
    if (coinPrice < 0) {
      return;
    }
    setCoinBankVal(coinPrice);
    // set plants
    const newPlants = [...plants];
    newPlants[index] = choosePlant;
    setPlants(newPlants);
    setChoosePlant(null);
    // play sound plant
    const soundPlant = new Audio("./assets/sounds/plant.ogg");
    soundPlant.play();
  };
  const handleDeletePlant = (index) => {
    // delete plants
    const newPlants = [...plants];
    newPlants[index] = {};
    setPlants(newPlants);
  };
  //
  return (
    <div
      className="gd-container"
      onClick={() => {
        soundtrack.play();
        soundtrack.loop = true;
      }}
    >
      <div className="gd-container-game">
        <SendBack
          coinBankVal={coinBankVal}
          plants={plantsList}
          choosePlant={choosePlant}
          setChoosePlant={(plant) => {
            setChoosePlant(plant === choosePlant ? null : plant);
          }}
          isGetGlove={isGetGlove}
          isGetShovel={isGetShovel}
          isGetTreeFood={isGetTreeFood}
          isGetWateringCan={isGetWateringCan}
        />
        <Garden
          plants={plants}
          choosePlant={choosePlant}
          setPlant={handleSetPlant}
          deletePlant={handleDeletePlant}
          isGetGlove={isGetGlove}
          isGetShovel={isGetShovel}
          isGetTreeFood={isGetTreeFood}
          isGetWateringCan={isGetWateringCan}
          coinBankVal={coinBankVal}
          setCoinBankVal={setCoinBankVal}
        />
        <CoinBank coinBankVal={coinBankVal} />
        <Tools
          isGetGlove={isGetGlove}
          setIsGetGlove={setIsGetGlove}
          isGetShovel={isGetShovel}
          setIsGetShovel={setIsGetShovel}
          isGetTreeFood={isGetTreeFood}
          setIsGetTreeFood={setIsGetTreeFood}
          isGetWateringCan={isGetWateringCan}
          setIsGetWateringCan={setIsGetWateringCan}
        />
      </div>
    </div>
  );
});
