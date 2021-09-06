import React from "react";
//
export default function Coin({ plantStatus, sale }) {
  return (
    <div>
      {plantStatus == 2 && (
        <img
          src={`./assets/images/inf/${
            sale >= 25 && sale < 50
              ? "silver.png"
              : sale >= 50 && sale < 100
              ? "gold.png"
              : "diamond.gif"
          }`}
          className="gd-coin-image"
        />
      )}
    </div>
  );
}
