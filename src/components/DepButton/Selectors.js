import useWindowDimensions from "../../hooks/useWindow";
import { coinsArr, netArr, netArrMobile } from "../../utils/depArrs";
import { toastC } from "../../utils/toastC";

export const DepCoinsSelector = (props) => {
  let { sDepCoin, setSDepCoin, isWith } = props;
  const DepCoinBtn = (props) => {
    let { num } = props;
    let name = coinsArr[num];
    return (
      <>
        <div
          className={`dep-coin-btn ${sDepCoin === num ? "s-dep-button" : ""}`}
          onClick={() => setSDepCoin(num)}
        >
          <button>{name}</button>
        </div>
      </>
    );
  };

  return (
    <div className={`dep-coins-selector-wrapper ${isWith ? "" : "brd-btm"}`}>
      <div className="dep-coins-selector">
        <DepCoinBtn num={0} />
        <DepCoinBtn num={1} />
        <DepCoinBtn num={2} />
        <DepCoinBtn num={3} />
      </div>
    </div>
  );
};

export const DepNetworkSelector = (props) => {
  const { width } = useWindowDimensions();
  let { sDepNet, setSDepNet, walletsArr } = props;

  const DepNetworkButton = (props) => {
    let { num, walletsArr } = props;

    let name = width > 815 ? netArr[num] : netArrMobile[num];

    return (
      <>
        <div
          className={`dep-coin-btn ${sDepNet === num ? "s-dep-button" : ""}`}
          onClick={() => {
            if (walletsArr && walletsArr.length && walletsArr[num] !== "") {
              setSDepNet(num);
            } else if (
              walletsArr &&
              walletsArr.length &&
              walletsArr[num] === ""
            ) {
              toastC(`You need to add ${netArrMobile[num]} wallet first`, 1);
              return;
            } else {
              setSDepNet(num);
            }
          }}
        >
          <button>{name}</button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="dep-coins-selector-wrapper">
        <div className="header-3">SELECT NETWORK</div>
        <div className="dep-coins-selector">
          {walletsArr ? (
            <>
              <DepNetworkButton num={0} walletsArr={walletsArr} />
              <DepNetworkButton num={1} walletsArr={walletsArr} />
              <DepNetworkButton num={2} walletsArr={walletsArr} />
            </>
          ) : (
            <>
              <DepNetworkButton num={0} />
              <DepNetworkButton num={1} />
              <DepNetworkButton num={2} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
