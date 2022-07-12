import { fetchTx } from "../fetchers/fetchTx";
import { getItem, setItem } from "../localStorage";

export async function fetchTxE(setTxArr, page = 1, setPagesCount = () => {}) {
  if (getItem("token")) {
    fetchTx(page).then(([txArray, pagesCount]) => {
      console.log("[fetchTxE] tx arr:", txArray);
      console.log("txArray length:", txArray.length)
      setPagesCount(pagesCount);
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
