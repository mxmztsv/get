import React from "react";

export const ChartTimeButton = (props) => {
  let { num, text, setTb, tb } = props;
  function handleClick(num) {
    if (num === 0) setTb([true, false, false, false]);
    else if (num === 1) setTb([false, true, false, false]);
    else if (num === 2) setTb([false, false, true, false]);
    else if (num === 3) setTb([false, false, false, true]);
  }

  return (
    <>
      <button
        className={`chart-time-button ${tb[num] ? "s-time" : ""}`}
        onClick={() => handleClick(num)}
        // style={{
        //   cursor: `${text !== "1D" ? "not-allowed" : "pointer"}`,
        //   color: `${text !== "1D" ? "rgba(255, 255, 255, 0.6)" : "white"}`,
        // }}
      >
        {text}
      </button>
    </>
  );
};

export const ChartTimeButtons = (props) => {
  const { tb, setTb } = props;
  return (
    <>
      <ChartTimeButton num={0} text="1D" tb={tb} setTb={setTb} />
      <ChartTimeButton num={1} text="7D" tb={tb} setTb={setTb} />
      <ChartTimeButton num={2} text="30D" tb={tb} setTb={setTb} />
      <ChartTimeButton num={3} text="ALL" tb={tb} setTb={setTb} />
    </>
  );
};
