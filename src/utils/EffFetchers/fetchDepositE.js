import { fetchDeposits } from "../fetchDeposits";
import { setItem } from "../localStorage";

export async function fetchDepositsE(user, setters) {
  let {
    setLDepAmount,
    setLDepUsdAmount,
    setTotalEarned1,
    setNLDepAmount,
    setNLDepUsdAmount,
    setTotalEarned2,
    setIsNeedUpdate,
  } = setters;
  if (user) {
    console.log("fetching deposits");
    fetchDeposits().then((depsArr) => {
      console.log("deps arr:", depsArr);
      if (depsArr[0]) {
        console.log("fetched non-locked:", depsArr[0]);
        setNLDepAmount(depsArr[0].getAmount);
        setNLDepUsdAmount(depsArr[0].usdAmount);
        setTotalEarned2(depsArr[0].totalEarned);

        setItem("pnlDepId", depsArr[0].depId);
        setItem("pnlDepA", depsArr[0].getAmount);
        setItem("pnlDepAU", depsArr[0].usdAmount);
      }
      if (depsArr[1]) {
        console.log("fetched locked:", depsArr[1]);
        setLDepAmount(depsArr[1].getAmount);
        setLDepUsdAmount(depsArr[1].usdAmount);
        setTotalEarned1(depsArr[1].totalEarned);

        setItem("plDepId", depsArr[1].depId);
        setItem("plDepA", depsArr[1].getAmount);
        setItem("plDepAU", depsArr[1].usdAmount);
      }
    });
    setIsNeedUpdate(false);
  }
}
