import useWindowDimensions from "../../hooks/useWindow";
import { RefLinkBody } from "./RefLinkBody";

// elems
export const CurLvlBox = (props) => {
  const { width } = useWindowDimensions();
  let { curLvl } = props;
  return (
    <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
      <div className="medium-white-header">Current level</div>
      <div className="ref-lvl-val">{curLvl ? curLvl : "-"}</div>
    </div>
  );
};

export const RefHeader = (props) => {
  let { refLink, invitedByName, curLvl } = props;
  return (
    <div className="ref-lvl-link-container brd-btm">
      <CurLvlBox curLvl={curLvl} />
      <InvitedByBox invitedByName={invitedByName} />
      <RefLinkBody refLink={refLink} />
    </div>
  );
};

// NEXT
export const DepositNextL = () => {
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header">Deposit</div>
        <div className="dash-box-body">- GET</div>
        <div className="dash-box-footer dash-box-colored-footer">0 USD</div>
      </div>
    </>
  );
};

export const FrontLineDepNextL = () => {
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header">Front-line deposit</div>
        <div className="dash-box-body">- GET</div>
        <div className="dash-box-footer dash-box-colored-footer">0 USD</div>
      </div>
    </>
  );
};

export const VolumeNextL = () => {
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header">Volume</div>
        <div className="dash-box-body">- GET</div>
        <div className="dash-box-footer dash-box-colored-footer">0 USD</div>
      </div>
    </>
  );
};

export const BonusNextL = () => {
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header">Bonus</div>
        <div className="dash-box-body">- GET</div>
        <div className="dash-box-footer dash-box-colored-footer">0 USD</div>
      </div>
    </>
  );
};

// REVENUE BOXES
export const RevenueBox = (props) => {
  let { time, totalEarned } = props;
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-body">{totalEarned || "-"} GET</div>
        <div className="dash-box-footer dash-box-colored-footer">{time}</div>
      </div>
    </>
  );
};

//REF STATS
export const TotalEarnedBox = (props) => {
  let { totalEarned } = props;
  return (
    <>
      <div className="dash-box s-box">
        <div className="small-grey-header">Total earned</div>
        <div className="dash-box-body" style={{ paddingBottom: "0" }}>
          {totalEarned || "-"} GET
        </div>
      </div>
    </>
  );
};

// REF FOOTER MOB
export const RRSwitch = (props) => {
  let { isRev, setIsRev } = props;

  return (
    <div className="rr-switch-container">
      <button
        className={`${isRev ? "" : "uns-button"}`}
        onClick={() => {
          setIsRev(true);
        }}
      >
        REVENUE
      </button>
      <button
        className={`${!isRev ? "" : "uns-button"}`}
        onClick={() => {
          setIsRev(false);
        }}
      >
        REFERRALS
      </button>
    </div>
  );
};

export const InvitedByBox = (props) => {
  const { width } = useWindowDimensions();
  let { invitedByName } = props;

  return (
    <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
      <div className="medium-white-header">Invited by</div>
      <div className="ref-lvl-val header-2">
        {invitedByName !== "" ? invitedByName : "-"}
      </div>
    </div>
  );
};

export const TeamSizeBox = (props) => {
  const { width } = useWindowDimensions();
  let { teamSize } = props;

  return (
    <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
      <div className="medium-white-header">Team Size</div>
      <div className="ref-lvl-val">{teamSize !== "" ? teamSize : "-"}</div>
    </div>
  );
};

export const FirstLineSizeBox = (props) => {
  const { width } = useWindowDimensions();
  let { frontLineSize } = props;

  return (
    <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
      <div className="medium-white-header">Front-Line Size</div>
      <div className="ref-lvl-val">
        {frontLineSize !== "" ? frontLineSize : "-"}
      </div>
    </div>
  );
};

export const NumberOfLinesBox = (props) => {
  const { width } = useWindowDimensions();
  let { numberOfLines } = props;

  return (
    <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
      <div className="medium-white-header">Number of Lines</div>
      <div className="ref-lvl-val">
        {numberOfLines !== "" ? numberOfLines : "-"}
      </div>
    </div>
  );
};
// -------------------------------------------------
