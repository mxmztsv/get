import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChartRefs } from "../../components/ChartRefs";
import { Container } from "../../components/Container/index";
import { DepButtons } from "../../components/DepButtons";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchBalancesE } from "../../utils/EffFetchers/fetchBalancesE";
import { getItem, setItem } from "../../utils/localStorage";
import { PathContext, updateNavbar } from "../../utils/PathContext";
import { sendReq } from "../../utils/sendReq";
import { UserContext } from "../../utils/UserContext";
import {
  AffilationFilters,
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
  TotalEarnedBox,
  VolumeNextL,
} from "./Elements";
import { fetchRefs, objToArray } from "./helpers";
import { RefLinkBody } from "./RefLinkBody";
import { RefTree } from "./RefTree";

export const Referral = () => {
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
  }, [user, width]);
  // ---------------

  // stats
  const [curLvl, setCurLvl] = useState(1);

  const [refLink, setRefLink] = useState("");
  const [invitedByName, setInvitedByName] = useState("");

  const [teamSize, setTeamSize] = useState("-");
  const [frontLineSize, setFrontLineSize] = useState("-");
  const [numberOfLines, setNumberOfLines] = useState("-");

  const [curLvlRefs, setCurLvlRefs] = useState([]);
  const [isRev, setIsRev] = useState(true);

  const [totalEarned, setTotalEarned] = useState(getItem("pGetBal4") || 0);
  const [usdtBal4, setUsdtBal4] = useState(0);
  const [getBal4, setGetBal4] = useState(0);
  // -----------------------------------------------------

  // balance fetch
  useEffect(() => {
    console.log("ref page: fetching balances");
    fetchBalancesE(user, { setUsdtBal4, setGetBal4 }).then(() =>
      setTotalEarned(getBal4)
    );
  }, [user, totalEarned, getBal4]);
  // ------------------------------------

  // fetchers
  async function fetchRefLink() {
    let refUrlBase = "https://app.getstake.io/signup?r=";
    if (getItem("uRefCode") && getItem("byName")) {
      setRefLink(`${refUrlBase}${getItem("uRefCode")}`);
      setInvitedByName(getItem("byName"));
      console.log("fetched id from localstorage");
    }

    if (!getItem("token")) return;

    let res = await sendReq("get", "profile/base-info");

    if (res) {
      console.log(res);

      if (res.data.result === "success") {
        if (res.data.data.login) {
          setRefLink(`${refUrlBase}${res.data.data.login}`);
          setInvitedByName(res.data.data.sponsor.fio);

          setItem("uRefCode", res.data.data.login);
          setItem("byName", res.data.data.sponsor.fio);

          console.log("ref l: fetched");
        }
      }
    }
  }
  useEffect(() => {
    fetchRefLink();
  }, []);

  async function fetchBodyInfo() {
    if (!getItem("token")) return;

    async function fetchCount(url, name, setFunc) {
      let res;

      try {
        let req = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}${url}`,
          headers: {
            "x-auth": getItem("token"),
          },
        };

        res = await axios(req);
      } catch (e) {
        console.log(`${url}`, e);
      }

      if (res) {
        console.log(res);

        if (res.data.result === "success") {
          setFunc(res.data.data.count);
          console.log(`ref: fetched ${name} from api`);
        }
      }
    }

    fetchCount("stat/team-size", "ts", setTeamSize);
    fetchCount("stat/first-line-size", "fS", setFrontLineSize);
    fetchCount("stat/team-count-lines", "lNum", setNumberOfLines);
  }
  useEffect(() => {
    fetchBodyInfo();
  }, []);
  // ------------------------------------------------------------

  // navbar update
  const { setNavPath } = useContext(PathContext);
  useEffect(() => {
    updateNavbar("referral", setNavPath);
  }, []);
  // ------------------------------------

  // refs tree fetch
  async function fetchCurRefs() {
    if (!getItem("token")) return;

    if (!getItem("uid")) {
      let res;

      try {
        let req = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}profile/base-info`,
          headers: {
            "x-auth": getItem("token"),
          },
        };

        res = await axios(req);
      } catch (e) {
        console.error("ref tree:", e);
        return;
      }

      if (res) {
        console.log(res);
        if (res.data.result === "success") {
          if (res.data.data.id) {
            let uid = res.data.data.id;
            setItem("uid", uid);
            console.log("ref tree: fetched id: ", uid);
          }
          if (res.data.data.career) {
            let career = res.data.data.carerr.statusId;
            if (career === "client") {
              setCurLvl(0);
            } else if (career.includes("level")) {
              setCurLvl(parseInt(career.replace(/^\D+/g, "")));
            }
          }
        }
      }
    }

    let curLvlRefsRes = await fetchRefs(getItem("uid"));

    setCurLvlRefs(objToArray(curLvlRefsRes));
  }

  // fetch first lvl
  useEffect(() => {
    fetchCurRefs();
  }, []);
  // -------------------------


  return (
    <>
      {width > 815 ? (
        <Container>
          <DepButtons />

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

            {/* REF-NEXT-LVL */}
            <div className="ref-next-lvl-container brd-btm">
              <div className="medium-white-header">To get L{curLvl + 1}</div>
              <div className="ref-boxes">
                <DepositNextL />
                <FrontLineDepNextL />
                <VolumeNextL />
                <BonusNextL />
              </div>
            </div>

            {/* REF-CHART */}
            <div className="ref-chart-container">
              <div className="medium-white-header">Revenue</div>
              <div className="ref-boxes">
                <RevenueBox time="Today" />
                <RevenueBox time="Week" />
                <RevenueBox time="Month" />
                <RevenueBox time="All" totalEarned={totalEarned} />
              </div>
              <div className="ref-chart brd-btm">
                <ChartRefs />
              </div>
            </div>

            {/* REF-TREE */}
            <div className="ref-tree-container">
              {/* <div className="medium-white-header">Your referrals</div> */}
              <div className="ref-tree-header brd-btm">
                {/* left */}
                <div className="ref-total-earn">
                  <TotalEarnedBox totalEarned={totalEarned} />
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
              className="ref-row-mob"
              style={{ marginBottom: "10px", paddingBottom: "10px" }}
            >
              <DepositNextL />
              <FrontLineDepNextL />
            </div>

            <div className="ref-row-mob brd-btm">
              <VolumeNextL />
              <BonusNextL />
            </div>

            <RRSwitch isRev={isRev} setIsRev={setIsRev} />

            {isRev ? (
              <>
                <div
                  className="ref-row-mob brd-top"
                  style={{ marginBottom: "0" }}
                >
                  <RevenueBox time="Today" />
                  <RevenueBox time="Week" />
                </div>

                <div className="ref-row-mob brd-btm">
                  <RevenueBox time="Month" />
                  <RevenueBox time="All" totalEarned={totalEarned} />
                </div>

                <div className="ref-chart-wrapper-mob">
                  <ChartRefs />
                </div>
              </>
            ) : (
              <>
                <div className="brd-btm"></div>
                <TotalEarnedBox totalEarned={totalEarned} />
                <div className="brd-btm"></div>
                {curLvlRefs.length ? (
                  <RefTree curLvlRefs={curLvlRefs} />
                ) : (
                  <>
                    {" "}
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
