import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

export function handleNavLinkClick(num, setSArr) {
  if (num === 0) setSArr([true, false, false, false]); // dash
  else if (num === 1) setSArr([false, true, false, false]); // stake
  else if (num === 2) setSArr([false, false, true, false]); // ref
  else if (num === 3) setSArr([false, false, false, true]); // profile
}

export const NavLink = (props) => {
  const { user } = useContext(UserContext);

  let { num, text, sArr, setSArr } = props;
  let icon;
  if (num === 0) icon = require("../../assets/img/dash-icon.svg");
  if (num === 1) icon = require("../../assets/img/stake-icon.svg");
  if (num === 2) icon = require("../../assets/img/ref-icon.svg");

  let to;
  if (!user && text.toString().toLowerCase() !== "dashboard") to = "/signup";
  else to = `/${text.toString().toLowerCase()}`;

  return (
    <Link
      className={`nav-link ${sArr[num] ? "s-link" : ""}`}
      to={to}
      onClick={() => handleNavLinkClick(num, setSArr)}
    >
      <img className="link-img" src={icon.default} alt="" />
      {text}
    </Link>
  );
};

export const NavLinkMob = (props) => {
  let { num, text, sArr, setSArr } = props;
  let icon;
  if (num === 0) icon = require("../../assets/img/dash-icon.svg");
  if (num === 1) icon = require("../../assets/img/stake-icon.svg");
  if (num === 2) icon = require("../../assets/img/ref-icon.svg");
  return (
    <Link
      className={`nav-opened-link ${sArr[num] ? "s-link-mob" : ""}`}
      to={`/${text.toString().toLowerCase()}`}
      onClick={() => handleNavLinkClick(num, setSArr)}
    >
      <img className="link-img" src={icon.default} alt="" />
      {text}
    </Link>
  );
};
