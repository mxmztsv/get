import { setItem } from "./localStorage";
import { sendReq } from "./sendReq";

export async function fetchMissions(
  setDepMis,
  setFrontLDepMis,
  setVolMis,
  setBonus,
  setCurLvl
) {
  let res = await sendReq("get", "career");
  console.log("carr res in f:", res);

  if (
    res &&
    res.data &&
    res.data.result === "success" &&
    res.data.data.career
  ) {
    let missions = res.data.data.career.missions;
    let lvl;
    let statusKey = res.data.data.career.statusKey;

    if (statusKey === "client") lvl = 0;
    else if (statusKey.includes("level"))
      lvl = parseInt(statusKey.replaceAll(/\D+/g, ""));

    setCurLvl(lvl);
    setItem("pLvl", lvl);

    let curLvlMissions = Object.values(missions)[lvl];
    let bonus = curLvlMissions.description.en;

    setBonus(bonus);
    setItem("pBonus", bonus);

    let tasks = curLvlMissions.task;

    let depMis = parseInt(tasks[0].text.en.replace(/\D+/g, ""));
    let frontLMis = parseInt(tasks[1].text.en.replace(/\D+/g, ""));
    let volMis = parseInt(tasks[2].text.en.replace(/\D+/g, ""));

    console.log("carr:", depMis, frontLMis, volMis);

    setDepMis(depMis);
    setItem("pDepMis", depMis);

    setFrontLDepMis(frontLMis);
    setItem("pFrontLDepMis", frontLMis);

    setVolMis(volMis);
    setItem("pVolMis", volMis);
  }
}
