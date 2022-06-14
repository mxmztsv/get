import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindow";
import { setItem } from "../../utils/localStorage";
import { UserContext } from "../../utils/UserContext";
import { SignUpBody } from "./SignUpBody";

export const Signup = () => {
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

  // refcode fetching from url
  const [refCode, setRefCode] = useState("");
  useEffect(() => {
    let uStr = window.location.search;
    console.log(uStr);
    const uParams = new URLSearchParams(uStr);
    console.log(uParams.get("r"));
    if (uParams.get("r")) {
      setRefCode(uParams.get("r"));
    }
  }, []);
  // ------------------------------

  // vars
  const [errorMes, setErrorMes] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // ------------------------------

  // main submit
  const onSubmit = async (data) => {
    console.log("data:", data);

    let res;

    try {
      let req = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}profile/signup`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "text/plain",
        },
      };
      res = await axios(req);
    } catch (e) {
      let mes = e.response.data.error_message;
      let eCode = e.response.data.error_code;
      console.log("su e m:", mes);
      console.log("su e c:", eCode);
      if (eCode === 18) {
        toast.error("Invalid Email");
      } else if (eCode === 422) {
        toast.error("Email already registered");
      } else if (typeof mes === "object") {
        toast.error(mes[Object.keys(mes)[0]]);
      } else {
        toast.error(e.response.data.error_message);
      }
    }

    if (res) {
      console.log(res);

      if (res.data.result === "success") {
        let user = {
          first_name: data.first_name,
          last_name: data.last_name,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email,
          balance: 0,
        };

        setUser(user);
        setItem("user", user);
        setItem("userName", `${data.first_name} ${data.last_name}`);
        setItem("token", res.data.data.token);
        navigate("/dashboard");
      }
    }
  };
  // ------------------------------

  return (
    <div className="sign-up-page-container">
      {width > 815 ? (
        <>
          <div className="sign-up-logo">
            <img src={require("../../assets/img/logo.svg").default} alt="" />
          </div>
          <SignUpBody
            onSubmit={onSubmit}
            errorMes={errorMes}
            refCode={refCode}
            isLoading={isLoading}
          />
        </>
      ) : (
        <>
          <SignUpBody
            onSubmit={onSubmit}
            errorMes={errorMes}
            refCode={refCode}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
