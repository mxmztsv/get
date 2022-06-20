import useWindowDimensions from "../../hooks/useWindow";
import { fN } from "../../utils/formatNumber";

const InnerBalBox = (props) => {
  const { width } = useWindowDimensions();
  let { isGet, usdtBal, getBal, tokenPrice } = props;

  function getBalance(iG, uB, gB) {
    let result;
    if (iG) {
      if (gB !== "") {
        result = fN(gB, 2) + " GET";
      } else {
        result = "0 GET";
      }
    } else {
      if (uB !== "") {
        result = fN(uB, 2) + " USD";
      } else {
        result = "0 USD";
      }
    }
    return result;
  }

  function getUsd(gB, tP) {
    return fN(gB * tP, 2);
  }

  return (
    <div
      className="balance-box"
      style={{ marginRight: `${!isGet && width < 815 ? "0px" : "10px"}` }}
    >
      <div className="dash-bal-box-header">
        {isGet ? (
          <>
            <img
              src={require("../../assets/img/get-icon.svg").default}
              alt=""
            />
            GET
          </>
        ) : (
          <>
            <img
              src={require("../../assets/img/usd-icon.svg").default}
              alt=""
            />
            USD
          </>
        )}
      </div>
      <div className="brd-btm"></div>
      <div
        className="bal-box-body"
        style={{
          fontSize: `${usdtBal > 99999 || getBal > 99999 ? "14px" : "17px"}`,
        }}
      >
        {getBalance(isGet, usdtBal, getBal)}
      </div>

      {tokenPrice && isGet ? (
        <div className="dash-box-footer grey-text">
          {getUsd(getBal, tokenPrice)} USD
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export const BalanceBox = (props) => {
  let { usdtBal, getBal, bonus, tokenPrice } = props;
  return (
    <>
      <div
        className="dash-box balance-box-container"
        style={{ marginRight: `${!bonus ? "5px" : 0}` }}
      >
        <div className="dash-box-header">
          {bonus ? "Bonus" : "Main"} balance
        </div>

        <div className="dash-bal-container">
          <InnerBalBox isGet={true} getBal={getBal} tokenPrice={tokenPrice} />
          <InnerBalBox isGet={false} usdtBal={usdtBal} />
        </div>
      </div>
    </>
  );
};
