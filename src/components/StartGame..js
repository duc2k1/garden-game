import React from "react";

export default function StartGame(props) {
  const { onClick } = props;
  return (
    <div className="gd-start" onClick={onClick}>
      <h2>Start Game</h2>
      <img src="./assets/images/plant/Seed.png" />
      <img src="./assets/images/inf/LoadBar_grass.png" />
      <img src="./assets/images/inf/LoadBar_dirt.png" />
      <img src="./assets/images/plant/Plant1A.gif" />
      <img src="./assets/images/plant/Plant1B.gif" />
    </div>
  );
}
