import toast from "react-hot-toast";
import { getItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";

export async function handleStake(tokensForStake, isL, isGet, setIsNeedUpdate) {
  if (isGet && tokensForStake < 230) {
    toast.error("Minimum deposit: 230 GET");
    return;
  } else if (!isGet && tokensForStake < 25) {
    toast.error("Minimum deposit: 25 USDT");
    return;
  }

  let data = {
    type: isL ? "5" : "4", // 5 - locked, 4 - non-locked
    currency: isGet ? "GET" : "USDT",
    amount: tokensForStake,
    uuid: getItem("uid"),
  };

  let res = await sendReq("post", "deposit/topup", data);
  console.log("inres", res.response);
  if (res.data && res.data.result === "success") {
    console.log(res);
    let percent = res.data.data.deposit.percent;
    let amount;
    if (isGet) amount = `${tokensForStake} GET`;
    else
      amount = `${tokensForStake} USDT (${
        Math.round((tokensForStake / 0.11) * 100) / 100
      } GET)`;

    let mes = `Successfully staked ${amount} in ${
      isL ? "locked" : "non-locked"
    } deposit for ${percent}% monthly`;

    toast.success(mes);
  } else if (res.response.data.result === "error") {
    toast.error(res.response.data.error_message);
  }
  setIsNeedUpdate(true);
}
