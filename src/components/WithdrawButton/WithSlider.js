import Slider from "react-rangeslider";
import { fN } from "../../utils/formatNumber";

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
    if (isM) {
      return isG ? gBM : uBM;
    } else {
      return isG ? gBB : uBB;
    }
  }

  return (
    <>
      <div className="with-slider-wrapper brd-btm">
        <div className="header-3">AMOUNT</div>
        <div className="with-slider-body">
          <div className="slider-header">
            <p className="yellow-text numbers">
              {fN(tokensForWith, 2)}
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
