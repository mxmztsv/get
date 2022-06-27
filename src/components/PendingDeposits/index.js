import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import useWindowDimensions from "../../hooks/useWindow";
import { fN } from "../../utils/formatNumber";
import { Image } from "../TxTable";
import { handleDepCancel } from "./handleDepCancel";

export const PendingDepositsMemo = React.memo((props) => {
  let { depsArr, setIsNeedUpdate } = props;
  const { width } = useWindowDimensions();

  return (
    <>
      {depsArr && depsArr.length ? (
        <div
          className={`tx-body-wrapper  ${
            width < 815 ? "unstake-pending-mob brd-top" : ""
          }`}
        >
          <div className="header-3">PENDING STATUS</div>

          {depsArr.map((dep) => {
            return (
              <PendingDepRow
                dep={dep}
                key={dep.delayEnd + Math.random()}
                setIsNeedUpdate={setIsNeedUpdate}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

const PendingDepRow = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  let { dep, setIsNeedUpdate } = props;

  function getAmount(amountGet) {
    return (
      <>
        <div className="numbers dark-span">
          {fN(amountGet, 2, true)} GET
          {/* <span>| {amountGet} </span> */}
          <div className="tx-text">Withdraw from non-locked deposit</div>
        </div>
      </>
    );
  }

  function getTime(time) {
    let dateObj = new Date(time * 1000);
    dateObj.setMonth(dateObj.getMonth() - 2);

    let options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    let dateStr = dateObj.toLocaleString("en-US", options).split(" ");
    let date = dateStr[0].split("/");
    let timeStr = dateStr[1];

    return (
      <p className="tx-time">
        <span className="time-span">{timeStr} </span>
        {date[0]}.{date[1]}.{date[2].slice(0, -1)}
      </p>
    );
  }

  function getStatus(depId) {
    return (
      <button
        className="transparent-button yellow-trans-btn"
        style={{
          justifyContent: "center",
          minWidth: "105px",
          marginRight: "0",
        }}
        onClick={async () => {
          setIsLoading(true);
          await handleDepCancel(depId, setIsNeedUpdate);
          setIsLoading(false);
        }}
      >
        {isLoading ? (
          <div>
            <SyncLoader color="#feb85d" size={10} speedMultiplier={0.5} />
          </div>
        ) : (
          "CANCEL"
        )}
      </button>
    );
  }

  function getType() {
    let icon = require("../../assets/img/down-type.svg").default;

    return <Image src={icon} />;
  }

  function getInfo(time) {
    let dateObj = new Date(time * 1000);

    let options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    let dateStr = dateObj.toLocaleString("en-US", options).split(" ");
    let date = dateStr[0].split("/");
    let timeStr = dateStr[1];

    return (
      <>
        <div className="header-3 yellow-text">
          {date[0]}.{date[1]}.{date[2].slice(0, -1)}
        </div>
        <div className="grey-text">Withdrawable after</div>
      </>
    );
  }

  return (
    <div className="tx-row">
      {/* TOP */}
      <div className="tx-row-top">
        {/* TOP-LEFT */}
        <div className="left-tx-top">
          {getType()}
          <div>
            <div
              className={`header-3 ${width < 815 ? "unstake-type-mob" : ""}`}
            >
              UNSTAKING
            </div>
            <div>{getTime(dep.delayEnd)}</div>
          </div>
        </div>
        {/* TOP-RIGHT */}
        <div className="right-tx-top">{getStatus(dep.depId)}</div>
      </div>

      {/* FOOTER */}
      <div className="tx-row-footer">
        {/* FOOTER-LEFT */}
        <div className="tx-row-footer-left">{getAmount(dep.getAmount)}</div>
        {/* FOOTER-RIGHT */}
        <div className="tx-row-footer-right">{getInfo(dep.delayEnd)}</div>
      </div>
    </div>
  );
};
