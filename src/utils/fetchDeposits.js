import { sendReq } from "./sendReq";

export async function fetchDeposits() {
  let res = await sendReq("get", "deposit/list");

  if (res && res.data.result === "success" && res.data.data) {
    let deposits = res.data.data;

    let tempDep = {
      depId: "",
      getAmount: 0,
      usdAmount: 0,
      isReinvest: 1,
      totalEarned: 0,
    };

    let resArr = [tempDep, tempDep];

    if (deposits) {
      deposits.forEach((elem) => {
        let deposit = {
          depId: elem.id,
          getAmount: parseFloat(elem.amount),
          usdAmount: parseFloat(elem.amount_usd),
          isReinvest: parseInt(elem.auto_reinvest),
          totalEarned: parseFloat(elem.total_profit),
        };
        resArr[elem.type === 4 ? 0 : 1] = deposit;
      });
      console.log("[fetchDeposits] updated deposits");
    } else {
      console.log("[fetchDeposits] no deposits");
    }

    return resArr;
  }
}
