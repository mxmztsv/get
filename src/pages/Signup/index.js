import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindow";
import { SignUpBody } from "./SignUpBody";

export const Signup = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState(false);
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

      <SignUpBody
        refCode={refCode}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};
