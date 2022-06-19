import { fN } from "../../utils/formatNumber";
import { getItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";

export async function handleStake(
  tokensForStake,
  isL,
  isGet,
  setIsNeedUpdate,
  tokenPrice,
  isMain
) {
  if (isGet && tokensForStake < 230) {
    toastC("Minimum deposit: 230 GET", 1);
    return;
  } else if (!isGet && tokensForStake < 25) {
    toastC("Minimum deposit: 25 USDT", 1);
    return;
  }

  let data = {
    wallet_type: isMain ? "0" : "4",
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

    console.log("tp", tokenPrice);
    console.log("tfs", tokensForStake);
    console.log(tokensForStake / tokenPrice);
    console.log(parseFloat(tokensForStake) / parseFloat(tokenPrice));

    if (isGet) amount = `${tokensForStake} GET`;
    else
      amount = `${tokensForStake} USD (${fN(
        parseFloat(tokensForStake) / parseFloat(tokenPrice),
        2,
        true
      )} GET)`;

    let mes = `Successfully staked ${amount} in ${
      isL ? "locked" : "non-locked"
    } deposit for ${percent}% monthly`;

    toastC(mes, 0);
  } else if (res.response.data.result === "error") {
    toastC(res.response.data.error_message, 1);
  }
  setIsNeedUpdate(true);
}
