import { useContext } from "react";
import useWindowDimensions from "../../hooks/useWindow";
import { getItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";

// boxes
export const ProfHeader = () => {
  const { user } = useContext(UserContext);

  function getName() {
    if (getItem("userName")) {
      return `${getItem("userName")}`;
    } else if (user && user.name) {
      return `${user.name}`;
    } else return "";
  }

  return (
    <div className="profile-page-text brd-btm">
      <div className="profile-page-name header-1">{getName()}</div>
      <div className="profile-page-email grey-text">
        {user ? user.email : ""}
      </div>
    </div>
  );
};

export const TgBotBox = (props) => {
  let { isC } = props;
  const { width } = useWindowDimensions();

  function handleConnectClick() {
    console.log("tgToken:", getItem("tgToken"));
    if (!getItem("tgToken")) return;

    window.open(`tg://resolve?domain=GetStakeBot&start=${getItem("tgToken")}`);
  }
  return (
    <div className={`tg-box-wrapper ${width < 815 ? "brd-btm" : ""}`}>
      <div className="header-2">Telegram Bot</div>
      <p>
        Telegram bot allows you to receive updates on both the yield of your
        personal deposits and affiliate program
      </p>

      <button
        className={`${isC ? "transparent-button red-trans-btn" : ""}`}
        disabled={true}
        // onClick={() => {
        //   if (!isC) {
        //     handleConnectClick();
        //   }
        // }}
      >
        {isC ? "DISCONNECT" : "CONNECT"}
      </button>
    </div>
  );
};

export const EditProfileBtnMob = (props) => {
  let { setIsE } = props;
  return (
    <button
      className="transparent-button yellow-trans-btn"
      onClick={() => setIsE(true)}
      disabled={true}
    >
      <p> EDIT PROFILE</p>
    </button>
  );
};
// -------------------------------
