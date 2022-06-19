import { sendReq } from "./sendReq";

export async function fetchTokenPrice() {
  let res = await sendReq("get", "wallet/exchange-rates");
  return res;
}
