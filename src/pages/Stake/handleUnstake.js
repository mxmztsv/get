import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";

export async function handleUnstake(nlDepId, nlDepAmount, setIsNeedUpdate) {
  if (!nlDepAmount) {
    toastC("Nothing to unstake", 0);
    return;
  }
  let res = await sendReq("post", "deposit/close", { deposit_id: nlDepId });
  if (res && res.data && res.data.result === "success") {
    toastC(
      `Successfully started unstaking of ${nlDepAmount} GET. Your money will be unlocked in 60 days`,
      0
    );
  } else {
    toastC("Internal error. Try again later", 1);
  }
  setIsNeedUpdate(true);
}
