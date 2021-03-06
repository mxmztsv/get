import React, {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import Slider from "react-rangeslider";
import {TxTableBody} from "../../components/TxTable";
import useWindowDimensions from "../../hooks/useWindow";
import {setItem} from "../../utils/localStorage";
import {sendReq} from "../../utils/sendReq";
import {UserContext} from "../../utils/UserContext";
import question from "../../assets/img/question.svg";
import closeIcon from "../../assets/img/close.svg";
import {fetchTokenPrice} from "../../utils/fetchTokenPrice";

export const TotalStakedBox = (props) => {
    let {totalStaked1, totalStaked2} = props;
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
    let {totalEarned1, totalEarned2} = props;
    const {width} = useWindowDimensions();
    let sum = totalEarned1 + totalEarned2;

    return (
        <div
            className="stake-total-staked-box"
            style={{marginBottom: `${width > 815 ? "35px" : "15px"}`}}
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
    let {
        handleCalcChange,
        isGet,
        usdtBal,
        getBal,
        tokensForStake,
        title = 'YOUR INVESTEMENT',
        showMinDep = true,
        currency = null, // using for profit calculator. The component will based on isGet if null
        minValue = null
        } = props;
    return (
        <>
            <div className="stake-amount-container">
                <div className="stake-amount-inner">
                    <div className="medium-white-header">{title}</div>
                    <div className="stake-amount-slider-container">
                        <div className="slider-header">
                            {/* <input
                type="number"
                className="yellow-text numbers"
                value={tokensForStake}
                onChange={(value) => handleCalcChange(value)}
              /> */}
                            <p className="yellow-text numbers">
                                {tokensForStake.toFixed(2)}
                                {currency ? currency : (isGet ? " GET" : " USDT")}
                            </p>
                        </div>
                        <div className="stake-slider">
                            <Slider
                                className="range-slider"
                                min={minValue ? minValue : 0}
                                max={isGet ? getBal : usdtBal}
                                step={0.1}
                                value={tokensForStake}
                                onChange={(value) => handleCalcChange(value)}
                                tooltip={false}
                            />
                        </div>
                    </div>
                    { showMinDep &&
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
                    }

                </div>
            </div>
        </>
    );
};

export const DepositDetailPopUp = ({setIsPopUpOpen}) => {

    const close = () => {
        setIsPopUpOpen(false);
    }

    return (
        <>
            <div className="popup-bg">
                <div className="popup-container">
                    <div className="popup-close">
                        <p className="popup-close-text">
                            Close
                        </p>
                        <img src={closeIcon} alt="close popup" className="popup-close-btn" onClick={close}/>
                    </div>
                    <div className="popup">
                        <div className="popup-body">
                            <div className="deposit-details-point">
                                <p className="popup-title">
                                    Non-locked deposit
                                </p>
                                <p className="popup-title-text">
                                    A withdrawable deposit can be unstaked at any point, withdrawing any funds staked
                                    safely and securely
                                </p>
                            </div>
                            <div className="separator"/>
                            <div className="deposit-details-point">
                                <p className="popup-title">
                                    Locked deposit
                                </p>
                                <p className="popup-title-text">
                                    A locked up deposit grants higher profit percentage that can be withdrawn after your
                                    lockup period is going to pass
                                </p>
                            </div>
                        </div>
                        <div className="popup-actions">
                            <button className="popup-btn" onClick={close}>BACK TO STAKING</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export const ProfitCalculatorPopUp = ({setIsPopUpOpen}) => {

    const [isL, setIsL] = useState(true);
    const [periodInWeeks, setPeriodInWeeks] = useState(1);
    const [amount, setAmount] = useState(0);
    const [getPrice, setGetPrice] = useState(0);
    const [dailyProfitRatio, setDailyProfitRatio] = useState(0);
    const [monthlyProfit, setMonthlyProfit] = useState(0);
    const [dailyEarningsGet, setDailyEarningsGet] = useState(0);
    const [dailyEarningsUSD, setDailyEarningsUSD] = useState(0);
    const [totalEarningsGet, setTotalEarningsGet] = useState(0);
    const [totalEarningsUSD, setTotalEarningsUSD] = useState(0);

    const close = () => {
        setIsPopUpOpen(false);
    }

    const periodSliderHandler = (value) => {
        setPeriodInWeeks(value);
    }

    const setActualGetPrice = async () => {
        const price = await fetchTokenPrice();
        setGetPrice(price);
    }

    const calculateProfit = () => {
        if (amount && getPrice) {
            // const amountUSD = amount * getPrice;
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
    }

    const calculateEarnings = () => {
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
    }

    useEffect(() => {
        setActualGetPrice();
    }, [])

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
                        <p className="popup-close-text">
                            Close
                        </p>
                        <img src={closeIcon} alt="close popup" className="popup-close-btn" onClick={close}/>
                    </div>
                    <div className="popup-profit-calculator">
                        <div className="popup-profit-calculator-body">
                            <div className="profit-calculator">
                                <div className="profit-calculator-investment">
                                    <p className="popup-title">
                                        Investment
                                    </p>
                                    <div className="profit-calculator-amount">
                                        <StakeAmountContainer
                                            title={'AMOUNT'}
                                            handleCalcChange={setAmount}
                                            isGet={true}
                                            currency={' USD'}
                                            minValue={getPrice}
                                            usdtBal={0}
                                            getBal={200000}
                                            tokensForStake={amount}
                                            showMinDep={false}
                                        />
                                    </div>
                                    <div className="profit-calculator-amount">
                                        <StakeAmountContainer
                                            title={'GET TOKEN PRICE'}
                                            handleCalcChange={setGetPrice}
                                            isGet={true}
                                            currency={' USD'}
                                            usdtBal={0}
                                            getBal={10}
                                            tokensForStake={getPrice}
                                            showMinDep={false}
                                        />
                                    </div>
                                    <div className="profit-calculator-deposit">
                                        <StakeTimeContainer
                                            isL={isL}
                                            setIsL={setIsL}
                                        />
                                    </div>
                                    <div className="profit-calculator-btn-container">
                                        <button className="popup-btn" onClick={close}>BACK TO STAKING</button>
                                    </div>
                                </div>
                                <div className="profit-calculator-profit">
                                    <p className="popup-title">
                                        Profit
                                    </p>
                                    <div className="profit-calculator-item">
                                        <p className="medium-white-header">
                                            STAKE FOR
                                        </p>
                                        <p className="profit-calculator-period-value">
                                            {periodInWeeks}
                                            { periodInWeeks > 1 ? (' Weeks') : (' Week') }
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
                                        <p className="medium-white-header">
                                            DAILY EARNINGS
                                        </p>
                                        <p className="profit-calculator-earnings-amount">
                                            {dailyEarningsGet + ' GET'}
                                            <span className="profit-calculator-earnings-usd">
                                                {' | ' + dailyEarningsUSD + ' USD'}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="profit-calculator-item">
                                        <p className="medium-white-header">
                                            TOTAL EARNINGS
                                        </p>
                                        <p className="profit-calculator-earnings-amount">
                                            {totalEarningsGet + ' GET'}
                                            <span className="profit-calculator-earnings-usd">
                                                {' | ' + totalEarningsUSD + ' USD'}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="profit-calculator-item">
                                        <p className="medium-white-header">
                                            Monthly %
                                        </p>
                                        <p className="profit-calculator-earnings-amount">
                                            {monthlyProfit + '%'}
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
    )
};

export const RoiDetailPopUp = ({setIsPopUpOpen, isLocked}) => {

    const [isL, setIsL] = useState(isLocked);

    const close = () => {
        setIsPopUpOpen(false);
    }

    const changeType = () => {
        setIsL(prevState => !prevState)
    }

    return (
        <>
            <div className="popup-bg">
                <div className="popup-container">
                    <div className="popup-close">
                        <p className="popup-close-text">
                            Close
                        </p>
                        <img src={closeIcon} alt="close popup" className="popup-close-btn" onClick={close}/>
                    </div>
                    <div className="popup">
                        <div className="popup-body">
                            <div className="deposit-details-point">
                                <p className="popup-title">
                                    Monthly Profit
                                </p>
                                {isL ? (
                                    <p className="popup-title-text">
                                        Locked deposit grants higher profit percentage that can be withdrawn after your
                                        lockup period is going to pass
                                    </p>
                                ) : (
                                    <p className="popup-title-text">
                                        Non-locked deposit is a withdrawable deposit can be unstaked at any point,
                                        withdrawing any funds staked safely and securely
                                    </p>
                                )}

                            </div>
                            <div className="separator"/>
                            {isL ? (
                                <p className="popup-title-sm">
                                    PROFIT ON LOCKED DEPOSIT
                                </p>
                            ) : (
                                <p className="popup-title-sm">
                                    PROFIT ON NON-LOCKED DEPOSIT
                                </p>
                            )}

                            <div className="popup-profit-card profit-card1">

                                <div className="popup-profit-card-body">
                                    <div className="popup-profit-card-title">
                                        $25 to $5,000
                                    </div>
                                    {isL ? (
                                        <div className="popup-profit-card-percentage">
                                            28%
                                        </div>
                                    ) : (
                                        <div className="popup-profit-card-percentage">
                                            14%
                                        </div>
                                    )}

                                </div>


                                <div className="popup-profit-card profit-card2">

                                    <div className="popup-profit-card-body">
                                        <div className="popup-profit-card-title">
                                            $5,000 to $25,000
                                        </div>
                                        {isL ? (
                                            <div className="popup-profit-card-percentage">
                                                30%
                                            </div>
                                        ) : (
                                            <div className="popup-profit-card-percentage">
                                                15%
                                            </div>
                                        )}
                                    </div>


                                    <div className="popup-profit-card profit-card3">

                                        <div className="popup-profit-card-body">
                                            <div className="popup-profit-card-title">
                                                $25,000+
                                            </div>
                                            {isL ? (
                                                <div className="popup-profit-card-percentage">
                                                    37%
                                                </div>
                                            ) : (
                                                <div className="popup-profit-card-percentage">
                                                    16%
                                                </div>
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
                                { isL ? (
                                    <button className="popup-btn" onClick={changeType}>NON-LOCKED DEPOSIT</button>
                                ) : (
                                    <button className="popup-btn" onClick={changeType}>LOCKED DEPOSIT</button>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export const StakeTimeContainer = (props) => {
    let {isL, setIsL, handleCalcChange, tokensForStake} = props;

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const openPopUp = () => {
        setIsPopUpOpen(true);
    }

    return (
        <>
            {isPopUpOpen && <DepositDetailPopUp setIsPopUpOpen={setIsPopUpOpen}/>}
            <div className="stake-time-options-button">
                <div className="stake-amount-inner">
                    <div className="medium-white-header">
                        DEPOSIT OPTION
                        <img src={question} alt="details" className="question-btn" onClick={openPopUp}/>
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
    const {user} = useContext(UserContext);
    let {handleCalcChange} = props;

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
    let {isL} = props;

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const openPopUp = () => {
        setIsPopUpOpen(true);
    }

    return (
        <>
            {isPopUpOpen && <RoiDetailPopUp setIsPopUpOpen={setIsPopUpOpen} isLocked={isL}/>}
            <div className="stake-act-stats-box">
                <div className="small-grey-header">
                    Monthly
                    <img src={question} alt="details" className="question-btn" onClick={openPopUp}/>
                </div>

                <div className="big-numbers">{isL ? "28" : "14"}%</div>
            </div>
        </>
    );
};

export const StakeActMontlyRBox = (props) => {
    let {width} = useWindowDimensions();
    let {monthlyReward} = props;
    return (
        <div
            className={`stake-act-stats-box ${width > 815 ? "" : "brd-top"}`}
            style={{textAlign: `${width > 815 ? "right" : "left"}`}}
        >
            <div className="small-grey-header">Monthly reward</div>
            <div className="big-numbers">{monthlyReward} GET</div>
        </div>
    );
};

export const ReinvestToggle = (props) => {
    let {isR, setIsR, depId} = props;

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
                    <img src={require("../../assets/img/check.svg").default} alt=""/>
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
                    <TxTableBody/>
                </div>
            </div>
        </>
    );
};

export const BackButton = (props) => {
    let {cW, setCW} = props;
    return (
        <div>
            {cW === 1 || cW === 2 ? (
                <button className="back-button" onClick={() => setCW(0)}>
                    <img src={require("../../assets/img/back.svg").default} alt=""/> Back
                </button>
            ) : (
                <></>
            )}
        </div>
    );
};

export const CurrencySwitcher = (props) => {
    let {isGet, setIsGet, usdtBal, getBal, setTokensForStake} = props;

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
