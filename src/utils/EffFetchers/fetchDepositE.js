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
    fetchDeposits().then((depsArr) => {
      console.log("[fetchDepositsE] deps arr:", depsArr);
      if (depsArr[0]) {
        console.log("[fetchDepositsE] fetched non-locked:", depsArr[0]);
        setNLDepAmount(depsArr[0].getAmount);
        setNLDepUsdAmount(depsArr[0].usdAmount);
        setTotalEarned2(depsArr[0].totalEarned);

        setItem("pnlDepId", depsArr[0].depId);
        setItem("pnlDepA", depsArr[0].getAmount);
        setItem("pnlDepAU", depsArr[0].usdAmount);
        setItem("pTotalEarned2", depsArr[0].totalEarned);
      }
      if (depsArr[1]) {
        console.log("[fetchDepositsE] fetched locked:", depsArr[1]);
        setLDepAmount(depsArr[1].getAmount);
        setLDepUsdAmount(depsArr[1].usdAmount);
        setTotalEarned1(depsArr[1].totalEarned);

        setItem("plDepId", depsArr[1].depId);
        setItem("plDepA", depsArr[1].getAmount);
        setItem("plDepAU", depsArr[1].usdAmount);
        setItem("pTotalEarned1", depsArr[1].totalEarned);
      }
    });
    setIsNeedUpdate(false);
  }
}
