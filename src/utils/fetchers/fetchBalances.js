import { setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchBalances() {
  let res = await sendReq("get", "wallet/balance");

  if (res && res.data.result === "success" && res.data.data.wallets) {
    let wallets = res.data.data.wallets;
    return [processBalances(wallets, "0"), processBalances(wallets, "4")];
  }
}

function processBalances(wallets, type) {
  let filteredWallets = wallets.filter((wal) => {
    return wal.type === type;
  });
  let usdtBalObj = filteredWallets.find((wal) => wal.currency === "USDT");
  let getBalObj = filteredWallets.find((wal) => wal.currency === "GET");

  let getKey = `gBal${type === "0" ? "Main" : "Bonus"}Id`;
  setItem(getKey, getBalObj.id);

  let usdKey = `uBal${type === "0" ? "Main" : "Bonus"}Id`;
  setItem(usdKey, usdtBalObj.id);

  let usdtBal = usdtBalObj.amount;
  let getBal = getBalObj.amount;

  return { usdtBal, getBal };
}
