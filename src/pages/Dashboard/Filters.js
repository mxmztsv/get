import {useEffect, useState} from "react";
import openIcon from '../../assets/img/dropdown-open.svg';
import closeIcon from '../../assets/img/dropdown-close.svg';
import {useForm} from "react-hook-form";

export const Filters = ({sourceTxArray, setFilteredTxArray}) => {

    const [isOpen, setIsOpen] = useState(false);

    const {register, watch, handleSubmit} = useForm({
        defaultValues: {
            'STAKE': true,
            'AUTO-SWAP': true,
            'BONUS': true,
            'REFERRAL BONUS': true,
        }
    });

    const filtersState = watch();

    const onSubmit = data => console.log(data);

    const openHandler = () => {
        setIsOpen((prevState => !prevState))
    }

    const filterTx = () => {
        let enabledFilters = [];
        for (let filter in filtersState) {
            if (filtersState[filter]) {
                enabledFilters.push(filter);
            }
        }
        let filteredTxArray = sourceTxArray.filter(tx => enabledFilters.includes(tx.type));
        // console.log(filteredTxArray);
        setFilteredTxArray(filteredTxArray);
    }


    useEffect(() => {
        // console.log(filtersState)
        filterTx();
    }, [filtersState]);


    return (
        <>
            <div className="dash-tx-filters">
                <div className="dash-tx-filters-header" onClick={openHandler}>
                    <p className="dash-tx-filters-title">
                        Filters
                    </p>
                    <img src={isOpen ? closeIcon : openIcon} alt="Open/Close dropdown"/>
                </div>
                {isOpen &&
                    <div className="dash-tx-filters-body">
                        <div className="dash-tx-filters-item">
                            <p className="dash-tx-filter-name">
                                Stake
                            </p>
                            <input type="checkbox" className="dash-tx-filter-checkbox"
                                   {...register("STAKE")}
                            />
                        </div>
                        <div className="dash-tx-filters-item">
                            <p className="dash-tx-filter-name">
                                Auto-Swap
                            </p>
                            <input type="checkbox" className="dash-tx-filter-checkbox"
                                   {...register("AUTO-SWAP")}
                            />
                        </div>
                        <div className="dash-tx-filters-item">
                            <p className="dash-tx-filter-name">
                                Bonus
                            </p>
                            <input type="checkbox" className="dash-tx-filter-checkbox"
                                   {...register("BONUS")}
                            />
                        </div>
                        <div className="dash-tx-filters-item">
                            <p className="dash-tx-filter-name">
                                Referral Bonus
                            </p>
                            <input type="checkbox" className="dash-tx-filter-checkbox"
                                   {...register("REFERRAL BONUS")}
                            />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
