import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-rangeslider";
import closeIcon from "../../assets/img/close.svg";
import question from "../../assets/img/question.svg";
import useWindowDimensions from "../../hooks/useWindow";
import { fN } from "../../utils/formatNumber";
import { setItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";
import { UserContext } from "../../utils/UserContext";
import {fetchGetTokenPriceInUsd} from "../../utils/fetchers/fetchTokenPrice";

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
          {" "}
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
    title = "YOUR INVESTEMENT",
    showMinDep = true,
    maxValue = null,
    minValue = null,
  } = props;

  function getMax(isM, isG, uBM, gBM, uBB, gBB) {
    if (isM) return isG ? gBM : uBM;
    else return isG ? gBB : uBB;
  }

  const inputRef = useRef(null);

  // for change of amount runs
  useEffect(() => {
    setInputWidth({ target: { value: tokensForStake } });
  }, [tokensForStake]);

  function setInputWidth(value) {
    let inputStyle = inputRef.current.style;
    let passedValue = !isNaN(parseFloat(value.target.value))
      ? parseFloat(value.target.value)
      : "0"; // this value can be bigger than balance

    // get width of text
    const context = document.createElement("canvas").getContext("2d");
    context.font = getComputedStyle(
      document.getElementsByClassName("numbers")[0]
    ).font;
    let textWidth = context.measureText(passedValue.toString()).width;
    if (textWidth < 13) textWidth = 15;

    if (title === "YOUR INVESTEMENT") {
      // getting max value for input
      let maxVal = 0;
      if (isMain) {
        maxVal = isGet ? getBalMain : usdtBalMain;
      } else {
        maxVal = isGet ? getBalBonus : usdtBalBonus;
      }
      if ((passedValue || 0) <= maxVal) {
        inputStyle.width = `${textWidth.toString()}px`;
        inputRef.current.value = passedValue || 0;
      }
    } else {
      inputStyle.width = `${textWidth.toString()}px`;
      inputRef.current.value = passedValue || 0;
    }
  }

  return (
    <>
      <div className="stake-amount-container">
        <div className="stake-amount-inner">
          <div className="medium-yellow-header">{title}</div>
          <div className="stake-amount-slider-container">
            <div
              className="slider-header"
              onClick={() => inputRef.current.select()}
            >
              <p className="yellow-text numbers">
                {/* {fN(tokensForStake, 2)} */}
                <input
                  type="number"
                  value={tokensForStake}
                  className="numbers yellow-text"
                  onChange={(value) => {
                    let val;
                    if (isNaN(parseFloat(value.target.value))) {
                      val = "0";
                    } else {
                      val = value.target.value;
                    }

                    handleCalcChange(val);
                  }}
                  ref={inputRef}
                />
                {isGet ? " GET" : " USD"}
              </p>
            </div>
            <div className="stake-slider">
              <Slider
                className="range-slider"
                min={0}
                max={
                  maxValue
                    ? maxValue
                    : getMax(
                        isMain,
                        isGet,
                        usdtBalMain,
                        getBalMain,
                        usdtBalBonus,
                        getBalBonus
                      )
                }
                step={0.1}
                value={tokensForStake}
                onChange={(value) => handleCalcChange(value)}
                tooltip={false}
              />
            </div>
          </div>
          {showMinDep && (
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
          )}
        </div>
      </div>
    </>
  );
};

export const StakeTimeContainer = (props) => {
  let { isL, setIsL, handleCalcChange, tokensForStake } = props;

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  return (
    <>
      {isPopUpOpen && <DepositDetailPopUp setIsPopUpOpen={setIsPopUpOpen} />}
      <div className="stake-time-options-button">
        <div className="stake-amount-inner">
          <div className="medium-yellow-header">
            DEPOSIT OPTION
            <img
              src={question}
              alt="details"
              className="question-btn"
              onClick={openPopUp}
            />
          </div>
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
              <p className="yellow-text dark-span numbers">
                {fN(nlDepAmount, 2, true)} GET
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// STAKE ACT BOXES
export const StakeActRoiBox = (props) => {
  let { roiVal, isL } = props;

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  return (
    <>
      {isPopUpOpen && (
        <RoiDetailPopUp setIsPopUpOpen={setIsPopUpOpen} isLocked={isL} />
      )}
      <div className="stake-act-stats-box">
        <div className="small-grey-header">
          Monthly
          <img
            src={question}
            alt="details"
            className="question-btn"
            onClick={openPopUp}
          />
        </div>
        <div className="big-numbers">{roiVal}%</div>
      </div>
    </>
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

export const DepositDetailPopUp = ({ setIsPopUpOpen }) => {
  const close = () => {
    setIsPopUpOpen(false);
  };

  return (
    <>
      <div className="popup-bg">
        <div className="popup-container">
          <div className="popup-close">
            <p className="popup-close-text">Close</p>
            <img
              src={closeIcon}
              alt="close popup"
              className="popup-close-btn"
              onClick={close}
            />
          </div>
          <div className="popup">
            <div className="popup-body">
              <div className="deposit-details-point">
                <p className="popup-title">Non-locked deposit</p>
                <p className="popup-title-text">
                  A withdrawable deposit can be unstaked at any point,
                  withdrawing any funds staked safely and securely
                </p>
              </div>
              <div className="separator" />
              <div className="deposit-details-point">
                <p className="popup-title">Locked deposit</p>
                <p className="popup-title-text">
                  A locked up deposit grants higher profit percentage that can
                  be withdrawn after your lockup period is going to pass
                </p>
              </div>
            </div>
            <div className="popup-actions">
              <button className="popup-btn" onClick={close}>
                BACK TO STAKING
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProfitCalculatorPopUp = ({ setIsPopUpOpen }) => {
  const [isL, setIsL] = useState(true);
  const [periodInWeeks, setPeriodInWeeks] = useState(1);
  const [amount, setAmount] = useState(0);
  const [getPrice, setGetPrice] = useState(0);
  const [realGetPrice, setRealGetPrice] = useState(0);
  const [dailyProfitRatio, setDailyProfitRatio] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [dailyEarningsGet, setDailyEarningsGet] = useState(0);
  const [dailyEarningsUSD, setDailyEarningsUSD] = useState(0);
  const [totalEarningsGet, setTotalEarningsGet] = useState(0);
  const [totalEarningsUSD, setTotalEarningsUSD] = useState(0);

  const close = () => {
    setIsPopUpOpen(false);
  };

  const periodSliderHandler = (value) => {
    setPeriodInWeeks(value);
  };

  const setActualGetPrice = async () => {
    fetchGetTokenPriceInUsd().then((price) => {
      setGetPrice(price);
      setRealGetPrice(price);
    })
  };

  const calculateProfit = () => {
    if (amount && getPrice) {
      const amountUSD = amount;
      if (isL) {
        if (amountUSD >= 25 && amountUSD < 5000) {
          setDailyProfitRatio(0.0093);
          setMonthlyProfit(28);
        } else if (amountUSD >= 5000 && amountUSD < 25000) {
          setDailyProfitRatio(0.01);
          setMonthlyProfit(30);
        } else if (amountUSD >= 25000) {
          setDailyProfitRatio(0.0123);
          setMonthlyProfit(37);
        }
      } else {
        if (amountUSD >= 25 && amountUSD < 5000) {
          setDailyProfitRatio(0.0046);
          setMonthlyProfit(14);
        } else if (amountUSD >= 5000 && amountUSD < 25000) {
          setDailyProfitRatio(0.005);
          setMonthlyProfit(15);
        } else if (amountUSD >= 25000) {
          setDailyProfitRatio(0.0053);
          setMonthlyProfit(16);
        }
      }
    } else setDailyProfitRatio(0);
  };

  const calculateEarnings = () => {
    if (amount && dailyProfitRatio) {
      const amountGet = amount / realGetPrice;
      const dailyEarning = amountGet * dailyProfitRatio;
      const totalEarning = dailyEarning * periodInWeeks * 7;

      setDailyEarningsGet(dailyEarning.toFixed(2));
      setDailyEarningsUSD((dailyEarning * getPrice).toFixed(2));
      setTotalEarningsGet(totalEarning.toFixed(2));
      setTotalEarningsUSD((totalEarning * getPrice).toFixed(2));
    } else {
      setDailyEarningsGet(0);
      setDailyEarningsUSD(0);
      setTotalEarningsGet(0);
      setTotalEarningsUSD(0);
    }
  };

  useEffect(() => {
    setActualGetPrice();
  }, []);

  useEffect(() => {
    calculateProfit();
  }, [amount, getPrice, isL]);

  useEffect(() => {
    calculateEarnings();
  }, [amount, getPrice, dailyProfitRatio, periodInWeeks]);

  return (
    <>
      <div className="popup-bg">
        <div className="popup-container">
          <div className="popup-close">
            <p className="popup-close-text">Close</p>
            <img
              src={closeIcon}
              alt="close popup"
              className="popup-close-btn"
              onClick={close}
            />
          </div>
          <div className="popup-profit-calculator">
            <div className="popup-profit-calculator-body">
              <div className="profit-calculator">
                <div className="profit-calculator-investment">
                  <p className="popup-title">Investment</p>
                  <div className="profit-calculator-amount">
                    <StakeAmountContainer
                      title={"AMOUNT"}
                      // @ts-ignore
                      handleCalcChange={(val) => setAmount(fN(val, 2))}
                      isGet={false}
                      minValue={getPrice}
                      maxValue={200000}
                      tokensForStake={amount}
                      showMinDep={false}
                    />
                  </div>
                  <div className="profit-calculator-amount">
                    <StakeAmountContainer
                      title={"GET TOKEN PRICE"}
                      // @ts-ignore
                      handleCalcChange={(val) => setGetPrice(fN(val, 2))}
                      isGet={false}
                      maxValue={10}
                      tokensForStake={getPrice}
                      showMinDep={false}
                    />
                  </div>
                  <div className="profit-calculator-deposit">
                    <StakeTimeContainer isL={isL} setIsL={setIsL} />
                  </div>
                  <div className="profit-calculator-btn-container">
                    <button className="popup-btn" onClick={close}>
                      BACK TO STAKING
                    </button>
                  </div>
                </div>
                <div className="profit-calculator-profit">
                  <p className="popup-title">Profit</p>
                  <div className="profit-calculator-item">
                    <p className="medium-white-header">STAKE FOR</p>
                    <p className="profit-calculator-period-value">
                      {periodInWeeks}
                      {periodInWeeks > 1 ? " Weeks" : " Week"}
                    </p>
                    <Slider
                      className="period-slider"
                      min={1}
                      max={53}
                      step={1}
                      value={periodInWeeks}
                      onChange={periodSliderHandler}
                      tooltip={false}
                    />
                    <div className="profit-calculator-period-labels">
                      <p className="period-label">1 Week</p>
                      <p className="period-label">1 Year</p>
                    </div>
                  </div>
                  <div className="profit-calculator-item">
                    <p className="medium-white-header">DAILY EARNINGS</p>
                    <p className="profit-calculator-earnings-amount">
                      {dailyEarningsGet + " GET"}
                      <span className="profit-calculator-earnings-usd">
                        {" | " + dailyEarningsUSD + " USD"}
                      </span>
                    </p>
                  </div>
                  <div className="profit-calculator-item">
                    <p className="medium-white-header">TOTAL EARNINGS</p>
                    <p className="profit-calculator-earnings-amount">
                      {totalEarningsGet + " GET"}
                      <span className="profit-calculator-earnings-usd">
                        {" | " + totalEarningsUSD + " USD"}
                      </span>
                    </p>
                  </div>
                  <div className="profit-calculator-item">
                    <p className="medium-white-header">Monthly %</p>
                    <p className="profit-calculator-earnings-amount">
                      {monthlyProfit + "%"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className="popup-actions">*/}
            {/*    <button className="popup-btn" onClick={close}>BACK TO STAKING</button>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export const RoiDetailPopUp = ({ setIsPopUpOpen, isLocked }) => {
  const [isL, setIsL] = useState(isLocked);

  const close = () => {
    setIsPopUpOpen(false);
  };

  const changeType = () => {
    setIsL((prevState) => !prevState);
  };

  return (
    <>
      <div className="popup-bg">
        <div className="popup-container">
          <div className="popup-close">
            <p className="popup-close-text">Close</p>
            <img
              src={closeIcon}
              alt="close popup"
              className="popup-close-btn"
              onClick={close}
            />
          </div>
          <div className="popup">
            <div className="popup-body">
              <div className="deposit-details-point">
                <p className="popup-title">Monthly Profit</p>
                {isL ? (
                  <p className="popup-title-text">
                    Locked deposit grants higher profit percentage that can be
                    withdrawn after your lockup period is going to pass
                  </p>
                ) : (
                  <p className="popup-title-text">
                    Non-locked deposit is a withdrawable deposit can be unstaked
                    at any point, withdrawing any funds staked safely and
                    securely
                  </p>
                )}
              </div>
              <div className="separator" />
              {isL ? (
                <p className="popup-title-sm">PROFIT ON LOCKED DEPOSIT</p>
              ) : (
                <p className="popup-title-sm">PROFIT ON NON-LOCKED DEPOSIT</p>
              )}

              <div className="popup-profit-card profit-card1">
                <div className="popup-profit-card-body">
                  <div className="popup-profit-card-title">$25 to $5,000</div>
                  {isL ? (
                    <div className="popup-profit-card-percentage">28%</div>
                  ) : (
                    <div className="popup-profit-card-percentage">14%</div>
                  )}
                </div>

                <div className="popup-profit-card profit-card2">
                  <div className="popup-profit-card-body">
                    <div className="popup-profit-card-title">
                      $5,000 to $25,000
                    </div>
                    {isL ? (
                      <div className="popup-profit-card-percentage">30%</div>
                    ) : (
                      <div className="popup-profit-card-percentage">15%</div>
                    )}
                  </div>

                  <div className="popup-profit-card profit-card3">
                    <div className="popup-profit-card-body">
                      <div className="popup-profit-card-title">$25,000+</div>
                      {isL ? (
                        <div className="popup-profit-card-percentage">37%</div>
                      ) : (
                        <div className="popup-profit-card-percentage">16%</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="popup-actions">
              <button onClick={close}>BACK TO STAKING</button>
              <div className="learn-more">
                <div className="popup-action-title">LEARN MORE</div>
                {isL ? (
                  <button className="popup-btn" onClick={changeType}>
                    NON-LOCKED DEPOSIT
                  </button>
                ) : (
                  <button className="popup-btn" onClick={changeType}>
                    LOCKED DEPOSIT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
