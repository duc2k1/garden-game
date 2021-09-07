import React from "react";
import tools from "../constants/tools";
import backgrounds from "../constants/backgrounds";
//
export default function LoadAllImages({ plantsList }) {
  return (
    <div style={{ display: "none" }}>
      {backgrounds.map((val, index) => (
        <div key={index}>
          <img src={val} />
          <img src={val} />
          <img src={val} />
        </div>
      ))}
      {plantsList.map((val, index) => (
        <div key={index}>
          <img src={val.image1b} />
          <img src={val.image2b} />
          <img src={val.image1} />
          <img src={val.image2} />
          <img src={val.image3} />
        </div>
      ))}
      {tools.map((val, index) => (
        <div key={index}>
          <img src={"./assets/images/tools/" + val + ".png"} />
        </div>
      ))}
    </div>
  );
}
