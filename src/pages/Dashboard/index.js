import React, { useContext, useEffect, useState } from "react";
import { Container } from "../../components/Container/index";
import { DepButton } from "../../components/DepButton";
import { TxTableBodyMemo } from "../../components/TxTable";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchBalancesE } from "../../utils/EffFetchers/fetchBalancesE";
import { fetchChartE } from "../../utils/EffFetchers/fetchChartE";
import { fetchDepositsE } from "../../utils/EffFetchers/fetchDepositE";
import { fetchProfileE } from "../../utils/EffFetchers/fetchProfileE";
import { fetchTokenPriceE } from "../../utils/EffFetchers/fetchTokenPriceE";
import { fetchTxE } from "../../utils/EffFetchers/fetchTxE";
import { getItem } from "../../utils/localStorage";
import { PathContext, updateNavbar } from "../../utils/PathContext";
import { UserContext } from "../../utils/UserContext";
import { BalanceBox } from "./BalanceBox";
import { DashFooter } from "./DashFooter";
import {
  DashBody,
  DashGreet,
  DashSwitcherMob,
  RoiBox,
  StakedBox,
  StakeRewardLocked,
  StakeRewardNonLocked,
  TokenBox,
  TotalEarnedBox,
  TvlBox,
} from "./Elements";

export const Dashboard = () => {
  // auth
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!user) {
      let user = getItem("user");
      if (user) {
        setUser(user);
      }
    }
  }, [user, width]);
  // ---------------

  const [isA, setIsA] = useState(true); // is account tab selected
  const [tb, setTb] = useState([true, false, false, false]); // chart time buttons
  const [eb, setEb] = useState([true, false, false, false]); // earned time buttons

  const [usdtBal, setUsdtBal] = useState(getItem("pUsdtBal") || 0);
  const [getBal, setGetBal] = useState(getItem("pGetBal") || 0);

  const [usdtBal4, setUsdtBal4] = useState(getItem("pUsdtBal4") || 0);
  const [getBal4, setGetBal4] = useState(getItem("pGetBal4") || 0);

  // for total staked, earned
  const [lDepAmount, setLDepAmount] = useState(getItem("plDepA") || 0);
  const [nlDepAmount, setNLDepAmount] = useState(getItem("pnlDepA") || 0);

  const [lDepUsdAmount, setLDepUsdAmount] = useState(0);
  const [nlDepUsdAmount, setNLDepUsdAmount] = useState(0);

  const [totalEarned1, setTotalEarned1] = useState(0);
  const [totalEarned2, setTotalEarned2] = useState(0);

  const [isNeedUpdate, setIsNeedUpdate] = useState(false);

  const [txArr, setTxArr] = useState(getItem("txArr") || []);

  const [tokenPrice, setTokenPrice] = useState(getItem("pTP") || 0.11);
  const [tokenPrevPrice, setTokenPrevPrice] = useState(
    getItem("prevTP") || 0.11
  );
  const [priceArray, setPriceArray] = useState(getItem("pPA") || []);

  // navbar update
  const { setNavPath } = useContext(PathContext); // for selected navbar item
  useEffect(() => {
    updateNavbar("dashboard", setNavPath);
  }, []);
  // ------------------------------------

  // navbar enabling after login/signup
  useEffect(() => {
    let navbar = document.getElementById("navbar");
    navbar.style.display = "flex";
  }, []);
  // ------------------------------------

  // token chart fetch
  useEffect(() => {
    fetchChartE(setPriceArray, setTokenPrevPrice);
  }, [isNeedUpdate]);
  // ------------------------------------

  // token price fetch
  useEffect(() => {
    fetchTokenPriceE(setTokenPrice);
  }, [isNeedUpdate]);
  // ------------------------------------

  // balance fetch
  useEffect(() => {
    fetchBalancesE(user, { setUsdtBal, setGetBal, setUsdtBal4, setGetBal4 });
  }, [isNeedUpdate]);
  // ------------------------------------

  // profile fetch
  useEffect(() => {
    fetchProfileE(user, setUser);
  }, [isNeedUpdate]);
  // -----------------------------------

  // deposits fetch
  useEffect(() => {
    console.log("");
    fetchDepositsE(user, {
      setLDepAmount,
      setLDepUsdAmount,
      setTotalEarned1,
      setNLDepAmount,
      setNLDepUsdAmount,
      setTotalEarned2,
      setIsNeedUpdate,
    });
  }, [user, isNeedUpdate]);
  // ------------------------------------

  // tx fetch
  useEffect(() => {
    console.log("");
    fetchTxE(user, { setTxArr, setIsNeedUpdate });
  }, [user, isNeedUpdate]);
  // ------------------------------------

  return (
    <>
      {width > 815 ? (
        <>
          {/* DESKTOP */}
          {user ? (
            <Container>
              <div className="dash-container">
                <DepButton />

                <div className="dash-header">
                  <DashGreet />
                </div>

                <div className="desktop-body-wrapper">
                  {/* LEFT */}
                  <div className="left-side-wrapper">
                    {/* LEFT-TOP */}
                    <div className="left-top">
                      <TotalEarnedBox
                        totalEarned1={totalEarned1}
                        totalEarned2={totalEarned2}
                        tb={tb}
                        setTb={setTb}
                      />
                      <StakedBox
                        totalStaked1={lDepAmount}
                        totalStaked2={nlDepAmount}
                      />
                    </div>
                    {/* LEFT-BODY */}
                    <div className="left-body">
                      <BalanceBox
                        usdtBal={usdtBal}
                        getBal={getBal}
                        tokenPrice={tokenPrice}
                      />
                      <BalanceBox
                        bonus
                        usdtBal={usdtBal4}
                        getBal={getBal4}
                        tokenPrice={tokenPrice}
                      />
                    </div>
                    {/* LEFT-FOOTER */}
                    <div className="left-footer">
                      <div className="dash-tx-header header-2">
                        Transactions
                      </div>
                      <TxTableBodyMemo txArray={txArr} />
                    </div>
                  </div>

                  {/* RIGHT-DASH */}
                  <div className="right-side-wrapper">
                    {/* RIGHT-TOP */}
                    <div className="right-top">
                      <TokenBox
                        tokenPrice={tokenPrice}
                        tokenPrevPrice={tokenPrevPrice}
                      />
                    </div>

                    {/* RIGHT-BODY */}
                    <div className="right-body">
                      <StakeRewardLocked />
                      <StakeRewardNonLocked />
                    </div>

                    {/* RIGHT-FOOTER */}
                    <div className="right-footer">
                      <DashBody tb={tb} setTb={setTb} priceArray={priceArray} />
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          ) : (
            <>
              <Container>
                <div className="dash-container">
                  <DepButton />

                  <div className="dash-header">
                    <DashGreet />

                    <div className="dash-header-boxes">
                      <TokenBox
                        tokenPrice={tokenPrice}
                        tokenPrevPrice={tokenPrevPrice}
                      />
                      <TvlBox />
                      <RoiBox />
                    </div>
                  </div>

                  <DashBody tb={tb} setTb={setTb} priceArray={priceArray} />

                  <DashFooter txArray={txArr} />
                </div>
              </Container>
            </>
          )}
        </>
      ) : (
        // MOBILE
        <div className="dash-container-mob">
          {user ? (
            <>
              <DashGreet />

              <div className="mob-container">
                <DashSwitcherMob isA={isA} setIsA={setIsA} />
                {isA ? (
                  <>
                    {/* ACCOUNT-TAB */}
                    <TotalEarnedBox
                      totalEarned1={totalEarned1}
                      totalEarned2={totalEarned2}
                      tb={tb}
                      setTb={setTb}
                    />

                    <div
                      className={`dash-top-row-mob ${
                        width < 815 ? "fld-col" : ""
                      }`}
                    >
                      <BalanceBox
                        usdtBal={usdtBal}
                        getBal={getBal}
                        tokenPrice={tokenPrice}
                      />
                      <BalanceBox
                        bonus
                        usdtBal={usdtBal4}
                        getBal={getBal4}
                        tokenPrice={tokenPrice}
                      />
                      <StakedBox
                        totalStaked1={lDepAmount}
                        totalStaked2={nlDepAmount}
                      />
                    </div>

                    <DashFooter txArray={txArr} />
                  </>
                ) : (
                  <>
                    {/* TOKEN-TAB */}
                    <TokenBox
                      tokenPrice={tokenPrice}
                      tokenPrevPrice={tokenPrevPrice}
                    />

                    <div className="dash-top-row-mob brd-btm">
                      <StakeRewardLocked />
                      <StakeRewardNonLocked />
                    </div>
                    <DashBody tb={tb} setTb={setTb} priceArray={priceArray} />
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {/* NOT-AUTHED */}
              <div className="header-1 brd-btm">Dashboard</div>
              <TokenBox
                tokenPrice={tokenPrice}
                tokenPrevPrice={tokenPrevPrice}
              />
              <div className="dash-top-row-mob">
                <TvlBox />
                <RoiBox />
              </div>

              <DashBody tb={tb} setTb={setTb} priceArray={priceArray} />
              <div className="brd-btm"></div>
              <DashFooter txArray={txArr} />
            </>
          )}
        </div>
      )}
    </>
  );
};
