import { useState } from "react";
import check from "../../assets/img/check.svg";
import copyButton from "../../assets/img/copy-icon.png";
import { copyText } from "../../utils/copyText";

export const Input = (props) => {
  const [isC, setIsC] = useState(false); // is copied

  let {
    register,
    readOnly,
    rules,
    errors,
    name,
    placeHolder,
    type,
    autoComplete,
    defaultValue,
    isWithCopy,
  } = props;

  function handleClick(name) {
    if (isWithCopy && readOnly) {
      copyText(name, 0, true);
      setIsC(true);
      setTimeout(function () {
        setIsC(false);
      }, 2000);
    }
    document.getElementsByName(name)[0].focus();
  }

  let regVal = rules ? { ...register(name, rules) } : { ...register(name) };

  return (
    <div
      className="input-field"
      onClick={() => handleClick(name)}
      style={{ cursor: "pointer" }}
    >
      {placeHolder}
      <div className="input-container">
        <input
          type={type ? type : "text"}
          autoComplete={autoComplete ? autoComplete : "on"}
          {...regVal}
          readOnly={readOnly}
          defaultValue={defaultValue}
          style={{ cursor: `${readOnly ? "pointer" : "text"}` }}
          onClick={() => {}}
        />

        {isWithCopy && readOnly && defaultValue ? (
          <>
            <div className={`dep-opt-copy-button ${isC ? "copied" : ""}`}>
              {!isC ? (
                <img src={copyButton} alt="copy" />
              ) : (
                <object data={check} aria-label="copied" />
              )}
            </div>
          </>
        ) : (
          <>
            {errors && (
              <p className="error-p">Please enter valid {placeHolder}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
