import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindow";
import { setItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";
import { UserContext } from "../../utils/UserContext";
import { NewPasswordBody } from "./NewPasswordBody";

export const NewPassword = () => {
  const { width } = useWindowDimensions();
  const { state } = useLocation();

  // navbar disabling
  useEffect(() => {
    let navbar = document.getElementById("navbar");
    if (width > 815) {
      navbar.style.display = "none";
    } else {
      navbar.style.display = "flex";
    }
  }, [width]);
  // ------------------------------

  // vars
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // ------------------------------

  // main submit
  const onSubmit = async (data) => {
    setIsLoading(true);

    if (state.data) {
      data["email"] = state.data.email;
    } else {
      toastC("Internal error. Try again later", 1);
      navigate("/forgot-password");
      return;
    }

    console.log("[NewPassword] data:", data);

    let res = await sendReq("post", "profile/lostpass-edit", data);

    if (res.data && res.data.result === "success") {
      let user = { name: undefined, email: state.data.email };

      setUser(user);
      setItem("user", user);
      setItem("token", res.data.token);

      navigate("/dashboard");

      toastC("Successfully reseted password", 0);
    } else {
      let mes = res.response.data.error_message;
      console.error("[NewPassword] error:", mes);
      if (typeof mes === "object") {
        toastC(mes[Object.keys(mes)[0]], 1);
      } else {
        toastC(res.response.data.error_message, 1);
      }
    }

    setIsLoading(false);
  };
  // ------------------------------

  return (
    <div className="sign-up-page-container">
      {width > 815 ? (
        <div
          className="sign-up-logo logo"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src={require("../../assets/img/logo-icon.svg").default} alt="" />{" "}
          GET
        </div>
      ) : (
        <></>
      )}
      <NewPasswordBody onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};
