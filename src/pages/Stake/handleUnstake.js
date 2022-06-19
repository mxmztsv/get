import toast from "react-hot-toast";
import { sendReq } from "../../utils/sendReq";

export async function handleUnstake(nlDepId, nlDepAmount, setIsNeedUpdate) {
  let res = await sendReq("post", "deposit/close", { deposit_id: nlDepId });
  if (res && res.data && res.data.result === "success") {
    toast.success(
      `Successfully started unstaking of ${nlDepAmount} GET. Your money will be unlocked in 60 days`
    );
  }
}
