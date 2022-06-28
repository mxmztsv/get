import { useState } from "react";
import Slider from "react-rangeslider";
import closeIcon from "../../assets/img/close.svg";
import question from "../../assets/img/question.svg";

// STAKE ACT CONT
export const StakeAmountContainer = (props) => {
  let {
    handleCalcChange,
    isGet,
    usdtBal,
    getBal,
    tokensForStake,
    title = "YOUR INVESTEMENT",
    showMinDep = true,
    currency = null, // using for profit calculator. The component will based on isGet if null
    minValue = null,
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
                {currency ? currency : isGet ? " GET" : " USDT"}
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
          <div className="medium-white-header">
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
              }}
            >
              <p>Locked</p>
            </button>
            <button
              className={`${!isL ? "" : "unselected-button"}`}
              onClick={() => {
                setIsL(false);
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
                BACK TO CALCULATOR
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
