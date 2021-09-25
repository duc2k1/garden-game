import React, { useState, useEffect, memo, lazy, Suspense } from "react";
import LoadAllImages from "./components/LoadAllImages";
const CoinBank = lazy(() => import("./components/CoinBank"));
const Garden = lazy(() => import("./components/Garden/Garden"));
const SendBank = lazy(() => import("./components/SendBank/SendBank"));
const Tools = lazy(() => import("./components/Tools"));
import plants from "./constants/plants";
import { objectToArray, isEmptyObject } from "./helpers/commonFunctions";
import backgrounds from "./constants/backgrounds";
import Progress from "./components/Progress";
//
const plantsList = objectToArray(plants);
const soundPlant = new Audio("./assets/sounds/plant.ogg");
const costTreeFood = 50;
const costWateringCan = 10;
//
export default memo(function App() {
  const [coinBankVal, setCoinBankVal] = useState(6000); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);
  const [tool, setTool] = useState(null);
  const [bg, setBg] = useState(0);
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
    <Suspense
      fallback={
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "white",
          }}
        >
          Loading...
        </h1>
      }
    >
      <LoadAllImages plantsList={plantsList} />
      <Progress />
      <div className="gd-container">
        <button onClick={() => (bg !== 2 ? setBg(bg + 1) : setBg(0))}>
          Change background
        </button>
        <div
          className="gd-container-game"
          style={{
            backgroundImage: `url(${backgrounds[bg]})`,
          }}
        >
          <SendBank
            coinBankVal={coinBankVal}
            plants={plantsList}
            choosePlant={choosePlant}
            setChoosePlant={(plant) => {
              setChoosePlant(plant !== choosePlant ? plant : null);
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
    </Suspense>
  );
});
