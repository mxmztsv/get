import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useWindowDimensions from "../../hooks/useWindow";
import { refChartData, refChartDataMob } from "../../utils/fetchRefChartData";

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          <span>
            <img src={require("../../assets/img/dot.svg").default} alt="" />
          </span>
          {payload[0].value.toLocaleString("en-US")}
        </p>
      </div>
    );
  }
  return null;
};

export const ChartRefs = () => {
  const { width } = useWindowDimensions();

  const BarShape = (props) => {
    let { width, height, x, y, x1, y1, x2, y2 } = props;
    return (
      <>
        <defs>
          <linearGradient
            id={`${x}${y}1`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            gradientTransform="rotate(90)"
            // x1="90.932%"
            // y1="100.318%"
            // x2="0%"
            // y2="100%"
            // gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FEB85D" />
            <stop offset="1" stopColor="#F49FBC" />
          </linearGradient>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx="6"
          fill={`url(#${x}${y}1)`}
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="4"
        />
      </>
    );
  };

  const CustomBG = (props) => {
    let { width, height, x, y } = props;
    return (
      <>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx="5.67315"
          fill="white"
          fillOpacity="0.08"
        />
      </>
    );
  };

  return (
    <ResponsiveContainer height="100%" className="chart-container">
      <BarChart
        data={width > 815 ? refChartData : refChartDataMob}
        margin={{
          top: 5,
          right: width > 815 ? 40 : 0,
          left: 0,
          bottom: width > 815 ? 15 : 5,
        }}
      >
        <defs>
          <linearGradient
            x1="97.3756325%"
            y1="100%"
            x2="0%"
            y2="100%"
            id="gradient_old"
          >
            <stop offset="0%" stopColor="#F49FBC" />
            <stop offset="50%" stopColor="#FEB85D" />
            <stop offset="100%" stopColor="#54F2F2" />
          </linearGradient>

          <linearGradient
            id="gradient"
            x1="90.932%"
            y1="100.318%"
            x2="4.0845%"
            y2="114.258%"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FEB85D" />
            <stop offset="1" stopColor="#F49FBC" />
          </linearGradient>

          <filter id="glow" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="20" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
            <feBlend in2="SourceGraphic" />
          </filter>
        </defs>

        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis axisLine={false} dataKey="date" />
        <YAxis axisLine={false} />
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

        <Bar
          maxBarSize={20}
          dataKey="refNum"
          // @ts-ignore
          shape={<BarShape />}
          background={<CustomBG />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
