import { fetchRefs, objToArray } from "../../pages/Referral/helpers";
import { getItem, setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchCurRefs(setCurLvl, setCurLvlRefs) {
  if (!getItem("token")) return;
  if (!getItem("uid")) await fetchIdAndLvl(setCurLvl);

  let curLvlRefsRes = await fetchRefs(getItem("uid"));
  setCurLvlRefs(objToArray(curLvlRefsRes));
}

async function fetchIdAndLvl(setCurLvl) {
  let res = await sendReq("get", "profile/base-info");

  if (res && res.data && res.data.result === "success") {
    if (res.data.data.id) {
      let uid = res.data.data.id;
      setItem("uid", uid);
    }

    if (res.data.data.career) {
      let career = res.data.data.career.statusId;

      if (career === "client") {
        setCurLvl(0);
        console.log("lvl setted to 0");
      } else if (career.includes("level")) {
        setCurLvl(parseInt(career.replace(/^\D+/g, "")));
        console.log("lvl setted to parse");
      }
    }
  }
}
