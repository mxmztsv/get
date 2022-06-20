import { createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { Input } from "../../components/Input";
import { sendReq } from "../../utils/sendReq";
import { toastC } from "../../utils/toastC";

export const ForgotPassBody = (props) => {
  let { setIsLoading, isLoading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const recaptchaRef = createRef();

  const onSubmit = async (data) => {
    const token = recaptchaRef.current.getValue();
    if (!token) {
      toastC("Please solve a captcha", 1);
      return;
    }
    data["g-recaptcha-response"] = token;

    setIsLoading(true);

    console.log("[ForgotPass] data:", data);

    let res = await sendReq("post", "profile/lostpass", data);

    if (res.data && res.data.result === "success") {
      toastC("We have sent you a code to reset your password", 0);
      navigate("/new-password", { state: { data } });
    } else if (res && res.response && res.response.data) {
      let mes = res.response.data.error_message;
      console.error("[ForgotPassword] error:", mes);
      if (typeof mes === "object") {
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
        <div className="sign-up-header header-1">Forgot Password?</div>
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

          <div className="form-buttons">
            <button
              type="button"
              className="trans-btn-mob blue-trans-button"
              onClick={() => (window.location.href = "/login")}
            >
              LOGIN
            </button>
            <button type="submit" form="sign-up-form">
              {isLoading ? (
                <div>
                  <SyncLoader color="black" size={10} speedMultiplier={0.5} />
                </div>
              ) : (
                "NEXT"
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
