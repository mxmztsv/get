import { fetchTx } from "../fetchers/fetchTx";
import { getItem, setItem } from "../localStorage";

export async function fetchTxE(setTxArr) {
  if (getItem("token")) {
    fetchTx().then((txArray) => {
      console.log("[fetchTxE] tx arr:", txArray);

      if (
        !getItem("txArr") ||
        (getItem("txArr") &&
          getItem("txArr").length &&
          getItem("txArr")[0].time !== txArray[0].time)
      ) {
        setTxArr(txArray);
        setItem("txArr", txArray);
        console.log("[fetchTxE] updated txs");
      } else {
        console.log("[fetchTxE] txs the same");
      }
    });
  }
}
