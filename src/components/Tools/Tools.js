import React from "react";
import Glove from "./Glove";
import Shovel from "./Shovel";
//
export default function Tools({
  isGetGlove,
  setIsGetGlove,
  isGetShovel,
  setIsGetShovel,
}) {
  //
  return (
    <div>
      <Glove isGetGlove={isGetGlove} setIsGetGlove={setIsGetGlove} />
      <Shovel isGetShovel={isGetShovel} setIsGetShovel={setIsGetShovel} />
    </div>
  );
}
