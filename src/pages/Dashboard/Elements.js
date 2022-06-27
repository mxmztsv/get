import React, { useContext } from "react";
import { Chart } from "../../components/Chart";
import { ChartTimeButtons } from "../../components/ChartTimeButton";
import useWindowDimensions from "../../hooks/useWindow";
import { fN } from "../../utils/formatNumber";
import { getGreeting } from "../../utils/getGreeting";
import { getItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";

// boxes
export const TotalEarnedBox = (props) => {
  let { tb, setTb, totalEarned1, totalEarned2, tokenPrice } = props;
  const { width } = useWindowDimensions();

  let sum = totalEarned1 + totalEarned2;

  return (
    <div>
      <div className="medium-yellow-header earned-header">Total earned</div>
      <div className="numbers dash-num dark-span">
        {fN(sum, 2, true)} GET
        {width > 815 ? (
          <>
            <br />
            <span style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
              {fN(sum * tokenPrice, 2, true)} USD
            </span>
          </>
        ) : (
          <>
            <span style={{ whiteSpace: "nowrap" }}>
              {" "}
              | {fN(sum * tokenPrice, 2, true)} USD
            </span>
          </>
        )}
      </div>
      {/* <div className="earned-time-buttons-wrapper">
        <EarnedTimeButtons tb={tb} setTb={setTb} />
      </div> */}
    </div>
  );
};

export const StakedBox = (props) => {
  let { totalStaked1, totalStaked2 } = props;

  let sum = totalStaked1 + totalStaked2;

  const { width } = useWindowDimensions();

  return (
    <>
      <div
        className="dash-box staked-box"
        style={{
          marginRight: `${width < 815 ? "15px" : "0px"}`,
          marginLeft: `${width < 815 ? "0px" : "12px"}`,
          marginTop: `${width < 815 ? "12px" : "0px"}`,
        }}
      >
        <div className="dash-box-header">Staked</div>
        <div className="dash-box-body">{fN(sum, 2, true)} GET</div>

        {/* <div className="dash-box-footer dash-box-colored-footer">
          {" "}
          {(Math.round(sum * 0.11 * 100) / 100).toLocaleString("en-US")} USD
        </div> */}
      </div>
    </>
  );
};

export const TokenBox = (props) => {
  let { tokenPrice, tokenPrevPrice } = props;

  function countDif(price, prevPrice) {
    return fN(Math.abs(price - prevPrice), 3);
  }

  function countChange(price, prevPrice) {
    let x = Math.round(((price * 100) / prevPrice) * 100) / 100 - 100;
    return fN(x, 2);
  }

  return (
    <>
      <div className="get-token-box dash-box a-token-box">
        <div className="dash-box-header">GET Token</div>
        <div className="dash-box-body">${tokenPrice}</div>
        <div
          className="dash-box-footer"
          // style={{
          //   color: `#${token24hChange > 0 ? "54F2F2" : "EF5A55"}`,
          // }}
        >
          {countChange(tokenPrice, tokenPrevPrice) < 0 ? "-" : "+"}$
          {countDif(tokenPrice, tokenPrevPrice)} (
          {countChange(tokenPrice, tokenPrevPrice)}%)
        </div>
      </div>
    </>
  );
};

export const TvlBox = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      <div className="tvl-box dash-box">
        <div className="dash-box-header">
          {width > 815 ? "Total Value Locked" : "TVL"}
        </div>
        <div className="dash-box-body">- GET</div>
        <div className="dash-box-footer dash-box-colored-footer">- USD</div>
      </div>
    </>
  );
};

export const RoiBox = () => {
  return (
    <>
      <div className="roi-box dash-box">
        <div className="dash-box-header">Staking reward</div>
        <div className="dash-box-body">14-37%</div>
      </div>
    </>
  );
};

export const StakeRewardNonLocked = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      <div
        className="dash-box"
        style={{ marginRight: `${width < 815 ? "10px" : "0"}` }}
      >
        <div className="dash-box-header">Stake reward</div>
        <div className="dash-box-body">14-16%</div>
        <div className="dash-box-footer grey-text">Non-locked</div>
      </div>
    </>
  );
};

export const StakeRewardLocked = () => {
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header">Stake reward</div>
        <div className="dash-box-body">28-37%</div>
        <div className="dash-box-footer grey-text">Locked</div>
      </div>
    </>
  );
};

export const DashGreet = () => {
  const { user } = useContext(UserContext);
  const { width } = useWindowDimensions();

  function getName() {
    if (getItem("userName")) {
      return (
        <>
          ,
          {width > 815 ? (
            <> </>
          ) : (
            <>
              <br />
            </>
          )}
          {getItem("userName")}
        </>
      );
    } else if (user && user.name) {
      return `,${width > 815 ? " " : "\n"}${user.name}`;
    } else return "";
  }

  return (
    <>
      {user ? (
        <div
          className={`dash-header-greet header-1 ${
            width < 815 ? "brd-btm" : ""
          }`}
        >
          {getGreeting()} {getName()}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const DashBody = React.memo((props) => {
  let { tb, setTb, allPricesArray, width } = props;

  return (
    <>
      <div className="dash-body">
        <div className="dash-chart">
          <div className="chart-time-buttons-wrapper">
            <ChartTimeButtons tb={tb} setTb={setTb} />
          </div>
          {/* <ChartDisabled /> */}
          <Chart allPricesArray={allPricesArray} sTA={tb} width={width} />
        </div>
      </div>
    </>
  );
});

export const DashSwitcherMob = (props) => {
  let { isA, setIsA } = props;
  return (
    <div className="dash-switch-container brd-btm">
      <div className="dash-switcher-wrapper">
        <button onClick={() => setIsA(!isA)} className={isA ? "s-button" : ""}>
          ACCOUNT
        </button>
        <button onClick={() => setIsA(!isA)} className={!isA ? "s-button" : ""}>
          TOKEN
        </button>
      </div>
    </div>
  );
};
