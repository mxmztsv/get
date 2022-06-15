import axios from "axios";
import { fetchRefs, objToArray } from "../pages/Referral/helpers";
import { getItem, setItem } from "./localStorage";

export async function fetchCurRefs(setCurLvl, setCurLvlRefs) {
  if (!getItem("token")) return;

  if (!getItem("uid")) {
    let res;

    try {
      let req = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}profile/base-info`,
        headers: {
          "x-auth": getItem("token"),
        },
      };

      res = await axios(req);
    } catch (e) {
      console.error("ref tree:", e);
      return;
    }

    if (res) {
      console.log(res);
      if (res.data.result === "success") {
        if (res.data.data.id) {
          let uid = res.data.data.id;
          setItem("uid", uid);
          console.log("ref tree: fetched id: ", uid);
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
  }

  let curLvlRefsRes = await fetchRefs(getItem("uid"));

  setCurLvlRefs(objToArray(curLvlRefsRes));
}
