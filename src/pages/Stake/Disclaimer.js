export const UnstakeDisclaimer = () => {
  return (
    <div className="withdraw-disclaimer-container brd-top">
      <div className="withdraw-disclaimer-img">
        <img src={require("../../assets/img/alarm.svg").default} alt="" />
      </div>
      <div className="withdraw-disclaimer-text">
        <div
          className="header-2"
          style={{ fontSize: "18px", marginBottom: "10px" }}
        >
          Important
        </div>
        <div className="withdraw-disclaimer-body">
          · The unstaking process takes 60 days
          <br />
          <p style={{ marginTop: "5px" }}>
            · You can unstake only all of your deposit
          </p>
        </div>
      </div>
    </div>
  );
};
