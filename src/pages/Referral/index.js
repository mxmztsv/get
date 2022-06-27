import React, { useContext, useEffect, useState } from "react";
import { ChartRefs } from "../../components/ChartRefs";
import { Container } from "../../components/Container/index";
import { DepButton } from "../../components/DepButton";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchDepStats } from "../../utils/fetchers/fetchDepStats";
import { fetchCurRefs } from "../../utils/fetchers/fetchFLvlRefs";
import { fetchMissions } from "../../utils/fetchers/fetchMissons";
import { fetchBodyInfo } from "../../utils/fetchers/fetchRefBodyInfo";
import { fetchRefLink } from "../../utils/fetchers/fetchRefLinks";
import { fetchRevenue } from "../../utils/fetchers/fetchRevenue";
import { getItem } from "../../utils/localStorage";
import { PathContext, updateNavbar } from "../../utils/PathContext";
import { UserContext } from "../../utils/UserContext";
import {
  BonusNextL,
  CurLvlBox,
  DepositNextL,
  FirstLineSizeBox,
  FrontLineDepNextL,
  InvitedByBox,
  NumberOfLinesBox, ReferralFilters,
  RefHeader,
  RevenueBox,
  RRSwitch,
  TeamSizeBox,
  TeamVolumeBox,
  VolumeNextL,
} from "./Elements";
import { RefLinkBody } from "./RefLinkBody";
import { RefTree } from "./RefTree";

export const Referral = () => {
  // auth
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();

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
  }, [user, width]);
  // ---------------

  // stats
  const [curLvl, setCurLvl] = useState(getItem("pLvl") || 0);

  const [refLink, setRefLink] = useState("");
  const [invitedByName, setInvitedByName] = useState(getItem("byName") || "");

  const [teamSize, setTeamSize] = useState(getItem("ts") || "-");
  const [frontLineSize, setFrontLineSize] = useState(getItem("fS") || "-");
  const [numberOfLines, setNumberOfLines] = useState(getItem("lNum") || "-");

  const [curLvlRefs, setCurLvlRefs] = useState([]);
  const [isRev, setIsRev] = useState(true);

  const [dayRev, setDayRev] = useState(getItem("pDayRev") || 0);
  const [weekRev, setWeekRev] = useState(getItem("pWeekRev") || 0);
  const [monthRev, setMonthRev] = useState(getItem("pMonthRev") || 0);
  const [allRev, setAllRev] = useState(getItem("pAllRev") || 0);

  const [depMis, setDepMis] = useState(getItem("pDepMis") || {});

  const [frontLDepMis, setFrontLDepMis] = useState(
    getItem("pFrontLDepMis") !== undefined ? getItem("pFrontLDepMis") : {}
  );
  const [volMis, setVolMis] = useState(getItem("pVolMis") || {});
  const [bonus, setBonus] = useState(getItem("pBonus") || {});

  const [teamVolume, setTeamVolume] = useState(
    getItem("pTeamVolume") !== undefined ? getItem("pTeamVolume") : {}
  );
  const [firstLVolume, setFirstLVolume] = useState(
    getItem("pFirstLVolume") !== undefined ? getItem("pFirstLVolume") : {}
  );
  // -----------------------------------------------------

  // navbar update
  const { setNavPath } = useContext(PathContext);
  useEffect(() => {
    updateNavbar("referral", setNavPath);
  }, []);
  // ------------------------------------

  // fetch ref link
  useEffect(() => {
    console.log("[Referral] fetching ref link");
    fetchRefLink(setRefLink, setInvitedByName);
  }, []);
  // -----------------------------------------

  // revenue stats fetch
  useEffect(() => {
    console.log("[Referral] fetching revenue stats");
    fetchRevenue(setDayRev, setWeekRev, setMonthRev, setAllRev);
  }, []);
  // -----------------------------------------

  // fetch team size, front line size, number of lines
  useEffect(() => {
    console.log("[Referral] fetching ref body info");
    fetchBodyInfo(setTeamSize, setFrontLineSize, setNumberOfLines);
  }, []);
  // ------------------------------------------------------------

  // fetch first lvl refs. ref tree
  useEffect(() => {
    console.log("[Referral] fetching first layer refs");
    fetchCurRefs(setCurLvl, setCurLvlRefs);
  }, []);
  // -------------------------

  // fetch missions
  useEffect(() => {
    console.log("[Referral] fetching missions");
    fetchMissions(setDepMis, setFrontLDepMis, setVolMis, setBonus, setCurLvl);
  }, []);
  // -------------------------

  // team volume
  useEffect(() => {
    console.log("[Referral] fetching team volume");
    fetchDepStats(setTeamVolume, setFirstLVolume);
  }, []);

  return (
    <>
      {width > 815 ? (
        <Container>
          <DepButton />

          {/* REFERRAL-HEADER */}
          <div className="referral-header header-1">Referral Program</div>

          {/* REFERRAL-BODY */}
          <div className="referral-body-container">
            {/* REF-LVL-LINK */}
            <RefHeader
              curLvl={curLvl}
              refLink={refLink}
              invitedByName={invitedByName}
            />

            <>
              {/* REF-NEXT-LVL */}
              <div className="ref-next-lvl-container brd-btm">
                <div className="medium-yellow-header">To get L{curLvl + 1}</div>
                <div className="ref-boxes">
                  <DepositNextL depMiss={depMis} />
                  <FrontLineDepNextL frontLDepMis={frontLDepMis} />
                  <VolumeNextL volMis={volMis} />
                  <BonusNextL bonus={bonus} />
                </div>
              </div>

              {/* REF-CHART */}
              <div className="ref-chart-container">
                <div className="medium-yellow-header">Revenue</div>
                <div className="ref-boxes">
                  <RevenueBox time="Today" revVal={dayRev} />
                  <RevenueBox time="Week" revVal={weekRev} />
                  <RevenueBox time="Month" revVal={monthRev} />
                  <RevenueBox time="All" revVal={allRev} />
                </div>
                <div className="ref-chart brd-btm">
                  <ChartRefs />
                </div>
              </div>
            </>

            {/* REF-TREE */}
            <div className="ref-tree-container">
              {/* <div className="medium-yellow-header">Your referrals</div> */}
              <div className="ref-tree-header brd-btm">
                {/* left */}
                <div className="ref-total-earn">
                  <TeamVolumeBox
                    teamVolume={teamVolume}
                    firstLineVolume={firstLVolume}
                  />
                  <TeamSizeBox teamSize={teamSize} />
                  <FirstLineSizeBox frontLineSize={frontLineSize} />
                  <NumberOfLinesBox numberOfLines={numberOfLines} />
                </div>
              </div>

              <ReferralFilters setFilteredData={setCurLvlRefs}/>

              {curLvlRefs.length ? (
                <RefTree curLvlRefs={curLvlRefs} />
              ) : (
                <>
                  <>
                    <div className="no-tx-wrapper ">
                      <img
                        src={require("../../assets/img/red-cross.svg").default}
                        alt=""
                      />
                      <div className="header-3">No referrals yet</div>
                    </div>
                  </>
                </>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <>
          <div className="referral-mob-container">
            <div className="header-1">Referral Program</div>
            <RefLinkBody refLink={refLink} />
            <CurLvlBox curLvl={curLvl} />
            <div className="ref-row-mob">
              <InvitedByBox invitedByName={invitedByName} />
              <TeamSizeBox teamSize={teamSize} />
            </div>
            <div className="ref-row-mob">
              <FirstLineSizeBox frontLineSize={frontLineSize} />
              <NumberOfLinesBox numberOfLines={numberOfLines} />
            </div>

            <div
              className="medium-yellow-header"
              style={{ marginLeft: "10px" }}
            >
              To get L{curLvl + 1}
            </div>
            <div
              className="ref-row-mob"
              style={{ marginBottom: "10px", paddingBottom: "10px" }}
            >
              <DepositNextL depMiss={depMis} />
              <FrontLineDepNextL frontLDepMis={frontLDepMis} />
            </div>

            <div className="ref-row-mob brd-btm">
              <VolumeNextL volMis={volMis} />
              <BonusNextL bonus={bonus} />
            </div>

            <RRSwitch isRev={isRev} setIsRev={setIsRev} />

            {isRev ? (
              <>
                <div
                  className="ref-row-mob brd-top"
                  style={{ marginBottom: "0" }}
                >
                  <RevenueBox time="Today" revVal={dayRev} />
                  <RevenueBox time="Week" revVal={weekRev} />
                </div>

                <div className="ref-row-mob brd-btm">
                  <RevenueBox time="Month" revVal={monthRev} />
                  <RevenueBox time="All" revVal={allRev} />
                </div>

                <div className="ref-chart-wrapper-mob">
                  <ChartRefs />
                </div>
              </>
            ) : (
              <>
                <div className="brd-btm"></div>
                <TeamVolumeBox
                  teamVolume={teamVolume}
                  firstLineVolume={firstLVolume}
                />
                <div className="brd-btm"></div>
                {curLvlRefs.length ? (
                  <RefTree curLvlRefs={curLvlRefs} />
                ) : (
                  <>
                    <div className="no-tx-wrapper ">
                      <img
                        src={require("../../assets/img/red-cross.svg").default}
                        alt=""
                      />
                      <div className="header-3">No referrals yet</div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
