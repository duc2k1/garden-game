import React from "react";
//
export default function Timer({ plantStatus, timer }) {
  return (
    <div
      className={`gd-garden-item-timer${
        plantStatus === 2 ? " over-timer" : ""
      }`}
    >
      {timer}
    </div>
  );
}
