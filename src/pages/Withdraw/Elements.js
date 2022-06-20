import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { handleWithdraw } from "../../components/WithdrawButton/handleWithdraw";
import { requestCode } from "../../components/WithdrawButton/requestCode";

export const BackButtonWith = (props) => {
  let { isFPage, setIsFPage } = props;
  return (
    <div>
      {!isFPage ? (
        <button className="back-button" onClick={() => setIsFPage(true)}>
          <img src={require("../../assets/img/back.svg").default} alt="" /> Back
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export const WithFooterMob = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let { isFPage, setIsFPage, tokensForWith, isGet, tokenPrice, isMain } = props;

  function getCondition(isG, tFW, tP) {
    if (isG) {
      return tFW * tP < 100;
    } else {
      return tFW < 100;
    }
  }

  return (
    <div className="stake-buttons-mob-wrapper">
      <div className="withdraw-btn-mob">
        <button
          disabled={getCondition(isGet, tokensForWith, tokenPrice)}
          onClick={async () => {
            setIsLoading(true);

            if (isFPage) {
              // request code
              let res = await requestCode();
              if (!res) {
                setIsLoading(false);
                return;
              }
            } else {
              // submit withdraw
              // @ts-ignore
              let code = document.getElementById("code-input").value;
              let res = await handleWithdraw(
                isGet,
                tokensForWith,
                code,
                isMain
              );
              if (res) {
                setIsFPage(true);
                navigate("/profile");
              }
            }

            setIsFPage(false);
            setIsLoading(false);
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
    </div>
  );
};
