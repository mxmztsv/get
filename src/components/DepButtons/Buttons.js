export const DepCCButton = (props) => {
  let { isFPage, setIsFPage, handleCCDeposit } = props;
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
              handleCCDeposit();
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
  let { isFPage, setIsFPage, handleCardDeposit } = props;
  return (
    <>
      <button
        style={{
          minWidth: "150px",
        }}
        onClick={() => {
          if (isFPage) setIsFPage(false);
          else {
            handleCardDeposit();
          }
        }}
      >
        TOP UP
      </button>
    </>
  );
};
