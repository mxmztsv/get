import { getItem, setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchProfileE(user, setUser, setIsC) {
  if (!getItem("token")) return;

  let res = await sendReq("get", "profile/base-info");

  if (res.data) {
    if (res.data.result === "success") {
      let copyOfUser = user || {};
      let resUser = res.data.data;

      copyOfUser["first_name"] = resUser.first_name;
      copyOfUser["last_name"] = resUser.last_name;
      copyOfUser["name"] = `${resUser.first_name} ${resUser.last_name}`;
      copyOfUser["id"] = resUser.id;
      copyOfUser["uRefCode"] = resUser.login;
      copyOfUser["email"] = resUser.email;
      copyOfUser["isTgC"] = !!resUser["telegram_chat_id"];
      copyOfUser["tgToken"] = resUser["telegram-token"];

      setUser(copyOfUser);

      if (setIsC) setIsC(!!resUser["telegram_chat_id"]);

      setItem("user", copyOfUser);
      setItem("userName", `${resUser.first_name} ${resUser.last_name}`);
      setItem("uid", resUser.id);
      setItem("uRefCode", resUser.login);
      setItem("byName", resUser.sponsor.fio);
      setItem("isTgC", !!resUser["telegram_chat_id"]);
      setItem("tgToken", resUser["telegram-token"]);

      if (resUser["telegram-subscribe"].username)
        setItem("tgUsername", resUser["telegram-subscribe"].username);

      setItem("ercWal", resUser["eth_wallet"]);
      setItem("bepWal", resUser["bnb_wallet"]);
      setItem("trcWal", resUser["trx_wallet"]);
    }
  }
}
