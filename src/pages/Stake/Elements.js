import { useContext } from "react";
import toast from "react-hot-toast";
import Slider from "react-rangeslider";
import { TxTableBody } from "../../components/TxTable";
import useWindowDimensions from "../../hooks/useWindow";
import { setItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";
import { UserContext } from "../../utils/UserContext";

export const TotalStakedBox = (props) => {
  let { totalStaked1, totalStaked2 } = props;
  return (
    <div className="stake-total-staked-box">
      <div className="medium-white-header">Total staked</div>
      <div className="big-numbers dark-span">
        {(Math.round((totalStaked1 + totalStaked2) * 100) / 100).toLocaleString(
          "en-US"
        )}{" "}
        GET
      </div>
    </div>
  );
};

export const TotalEarnedBox = (props) => {
  let { totalEarned1, totalEarned2 } = props;
  const { width } = useWindowDimensions();
  let sum = totalEarned1 + totalEarned2;

  return (
    <div
      className="stake-total-staked-box"
      style={{ marginBottom: `${width > 815 ? "35px" : "15px"}` }}
    >
      <div className="medium-white-header">Total earned</div>
      <div className="big-numbers dark-span">
        {(Math.round(sum * 100) / 100).toLocaleString("en-US")} GET{" "}
        <span>
          | {(Math.round(sum * 0.11 * 100) / 100).toLocaleString("en-US")} USD
        </span>
      </div>
    </div>
  );
};

// STAKE ACT CONT
export const StakeAmountContainer = (props) => {
  let { handleCalcChange, isGet, usdtBal, getBal, tokensForStake } = props;
  return (
    <>
      <div className="stake-amount-container">
        <div className="stake-amount-inner">
          <div className="medium-white-header">YOUR INVESTEMENT</div>
          <div className="stake-amount-slider-container">
            <div className="slider-header">
              {/* <input
                type="number"
                className="yellow-text numbers"
                value={tokensForStake}
                onChange={(value) => handleCalcChange(value)}
              /> */}
              <p className="yellow-text numbers">
                {tokensForStake}
                {isGet ? " GET" : " USDT"}
              </p>
            </div>
            <div className="stake-slider">
              <Slider
                className="range-slider"
                min={0}
                max={isGet ? getBal : usdtBal}
                step={0.1}
                value={tokensForStake}
                onChange={(value) => handleCalcChange(value)}
                tooltip={false}
              />
            </div>
          </div>
          <div className="dep-opt-footer">
            {isGet ? (
              <>
                <p>Minimum deposit: 230 GET</p>
              </>
            ) : (
              <>
                <p>Minimum deposit: 25 USDT</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const StakeTimeContainer = (props) => {
  let { isL, setIsL, handleCalcChange, tokensForStake } = props;

  return (
    <>
      <div className="stake-time-options-button">
        <div className="stake-amount-inner">
          <div className="medium-white-header">DEPOSIT OPTION</div>
          <div className="double-button-container">
            <button
              className={`${isL ? "" : "unselected-button"}`}
              onClick={() => {
                setIsL(true);
                handleCalcChange(tokensForStake);
              }}
            >
              <p>Locked</p>
            </button>
            <button
              className={`${!isL ? "" : "unselected-button"}`}
              onClick={() => {
                setIsL(false);
                handleCalcChange(tokensForStake);
              }}
            >
              <p>Non-locked</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const UnstakeAmountContainer = (props) => {
  const { user } = useContext(UserContext);
  let { handleCalcChange } = props;

  return (
    <>
      <div className="stake-amount-container">
        <div className="stake-amount-inner">
          <div className="medium-white-header">AMOUNT</div>
          <div className="stake-amount-slider-container">
            <div className="slider-header">
              <p className="yellow-text dark-span numbers">
                {/* {tokensForStake.toLocaleString("en-US")} GET */}0 GET
              </p>
            </div>
            <div className="stake-slider">
              <Slider
                className="range-slider"
                min={0}
                max={user ? user.balance : 100_000}
                step={1}
                value={0}
                onChange={(value) => {
                  handleCalcChange({
                    tokens: value,
                    months: -1,
                  });
                }}
                tooltip={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// STAKE ACT BOXES
export const StakeActRoiBox = (props) => {
  let { isL } = props;
  return (
    <div className="stake-act-stats-box">
      <div className="small-grey-header">Monthly</div>
      <div className="big-numbers">{isL ? "28" : "14"}%</div>
    </div>
  );
};

export const StakeActMontlyRBox = (props) => {
  let { width } = useWindowDimensions();
  let { monthlyReward } = props;
  return (
    <div
      className={`stake-act-stats-box ${width > 815 ? "" : "brd-top"}`}
      style={{ textAlign: `${width > 815 ? "right" : "left"}` }}
    >
      <div className="small-grey-header">Monthly reward</div>
      <div className="big-numbers">{monthlyReward} GET</div>
    </div>
  );
};

export const ReinvestToggle = (props) => {
  let { isR, setIsR, depId } = props;

  async function handleToggle(did) {
    let res = await sendReq("post", `deposit/auto-reinvest/${did}`, {
      auto_reinvest: isR ? 0 : 1,
    });
    if (res.data && res.data.result === "success") {
      setItem(`isR${did}`, isR ? 0 : 1);
      return true;
    } else {
      toast.error("Internal error. Try again later");
      return false;
    }
  }

  return (
    <>
      <div
        className="reinvest-toggle-container "
        onClick={async () => {
          let res = await handleToggle(depId);
          if (res) setIsR(!isR);
        }}
      >
        <div
          className="medium-white-header"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          REINVEST REWARD
        </div>
        <div className={`rei-toggle-button ${isR ? "toggled" : ""}`}>
          <img src={require("../../assets/img/check.svg").default} alt="" />
        </div>
      </div>
    </>
  );
};

export const TxBodyBox = () => {
  return (
    <>
      <div className="dash-tx-container">
        <div className="dash-tx-header header-2">Transactions</div>
        <div className="dash-transactions-body">
          <TxTableBody />
        </div>
      </div>
    </>
  );
};

export const BackButton = (props) => {
  let { cW, setCW } = props;
  return (
    <div>
      {cW === 1 || cW === 2 ? (
        <button className="back-button" onClick={() => setCW(0)}>
          <img src={require("../../assets/img/back.svg").default} alt="" /> Back
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export const CurrencySwitcher = (props) => {
  let { isGet, setIsGet, usdtBal, getBal, setTokensForStake } = props;

  return (
    <>
      <div className="stake-time-options-button">
        <div className="stake-amount-inner">
          <div className="medium-white-header">YOU PAY</div>
          <div className="double-button-container">
            <button
              className={`${!isGet ? "" : "unselected-button"}`}
              onClick={() => {
                setIsGet(false);
                setTokensForStake(usdtBal);
              }}
            >
              <p>USDT</p>
            </button>
            <button
              className={`${isGet ? "" : "unselected-button"}`}
              onClick={() => {
                setIsGet(true);
                setTokensForStake(getBal);
              }}
            >
              <p>GET</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
