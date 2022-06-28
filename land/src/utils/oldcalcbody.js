   {/* <div className="calc-body">
            <div className="left-body-container">
              <div className="invest-sum-container">
                <div className="calc-sub-header">YOUR INVESTEMENT</div>
                <div className="left-cal">
                  <div className="calc-sum">
                    {valueGet.toLocaleString("en-US")} GET{" "}
                    <span className="sum-span">
                      | {valueUsd.toLocaleString("en-US")} USD{" "}
                      {valueUsd === 50000 ? "+" : ""}
                    </span>
                  </div>
                  <div className="calc-slider">
                    <Slider
                      className="range-slider"
                      min={25}
                      max={50_000}
                      step={25}
                      value={valueUsd}
                      onChange={handleChange}
                      tooltip={false}
                    />
                  </div>
                </div>
              </div>
              <div className="dep-option-container">
                <div className="calc-sub-header">DEPOSIT OPTION</div>
                <div className="options-container">
                  <div
                    className={`dep-option ${
                      selectedDep === 0 ? "selected-dep" : ""
                    }`}
                    onClick={() => {
                      handleDepClick(0);
                    }}
                  >
                    Locked
                  </div>
                  <div
                    className={`dep-option ${
                      selectedDep === 1 ? "selected-dep" : ""
                    }`}
                    onClick={() => {
                      handleDepClick(1);
                    }}
                  >
                    Non-locked
                  </div>
                </div>
              </div>
            </div>

            <div className="right-body-container">
              <div className="stake-for-container">
                <div className="calc-sub-header">STAKE FOR</div>
                <div className="time-body">
                  <div className="time-buttons">
                    <div
                      className={`time-button ${
                        selectedTime === 0 || valueMonth === 2
                          ? "selected-time"
                          : ""
                      }`}
                      onClick={() => {
                        handleTimeChange(0);
                        handleChangeTime(2);
                      }}
                    >
                      2 Month
                    </div>
                    <div
                      className={`time-button ${
                        selectedTime === 1 || valueMonth === 6
                          ? "selected-time"
                          : ""
                      }`}
                      onClick={() => {
                        handleTimeChange(1);
                        handleChangeTime(6);
                      }}
                    >
                      6 Month
                    </div>
                    <div
                      className={`time-button ${
                        selectedTime === 2 || valueMonth === 12
                          ? "selected-time"
                          : ""
                      }`}
                      onClick={() => {
                        handleTimeChange(2);
                        handleChangeTime(12);
                      }}
                    >
                      1 Year
                    </div>
                  </div>

                  <div className="time-slider">
                    <Slider
                      className="range-slider-time"
                      min={1}
                      max={12}
                      step={1}
                      value={valueMonth}
                      onChange={handleChangeTime}
                      tooltip={false}
                    />
                  </div>
                </div>
              </div>
              <div className="daily-container">
                <div className="calc-sub-header" style={{ marginLeft: "0" }}>
                  MONTLY EARNING
                </div>
                <div className="daily-val">
                  {dailyGet} GET{" "}
                  <span className="span-val">| {dailyUsd} USD </span>
                </div>
              </div>
              <div className="roi-container">
                <div className="calc-sub-header" style={{ marginLeft: "0" }}>
                  MONTHLY ROI
                </div>
                <div className="roi-val">{roiVal}%</div>
              </div>
            </div>
          </div>