import React, { useContext, useEffect, useState } from "react";
import { Container } from "../../components/Container/index";
import { DepButton } from "../../components/DepButton";
import { Footer } from "../../components/Footer";
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
import { tempDep } from "../../utils/tempDep";
import { UserContext } from "../../utils/UserContext";
import { BalanceBox } from "./BalanceBox";
import { DashFooter } from "./DashFooter";
import {
  DashBody,
  DashGreet,
  DashSwitcherMob, Pagination,
  RoiBox,
  StakedBox,
  StakeRewardLocked,
  StakeRewardNonLocked,
  TokenBox,
  TotalEarnedBox,
} from "./Elements";
import { Filters } from "./Filters";
import { processPriceArrays } from "./processPriceArrays";

export const Dashboard = () => {
  // auth
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!user) {
      let user = getItem("user");
      if (user) {
        console.log("[Dashboard] setted user", user);
        setUser(user);
      } else {
        console.log("[Dashboard] no user in localstorage");
      }
    }
  }, [user, width]);
  // ---------------

  // vars
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);

  // general
  const [isA, setIsA] = useState(true); // is account tab selected
  const [tb, setTb] = useState([true, false, false, false]); // chart time buttons
  const [eb, setEb] = useState([false, false, false, true]); // earned time buttons

  // bals
  const [usdtBal, setUsdtBal] = useState(getItem("pUsdtBal") || 0);
  const [getBal, setGetBal] = useState(getItem("pGetBal") || 0);

  const [usdtBal4, setUsdtBal4] = useState(getItem("pUsdtBal4") || 0);
  const [getBal4, setGetBal4] = useState(getItem("pGetBal4") || 0);

  // token price
  const [tokenPrice, setTokenPrice] = useState(getItem("pTP") || 0.146);
  const [tokenPrevPrice, setTokenPrevPrice] = useState(
    getItem("prevTP") || 0.144
  );

  // chart
  const [allPArrays, setAllPArrays] = useState(getItem("pAllPA") || []);

  // tx
  const [txArr, setTxArr] = useState(getItem("txArr") || []);
  const [showingTxArr, setShowingTxArr] = useState([]);

  // tx pagination
  const [actualPage, setActualPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  // deposits
  const [lockedDep, setLockedDep] = useState(getItem("lDep") || tempDep);
  const [nonLockedDep, setNonLockedDep] = useState(getItem("nlDep") || tempDep);
  // ------------------------------------

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
    console.log("[Dashboard] fetching chart");
    fetchChartE(null, setTokenPrevPrice, setTokenPrice).then(
      (allPricesArray) => {
        processPriceArrays(allPricesArray, setAllPArrays);
      }
    );
  }, []);
  // ------------------------------------

  // token price fetch
  useEffect(() => {
    console.log("[Dashboard] fetching token price");
    fetchTokenPriceE(setTokenPrice);
  }, []);
  // ------------------------------------

  // balance fetch
  useEffect(() => {
    console.log("[Dashboard] fetching balances");
    fetchBalancesE(setUsdtBal, setGetBal, setUsdtBal4, setGetBal4);
  }, []);
  // ------------------------------------

  // profile fetch
  useEffect(() => {
    console.log("[Dashboard] fetching profile");
    fetchProfileE(user, setUser);
  }, []);
  // -----------------------------------

  // deposits fetch
  useEffect(() => {
    console.log("[Dashboard] fetching deposits");
    fetchDepositsE(setLockedDep, setNonLockedDep);
  }, []);
  // ------------------------------------

  // tx fetch
  useEffect(() => {
    console.log("[Dashboard] fetching transactions for page " + actualPage);
    fetchTxE(setTxArr, actualPage, setPagesCount)

  }, [actualPage]);
  // ------------------------------------

  return (
    <>
      <div className="container-with-footer">
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
                          totalEarned1={nonLockedDep.totalEarned}
                          totalEarned2={lockedDep.totalEarned}
                          tb={eb}
                          setTb={setEb}
                          tokenPrice={tokenPrice}
                        />

                        <StakedBox
                          totalStaked1={nonLockedDep.getAmount}
                          totalStaked2={lockedDep.getAmount}
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
                        <div className="dash-tx-header">
                          <div className="header-2">Transactions</div>
                          <Filters
                            sourceTxArray={txArr}
                            setFilteredTxArray={setShowingTxArr}
                          />
                        </div>
                        <TxTableBodyMemo txArray={showingTxArr} />
                        { !!showingTxArr.length &&
                            <Pagination
                            actualPage={actualPage}
                            setActualPage={setActualPage}
                            pagesCount={pagesCount}
                            />
                        }
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
                        <DashBody
                          width={width}
                          tb={tb}
                          setTb={setTb}
                          allPricesArray={allPArrays}
                        />
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
                        {/* <TvlBox /> */}
                        <RoiBox />
                      </div>
                    </div>

                    <DashBody
                      width={width}
                      tb={tb}
                      setTb={setTb}
                      allPricesArray={allPArrays}
                    />

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
                        totalEarned1={nonLockedDep.totalEarned}
                        totalEarned2={lockedDep.totalEarned}
                        tb={tb}
                        setTb={setTb}
                        tokenPrice={tokenPrice}
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
                          totalStaked1={nonLockedDep.getAmount}
                          totalStaked2={lockedDep.getAmount}
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
                      <DashBody
                        width={width}
                        tb={tb}
                        setTb={setTb}
                        allPricesArray={allPArrays}
                      />
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
                  {/* <TvlBox /> */}
                  <RoiBox />
                </div>

                <DashBody
                  width={width}
                  tb={tb}
                  setTb={setTb}
                  allPricesArray={allPArrays}
                />
                <div className="brd-btm"></div>
                <DashFooter txArray={txArr} />
              </>
            )}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};
