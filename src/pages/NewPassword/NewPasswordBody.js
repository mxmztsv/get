import { useForm } from "react-hook-form";
import SyncLoader from "react-spinners/SyncLoader";
import { Input } from "../../components/Input";

export const NewPasswordBody = (props) => {
  let { onSubmit, isLoading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="sign-up-container">
      <div className="sign-up-body">
        <div className="sign-up-header header-1">New Password</div>
        <form id="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeHolder="Code from Email or Telegram"
            type="text"
            name="hash"
            errors={errors.hash}
            register={register}
            rules={{
              required: true,
            }}
          />

          <Input
            placeHolder="New Password"
            type="password"
            autoComplete="new-password"
            name="newpass"
            errors={errors.newpass}
            register={register}
            rules={{ required: true, minLength: 5 }}
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
                "COMPLETE"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
