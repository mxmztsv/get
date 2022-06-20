import { fetchTokenPrice } from "../fetchers/fetchTokenPrice";
import { getItem, setItem } from "../localStorage";

export async function fetchTokenPriceE(setTokenPrice, setTokenPrevPrice) {
  let res = await fetchTokenPrice();
  if (res.data && res.data.result === "success" && res.data.data.rates) {
    let rates = res.data.data.rates;
    let tokenPrice = rates.GET.USD;
    if (!getItem("pTP") || tokenPrice !== getItem("pTP")) {
      setTokenPrice(tokenPrice);
      setItem("pTP", tokenPrice);
      console.log("[fetchTokenPrice] updated");
    } else {
      console.log("[fetchTokenPrice] same");
    }
  }
}
