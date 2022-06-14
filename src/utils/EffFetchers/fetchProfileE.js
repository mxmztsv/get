import { getItem, setItem } from "../localStorage";
import { sendReq } from "../sendReq";

export async function fetchProfileE(user, setUser) {
  if (user) {
    if (!getItem("token")) return;
    if (user.id && user.name) return;

    let res = await sendReq("get", "profile/base-info");

    if (res.data) {
      if (res.data.result === "success") {
        let copyOfUser = user;
        let resUser = res.data.data;
        copyOfUser["first_name"] = resUser.first_name;
        copyOfUser["last_name"] = resUser.last_name;
        copyOfUser["name"] = `${resUser.first_name} ${resUser.last_name}`;
        copyOfUser["id"] = resUser.id;
        copyOfUser["uRefCode"] = resUser.login;
        copyOfUser["email"] = resUser.email;
        copyOfUser["isTgC"] = resUser["telegram-subscribe"];
        copyOfUser["tgToken"] = resUser["telegram-token"];
        setUser(copyOfUser);

        setItem("user", copyOfUser);
        setItem("userName", `${resUser.first_name} ${resUser.last_name}`);
        setItem("uid", resUser.id);
        setItem("uRefCode", resUser.login);
        setItem("byName", resUser.sponsor.fio);
        setItem("isTgC", resUser["telegram-subscribe"]);
        setItem("tgToken", resUser["telegram-token"]);

        console.log("TG TOKEN IN FP", resUser["telegram-token"]);
      }
    }
  }
}
