export const Input = (props) => {
  let { register, rules, errors, name, placeHolder, type, autoComplete } =
    props;

  function handleClick(name) {
    document.getElementsByName(name)[0].focus();
  }

  return (
    <div
      className="input-field"
      onClick={() => handleClick(name)}
      style={{ cursor: "pointer" }}
    >
      {placeHolder}
      <div className="input-container">
        {rules ? (
          <input
            type={type ? type : "text"}
            autoComplete={autoComplete ? autoComplete : "on"}
            {...register(name, rules)}
          />
        ) : (
          <input {...register(name)} />
        )}
        {errors && <p className="error-p">Please enter valid {placeHolder}</p>}
      </div>
    </div>
  );
};
