import { useContext } from "react";
import { LoginButtons } from "../../components/LoginButtons";
import { TxTableBodyMemo } from "../../components/TxTable";
import useWindowDimensions from "../../hooks/useWindow";
import { UserContext } from "../../utils/UserContext";

export const DashFooter = (props) => {
  const { width } = useWindowDimensions();
  const { user } = useContext(UserContext);
  let { txArray } = props;
  return (
    <>
      <div className="dash-footer">
        {user ? (
          <>
            <div className="dash-tx-container">
              <div
                className={`dash-tx-header header-2 ${
                  width < 815 ? "brd-top" : ""
                }`}
              >
                Transactions
              </div>
              <div className="dash-transactions-body">
                <TxTableBodyMemo txArray={txArray} />
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="header-2 login-elem-header">
              Sign Up to Buy and Stake GET
            </div>
            <LoginButtons />
          </div>
        )}
      </div>
    </>
  );
};
