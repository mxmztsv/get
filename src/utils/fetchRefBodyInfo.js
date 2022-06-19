import axios from "axios";
import { getItem, setItem } from "./localStorage";

export async function fetchBodyInfo(
  setTeamSize,
  setFrontLineSize,
  setNumberOfLines
) {
  if (!getItem("token")) return;

  async function fetchCount(url, name, setFunc) {
    let res;

    try {
      let req = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}${url}`,
        headers: {
          "x-auth": getItem("token"),
        },
      };

      res = await axios(req);
    } catch (e) {
      console.log(`${url}`, e);
    }

    if (res) {
      console.log(res);

      if (res.data.result === "success") {
        setFunc(res.data.data.count);
        setItem(name, res.data.data.count);
        console.log(`[fetchCount]: fetched ${name}`);
      }
    }
  }

  fetchCount("stat/team-size", "ts", setTeamSize);
  fetchCount("stat/first-line-size", "fS", setFrontLineSize);
  fetchCount("stat/team-count-lines", "lNum", setNumberOfLines);
}
