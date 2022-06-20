import { fetchDeposits } from "../fetchers/fetchDeposits";
import { getItem, setItem } from "../localStorage";
import { tempDep } from "../tempDep";

export async function fetchDepositsE(
  setLockedDep,
  setNonLockedDep,
  setIsNeedUpdate,
  pendingMode,
  setPendingDeps
) {
  if (getItem("token")) {
    fetchDeposits().then((depsArr) => {
      console.log("[fetchDepositsE] deps arr:", depsArr);
      if (pendingMode) {
        depsArr = depsArr.filter((dep) => dep.status === 2 && dep.type === 4);
        setPendingDeps(depsArr);
        setItem("pendingDeps", depsArr);
      } else {
        // fetching pending deposits
        let nonLockedDep = depsArr.filter(
          (dep) => dep.status === 1 && dep.type === 4
        )[0];
        let lockedDep = depsArr.filter(
          (dep) => dep.status === 1 && dep.type === 5
        )[0];

        if (nonLockedDep) {
          // fetching non-locked deposits
          console.log("[fetchDepositsE] fetched non-locked:", nonLockedDep);
          setNonLockedDep(nonLockedDep);
          setItem("nlDep", nonLockedDep);

          setItem("pnlDepId", nonLockedDep.depId);
          setItem("pnlDepA", nonLockedDep.getAmount);
          setItem("pnlDepAU", nonLockedDep.usdAmount);
          setItem(`isR${nonLockedDep.depId}`, nonLockedDep.isR);
          setItem("pTotalEarned2", nonLockedDep.totalEarned);
        } else {
          console.log("[fetchDepositsE] no non-locked deps");
          setNonLockedDep(tempDep);
          setItem("nlDep", tempDep);
        }

        if (lockedDep) {
          // fetching locked deposits
          console.log("[fetchDepositsE] fetched locked:", lockedDep);
          setLockedDep(lockedDep);
          setItem("lDep", lockedDep);

          setItem("plDepId", lockedDep.depId);
          setItem("plDepA", lockedDep.getAmount);
          setItem("plDepAU", lockedDep.usdAmount);
          setItem(`isR${lockedDep.depId}`, lockedDep.isR);
          setItem("pTotalEarned1", lockedDep.totalEarned);
        }
      }
    });
    setIsNeedUpdate(false);
  }
}
