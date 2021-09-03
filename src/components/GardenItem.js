import React, { Fragment, memo, useEffect, useState } from "react";
import { isEmptyObject } from "../helpers/commonFunctions";

export default memo(function GardenItem(props) {
  const { plant, choosePlant, setPlant, deletePlant } = props;

  const [plantBlur, setPlantBlur] = useState(null);
  const [plantStatus, setPlantStatus] = useState(0); // 0: Seed, 1: Can't harvested, 2: Can harvested

  const [timer, setTimer] = useState(plant.timer || 0);
  const [isOverTimer, setIsOverTimer] = useState(false);

  const handleStatusPlant = () => {
    if (!isOverTimer) {
      if (timer < plant?.timer / 2 && plantStatus < 1) {
        // time tree change to level 1
        setPlantStatus(1);
      }
      // the plant has grown and set over time
      if (timer < 0 && plantStatus < 2) {
        setPlantStatus(2);
        setTimer(plant.overTimer);
        setIsOverTimer(true);
      }
    } else {
      // plant status === 2 => did over time
      if (timer < 0 && plantStatus === 2) {
        deletePlant();
        setIsOverTimer(false);
      }
    }
  };

  useEffect(() => setTimer(plant.timer), [plant]);
  useEffect(() => {
    handleStatusPlant();
    // set timer count down
    if (timer > 0) {
      const timerCount = setInterval(() => {
        setTimer(timer - 0.1);
      }, 100);
      return () => {
        clearInterval(timerCount);
      };
    }
  });

  return (
    <div
      className="gd-garden-item"
      onClick={() => {
        setPlant();
        setPlantStatus(0);
        setPlantBlur(null);
      }}
      onMouseEnter={() => setPlantBlur(choosePlant?.image2)}
      onMouseLeave={() => setPlantBlur(null)}
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
              isOverTimer ? " over-timer" : ""
            }`}
          >
            {timer?.toFixed(1)}
          </div>
        </Fragment>
      )}
    </div>
  );
});
