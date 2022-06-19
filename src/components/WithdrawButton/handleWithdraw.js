import { getItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";

export async function handleWithdraw(isGet, tokensForWith, code, isMain) {
  let getWalId = (isM, isG) => {
    if (isM) {
      return isG ? getItem("gBalMainId") : getItem("uBalMainId");
    } else {
      return isG ? getItem("gBalBonusId") : getItem("uBalBonusId");
    }
  };

  let res = await sendReq("post", "wallet/withdraw", {
    amount: tokensForWith,
    confirmAction: "walletWithdraw",
    confirmActionCode: parseInt(code),
    currency: isGet ? "GET" : "USDT",
    form_id: "walletWithdraw",
    wallet_id: getWalId(isMain, isGet),
  });
  if (
    res &&
    res.data &&
    res.data.message &&
    res.data.message.type === "success"
  ) {
    toastC("Successfully requested withdraw", 0);
    return true;
  } else if (res && res.data && res.data.result === "success") {
    toastC("Successfully requested withdraw", 0);
    return true;
  } else if (
    res &&
    res.data &&
    res.data.message &&
    res.data.message.type === "error"
  ) {
    toastC(res.data.message.text, 1);
  } else if (res.response && res.response.data) {
    let mes = res.response.data.error_message;
    console.error("[Withdraw] error:", mes);
    if (typeof mes === "object") {
      toastC(mes[Object.keys(mes)[0]], 1);
    } else {
      toastC(res.response.data.error_message, 1);
    }
  } else {
    toastC("Internal error. Try again later", 1);
  }

  return false;
}
