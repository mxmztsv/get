import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import caD2 from "../../assets/img/card-dep-2.svg";
import caD from "../../assets/img/card-dep.svg";
import cD2 from "../../assets/img/crypto-dep-2.svg";
import cD from "../../assets/img/crypto-dep.svg";
import useWindowDimensions from "../../hooks/useWindow";
import { UserContext } from "../../utils/UserContext";
import { CloseButton } from "../CloseButton";
import { DepCardButton, DepCCButton } from "./Buttons";
import { DepCCInfoBody, DepDescription, DepWalletBox } from "./InfoElems";
import { DepCoinsSelector, DepNetworkSelector } from "./Selectors";

export const DepButtons = (props) => {
  const { width } = useWindowDimensions();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [isD, setIsD] = useState(false); // is deposit modal visible
  const [isC, setIsC] = useState(true); // is card payment method selected
  const [isFPage, setIsFPage] = useState(true); // is first page

  const [isW, setIsW] = useState(false); // is withdraw modal visible
  const [isU, setIsU] = useState(true); // is usd withdraw selected

  const [sDepCoin, setSDepCoin] = useState(0); // selected deposit coin
  const [sDepNet, setSDepNet] = useState(0); // selected deposit network

  const [usdToDeposit, setUsdToDeposit] = useState(100);
  const [tokensToGet, setTokensToGet] = useState(usdToDeposit * 1.5);

  function handleCCDeposit() {
    console.log("deposit cc: todo");
  }

  function handleCardDeposit() {
    console.log("deposit card: todo");
  }

  function handleCardDepInput(value) {
    let { usd, tokens } = value;
    if (usd > 1000000000000000000000 || tokens > 1000000000000000000000) return;
    if (usd !== -1) {
      setUsdToDeposit(usd);
      setTokensToGet(Math.round((usd / 1.5) * 100) / 100);
    } else {
      setTokensToGet(tokens);
      setUsdToDeposit(Math.round(tokens * 1.5 * 100) / 100);
    }
  }

  const DepFooter = () => {
    const BackButton = () => {
      return (
        <button onClick={() => setIsFPage(true)} className="transparent-button">
          BACK
        </button>
      );
    };

    return (
      <div
        className="dep-footer-wrapper"
        style={{
          height: `${isC ? (isFPage ? "19.5%" : "45%") : "30%"}`,
          justifyContent: `${isFPage || !isC ? "flex-end" : "space-between"}`,
        }}
      >
        {isC && !isFPage ? <BackButton /> : <></>}

        {isC ? (
          <DepCCButton
            handleCCDeposit={handleCCDeposit}
            isFPage={isFPage}
            setIsFPage={setIsFPage}
          />
        ) : (
          <DepCardButton
            handleCardDepInput={handleCardDeposit}
            isFPage={isFPage}
            setIsFPage={setIsFPage}
          />
        )}
      </div>
    );
  };

  // WITHDRAW
  const WithdrawSwitch = () => {
    return (
      <>
        <div className="with-switch-wrapper brd-top brd-btm">
          <div className="u-g-switch-container">
            <button
              className={`${isU ? "with-s-btn" : ""}`}
              onClick={() => setIsU(true)}
            >
              USD
            </button>
            <button
              className={`${!isU ? "with-s-btn" : ""}`}
              onClick={() => setIsU(false)}
            >
              GET
            </button>
          </div>
        </div>
      </>
    );
  };

  const WithAmountSlider = () => {
    return (
      <>
        <div className="with-slider-wrapper brd-btm">
          <div className="header-3">AMOUNT</div>
        </div>
      </>
    );
  };

  return (
    <div className="dep-buttons-container">
      {/* DEPOSIT-BUTTON */}
      <button
        // disabled={true}
        onClick={() => {
          if (width > 815 && user) setIsD(true); // show d modal
          else if (width > 815 && !user) navigate("/login", { replace: true });
          else {
            if (props.setSArr) props.setSArr([false, false, false, false]);
            navigate("/deposit");
          }
        }}
      >
        BUY TOKEN
      </button>

      {/* WITHDRAW-BUTTON */}
      {/* <button
        disabled={true}
        onClick={() => {
          if (width > 815 && user) setIsW(true); // show w modal
          else if (width > 815 && !user) navigate("/login", { replace: true });
          else {
            if (props.setSArr) props.setSArr([false, false, false, false]);
            navigate("/deposit");
          }
        }}
        className="transparent-button centered"
      >
        WITHDRAW
      </button> */}

      {/* DEPOSIT-MODAL */}
      {isD ? (
        <div className="dep-modal-container">
          <div className="dep-modal-content">
            <CloseButton setFunc={setIsD} />
            <div className="dep-modal-wrapper">
              <div className="dep-modal-body">
                {/* DEP-NAVBAR */}
                <div className="dep-navbar">
                  {/* DEP-CRYPTO-LINK */}
                  <div
                    className={`dep-nav-button ${isC ? "s-nav-button" : ""}`}
                    onClick={() => setIsC(true)}
                  >
                    <img className="dep-img" src={isC ? cD : cD2} alt="" />
                    <div className="dep-button-text">With Crypto</div>
                  </div>

                  {/* DEP-CARD-LINK */}
                  <div
                    className={`dep-nav-button ${!isC ? "s-nav-button" : ""}`}
                    // onClick={() => setIsC(false)}
                    style={{ cursor: "not-allowed" }}
                  >
                    <img className="dep-img" src={isC ? caD : caD2} alt="" />
                    <div className="dep-button-text">With Card</div>
                  </div>
                </div>

                {/* DEP-CONTENT */}
                <div className="dep-content-container">
                  {isC ? (
                    <>
                      {/* CRYPTO-DEP-CONTENT */}
                      <div className="dep-header header-2">
                        Cryptocurrency Deposit
                      </div>

                      {isFPage ? (
                        <>
                          <DepDescription />
                          <DepCoinsSelector
                            sDepCoin={sDepCoin}
                            setSDepCoin={setSDepCoin}
                          />
                          <DepNetworkSelector
                            sDepNet={sDepNet}
                            setSDepNet={setSDepNet}
                          />

                          <DepFooter />
                        </>
                      ) : (
                        <>
                          <DepCCInfoBody
                            sDepNet={sDepNet}
                            sDepCoin={sDepCoin}
                          />

                          <DepWalletBox />

                          <DepFooter />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {/* CARD-DEP-CONTENT */}
                      <div className="dep-header header-2">Card Deposit</div>
                      <div className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </div>
                      <br />
                      <div className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </div>

                      <div className="num-input-container">
                        <div className="header-3">YOU PAY</div>
                        <div className="num-input">
                          <input
                            type="number"
                            value={usdToDeposit}
                            onChange={(e) => {
                              handleCardDepInput({
                                usd: e.target.value,
                                tokens: -1,
                              });
                            }}
                          />
                          <div className="num-input-currency">USD</div>
                        </div>
                      </div>

                      <div className="num-input-container">
                        <div className="header-3">YOU GET</div>
                        <div className="num-input">
                          <input
                            type="number"
                            value={tokensToGet}
                            onChange={(e) => {
                              handleCardDepInput({
                                usd: -1,
                                tokens: e.target.value,
                              });
                            }}
                          />
                          <div className="num-input-currency">GET</div>
                        </div>
                      </div>

                      <DepFooter />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* WITHDRAW-MODAL */}
      {isW ? (
        <div className="dep-modal-container">
          <div className="dep-modal-content">
            <CloseButton setFunc={setIsW} />
            <div className="with-modal-wrapper">
              <div className="with-modal-body">
                {/* WIT-NAVBAR */}
                <div className="header-2">Withdraw</div>

                <WithdrawSwitch />

                <WithAmountSlider />

                {/* DEP-CONTENT */}

                <div className="dep-content-container">
                  {isU ? (
                    <>
                      {/* CRYPTO-DEP-CONTENT */}
                      <div className="dep-header header-2">
                        Cryptocurrency Deposit
                      </div>

                      {isFPage ? (
                        <>
                          <div className="description">
                            · We accept deposits in ETH, BNB, TRX and USDT{" "}
                          </div>
                          <br />
                          <div
                            className="description brd-btm"
                            style={{ paddingBottom: "20px" }}
                          >
                            · The payment gate commission is 2.2%
                          </div>
                          <DepCoinsSelector
                            sDepCoin={sDepCoin}
                            setSDepCoin={setSDepCoin}
                          />
                          <DepNetworkSelector
                            sDepNet={sDepNet}
                            setSDepNet={setSDepNet}
                          />

                          <DepFooter />
                        </>
                      ) : (
                        <>
                          <DepCCInfoBody
                            sDepNet={sDepNet}
                            sDepCoin={sDepCoin}
                          />

                          <DepWalletBox />

                          <DepFooter />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {/* CARD-DEP-CONTENT */}
                      <div className="dep-header header-2">Card Deposit</div>
                      <div className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </div>
                      <br />
                      <div className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </div>

                      <div className="num-input-container">
                        <div className="header-3">YOU PAY</div>
                        <div className="num-input">
                          <input
                            type="number"
                            value={usdToDeposit}
                            onChange={(e) => {
                              handleCardDepInput({
                                usd: e.target.value,
                                tokens: -1,
                              });
                            }}
                          />
                          <div className="num-input-currency">USD</div>
                        </div>
                      </div>

                      <div className="num-input-container">
                        <div className="header-3">YOU GET</div>
                        <div className="num-input">
                          <input
                            type="number"
                            value={tokensToGet}
                            onChange={(e) => {
                              handleCardDepInput({
                                usd: -1,
                                tokens: e.target.value,
                              });
                            }}
                          />
                          <div className="num-input-currency">GET</div>
                        </div>
                      </div>

                      <DepFooter />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
