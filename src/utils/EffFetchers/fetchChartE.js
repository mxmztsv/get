import { fetchChartData } from "../fetchers/fetchChartData";
import { getItem, setItem } from "../localStorage";

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
        price: rate.cost,
      });
    });

    if (
      !getItem("pPA") ||
      resArray.at(-1).time !== getItem("pPA").at(-1).time
    ) {
      setPriceArray(resArray);
      setItem("pPA", resArray);
      console.log("[fetchChartE] updated chart");
    } else {
      console.log("[fetchChartE] chart the same");
    }

    if (setTokenPrice) {
      setTokenPrice(resArray.at(-1).price);
      setItem("pTP", resArray.at(-1).price);
    }

    setTokenPrevPrice(resArray.at(-2).price);
    setItem("prevTP", resArray.at(-2).price);
  }
}
