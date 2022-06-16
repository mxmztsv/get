import { getItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";

export async function fetchRefs(curLayerId) {
  if (!getItem("token")) return;

  let res = await sendReq("post", "team/get-followers", { uid: curLayerId });
  if (res.data.result === "success") {
    return res.data.data.list;
  } else {
    console.log("fetchRefs error:", res);
    return [];
  }
}

export function objToArray(obj) {
  let resArr = [];

  // objects to array
  Object.values(obj).forEach((elem) => {
    console.log("response elem:", elem);
    let refObj = {
      id: elem.id,
      name: `${elem.first_name} ${elem.last_name}`,
      network: elem.cnt_folowers || "0",
      amount: elem.deposit || "0",
      refsNum: elem.cnt_self_folowers || "0",
    };
    resArr.push(refObj);
  });

  return resArr;
}
