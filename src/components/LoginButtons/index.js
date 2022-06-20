import React from "react";

export const LoginButtons = (props) => {
  function handleLogin() {
    if (props.setF) props.setF([false, false, false, false]);
    window.location.href = "/login";
  }

  function handleSignup() {
    if (props.setF) props.setF([false, false, false, false]);
    window.location.href = "/signup";
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
