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
