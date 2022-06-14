import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-icon.svg";
import { DepButtons } from "../../components/DepButtons";
import { LoginButtons } from "../../components/LoginButtons";
import {
  handleNavLinkClick,
  NavLink,
  NavLinkMob,
} from "../../components/NavLink";
import useWindowDimensions from "../../hooks/useWindow";
import { PathContext } from "../../utils/PathContext";
import { UserContext } from "../../utils/UserContext";

export const Navbar = () => {
  // vars
  const { width } = useWindowDimensions();
  const { user } = useContext(UserContext);
  const [sArr, setSArr] = useState([true, false, false, false]); // selected link
  const [isN, setIsN] = useState(false); // mobile. is opened navbar
  // -----------------------------------------------------

  // navbar update
  const { navPath } = useContext(PathContext); // selected link update
  useEffect(() => {
    setSArr(navPath);
  }, [navPath]);
  // ----------------

  function closeNavbar() {
    setIsN(false);
    document.getElementById("checkbox4").click(); // activate burger
  }

  return (
    <>
      {width > 815 ? (
        // DESKTOP
        <>
          <nav id="navbar" className="navbar">
            <div className="nav-top">
              {/* NAV-LOGO */}
              <div className="logo">
                <img src={logo} alt="logo" /> GET
              </div>

              {/* NAV-LINKS */}
              <div className="nav-links">
                <NavLink
                  num={0}
                  text="Dashboard"
                  icon="dash-icon"
                  sArr={sArr}
                  setSArr={setSArr}
                />
                <NavLink
                  num={1}
                  text="Stake"
                  icon="stake-icon"
                  sArr={sArr}
                  setSArr={setSArr}
                />
                <NavLink
                  num={2}
                  text="Referral"
                  icon="ref-icon"
                  sArr={sArr}
                  setSArr={setSArr}
                />
              </div>
            </div>

            <div className="nav-bottom">
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => handleNavLinkClick(3, setSArr)}
                >
                  <div
                    className={`nav-profile-container ${
                      sArr[3] ? "profile-selected" : ""
                    }`}
                  >
                    <div className="nav-profile-body">
                      <div className="nav-profile-name">
                        {user.first_name ? user.first_name : "Profile"}
                      </div>
                      <div className="nav-profile-balance">
                        {user.last_name ? user.last_name : ""}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </nav>
        </>
      ) : (
        // MOBILE
        <>
          <nav
            id="navbar"
            className={`navbar-mob ${isN ? "navbar-mob-opened" : ""}`}
          >
            {/* NAV-TOP-MOB */}
            <div className="nav-body-container">
              <div className="nav-top-mob">
                {/* LOGO */}
                <div className="nav-top-logo">
                  <img src={logo} alt="logo" /> GET
                </div>

                {/* BURGER */}
                <div className="nav-top-burger">
                  <input
                    type="checkbox"
                    id="checkbox4"
                    className="checkbox4 visuallyHidden"
                  />
                  <label
                    htmlFor="checkbox4"
                    onClick={() => {
                      console.log(isN);
                      setIsN(!isN);
                      console.log("opened");
                    }}
                  >
                    <div className="hamburger hamburger4">
                      <span className="bar bar1"></span>
                      <span className="bar bar2"></span>
                      <span className="bar bar3"></span>
                      <span className="bar bar4"></span>
                      <span className="bar bar5"></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* NAV-BODY-MOB */}
            {isN ? (
              // mobile navbar opened
              <div className="nav-opened-body" onClick={() => closeNavbar()}>
                {/* NAV-OPENED-BUTTONS */}
                <div className="nav-opened-top-buttons-container">
                  <DepButtons setSArr={setSArr} />
                </div>

                {/* NAV-OPENED-LINKS */}

                <div className="nav-opened-links brd-top">
                  <NavLinkMob
                    num={0}
                    text="Dashboard"
                    icon="dash-icon"
                    sArr={sArr}
                    setSArr={setSArr}
                  />
                  <NavLinkMob
                    num={1}
                    text="Stake"
                    icon="stake-icon"
                    sArr={sArr}
                    setSArr={setSArr}
                  />
                  <NavLinkMob
                    num={2}
                    text="Referral"
                    icon="ref-icon"
                    sArr={sArr}
                    setSArr={setSArr}
                  />
                </div>

                {/* NAV-OPENED-FOOTER */}
                <div className="nav-opened-footer">
                  {user ? (
                    <Link
                      to="/profile"
                      onClick={() => handleNavLinkClick(setSArr, 3)}
                    >
                      {/* NAV-PROFILE-MOB */}
                      <div
                        className={`mob-prof-wrapper ${
                          sArr[3] ? "s-profile-mob" : ""
                        }`}
                      >
                        <div className="nav-profile-mob">
                          <div className="nav-profile-name-mob">
                            {user.name ? `${user.name}` : "Profile"}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <>
                      {/* NAV-LOGIN-BUTTONS-MOB */}
                      <div className="nav-login-buttons-container">
                        <LoginButtons />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              // mobile navbar closed
              <></>
            )}
          </nav>
        </>
      )}
    </>
  );
};
