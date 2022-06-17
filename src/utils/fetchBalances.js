import { sendReq } from "./sendReq";

export async function fetchBalances(type) {
  let res = await sendReq("get", "wallet/balance");

  if (res && res.data.result === "success" && res.data.data.wallets) {
    let wallets = res.data.data.wallets;

    wallets = wallets.filter(function (el) {
      return el.type === type;
    });
    let usdtBal = wallets.find((wal) => wal.currency === "USDT").amount;
    let getBal = wallets.find((wal) => wal.currency === "GET").amount;
    console.log(
      `[fetchBalances] type: ${type} usdt: ${usdtBal} get: ${getBal}`
    );
    return { getBal, usdtBal };
  }
}
