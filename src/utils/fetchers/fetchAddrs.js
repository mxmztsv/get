import { getItem, setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchAddrs(sDepNet, setDepWallet) {
  if (!getItem("addrs")) {
    let res = await sendReq("post", "wallet/get-crypto-address", {
      currency: "USDT",
    });

    if (res) {
      if (res.data.result === "success") {
        if (res.data.data.address) {
          let addrs = res.data.data.address;
          setItem("addrs", addrs);
        }
      } else {
        return;
      }
    }
  }

  let addrs = getItem("addrs");
  console.log("addrs:", addrs);
  if (sDepNet === 0) setDepWallet(addrs.bep20);
  if (sDepNet === 1) setDepWallet(addrs.erc20);
  if (sDepNet === 2) setDepWallet(addrs.trc20);
}
