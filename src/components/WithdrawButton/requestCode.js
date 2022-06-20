import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";

export async function requestCode() {
  let res = await sendReq("post", "profile/init-check-action", {
    actionName: "walletWithdraw",
  });

  if (res && res.data && res.data.result === "success") {
    toastC(
      `Verification code was sent to your ${
        res.data.reciever === "Email" ? "Email" : "Telegram"
      }`,
      0
    );
    return true;
  } else {
    toastC("Internal error. Try again later", 0);
    return false;
  }
}
