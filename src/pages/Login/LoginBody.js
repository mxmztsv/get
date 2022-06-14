import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { Input } from "../../components/Input";

export const LoginBody = (props) => {
  let { onSubmit, errorMes, isLoading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

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
            style={{ cursor: "not-allowed" }}
          >
            Forgot password?
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="trans-btn-mob blue-trans-button"
              onClick={() => navigate("/signup")}
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
        {errorMes !== "" ? (
          <div className="error-message">{errorMes}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
