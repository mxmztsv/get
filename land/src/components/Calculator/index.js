import { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import { fetchTokenPriceE } from "../../utils/EffFetchers/fetchTokenPriceE";
import { getItem } from "../../utils/localStorage";
import { StakeAmountContainer, StakeTimeContainer } from "./Elements";

export const ProfitCalculatorPopUp = ({ setIsPopUpOpen }) => {
  const [isL, setIsL] = useState(true);
  const [periodInWeeks, setPeriodInWeeks] = useState(1);
  const [amount, setAmount] = useState(10000);
  const [getPrice, setGetPrice] = useState(
    getItem("pTP") != null ? getItem("pTP") : 0.11
  );
  const [dailyProfitRatio, setDailyProfitRatio] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [dailyEarningsGet, setDailyEarningsGet] = useState(0);
  const [dailyEarningsUSD, setDailyEarningsUSD] = useState(0);
  const [totalEarningsGet, setTotalEarningsGet] = useState(0);
  const [totalEarningsUSD, setTotalEarningsUSD] = useState(0);

  const periodSliderHandler = (value) => {
    setPeriodInWeeks(value);
  };

  const calculateProfit = () => {
    if (!getPrice) return;
    if (amount && getPrice) {
      if (isL) {
        if (amount >= 25 && amount < 5000) {
          setDailyProfitRatio(0.0093);
          setMonthlyProfit(28);
        } else if (amount >= 5000 && amount < 25000) {
          setDailyProfitRatio(0.01);
          setMonthlyProfit(30);
        } else if (amount >= 25000) {
          setDailyProfitRatio(0.0123);
          setMonthlyProfit(37);
        }
      } else {
        if (amount >= 25 && amount < 5000) {
          setDailyProfitRatio(0.0046);
          setMonthlyProfit(14);
        } else if (amount >= 5000 && amount < 25000) {
          setDailyProfitRatio(0.005);
          setMonthlyProfit(15);
        } else if (amount >= 25000) {
          setDailyProfitRatio(0.0053);
          setMonthlyProfit(16);
        }
      }
    } else setDailyProfitRatio(0);
  };

  const calculateEarnings = () => {
    if (!getPrice) return;
    if (amount && dailyProfitRatio) {
      const amountGet = amount / getPrice;
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

  // token price fetch
  useEffect(() => {
    console.log("[Main] fetching token price");
    fetchTokenPriceE(setGetPrice);
  }, []);
  // ------------------------------------

  useEffect(() => {
    calculateProfit();
  }, [amount, getPrice, isL]);

  useEffect(() => {
    calculateEarnings();
  }, [amount, getPrice, dailyProfitRatio, periodInWeeks]);

  return (
    <>
      <div className="popup-profit-calculator-body">
        <div className="profit-calculator">
          <div className="profit-calculator-investment">
            <p className="popup-title">Investment</p>
            <div className="profit-calculator-amount">
              <StakeAmountContainer
                title={"AMOUNT"}
                handleCalcChange={setAmount}
                isGet={true}
                currency={" USD"}
                minValue={100}
                usdtBal={0}
                getBal={200000}
                tokensForStake={amount}
                showMinDep={false}
              />
            </div>
            <div className="profit-calculator-amount">
              <StakeAmountContainer
                title={"GET TOKEN PRICE"}
                handleCalcChange={setGetPrice}
                isGet={true}
                currency={" USD"}
                usdtBal={0}
                getBal={10}
                tokensForStake={getPrice || getItem("pTP")}
                showMinDep={false}
              />
            </div>
            <div className="profit-calculator-deposit">
              <StakeTimeContainer isL={isL} setIsL={setIsL} />
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
    </>
  );
};
