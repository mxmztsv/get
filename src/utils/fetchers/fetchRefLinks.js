import { getItem, setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchRefLink(setRefLink, setInvitedByName) {
  let refUrlBase = "https://app.getstake.io/signup?r=";
  if (getItem("uRefCode") && getItem("byName")) {
    setRefLink(`${refUrlBase}${getItem("uRefCode")}`);
    setInvitedByName(getItem("byName"));
    console.log("[fetchRefLink] fetched id from localstorage");
  }
  if (!getItem("token")) return;

  let res = await sendReq("get", "profile/base-info");
  if (res && res.data.result === "success") {
    if (res.data.data.login) {
      setRefLink(`${refUrlBase}${res.data.data.login}`);
      setInvitedByName(res.data.data.sponsor.fio);

      setItem("uRefCode", res.data.data.login);
      setItem("byName", res.data.data.sponsor.fio);

      console.log("[fetchRefLink] fetched");
    }
  }
}
