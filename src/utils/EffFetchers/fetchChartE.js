import { fetchChartData } from "../fetchChartData";
import { getItem, setItem } from "../localStorage";

export async function fetchChartE(setPriceArray, setTokenPrevPrice) {
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
      setTokenPrevPrice(resArray.at(-2).price);
      setPriceArray(resArray);

      setItem("prevTP", resArray.at(-2).price);
      setItem("pPA", resArray);
      console.log("[fetchChartE] updated chart");
    } else {
      console.log("[fetchChartE] chart the same");
    }
  }
}
