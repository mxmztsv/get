import { setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchBalances(type) {
  let res = await sendReq("get", "wallet/balance");

  if (res && res.data.result === "success" && res.data.data.wallets) {
    let wallets = res.data.data.wallets;

    wallets = wallets.filter(function (el) {
      return el.type === type;
    });
    let usdtBalObj = wallets.find((wal) => wal.currency === "USDT");
    let getBalObj = wallets.find((wal) => wal.currency === "GET");

    let getKey = `gBal${type === "0" ? "Main" : "Bonus"}Id`;
    setItem(getKey, getBalObj.id);

    let usdKey = `uBal${type === "0" ? "Main" : "Bonus"}Id`;
    setItem(usdKey, usdtBalObj.id);

    let usdtBal = usdtBalObj.amount;
    let getBal = getBalObj.amount;
    return { getBal, usdtBal };
  }
}
