import React, { useState } from "react";
import Bottom from "./Bottom";
import { Nav } from "react-bootstrap";
import "./button.scss";
import SwitchButton from "./SwitchButton/SwitchButton";
import useLocalStorage from "../LocalStorage/LocalStorage";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";
import inputImg from "../../Assets/img/assemble bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import connectionImg from "../../Assets/img/connection status - on.png";



import eyeInactiveImg from "../../Assets/internalAccessories/eye - inactive.484d85f3.svg";
import teethImg from "../../Assets/internalAccessories/teeth - inactive.ff84b1d3.svg";
import inImg from "../../Assets/internalAccessories/4 in 1 - inactive.ea3e994f.svg";
import internalmicImg from "../../Assets/internalAccessories/internal mic - inactive.d43d2f36.svg";
import buzzerImg from "../../Assets/internalAccessories/buzzer - inactive.872b79d8.svg";
import touchpadsImg from "../../Assets/internalAccessories/touch pads - inactive.748c6933.svg";

import PcinternalEYEActive from "../../Assets/internalAccessories/eye - active.svg";
import PcinternalEYEInActive from "../../Assets/internalAccessories/eye - inactive.svg";
import PcinternalTeethInActive from "../../Assets/internalAccessories/teeth - inactive.svg";
import PcinternalTeethActive from "../../Assets/internalAccessories/teeth - active.svg";

import Pcinternal4in1Active from "../../Assets/internalAccessories/4 in 1 - active.svg";
import Pcinternal4in1InActive from "../../Assets/internalAccessories/4 in 1 - inactive.svg";
import PcinternalMicActive from "../../Assets/internalAccessories/internal mic - inactive.svg";
import PcinternalMicInActive from "../../Assets/internalAccessories/internal mic - active.svg";
import PcinternalBuzzerInActive from "../../Assets/internalAccessories/buzzer - inactive.svg";
import PcinternalBuzzerActive from "../../Assets/internalAccessories/buzzer - active.svg";
import PcinternalTouchpadsInActive from "../../Assets/internalAccessories/touch pads - inactive.svg";
import PcinternalTouchpadsActive from "../../Assets/internalAccessories/touch pads - active.svg";

import "./pcimage.css";
import "./Navbar.css";
import "./style.css";

function InputOutput() {
  const A1 = JSON.parse(sessionStorage.getItem("A1"));
  const A2 = JSON.parse(sessionStorage.getItem("A2"));
  const B1 = JSON.parse(sessionStorage.getItem("B1"));
  const B2 = JSON.parse(sessionStorage.getItem("B2"));
  const C1 = JSON.parse(sessionStorage.getItem("C1"));
  const C2 = JSON.parse(sessionStorage.getItem("C2"));
  const D1 = JSON.parse(sessionStorage.getItem("D1"));
  const D2 = JSON.parse(sessionStorage.getItem("D2"));

  const isDistanceSensors = JSON.parse(sessionStorage.getItem("isDistanceSensors"));
  const isGestureSensor = JSON.parse(sessionStorage.getItem("isGestureSensor"));
  const isLightSensor = JSON.parse(sessionStorage.getItem("isLightSensor"));
  const isColorSensor = JSON.parse(sessionStorage.getItem("isColorSensor"));
  const isTemperature = JSON.parse(sessionStorage.getItem("isTemperature"));
  const isMic = JSON.parse(sessionStorage.getItem("isMic"));
  const isTouchZero = JSON.parse(sessionStorage.getItem("isTouchZero"));
  const isTouchOne = JSON.parse(sessionStorage.getItem("isTouchOne"));
  const isTouchTwo = JSON.parse(sessionStorage.getItem("isTouchTwo"));
  const isTouchZeroOutput = JSON.parse(sessionStorage.getItem("isTouchZeroOutput"));
  const isTouchOneOutput = JSON.parse(sessionStorage.getItem("isTouchOneOutput"));
  const isTouchTwoOutput = JSON.parse(sessionStorage.getItem("isTouchTwoOutput"));
  const isEyeLeft = JSON.parse(sessionStorage.getItem("isEyeLeft"));
  const isEyeRight = JSON.parse(sessionStorage.getItem("isEyeRight"));
  const isbuzzer = JSON.parse(sessionStorage.getItem("isBuzzer"));
  const isSimeleOne = JSON.parse(sessionStorage.getItem("isSmileOne"));
  const isSimeleTwo = JSON.parse(sessionStorage.getItem("isSmileTwo"));
  const isSimeleThree = JSON.parse(sessionStorage.getItem("isSmileThree"));
  const isSimeleFour = JSON.parse(sessionStorage.getItem("isSmileFour"));

  const [a1Checked, setA1Checked] = useLocalStorage("a1-I/O", false);
  const [a2Checked, setA2Checked] = useLocalStorage("a2-I/O", false);
  const [b1Checked, setB1Checked] = useLocalStorage("b1-I/O", false);
  const [b2Checked, setB2Checked] = useLocalStorage("b2-I/O", false);
  const [c1Checked, setC1Checked] = useLocalStorage("c1-I/O", false);
  const [c2Checked, setC2Checked] = useLocalStorage("c2-I/O", false);
  const [d1Checked, setD1Checked] = useLocalStorage("d1-I/O", false);
  const [d2Checked, setD2Checked] = useLocalStorage("d2-I/O", false);

  const [uart, setUart] = useLocalStorage("uart", false);
  const [spi, setSpi] = useLocalStorage("spi", false);
  const [i2c, setI2c] = useLocalStorage("i2c", false);

  const [showPopupUart, setShowPopupUart] = useState(false);
  const [showPopupSpi, setShowPopupSpi] = useState(false);
  const [showPopupI2c, setShowPopupI2c] = useState(false);

  const closeModalUart = () => {
    setShowPopupUart(false);
  };

  const closeModalSp1 = () => {
    setShowPopupSpi(false);
  };

  const closeModalI2c = () => {
    setShowPopupI2c(false);
  };

  const activateModalUart = () => {
    setUart(true);
    setShowPopupUart(false);
    closeModalUart();
  };

  const deactivateModalUart = () => {
    setUart(false);
    setShowPopupUart(false);
    closeModalUart();
  };

  const toggleUart = () => {
    setUart(!uart);
    setShowPopupUart(false);
  };

  const activateModalSp1 = () => {
    setSpi(true);
    setShowPopupSpi(false);
    closeModalSp1();
  };

  const deactivateModalSp1 = () => {
    setSpi(false);
    setShowPopupSpi(false);
    closeModalSp1();
  };

  const toggleSp1 = () => {
    setSpi(!spi);
    setShowPopupSpi(false);
  };

  const activateModalI2c = () => {
    setI2c(true);
    setShowPopupI2c(false);
    closeModalI2c();
  };

  const deactivateModalI2c = () => {
    setI2c(false);
    setShowPopupI2c(false);
    closeModalI2c();
  };

  const toggleI2c = () => {
    setI2c(!i2c);
    setShowPopupI2c(false);
  };

  const a1CheckedState = () => {
    setA1Checked(!a1Checked);
    if (a1Checked) {
      document.getElementById("in1").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s1").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in1").style.cssText = "color: #717171; ";
      document.getElementById("s1").style.cssText = "  color: #fcfcfc;";
    }
  };
  const a2CheckedState = () => {
    setA2Checked(!a2Checked);
    if (a2Checked) {
      document.getElementById("in2").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s2").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in2").style.cssText = "color: #717171; ";
      document.getElementById("s2").style.cssText = "  color: #fcfcfc;";
    }
  };

  const b1CheckedState = () => {
    setB1Checked(!b1Checked);
    if (b1Checked) {
      document.getElementById("in3").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s3").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in3").style.cssText = "color: #717171; ";
      document.getElementById("s3").style.cssText = "  color: #fcfcfc;";
    }
  };

  const b2CheckedState = () => {
    setB2Checked(!b2Checked);
    if (b2Checked) {
      document.getElementById("in4").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s4").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in4").style.cssText = "color: #717171; ";
      document.getElementById("s4").style.cssText = "  color: #fcfcfc;";
    }
  };
  const c1CheckedState = () => {
    setC1Checked(!c1Checked);
    if (c1Checked) {
      document.getElementById("in5").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s5").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in5").style.cssText = "color: #717171; ";
      document.getElementById("s5").style.cssText = "  color: #fcfcfc;";
    }
  };
  const c2CheckedState = () => {
    setC2Checked(!c2Checked);
    if (c2Checked) {
      document.getElementById("in6").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s6").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in6").style.cssText = "color: #717171; ";
      document.getElementById("s6").style.cssText = "  color: #fcfcfc;";
    }
  };
  const d1CheckedState = () => {
    setD1Checked(!d1Checked);
  };

  const d2CheckedState = () => {
    setD2Checked(!d2Checked);
  };

  const onSpiCircleClick = () => {
    if (C1 && C2 && D1 && D2) {
      setShowPopupSpi(!showPopupSpi);
    }
  };

  const onUartCircleChange = () => {
    if (B1 && B2) {
      setShowPopupUart(!showPopupUart);
    }
  };

  const onI2cCircleChange = () => {
    if (D1 && D2) {
      setShowPopupI2c(!showPopupI2c);
    }
  };

  let buttonModal;
  let buttonModalSp1;
  let buttonModalI2c;
  let UART;
  let SP1;
  let I2c;

  return (
    <div>
      <div className="HeaderContainer">
      <div
          style={{
            height: "10%",
            width: "100%",
            // border: "1px solid red",
            // background: "red",
            position: "absolute",
            userSelect: "none",
          }}
        >
  <div className="flowchart-navbarContainer navbarContainer" style={{ zIndex: "1000" }}>
            <div className="flowchart-navbar_content navbar_content">
              <div className="flowchart-navbar_new navbar_new" href="/">Select Ports</div>
              <div className="flowchart-navbar_new navbar_new isActive" href="/input-output" eventKey="link-1">Input/Output</div>
              <div className="flowchart-navbar_new navbar_new" href="/digital-analog" eventKey="link-2">Digital/Analog</div>
              <div className="flowchart-navbar_new navbar_new" href="/flowchart" eventKey="link-3">Flowchart</div>    
            </div>
            <img src={inputImg} style={{ height: "100%" ,width: "29%" ,position: "relative" , right : '38vw'  }} />
            <div className="flowchart-navbar-Action navbar-Action">
                  <img
                   className="flowchart-iconBtnSize iconBtnSize"
                   style={{ width: "61px", height:"61px",marginRight: "10px" }}
                  src={secondaryImg}
                  ></img>
                  <img
                     className="flowchart-iconBtnSize iconBtnSize"
                     style={{width: "61px", height:"61px", marginRight: "10px" }}
                    src={strokeImg}
                  ></img>
                  <img
                    style={{ marginRight: "0px" }}
                    src={connectionImg}
                  ></img>
            </div>
        </div>
        </div>
      </div>
      <div className="MainContainerInput">
        <div className="ButtonDivInput">
        <div className="flow-left-upper">
            <div className="flow-left-upper-grp">
              <label className={A1 + "input upper-label-input"}>
                <span className={(A1 || false) + "-span textsp"}>A1</span>
                <div class={"switch-button-" + (A1 || false)} id="s1">
                  <input
                    disabled={!A1}
                    checked={a1Checked}
                    onChange={a1CheckedState}
                    class="switch-button-checkbox"
                    type="checkbox"
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span" id="in1">
                      Input
                    </span>
                  </label>
                </div>
              </label>
              <br />
              <label className={A2 + "input upper-label-input"}>
                <span className={(A2 || false) + "-span textsp"}>A2</span>
                <div class={"switch-button-" + (A2 || false)} id="s2">
                  <input
                    disabled={!A2}
                    checked={a2Checked}
                    onChange={a2CheckedState}
                    class="switch-button-checkbox"
                    type="checkbox"
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span" id="in2">
                      Input
                    </span>
                  </label>
                </div>
              </label>
            </div>
          </div>
          <div className="flow-left-upper">
            <div className="flow-left-upper-grp">
              <label className={B1 + "input upper-label-input"}>
                <span className={(B1 || false) + "-span textsp"}>B1</span>

                <div class={"switch-button-" + (B1 || false)} id="s3">
                  <input
                    disabled={!B1}
                    checked={b1Checked}
                    onChange={b1CheckedState}
                    class="switch-button-checkbox"
                    type="checkbox"
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span " id="in3">
                      Input
                    </span>
                  </label>
                </div>
              </label>
              <br />
              <label className={B2 + "input upper-label-input"}>
                <span className={(B2 || false) + "-span textsp"}>B2</span>

                <div class={"switch-button-" + (B2 || false)} id="s4">
                  <input
                    disabled={!B2}
                    checked={b2Checked}
                    onChange={b2CheckedState}
                    class="switch-button-checkbox"
                    type="checkbox"
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span" id="in4">
                      Input
                    </span>
                  </label>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="CenterImg">
        <img src={pcImg} style={{
              width: "85%",
              zIndex: "110", 
              top: "7%", 
              position: "relative"
            }}/>
     <div className="deviceContainer">
              {isEyeLeft ? (
                <img src={PcinternalEYEActive} className="imgStyleEyeL" />
              ) : (
                <img src={PcinternalEYEInActive} className="imgStyleEyeL" />
              )}
              {isEyeRight ? (
                <img src={PcinternalEYEActive} className="imgStyleEyeR" />
              ) : (
                <img src={PcinternalEYEInActive} className="imgStyleEyeR" />
              )}
              {isSimeleOne ? (
                <img src={PcinternalTeethActive} className="imgStyleTeeth1" />
              ) : (
                <img src={PcinternalTeethInActive} className="imgStyleTeeth1" />
              )}

              {isSimeleTwo ? (
                <img src={PcinternalTeethActive} className="imgStyleTeeth2" />
              ) : (
                <img src={PcinternalTeethInActive} className="imgStyleTeeth2" />
              )}

              {isSimeleThree ? (
                <img src={PcinternalTeethActive} className="imgStyleTeeth3" />
              ) : (
                <img src={PcinternalTeethInActive} className="imgStyleTeeth3" />
              )}

              {isSimeleFour ? (
                <img src={PcinternalTeethActive} className="imgStyleTeeth4" />
              ) : (
                <img src={PcinternalTeethInActive} className="imgStyleTeeth4" />
              )}

              {isDistanceSensors ||
              isColorSensor ||
              isGestureSensor ||
              isLightSensor ? (
                <img src={Pcinternal4in1Active} className="imgStyle4in1" />
              ) : (
                <img src={Pcinternal4in1InActive} className="imgStyle4in1" />
              )}

              {isMic ? (
                <img src={PcinternalMicInActive} className="imgStyleMic" />
              ) : (
                <img src={PcinternalMicActive} className="imgStyleMic" />
              )}
              {isbuzzer ? (
                <img src={PcinternalBuzzerActive} className="imgStyleBuzzer" />
              ) : (
                <img
                  src={PcinternalBuzzerInActive}
                  className="imgStyleBuzzer"
                />
              )}

              {isTouchZero ? (
                <img
                  src={PcinternalTouchpadsActive}
                  className="imgStyleTouchpads1"
                />
              ) : (
                <img
                  src={PcinternalTouchpadsInActive}
                  className="imgStyleTouchpads1"
                />
              )}
              {isTouchOne ? (
                <img
                  src={PcinternalTouchpadsActive}
                  className="imgStyleTouchpads2"
                />
              ) : (
                <img
                  src={PcinternalTouchpadsInActive}
                  className="imgStyleTouchpads2"
                />
              )}

              {isTouchTwo ? (
                <img
                  src={PcinternalTouchpadsActive}
                  className="imgStyleTouchpads3"
                />
              ) : (
                <img
                  src={PcinternalTouchpadsInActive}
                  className="imgStyleTouchpads3"
                />
              )}
            </div>
        </div>
        <div className="ButtonRightDivInput">
          <div className="flow-left-upper">
            <div className="flow-left-upper-grp">
              <label className={C1 + "input upper-label-input"}>
                <span className={(C1 || false) + "-span textsp"}>C1</span>

                <div class={"switch-button-" + (C1 || false)} id="s5">
                  <input
                    disabled={!C1}
                    checked={c1Checked}
                    onChange={c1CheckedState}
                    class="switch-button-checkbox"
                    type="checkbox"
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span" id="in5">
                      Input
                    </span>
                  </label>
                </div>
              </label>
              <br />
              <label className={C2 + "input upper-label-input"}>
                <span className={(C2 || false) + "-span textsp"}>C2</span>

                <div class={"switch-button-" + (C2 || false)} id="s6">
                  <input
                    disabled={!C2}
                    checked={c2Checked}
                    onChange={c2CheckedState}
                    class="switch-button-checkbox"
                    type="checkbox"
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span" id="in6">
                      Input
                    </span>
                  </label>
                </div>
              </label>
            </div>
          </div>
          <div className="flow-left-upper">
            <div className="flow-left-upper-grp">
              <label className={D1 + "input upper-label-input"}>
                <span className={(D1 || false) + "-span textsp"}>D1</span>
                <div
                  class={"switch-button-" + false}
                  style={{ color: "#fcfcfc" }}
                >
                  <input
                    disabled={true}
                    checked={true}
                    onChange={d1CheckedState}
                    class="switch-button-checkbox"
                    type="checkbox"
                  ></input>
                  <label class="switch-button-label" for="">
                    <span
                      class="switch-button-label-span"
                      style={{ color: "#717171" }}
                    >
                      Input
                    </span>
                  </label>
                </div>
              </label>
              <br />
              <label className={D2 + "input upper-label-input"}>
                <span className={(D2 || false) + "-span textsp"}>D2</span>

                <div
                  class={"switch-button-" + false}
                  style={{ color: "#fcfcfc" }}
                >
                  <input
                    disabled={true}
                    checked={true}
                    onChange={d2CheckedState}
                    class="switch-button-checkbox"
                    type="checkbox"
                  ></input>
                  <label class="switch-button-label" for="">
                    <span
                      class="switch-button-label-span"
                      style={{ color: "#717171" }}
                    >
                      Input
                    </span>
                  </label>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <Bottom to="/flow/digital-analog" prev="/flow/selectports" />
    </div>
  );
}

export default InputOutput;
