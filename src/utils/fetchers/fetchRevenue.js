import { sendReq } from "../sendReq";

export async function fetchRevenue(
  setDayRev,
  setWeekRev,
  setMonthRev,
  setAllRev
) {
  let res = await sendReq("get", "affiliate/stat");

  if (
    res &&
    res.data &&
    res.data.result === "success" &&
    res.data.data.metrics
  ) {
    let metrics = res.data.data.metrics.GET;
    let dayRev = metrics.total_day;
    let weekRev = metrics.total_week;
    let monthRev = metrics.total_month;
    let allRev = metrics.total_profit;

    setDayRev(dayRev);
    setWeekRev(weekRev);
    setMonthRev(monthRev);
    setAllRev(allRev);
  }
}
