import { useEffect, useRef, useState } from "react";
import "./App.css";
import arrow from "./assets/img/arrow.svg";
import logo from "./assets/img/logo-icon.svg";
import { ProfitCalculatorPopUp } from "./components/Calculator";
import { scrollHandler4 } from "./utils/animationsFunctions";
import useWindowDimensions from "./utils/useWindow";

const LINK = "https://app.getstake.io/dashboard";
const SIGNUP_LINK = "https://app.getstake.io/signup";

function App() {
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  const [gotCard1, setGotCard1] = useState(false);
  const [card1Bot, setCard1Bot] = useState(-1);

  const [gotRefCard1, setGotRefCard1] = useState(false);
  const [refCard1Bot, setRefCard1Bot] = useState(-1);
  const { width } = useWindowDimensions();

  const [opened1, setOpened1] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [opened4, setOpened4] = useState(false);

  const calcRef = useRef(null);
  const scrollToCal = () =>
    calcRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  const howRef = useRef(null);
  const scrollToHow = () =>
    howRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  function handleOpenQ(index) {
    if (index === 0) setOpened1(!opened1);
    if (index === 1) setOpened2(!opened2);
    if (index === 2) setOpened3(!opened3);
    if (index === 3) setOpened4(!opened4);
  }

  // data for animations
  function getCard1() {
    let card1 = document.getElementById("card1");
    if (card1 && !gotCard1) {
      var distanceToTop =
        window.pageYOffset + card1.getBoundingClientRect().top;
      var elementHeight = card1.offsetHeight;

      let card1bot = elementHeight * 2.2 + distanceToTop;
      // console.log("1 from fn: el+dt:", card1bot);
      setCard1Bot(card1bot);
      setGotCard1(true);
    }
  }

  function getRefCard1() {
    if (width < 815) return;
    let refCard1 = document.getElementById("ref-card1");
    if ((refCard1 && !gotRefCard1) || refCard1Bot === -1) {
      var distanceToTop =
        window.pageYOffset + refCard1.getBoundingClientRect().top;

      let refCard1bot = distanceToTop;
      console.log("1 from fn: el+dt:", refCard1bot);
      setRefCard1Bot(refCard1bot);
      setGotRefCard1(true);
    }
  }

  useEffect(() => {
    if (!gotCard1) {
      getCard1();
    }
    if (!gotRefCard1) {
      getRefCard1();
    }
  });
  // -------

  // scroll animations
  function scrollHandler() {
    scrollHandler4(card1Bot, refCard1Bot, width);
  }

  window.addEventListener("scroll", scrollHandler);
  // -------

  return (
    <div className="App">
      <div className="page-wrapper">
        <header id="nav" className="sticky-nav">
          <div>
            <div className="logo">
              <img src={logo} alt="logo" /> GET
            </div>
          </div>
          <div className="div-block">
            <a
              href="/"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToCal();
              }}
            >
              Calculator
            </a>
            <a
              href="/"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToHow();
              }}
            >
              How does it work?
            </a>
            <a href={LINK} className="default-button w-button">
              Launch app
            </a>
          </div>
        </header>
        <div className="div-block-12"></div>
        {/* FIRST */}
        <div className="hero wf-section">
          <div className="hero-wrapper">
            <div className="hero-content">
              <div className="hero-title">
                <h1 className="h1 center">
                  Crypto investments.
                  <br />
                  Hassle-free.
                </h1>
              </div>
              <div className="hero-subtitle">
                <p className="p1 centered">
                  GET breaks down barriers to entry in the financial world by
                  providing investment opportunities to everyone, no middlemen,
                  no hidden charges
                </p>
              </div>
              <div className="hero-cta">
                <div
                  className="main-button"
                  onClick={() => (window.location = LINK)}
                >
                  <div className="button-background"></div>
                  <div className="button-wrapper">
                    <a href={LINK} className="button-in-main w-button">
                      Start now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div id="slide1-bg" className="hero-background-wrapper slide1-bg">
              <div className="hero-background hero-clip">
                <img
                  className="slide1-img"
                  src={require(`./assets/img/${
                    width < 815 ? "mobile-bg.webp" : "bg.png"
                  }`)}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* SECOND */}
        <div className="one-click-teaser vertical-200 wf-section">
          <div className="w-container">
            <div className="columns w-row">
              <div className="column-2 w-col w-col-6">
                <div className="teaser-content">
                  <div className="teaser-title">
                    <h1 className="h2">
                      Everything investment.
                      <br />
                      One click away. 
                    </h1>
                  </div>
                  <div className="teaser-subtitle">
                    <p className="p2">
                      GET provides a plethora of investment opportunities,
                      giving you full control over how you decide to grow your
                      wealth
                    </p>
                  </div>
                </div>
              </div>
              <div className="column w-col w-col-6">
                <div className="teaser-visual-content">
                  <div className="roi" id="roi">
                    <div className="block-title">ROI</div>
                    <div className="roi-content">
                      <div className="w-layout-grid grid">
                        <div className="roi-selector selected">
                          <div>1D</div>
                        </div>
                        <div className="roi-selector">
                          <div>7D</div>
                        </div>
                        <div className="roi-selector">
                          <div>30D</div>
                        </div>
                        <div className="roi-selector">
                          <div>ALL</div>
                        </div>
                      </div>
                      <div className="roi-value">
                        <div className="roi-title green bold">84%</div>
                        {/* <div
                          className="separator"
                          style={{ backgroundColor: "#648560" }}
                        ></div> */}
                        <div
                          className="roi-title dim"
                          style={{ color: "#648560" }}
                        >
                          $245
                        </div>
                      </div>
                      <div
                        className="roi-subtitle"
                        style={{ color: "#FEB85D" }}
                      >
                        456 GET
                      </div>
                    </div>
                  </div>
                  <div className="bonus" id="bonus">
                    <div className="block-title">Bonus</div>
                    <div className="bonus-content">
                      <div className="div-block-2">
                        <div className="subtitled-block">
                          <div className="text-block">Current</div>
                          <div className="roi-value">
                            <div className="roi-title bold">10%</div>
                            {/* <div className="separator"></div> */}
                            <div
                              className="roi-title dim"
                              style={{ color: "rgba(0, 0, 0, 0.4)" }}
                            >
                              2.4 GET
                            </div>
                          </div>
                        </div>
                        <div className="subtitled-block">
                          <div className="text-block">With 26 GET more</div>
                          <div className="roi-value">
                            <div
                              className="roi-title bold"
                              style={{ color: "rgba(0, 0, 0, 0.4)" }}
                            >
                              12%
                            </div>
                            {/* <div
                              className="separator"
                              style={{ color: "rgba(0, 0, 0, 0.4)" }}
                            ></div> */}
                            <div
                              className="roi-title dim"
                              style={{ color: "rgba(0, 0, 0, 0.4)" }}
                            >
                              2.64 GET
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="roi-subtitle">Payed after 6 month</div>
                    </div>
                  </div>
                  <div className="notification-label" id="slide2-first">
                    <div className="text-block-2">Successfully staked</div>
                    <div className="text-block-3">24 GET</div>
                  </div>
                  <div className="checkmark-block" id="slide2-second">
                    <img
                      src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/626fff0709a45977849a36aa_Subtract.svg"
                      loading="lazy"
                      alt=""
                      className="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* YOU HEARD THAT RIGHT */}
        {width > 815 ? (
          <>
            {/* ANIMATION 1 */}
            <div className="feature-wheel wf-section">
              <div className="track">
                <div className="camera">
                  <div className="frame">
                    <div className="feature-wheel-wrapper">
                      <div className="feature-wheel-holder">
                        <div className="wheel-content roi">
                          <div className="columns-3 w-row">
                            <div className="column-3 w-col w-col-6">
                              <div className="div-block-6"></div>
                            </div>
                            <div className="column-4 w-col w-col-6">
                              <div id="card1" className="card firsr">
                                <div className="div-block-8">
                                  <img
                                    src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/627017e25e890f7d3a0ef7f1_Subtract.svg"
                                    loading="lazy"
                                    alt=""
                                    className="image-2"
                                  />
                                  <div className="div-block-9">
                                    <div className="h4 yellow">
                                      Up to 440% APY
                                    </div>
                                    <p className="p3">
                                      Guarantee yourself financial freedom by
                                      maximising your investment potential with
                                      GET.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="wheel-content bonuses">
                          <div className="columns-3 w-row">
                            <div className="column-3 w-col w-col-6">
                              <div className="div-block-6"></div>
                            </div>
                            <div className="column-4 w-col w-col-6">
                              <div id="card2" className="card second">
                                <div className="div-block-8">
                                  <img
                                    src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/62701950059a6c8079eaeca5_Subtract.svg"
                                    loading="lazy"
                                    alt=""
                                    className="image-2"
                                  />
                                  <div className="div-block-9">
                                    <div className="h4">Daily bonuses</div>
                                    <p className="p3 green gree">
                                      Get rewarded for interacting with the
                                      platform
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="wheel-content withdraw">
                          <div className="columns-3 w-row">
                            <div className="column-3 w-col w-col-6">
                              <div className="div-block-6"></div>
                            </div>
                            <div className="column-4 w-col w-col-6">
                              <div id="card3" className="card">
                                <div className="div-block-8">
                                  <img
                                    src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/627019eebeea7311a64565a8_Subtract.svg"
                                    loading="lazy"
                                    alt=""
                                    className="image-2"
                                  />
                                  <div className="div-block-9">
                                    <div className="h4 blue">Refer2earn</div>
                                    <p className="p3 blue">
                                      Help your friends help you, while you all
                                      grow your investments
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="wheel-title">
                        <h1 className="h2">You heard that right</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* MOBILE */}
            <div className="steps vertical-200 features wf-section">
              <div className="div-block-17">
                <h1 className="h2">You heard it right</h1>
              </div>
              <div className="steps-wrapper">
                <div className="w-layout-grid grid-2">
                  <div className="card firsr">
                    <div className="div-block-8">
                      <img
                        src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/627017e25e890f7d3a0ef7f1_Subtract.svg"
                        loading="lazy"
                        alt=""
                        className="image-2"
                      />
                      <div className="div-block-9">
                        <div className="h4 yellow">Up to 440% APY</div>
                        <p className="p3">
                          Guarantee yourself financial freedom by maximising
                          your investment potential with GET.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card second">
                    <div className="div-block-8">
                      <img
                        src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/62701950059a6c8079eaeca5_Subtract.svg"
                        loading="lazy"
                        alt=""
                        className="image-2"
                      />
                      <div className="div-block-9">
                        <div className="h4">Daily bonuses</div>
                        <p className="p3 green gree">
                          Get rewarded for interacting with the platform
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="div-block-8">
                      <img
                        src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/627019eebeea7311a64565a8_Subtract.svg"
                        loading="lazy"
                        alt=""
                        className="image-2"
                      />
                      <div className="div-block-9">
                        <div className="h4 blue">Refer2earn</div>
                        <p className="p3 blue">
                          Help your friends help you, while you all grow your
                          investments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* THREE-SIMPLE-STEPS */}
        <div
          style={{ paddingTop: "15vh" }}
          className="steps vertical-200 wf-section"
        >
          <div className="div-block-17">
            <h1 className="h2">Three simple steps to get you started</h1>
          </div>
          <div className="steps-wrapper">
            <div className="w-layout-grid grid-2">
              <div id="bub1" className="steps-card">
                <div
                  id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb8d-064a3f80"
                  className="steps-card-top"
                >
                  <h1
                    id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb8e-064a3f80"
                    className="heading"
                  >
                    Sign up
                  </h1>
                </div>
                <div
                  id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb90-064a3f80"
                  className="steps-card-bottom"
                >
                  <div className="text-block-5">
                    No Crypto Knowledge required
                  </div>
                </div>
              </div>
              <div id="bub2" className="steps-card">
                <div
                  id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb94-064a3f80"
                  className="steps-card-top"
                >
                  <h1
                    id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb95-064a3f80"
                    className="heading"
                  >
                    Deposit
                  </h1>
                </div>
                <div
                  id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb97-064a3f80"
                  className="steps-card-bottom"
                >
                  <div className="text-block-5">Cash or crypto</div>
                </div>
              </div>
              <div id="bub3" className="steps-card">
                <div
                  id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb9b-064a3f80"
                  className="steps-card-top"
                >
                  <h1
                    id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb9c-064a3f80"
                    className="heading"
                  >
                    Stake
                  </h1>
                </div>
                <div
                  id="w-node-_21f3e367-06d4-82e7-d049-a88950cdfb9e-064a3f80"
                  className="steps-card-bottom"
                >
                  <div className="text-block-5">
                    Start investing and get returns within one months
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="referral-title">
            <h1 className="h2">
              Referral program.
              <br />
              Because gatekeeping isn&#x27;t cool.
            </h1>
          </div>
        </div>

        {/* GREEN CARDS. REFERRAL PROGRAM. ANIMATION 2 */}
        <div className="referral vertical-200 wf-section">
          <div className="track referral">
            <div className="camera">
              <div className="frame">
                <div className="feature-wheel-wrapper referr">
                  {width < 815 ? (
                    <div className="ref-cards-wrapper">
                      <div id="ref-card-1-2" className="ref-card">
                        <div className="ref-card-header h4 small">
                          Try it yourself
                        </div>
                        <p className="ref-card-body">
                          Get a taste of the GET platform, learn the ins and
                          outs and start investing
                        </p>
                      </div>
                      <div id="ref-card-2-2" className="ref-card">
                        <div className="ref-card-header h4 small">
                          Tell your friends
                        </div>
                        <p className="ref-card-body">
                          Invite your friends, get them investing and watch the
                          returns
                        </p>
                      </div>
                      <div id="ref-card-3-2" className="ref-card">
                        <div className="ref-card-header h4 small">
                          Their win - your win
                        </div>
                        <p className="ref-card-body">
                          Get a reward every time your referrals make profit
                        </p>
                      </div>
                      <div id="ref-card-4-2" className="ref-card">
                        <div className="ref-card-header h4 small">
                          Get rewarded from your friends&#x27; referrals
                        </div>
                        <p className="ref-card-body">
                          You are going to earn from everyone they are going to
                          refer as well
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="referral-cards-wrapper">
                      <div
                        className="referral-card-wrapper first"
                        id="ref-card1"
                      >
                        <div className="card card-background green blurred first">
                          <div className="div-block-8">
                            <div className="div-block-9">
                              <div className="h4 small">Try it yourself</div>
                              <p className="p3 green">
                                Get a taste of the GET platform, learn the ins
                                and outs and start investing
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="referral-card-wrapper second"
                        id="ref-card2"
                      >
                        <div className="card card-background green blurred second">
                          <div className="div-block-8">
                            <div className="div-block-9">
                              <div className="h4 small">Tell your friends</div>
                              <p className="p3 green">
                                Invite your friends, get them investing and
                                watch the returns
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="referral-card-wrapper third"
                        id="ref-card3"
                      >
                        <div className="card card-background green blurred third">
                          <div className="div-block-8">
                            <div className="div-block-9">
                              <div className="h4 small">
                                Their win - your win
                              </div>
                              <p className="p3 green">
                                Get a reward every time your referrals make
                                profit. 
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="referral-card-wrapper forth"
                        id="ref-card4"
                      >
                        <div className="card card-background green blurred forth">
                          <div className="div-block-8">
                            <div className="div-block-9">
                              <div className="h4 small">
                                Get rewarded from your friends&#x27; referrals
                              </div>
                              <p className="p3 green">
                                You are going to earn from everyone they are
                                going to refer as well
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CALCULATOR */}
        <div ref={calcRef} className="calculator-wrapper">
          <div className="calc-header">
            <div className="calc-left-header h1">Let's count your profits</div>
          </div>
          <ProfitCalculatorPopUp setIsPopUpOpen={true} />
          <div className="calc-footer">
            <div className="div-block-11">
              <div
                className="main-button"
                onClick={() => (window.location = LINK)}
              >
                <div className="button-background"></div>
                <div className="button-wrapper">
                  <a href={LINK} className="button-in-main w-button">
                    Start staking
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW DOES IT WORK */}
        <div ref={howRef} className="how-container">
          <div className="how-header h2">How does it work?</div>
          <div className="points-container">
            <div className="point">
              <div id="point1" className="point-card">
                <div className="point-card-header">Sign up</div>
                <div className="point-card-body"></div>
              </div>
              {width > 815 ? (
                <div className="point-arrow">
                  <object data={arrow} aria-label="arrow" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="point">
              <div id="point2" className="point-card">
                <div className="point-card-header">
                  Purchase GET Token with fiat / crypto
                </div>
                <div className="point-card-body"></div>
              </div>
              {width > 815 ? (
                <div className="point-arrow">
                  <img src={require("./assets/img/arrow.svg").default} alt="" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="point">
              <div id="point3" className="point-card">
                <div className="point-card-header">Stake your GET tokens</div>
                <div className="point-card-body">
                  For 2 Month+ <br />
                  Non-locked deposit
                </div>
              </div>
              {width > 815 ? (
                <div className="point-arrow">
                  <img src={require("./assets/img/arrow.svg").default} alt="" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="point">
              <div id="point4" className="point-card">
                <div className="point-card-header">Get your rewards</div>
                <div className="point-card-body">
                  Locked deposit <br />{" "}
                  <p style={{ marginBottom: "0", fontSize: "17px" }}>14-16%</p>{" "}
                  <br />
                  Non-locked deposit <br />
                  <p style={{ marginBottom: "0", fontSize: "17px" }}>
                    28 - 37%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROADMAP */}
        <div className="roadmap vertical-200 timeline wf-section">
          <div className="div-block-16">
            <h1 className="h2">Our roadmap</h1>
          </div>
          <div className="section-timeline-2">
            <div className="container-2">
              <div className="timeline_component">
                <div id="timel" className="timeline_progress">
                  <div className="timeline_progress-bar-2"></div>
                </div>
                <div className="timeline_item">
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c758025366-064a3f80"
                    className="timeline_left"
                  >
                    <div className="timeline_date-text">Q2 2022</div>
                  </div>
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c758025369-064a3f80"
                    className="timeline_centre"
                  >
                    <div className="timeline_circle"></div>
                  </div>
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c75802536b-064a3f80"
                    className="timeline_right"
                  >
                    <div className="margin-bottom-xlarge">
                      <img
                        src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/6271579f04c443f15a4b2a90_launch.svg"
                        loading="lazy"
                        alt=""
                        className="image-4"
                      />
                      <div className="timeline-card">
                        <div className="timeline_text title">
                          Launch
                          <br />
                        </div>
                        <div className="timeline_text">
                          Introduction of GET index <br /> <br />
                          Staking, allowing token holders to invest into more
                          specialised indexes
                        </div>
                      </div>
                      <div className="timeline-card bottom">
                        <div className="timeline_text title">
                          2 months after launch
                          <br />
                        </div>
                        <div className="timeline_text">
                          Addition of more focused indexes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="timeline_item">
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c758025372-064a3f80"
                    className="timeline_left"
                  >
                    <div className="timeline_date-text">Q3 2022</div>
                  </div>
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c758025375-064a3f80"
                    className="timeline_centre"
                  >
                    <div className="timeline_circle"></div>
                  </div>
                  <div className="timeline_right">
                    <div className="margin-bottom-medium">
                      <img
                        src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/627157a7a67f991fee8915fd_strength.svg"
                        loading="lazy"
                        alt=""
                        className="image-4"
                      />
                      <div className="timeline_text title">
                        Integration of additional tokens
                        <br />
                      </div>
                      <div className="timeline_text">
                        Integrating the biggest blockchains to allow holders to
                        move freely between networks at block speed
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="timeline_item">
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c758025385-064a3f80"
                    className="timeline_left"
                  >
                    <div className="timeline_date-text">Q4 2022</div>
                  </div>
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c758025388-064a3f80"
                    className="timeline_centre"
                  >
                    <div className="timeline_circle"></div>
                  </div>
                  <div className="timeline_right">
                    <div className="margin-bottom-medium">
                      <img
                        src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/6271584cb86b5375fad52831_community.svg"
                        loading="lazy"
                        alt=""
                        className="image-4"
                      />
                      <div className="timeline_text title">
                        NFT Voucher protocol introduction
                        <br />
                      </div>
                      {/* <div className="timeline_text"></div> */}
                    </div>
                  </div>
                </div>
                <div className="timeline_item">
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c75802539f-064a3f80"
                    className="timeline_left"
                  >
                    <div className="timeline_date-text">Q1 2023</div>
                  </div>
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c7580253a2-064a3f80"
                    className="timeline_centre"
                  >
                    <div className="timeline_circle"></div>
                  </div>
                  <div className="timeline_right">
                    <div className="margin-bottom-medium">
                      <img
                        src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/62715953cba1e84801e871ee_chain.svg"
                        loading="lazy"
                        alt=""
                        className="image-4"
                      />
                      <div className="timeline_text title">
                        Expanding token utility
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="timeline_item">
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c7580253bb-064a3f80"
                    className="timeline_left"
                  >
                    <div className="timeline_date-text">Q2 2023</div>
                  </div>
                  <div
                    id="w-node-df18a140-06da-88ef-5c03-b2c7580253be-064a3f80"
                    className="timeline_centre"
                  >
                    <div className="timeline_circle"></div>
                  </div>
                  <div className="timeline_right">
                    <div className="margin-bottom-medium">
                      <img
                        src="https://uploads-ssl.webflow.com/626fe8200bf49790764a3f7f/627159d0eb48684b395babb7_if.svg"
                        loading="lazy"
                        alt=""
                        className="image-4"
                      />
                      <div className="timeline_text title">
                        DAO Implementation
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNUP AFTER ROADMAP */}
        <div className="roadmap vertical-200 start-earning wf-section">
          <div className="div-block-10">
            <div className="referral-title start">
              <h1 className="h2">Start earning. Now</h1>
              <div className="div-block-11">
                <div
                  className="main-button"
                  onClick={() => (window.location = SIGNUP_LINK)}
                >
                  <div className="button-background"></div>
                  <div className="button-wrapper">
                    <a href={SIGNUP_LINK} className="button-in-main w-button">
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-container">
          <div className="faq-header h2">FAQ</div>
          <div className="questions-container">
            <div className="question">
              <div
                className="question-header"
                onClick={() => {
                  handleOpenQ(0);
                }}
              >
                <div className="question-header-text">
                  Why GET is a better option than trading?
                </div>
                <div
                  className={`question-button ${
                    opened1 ? "opened-question" : ""
                  }`}
                >
                  <div className="plus radius"></div>
                </div>
              </div>
              <div className={`question-body ${opened1 ? "opened-body" : ""}`}>
                You don't need to depend on the market situation, you get the
                token itself, not just catching an exchange rate difference
                based on the price movements.
                <br />
                You can never get liquidated or get your positions expired, your
                participation in the GET Project is recorded forever. <br />
                Your potential results in GET are unlimited, and they depend
                only on how much you stake and your referral activity. <br />
                You can start small and grow exponentially, the entry is
                affordable and cheap as two cups of coffee. <br />
              </div>
            </div>

            <div className="question">
              <div
                className="question-header"
                onClick={() => {
                  handleOpenQ(1);
                }}
              >
                <div className="question-header-text">Is GET safe?</div>
                <div
                  className={`question-button ${
                    opened2 ? "opened-question" : ""
                  }`}
                >
                  <div className="plus radius"></div>
                </div>
              </div>
              <div
                style={{ opacity: `${opened2 ? 1 : 0}` }}
                className={`question-body ${opened2 ? "opened-body" : ""}`}
              >
                The GET website is just an interface for a convenient use of the
                token. All your data is recorded and completely secure. However,
                in order to avoid phishing websites, we always recommend double
                checking the website address spelling — getstake.io
              </div>
            </div>

            <div className="question">
              <div
                className="question-header"
                onClick={() => {
                  handleOpenQ(2);
                }}
              >
                <div className="question-header-text">
                  Do I need special knowledge or equipment to interact with the
                  platform?
                </div>
                <div
                  className={`question-button ${
                    opened3 ? "opened-question" : ""
                  }`}
                >
                  <div className="plus radius"></div>
                </div>
              </div>
              <div className={`question-body ${opened3 ? "opened-body" : ""}`}>
                All you need to interact with the platform is a smartphone or a
                computer. No special knowledge or equipment is required.
              </div>
            </div>

            <div className="question">
              <div
                className="question-header"
                onClick={() => {
                  handleOpenQ(3);
                }}
              >
                <div className="question-header-text">Where do I start?</div>
                <div
                  className={`question-button ${
                    opened4 ? "opened-question" : ""
                  }`}
                >
                  <div className="plus radius"></div>
                </div>
              </div>
              <div className={`question-body ${opened4 ? "opened-body" : ""}`}>
                Sign up on the website to get access to the GET Platform and
                Community Channels. Read the technical guides and whitepaper to
                sort everything out. Purchase GET tokens at launch so you can
                start staking immediately.
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sm wf-section">
          <div className="w-container footer-cont">
            <div className="div-block-13">
              <div>
                <h1 className="h2 left footer-text">
                  We reinvent DeFi investment
                </h1>
              </div>
              <div className="div-block-14">
                <h1 className="h2 blue footer-text">Join our community</h1>
              </div>
              <div className="w-layout-grid grid-3">
                <div
                  id="w-node-_9f3b9c52-70d2-e033-c61f-8de65a23f94c-064a3f80"
                  className="div-block-15"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window
                      .open(
                        "tg://resolve?domain=generalexchangetoken",
                        "_blank"
                      )
                      .focus();
                  }}
                >
                  <img
                    src={require("./assets/img/tg.svg").default}
                    loading="lazy"
                    id="w-node-_9f3b9c52-70d2-e033-c61f-8de65a23f94d-064a3f80"
                    alt=""
                    className="image-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
