import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import caD2 from "../../assets/img/card-dep-2.svg";
import caD from "../../assets/img/card-dep.svg";
import cD2 from "../../assets/img/crypto-dep-2.svg";
import cD from "../../assets/img/crypto-dep.svg";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchAddrs } from "../../pages/Deposit/fetchAddrs";
import { UserContext } from "../../utils/UserContext";
import { CloseButton } from "../CloseButton";
import { DepCardButton, DepCCButton } from "./Buttons";
import { DepCCInfoBody, DepDescription, DepWalletBox } from "./InfoElems";
import { DepNetworkSelector } from "./Selectors";

export const DepButton = (props) => {
  const { width } = useWindowDimensions();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [isD, setIsD] = useState(false); // is deposit modal visible
  const [isC, setIsC] = useState(true); // is card payment method selected
  const [isFPage, setIsFPage] = useState(true); // is first page

  const [sDepCoin, setSDepCoin] = useState(0); // selected deposit coin
  const [sDepNet, setSDepNet] = useState(0); // selected deposit network

  const [usdToDeposit, setUsdToDeposit] = useState(100);
  const [tokensToGet, setTokensToGet] = useState(usdToDeposit * 1.5);

  const [depWallet, setDepWallet] = useState("");
  const [isCop, setIsCop] = useState(false); // is copied

  function handleCardDeposit() {
    console.log("deposit card:", sDepNet);
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

  function handleCCDeposit() {
    fetchAddrs(sDepNet, setDepWallet);
  }

  const DepFooter = () => {
    const BackButton = () => {
      return (
        <button
          onClick={() => {
            setIsFPage(true);
            setDepWallet("");
          }}
          className="transparent-button"
        >
          BACK
        </button>
      );
    };

    return (
      <div
        className="dep-footer-wrapper"
        style={{
          height: `${isC ? (isFPage ? "%" : "23.5%") : "30%"}`,
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
                    onClick={() => {
                      toast("Coming Soon");
                    }}
                    // style={{ cursor: "not-allowed" }}
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
                          {/* <DepCoinsSelector
                            sDepCoin={sDepCoin}
                            setSDepCoin={setSDepCoin}
                          /> */}
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

                          <DepWalletBox
                            depWallet={depWallet}
                            isC={isCop}
                            setIsC={setIsCop}
                          />

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
