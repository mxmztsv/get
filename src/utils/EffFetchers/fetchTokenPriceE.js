import { fetchTokenPrice } from "../fetchTokenPrice";
import { getItem, setItem } from "../localStorage";

export async function fetchTokenPriceE(setTokenPrice) {
  let res = await fetchTokenPrice();
  console.log("tokenprice exc:", res);
  if (res.data && res.data.result === "success" && res.data.data.rates) {
    let rates = res.data.data.rates;
    let tokenPrice = rates.GET.USD;
    if (!getItem("pTP") || tokenPrice !== getItem("pTP")) {
      setTokenPrice(tokenPrice);
      setItem("pTP", tokenPrice);
      console.log("updated token price");
    } else {
      console.log("token price the same");
    }
  }
}
