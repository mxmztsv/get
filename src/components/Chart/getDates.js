export function getDates(priceArr, selectedTimeArr, width) {
  // timestamp to date
  let resArr = [];

  if (selectedTimeArr[0]) {
    // if 1d time frame
    priceArr.forEach((point) => {
      let date = new Date(point.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      date = date.slice(0, -2) + "00";
      resArr.push(date);
    });
  } else {
    // array with all dates
    priceArr.forEach((point) => {
      let date = new Date(point.timestamp).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      });
      if (!resArr.includes(date)) resArr.push(date);
    });
  }

  // remove extra dates
  let maxNumberOfTicks;
  if (width <= 815) maxNumberOfTicks = 6;
  else if (width <= 1000) maxNumberOfTicks = 7;
  else if (width <= 1100) maxNumberOfTicks = 8;
  else maxNumberOfTicks = 10;

  if (resArr.length > maxNumberOfTicks) {
    let indexCounter = 1;
    do {
      resArr.splice(indexCounter, resArr.length % 2 === 0 ? 1 : 2);
    } while (resArr.length > maxNumberOfTicks);
  }

  return resArr.reverse();
}
