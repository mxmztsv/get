import { useEffect, useState } from "react";
import closeIcon from "../../assets/img/dropdown-close.svg";
import openIcon from "../../assets/img/dropdown-open.svg";

export const Filters = ({ sourceTxArray, setFilteredTxArray }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [stake, setStake] = useState(true);
  const [autoSwap, setAutoSwap] = useState(true);
  const [bonus, setBonus] = useState(true);
  const [referralBonus, setReferralBonus] = useState(true);
  const [stakingProfit, setStakingProfit] = useState(true);
  const [withdraw, setWithdraw] = useState(true);

  // if (tx.type === 21) type = "STAKE";
  // else if (tx.type === 11) type = "AUTO-SWAP";
  // else if (tx.type === 9) type = "BONUS";
  // else if (tx.type === 6) type = "REFERRAL BONUS";
  // else if (tx.type === 20) type = "STAKING PROFIT";
  // else if (tx.type === 8) type = "WITHDRAW";

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

  const stakingProfitFilterHandler = () => {
    setStakingProfit(!stakingProfit);
  };

  const withdrawFilterHandler = () => {
    setWithdraw(!withdraw);
  };

  const filterTx = () => {
    // todo: should be filtered on backend?
    const filtersState = {
      STAKE: stake,
      "AUTO-SWAP": autoSwap,
      BONUS: bonus,
      "REFERRAL BONUS": referralBonus,
      "STAKING PROFIT": stakingProfit,
      WITHDRAW: withdraw
    };
    let filteredTxArray = sourceTxArray.filter((tx) => filtersState[tx.type]);
    setFilteredTxArray(filteredTxArray);
  };

  useEffect(() => {
    filterTx();
  }, [stake, autoSwap, bonus, referralBonus, stakingProfit, withdraw, sourceTxArray]);

  return (
    <>
      <div className="dash-tx-filters" id="transactions-filter">
        <div className="dash-tx-filters-header" onClick={openHandler}>
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
            <div className="dash-tx-filters-item" onClick={stakeFilterHandler}>
              <p className="dash-tx-filter-name">Stake</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={stake}
                onChange={stakeFilterHandler}
              />
            </div>
            <div className="dash-tx-filters-item" onClick={autoSwapFilterHandler}>
              <p className="dash-tx-filter-name">Auto-Swap</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={autoSwap}
                onChange={autoSwapFilterHandler}
              />
            </div>
            <div className="dash-tx-filters-item" onClick={bonusFilterHandler}>
              <p className="dash-tx-filter-name">Bonus</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={bonus}
                onChange={bonusFilterHandler}
              />
            </div>
            <div className="dash-tx-filters-item" onClick={referralBonusFilterHandler}>
              <p className="dash-tx-filter-name">Referral Bonus</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={referralBonus}
                onChange={referralBonusFilterHandler}
              />
            </div>
            <div className="dash-tx-filters-item" onClick={stakingProfitFilterHandler}>
              <p className="dash-tx-filter-name">Staking Profit</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={stakingProfit}
                onChange={stakingProfitFilterHandler}
              />
            </div>
            <div className="dash-tx-filters-item" onClick={withdrawFilterHandler}>
              <p className="dash-tx-filter-name">Withdraw</p>
              <input
                type="checkbox"
                className="dash-tx-filter-checkbox"
                checked={withdraw}
                onChange={withdrawFilterHandler}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
