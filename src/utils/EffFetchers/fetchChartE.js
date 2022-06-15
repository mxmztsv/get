import { fetchChartData } from "../fetchChartData";
import { getItem, setItem } from "../localStorage";

export async function fetchChartE(setPriceArray, setTokenPrevPrice) {
  let res = await fetchChartData();
  console.log("walexc:", res);
  if (res.data && res.data.result === "success" && res.data.data.rates.length) {
    let rates = res.data.data.rates;

    let resArray = [];
    rates.forEach((rate) => {
      let time1 = Math.floor(new Date(rate.times * 1000));
      console.log("time:", time1);
      console.log("time2:", new Date(time1));
      resArray.push({
        time: new Date(rate.times * 1000).toTimeString().slice(0, 5),
        price: rate.cost,
      });
    });

    if (
      !getItem("pPA") ||
      resArray.at(-1).times !== getItem("pPA").at(-1).times
    ) {
      console.log("walexc pricearr:", resArray);
      setItem("pPA", resArray);

      console.log("prevntp:", resArray[0].price);
      setItem("prevTP", resArray[0].price);

      setTokenPrevPrice(resArray[0].price);
      setPriceArray(resArray);
    } else {
      console.log("wallexc: Chart the same");
    }
  }
}
