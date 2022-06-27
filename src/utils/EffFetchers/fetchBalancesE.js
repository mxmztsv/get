import { fetchBalances } from "../fetchers/fetchBalances";
import { getItem, setItem } from "../localStorage";

export async function fetchBalancesE(
  setUsdtBal,
  setGetBal,
  setUsdtBal4,
  setGetBal4
) {
  if (getItem("token")) {
    if (setUsdtBal && setUsdtBal4) {
      fetchBalances().then((bals) => {
        setUsdtBal(bals[0].usdtBal);
        setGetBal(bals[0].getBal);
        setItem("pUsdtBal", bals[0].usdtBal);
        setItem("pGetBal", bals[0].getBal);

        setUsdtBal4(bals[1].usdtBal);
        setGetBal4(bals[1].getBal);
        setItem("pUsdtBal4", bals[1].usdtBal);
        setItem("pGetBal4", bals[1].getBal);
      });
    }
  }
}
