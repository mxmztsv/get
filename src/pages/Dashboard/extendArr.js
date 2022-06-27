export function extendArr(resPrices, allPrices) {
  let resArr = [];

  let hourMill = 3600000;
  let dayMill = 86400000;
  let nowTime = Date.now();

  // extend last price
  for (let i = 0; i < 12; i++) {
    // find all points within current 2-hours
    let timeFrameStart = nowTime - dayMill + 2 * hourMill * i; // now - 24 + 2 hours * i
    let timeFrameEnd = nowTime - dayMill + 2 * hourMill * (i + 1); // now - + 2 hours * (i + 1)
    let curFramePoints = resPrices.filter((point) => {
      return (
        point.timestamp >= timeFrameStart && point.timestamp <= timeFrameEnd
      );
    });

    // if no points in this tf
    // - get it from previous point
    // - if current point is first, find previous point in global array
    if (!curFramePoints || !curFramePoints.length) {
      // getting first point before this timeframe
      let curPoint = allPrices
        .filter((point) => {
          return point.timestamp < timeFrameStart;
        })
        .at(-1);
      resArr.push({
        time: "00:00",
        timestamp: timeFrameStart,
        price: curPoint.price,
      });
    } else {
      resArr.push(...curFramePoints);
    }
  }

  if (resArr.every((val, _, arr) => val === arr[0])) {
    resArr[-1].price = resArr[-1].price + 0.0000001;
  }

  return resArr;
}
