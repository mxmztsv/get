import React from "react";

export const EarnedTimeButton = (props) => {
  let { num, text, setTb, tb } = props;

  function handleClick(num) {
    if (num === 0) setTb([true, false, false, false]);
    else if (num === 1) setTb([false, true, false, false]);
    else if (num === 2) setTb([false, false, true, false]);
    else if (num === 3) setTb([false, false, false, true]);
  }

  return (
    <>
      {/* <button
        className={`chart-time-button ${tb[num] ? "s-time" : ""}`}
        onClick={() => {
          handleClick(num);
        }}
      >
        {text}
      </button> */}
      <button
        className={`chart-time-button ${tb[num] ? "s-time" : "grey-text"}`}
        // onClick={() => {
        //   handleClick(num);
        // }}
      >
        {text}
      </button>
    </>
  );
};

export const EarnedTimeButtons = (props) => {
  const { tb, setTb } = props;
  return (
    <>
      <EarnedTimeButton num={0} text="1W" tb={tb} setTb={setTb} />
      <EarnedTimeButton num={1} text="1M" tb={tb} setTb={setTb} />
      <EarnedTimeButton num={2} text="3M" tb={tb} setTb={setTb} />
      <EarnedTimeButton num={3} text="ALL" tb={tb} setTb={setTb} />
    </>
  );
};
