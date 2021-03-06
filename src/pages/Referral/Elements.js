import useWindowDimensions from "../../hooks/useWindow";
import {RefLinkBody} from "./RefLinkBody";
import {fetchFilteredRefs} from "./helpers";
import { Controller, useForm } from "react-hook-form";
import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// elems
export const CurLvlBox = (props) => {
    const {width} = useWindowDimensions();
    let {curLvl} = props;
    return (
        <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
            <div className="medium-white-header">Current level</div>
            <div className="ref-lvl-val">{curLvl ? curLvl : "-"}</div>
        </div>
    );
};

export const RefHeader = (props) => {
    let {refLink, invitedByName, curLvl} = props;
    return (
        <div className="ref-lvl-link-container brd-btm">
            <CurLvlBox curLvl={curLvl}/>
            <InvitedByBox invitedByName={invitedByName}/>
            <RefLinkBody refLink={refLink}/>
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
    let {time, totalEarned} = props;
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
    let {totalEarned} = props;
    return (
        <>
            <div className="dash-box s-box">
                <div className="small-grey-header">Total earned</div>
                <div className="dash-box-body" style={{paddingBottom: "0"}}>
                    {totalEarned || "-"} GET
                </div>
            </div>
        </>
    );
};

// REF FOOTER MOB
export const RRSwitch = (props) => {
    let {isRev, setIsRev} = props;

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
    const {width} = useWindowDimensions();
    let {invitedByName} = props;

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
    const {width} = useWindowDimensions();
    let {teamSize} = props;

    return (
        <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
            <div className="medium-white-header">Team Size</div>
            <div className="ref-lvl-val">{teamSize !== "" ? teamSize : "-"}</div>
        </div>
    );
};

export const FirstLineSizeBox = (props) => {
    const {width} = useWindowDimensions();
    let {frontLineSize} = props;

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
    const {width} = useWindowDimensions();
    let {numberOfLines} = props;

    return (
        <div className={`cur-lvl-container ${width > 815 ? "" : "brd-top"}`}>
            <div className="medium-white-header">Number of Lines</div>
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
// -------------------------------------------------
