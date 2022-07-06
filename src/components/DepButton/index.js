import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import caD2 from "../../assets/img/card-dep-2.svg";
import caD from "../../assets/img/card-dep.svg";
import cD2 from "../../assets/img/crypto-dep-2.svg";
import cD from "../../assets/img/crypto-dep.svg";
import useWindowDimensions from "../../hooks/useWindow";
import { UserContext } from "../../utils/UserContext";
import { CloseButton } from "../CloseButton";
import { DepFooter } from "./Buttons";
import { CardDepositBody } from "./CardDepositBody";
import { DepCCInfoBody, DepDescription, DepWalletBox } from "./InfoElems";
import { DepNetworkSelector } from "./Selectors";

export const DepButton = (props) => {
  const { width } = useWindowDimensions();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [isD, setIsD] = useState(false); // is deposit modal visible
  const [isC, setIsC] = useState(true); // is crypto payment method selected
  const [isFPage, setIsFPage] = useState(true); // is first page

  const [sDepCoin, setSDepCoin] = useState(0); // selected deposit coin
  const [sDepNet, setSDepNet] = useState(0); // selected deposit network

  const [depWallet, setDepWallet] = useState("");
  const [isCop, setIsCop] = useState(false); // is copied

  const [usdToDeposit, setUsdToDeposit] = useState(100);

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
                    onClick={() => setIsC(false)}
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

                          <DepFooter
                            funcs={{
                              isC,
                              isFPage,
                              sDepNet,
                              setIsFPage,
                              setDepWallet,
                              usdToDeposit,
                            }}
                          />
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
                          <DepFooter
                            funcs={{
                              isC,
                              isFPage,
                              sDepNet,
                              setIsFPage,
                              setDepWallet,
                              usdToDeposit,
                            }}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {/* CARD-DEP-CONTENT */}
                      <CardDepositBody
                        usdToDeposit={usdToDeposit}
                        setUsdToDeposit={setUsdToDeposit}
                      />

                      <DepFooter
                        funcs={{
                          isC,
                          isFPage,
                          sDepNet,
                          setIsFPage,
                          setDepWallet,
                          usdToDeposit,
                        }}
                      />
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
