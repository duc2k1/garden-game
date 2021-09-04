import React, { memo } from "react";
//
export default memo(function CoinBank({ coinBankVal }) {
  //
  return (
    <div className="gd-coinBank">
      <div className="gd-coinBank-val">{coinBankVal}</div>
    </div>
  );
});
