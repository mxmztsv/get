import { fetchDeposits } from "../fetchers/fetchDeposits";
import { getItem, setItem } from "../localStorage";
import { tempDep } from "../tempDep";

export async function fetchDepositsE(
  setLockedDep,
  setNonLockedDep,
  setPendingDeps
) {
  if (getItem("token")) {
    fetchDeposits().then((depsArr) => {
      console.log("[fetchDepositsE] deps arr:", depsArr);

      if (setPendingDeps) {
        // processing pending deposits
        let pendingDeps = depsArr.filter(
          (dep) => dep.status === 2 && dep.type === 4
        );
        setPendingDeps(pendingDeps);
        setItem("pendingDeps", pendingDeps);
      }

      // processing non-pending deps
      let nonLockedDep = depsArr.filter(
        (dep) => dep.status === 1 && dep.type === 4
      )[0];
      let lockedDep = depsArr.filter(
        (dep) => dep.status === 1 && dep.type === 5
      )[0];

      // non-locked dep
      if (nonLockedDep) {
        console.log("[fetchDepositsE] fetched non-locked:", nonLockedDep);
        setNonLockedDep(nonLockedDep);
        setDepsItems(nonLockedDep, false);
      } else {
        console.log("[fetchDepositsE] no non-locked deps");
        setNonLockedDep(tempDep);
        setItem("nlDep", tempDep);
      }

      // locked dep
      if (lockedDep) {
        console.log("[fetchDepositsE] fetched locked:", lockedDep);
        setLockedDep(lockedDep);
        setDepsItems(lockedDep, true);
      } else {
        console.log("[fetchDepositsE] no locked deps");
        setLockedDep(tempDep);
        setItem("lDep", tempDep);
      }
    });
  }
}

function setDepsItems(dep, isLock) {
  let s = isLock ? "l" : "nl";
  setItem(`${s}Dep`, dep);

  setItem(`p${s}DepId`, dep.depId);
  setItem(`p${s}DepA`, dep.getAmount);
  setItem(`p${s}DepAU`, dep.usdAmount);
  setItem(`isR${dep.depId}`, dep.isR);
  setItem(`pTotalEarned${isLock ? "1" : "2"}`, dep.totalEarned);
}
