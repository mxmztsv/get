import React from "react";
import { SyncLoader } from "react-spinners";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useWindowDimensions from "../../hooks/useWindow";
import { getDates } from "./getDates";

export const Ticks = ({ dates }) => {
  return (
    <>
      <div className="labels-wrapper">
        {dates.map((elem) => {
          return (
            <div
              className="label"
              key={`${elem}${Math.random() * 1231230123012}`}
            >
              {elem}
            </div>
          );
        })}
      </div>
    </>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          <span>
            <img src={require("../../assets/img/dot.svg").default} alt="" />
          </span>
          ${payload[0].value.toLocaleString("en-US")}
        </p>
      </div>
    );
  }
  return null;
};

const CustomDot = ({ cx, cy }) => {
  let waveWidth = "10px";
  let waveWidthRes = "40px";
  let waveRadius = "40";

  let begin1 = "1.5s";
  let begin2 = "3s";
  let begin3 = "3s";
  let begin4 = "4s";
  let begin5 = "5s";

  let totalDur = "5.5s";

  let wavesColor = "url(#gradient-waves)";

  return (
    <svg id="radar-circle">
      <defs>
        <linearGradient
          x1="97.3756325%"
          y1="100%"
          x2="0%"
          y2="100%"
          id="gradient-dot"
        >
          <stop offset="0%" stopColor="#FEB85D" />
          <stop offset="100%" stopColor="#F49FBC" />
        </linearGradient>

        <radialGradient
          x1="97.3756325%"
          y1="100%"
          x2="0%"
          y2="100%"
          id="gradient-waves"
        >
          <stop offset="50%" stopColor="rgba(254, 184, 93, 1)" />
          <stop offset="100%" stopColor="rgba(254, 184, 93, 0.7)" />
        </radialGradient>
      </defs>

      <circle
        cx={cx}
        cy={cy}
        r="0"
        fillOpacity="0"
        stroke={wavesColor}
        strokeWidth={waveWidth}
        strokeOpacity="1"
      >
        <animate
          attributeName="r"
          from="0"
          to={waveRadius}
          dur={totalDur}
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          from="1"
          to="0"
          dur={totalDur}
          repeatCount="indefinite"
        ></animate>

        <animate
          attributeName="stroke-width"
          from={waveWidth}
          to={waveWidthRes}
          dur={totalDur}
          repeatCount="indefinite"
        ></animate>
      </circle>

      <circle
        cx={cx}
        cy={cy}
        r="0"
        fillOpacity="0"
        stroke={wavesColor}
        strokeWidth={waveWidth}
        strokeOpacity="1"
      >
        <animate
          attributeName="r"
          from="0"
          to={waveRadius}
          dur={totalDur}
          repeatCount="indefinite"
          begin={begin1}
        />
        <animate
          attributeName="stroke-opacity"
          from="1"
          to="0"
          dur={totalDur}
          repeatCount="indefinite"
          begin={begin1}
        ></animate>
        <animate
          attributeName="stroke-width"
          from={waveWidth}
          to={waveWidthRes}
          dur={totalDur}
          repeatCount="indefinite"
          begin={begin1}
        ></animate>
      </circle>

      <circle
        cx={cx}
        cy={cy}
        r="0"
        fillOpacity="0"
        stroke={wavesColor}
        strokeWidth={waveWidth}
        strokeOpacity="1"
      >
        <animate
          attributeName="r"
          from="0"
          to={waveRadius}
          dur={totalDur}
          repeatCount="indefinite"
          begin={begin2}
        />
        <animate
          attributeName="stroke-opacity"
          from="1"
          to="0"
          dur={totalDur}
          repeatCount="indefinite"
          begin={begin2}
        ></animate>
        <animate
          attributeName="stroke-width"
          from={waveWidth}
          to={waveWidthRes}
          dur={totalDur}
          repeatCount="indefinite"
          begin={begin2}
        ></animate>
      </circle>

      {/* <circle
          cx={cx}
          cy={cy}
          r="0"
          fillOpacity="0"
          stroke="#FEB85D"
          strokeWidth={waveWidth}
          strokeOpacity="1"
        >
          <animate
            attributeName="r"
            from="0"
            to={waveRadius}
            dur={totalDur}
            repeatCount="indefinite"
            begin={begin3}
          />
          <animate
            attributeName="strokeOpacity"
            from="1"
            to="0"
            dur={totalDur}
            repeatCount="indefinite"
            begin={begin3}
          ></animate>
        </circle> */}

      {/* <circle
          cx={cx}
          cy={cy}
          r="0"
          fillOpacity="0"
          stroke="#FEB85D"
          strokeWidth={waveWidth}
          strokeOpacity="1"
        >
          <animate
            attributeName="r"
            from="0"
            to={waveRadius}
            dur={totalDur}
            repeatCount="indefinite"
            begin={begin4}
          />
          <animate
            attributeName="strokeOpacity"
            from="1"
            to="0"
            dur={totalDur}
            repeatCount="indefinite"
            begin={begin4}
          ></animate>
        </circle> */}

      {/* <circle
          cx={cx}
          cy={cy}
          r="0"
          fillOpacity="0"
          stroke="url(#gradient-waves)"
          strokeWidth={waveWidth}
          strokeOpacity="1"
        >
          <animate
            attributeName="r"
            from="0"
            to={waveRadius}
            dur={totalDur}
            repeatCount="indefinite"
            begin={begin5}
          />
          <animate
            attributeName="strokeOpacity"
            from="1"
            to="0"
            dur={totalDur}
            repeatCount="indefinite"
            begin={begin5}
          ></animate>
        </circle> */}

      <circle
        cx={cx}
        cy={cy}
        r="7"
        fill="url(#gradient-dot)"
        // stroke="url(#gradient-dot)"
        stroke="white"
        // stroke="#979797"
      ></circle>
    </svg>
  );
};

export const Chart = React.memo((props) => {
  let { allPricesArray, sTA, width } = props;

  if (!allPricesArray || !allPricesArray.length) return;

  return (
    <>
      <ResponsiveContainer
        height="90%"
        className="chart-container"
        key={`${Math.random() * 10230123012}`}
      >
        {allPricesArray[sTA.indexOf(true)].length ? (
          <LineChart
            key={sTA.indexOf(true) + "12312312031203"}
            data={allPricesArray[sTA.indexOf(true)] || []}
            margin={{
              top: 5,
              right: width > 815 ? 40 : 20,
              left: 0,
              bottom: width > 815 ? 15 : 0,
            }}
          >
            <defs>
              <linearGradient
                x1="97.3756325%"
                y1="100%"
                x2="0%"
                y2="100%"
                id="gradient"
              >
                <stop offset="0%" stopColor="#F49FBC" />
                <stop offset="50%" stopColor="#FEB85D" />
                <stop offset="100%" stopColor="#54F2F2" />
              </linearGradient>

              <filter id="glow" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="20" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="1" />
                </feComponentTransfer>
                <feBlend in2="SourceGraphic" />
              </filter>
            </defs>

            <CartesianGrid horizontal={true} vertical={false} />
            <XAxis axisLine={false} hide={true} tickLine={false} />
            <YAxis
              axisLine={false}
              tickCount={7}
              domain={[
                (dataMin) => dataMin - dataMin * 0.08,
                (dataMax) => dataMax + dataMax * 0.08,
              ]}
              tickFormatter={(tick) =>
                (Math.round(tick * 1000) / 1000).toString()
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(134, 168, 231, 0.12)",
                border: "none",
              }}
              // @ts-ignore
              content={<CustomToolTip />}
              isAnimationActive={width > 815 ? true : false}
              animationDuration={200}
              offset={width > 815 ? 10 : 30}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
                  ? "#fdb861"
                  : "url(#gradient)"
              }
              filter="url(#glow)"
              dot={false}
              animationDuration={3500}
              id={`chart-line-${sTA.indexOf(true)}`}
              key={`chart-line-${sTA.indexOf(true)}`}
              // @ts-ignore
              activeDot={<CustomDot />}
              strokeWidth="3"
              colorInterpolationFilters="sRGB"
            />
          </LineChart>
        ) : (
          <div className="chart-loader">
            <SyncLoader color="#feb85d" size={10} speedMultiplier={0.5} />
          </div>
        )}
      </ResponsiveContainer>
      <Ticks dates={getDates(allPricesArray[sTA.indexOf(true)], sTA, width)} />
    </>
  );
});

export const ChartDisabled = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="disabled-chart-wrapper">
      <div className="lines-wrapper">
        <div className="price-wrapper">
          <div className="line-text">0.5</div>
          <div className="line-text">0.4</div>
          <div className="line-text">0.3</div>
          <div className="line-text">0.2</div>
          <div className="line-text">0.1</div>
          <div className="line-text">0</div>
        </div>

        <div className="not-launched-text">
          <p> Token not launched yet</p>
        </div>
      </div>

      <div className="labels-wrapper">
        <div className="label">12:00</div>
        <div className="label">10:00</div>
        <div className="label">08:00</div>
        <div className="label">06:00</div>
        <div className="label">04:00</div>
        <div className="label">02:00</div>
        <div className="label">00:00</div>
      </div>
    </div>
  );
};
