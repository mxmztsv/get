import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginButtons = (props) => {
  const navigate = useNavigate();
  function handleLogin() {
    if (props.setF) props.setF([false, false, false, false]);
    navigate("/login");
  }

  function handleSignup() {
    if (props.setF) props.setF([false, false, false, false]);
    navigate("/signup");
  }

  return (
    <div className="dash-login-container">
      <div className="login-elem-wrapper">
        <div className="login-buttons">
          <button
            className="sign-in-button"
            onClick={() => {
              handleLogin();
            }}
          >
            LOGIN
          </button>
          <button
            className="login-button"
            onClick={() => {
              handleSignup();
            }}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};
