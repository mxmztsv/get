export const UnstakeDisclaimer = () => {
  return (
    <div className="withdraw-disclaimer-container">
      <div className="withdraw-disclaimer-img">
        <img src={require("../../assets/img/alarm.svg").default} alt="" />
      </div>
      <div className="withdraw-disclaimer-text">
        <div className="medium-white-header" style={{ fontSize: "18px" }}>
          Important
        </div>
        <div className="withdraw-disclaimer-body">
          The unstaking process takes 60 days
        </div>
      </div>
    </div>
  );
};
