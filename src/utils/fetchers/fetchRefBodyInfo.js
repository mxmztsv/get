import { getItem, setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchBodyInfo(
  setTeamSize,
  setFrontLineSize,
  setNumberOfLines
) {
  if (!getItem("token")) return;

  let res = await sendReq("post", "stat/complex", {
    actions: [
      "team-structure-size",
      "team-first-line-size",
      "team-count-lines",
    ],
  });

  if (res && res.data && res.data.data) {
    let data = res.data.data;
    processResponse("ts", data["team-structure-size"].count, setTeamSize);
    processResponse("fS", data["team-first-line-size"].count, setFrontLineSize);
    processResponse("lNum", data["team-count-lines"].count, setNumberOfLines);
  }
}

function processResponse(name, value, setFunc) {
  setFunc(value);
  setItem(name, value);
}
