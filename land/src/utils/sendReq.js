import axios from "axios";
import md5 from "md5";
import { getItem } from "./localStorage";

export async function sendReq(method, url, data) {
  try {
    let time = Math.floor(Date.now() / 1000);
    let hash_str = time + "234%$32" + window.location.href;
    let hash = md5(hash_str);

    let req;
    if (method === "post") {
      req = {
        method: method,
        url: `${process.env.REACT_APP_BASE_URL}${url}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "text/plain",
          "x-auth": getItem("token"),
          Timestamp: time,
          Hash: hash,
        },
      };
    } else if (method === "get") {
      req = {
        method: method,
        url: `${process.env.REACT_APP_BASE_URL}${url}`,
        headers: {
          "x-auth": getItem("token"),
          Timestamp: time,
          Hash: hash,
        },
      };
    } else {
      return;
    }

    let res = await axios(req);
    console.log("[response]", url, res);

    return res;
  } catch (e) {
    console.error("[response]", url, e);
    return e;
  }
}
