import { createRef, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { Input } from "../../components/Input";
import { setItem } from "../../utils/localStorage";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";
import { UserContext } from "../../utils/UserContext";

export const LoginBody = (props) => {
  const { setUser } = useContext(UserContext);
  let { isLoading, setIsLoading } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  const recaptchaRef = createRef();

  // main submit
  const onSubmit = async (data) => {
    const token = recaptchaRef.current.getValue();
    if (!token) {
      toastC("Please solve a captcha", 1);
      return;
    }
    data["g-recaptcha-response"] = token;

    setIsLoading(true);

    console.log("[Login] data:", data);

    let res = await sendReq("post", "profile/login", data);

    if (res.data && res.data.result === "success") {
      let user = { name: undefined, email: data.email };

      setUser(user);
      setItem("user", user);
      setItem("token", res.data.data.token);

      navigate("/dashboard");
    } else if (res && res.response && res.response.data) {
      let mes = res.response.data.error_message;
      let eCode = res.response.data.error_code;
      console.error("[Login] error mes code:", mes, eCode);

      if (eCode === 101) {
        toastC("Invalid Email or Password", 1);
      } else if (typeof mes === "object") {
        toastC(mes[Object.keys(mes)[0]], 1);
      } else {
        toastC(res.response.data.error_message, 1);
      }
    } else {
      toastC("Internal Error. Try again", 1);
    }

    setIsLoading(false);
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-body">
        <div className="sign-up-header header-1">Login</div>
        <form id="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeHolder="Email"
            type="email"
            name="email"
            errors={errors.email}
            register={register}
            rules={{
              required: true,
              pattern:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            }}
          />

          <Input
            placeHolder="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            errors={errors.password}
            register={register}
            rules={{ required: true }}
          />

          <div
            className="forgot-pass-container yellow-text"
            onClick={() => (window.location.href = "/forgot-password")}
          >
            Forgot password?
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="trans-btn-mob blue-trans-button"
              onClick={() => (window.location.href = "/signup")}
            >
              SIGN UP
            </button>

            <button type="submit" form="sign-up-form">
              {isLoading ? (
                <div>
                  <SyncLoader color="black" size={10} speedMultiplier={0.5} />
                </div>
              ) : (
                "LOGIN"
              )}
            </button>
          </div>
        </form>
        <div className="captcha-container">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LfFfIIgAAAAAB8SP3t9Z7gwX9YJIUGfYARQFm3W"
            hl="en"
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
};
