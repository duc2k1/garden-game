import React, { Fragment, memo, useEffect, useState } from "react";

export default memo(function GardenItem(props) {
  const { plant, choosePlant, setPlant, deletePlant } = props;

  const [plantTemp, setPlantTemp] = useState(null);
  const [plantStatus, setPlantStatus] = useState(0); // 0: Seed, 1: Can't harvested, 2: Can harvested

  const [timer, setTimer] = useState(plant.timer || 0);
  const [isOverTimer, setIsOverTimer] = useState(false);

  const handleStatusPlant = () => {
    // time tree change to level 1
    if (timer < plant?.timer && plantStatus < 1) {
      setPlantStatus(1);
    }
    // the plant has grown and set over time
    if (timer < 0 && plantStatus < 2) {
      setPlantStatus(2);
      setTimer(plant.overTimer);
      setIsOverTimer(true);
    }
    // plant status === 2 => did over time
    if (timer < 0 && plantStatus === 2) {
      deletePlant();
      setIsOverTimer(false);
    }
    // replant on the same plot of land -> status grown plant === 0
    if (!isOverTimer) {
      setPlantStatus(0);
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
        setPlantTemp(null);
      }}
      onMouseEnter={() => setPlantTemp(choosePlant?.image2)}
      onMouseLeave={() => setPlantTemp(null)}
    >
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={plant[`image${plantStatus + 1}`]} />
            <img className="gd-garden-image-blur" src={plantTemp} />
          </div>
          <div
            className={`gd-garden-item-timer${
              plantStatus === 2 ? " over-timer" : ""
            }`}
          >
            {timer?.toFixed(1)}
          </div>
        </Fragment>
      )}
    </div>
  );
});
