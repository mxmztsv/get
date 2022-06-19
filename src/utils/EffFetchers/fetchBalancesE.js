import { fetchBalances } from "../fetchers/fetchBalances";
import { getItem, setItem } from "../localStorage";

export async function fetchBalancesE(
  setUsdtBal,
  setGetBal,
  setUsdtBal4,
  setGetBal4
) {
  if (getItem("token")) {
    if (setUsdtBal) {
      fetchBalances("0").then((bals) => {
        setUsdtBal(bals.usdtBal);
        setGetBal(bals.getBal);
        setItem("pUsdtBal", bals.usdtBal);
        setItem("pGetBal", bals.getBal);
      });
    }

    if (setUsdtBal4) {
      fetchBalances("4").then((bals) => {
        setUsdtBal4(bals.usdtBal);
        setGetBal4(bals.getBal);
        setItem("pUsdtBal4", bals.usdtBal);
        setItem("pGetBal4", bals.getBal);
      });
    }
  }
}
