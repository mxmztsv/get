import useWindowDimensions from "../../hooks/useWindow";
import { coinsArr, netArr, netArrMobile } from "../../utils/depArrs";

export const DepCoinsSelector = (props) => {
  let { sDepCoin, setSDepCoin } = props;
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
    <div className="dep-coins-selector-wrapper brd-btm">
      <div className="header-3">SELECT CRYPTO</div>
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
  let { sDepNet, setSDepNet } = props;

  const DepNetworkButton = (props) => {
    let { num } = props;

    let name = width > 815 ? netArr[num] : netArrMobile[num];

    return (
      <>
        <div
          className={`dep-coin-btn ${sDepNet === num ? "s-dep-button" : ""}`}
          onClick={() => setSDepNet(num)}
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
          <DepNetworkButton num={0} />
          <DepNetworkButton num={1} />
          <DepNetworkButton num={2} />
        </div>
      </div>
    </>
  );
};
