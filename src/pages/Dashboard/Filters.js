import { useEffect, useState } from "react";
import closeIcon from "../../assets/img/dropdown-close.svg";
import openIcon from "../../assets/img/dropdown-open.svg";

export const Filters = ({ sourceTxArray, setFilteredTxArray }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [stake, setStake] = useState(true);
  const [autoSwap, setAutoSwap] = useState(true);
  const [bonus, setBonus] = useState(true);
  const [referralBonus, setReferralBonus] = useState(true);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  const stakeFilterHandler = () => {
    setStake(!stake);
  };

  const autoSwapFilterHandler = () => {
    setAutoSwap(!autoSwap);
  };

  const bonusFilterHandler = () => {
    setBonus(!bonus);
  };

  const referralBonusFilterHandler = () => {
    setReferralBonus(!referralBonus);
  };

  const filterTx = () => {
    const filtersState = {
      STAKE: stake,
      "AUTO-SWAP": autoSwap,
      BONUS: bonus,
      "REFERRAL BONUS": referralBonus,
    };
    let filteredTxArray = sourceTxArray.filter((tx) => filtersState[tx.type]);
    setFilteredTxArray(filteredTxArray);
  };

  useEffect(() => {
    filterTx();
  }, [stake, autoSwap, bonus, referralBonus]);

  return (
    <>
      <div className="dash-tx-filters" onClick={openHandler}>
        <div className="dash-tx-filters-header">
          <p className="dash-tx-filters-title">Filters</p>
          {isOpen ? (
            <img
              src={closeIcon}
              alt="Open/Close dropdown"
              className="dash-tx-filters-icon"
            />
          ) : (
            <>
              <img
                src={openIcon}
                alt="Open/Close dropdown"
                className="dash-tx-filters-icon"
              />
            </>
          )}
        </div>
        {isOpen && (
          <div className="dash-tx-filters-body">
            <div className="dash-tx-filters-item">
              <p className="dash-tx-filter-name">Stake</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={stake}
                onChange={stakeFilterHandler}
              />
            </div>
            <div className="dash-tx-filters-item">
              <p className="dash-tx-filter-name">Auto-Swap</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={autoSwap}
                onChange={autoSwapFilterHandler}
              />
            </div>
            <div className="dash-tx-filters-item">
              <p className="dash-tx-filter-name">Bonus</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={bonus}
                onChange={bonusFilterHandler}
              />
            </div>
            <div className="dash-tx-filters-item">
              <p className="dash-tx-filter-name">Referral Bonus</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={referralBonus}
                onChange={referralBonusFilterHandler}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
