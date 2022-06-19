import { SyncLoader } from "react-spinners";

// DESKTOP STAKE USTAKE BUTTONS
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
              setIsS(false);
            }}
          >
            <p>Unstake</p>
          </button>
        </div>
      </div>
    </>
  );
};

// MOBILE STAKE UNSTAKE BUTTONS
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
    isMain,
    nonLockedDep,
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
                setCW(2);
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
                    tokenPrice,
                    isMain
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
                onClick={async () => {
                  setIsLoading(true);
                  await handleUnstake(
                    nonLockedDep.depId,
                    nonLockedDep.getAmount,
                    setIsNeedUpdate
                  );
                  setIsLoading(false);
                }}
              >
                {isLoading ? (
                  <div>
                    <SyncLoader color="black" size={10} speedMultiplier={0.5} />
                  </div>
                ) : (
                  "UNSTAKE"
                )}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};
