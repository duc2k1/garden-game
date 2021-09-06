import React, { useState, useEffect, memo } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden/Garden";
import SendBack from "./components/SendBank/SendBank";
import Tools from "./components/Tools";
import plants from "./constants/plants";
import { objectToArray, isEmptyObject } from "./helpers/commonFunctions";
//
const plantsList = objectToArray(plants);
const soundPlant = new Audio("./assets/sounds/plant.ogg");
//
export default memo(function App() {
  const [coinBankVal, setCoinBankVal] = useState(1000); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);
  const [tool, setTool] = useState(null);
  const [costTreeFood, setCostTreeFood] = useState(50);
  const [costWateringCan, setCostWateringCan] = useState(10);
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
    setCostTreeFood(costTreeFood);
    setCostWateringCan(costWateringCan);
    setCoinBankVal(coinPrice);
    // set plants
    const newPlants = [...plants];
    newPlants[index] = choosePlant;
    setPlants(newPlants);
    setChoosePlant(null);
    // play sound plant
    soundPlant.load();
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
    <div className="gd-container">
      <div className="gd-container-game">
        <SendBack
          coinBankVal={coinBankVal}
          plants={plantsList}
          choosePlant={choosePlant}
          setChoosePlant={(plant) => {
            setChoosePlant(plant === choosePlant ? null : plant);
          }}
          tool={tool}
        />
        <Garden
          plants={plants}
          choosePlant={choosePlant}
          setPlant={handleSetPlant}
          deletePlant={handleDeletePlant}
          tool={tool}
          coinBankVal={coinBankVal}
          setCoinBankVal={setCoinBankVal}
          costTreeFood={costTreeFood}
          costWateringCan={costWateringCan}
        />
        <CoinBank coinBankVal={coinBankVal} />
        <Tools
          tool={tool}
          setTool={setTool}
          costTreeFood={costTreeFood}
          costWateringCan={costWateringCan}
        />
      </div>
    </div>
  );
});
