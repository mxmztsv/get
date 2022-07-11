import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { Container } from "../../components/Container/index";
import { DepButton } from "../../components/DepButton";
import { Footer } from "../../components/Footer";
import { PendingDepositsMemo } from "../../components/PendingDeposits";
import { TxTableBodyMemo } from "../../components/TxTable";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchBalancesE } from "../../utils/EffFetchers/fetchBalancesE";
import { fetchDepositsE } from "../../utils/EffFetchers/fetchDepositE";
import { fetchTokenPriceE } from "../../utils/EffFetchers/fetchTokenPriceE";
import { fetchTxE } from "../../utils/EffFetchers/fetchTxE";
import { fN } from "../../utils/formatNumber";
import { getItem } from "../../utils/localStorage";
import { PathContext, updateNavbar } from "../../utils/PathContext";
import { tempDep } from "../../utils/tempDep";
import { UserContext } from "../../utils/UserContext";
import { DepositBox } from "./DepBox";
import { UnstakeDisclaimer } from "./Disclaimer";
import {
  BackButton,
  BalanceSwitcher,
  CurrencySwitcher,
  ProfitCalculatorPopUp,
  StakeActMontlyRBox,
  StakeActRoiBox,
  StakeAmountContainer,
  StakeTimeContainer,
  TotalEarnedBox,
  TotalStakedBox,
  UnstakeAmountContainer,
} from "./Elements";
import { handleStake } from "./handleStake";
import { handleUnstake } from "./handleUnstake";
import { SuSButtons, SuSButtonsMob } from "./SuSButtons";

export const Stake = () => {
  // auth
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getItem("token")) window.location.href = "/login";

    if (!user) {
      let user = getItem("user");
      if (!user) {
        window.location.href = "/login";
      } else {
        setUser(user);
      }
    }
  }, [navigate, setUser, user, width]);
  // ---------------

  // switchers
  const [isS, setIsS] = useState(true); // is stake button selected
  const [isL, setIsL] = useState(true); // is locked deposit
  const [cW, setCW] = useState(0); // current window. 0 - main stake. 1 - stake. 2 - unstake
  const [isMain, setIsMain] = useState(true); // is main balance selected
  const [isGet, setIsGet] = useState(false); // is get (usdt) selected
  const [isProfitCalculatorOpen, setIsProfitCalculatorOpen] = useState(false);

  // balances
  const [usdtBalMain, setUsdtBalMain] = useState(getItem("pUsdtBal") || 0);
  const [getBalMain, setGetBalMain] = useState(getItem("pGetBal") || 0);

  const [usdtBalBonus, setUsdtBalBonus] = useState(getItem("pUsdtBal4") || 0);
  const [getBalBonus, setGetBalBonus] = useState(getItem("pGetBal4") || 0);

  // helpers
  const [isLoading, setIsLoading] = useState(false);
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);

  // token
  const [tokenPrice, setTokenPrice] = useState(getItem("pTP") || 0.11);

  // stake helpers
  const [tokensForStake, setTokensForStake] = useState(usdtBalMain);
  const [roiVal, setRoiVal] = useState(12);
  const [monthlyReward, setMonthlyReward] = useState(0);

  // is reinvest on
  const [isR1, setIsR1] = useState(
    getItem(`isR${getItem("plDepId")}`) !== null
      ? getItem(`isR${getItem("plDepId")}`)
      : 1
  );
  const [isR2, setIsR2] = useState(
    getItem(`isR${getItem("pnlDepId")}`) !== null
      ? getItem(`isR${getItem("pnlDepId")}`)
      : 1
  );

  // deposits
  const [lockedDep, setLockedDep] = useState(getItem("lDep") || tempDep);
  const [nonLockedDep, setNonLockedDep] = useState(getItem("nlDep") || tempDep);

  const [pendingDeps, setPendingDeps] = useState(getItem("pendingDeps") || []);

  // tx
  const [txArr, setTxArr] = useState(getItem("txArr") || []);
  // -----------------------------------------------------

  // navbar update
  const { setNavPath } = useContext(PathContext);
  useEffect(() => {
    updateNavbar("stake", setNavPath);
  }, []);
  // ------------------------------------

  // balance fetch
  useEffect(() => {
    console.log("[Stake] fetching balances");
    fetchBalancesE(
      setUsdtBalMain,
      setGetBalMain,
      setUsdtBalBonus,
      setGetBalBonus
    );
  }, [isNeedUpdate]);
  // ------------------------------------

  // token price fetch
  useEffect(() => {
    console.log("[Stake] fetching token price");
    fetchTokenPriceE(setTokenPrice);
  }, [isNeedUpdate]);
  // ------------------------------------

  // deposits fetch
  useEffect(() => {
    console.log("[Stake] fetching deposits");
    fetchDepositsE(setLockedDep, setNonLockedDep, setPendingDeps);
  }, [isNeedUpdate]);
  // ------------------------------------

  // tx fetch
  useEffect(() => {
    console.log("[Stake] fetching transactions");
    fetchTxE(setTxArr);
  }, [isNeedUpdate]);
  // ------------------------------------

  // update view
  useEffect(() => {
    handleCalcChange(tokensForStake);
  }, [isGet, roiVal, tokensForStake, tokenPrice, isL, isNeedUpdate]);
  // ------------------------------------

  function handleCalcChange(value) {
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

    console.log("[Stake] token price:", tokenPrice);

    setTokensForStake(fN(value, 2));
    let usdVal = isGet ? value * tokenPrice : value;
    let getVal = isGet ? value : tokensForStake / tokenPrice;

    if (isL) {
      // locked
      if (usdVal < 5000) {
        setRoiVal(28);
      } else if (usdVal < 25000) {
        setRoiVal(30);
      } else {
        setRoiVal(37);
      }
    } else {
      // non-locked
      if (usdVal < 5000) {
        setRoiVal(14);
      } else if (usdVal < 25000) {
        setRoiVal(15);
      } else {
        setRoiVal(16);
      }
    }

    console.log("[Stake] monthly reward:", fN(getVal * (roiVal / 100), 2));
    // @ts-ignore
    setMonthlyReward(fN(getVal * (roiVal / 100), 2) || 0);
  }

  return (
    <>
      {isProfitCalculatorOpen && (
        <ProfitCalculatorPopUp setIsPopUpOpen={setIsProfitCalculatorOpen} />
      )}
      <div className="container-with-footer">
        {width > 815 ? (
          <Container>
            <div className="stake-container">
              <DepButton />
              <div className="desktop-body-wrapper">
                {/* LEFT */}
                <div className="left-side-wrapper">
                  {/* LEFT-TOP */}
                  <div className="left-top">
                    <div className="stake-header-wrapper">
                      <TotalStakedBox
                        totalStaked1={lockedDep.getAmount}
                        totalStaked2={nonLockedDep.getAmount}
                      />
                      <TotalEarnedBox
                        totalEarned1={lockedDep.totalEarned}
                        totalEarned2={nonLockedDep.totalEarned}
                        tokenPrice={tokenPrice}
                      />
                    </div>
                  </div>

                  {/* LEFT-BODY */}
                  <div
                    className="left-body brd-btm"
                    style={{ paddingBottom: "25px", marginBottom: "25px" }}
                  >
                    <DepositBox
                      dep={lockedDep}
                      isLocked={true}
                      isR={isR1}
                      setIsR={setIsR1}
                      tokenPrice={tokenPrice}
                    />

                    <DepositBox
                      dep={nonLockedDep}
                      isLocked={false}
                      isR={isR2}
                      setIsR={setIsR2}
                      tokenPrice={tokenPrice}
                    />
                  </div>

                  {/* LEFT-FOOTER */}
                  <div className="left-footer">
                    <div className="dash-tx-header header-2">Transactions</div>
                    <TxTableBodyMemo txArray={txArr} />
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className={`right-side-wrapper ${
                    pendingDeps.length ? "right-side-update-height" : ""
                  }`}
                >
                  {/* STAKE-HEADER */}
                  <div className="stake-header-container">
                    {/* HEADER-TEXT */}
                    <div className="stake-header-text header-2"> I want to</div>

                    {/* HEADER-BODY */}
                    <div className="stake-header-body">
                      <SuSButtons setIsS={setIsS} isS={isS} />

                      {isS ? (
                        <>
                          {/* HEADER-DEPOSIT-OPTION */}
                          <div className="header-deposit-options">
                            <BalanceSwitcher
                              isGet={isGet}
                              isMain={isMain}
                              setIsMain={setIsMain}
                              usdtBalMain={usdtBalMain}
                              getBalMain={getBalMain}
                              usdtBalBonus={usdtBalBonus}
                              getBalBonus={getBalBonus}
                              setTokens={setTokensForStake}
                            />
                            <CurrencySwitcher
                              isGet={isGet}
                              isMain={isMain}
                              setIsGet={setIsGet}
                              usdtBalMain={usdtBalMain}
                              getBalMain={getBalMain}
                              usdtBalBonus={usdtBalBonus}
                              getBalBonus={getBalBonus}
                              setTokensForStake={setTokensForStake}
                            />
                            <StakeAmountContainer
                              handleCalcChange={handleCalcChange}
                              isGet={isGet}
                              isMain={isMain}
                              tokensForStake={tokensForStake}
                              usdtBalMain={usdtBalMain}
                              getBalMain={getBalMain}
                              usdtBalBonus={usdtBalBonus}
                              getBalBonus={getBalBonus}
                            />
                            <StakeTimeContainer
                              isL={isL}
                              setIsL={setIsL}
                              handleCalcChange={handleCalcChange}
                              tokensForStake={tokensForStake}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          {/* UNSTAKE-CONTAINER */}
                          <div className="unstake-container">
                            <UnstakeAmountContainer
                              nlDepAmount={nonLockedDep.getAmount}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* STAKE-BODY */}
                  <div className="stake-body-container">
                    {isS ? (
                      <>
                        <div className="stake-action-stats-container">
                          <StakeActRoiBox roiVal={roiVal} isL={isL} />
                          <StakeActMontlyRBox monthlyReward={monthlyReward} />
                        </div>
                      </>
                    ) : (
                      <>
                        <UnstakeDisclaimer />
                      </>
                    )}
                  </div>

                  {/* STAKE-FOOTER */}
                  <div className="stake-footer">
                    <div className="stake-upper-footer">
                      {isS ? (
                        <button
                          className="stake-footer-btn yellow-trans-btn"
                          // onClick={() => toastC("Coming Soon")}
                          onClick={() => {
                            setIsProfitCalculatorOpen(
                              (prevState) => !prevState
                            );
                          }}
                        >
                          PROFIT CALCULATOR
                        </button>
                      ) : (
                        <></>
                      )}

                      <button
                        disabled={!user}
                        style={{ margin: "20px", marginRight: "0" }}
                        onClick={async () => {
                          setIsLoading(true);

                          try {
                            if (isS) {
                              await handleStake(
                                tokensForStake,
                                isL,
                                isGet,
                                setIsNeedUpdate,
                                tokenPrice,
                                isMain
                              );
                            } else {
                              await handleUnstake(
                                nonLockedDep.depId,
                                nonLockedDep.getAmount,
                                setIsNeedUpdate
                              );
                            }
                          } catch (e) {
                            console.log("[Stake] stake:", e);
                          }

                          setIsLoading(false);
                        }}
                      >
                        {isLoading ? (
                          <div>
                            <SyncLoader
                              color="black"
                              size={10}
                              speedMultiplier={0.5}
                            />
                          </div>
                        ) : (
                          "COMPLETE"
                        )}
                      </button>
                    </div>

                    {!isS ? (
                      <PendingDepositsMemo
                        depsArr={pendingDeps}
                        setIsNeedUpdate={setIsNeedUpdate}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        ) : (
          <>
            <SuSButtonsMob
              cW={cW}
              setCW={setCW}
              handleStake={handleStake}
              handleStakeHelpers={{
                tokensForStake,
                isL,
                isGet,
                setIsNeedUpdate,
              }}
              tokenPrice={tokenPrice}
              isMain={isMain}
              handleUnstake={handleUnstake}
              nonLockedDep={nonLockedDep}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <div
              className="stake-container-mob"
              style={{ marginTop: `${cW === 1 || cW === 2 ? "9vh" : "13vh"}` }}
            >
              {/* HEADER */}
              <BackButton cW={cW} setCW={setCW} />
              <div className="stake-page-header header-1">
                {cW === 0 ? "Staking" : cW === 1 ? "Stake" : "Unstake"}
              </div>

              {/* BODY  */}
              <div className="mob-container">
                {cW === 0 ? (
                  <>
                    {/* MAIN-PAGE */}
                    <div className="brd-btm">
                      <TotalStakedBox
                        totalStaked1={lockedDep.getAmount}
                        totalStaked2={nonLockedDep.getAmount}
                      />
                      <TotalEarnedBox
                        totalEarned1={lockedDep.totalEarned}
                        totalEarned2={nonLockedDep.totalEarned}
                        tokenPrice={tokenPrice}
                      />
                    </div>

                    <div className="stake-mob-body-wrapper">
                      <DepositBox
                        dep={lockedDep}
                        isLocked={true}
                        isR={isR1}
                        setIsR={setIsR1}
                        tokenPrice={tokenPrice}
                      />

                      <DepositBox
                        dep={nonLockedDep}
                        isLocked={false}
                        isR={isR2}
                        setIsR={setIsR2}
                        tokenPrice={tokenPrice}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {cW === 1 ? (
                      <>
                        {/* STAKE-PAGE */}
                        <BalanceSwitcher
                          isGet={isGet}
                          isMain={isMain}
                          setIsMain={setIsMain}
                          usdtBalMain={usdtBalMain}
                          getBalMain={getBalMain}
                          usdtBalBonus={usdtBalBonus}
                          getBalBonus={getBalBonus}
                          setTokens={setTokensForStake}
                        />
                        <CurrencySwitcher
                          isGet={isGet}
                          isMain={isMain}
                          setIsGet={setIsGet}
                          usdtBalMain={usdtBalMain}
                          getBalMain={getBalMain}
                          usdtBalBonus={usdtBalBonus}
                          getBalBonus={getBalBonus}
                          setTokensForStake={setTokensForStake}
                        />
                        <StakeAmountContainer
                          handleCalcChange={handleCalcChange}
                          isGet={isGet}
                          isMain={isMain}
                          tokensForStake={tokensForStake}
                          usdtBalMain={usdtBalMain}
                          getBalMain={getBalMain}
                          usdtBalBonus={usdtBalBonus}
                          getBalBonus={getBalBonus}
                        />
                        <StakeTimeContainer
                          isL={isL}
                          setIsL={setIsL}
                          handleCalcChange={handleCalcChange}
                          tokensForStake={tokensForStake}
                        />
                        <button
                            // className="stake-footer-btn yellow-trans-btn"
                            className="popup-btn"
                            onClick={() => {
                              setIsProfitCalculatorOpen(
                                  (prevState) => !prevState
                              );
                            }}
                        >
                          PROFIT CALCULATOR
                        </button>
                      </>
                    ) : (
                      <>
                        {/* UNSTAKE-PAGE  */}
                        <UnstakeAmountContainer
                          nlDepAmount={nonLockedDep.getAmount}
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              {/* FOOTER */}
              <div className="stake-footer-mob">
                {cW === 0 ? (
                  <>
                    {/* MAIN-PAGE */}
                    <TxTableBodyMemo txArray={txArr} />
                  </>
                ) : cW === 1 ? (
                  <>
                    {/* STAKE-PAGE */}
                    <StakeActRoiBox roiVal={roiVal} isL={isL} />
                    <StakeActMontlyRBox monthlyReward={monthlyReward} />
                  </>
                ) : (
                  <>
                    {/* UNSTAKE-PAGE  */}
                    <UnstakeDisclaimer />
                    <PendingDepositsMemo
                      depsArr={pendingDeps}
                      setIsNeedUpdate={setIsNeedUpdate}
                    />
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};
