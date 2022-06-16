import { ReinvestToggle } from "./Elements";

export const DepositBox = (props) => {
  let { isLocked, isR, setIsR, getAmount, usdAmount, depId, totalEarned } =
    props;

  let icon;
  if (isLocked) icon = require("../../assets/img/locked.svg").default;
  else icon = require("../../assets/img/non-locked.svg").default;

  return (
    <div className="deposit-box">
      <div className="dep-box-header brd-btm">
        <img src={icon} alt="" />
        <div className="header-3">
          {isLocked ? "LOCKED DEPOSIT" : "NON-LOCKED DEPOSIT"}
        </div>
      </div>

      <div className="dep-box-body brd-btm">
        <div className="small-grey-header">On balance</div>
        <div className="dep-box-num numbers">
          {getAmount.toLocaleString("en-US")} GET
        </div>
        <div className="dash-box-footer dash-box-colored-footer">
          {(Math.round(usdAmount * 100) / 100).toLocaleString("en-US")} USD
        </div>
      </div>

      <div className="dep-box-body brd-btm">
        <div className="small-grey-header">Total Earned</div>
        <div className="dep-box-num numbers">{totalEarned} GET</div>
        <div className="dash-box-footer dash-box-colored-footer">
          {Math.round(totalEarned * 0.11)} USD
        </div>
      </div>

      <ReinvestToggle isR={isR} setIsR={setIsR} depId={depId} />
    </div>
  );
};
