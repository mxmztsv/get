import { setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchDepStats(setTeamVolume, setFirstLVolume) {
  let res = await sendReq("get", "deposit/stat");

  if (res && res.data.result === "success" && res.data.data.team) {
    let data = res.data.data;
    let teamVol = data.team;
    let firLVol = data.first_line;

    setTeamVolume(teamVol);
    setFirstLVolume(firLVol);

    setItem("pTeamVolume", teamVol);
    setItem("pFirstLVolume", firLVol);
  }
}
