import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { handleCardDeposit } from "./handleCardDeposit";
import { handleCCDeposit } from "./handleCCDeposit";

export const DepCCButton = (props) => {
  let { sDepNet, setDepWallet, isFPage, setIsFPage, handleCCDeposit } = props;
  return (
    <>
      {" "}
      {isFPage ? (
        <button
          style={{
            minWidth: "150px",
          }}
          onClick={() => {
            if (isFPage) {
              setIsFPage(false);
              handleCCDeposit(sDepNet, setDepWallet);
            }
          }}
        >
          {isFPage ? "NEXT" : "TOP UP"}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export const DepCardButton = (props) => {
  let { handleCardDeposit, usdAmount } = props;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button
        style={{
          minWidth: "150px",
        }}
        onClick={async () => {
          setIsLoading(true);
          await handleCardDeposit(usdAmount);
          setIsLoading(false);
        }}
      >
        {isLoading ? (
          <div>
            <SyncLoader color="black" size={10} speedMultiplier={0.5} />
          </div>
        ) : (
          "TOP UP"
        )}
      </button>
    </>
  );
};

export const DepFooter = (props) => {
  let { funcs } = props;
  let { isC, isFPage, sDepNet, setIsFPage, setDepWallet, usdToDeposit } = funcs;

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
        height: `${isC ? (isFPage ? "%" : "23.5%") : "35%"}`,

        justifyContent: `${isFPage || !isC ? "flex-end" : "space-between"}`,
      }}
    >
      {isC && !isFPage ? <BackButton /> : <></>}

      {isC ? (
        <DepCCButton
          sDepNet={sDepNet}
          setDepWallet={setDepWallet}
          isFPage={isFPage}
          setIsFPage={setIsFPage}
          handleCCDeposit={handleCCDeposit}
        />
      ) : (
        <DepCardButton
          isFPage={isFPage}
          setIsFPage={setIsFPage}
          handleCardDeposit={handleCardDeposit}
          usdAmount={usdToDeposit}
        />
      )}
    </div>
  );
};
