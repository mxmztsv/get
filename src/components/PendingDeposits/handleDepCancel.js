import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";

export async function handleDepCancel(depId) {
  let res = await sendReq("post", `deposit/reactivate/${depId}`);
  if (res && res.data && res.data.result === "success") {
    toastC("Successfully canceled unstaking", 0);
  } else if (
    res &&
    res.response &&
    res.response.data &&
    res.response.data.error_message
  ) {
    toastC(res.response.data.error_message, 1);
  } else {
    toastC("Internal error. Try again later", 1);
  }
}
