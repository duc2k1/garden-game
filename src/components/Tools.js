import React from "react";
//
export default function Tools({ tool, setTool }) {
  const arr = ["glove", "shovel", "tree-food", "watering-can"];

  const urlImg = (val) => `url(./assets/images/tools/${val}.png)`;

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
      {arr.map((val, index) => (
        <div
          className="gd-bank"
          style={{ top: 100 * index + 50 }}
          onClick={() => handleSetTool(val)}
          key={val}
        >
          <div
            className={tool === val ? "" : "gd-bank-image"}
            style={{
              backgroundImage: urlImg(val),
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}
