import { fetchTx } from "../fetchTx";
import { getItem, setItem } from "../localStorage";

export async function fetchTxE(user, setters) {
  let { setIsNeedUpdate, setTxArr } = setters;

  if (user) {
    console.log("fetching tx");
    fetchTx().then((txArray) => {
      console.log("tx arr:", txArray);

      if (
        !getItem("txArr") ||
        (getItem("txArr") && getItem("txArr")[0].time !== txArray[0].time)
      ) {
        setTxArr(txArray);
        setItem("txArr", txArray);
        console.log("updated array");
      }
    });

    setIsNeedUpdate(false);
  }
}
