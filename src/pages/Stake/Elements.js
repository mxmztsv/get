import { useContext, useState } from "react";
import Slider from "react-rangeslider";
import useWindowDimensions from "../../hooks/useWindow";
import { fN } from "../../utils/formatNumber";
import { setItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";
import { UserContext } from "../../utils/UserContext";

export const TotalStakedBox = (props) => {
  let { totalStaked1, totalStaked2 } = props;
  return (
    <div className="stake-total-staked-box">
      <div className="medium-yellow-header">Total staked</div>
      <div className="big-numbers dark-span">
        {fN(totalStaked1 + totalStaked2, 2, true)} GET
      </div>
    </div>
  );
};

export const TotalEarnedBox = (props) => {
  let { totalEarned1, totalEarned2, tokenPrice } = props;
  const { width } = useWindowDimensions();
  let sum = totalEarned1 + totalEarned2;

  return (
    <div
      className="stake-total-staked-box"
      style={{ marginBottom: `${width > 815 ? "35px" : "15px"}` }}
    >
      <div className="medium-yellow-header">Total earned</div>
      <div className="big-numbers dark-span">
        {fN(sum, 2, true)} GET
        <span style={{ whiteSpace: "nowrap" }}>
          | {fN(sum * tokenPrice, 2, true)} USD
        </span>
      </div>
    </div>
  );
};

// STAKE ACT CONT
export const StakeAmountContainer = (props) => {
  let {
    handleCalcChange,
    isMain,
    isGet,
    usdtBalMain,
    getBalMain,
    usdtBalBonus,
    getBalBonus,
    tokensForStake,
  } = props;

  function getMax(isM, isG, uBM, gBM, uBB, gBB) {
    if (isM) return isG ? gBM : uBM;
    else return isG ? gBB : uBB;
  }

  return (
    <>
      <div className="stake-amount-container">
        <div className="stake-amount-inner">
          <div className="medium-yellow-header">YOUR INVESTEMENT</div>
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
                {isGet ? " GET" : " USD"}
              </p>
            </div>
            <div className="stake-slider">
              <Slider
                className="range-slider"
                min={0}
                max={getMax(
                  isMain,
                  isGet,
                  usdtBalMain,
                  getBalMain,
                  usdtBalBonus,
                  getBalBonus
                )}
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
                <p>Minimum deposit: 25 USD</p>
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
          <div className="medium-yellow-header">DEPOSIT OPTION</div>
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
  let { nlDepAmount } = props;

  return (
    <>
      <div className="stake-amount-container">
        <div className="stake-amount-inner">
          <div className="header-3" style={{ marginBottom: "10px" }}>
            AMOUNT
          </div>
          <div className="stake-amount-slider-container">
            <div className="slider-header">
              <p className="yellow-text dark-span numbers">{nlDepAmount} GET</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// STAKE ACT BOXES
export const StakeActRoiBox = (props) => {
  let { roiVal } = props;
  return (
    <div className="stake-act-stats-box">
      <div className="small-grey-header">Monthly</div>
      <div className="big-numbers">{roiVal}%</div>
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
  const [isLock, setIsLock] = useState(false);

  async function handleToggle(did) {
    if (!did) {
      toastC("You need to make a deposit first", 1);
      return;
    }

    let res = await sendReq("post", `deposit/auto-reinvest/${did}`, {
      auto_reinvest: isR ? 0 : 1,
    });
    if (res.data && res.data.result === "success") {
      setItem(`isR${did}`, isR ? 0 : 1);
      return true;
    } else {
      toastC("Internal error. Try again later", 1);
      return false;
    }
  }

  return (
    <>
      <div
        className="reinvest-toggle-container "
        onClick={async () => {
          if (!isLock) {
            setIsLock(true);
            let res = await handleToggle(depId);
            if (res) setIsR(!isR);
            setIsLock(false);
          } else {
            toastC("Please wait, previous request being processed", 1);
          }
        }}
      >
        <div
          className="medium-yellow-header"
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
  let {
    isGet,
    isMain,
    setIsGet,
    usdtBalMain,
    getBalMain,
    usdtBalBonus,
    getBalBonus,
    setTokensForStake,
  } = props;

  return (
    <>
      <div className="stake-time-options-button">
        <div className="stake-amount-inner">
          <div className="medium-yellow-header">YOU PAY</div>
          <div className="double-button-container">
            <button
              className={`${!isGet ? "" : "unselected-button"}`}
              onClick={() => {
                setIsGet(false);
                setTokensForStake(isMain ? usdtBalMain : usdtBalBonus);
              }}
            >
              <p>USD</p>
            </button>
            <button
              className={`${isGet ? "" : "unselected-button"}`}
              onClick={() => {
                setIsGet(true);
                setTokensForStake(isMain ? getBalMain : getBalBonus);
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

export const BalanceSwitcher = (props) => {
  let {
    isGet,
    isMain,
    setIsMain,
    usdtBalMain,
    getBalMain,
    usdtBalBonus,
    getBalBonus,
    setTokens,
    noHeader,
  } = props;

  return (
    <>
      <div className="stake-time-options-button stake-balance-options">
        <div className="stake-amount-inner">
          {noHeader === undefined ? (
            <div className="medium-yellow-header">CHOOSE BALANCE</div>
          ) : (
            <></>
          )}
          <div className="double-button-container">
            <button
              className={`${isMain ? "" : "unselected-button"}`}
              onClick={() => {
                setIsMain(true);
                setTokens(isGet ? getBalMain : usdtBalMain);
              }}
            >
              <p>MAIN</p>
              <p className="button-sub-text">
                USD: {fN(usdtBalMain, 1)} | GET: {fN(getBalMain, 1)}
              </p>
            </button>

            <button
              className={`${!isMain ? "" : "unselected-button"}`}
              onClick={() => {
                setIsMain(false);
                setTokens(isGet ? getBalBonus : usdtBalBonus);
              }}
            >
              <p>BONUS</p>
              <p className="button-sub-text">
                USD: {fN(usdtBalBonus, 1)} | GET: {fN(getBalBonus, 1)}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
