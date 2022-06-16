import { sendReq } from "./sendReq";

export async function fetchTx() {
  let res = await sendReq("post", "wallet/history");

  if (res.data && res.data.result === "success" && res.data.data) {
    let txs = res.data.data.items;

    let resArr = [];
    if (txs) {
      txs.forEach((tx) => {
        let type;
        if (tx.type === 21) type = "STAKE";
        if (tx.type === 11) type = "AUTO-SWAP";
        if (tx.type === 9) type = "BONUS";
        if (tx.type === 6) type = "REFERRAL BONUS";

        if (tx.description === "Exchange from USDT") return;

        let txObj = {
          amount: {
            token:
              tx.currency === "GET" ? Math.round(tx.amount * 100) / 100 : 0,
            usd: tx.currency !== "GET" ? Math.round(tx.amount * 100) / 100 : 0,
          },
          type: type || "TRANSACTION",
          time: tx.create_datetime,
          description: tx.description,
          status: "Complete",
        };
        resArr.push(txObj);
      });
    } else {
      console.log("No tx");
    }

    return resArr;
  }
}
