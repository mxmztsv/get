import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { Input } from "../../components/Input";

export const SignUpBody = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  let { onSubmit, errorMes, refCode, isLoading } = props;

  if (refCode !== "") {
    setValue("refcode", refCode);
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
                onClick={() => navigate("/login")}
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
          {errorMes !== "" ? (
            <div className="error-message">{errorMes}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
