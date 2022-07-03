import { getItem, setItem } from "../../utils/localStorage";
import { extendArr } from "./extendArr";
import { filterChart } from "./filterChart";

export function processPriceArrays(allPricesArray, setAllPArrays) {
  if (!allPricesArray || !allPricesArray.length) return;

  let dayArr = helper(allPricesArray, 0);
  let weekArr = helper(allPricesArray, 1);
  let monthArr = helper(allPricesArray, 2);
  let allArr = helper(allPricesArray, 3);

  let arrs = [dayArr, weekArr, monthArr, allArr];

  if (
    !getItem("pAllPA") ||
    getItem("pAllPA").at(-1).length !== arrs.at(-1).length
  ) {
    console.log("[processPricesArrs] reseted price array");
    setAllPArrays(arrs);
    setItem("pAllPA", arrs);
  } else {
    console.log("[processPricesArrs] prices the same");
  }
}

function helper(allPricesArray, selectedTimeFrameIndex) {
  let timeArray = [false, false, false, false];
  timeArray[selectedTimeFrameIndex] = true;

  let resArr = filterChart(allPricesArray, timeArray);
  if (!resArr) return;
  if (resArr.length < 12) resArr = extendArr(resArr, allPricesArray);
  return resArr;
}
