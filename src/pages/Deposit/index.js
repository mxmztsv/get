import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DepCCInfoBody,
  DepDescription,
  DepWalletBox,
} from "../../components/DepButtons/InfoElems";
import { DepNetworkSelector } from "../../components/DepButtons/Selectors";
import useWindowDimensions from "../../hooks/useWindow";
import { getItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";
import { fetchAddrs } from "./fetchAddrs";

export const Deposit = () => {
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
  // ---------------

  // vars
  const [isC, setIsC] = useState(true); // is crypto deposit selected

  const [sDepCoin, setSDepCoin] = useState(0); // selected deposit coin
  const [sDepNet, setSDepNet] = useState(0); // selected deposit network
  const [depWallet, setDepWallet] = useState(""); // dep wallet

  const [isCop, setIsCop] = useState(false); // is copied address
  // ------------------------------------

  // fetch addrs
  useEffect(() => {
    if (!getItem("addrs")) {
      fetchAddrs(sDepNet, setDepWallet);
    } else {
      let addrs = getItem("addrs");
      if (sDepNet === 0) setDepWallet(addrs.bep20);
      if (sDepNet === 1) setDepWallet(addrs.erc20);
      if (sDepNet === 2) setDepWallet(addrs.trc20);
    }
  }, [sDepNet]);
  // -----------------------------------

  return (
    <>
      <div className="dep-container-mob">
        <div className="header-1">Deposit</div>
        <div className="mob-container">
          {/* CRYPTO-CASH-BUTTONS */}
          <div className="stake-header-buttons-container brd-btm dep-buttons-mob">
            <div className="double-button-container">
              <button
                className={`trans-btn-mob ${isC ? "s-trans-btn-mob" : ""}`}
                onClick={() => {
                  setIsC(true);
                }}
              >
                <p>With Crypto</p>
              </button>
              <button
                className={`trans-btn-mob ${!isC ? "s-trans-btn-mob" : ""}`}
                onClick={() => {
                  setIsC(false);
                }}
                disabled={true}
              >
                <p>With Card</p>
              </button>
            </div>
          </div>

          {isC ? (
            <>
              {/* CRYPTO-DEP-CONTENT */}
              <div className="dep-header header-2">Cryptocurrency Deposit</div>
              <DepDescription />

              {/* <DepCoinsSelector sDepCoin={sDepCoin} setSDepCoin={setSDepCoin} /> */}
              <DepNetworkSelector sDepNet={sDepNet} setSDepNet={setSDepNet} />

              <DepCCInfoBody sDepNet={sDepNet} sDepCoin={sDepCoin} />
              <DepWalletBox
                depWallet={depWallet}
                isC={isCop}
                setIsC={setIsCop}
              />
            </>
          ) : (
            <>
              {/* CARD-DEP-CONTENT */}
              <div className="dep-header header-2">Card Deposit</div>
              <div className="description">The payment gate fee is 7%</div>
              <br />
            </>
          )}
        </div>
        {!isC ? (
          <>
            <div className="dep-button-container-mob">
              <button>DEPOSIT</button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
