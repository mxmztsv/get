import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindow";
import { ForgotPassBody } from "./ForgotPassBody";

export const ForgotPassword = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // ------------------------------

  // main submit

  // ------------------------------

  return (
    <div className="sign-up-page-container">
      <>
        {width > 815 ? (
          <div
            className="sign-up-logo logo"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <img
              src={require("../../assets/img/logo-icon.svg").default}
              alt=""
            />{" "}
            GET
          </div>
        ) : (
          <></>
        )}
        <ForgotPassBody setIsLoading={setIsLoading} isLoading={isLoading} />
      </>
    </div>
  );
};
