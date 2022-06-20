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
import { fetchTokenPriceE } from "../../utils/EffFetchers/fetchTokenPriceE";
import { fN } from "../../utils/formatNumber";
import { getItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";
import { BalanceSwitcher } from "../Stake/Elements";
import { BackButtonWith, WithFooterMob } from "./Elements";

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
        window.location.href = "/login";
      } else {
        setUser(user);
      }
    }
  }, [user, width]);
  //  ---------------

  const [isGet, setIsGet] = useState(true); // is usdt withdraw selected
  const [isMain, setIsMain] = useState(true); // is main balance selected
  const [isFPage, setIsFPage] = useState(true); // is first page

  const [tokensForWith, setTokensForWith] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(getItem("pTP") || 0.11);

  // balances
  const [usdtBalMain, setUsdtBalMain] = useState(getItem("pUsdtBal") || 0);
  const [getBalMain, setGetBalMain] = useState(getItem("pGetBal") || 0);

  const [usdtBalBonus, setUsdtBalBonus] = useState(getItem("pUsdtBal4") || 0);
  const [getBalBonus, setGetBalBonus] = useState(getItem("pGetBal4") || 0);

  const [sDepNet, setSDepNet] = useState(0);

  let walletsArr = [getItem("ercWal"), getItem("bepWal"), getItem("trcWal")];

  async function handleWithCalcChange(value) {
    if (value.target) {
      value = parseFloat(value.target.value);
    }

    if (isMain) {
      if (isGet && value > getBalMain) return;
      if (!isGet && value > usdtBalMain) return;
      if (value > 10000000) return;
    } else {
      if (isGet && value > getBalBonus) return;
      if (!isGet && value > usdtBalBonus) return;
      if (value > 10000000) return;
    }

    // @ts-ignore
    setTokensForWith(fN(value, 2));
  }

  // token price fetch
  useEffect(() => {
    console.log("[WithdrawPage] fetching token price");
    fetchTokenPriceE(setTokenPrice);
  }, []);
  // ------------------------------------

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
                <BalanceSwitcher
                  isGet={isGet}
                  isMain={isMain}
                  setIsMain={setIsMain}
                  usdtBalMain={usdtBalMain}
                  getBalMain={getBalMain}
                  usdtBalBonus={usdtBalBonus}
                  getBalBonus={getBalBonus}
                  setTokens={setTokensForWith}
                  noHeader
                />

                <WithdrawSwitch
                  isGet={isGet}
                  setIsGet={setIsGet}
                  isMain={isMain}
                  usdtBalMain={usdtBalMain}
                  getBalMain={getBalMain}
                  usdtBalBonus={usdtBalBonus}
                  getBalBonus={getBalBonus}
                  setTokensForWith={setTokensForWith}
                />

                <WithAmountSlider
                  func={{
                    tokensForWith,
                    isGet,
                    isMain,
                    usdtBalMain,
                    getBalMain,
                    usdtBalBonus,
                    getBalBonus,
                    handleWithCalcChange,
                  }}
                />

                <div className="with-row-wrapper">
                  <DepNetworkSelector
                    sDepNet={sDepNet}
                    setSDepNet={setSDepNet}
                    walletsArr={walletsArr}
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
                <TotalAmountBox
                  totalAmount={tokensForWith}
                  isGet={isGet}
                  isMain={isMain}
                  tokenPrice={tokenPrice}
                />
                <SelectedNetBox sDepNet={sDepNet} />
                <SelectedWalletBox sWallet={walletsArr[sDepNet]} />
              </>
            )}
          </div>

          {isFPage ? (
            <>
              <TotalAmountBox
                totalAmount={tokensForWith}
                isGet={isGet}
                tokenPrice={tokenPrice}
                isFPage
              />
            </>
          ) : (
            <>
              <VerifCodeBox />
            </>
          )}
        </div>
        <WithFooterMob
          isFPage={isFPage}
          setIsFPage={setIsFPage}
          tokensForWith={tokensForWith}
          tokenPrice={tokenPrice}
          isGet={isGet}
          isMain={isMain}
        />
      </div>
    </>
  );
};
