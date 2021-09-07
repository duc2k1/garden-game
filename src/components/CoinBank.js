import React, { memo } from "react";
//
const url = window.location.href;
//
export default memo(function CoinBank({ coinBankVal }) {
  //
  return (
    <div className="gd-coinBank">
      <div className="gd-coinBank-val">{coinBankVal}</div>
    </div>
  );
});
