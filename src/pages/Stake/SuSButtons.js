import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

export const SuSButtons = (props) => {
  let { setIsS, isS } = props;
  return (
    <>
      <div className="stake-header-buttons-container brd-btm">
        <div className="double-button-container">
          <button
            className={`button-with-text ${isS ? "" : "unselected-button"}`}
            onClick={() => {
              setIsS(true);
            }}
          >
            <p>Stake</p>
          </button>
          <button
            className={`button-with-text ${!isS ? "" : "unselected-button"}`}
            onClick={() => {
              // setIsS(false);
              toast("Coming Soon");
            }}
          >
            <p>Unstake</p>
          </button>
        </div>
      </div>
    </>
  );
};

export const SuSButtonsMob = (props) => {
  let {
    cW,
    setCW,
    handleStake,
    handleStakeHelpers,
    handleUnstake,
    isLoading,
    setIsLoading,
    tokenPrice,
  } = props;

  let { tokensForStake, isL, isGet, setIsNeedUpdate } = handleStakeHelpers;
  return (
    <>
      <div className="stake-buttons-mob-wrapper">
        {cW === 0 ? (
          <>
            <button onClick={() => setCW(1)}>STAKE</button>
            <button
              onClick={() => {
                // setCW(2);
                toast("Coming Soon");
              }}
              className="transparent-button yellow-trans-btn"
            >
              UNSTAKE
            </button>
          </>
        ) : (
          <>
            {cW === 1 ? (
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await handleStake(
                    tokensForStake,
                    isL,
                    isGet,
                    setIsNeedUpdate,
                    tokenPrice
                  );
                  setIsLoading(false);
                }}
              >
                {isLoading ? (
                  <div>
                    <SyncLoader color="black" size={10} speedMultiplier={0.5} />
                  </div>
                ) : (
                  "STAKE"
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  toast("Coming Soon");
                  // handleUnstake()}
                }}
              >
                UNSTAKE
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};
