import toast from "react-hot-toast";
import useWindowDimensions from "../../hooks/useWindow";
import { netArr } from "../../utils/depArrs";

export const WithdrawSwitch = (props) => {
  let { isGet, setIsGet } = props;
  return (
    <>
      <div className="with-switch-wrapper brd-top brd-btm">
        <div className="u-g-switch-container">
          <button
            className={`${!isGet ? "with-s-btn" : ""}`}
            onClick={() => setIsGet(false)}
          >
            USDT
          </button>
          <button
            className={`${isGet ? "with-s-btn" : ""}`}
            onClick={() => setIsGet(true)}
          >
            GET
          </button>
        </div>
      </div>
    </>
  );
};

export const TotalAmountBox = (props) => {
  let { totalAmount, isGet } = props;
  return (
    <div className="with-total-wrapper">
      <div className="medium-yellow-header">Total amount</div>
      <div className="big-numbers">
        {totalAmount}
        {isGet ? " GET" : " USDT"}
      </div>
    </div>
  );
};

export const WithFooter = (props) => {
  let { isFPage, setIsFPage, tokensForWith, isGet } = props;
  return (
    <div className="with-footer-wrapper">
      {isFPage ? (
        <TotalAmountBox totalAmount={tokensForWith} isGet={isGet} />
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
      <button onClick={() => setIsFPage(false)}>NEXT</button>
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
  function onSubmit(code) {}

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

        <div
          className="medium-yellow-header"
          onClick={() => {
            toast("todo");
          }}
        >
          Resend code
        </div>
      </div>
      <div className="grey-text">Input code from Email or Telegram</div>
    </div>
  );
};
