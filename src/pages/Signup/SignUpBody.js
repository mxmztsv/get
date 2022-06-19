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

export const SignUpBody = (props) => {
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  let { refCode, isLoading, setIsLoading } = props;
  if (refCode !== "") {
    setValue("refcode", refCode);
  }

  const navigate = useNavigate();
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

    console.log("[Signup] data:", data);

    let res = await sendReq("post", "profile/signup", data);

    if (res.data && res.data.result === "success") {
      let user = {
        first_name: data.first_name,
        last_name: data.last_name,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        balance: 0,
      };

      setUser(user);
      setItem("user", user);
      setItem("userName", `${data.first_name} ${data.last_name}`);
      setItem("token", res.data.data.token);

      navigate("/dashboard");
    } else {
      let mes = res.response.data.error_message;
      let eCode = res.response.data.error_code;
      console.error("[Signup] error mes code:", mes, eCode);

      if (eCode === 18) {
        toastC("Invalid Email", 1);
      } else if (eCode === 422) {
        toastC("Email already registered", 1);
      } else if (typeof mes === "object") {
        toastC(mes[Object.keys(mes)[0]], 1);
      } else {
        toastC(res.response.data.error_message, 1);
      }
    }

    setIsLoading(false);
  };
  // ------------------------------

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <>
      <div className="sign-up-container" key="form">
        <div className="sign-up-body">
          <div className="sign-up-header header-1">Sign up</div>
          <form id="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeHolder="First Name"
              name="first_name"
              autoComplete="given-name"
              errors={errors.first_name}
              register={register}
              rules={{ required: true }}
            />

            <Input
              placeHolder="Last Name"
              name="last_name"
              autoComplete="family-name"
              errors={errors.last_name}
              register={register}
              rules={{ required: true }}
            />

            <Input
              placeHolder="Email"
              name="email"
              type="email"
              autoComplete="email"
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
              autoComplete="new-password"
              name="password"
              errors={errors.password}
              register={register}
              rules={{ required: true, minLength: 5 }}
            />

            <Input
              placeHolder="Referral Code"
              name="refcode"
              errors={errors.refcode}
              register={register}
              rules={{ required: true }}
            />

            <div className="form-buttons">
              <button
                type="button"
                className="transparent-button blue-trans-button log-btn"
                onClick={() => (window.location.href = "/login")}
              >
                LOGIN
              </button>

              <button
                type="submit"
                form="sign-up-form"
                style={{ justifySelf: "flex-end" }}
              >
                {isLoading ? (
                  <div>
                    <SyncLoader color="black" size={10} speedMultiplier={0.5} />
                  </div>
                ) : (
                  "SIGN UP"
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
    </>
  );
};
