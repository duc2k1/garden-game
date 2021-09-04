import React from "react";
import Glove from "./Glove";
import Shovel from "./Shovel";
import TreeFood from "./TreeFood";
//
export default function Tools({
  isGetGlove,
  setIsGetGlove,
  isGetShovel,
  setIsGetShovel,
  isGetTreeFood,
  setIsGetTreeFood,
}) {
  //
  return (
    <div>
      <Glove isGetGlove={isGetGlove} setIsGetGlove={setIsGetGlove} />
      <Shovel isGetShovel={isGetShovel} setIsGetShovel={setIsGetShovel} />
      <TreeFood
        isGetTreeFood={isGetTreeFood}
        setIsGetTreeFood={setIsGetTreeFood}
      />
    </div>
  );
}
