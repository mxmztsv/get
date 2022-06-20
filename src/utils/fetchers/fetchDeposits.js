import { sendReq } from "../sendReq";
import { tempDep } from "../tempDep";

export async function fetchDeposits() {
  let res = await sendReq("get", "deposit/list");

  if (res && res.data.result === "success" && res.data.data) {
    let deposits = res.data.data;

    let resArr = Array.from({ length: deposits.length }, () => tempDep);

    if (deposits) {
      deposits.forEach((elem, index) => {
        let deposit = {
          depId: elem.id,
          getAmount: parseFloat(elem.amount),
          usdAmount: parseFloat(elem.amount_usd),
          isR: parseInt(elem.auto_reinvest),
          totalEarned: parseFloat(elem.total_profit),
          type: elem.type,
          status: elem.status,
          delayEnd: elem.delay_close_time || null,
        };
        resArr[index] = deposit;
      });
      console.log("[fetchDeposits] updated deposits");
    } else {
      console.log("[fetchDeposits] no deposits");
    }

    return resArr;
  }
}
