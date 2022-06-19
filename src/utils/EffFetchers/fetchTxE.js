import { fetchTx } from "../fetchTx";
import { getItem, setItem } from "../localStorage";

export async function fetchTxE(user, setters) {
  let { setIsNeedUpdate, setTxArr } = setters;

  if (user) {
    fetchTx().then((txArray) => {
      console.log("[fetchTxE] tx arr:", txArray);

      if (
        !getItem("txArr") ||
        (getItem("txArr") && getItem("txArr")[0].time !== txArray[0].time)
      ) {
        setTxArr(txArray);
        setItem("txArr", txArray);
        console.log("[fetchTxE] updated txs");
      } else {
        console.log("[fetchTxE] txs the same");
      }
    });

    setIsNeedUpdate(false);
  }
}
