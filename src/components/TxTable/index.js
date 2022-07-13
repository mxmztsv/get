import React, {useEffect, useRef, useState} from "react";
import { fetchTx } from "../../utils/fetchers/fetchTx";
import {Pagination} from "../../pages/Dashboard/Elements";

// @ts-ignore
export const Image = React.memo(function Image({ src }) {
  return <img src={src} alt="" className="tx-icon" />;
});

export const Amount = ({ amountGet, amountUsd, description }) => {
  return (
      <>
        <div className="numbers">
          {amountGet ? `${amountGet} GET` : `${amountUsd} USD`}
          <div className="tx-text">{description}</div>
        </div>
      </>
  )
}

export const TxTableBodyMemo = React.memo((props) => {
  let { txArray } = props;

  function getAmount(tx) {
    let amountGet = tx.amount.token;
    let amountUsd = tx.amount.usd;
    let description = tx.description;

    return (
        <Amount amountGet={amountGet} amountUsd={amountUsd} description={description}/>
    );
  }

  function getTime(time) {
    let dateArr = time.split(" ");

    let year = dateArr[0].split("-");
    let timeStr = dateArr[1].slice(0, -3) + " ";

    return (
      <p className="tx-time">
        <span className="time-span">{timeStr}</span>
        {year[1]}.{year[2]}.{year[0]}
      </p>
    );
  }

  function getStatus(status) {
    if (status === "Pending") {
      return (
        <p style={{ color: "#F6BD60" }}>
          <span>
            <img
              className="status-icon"
              src={require("../../assets/img/pending.svg").default}
              alt=""
            />
          </span>
          {status}
        </p>
      );
    } else if (status === "Complete") {
      return (
        <p style={{ color: "#A5FFD6" }}>
          <span>
            <img
              className="status-icon"
              src={require("../../assets/img/complete.svg").default}
              alt=""
            />
          </span>
          {status}
        </p>
      );
    } else if (status === "Canceled") {
      return (
        <p style={{ color: "#F28482" }}>
          <span>
            <img
              className="status-icon"
              src={require("../../assets/img/cancelled.svg").default}
              alt=""
            />
          </span>
          {status}
        </p>
      );
    }
  }

  function getType(type) {
    type = type.toLowerCase();
    let icon;
    if (type === "withdraw" || type === "unstake")
      icon = require("../../assets/img/down-type.svg").default;
    else if (type === "deposit" || type === "stake")
      icon = require("../../assets/img/up-type.svg").default;
    else icon = require("../../assets/img/circle-type.png");

    return <Image src={icon} />;
  }

  function getInfo(tx) {
    return tx.avail_after ? (
      <>
        <div className="header-3 yellow-text">{tx.avail_after}</div>
        <div className="grey-text">Withdrawable after</div>
      </>
    ) : (
      <></>
    );
  }

  return (
    <div className="tx-body-wrapper">
      {txArray && txArray.length ? (
        <>
          {txArray.map((tx) => {
            return (
              <div className="tx-row" key={tx.time + Math.random()}>
                {/* TOP */}
                <div className="tx-row-top">
                  {/* TOP-LEFT */}
                  <div className="left-tx-top">
                    {getType(tx.type)}
                    <div>
                      <div className="header-3">{tx.type}</div>
                      <div>{getTime(tx.time)}</div>
                    </div>
                  </div>
                  {/* TOP-RIGHT */}
                  <div className="right-tx-top">{getStatus(tx.status)}</div>
                </div>

                {/* FOOTER */}
                <div className="tx-row-footer">
                  {/* FOOTER-LEFT */}
                  <div className="tx-row-footer-left">{getAmount(tx)}</div>
                  {/* FOOTER-RIGHT */}
                  <div className="tx-row-footer-right">{getInfo(tx)}</div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="no-tx-wrapper">
            <img
              src={require("../../assets/img/red-cross.svg").default}
              alt=""
            />
            <div className="header-3">No transactions yet</div>
          </div>
        </>
      )}
    </div>
  );
});

export const TxTableBodyMob = () => {
  let txArray = fetchTx();

  function getTxIcon(type) {
    type = type.toLowerCase();
    let icon;
    if (type === "withdraw" || type === "unstake")
      icon = require("../../assets/img/down-type.svg").default;
    else if (type === "deposit" || type === "staked")
      icon = require("../../assets/img/up-type.svg").default;
    else icon = require("../../assets/img/circle-type.png").default;

    return <img className="tx-icon" src={icon} alt="tx-type" />;
  }

  function getAmount(type, amount) {
    type = type.toLowerCase();
    if (type === "withdraw") {
      return (
        <>
          <p className="small-grey-header">For {amount.usd} USD</p>
          <p>{amount.token} GET</p>
        </>
      );
    } else if (type === "stake") {
      return <p>{amount.token} GET</p>;
    } else if (type === "deposit") {
      return (
        <>
          <p className="small-grey-header">For {amount.usd} USD</p>
          <p>{amount.token} GET</p>
        </>
      );
    }
  }

  function getTime(timestamp) {
    let date = new Date(timestamp * 1000);
    return (
      <p className="small-grey-header">
        <span className="time-span">
          {date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }) + " "}
        </span>
        {date.toLocaleDateString("ru-RU")}
      </p>
    );
  }

  function getStatus(status) {
    if (status === "Pending") {
      return (
        <div className="flex-bottom">
          <div></div>
          <img
            className="status-icon"
            src={require("../../assets/img/done-mob.svg").default}
            alt=""
          />
        </div>
      );
    } else if (status === "Complete") {
      return (
        <div className="flex-bottom">
          <div></div>
          <img
            className="status-icon"
            src={require("../../assets/img/done-mob.svg").default}
            alt=""
          />
        </div>
      );
    } else if (status === "Cancelled") {
      return (
        <div className="flex-bottom">
          <div></div>
          <img
            className="status-icon"
            src={require("../../assets/img/done-mob.svg").default}
            alt=""
          />
        </div>
      );
    }
  }

  return (
    <>
      {txArray.map((tx) => {
        return (
          <div className="tx-row-mob" key={tx.time}>
            <div className="tx-icon">{getTxIcon(tx.type)}</div>
            <div className="tx-type-time-mob flex-bottom">
              <div className="tx-type-mob medium-yellow-header">{tx.type}</div>
              <div className="tx-time">{getTime(tx.time)}</div>
            </div>
            <div className="tx-amount-mob">{getAmount(tx.type, tx.amount)}</div>
            <div className="tx-status-mob">{getStatus(tx.status)}</div>
          </div>
        );
      })}
    </>
  );
};
