import { fetchAddrs } from "../../utils/fetchers/fetchAddrs";

export function handleCCDeposit(sDepNet, setDepWallet) {
  fetchAddrs(sDepNet, setDepWallet);
}
