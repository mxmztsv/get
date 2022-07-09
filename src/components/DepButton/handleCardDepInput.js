import { fN } from "../../utils/formatNumber";

export function handleCardDepInput(
  value,
  tokenPrice,
  setUsdToDeposit,
  setTokensToGet
) {
  let { usd, tokens } = value;

  let val = usd === -1 ? tokens : usd;
  if (val > 1000000000000000000000 || parseFloat(val) === 0) return;
  if (isNaN(parseFloat(val))) val = 0;

  if (usd !== -1) {
    setUsdToDeposit(usd);
    // @ts-ignore
    setTokensToGet(fN(usd / tokenPrice, 2));
  } else {
    setTokensToGet(tokens);
    // @ts-ignore
    setUsdToDeposit(fN(tokens * tokenPrice, 2));
  }
}
