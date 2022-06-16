import React, { useContext, useEffect, useState } from "react";
import Slider from "react-rangeslider";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindow";
import { getItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";

export const Withdraw = () => {
  // auth
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    if (width > 815) navigate("/dashboard"); // only mobile

    if (!user) {
      let user = getItem("user");
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    }
  }, [user, width]);
  //  ---------------

  const [isF, setIsF] = useState(true); // is first coin selected

  const [ethBal, setEthBal] = useState(40.0348);
  const [ethPrice, setEthPrice] = useState(1700);
  const [usdtBal, setUsdtBal] = useState(12030);

  const [tokensForWithdraw, setTokenForWithdraw] = useState(ethBal);

  const [toWithAddr, setToWithAddr] = useState("");

  function handleCalcChange(val) {
    console.log(val);
  }

  function handleAddrChange(event) {
    setToWithAddr(event.target.value);
  }

  return (
    <>
      <div className="dep-container-mob withdraw-container-mob">
        <div>
          <div className="header-1">Withdraw</div>
          <div className="mob-container">
            {/* TOP-BUTTONS */}
            <div className="with-coins-container">
              <div
                className={`dash-box with-coin-box ${
                  isF ? "s-with-coin-box" : ""
                }`}
                onClick={() => {
                  setIsF(true);
                }}
              >
                <div className="small-grey-header">Ethereum balance</div>
                <div className="dash-box-body">{ethBal} ETH</div>
                <div className="dash-box-footer grey-text">
                  {(Math.round(ethBal * ethPrice * 100) / 100).toLocaleString(
                    "en-US"
                  )}{" "}
                  USD
                </div>
              </div>
              <div
                className={`dash-box with-coin-box ${
                  !isF ? "s-with-coin-box" : ""
                }`}
                style={{ marginRight: "0" }}
                onClick={() => {
                  setIsF(false);
                }}
              >
                <div className="small-grey-header">USDT balance</div>
                <div className="dash-box-body">{usdtBal} USDT</div>
                <div className="dash-box-footer grey-text">
                  {(Math.round(usdtBal * 100) / 100).toLocaleString("en-US")}{" "}
                  USD
                </div>
              </div>
            </div>

            {/* AMOUNT  */}
            <div className="amount-container-mob">
              <div className="small-grey-header">Amount</div>
              <div className="amount-input-mob">
                <input type="number" value={tokensForWithdraw} />
                <div className="max-button">MAX</div>
              </div>
            </div>
            <div className="small-grey-header with-sub-amount">
              {isF
                ? Math.round(tokensForWithdraw * ethPrice).toLocaleString(
                    "en-US"
                  )
                : tokensForWithdraw.toLocaleString("en-US")}{" "}
              USD
            </div>

            {/* AMOUNT-SLIDER */}
            <div className="amount-slider-mob brd-btm">
              {/* SLIDER */}
              <Slider
                className="range-slider"
                min={10}
                max={user ? user.balance : 100_000}
                step={1}
                value={tokensForWithdraw}
                onChange={(value) => {
                  handleCalcChange({
                    tokens: value,
                    months: -1,
                  });
                }}
                tooltip={false}
              />
            </div>

            {/* WALLET-ADDRESS */}
            <div className="with-addr-container">
              <div className="small-grey-header">Wallet Address</div>
              <div className="with-addr-input-container">
                <div className="amount-input-mob">
                  <input
                    type="text"
                    value={toWithAddr}
                    onChange={(event) => handleAddrChange(event)}
                  />
                  <div className="max-button">Paste</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="withdraw-btn-mob">
          <button>WITHDRAW</button>
        </div>
      </div>
    </>
  );
};
