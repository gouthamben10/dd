import React, { useState } from "react";
import Bottom from "./Bottom";
import Digitalbutton from "./Digitalbutton";
import "./buttonDig.scss";
import { Nav, ButtonGroup, ToggleButton } from "react-bootstrap";
import SwitchButton from "./SwitchButton/SwitchButtonDigital";
import useLocalStorage from "../LocalStorage/LocalStorage";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";

import digitalImg from "../../Assets/img/code bar@2x.png";
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

function Digital() {

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

  const A1DIGI = JSON.parse(sessionStorage.getItem("A1"));
  const A2DIGI = JSON.parse(sessionStorage.getItem("A2"));
  const B1DIGI = JSON.parse(sessionStorage.getItem("B1"));
  const B2DIGI = JSON.parse(sessionStorage.getItem("B2"));
  const C1DIGI = JSON.parse(sessionStorage.getItem("C1"));
  const C2DIGI = JSON.parse(sessionStorage.getItem("C2"));
  const D1DIGI = JSON.parse(sessionStorage.getItem("D1"));
  const D2DIGI = JSON.parse(sessionStorage.getItem("D2"));
  const SPI = JSON.parse(sessionStorage.getItem("spi"));
  const I2C = JSON.parse(sessionStorage.getItem("i2c"));
  const UART = JSON.parse(sessionStorage.getItem("uart"));

  const [a1Digi, setA1Digi] = useLocalStorage("A1DIGI", false);
  const [b1Digi, setB1Digi] = useLocalStorage("B1DIGI", false);
  const [c1Digi, setC1Digi] = useLocalStorage("C1DIGI", false);
  const [d1Digi, setD1Digi] = useLocalStorage("D1DIGI", false);
  const [a2Digi, setA2Digi] = useLocalStorage("A2DIGI", false);
  const [b2Digi, setB2Digi] = useLocalStorage("B2DIGI", false);
  const [c2Digi, setC2Digi] = useLocalStorage("C2DIGI", false);
  const [d2Digi, setD2Digi] = useLocalStorage("D2DIGI", false);

  const [pwmA1, setPwmA1] = useLocalStorage(
    "PWMA1",
    JSON.parse(sessionStorage.getItem("a1-I/O")) &&
      JSON.parse(sessionStorage.getItem("A1"))
  );
  const [pwmD1, setPwmD1] = useLocalStorage(
    "PWMD1",
    JSON.parse(sessionStorage.getItem("d1-I/O")) &&
      JSON.parse(sessionStorage.getItem("D1"))
  );

  const toggleA1 = () => {
    if (JSON.parse(sessionStorage.getItem("a1-I/O")) === true) {
      setPwmA1(!pwmA1);
    }
    setA1Digi(!a1Digi);
    if (a1Digi) {
      document.getElementById("in1").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s1").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in1").style.cssText = "color: #717171; ";
      document.getElementById("s1").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleA2 = () => {
    setA2Digi(!a2Digi);
    if (a2Digi) {
      document.getElementById("in2").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s2").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in2").style.cssText = "color: #717171; ";
      document.getElementById("s2").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleB1 = () => {
    setB1Digi(!b1Digi);
    if (b1Digi) {
      document.getElementById("in3").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s3").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in3").style.cssText = "color: #717171; ";
      document.getElementById("s3").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleB2 = () => {
    setB2Digi(!b2Digi);
    if (b2Digi) {
      document.getElementById("in4").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s4").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in4").style.cssText = "color: #717171; ";
      document.getElementById("s4").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleC1 = () => {
    setC1Digi(!c1Digi);
    if (c1Digi) {
      document.getElementById("in5").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s5").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in5").style.cssText = "color: #717171; ";
      document.getElementById("s5").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleC2 = () => {
    setC2Digi(!c2Digi);
    if (c2Digi) {
      document.getElementById("in6").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s6").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in6").style.cssText = "color: #717171; ";
      document.getElementById("s6").style.cssText = "  color: #fcfcfc;";
    }
  };

  const toggleD1 = () => {
    if (JSON.parse(sessionStorage.getItem("d1-I/O")) === true) {
      setPwmD1(!pwmD1);
    }
    setD1Digi(!d1Digi);
    if (d1Digi) {
      document.getElementById("in7").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s7").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in7").style.cssText = "color: #717171; ";
      document.getElementById("s7").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleD2 = () => {
    setD2Digi(!d2Digi);
    if (d2Digi) {
      document.getElementById("in8").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s8").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in8").style.cssText = "color: #717171; ";
      document.getElementById("s8").style.cssText = "  color: #fcfcfc;";
    }
  };
  const togglePWMA1 = () => {
    if (a1Digi === true) {
      setPwmA1(!pwmA1);
    }
  };

  return (
    <div className="Digital">
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
              <div className="flowchart-navbar_new navbar_new" href="/input-output" eventKey="link-1">Input/Output</div>
              <div className="flowchart-navbar_new navbar_new isActive" href="/digital-analog" eventKey="link-2">Digital/Analog</div>
              <div className="flowchart-navbar_new navbar_new" href="/flowchart" eventKey="link-3">Flowchart</div>    
            </div>
            <img src={digitalImg} style={{ height: "100%" ,width: "40%" ,position: "relative" , right : '31vw'  }} />
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
              <label className={"input upper-label-input"}>
                <span className={(A1DIGI || false) + "-span textsp"}>A1</span>
                <div class={"switch-button-" + (A1DIGI || false)} id="s1">
                  <input
                    active={a1Digi}
                    disabled={!A1DIGI || false}
                    class="switch-button-checkbox"
                    type="checkbox"
                    onChange={toggleA1}
                    checked={a1Digi}
                  ></input>
                  <label class=" switch-button-label" for="">
                    <span class="switch-button-label-span" id="in1">
                      Digital
                    </span>
                  </label>
                </div>
              </label>
              <br />
              <label className={" input upper-label-input"}>
                <span className={(A2DIGI || false) + "-span textsp"}>A2</span>
                <div class={"switch-button-" + (A2DIGI || false)} id="s2">
                  <input
                    active={a2Digi}
                    disabled={!A2DIGI || false}
                    class="switch-button-checkbox"
                    type="checkbox"
                    onChange={toggleA2}
                    checked={a2Digi}
                  ></input>
                  <label class=" switch-button-label" for="">
                    <span class="switch-button-label-span" id="in2">
                      Digital
                    </span>
                  </label>
                </div>
              </label>{" "}
            </div>
          </div>
          <div className="flow-left-upper">
            <div className="flow-left-upper-grp">
              <label className={"  input upper-label-input"}>
                <span className={(B1DIGI || false) + "-span textsp"}>B1</span>
                <div class={"switch-button-" + (B1DIGI || false)} id="s3">
                  <input
                    active={b1Digi}
                    disabled={!B1DIGI || false}
                    class="switch-button-checkbox"
                    type="checkbox"
                    onChange={toggleB1}
                    checked={b1Digi}
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span" id="in3">
                      Digital
                    </span>
                  </label>
                </div>
              </label>
              <br />
              <label className={"  input upper-label-input"}>
                <span className={(B2DIGI || false) + "-span textsp"}>B2</span>
                <div class={"switch-button-" + (B2DIGI || false)} id="s4">
                  <input
                    active={b2Digi}
                    disabled={!B2DIGI || false}
                    class="switch-button-checkbox"
                    type="checkbox"
                    onChange={toggleB2}
                    checked={b2Digi}
                  ></input>
                  <label class=" switch-button-label" for="">
                    <span class="switch-button-label-span" id="in4">
                      Digital
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
              <label className={" input upper-label-input"}>
                <span className={(C1DIGI || false) + "-span textsp"}>C1</span>
                <div class={"switch-button-" + (C1DIGI || false)} id="s5">
                  <input
                    active={c1Digi}
                    disabled={!C1DIGI || false}
                    class="switch-button-checkbox"
                    type="checkbox"
                    onChange={toggleC1}
                    checked={c1Digi}
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span" id="in5">
                      Digital
                    </span>
                  </label>
                </div>
              </label>
              <br />
              <label className={" input upper-label-input"}>
                <span className={(C1DIGI || false) + "-span textsp"}>C2</span>
                <div class={"switch-button-" + (C1DIGI || false)} id="s6">
                  <input
                    active={c2Digi}
                    disabled={!C2DIGI || false}
                    class="switch-button-checkbox"
                    type="checkbox"
                    onChange={toggleC2}
                    checked={c2Digi}
                  ></input>
                  <label class="switch-button-label" for="">
                    <span class="switch-button-label-span" id="in6">
                      Digital
                    </span>
                  </label>
                </div>
              </label>
            </div>
          </div>
          <div className="flow-left-upper">
            <div className="flow-left-upper-grp">
              <label className={" input upper-label-input"}>
                <span className={(D1DIGI || false) + "-span textsp"}>D1</span>
                <div class={"switch-button-" + (D1DIGI || false)} id="s7">
                  <input
                    onClick={toggleD1}
                    active={d1Digi}
                    disabled={!D1DIGI || false}
                    class="switch-button-checkbox"
                    type="checkbox"
                    checked={d1Digi}
                  ></input>
                  <label class=" switch-button-label" for="">
                    <span class="switch-button-label-span" id="in7">
                      Digital
                    </span>
                  </label>
                </div>
              </label>
              <br />
              <label className={" input upper-label-input"}>
                <span className={(D2DIGI || false) + "-span textsp"}>D2</span>
                <div class={"switch-button-" + (D2DIGI || false)} id="s8">
                  <input
                    onClick={toggleD2}
                    active={d2Digi}
                    disabled={!D2DIGI || false}
                    class="switch-button-checkbox"
                    type="checkbox"
                    checked={d2Digi}
                  ></input>
                  <label class=" switch-button-label" for="">
                    <span class="switch-button-label-span" id="in8">
                      Digital
                    </span>
                  </label>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <Bottom to="/flow/flowchart" prev="/flow/input-output" />
    </div>
  );
}

export default Digital;
