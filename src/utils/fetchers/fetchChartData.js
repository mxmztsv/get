import { sendReq } from "../sendReq";

export async function fetchChartData() {
  let res = await sendReq("get", "wallet/exchange-rates/GET/USDT");
  return res;
}
