import refCheckIcon from "../../assets/img/ref-check.svg";
import useWindowDimensions from "../../hooks/useWindow";
import { fN } from "../../utils/formatNumber";
import { RefLinkBody } from "./RefLinkBody";
import {fetchFilteredRefs} from "./helpers";
import {useForm, Controller} from "react-hook-form";
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import closeIcon from "../../assets/img/close.svg";

// elems
export const CurLvlBox = (props) => {
  const { width } = useWindowDimensions();
  let { curLvl } = props;
  return (
    <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
      <div className="medium-yellow-header">Current level</div>
      <div className="ref-lvl-val">{curLvl !== undefined ? curLvl : "-"}</div>
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
export const DepositNextL = (props) => {
  let { depMiss } = props;
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header">
          Deposit
          {depMiss && depMiss.hasDone ? (
            <img src={refCheckIcon} alt="" className="ref-box-img" />
          ) : (
            <></>
          )}
        </div>
        <div className="dash-box-body">
          {depMiss && depMiss.goal !== undefined ? depMiss.goal : "..."} USD
        </div>
        <div className="dash-box-footer dash-box-colored-footer">
          {depMiss && depMiss.done !== undefined ? depMiss.done : "..."} USD
        </div>
      </div>
    </>
  );
};

export const FrontLineDepNextL = (props) => {
  let { frontLDepMis } = props;
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header fl-header">
          Front-line dep{" "}
          {frontLDepMis && frontLDepMis.hasDone ? (
            <img src={refCheckIcon} alt="" className="ref-box-img" />
          ) : (
            <></>
          )}
        </div>

        <div className="dash-box-body">
          {frontLDepMis && frontLDepMis.goal !== undefined
            ? frontLDepMis.goal
            : "..."}{" "}
          USD
        </div>
        <div className="dash-box-footer dash-box-colored-footer">
          {frontLDepMis && frontLDepMis.done !== undefined
            ? frontLDepMis.done
            : "..."}{" "}
          USD
        </div>
      </div>
    </>
  );
};

export const VolumeNextL = (props) => {
  let { volMis } = props;
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header">
          Volume{" "}
          {volMis && volMis.hasDone ? (
            <img src={refCheckIcon} alt="" className="ref-box-img" />
          ) : (
            <></>
          )}
        </div>
        <div className="dash-box-body">
          {volMis && volMis.goal !== undefined ? volMis.goal : "..."} USD
        </div>
        <div className="dash-box-footer dash-box-colored-footer">
          {volMis && volMis.done !== undefined ? volMis.done : "..."} USD
        </div>
      </div>
    </>
  );
};

export const BonusNextL = (props) => {
  let { bonus } = props;
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-header">Bonus</div>
        <div className="dash-box-body">
          {bonus && bonus.slice ? bonus.slice(0, -1) : "..."}{" "}
        </div>
        {/* <div className="dash-box-footer dash-box-colored-footer">0 USD</div> */}
      </div>
    </>
  );
};

// REVENUE BOXES
export const RevenueBox = (props) => {
  let { time, revVal } = props;
  return (
    <>
      <div className="dash-box">
        <div className="dash-box-body">
          {revVal !== undefined ? fN(revVal, 2, true) : "..."} GET
        </div>
        <div className="dash-box-footer dash-box-colored-footer">{time}</div>
      </div>
    </>
  );
};

//REF STATS
export const TeamVolumeBox = (props) => {
  let { teamVolume, firstLineVolume } = props;
  return (
    <>
      <div className="dash-box s-box" style={{ marginLeft: "0" }}>
        <div className="small-grey-header">Team Volume</div>
        <div className="dash-box-body" style={{ paddingBottom: "0" }}>
          {teamVolume !== undefined ? fN(teamVolume, 2, true) : "..."} USD
        </div>
        <div className="dash-box-footer">
          {firstLineVolume !== undefined ? fN(firstLineVolume, 2, true) : "..."}{" "}
          USD
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
      <div className="medium-yellow-header">Invited by</div>
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
      <div className="medium-yellow-header">Team Size</div>
      <div className="ref-lvl-val">{teamSize !== "" ? teamSize : "-"}</div>
    </div>
  );
};

export const FirstLineSizeBox = (props) => {
  const { width } = useWindowDimensions();
  let { frontLineSize } = props;

  return (
    <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
      <div className="medium-yellow-header">Front-Line Size</div>
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
      <div className="medium-yellow-header">Number of Lines</div>
      <div className="ref-lvl-val">
        {numberOfLines !== "" ? numberOfLines : "-"}
      </div>
    </div>
  );
};

// Filters
export const ReferralFilters = ({setFilteredData}) => {

    // const [query, setQuery] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        reset,
        register,
        control
    } = useForm();

    // const queryHandler = (e) => {
    //     setQuery(e.target.value);
    // }

    // const applyFilterHandler = () => {
    //     handleSubmit(setFilteredResult);
    // }

    const setFilteredResult = async (data) => {
        const res = await fetchFilteredRefs(data);
        setFilteredData(res);
    }

    const applyFilterHandler = async (data) => {
        console.log(data)
        setIsLoading(true);
        setFilteredResult(data).then(() => {
            setIsLoading(false);
        });
    }

    const clear = () => {
        reset();
    }

    //
    // useEffect(() => {
    //     setFilteredResult();
    // }, [query]);


    return (
        <>
            {/*<div className="af-filters">*/}
            <form onSubmit={handleSubmit(applyFilterHandler)} className="af-filters">
                <div className="af-filters-col">
                    <div className="af-filters-row">
                        <div className="af-filter">
                            <p className="af-filter-title">
                                Date of registration
                            </p>
                            <div className="af-filter-inputs-container">
                                <div className="af-filter-input-wrapper">
                                    <label htmlFor="date-of-registration-from"
                                           className="af-filter-input-label">From</label>
                                    {/*<input type="date" id="date-of-registration-from" {...register("reg_from")}/>*/}
                                    <Controller
                                        control={control}
                                        name="reg_from"
                                        render={({ field }) => (
                                            <DatePicker
                                                placeholderText="Set date"
                                                onChange={(date) => field.onChange(date)}
                                                selected={field.value}
                                                isClearable
                                                calendarClassName="calendar"
                                                popperClassName="calendar-popper"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="af-filter-input-wrapper">
                                    <label htmlFor="date-of-registration-to"
                                           className="af-filter-input-label">To</label>
                                    {/*<input type="date" id="date-of-registration-to" {...register("reg_to")}/>*/}
                                    <Controller
                                        control={control}
                                        name="reg_to"
                                        render={({ field }) => (
                                            <DatePicker
                                                placeholderText="Set date"
                                                onChange={(date) => field.onChange(date)}
                                                selected={field.value}
                                                isClearable
                                                calendarClassName="calendar"
                                                popperClassName="calendar-popper"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="af-filter">
                            <p className="af-filter-title">
                                Number of partners
                            </p>
                            <div className="af-filter-inputs-container">
                                <div className="af-filter-input-wrapper">
                                    <label htmlFor="partners-from"
                                           className="af-filter-input-label">From</label>
                                    <input className="af-filter-input" type="text" id="partners-from" {...register("followers_from")}/>
                                </div>
                                <div className="af-filter-input-wrapper">
                                    <label htmlFor="partners-to"
                                           className="af-filter-input-label">To</label>
                                    <input className="af-filter-input" type="text" id="partners-to" {...register("followers_to")}/>
                                </div>
                            </div>
                        </div>
                        <div className="af-filter">
                            <p className="af-filter-title">
                                Size of staking
                            </p>
                            <div className="af-filter-inputs-container">
                                <div className="af-filter-input-wrapper">
                                    <label htmlFor="staking-from"
                                           className="af-filter-input-label">From</label>
                                    <input className="af-filter-input" type="text" id="staking-from" {...register("deposit_self_from")}/>
                                </div>
                                <div className="af-filter-input-wrapper">
                                    <label htmlFor="staking-to"
                                           className="af-filter-input-label">To</label>
                                    <input className="af-filter-input" type="text" id="staking-to" {...register("deposit_self_to")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="af-filters-row">
                        <div className="af-filter">
                            <p className="af-filter-title">
                                Search
                            </p>
                            <div className="af-filter-input-wrapper">
                                {/*<input className="af-filter-input" type="text" value={query} onChange={queryHandler}/>*/}
                                <input className="af-filter-input" type="text" placeholder="Name / User ID" {...register("query")}/>
                            </div>
                        </div>
                        <div className="af-filter">
                            <p className="af-filter-title">
                                Level
                            </p>
                            <div className="af-filter-inputs-container">
                                <div className="af-filter-input-wrapper">
                                    <label htmlFor="lvl-from"
                                           className="af-filter-input-label">From</label>
                                    <input className="af-filter-input" type="text" id="lvl-from" {...register("deep_from")}/>
                                </div>
                                <div className="af-filter-input-wrapper">
                                    <label htmlFor="lvl-to"
                                           className="af-filter-input-label">To</label>
                                    <input className="af-filter-input" type="text" id="lvl-to" {...register("deep_to")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="af-filters-col">
                    <div className="af-filters-btn-container">
                        <button type="submit">Apply</button>
                    </div>
                    <div className="af-filters-btn-container">
                        <button className="popup-btn" onClick={clear}>Clear</button>
                    </div>
                </div>
            </form>
            {/*</div>*/}
        </>
    )
}

export const CareerBonusPopUp = ({setIsPopUpOpen}) => {

    const close = () => {
        setIsPopUpOpen(false);
    }

    return (
        <>
            <div className="popup-bg">
                <div className="popup-container">
                    <div className="popup-header">
                        <p className="popup-title">
                            Career bonus
                        </p>
                        <div className="popup-close">
                            <p className="popup-close-text">
                                Close
                            </p>
                            <img src={closeIcon} alt="close popup" className="popup-close-btn" onClick={close}/>
                        </div>
                    </div>

                    <div className="career-bonus-popup">
                        <div className="career-bonus-popup-card">
                            <div className="career-bonus-popup-card-content">
                                <p className="career-bonus-popup-card-title">
                                    Level
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L1
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L2
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L3
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L4
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L5
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L6
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L7
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L8
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                    L9
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l10">
                                    L10
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l11">
                                    L11
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l12">
                                    L12
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l13">
                                    L13
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l14">
                                    L14
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l15">
                                    L15
                                </p>
                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l16">
                                    L16
                                </p>
                            </div>

                            <div className="career-bonus-popup-card">
                                <div className="career-bonus-popup-card-content">
                                    <p className="career-bonus-popup-card-title">
                                        Deposit in USD
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $100
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $500
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $1,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $2,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $3,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $5,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $7,500
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $10,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                        $15,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l10">
                                        $20,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l11">
                                        $30,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l12">
                                        $40,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l13">
                                        $60,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l14">
                                        $80,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l15">
                                        $100,000
                                    </p>
                                    <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l16">
                                        $150,000
                                    </p>
                                </div>

                                <div className="career-bonus-popup-card">
                                    <div className="career-bonus-popup-card-content">
                                        <p className="career-bonus-popup-card-title">
                                            Front-line deposit
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            -
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            $500
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            $1,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            $2,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            $3,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            $6,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            $12,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            $25,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                            $50,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l10">
                                            $100,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l11">
                                            $200,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l12">
                                            $300,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l13">
                                            $500,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l14">
                                            $1,000,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l15">
                                            $2,000,000
                                        </p>
                                        <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l16">
                                            $3,000,000
                                        </p>
                                    </div>

                                    <div className="career-bonus-popup-card">
                                        <div className="career-bonus-popup-card-content">
                                            <p className="career-bonus-popup-card-title">
                                                Total Volume
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $5000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $25,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $50,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $75,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $100,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $175,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $250,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $500,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                $1,250,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l10">
                                                $2,500,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l11">
                                                $4,000,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l12">
                                                $7,500,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l13">
                                                $15,000,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l14">
                                                $25,000,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l15">
                                                $40,000,000
                                            </p>
                                            <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l16">
                                                $50,000,000
                                            </p>
                                        </div>

                                        <div className="career-bonus-popup-card">
                                            <div className="career-bonus-popup-card-content">
                                                <p className="career-bonus-popup-card-title">
                                                    Bonus
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    -
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    $200
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    $300
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    $500
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    $900
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    $1200
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    $1,500
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    $3,000
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l1">
                                                    $7,000
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l10">
                                                    $12,000
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l11">
                                                    $30,000
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l12">
                                                    $50,000
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l13">
                                                    $120,000
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l14">
                                                    $250,000
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l15">
                                                    $500,000
                                                </p>
                                                <p className="career-bonus-popup-card-amount career-bonus-popup-card-amount-l16">
                                                    $1,000,000
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
