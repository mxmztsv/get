import { useState } from "react";
import check from "../../assets/img/check.svg";
import copyButton from "../../assets/img/copy-icon.png";
import { copyText } from "../../utils/copyText";

export const RefLinkBody = (props) => {
  const [isC, setIsC] = useState(false); // is copied
  let { refLink } = props;
  return (
    <div
      className="referral-body-code-container"
      onClick={() => {
        copyText("referral-code-text");
        setIsC(true);
        setTimeout(function () {
          setIsC(false);
        }, 2000);
      }}
    >
      <div>
        <div className="small-grey-header">Your referral code</div>
        <div
          className={`referral-code-text ${
            refLink === "" ? "disabled-div" : ""
          }`}
        >
          {refLink !== "" ? (
            <>
              <p className="ref-link-text">{refLink}</p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className={`dep-opt-copy-button ${isC ? "copied" : ""}`}>
        {!isC ? (
          <img src={copyButton} alt="copy" />
        ) : (
          <object data={check} aria-label="copied" />
        )}
      </div>
    </div>
  );
};
