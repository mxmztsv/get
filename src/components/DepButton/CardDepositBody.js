import { useEffect, useRef, useState } from "react";
import { fN } from "../../utils/formatNumber";
import { getItem } from "../../utils/localStorage";
import { setInputWidth } from "../../utils/setInputWidth";
import { handleCardDepInput } from "./handleCardDepInput";
import { CardDepDescription } from "./InfoElems";

export const CardDepositBody = (props) => {
  let { usdToDeposit, setUsdToDeposit } = props;

  const [tokenPrice, setTokenPrice] = useState(getItem("pTP"));
  const [tokensToGet, setTokensToGet] = useState(
    fN(usdToDeposit / tokenPrice, 2)
  );

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  // update input width
  useEffect(() => {
    setInputWidth(inputRef1, { target: { value: usdToDeposit } });
    setInputWidth(inputRef2, { target: { value: tokensToGet } });
  }, [usdToDeposit, tokensToGet]);

  return (
    <>
      <div className="dep-header header-2">Card Deposit</div>
      <CardDepDescription />
      <div className="num-input-container brd-top">
        <div className="header-3">YOU PAY</div>
        <div className="num-input" onClick={() => inputRef1.current.select()}>
          <input
            type="number"
            className="numbers"
            value={usdToDeposit}
            onChange={(e) => {
              handleCardDepInput(
                {
                  usd: e.target.value,
                  tokens: -1,
                },
                tokenPrice,
                setUsdToDeposit,
                setTokensToGet
              );
            }}
            ref={inputRef1}
          />
          <div className="num-input-currency">USD</div>
        </div>
      </div>

      <div className="num-input-container">
        <div className="header-3">YOU GET</div>
        <div className="num-input" onClick={() => inputRef2.current.select()}>
          <input
            type="number"
            className="numbers"
            value={tokensToGet}
            onChange={(e) => {
              handleCardDepInput(
                {
                  usd: -1,
                  tokens: e.target.value,
                },
                tokenPrice,
                setUsdToDeposit,
                setTokensToGet
              );
            }}
            ref={inputRef2}
          />
          <div className="num-input-currency">GET</div>
        </div>
      </div>
    </>
  );
};
