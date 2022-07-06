import { QRCodeSVG } from "qrcode.react";
import check from "../../assets/img/check.svg";
import copyButton from "../../assets/img/copy-icon.png";
import useWindowDimensions from "../../hooks/useWindow";
import { copyText } from "../../utils/copyText";
import { coinsArr, netArr, netArrMobile } from "../../utils/depArrs";

export const DepCCInfoBody = (props) => {
  const { width } = useWindowDimensions();
  let { sDepCoin, sDepNet } = props;

  const DepCCInfoBox = (props) => {
    let { header, value } = props;
    return (
      <div className="cc-info-box">
        <div className="small-grey-header">{header}</div>
        <div className="big-numbers">{value}</div>
      </div>
    );
  };

  return (
    <div className="dep-cc-body-wrapper brd-btm">
      <DepCCInfoBox header="Coin" value={coinsArr[sDepCoin]} />
      <DepCCInfoBox
        header="Network"
        value={width > 815 ? netArr[sDepNet] : netArrMobile[sDepNet]}
      />
    </div>
  );
};

export const DepDescription = () => {
  return (
    <>
      <div className="description">
        · Currently we accept deposits only in USDT{" "}
      </div>
      <br />
      <div className="description brd-btm" style={{ paddingBottom: "20px" }}>
        · The payment gate commission is 2.2%
      </div>
    </>
  );
};

export const CardDepDescription = () => {
  return (
    <>
      <div className="description">· The payment gate fee is 7% </div>
      <br />
      <div className="description">· We accept only DEBIT cards </div>
    </>
  );
};

export const DepWalletBox = (props) => {
  const { width } = useWindowDimensions();
  let { depWallet, isC, setIsC } = props;

  return (
    <div className="dep-wallet-wrapper">
      <div className="header-3">WALLET ADDRESS</div>
      <div
        className="dep-opt-container"
        onClick={() => {
          copyText("dep-opt-address", 0);
          setIsC(true);
          setTimeout(function () {
            setIsC(false);
          }, 2000);
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="dep-inner-opt-container">
          {/* body */}
          <div className="dep-opt-body">
            <div className="dep-opt-address">
              {depWallet ? depWallet : "..."}
            </div>
            <div className={`dep-opt-copy-button ${isC ? "copied" : ""}`}>
              {!isC ? (
                <img src={copyButton} alt="copy" />
              ) : (
                <object data={check} aria-label="copied" />
              )}
            </div>
          </div>

          {/* footer */}
          <div className="dep-opt-footer">
            <p>Fee 2.2%</p> <p>Minimum deposit: 30 USDT</p>
          </div>

          {/* qrcode */}
          {width > 815 ? (
            <div className="dep-qrcode-container">
              {depWallet ? (
                <QRCodeSVG
                  value={depWallet}
                  fgColor="#feb85d"
                  bgColor="#313131"
                  size={100}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
