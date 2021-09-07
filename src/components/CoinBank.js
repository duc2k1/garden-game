import React, { memo } from "react";
//
export default memo(function CoinBank({ coinBankVal }) {
  //
  return (
    <div
      className="gd-coinBank"
      style={{ backgroundImage: "url(./assets/images/inf/coinbank.png)" }}
    >
      <div className="gd-coinBank-val">{coinBankVal}</div>
    </div>
  );
});
