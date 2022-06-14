import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindow";
import { setItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";
import { LoginBody } from "./LoginBody";

export const Login = () => {
  const { width } = useWindowDimensions();

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
  const [errorMes, setErrorMes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // ------------------------------

  // main submit
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("data:", data);

    let res;

    try {
      let req = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}profile/login`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "text/plain",
        },
      };
      res = await axios(req);
    } catch (e) {
      let mes = e.response.data.error_message;
      let eCode = e.response.data.error_code;
      console.error("l e m:", mes);
      if (eCode === 101) {
        toast.error("Invalid Email or Password");
      } else if (typeof mes === "object") {
        toast.error(mes[Object.keys(mes)[0]]);
      } else {
        toast.error(e.response.data.error_message);
      }
    }

    if (res) {
      console.log(res);
      if (res.data.result === "success") {
        let user = { name: undefined, email: data.email };

        setUser(user);
        setItem("user", user);
        setItem("token", res.data.data.token);
        navigate("/dashboard");
      }
    }
    setIsLoading(false);
  };
  // ------------------------------

  return (
    <div className="sign-up-page-container">
      {width > 815 ? (
        <>
          <div
            className="sign-up-logo"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <img src={require("../../assets/img/logo.svg").default} alt="" />
          </div>
          <LoginBody
            onSubmit={onSubmit}
            errorMes={errorMes}
            isLoading={isLoading}
          />
        </>
      ) : (
        <>
          <LoginBody
            onSubmit={onSubmit}
            errorMes={errorMes}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
