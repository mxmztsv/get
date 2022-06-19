import Slider from "react-rangeslider";

export const WithAmountSlider = (props) => {
  let { tokensForWith, isGet, getBal, usdtBal, handleWithCalcChange } =
    props.func;

  return (
    <>
      <div className="with-slider-wrapper brd-btm">
        <div className="header-3">AMOUNT</div>
        <div className="with-slider-body">
          <div className="slider-header">
            <p className="yellow-text numbers">
              {tokensForWith}
              {isGet ? " GET" : " USDT"}
            </p>
          </div>
          <div className="with-slider">
            <Slider
              className="range-slider"
              min={0}
              max={isGet ? getBal : usdtBal}
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
