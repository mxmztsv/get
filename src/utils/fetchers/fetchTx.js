import { fN } from "../formatNumber";
import { sendReq } from "../sendReq";

export async function fetchTx(page = 1) {
  let res = await sendReq("post", "wallet/history", {page});

  if (res.data && res.data.result === "success" && res.data.data) {
    let txs = res.data.data.items;
    const txsCount = res.data.data.pages.count;
    const txsOnPage = res.data.data.pages.raws;
    const pagesCount = Math.ceil(txsCount / txsOnPage);

    let resArr = [];
    if (txs) {
      txs.forEach((tx) => {
        let type;
        if (tx.type === 21) type = "STAKE";
        else if (tx.type === 11) type = "AUTO-SWAP";
        else if (tx.type === 9) type = "BONUS";
        else if (tx.type === 6) type = "REFERRAL BONUS";
        else if (tx.type === 20) type = "STAKING PROFIT";
        else if (tx.type === 8) type = "WITHDRAW";

        let status;
        if (tx.status === 0) status = "Pending";
        else if (tx.status === -1) status = "Canceled";
        else status = "Complete";

        if (tx.description === "Exchange from USDT") return;

        let txObj = {
          amount: {
            token: tx.currency === "GET" ? fN(tx.amount, 2) : 0,
            usd: tx.currency !== "GET" ? fN(tx.amount, 2) : 0,
          },
          type: type || "TRANSACTION",
          time: tx.create_datetime,
          description: tx.description,
          status: status,
        };
        resArr.push(txObj);
      });
    } else {
      console.log("No tx");
    }

    return [resArr, pagesCount];
  }
}
