import React, { useEffect, useRef } from "react";
import Slider from "react-rangeslider";

export const WithAmountSlider = (props) => {
  let {
    tokensForWith,
    isGet,
    isMain,
    usdtBalMain,
    getBalMain,
    usdtBalBonus,
    getBalBonus,
    handleWithCalcChange,
  } = props.func;

  function getMax(isG, isM, uBM, gBM, uBB, gBB) {
    if (isM) return isG ? gBM : uBM;
    else return isG ? gBB : uBB;
  }

  const inputRef = useRef(null);
  // for change of amount runs
  useEffect(() => {
    setInputWidth({ target: { value: tokensForWith } });
  }, [tokensForWith]);

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
  }

  return (
    <>
      <div className="with-slider-wrapper brd-btm">
        <div className="header-3">AMOUNT</div>
        <div className="with-slider-body">
          <div
            className="slider-header"
            onClick={() => inputRef.current.select()}
          >
            <p className="yellow-text numbers">
              {/* {fN(tokensForStake, 2)} */}
              <input
                type="number"
                value={tokensForWith}
                className="numbers yellow-text"
                onChange={(value) => {
                  let val;
                  if (isNaN(parseFloat(value.target.value))) {
                    val = "0";
                  } else {
                    val = value.target.value;
                  }

                  handleWithCalcChange(val);
                }}
                ref={inputRef}
              />
              {isGet ? " GET" : " USD"}
            </p>
          </div>
          <div className="with-slider">
            <Slider
              className="range-slider"
              min={0}
              max={getMax(
                isGet,
                isMain,
                usdtBalMain,
                getBalMain,
                usdtBalBonus,
                getBalBonus
              )}
              step={0.1}
              value={tokensForWith}
              onChange={(value) => handleWithCalcChange(value)}
              tooltip={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};
