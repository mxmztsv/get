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
              setIsS(false);
            }}
            disabled={true}
          >
            <p>Unstake</p>
          </button>
        </div>
      </div>
    </>
  );
};

export const SuSButtonsMob = (props) => {
  let { cW, setCW, handleStake, handleUnstake, isLoading, setIsLoading } =
    props;
  return (
    <>
      <div className="stake-buttons-mob-wrapper">
        {cW === 0 ? (
          <>
            <button onClick={() => setCW(1)}>STAKE</button>
            <button
              // onClick={() => setCW(2)}
              className="transparent-button"
              disabled={true}
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
                  await handleStake();
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
              <button onClick={() => handleUnstake()}>UNSTAKE</button>
            )}
          </>
        )}
      </div>
    </>
  );
};
