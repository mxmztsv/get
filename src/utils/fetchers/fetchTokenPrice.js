import { sendReq } from "../sendReq";

export async function fetchTokenPrice() {
  let res = await sendReq("get", "wallet/exchange-rates");
  return res;
}

export async function fetchGetTokenPriceInUsd() {
  let tokenPrice = 0;
  const res = await fetchTokenPrice();
  if (res.data && res.data.result === "success" && res.data.data.rates) {
    const rates = res.data.data.rates;
    tokenPrice = rates.GET.USD;
  }
  return tokenPrice;
}
