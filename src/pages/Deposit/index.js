import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { CardDepositBody } from "../../components/DepButton/CardDepositBody";
import { handleCardDeposit } from "../../components/DepButton/handleCardDeposit";
import {
  DepCCInfoBody,
  DepDescription,
  DepWalletBox,
} from "../../components/DepButton/InfoElems";
import { DepNetworkSelector } from "../../components/DepButton/Selectors";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchAddrs } from "../../utils/fetchers/fetchAddrs";
import { getItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";

export const Deposit = () => {
  // auth
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  useEffect(() => {
    if (!getItem("token")) window.location.href = "/login";

    if (width > 815) navigate("/dashboard"); // only mobile

    if (!user) {
      let user = getItem("user");
      if (!user) {
        window.location.href = "/login";
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
  const [usdToDeposit, setUsdToDeposit] = useState(100);

  const [isLoading, setIsLoading] = useState(false);
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
                style={{ marginRight: "5px" }}
                className={`trans-btn-mob ${!isC ? "s-trans-btn-mob" : ""}`}
                onClick={() => {
                  setIsC(false);
                }}
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
              <CardDepositBody
                usdToDeposit={usdToDeposit}
                setUsdToDeposit={setUsdToDeposit}
              />
            </>
          )}
        </div>
        {!isC ? (
          <>
            <div className="dep-button-container-mob">
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await handleCardDeposit(usdToDeposit);
                  setIsLoading(false);
                }}
              >
                {isLoading ? (
                  <div>
                    <SyncLoader color="black" size={10} speedMultiplier={0.5} />
                  </div>
                ) : (
                  "TOP UP"
                )}
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
