import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container/index";
import { DepButton } from "../../components/DepButton";
import { WithdrawButton } from "../../components/WithdrawButton";
import useWindowDimensions from "../../hooks/useWindow";
import { fetchProfileE } from "../../utils/EffFetchers/fetchProfileE";
import { getItem } from "../../utils/localStorage";
import { PathContext, updateNavbar } from "../../utils/PathContext";
import { UserContext } from "../../utils/UserContext";
import { EditProfileBtnMob, ProfHeader, TgBotBox } from "./Elements";

export const Profile = () => {
  // auth
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      let user = getItem("user");
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    }
  }, [user, width]);
  // ---------------

  // vars
  const [isE, setIsE] = useState(false); // is editing profile
  const [isC, setIsC] = useState(getItem("isTgC") || false); // is telegram bot connected
  // -----------------------------------

  // navbar update
  const { setNavPath } = useContext(PathContext);
  useEffect(() => {
    updateNavbar("profile", setNavPath);
  }, []);
  // -----------------------------------

  // profile fetch
  useEffect(() => {
    fetchProfileE(user, setUser);
  }, []);
  // -----------------------------------

  // editing helpers
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsE(false);
    // todo setItem("userName", newName)
  };
  // -------------

  // fetching is bot connected
  // TODO
  // -------------

  function handleLogout() {
    console.log("logged out");
    setUser(null);
    localStorage.clear();
    navigate("/dashboard");
  }

  return (
    <>
      {width > 815 ? (
        <Container>
          <div className="profile-page-container">
            <div>
              <DepButton />
              <div className="profile-page-body">
                {!isE ? (
                  <>
                    {/* DEFAULT-PAGE  */}
                    <div className="profile-body-wrapper">
                      <ProfHeader />
                      <TgBotBox isC={isC} />

                      <WithdrawButton />
                    </div>
                  </>
                ) : (
                  <div className="edit-container-wrapper">
                    {/* EDITING */}
                    <div className="edit-page-header header-1">
                      Edit Profile
                    </div>
                    <div className="edit-page-body">
                      <form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-field">
                          First name
                          <input
                            {...register("firstName")}
                            defaultValue={user.first_name}
                          />
                        </div>
                        <div className="input-field">
                          Last name
                          <input
                            {...register("lastName")}
                            defaultValue={user.last_name}
                          />
                          {errors.last_name && <p>Last name is required.</p>}
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="profile-page-footer">
              {!isE ? (
                <>
                  <div>
                    <button
                      className="transparent-button blue-trans-button"
                      onClick={() => setIsE(true)}
                      disabled={true}
                    >
                      Edit Profile
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
                  <button
                    onClick={() => {
                      setIsE(false);
                    }}
                    className="transparent-button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // alert("todo");
                      // setIsE(false);
                    }}
                    className="transparent-button green-trans-button"
                    type="submit"
                    form="edit-form"
                  >
                    Save
                  </button>
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
                  <div className="profile-top-wrapper-mob brd-btm">
                    <div className="header-1">{user ? user.name : ""}</div>
                    <div className="small-grey-header">
                      {user ? user.email : ""}
                    </div>
                  </div>

                  <div className="prof-action-buttons-container">
                    <TgBotBox isC={isC} />
                  </div>
                  <div className="with-prof-container brd-btm">
                    <WithdrawButton />
                  </div>
                </>
              ) : (
                <>
                  <div className="edit-container-wrapper">
                    {/* EDITING */}
                    <div className="edit-page-header header-1">
                      Edit Profile
                    </div>
                    <div className="edit-page-body">
                      <form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-field">
                          First name
                          <input {...register("firstName")} />
                        </div>
                        <div className="input-field">
                          Last name
                          <input
                            {...register("lastName", { required: true })}
                          />
                          {errors.lastName && <p>Last name is required.</p>}
                        </div>
                        <div className="input-field">
                          Email
                          <input
                            {...register("age", {
                              pattern:
                                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            })}
                          />
                          {errors.age && (
                            <p className="error-p">Please enter valid Email</p>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="prof-footer-container">
              {!isE ? (
                <>
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
                    <button
                      onClick={() => setIsE(false)}
                      className="transparent-button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsE(false)}
                      style={{ marginRight: "0" }}
                      className="transparent-button green-trans-button"
                    >
                      Save
                    </button>
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
