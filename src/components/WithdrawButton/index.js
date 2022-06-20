import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindow";
import { BalanceSwitcher } from "../../pages/Stake/Elements";
import { fetchBalancesE } from "../../utils/EffFetchers/fetchBalancesE";
import { fetchTokenPriceE } from "../../utils/EffFetchers/fetchTokenPriceE";
import { fN } from "../../utils/formatNumber";
import { getItem } from "../../utils/localStorage";
import { toastC } from "../../utils/toastC";
import { UserContext } from "../../utils/UserContext";
import { CloseButton } from "../CloseButton";
import { DepNetworkSelector } from "../DepButton/Selectors";
import {
  SelectedNetBox,
  SelectedWalletBox,
  TotalAmountBox,
  VerifCodeBox,
  WithdrawSwitch,
  WithFooter,
} from "./Elements";
import { WithAmountSlider } from "./WithSlider";

export const WithdrawButton = (props) => {
  const { user } = useContext(UserContext);
  const { width } = useWindowDimensions();

  const navigate = useNavigate();

  const [isW, setIsW] = useState(false); // is withdraw modal visiblej
  const [isGet, setIsGet] = useState(true); // is usdt withdraw selected
  const [isMain, setIsMain] = useState(true); // is main balance selected
  const [isFPage, setIsFPage] = useState(true); // is first page

  const [tokensForWith, setTokensForWith] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(getItem("pTP") || 0.11);

  const [isNeedUpdate, setIsNeedUpdate] = useState(false);

  // balances
  const [usdtBalMain, setUsdtBalMain] = useState(getItem("pUsdtBal") || 0);
  const [getBalMain, setGetBalMain] = useState(getItem("pGetBal") || 0);

  const [usdtBalBonus, setUsdtBalBonus] = useState(getItem("pUsdtBal4") || 0);
  const [getBalBonus, setGetBalBonus] = useState(getItem("pGetBal4") || 0);

  let walletsArr = [getItem("ercWal"), getItem("bepWal"), getItem("trcWal")];
  const [sDepNet, setSDepNet] = useState(
    walletsArr[0] ? 0 : walletsArr[1] ? 1 : 2
  );

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
    console.log("[WithdrawModal] fetching token price");
    fetchTokenPriceE(setTokenPrice);
  }, []);
  // ------------------------------------

  // balance fetch
  useEffect(() => {
    console.log("[WithdrawMobile] fetching balances");
    fetchBalancesE(
      setUsdtBalMain,
      setGetBalMain,
      setUsdtBalBonus,
      setGetBalBonus
    );
  }, [user, isNeedUpdate]);
  // ------------------------------------

  return (
    <>
      <div
        className="with-button-container"
        style={{ marginLeft: `${width > 815 ? "10px" : "0"}` }}
      >
        <button
          onClick={() => {
            if (
              getItem("ercWal") === "" &&
              getItem("bepWal") === "" &&
              getItem("trcWal") === ""
            ) {
              toastC("Please add withdrawal wallet(-s) first", 1);
              return;
            } else if (width > 815 && !user) {
              navigate("/login", { replace: true });
            } else if (width > 815 && user) {
              setIsW(true); // show w modal
            } else {
              if (props.setSArr) props.setSArr([false, false, false, false]);
              navigate("/withdraw");
            }
          }}
          className="transparent-button yellow-trans-btn"
        >
          WITHDRAW
        </button>
      </div>

      {isW ? (
        <>
          <div className="dep-modal-container">
            <div className="dep-modal-content">
              <CloseButton setFunc={setIsW} />
              <div className="with-modal-wrapper">
                <div className="with-content-container">
                  <div className="with-modal-body">
                    <div className="header-2 with-header">Withdraw</div>

                    {isFPage ? (
                      <>
                        {/* FIRST-PAGE */}
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
                        {/* SECOND-PAGE */}
                        <div className="with-s-page-wrapper">
                          <TotalAmountBox
                            totalAmount={tokensForWith}
                            isGet={isGet}
                            isMain={isMain}
                            tokenPrice={tokenPrice}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {isFPage ? (
                    <></>
                  ) : (
                    <>
                      <SelectedNetBox sDepNet={sDepNet} />
                      <SelectedWalletBox sWallet={walletsArr[sDepNet]} />
                      <VerifCodeBox />
                    </>
                  )}

                  <WithFooter
                    isFPage={isFPage}
                    setIsFPage={setIsFPage}
                    tokensForWith={tokensForWith}
                    tokenPrice={tokenPrice}
                    isGet={isGet}
                    setIsW={setIsW}
                    isMain={isMain}
                    setIsNeedUpdate={setIsNeedUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
