export const CloseButton = (props) => {
  let { setFunc } = props;
  return (
    <div className="close-button-container" onClick={() => setFunc(false)}>
      Close{" "}
      <img
        className="close-img"
        src={require("../../assets/img/close.svg").default}
        alt=""
      />
    </div>
  );
};
