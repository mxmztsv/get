import { useState } from "react";
import { SyncLoader } from "react-spinners";
import useWindowDimensions from "../../hooks/useWindow";
import { netArr } from "../../utils/depArrs";
import { fN } from "../../utils/formatNumber";
import { handleWithdraw } from "./handleWithdraw";
import { requestCode } from "./requestCode";

export const WithdrawSwitch = (props) => {
  let {
    isGet,
    isMain,
    setIsGet,
    usdtBalMain,
    getBalMain,
    usdtBalBonus,
    getBalBonus,
    setTokensForWith,
  } = props;
  return (
    <>
      <div className="with-switch-wrapper brd-btm">
        <div className="u-g-switch-container">
          <button
            className={`${!isGet ? "with-s-btn" : ""}`}
            onClick={() => {
              setIsGet(false);
              setTokensForWith(isMain ? usdtBalMain : usdtBalBonus);
            }}
          >
            USD
          </button>
          <button
            className={`${isGet ? "with-s-btn" : ""}`}
            onClick={() => {
              setIsGet(true);
              setTokensForWith(isMain ? getBalMain : getBalBonus);
            }}
          >
            GET
          </button>
        </div>
      </div>
    </>
  );
};

export const TotalAmountBox = (props) => {
  let { totalAmount, isGet, isMain, tokenPrice, isFPage } = props;

  return (
    <div
      className={`with-total-wrapper ${
        isFPage ? "with-total-wrapper-fpage" : ""
      }`}
    >
      <div className="medium-yellow-header">Total amount</div>
      <div className="big-numbers dark-span">
        {fN(totalAmount, 2)}
        {isGet ? " GET" : " USD"}{" "}
        {isGet ? <span>| {fN(totalAmount * tokenPrice, 2)} USD</span> : <></>}
      </div>
      {isMain !== undefined ? (
        <div className="grey-text">
          {isMain ? "From Main Balance" : "From Bonus Balance"}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export const WithFooter = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  let {
    isFPage,
    setIsFPage,
    tokensForWith,
    isGet,
    tokenPrice,
    setIsW,
    isMain,
    setIsNeedUpdate,
  } = props;

  function getCondition(isG, tFW, tP) {
    if (isG) {
      return tFW * tP < 100;
    } else {
      return tFW < 100;
    }
  }

  return (
    <div
      className={`with-footer-wrapper ${
        !isFPage ? "with-footer-second-page" : ""
      }`}
    >
      {isFPage ? (
        <TotalAmountBox
          totalAmount={tokensForWith}
          isGet={isGet}
          tokenPrice={tokenPrice}
        />
      ) : (
        <>
          <button
            className="transparent-button yellow-trans-btn"
            onClick={() => setIsFPage(true)}
          >
            BACK
          </button>
        </>
      )}
      <button
        disabled={getCondition(isGet, tokensForWith, tokenPrice)}
        onClick={async () => {
          setIsLoading(true);

          if (isFPage) {
            // request code
            let res = await requestCode();
            if (res) {
              setIsFPage(false);
            }
            setIsLoading(false);
            setIsNeedUpdate(true);
          } else {
            // submit withdraw
            // @ts-ignore
            let code = document.getElementById("code-input").value;
            let res = await handleWithdraw(isGet, tokensForWith, code, isMain);
            if (res) {
              setIsFPage(true);
              setIsNeedUpdate(true);
              setIsW(false); // difference
            }
            setIsFPage(true);
            setIsNeedUpdate(true);
            setIsLoading(false);
          }
        }}
      >
        {isLoading ? (
          <div>
            <SyncLoader color="black" size={10} speedMultiplier={0.5} />
          </div>
        ) : (
          <>{isFPage ? "NEXT" : "COMPLETE"}</>
        )}
      </button>
    </div>
  );
};

export const SelectedNetBox = (props) => {
  let { sDepNet } = props;
  return (
    <div className="selected-net-wrapper">
      <div className="header-3">SELECTED NETWORK</div>
      <div className="selected-net-body">{netArr[sDepNet]}</div>
    </div>
  );
};

export const SelectedWalletBox = (props) => {
  const { width } = useWindowDimensions();
  let { sWallet } = props;

  return (
    <div className={`selected-wal-wrapper ${width > 815 ? "brd-btm" : ""}`}>
      <div className="header-3">WALLET ADDRESS</div>
      <div className="selected-wal-body">
        {sWallet ? sWallet : "Loading..."}
      </div>
      <div className="grey-text">Fee 2.2%</div>
    </div>
  );
};

export const VerifCodeBox = () => {
  return (
    <div className="with-verif-code-wrapper">
      <div className="header-3">VERIFICATION CODE</div>
      <div className="input-code">
        <div
          className="input-field"
          onClick={() => {
            document.getElementById("code-input").focus();
          }}
        >
          <input type="number" id="code-input" />
        </div>
        {/* 
        <div
          className="medium-yellow-header"
          onClick={() => {
            toastC("todo");
          }}
        >
          Resend code
        </div> */}
      </div>
      <div className="grey-text">Enter code from Email or Telegram</div>
    </div>
  );
};
