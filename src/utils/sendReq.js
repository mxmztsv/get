import axios from "axios";
import { getItem } from "./localStorage";

export async function sendReq(method, url, data) {
  try {
    let req;
    if (method === "post") {
      req = {
        method: method,
        url: `${process.env.REACT_APP_BASE_URL}${url}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "text/plain",
          "x-auth": getItem("token"),
        },
      };
    } else if (method === "get") {
      req = {
        method: method,
        url: `${process.env.REACT_APP_BASE_URL}${url}`,
        headers: {
          "x-auth": getItem("token"),
        },
      };
    } else if (
      url === "wallet/exchange-rates/GET/USDT" ||
      url === "wallet/exchange-rates"
    ) {
      req = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}${url}`,
      };
    } else {
      return;
    }

    let res = await axios(req);
    console.log(url, res);
    return res;
  } catch (e) {
    console.error(`${url} error:`, e);
    return e;
  }
}
