import { fetchChartData } from "../fetchers/fetchChartData";
import { setItem } from "../localStorage";

export async function fetchChartE(
  setPriceArray,
  setTokenPrevPrice,
  setTokenPrice
) {
  let res = await fetchChartData();
  if (res.data && res.data.result === "success" && res.data.data.rates.length) {
    let rates = res.data.data.rates;

    let resArray = [];
    rates.forEach((rate) => {
      resArray.push({
        time: new Date(rate.times * 1000).toTimeString().slice(0, 5),
        timestamp: rate.times * 1000,
        price: rate.cost,
      });
    });

    if (setTokenPrice) {
      setTokenPrice(resArray.at(-1).price);
      setItem("pTP", resArray.at(-1).price);
    }

    if (setTokenPrevPrice) {
      let dayMill = 86400000;
      let nowTime = Date.now();
      let temparr = resArray.filter((point) => {
        return nowTime - point.timestamp > dayMill;
      });
      let prevPrice = temparr.at(-1).price;

      setTokenPrevPrice(prevPrice);
      setItem("prevTP", prevPrice);
    }

    return resArray;
  }
}