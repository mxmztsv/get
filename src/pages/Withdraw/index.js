import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DepNetworkSelector } from "../../components/DepButton/Selectors";
import {
  SelectedNetBox,
  SelectedWalletBox,
  TotalAmountBox,
  VerifCodeBox,
  WithdrawSwitch,
} from "../../components/WithdrawButton/Elements";
import { WithAmountSlider } from "../../components/WithdrawButton/WithSlider";
import useWindowDimensions from "../../hooks/useWindow";
import { getItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";
import { BackButtonWith } from "./Elements";

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

  const [isFPage, setIsFPage] = useState(true); // is first page

  const [isGet, setIsGet] = useState(true); // is usdt withdraw selected
  const [tokensForWith, setTokensForWith] = useState(0);

  const [getBal, setGetBal] = useState(0);
  const [usdtBal, setUsdtBal] = useState(0);

  const [sDepNet, setSDepNet] = useState(0);

  const [sWallet, setSWallet] = useState("");

  async function handleWithCalcChange() {}

  return (
    <>
      <div className="dep-container-mob withdraw-container-mob">
        <div>
          <BackButtonWith isFPage={isFPage} setIsFPage={setIsFPage} />
          <div className="header-1">Withdraw</div>
          <div className="mob-container">
            {/* TOP-BUTTONS */}
            {isFPage ? (
              <>
                <WithdrawSwitch isGet={isGet} setIsGet={setIsGet} />
                <WithAmountSlider
                  func={{
                    tokensForWith,
                    isGet,
                    getBal,
                    usdtBal,
                    handleWithCalcChange,
                  }}
                />
                <div className="with-row-wrapper">
                  <DepNetworkSelector
                    sDepNet={sDepNet}
                    setSDepNet={setSDepNet}
                  />
                  <div
                    className="grey-text"
                    style={{ marginTop: "-30px", marginBottom: "25px" }}
                  >
                    Minimum withdraw amount: 100 USD
                  </div>
                </div>
              </>
            ) : (
              <>
                <TotalAmountBox totalAmount={tokensForWith} isGet={isGet} />
                <SelectedNetBox sDepNet={sDepNet} />
                <SelectedWalletBox sWallet={sWallet} />
              </>
            )}
          </div>

          {isFPage ? (
            <>
              <TotalAmountBox totalAmount={tokensForWith} isGet={isGet} />
            </>
          ) : (
            <>
              <VerifCodeBox />
            </>
          )}
        </div>
        <div
          className="withdraw-btn-mob"
          onClick={() => {
            setIsFPage(false);
          }}
        >
          <button>WITHDRAW</button>
        </div>
      </div>
    </>
  );
};
