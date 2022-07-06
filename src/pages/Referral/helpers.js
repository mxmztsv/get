import { getItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";

export async function fetchRefs(curLayerId) {
  if (!getItem("token")) return;

  let res = await sendReq("post", "team/get-followers", { uid: curLayerId });

  if (res && res.data.result === "success") {
    return res.data.data.list;
  } else {
    console.error("[fetchRefs] error:", res);
    return [];
  }
}

export function objToArray(obj) {
  let resArr = [];

  // objects to array
  Object.values(obj).forEach((elem) => {
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

export async function fetchFilteredRefs(data) {
  if (!getItem("token")) return;

  let res = await sendReq("post", "team/search", {
    query: data.query,
    filter: {
      deposit_self_from: data.deposit_self_from,
      deposit_self_to: data.deposit_self_to,
      followers_from: data.followers_from,
      followers_to: data.followers_to,
      reg_from: data.reg_from,
      reg_to: data.reg_to,
      deep_from: data.deep_from,
      deep_to: data.deep_to
    }
  });

  const resArr = objToArray(res.data.data.list);

  console.log('RES ARR: ', resArr);

  console.log('RES', res.data.data.list);
  if (res.data.result === "success") {
    // return res.data.data.list;
    return resArr;
  } else {
    console.log("fetchRefs error:", res);
    return [];
  }
}
