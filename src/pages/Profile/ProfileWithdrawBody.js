import { SyncLoader } from "react-spinners";
import { Input } from "../../components/Input";
import { getItem } from "../../utils/localStorage";

export const ProfileWithdrawBody = (props) => {
  let { functions } = props;
  let {
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
  } = functions;

  return (
    <div className="prof-with-wrapper">
      <div className="with-wallets-container">
        <div className="header-2">Withdraw</div>

        <p>Submit or update your withdrawal wallets </p>

        {/* WITH-WALLETS-BODY */}
        <div className="with-wallets-body-wrapper">
          <form id="wallets-form" onSubmit={handleSubmit(onSubmitWallets)}>
            <Input
              placeHolder="ERC-20"
              type="text"
              name="erc"
              errors={errors.erc}
              register={register}
              readOnly={!isWE ? true : false}
              defaultValue={ercWal}
              isWithCopy={!isWE}
              rules={{
                pattern: /^(0x){1}[0-9a-fA-F]{40}$/i,
              }}
            />

            <Input
              placeHolder="BEP-20"
              type="text"
              name="bep"
              errors={errors.bep}
              register={register}
              readOnly={!isWE ? true : false}
              defaultValue={bepWal}
              rules={{
                pattern: /^(0x){1}[0-9a-fA-F]{40}$/i,
              }}
              isWithCopy={!isWE}
            />

            <Input
              placeHolder="TRC-20"
              type="text"
              name="trc"
              errors={errors.trc}
              register={register}
              readOnly={!isWE ? true : false}
              defaultValue={trcWal}
              isWithCopy={!isWE}
              rules={{
                pattern: /T[A-Za-z1-9]{33}/i,
              }}
            />
          </form>

          <div className="with-wallets-footer">
            {isCodePage ? (
              <>
                {/* CODE INPUT PAGE  */}
                <div className="code-input-container">
                  <div className="small-grey-header">
                    Code from Email or Telegram
                  </div>
                  <div className="code-input-body-wrapper">
                    <div className="input-code">
                      <div
                        className="input-field"
                        onClick={() => {
                          document.getElementById("code-input").focus();
                        }}
                      >
                        <input type="number" id="code-input" />
                      </div>

                      {/* <div
                        className="medium-yellow-header"
                        onClick={() => {
                          toastC("todo");
                        }}
                      >
                        Resend code
                      </div> */}
                    </div>
                    <button
                      className="transparent-button yellow-trans-btn"
                      onClick={async (e) => {
                        e.preventDefault();
                        setIsLoading(true);
                        await handleEditComplete(
                          // @ts-ignore
                          document.getElementById("code-input").value,
                          getValues("erc"),
                          getValues("bep"),
                          getValues("trc")
                        );
                        setIsLoading(false);
                      }}
                    >
                      COMPLETE
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {isWE ? (
                  <>
                    {/* WALLETS INPUT PAGE */}
                    <button
                      className="transparent-button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsWE(false);

                        // @ts-ignore
                        document.getElementsByName("erc")[0].value =
                          getItem("ercWal");
                        // @ts-ignore
                        document.getElementsByName("bep")[0].value =
                          getItem("bepWal");
                        // @ts-ignore
                        document.getElementsByName("trc")[0].value =
                          getItem("trcWal");
                      }}
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      form="wallets-form"
                      className="transparent-button yellow-trans-btn"
                    >
                      {isLoading ? (
                        <div>
                          <SyncLoader
                            color="#feb85d"
                            size={10}
                            speedMultiplier={0.5}
                          />
                        </div>
                      ) : (
                        "SUBMIT"
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    {/* MAIN PROFILE PAGE */}
                    <div></div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsWE(true);
                      }}
                      className="transparent-button yellow-trans-btn"
                    >
                      EDIT WALLETS
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
