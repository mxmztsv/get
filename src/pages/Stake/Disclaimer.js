export const UnstakeDisclaimer = () => {
  return (
    <div className="withdraw-disclaimer-container">
      <div className="withdraw-disclaimer-img">
        <img src={require("../../assets/img/alarm.svg").default} alt="" />
      </div>
      <div className="withdraw-disclaimer-text">
        <div className="medium-yellow-header" style={{ fontSize: "18px" }}>
          Important
        </div>
        <div className="withdraw-disclaimer-body">
          · The unstaking process takes 60 days
          <br />
          <p style={{ marginTop: "10px" }}>
            · You can unstake only all of your deposit
          </p>
        </div>
      </div>
    </div>
  );
};
