import React from "react";
import listTools from "../constants/tools";
//
const urlImg = (val) => `url(./assets/images/tools/${val}.png)`;
//
export default function Tools({
  tool,
  setTool,
  costTreeFood,
  costWateringCan,
}) {
  const handleSetTool = (val) => {
    if (tool === val) {
      setTool(null);
      document.body.style.cursor = `auto`;
    } else {
      setTool(val);
      document.body.style.cursor = urlImg(val) + " 40 40, auto";
    }
  };
  //
  return (
    <div>
      {listTools.map((val, index) => (
        <div
          className="gd-bank"
          style={{ top: 80 * index + 60 }}
          onClick={() => handleSetTool(val)}
          key={val}
        >
          <div
            className="gd-bank-image"
            style={{
              backgroundImage: urlImg(val),
              display: tool === val ? "none" : "",
            }}
          ></div>
          {val === "tree-food" && (
            <div className="gd-bank-price">{costTreeFood}</div>
          )}
          {val === "watering-can" && (
            <div className="gd-bank-price">{costWateringCan}</div>
          )}
        </div>
      ))}
    </div>
  );
}
