import { getItem, setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchBodyInfo(
  setTeamSize,
  setFrontLineSize,
  setNumberOfLines
) {
  if (!getItem("token")) return;

  async function fetchCount(url, name, setFunc) {
    let res = await sendReq("get", url);

    if (res && res.data && res.data.result === "success") {
      setFunc(res.data.data.count);
      setItem(name, res.data.data.count);
      console.log(`[fetchCount]: fetched ${name}`);
    }
  }

  fetchCount("stat/team-size", "ts", setTeamSize);
  fetchCount("stat/first-line-size", "fS", setFrontLineSize);
  fetchCount("stat/team-count-lines", "lNum", setNumberOfLines);
}
