import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindow";
import { UserContext } from "../../utils/UserContext";
import { CloseButton } from "../CloseButton";
import { DepNetworkSelector } from "../DepButton/Selectors";
import {
  SelectedNetBox,
  SelectedWalletBox,
  TotalAmountBox,
  VerifCodeBox,
  WithdrawSwitch,
  WithFooter,
} from "./Elements";
import { WithAmountSlider } from "./WithSlider";

export const WithdrawButton = (props) => {
  const { user } = useContext(UserContext);
  const { width } = useWindowDimensions();

  const navigate = useNavigate();

  const [isW, setIsW] = useState(false); // is withdraw modal visible
  const [isGet, setIsGet] = useState(true); // is usdt withdraw selected
  const [isFPage, setIsFPage] = useState(true); // is first page

  const [tokensForWith, setTokensForWith] = useState(0);
  const [getBal, setGetBal] = useState(0);
  const [usdtBal, setUsdtBal] = useState(0);

  const [sDepNet, setSDepNet] = useState(0);

  const [sWallet, setSWallet] = useState("");

  async function handleWithCalcChange() {}

  return (
    <>
      {/* WITHDRAW-BUTTON */}

      <div
        className="with-button-container"
        style={{ marginLeft: `${width > 815 ? "10px" : "0"}` }}
      >
        <button
          onClick={() => {
            // if (width > 815 && user) setIsW(true); // show w modal
            // else if (width > 815 && !user)
            //   navigate("/login", { replace: true });
            // else {
            //   if (props.setSArr) props.setSArr([false, false, false, false]);
            //   navigate("/withdraw");
            // }
            toast("Comming Soon");
          }}
          className="transparent-button yellow-trans-btn"
        >
          WITHDRAW
        </button>
      </div>

      {isW ? (
        <>
          <div className="dep-modal-container">
            <div className="dep-modal-content">
              <CloseButton setFunc={setIsW} />
              <div className="with-modal-wrapper">
                <div className="with-content-container">
                  <div className="with-modal-body">
                    <div className="header-2 with-header">Withdraw</div>

                    {isFPage ? (
                      <>
                        {/* FIRST-PAGE */}
                        <WithdrawSwitch isGet={isGet} setIsGet={setIsGet} />
                        <WithAmountSlider
                          func={{
                            tokensForWith,
                            isGet,
                            getBal,
                            usdtBal,
                            handleWithCalcChange,
                          }}
                        />

                        <div className="with-row-wrapper">
                          <DepNetworkSelector
                            sDepNet={sDepNet}
                            setSDepNet={setSDepNet}
                          />
                          <div
                            className="grey-text"
                            style={{ marginTop: "-30px", marginBottom: "25px" }}
                          >
                            Minimum withdraw amount: 100 USD
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* SECOND-PAGE */}
                        <div className="with-s-page-wrapper">
                          <TotalAmountBox
                            totalAmount={tokensForWith}
                            isGet={isGet}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {isFPage ? (
                    <></>
                  ) : (
                    <>
                      <SelectedNetBox sDepNet={sDepNet} />
                      <SelectedWalletBox sWallet={sWallet} />
                      <VerifCodeBox />
                    </>
                  )}

                  <WithFooter
                    isFPage={isFPage}
                    setIsFPage={setIsFPage}
                    tokensForWith={tokensForWith}
                    isGet={isGet}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
