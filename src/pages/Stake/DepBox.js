import { fN } from "../../utils/formatNumber";
import { ReinvestToggle } from "./Elements";

export const DepositBox = (props) => {
  let { isLocked, isR, setIsR, tokenPrice, dep } = props;

  let icon;
  if (isLocked) icon = require("../../assets/img/locked.svg").default;
  else icon = require("../../assets/img/non-locked.svg").default;

  return (
    <div
      className="deposit-box"
      style={{ marginRight: `${!isLocked ? "0" : "10px"}` }}
    >
      <div className="dep-box-header brd-btm">
        <img src={icon} alt="" />
        <div className="header-3">
          {isLocked ? "LOCKED DEPOSIT" : "NON-LOCKED DEPOSIT"}
        </div>
      </div>

      <div className="dep-box-body brd-btm">
        <div className="small-grey-header">On balance</div>
        <div className="dep-box-num numbers">
          {dep.getAmount.toLocaleString("en-US")} GET
        </div>
        {/* <div className="dash-box-footer dash-box-colored-footer">
          {fN(dep.usdAmount, 2, true)} USD
        </div> */}
      </div>

      <div className="dep-box-body brd-btm">
        <div className="small-grey-header">Total Earned</div>
        <div className="dep-box-num numbers">
          {fN(dep.totalEarned, 2, true)} GET
        </div>
        {/* <div className="dash-box-footer dash-box-colored-footer">
          {fN(dep.totalEarned * tokenPrice, 2, true)} USD
        </div> */}
      </div>

      <ReinvestToggle isR={isR} setIsR={setIsR} depId={dep.depId} />
    </div>
  );
};
