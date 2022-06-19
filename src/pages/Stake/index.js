import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { Container } from "../../components/Container/index";
import { DepButton } from "../../components/DepButton";
import { TxTableBodyMemo } from "../../components/TxTable";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchTokenPriceE } from "../../utils/EffFetchers/fetchTokenPriceE";
import { fetchTxE } from "../../utils/EffFetchers/fetchTxE";
import { fetchBalances } from "../../utils/fetchBalances";
import { fetchDeposits } from "../../utils/fetchDeposits";
import { getItem, setItem } from "../../utils/localStorage";
import { PathContext, updateNavbar } from "../../utils/PathContext";
import { UserContext } from "../../utils/UserContext";
import { DepositBox } from "./DepBox";
import { UnstakeDisclaimer } from "./Disclaimer";
import {
  BackButton,
  CurrencySwitcher,
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
    if (!user) {
      let user = getItem("user");
      if (!user) {
        navigate("/login");
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

  const [isGet, setIsGet] = useState(false); // is get (usdt) selected

  const [usdtBal, setUsdtBal] = useState(getItem("pUsdtBal") || 0);
  const [getBal, setGetBal] = useState(getItem("pGetBal") || 0);

  // vars
  const [isLoading, setIsLoading] = useState(false);

  const [tokenPrice, setTokenPrice] = useState(getItem("pTP") || 0.11);

  const [tokensForStake, setTokensForStake] = useState(usdtBal);
  const [roiVal, setRoiVal] = useState(12);
  const [monthlyReward, setMonthlyReward] = useState(0);

  // deposits
  const [lDepId, setLDepId] = useState(getItem("plDepId") || ""); // locked
  const [nlDepId, setNLDepId] = useState(getItem("pnlDepId") || ""); // non-locked

  const [lDepAmount, setLDepAmount] = useState(getItem("plDepA") || 0);
  const [nlDepAmount, setNLDepAmount] = useState(getItem("pnlDepA") || 0);

  const [lDepUsdAmount, setLDepUsdAmount] = useState(getItem("plDepAU") || 0);
  const [nlDepUsdAmount, setNLDepUsdAmount] = useState(
    getItem("pnlDepAU") || 0
  );

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

  const [totalEarned1, setTotalEarned1] = useState(
    getItem("pTotalEarned1") || 0
  );
  const [totalEarned2, setTotalEarned2] = useState(
    getItem("pTotalEarned2") || 0
  );

  const [isNeedUpdate, setIsNeedUpdate] = useState(false);

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
    if (user) {
      console.log("[Stake] fetching balances");
      fetchBalances("0").then((bals) => {
        console.log(bals);

        setUsdtBal(bals.usdtBal);
        setGetBal(bals.getBal);
        setItem("pUsdtBal", bals.usdtBal);
        setItem("pGetBal", bals.getBal);
        setTokensForStake(isGet ? bals.getBal : bals.usdtBal);
        console.log("getb:", getBal);
      });
      console.log("[Stake] fetched balances");
    }
  }, [user, lDepAmount, nlDepAmount]);
  // ------------------------------------

  // token price fetch
  useEffect(() => {
    console.log("[Stake] fetching token price");
    fetchTokenPriceE(setTokenPrice);
  }, [isNeedUpdate]);
  // ------------------------------------

  // deposits fetch
  useEffect(() => {
    if (user) {
      console.log("[Stake] fetching deposits");
      fetchDeposits().then((depsArr) => {
        if (depsArr[0]) {
          console.log("[Stake] fetched non-locked dep:", depsArr[0]);
          setNLDepId(depsArr[0].depId);
          setNLDepAmount(depsArr[0].getAmount);
          setNLDepUsdAmount(depsArr[0].usdAmount);
          setIsR2(depsArr[0].isReinvest);
          setTotalEarned2(depsArr[0].totalEarned);

          setItem("pnlDepId", depsArr[0].depId);
          setItem("pnlDepA", depsArr[0].getAmount);
          setItem("pnlDepAU", depsArr[0].usdAmount);
          setItem(`isR${getItem("pnlDepId")}`, depsArr[0].isReinvest);
        }
        if (depsArr[1]) {
          console.log("[Stake] fetched locked dep:", depsArr[0]);
          setLDepId(depsArr[1].depId);
          setLDepAmount(depsArr[1].getAmount);
          setLDepUsdAmount(depsArr[1].usdAmount);
          setIsR1(depsArr[1].isReinvest);
          setTotalEarned1(depsArr[1].totalEarned);

          setItem("plDepId", depsArr[1].depId);
          setItem("plDepA", depsArr[1].getAmount);
          setItem("plDepAU", depsArr[1].usdAmount);
          setItem(`isR${getItem("plDepId")}`, depsArr[1].isReinvest);
        }
      });
      setIsNeedUpdate(false);
    }
  }, [user, isNeedUpdate]);
  // ------------------------------------

  // update view
  useEffect(() => {
    handleCalcChange(tokensForStake);
  }, [isGet, roiVal, tokensForStake, tokenPrice, isL]);
  // ------------------------------------

  // tx fetch
  useEffect(() => {
    console.log("[Stake] fetching transactions");
    fetchTxE(user, { setTxArr, setIsNeedUpdate });
  }, [user, isNeedUpdate]);
  // ------------------------------------

  function handleCalcChange(value) {
    if (value.target) {
      value = parseFloat(value.target.value);
    }
    if (isGet && value > getBal) return;
    if (!isGet && value > usdtBal) return;
    if (value > 10000000) return;

    console.log("[Stake] token price:", tokenPrice);

    setTokensForStake(Math.round(value * 100) / 100);
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

    console.log(
      "[Stake] monthly reward:",
      Math.round(getVal * (roiVal / 100) * 100) / 100
    );
    setMonthlyReward(Math.round(getVal * (roiVal / 100) * 100) / 100 || 0);
  }

  return (
    <>
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
                      totalStaked1={lDepAmount}
                      totalStaked2={nlDepAmount}
                    />
                    <TotalEarnedBox
                      totalEarned1={totalEarned1}
                      totalEarned2={totalEarned2}
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
                    isLocked={true}
                    getAmount={lDepAmount}
                    usdAmount={lDepUsdAmount}
                    depId={lDepId}
                    isR={isR1}
                    setIsR={setIsR1}
                    totalEarned={totalEarned1}
                    tokenPrice={tokenPrice}
                  />

                  <DepositBox
                    isLocked={false}
                    getAmount={nlDepAmount}
                    usdAmount={nlDepUsdAmount}
                    depId={nlDepId}
                    isR={isR2}
                    setIsR={setIsR2}
                    totalEarned={totalEarned2}
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
              <div className="right-side-wrapper">
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
                          <CurrencySwitcher
                            isGet={isGet}
                            setIsGet={setIsGet}
                            usdtBal={usdtBal}
                            getBal={getBal}
                            setTokensForStake={setTokensForStake}
                          />
                          <StakeAmountContainer
                            handleCalcChange={handleCalcChange}
                            isGet={isGet}
                            tokensForStake={tokensForStake}
                            usdtBal={usdtBal}
                            getBal={getBal}
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
                          <UnstakeAmountContainer nlDepAmount={nlDepAmount} />
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
                        <StakeActRoiBox isL={isL} roiVal={roiVal} />
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
                  {isS ? (
                    <button
                      className="stake-footer-btn yellow-trans-btn"
                      disabled={true}
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
                      console.log("setted isloadng: true");

                      setIsLoading(true);

                      try {
                        if (isS) {
                          await handleStake(
                            tokensForStake,
                            isL,
                            isGet,
                            setIsNeedUpdate,
                            tokenPrice
                          );
                        } else {
                          await handleUnstake(
                            nlDepId,
                            nlDepAmount,
                            setIsNeedUpdate
                          );
                        }
                      } catch (e) {
                        console.log("stake page:", e);
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
              tokenPrice,
            }}
            handleUnstake={handleUnstake}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <div
            className="stake-container-mob"
            style={{ marginTop: `${cW === 1 || cW === 2 ? "9vh" : "13vh"}` }}
          >
            {/* HEADER */}
            <BackButton cW={cW} setCW={setCW} />
            <div className="stake-page-header header-1 brd-btm">
              {cW === 0 ? "Staking" : cW === 1 ? "Stake" : "Unstake"}
            </div>

            {/* BODY  */}
            <div className="mob-container">
              {cW === 0 ? (
                <>
                  {/* MAIN-PAGE */}
                  <div className="brd-btm">
                    <TotalStakedBox
                      totalStaked1={lDepAmount}
                      totalStaked2={nlDepAmount}
                    />
                    <TotalEarnedBox
                      totalEarned1={totalEarned1}
                      totalEarned2={totalEarned2}
                      tokenPrice={tokenPrice}
                    />
                  </div>

                  <div className="stake-mob-body-wrapper">
                    <DepositBox
                      isLocked={true}
                      getAmount={lDepAmount}
                      usdAmount={lDepUsdAmount}
                      depId={lDepId}
                      isR={isR1}
                      setIsR={setIsR1}
                      totalEarned={totalEarned1}
                      tokenPrice={tokenPrice}
                    />

                    <DepositBox
                      isLocked={false}
                      getAmount={nlDepAmount}
                      usdAmount={nlDepUsdAmount}
                      depId={nlDepId}
                      isR={isR2}
                      setIsR={setIsR2}
                      totalEarned={totalEarned2}
                      tokenPrice={tokenPrice}
                    />
                  </div>
                </>
              ) : (
                <>
                  {cW === 1 ? (
                    <>
                      {/* STAKE-PAGE */}
                      <CurrencySwitcher
                        isGet={isGet}
                        setIsGet={setIsGet}
                        usdtBal={usdtBal}
                        getBal={getBal}
                        setTokensForStake={setTokensForStake}
                      />
                      <StakeAmountContainer
                        handleCalcChange={handleCalcChange}
                        isGet={isGet}
                        tokensForStake={tokensForStake}
                        usdtBal={usdtBal}
                        getBal={getBal}
                      />
                      <StakeTimeContainer
                        isL={isL}
                        setIsL={setIsL}
                        handleCalcChange={handleCalcChange}
                        tokensForStake={tokensForStake}
                      />
                    </>
                  ) : (
                    <>
                      {/* UNSTAKE-PAGE  */}
                      <UnstakeAmountContainer nlDepAmount={nlDepAmount} />
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
                  <StakeActRoiBox isL={isL} roiVal={roiVal} />
                  <StakeActMontlyRBox monthlyReward={monthlyReward} />
                </>
              ) : (
                <>
                  {/* UNSTAKE-PAGE  */}
                  <UnstakeDisclaimer />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
