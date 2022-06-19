import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container/index";
import { WithdrawButton } from "../../components/WithdrawButton";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchProfileE } from "../../utils/EffFetchers/fetchProfileE";
import { getItem, setItem } from "../../utils/localStorage";
import { PathContext, updateNavbar } from "../../utils/PathContext";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";
import { UserContext } from "../../utils/UserContext";
import {
  EditBody,
  EditProfileBtnMob,
  EditStateFooter,
  EditStateFooterMob,
  ProfHeader,
  ProfHeaderMob,
  TgBotBox,
} from "./Elements";
import { ProfileWithdrawBody } from "./ProfileWithdrawBody";

export const Profile = () => {
  // auth
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      let user = getItem("user");
      if (!user) {
        window.location.href = "/login";
      } else {
        setUser(user);
      }
    }
  }, [user, width]);
  // ---------------

  // vars
  const [isE, setIsE] = useState(false); // is editing profile
  const [isC, setIsC] = useState(getItem("isTgC") || false); // is telegram bot connected

  // with wallets vars
  const [isWE, setIsWE] = useState(false); // set is editing wallets
  const [isLoading, setIsLoading] = useState(false);
  const [isCodePage, setIsCodePage] = useState(false);

  const [ercWal, setErcWal] = useState(getItem("ercWal") || "");
  const [bepWal, setBepWal] = useState(getItem("bepWal") || "");
  const [trcWal, setTrcWal] = useState(getItem("trcWal") || "");
  // -----------------------------------

  // editing helpers
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    setIsE(false);
    // todo setItem("userName", newName)
  };
  // -------------

  // navbar update
  const { setNavPath } = useContext(PathContext);
  useEffect(() => {
    updateNavbar("profile", setNavPath);
  }, []);
  // -----------------------------------

  // profile fetch
  useEffect(() => {
    console.log("[Profile] fetching profile info");
    fetchProfileE(user, setUser, setIsC);
  }, []);
  // -----------------------------------

  function handleLogout() {
    setUser(null);
    localStorage.clear();
    navigate("/dashboard");
  }

  async function onSubmitWallets(data) {
    // on new wallets submit
    // if (!data.erc && !data.bep && !data.trc) {
    //   toast.error("Please provide wallet(-s)");
    //   return;
    // }
    setIsLoading(true);
    let payload = {
      eth_wallet: data.erc,
      trc_wallet: data.trc,
      bnb_wallet: data.bep,
    };
    let res = await sendReq("post", "profile/edit-payments-details", payload);

    if (res && res.data && res.data.result === "success" && res.data.data) {
      setIsCodePage(true);
    }

    setIsLoading(false);
  }

  async function handleEditComplete(code, eW, bW, tW) {
    // on code submit
    if (!code) {
      toastC("Invalid code", 1);
      return;
    }
    let res = await sendReq("post", "check-delay-query-code", { code: code });
    if (res && res.data && res.data.result === "success") {
      toastC("Updated wallets successfully", 0);

      setItem("ercWal", eW);
      setItem("bepWal", bW);
      setItem("trcWal", tW);

      setErcWal(eW);
      setBepWal(bW);
      setTrcWal(tW);

      setIsWE(false);
      setIsCodePage(false);
    } else {
      toastC("Invalid code", 1);
    }
  }

  return (
    <>
      {width > 815 ? (
        <Container>
          <div className="profile-page-container">
            <div>
              {/* <DepButton /> */}
              <div className="with-header-btn-container">
                <WithdrawButton />
              </div>
              <div className="profile-page-body">
                {!isE ? (
                  <>
                    {/* DEFAULT-PAGE  */}
                    <div className="profile-body-wrapper">
                      <ProfHeader />
                      <TgBotBox isC={isC} />

                      <ProfileWithdrawBody
                        functions={{
                          getValues,
                          onSubmitWallets,
                          handleSubmit,
                          handleEditComplete,
                          register,
                          errors,
                          ercWal,
                          bepWal,
                          trcWal,
                          isWE,
                          setIsWE,
                          isCodePage,
                          isLoading,
                          setIsLoading,
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="edit-container-wrapper">
                    {/* EDITING */}
                    <div className="edit-page-header header-1">
                      Edit Profile
                    </div>

                    <EditBody
                      handleSubmit={handleSubmit}
                      register={register}
                      errors={errors}
                      onSubmit={onSubmit}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="profile-page-footer">
              {!isE ? (
                <>
                  {/* MAIN-PROFILE-FOOTER */}
                  <div>
                    <button
                      className="transparent-button"
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        // setIsE(true);
                        toastC("Coming Soon");
                      }}
                    >
                      Edit profile
                    </button>
                  </div>
                  <div className="profile-page-buttons-container">
                    <button
                      onClick={() => handleLogout()}
                      className="transparent-button red-trans-button"
                    >
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <div className="edit-buttons-container">
                  {/* EDITING */}
                  <EditStateFooter setIsE={setIsE} />
                </div>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <>
          <div className="profile-container-mob">
            <div className="prof-body-container-mob">
              {!isE ? (
                <>
                  {/* MAIN-PROFILE-MOB */}
                  <ProfHeaderMob />
                  <div className="prof-action-buttons-container">
                    <TgBotBox isC={isC} />
                  </div>
                  <div className="with-prof-container brd-btm">
                    <ProfileWithdrawBody
                      functions={{
                        getValues,
                        onSubmitWallets,
                        handleSubmit,
                        handleEditComplete,
                        register,
                        errors,
                        ercWal,
                        bepWal,
                        trcWal,
                        isWE,
                        setIsWE,
                        isCodePage,
                        isLoading,
                        setIsLoading,
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="edit-container-wrapper">
                    {/* EDITING */}
                    <div className="edit-page-header header-1">
                      Edit Profile
                    </div>
                    <EditBody
                      handleSubmit={handleSubmit}
                      register={register}
                      errors={errors}
                      onSubmit={onSubmit}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="prof-footer-container">
              {!isE ? (
                <>
                  {/* MAIN-PROFILE-MOB-FOOTER */}
                  <div className="profile-page-buttons-container">
                    <EditProfileBtnMob setIsE={setIsE} />

                    <button
                      onClick={() => handleLogout()}
                      style={{ marginRight: "0" }}
                      className="transparent-button red-trans-button"
                    >
                      LOG OUT
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="profile-page-buttons-container">
                    {/* EDITING-PROF-FOOTER-MOB */}
                    <EditStateFooterMob setIsE={setIsE} />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
