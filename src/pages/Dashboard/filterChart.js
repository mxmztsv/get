export function filterChart(chartArr, selectedTimeArr) {
  // 0 - 1d, 1 - 7d, 2 - 30d, 3 - all
  let selectedTime = selectedTimeArr.indexOf(true);

  let dayMill = 86400000;
  let weekMill = 604800016;
  let monthMill = 2629800000;

  // if nowtime - point.timestamp < 1dtime
  let nowStamp = Date.now();

  if (!chartArr[0] || !chartArr[0].timestamp) return;

  let resArray = [];
  if (selectedTime === 0) {
    // 1d
    for (let i = chartArr.length - 1; i >= 0; i--) {
      console.log("[filter]current point:", chartArr[i].timestamp);
      console.log("[filter]cond:", nowStamp - chartArr[i].timestamp < dayMill);
      if (nowStamp - chartArr[i].timestamp < dayMill)
        resArray.push(chartArr[i]);
      else break;
    }
  } else if (selectedTime === 1) {
    // 1w
    for (let i = chartArr.length - 1; i >= 0; i--) {
      if (nowStamp - chartArr[i].timestamp < weekMill)
        resArray.push(chartArr[i]);
      else break;
    }
  } else if (selectedTime === 2) {
    // 1m
    for (let i = chartArr.length - 1; i >= 0; i--) {
      if (nowStamp - chartArr[i].timestamp < monthMill)
        resArray.push(chartArr[i]);
      else break;
    }
  } else {
    resArray = chartArr.reverse();
  }

  return resArray.reverse();
}
