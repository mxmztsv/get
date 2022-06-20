import { useContext } from "react";
import { WithdrawButton } from "../../components/WithdrawButton";
import { getItem } from "../../utils/localStorage";
import { toastC } from "../../utils/toastC";
import { UserContext } from "../../utils/UserContext";

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

export const ProfHeaderMob = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="prof-header-wrapper brd-btm">
      <div className="profile-top-wrapper-mob">
        <div className="header-1">{user ? user.name : ""}</div>
        <div className="small-grey-header">{user ? user.email : ""}</div>
      </div>
      <WithdrawButton />
    </div>
  );
};

export const TgBotBox = (props) => {
  let { isC } = props;

  function handleConnectClick() {
    console.log("tgToken:", getItem("tgToken"));
    if (!getItem("tgToken")) return;

    window.open(`tg://resolve?domain=GetStakeBot&start=${getItem("tgToken")}`);
  }
  return (
    <div className="tg-box-wrapper brd-btm">
      <div className="header-2">Telegram Bot</div>
      <p>
        Telegram bot allows you to receive updates on both the yield of your
        personal deposits and affiliate program
      </p>

      <button
        className={`${isC ? "transparent-button " : ""}`}
        style={{ cursor: `${isC ? "not-allowed" : "pointer"}` }}
        onClick={() => {
          if (!isC) {
            handleConnectClick();
          }
        }}
      >
        {isC ? "CONNECTED" : "CONNECT"}
      </button>
    </div>
  );
};

export const EditProfileBtnMob = (props) => {
  let { setIsE } = props;
  return (
    <button
      className="transparent-button yellow-trans-btn"
      onClick={() => {
        // setIsE(true);
        toastC("Coming Soon");
      }}
    >
      <p> EDIT PROFILE</p>
    </button>
  );
};

export const EditBody = (props) => {
  let { handleSubmit, register, errors, onSubmit } = props;
  return (
    <div className="edit-page-body">
      <form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          First name
          <input {...register("firstName")} />
        </div>
        <div className="input-field">
          Last name
          <input {...register("lastName", { required: true })} />
          {errors.lastName && <p>Last name is required.</p>}
        </div>
        <div className="input-field">
          Email
          <input
            {...register("age", {
              pattern:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
          />
          {errors.age && <p className="error-p">Please enter valid Email</p>}
        </div>
      </form>
    </div>
  );
};

export const EditStateFooterMob = (props) => {
  let { setIsE } = props;
  return (
    <>
      <button onClick={() => setIsE(false)} className="transparent-button">
        Cancel
      </button>
      <button
        onClick={() => setIsE(false)}
        style={{ marginRight: "0" }}
        className="transparent-button green-trans-button"
      >
        Save
      </button>
    </>
  );
};

export const EditStateFooter = (props) => {
  let { setIsE } = props;
  return (
    <>
      <button
        onClick={() => {
          setIsE(false);
        }}
        className="transparent-button"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          // alert("todo");
          // setIsE(false);
        }}
        className="transparent-button green-trans-button"
        type="submit"
        form="edit-form"
      >
        Save
      </button>
    </>
  );
};
