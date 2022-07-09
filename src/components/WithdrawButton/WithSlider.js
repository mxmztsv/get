import React, { useEffect, useRef } from "react";
import Slider from "react-rangeslider";
import { setInputWidth } from "../../utils/setInputWidth";

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

  // update input width
  useEffect(() => {
    setInputWidth(
      inputRef,
      { target: { value: tokensForWith } },
      isMain,
      isGet,
      getBalMain,
      usdtBalMain,
      getBalBonus,
      usdtBalBonus
    );
  }, [tokensForWith]);

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
