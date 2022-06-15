import useWindowDimensions from "../../hooks/useWindow";

const InnerBalBox = (props) => {
  const { width } = useWindowDimensions();
  let { isGet, usdtBal, getBal, tokenPrice } = props;

  function getBalance(iG, uB, gB) {
    let result;
    if (iG) {
      if (gB !== "") {
        result = Math.round(gB * 100) / 100 + " GET";
      } else {
        result = "0 GET";
      }
    } else {
      if (uB !== "") {
        result = Math.round(uB * 100) / 100 + " USDT";
      } else {
        result = "0 USDT";
      }
    }
    return result;
  }

  function getUsd(gB, tP) {
    return Math.round(gB * tP * 100) / 100;
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
            USDT
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
