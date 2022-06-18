import React, { useContext, useEffect, useState } from "react";
import { Container } from "../../components/Container/index";
import { DepButtons } from "../../components/DepButtons";
import { TxTableBodyMemo } from "../../components/TxTable";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchBalancesE } from "../../utils/EffFetchers/fetchBalancesE";
import { fetchDepositsE } from "../../utils/EffFetchers/fetchDepositE";
import { fetchProfileE } from "../../utils/EffFetchers/fetchProfileE";
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
import {Filters} from "./Filters";

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
  // const [showingTxArr, setShowingTxArr] = useState(getItem("txArr") || []);
  const [showingTxArr, setShowingTxArr] = useState([]);

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
                <DepButtons />

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
                      <BalanceBox usdtBal={usdtBal} getBal={getBal} />
                      <BalanceBox bonus usdtBal={usdtBal4} getBal={getBal4} />
                    </div>
                    {/* LEFT-FOOTER */}
                    <div className="left-footer">
                      <div className="dash-tx-header">
                        <div className="header-2">
                          Transactions
                        </div>
                        <Filters sourceTxArray={txArr} setFilteredTxArray={setShowingTxArr}/>
                        {/*<Filters sourceTxArray={getItem("txArr") || []} setFilteredTxArray={setShowingTxArr}/>*/}
                      </div>
                      <TxTableBodyMemo txArray={showingTxArr} />
                    </div>
                  </div>

                  {/* RIGHT-DASH */}
                  <div className="right-side-wrapper">
                    {/* RIGHT-TOP */}
                    <div className="right-top">
                      <TokenBox />
                    </div>

                    {/* RIGHT-BODY */}
                    <div className="right-body">
                      <StakeRewardLocked />
                      <StakeRewardNonLocked />
                    </div>

                    {/* RIGHT-FOOTER */}
                    <div className="right-footer">
                      <DashBody tb={tb} setTb={setTb} />
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          ) : (
            <>
              <Container>
                <div className="dash-container">
                  <DepButtons />

                  <div className="dash-header">
                    <DashGreet />

                    <div className="dash-header-boxes">
                      <TokenBox />
                      <TvlBox />
                      <RoiBox />
                    </div>
                  </div>

                  <DashBody tb={tb} setTb={setTb} />

                  <DashFooter txArray={showingTxArr} />
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
                      <BalanceBox usdtBal={usdtBal} getBal={getBal} />
                      <BalanceBox bonus usdtBal={usdtBal4} getBal={getBal4} />
                      <StakedBox
                        totalStaked1={lDepAmount}
                        totalStaked2={nlDepAmount}
                      />
                    </div>
                    <DashFooter txArray={showingTxArr} />
                  </>
                ) : (
                  <>
                    {/* TOKEN-TAB */}
                    <TokenBox />

                    <div className="dash-top-row-mob brd-btm">
                      <StakeRewardLocked />
                      <StakeRewardNonLocked />
                    </div>
                    <DashBody tb={tb} setTb={setTb} />
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {/* NOT-AUTHED */}
              <div className="header-1 brd-btm">Dashboard</div>
              <TokenBox />
              <div className="dash-top-row-mob">
                <TvlBox />
                <RoiBox />
              </div>

              <DashBody tb={tb} setTb={setTb} />
              <div className="brd-btm"></div>
              <DashFooter txArray={showingTxArr} />
            </>
          )}
        </div>
      )}
    </>
  );
};
