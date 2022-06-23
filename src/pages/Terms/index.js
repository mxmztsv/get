import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-icon.svg";
import useWindowDimensions from "../../hooks/useWindow";
import { sendReq } from "../../utils/sendReq";

export const Terms = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  async function fetchTerms(setT) {
    let res = await sendReq("get", "pages/view/1");
    if (res && res.data) {
      document.getElementById("terms").innerHTML = res.data.data.text;
      document.getElementById("terms-header").innerText = res.data.data.title;
    }
  }

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

  useEffect(() => {
    fetchTerms();
  }, []);

  return (
    <>
      <div className="terms-container">
        {width > 815 ? (
          <div className="logo" onClick={() => navigate("/dashboard")}>
            <img src={logo} alt="logo" /> GET
          </div>
        ) : (
          <></>
        )}

        <div className="header-1" id="terms-header">
          Loading...
        </div>
        <div className="terms-text" id="terms"></div>
      </div>
    </>
  );
};
