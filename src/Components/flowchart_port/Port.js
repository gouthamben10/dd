import React from "react";
import Bottom from "./Bottom";
import { Nav } from "react-bootstrap";
import { useLocalStorage } from "../LocalStorage/LocalStorage";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";
import selectImg from "../../Assets/img/select bar@2x.png";
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

let i = [];
for (let j = 0; j < 8; j++) i[j] = 1;

const Port = () => {
  const componentDidMount = () => {
    myFunction1();
  };

  const [a1, setA1] = useLocalStorage("A1", false);
  const [a2, setA2] = useLocalStorage("A2", false);
  const [a, setA] = useLocalStorage("A", false);
  const [b1, setB1] = useLocalStorage("B1", false);
  const [b2, setB2] = useLocalStorage("B2", false);
  const [b, setB] = useLocalStorage("B", false);
  const [c1, setC1] = useLocalStorage("C1", false);
  const [c2, setC2] = useLocalStorage("C2", false);
  const [c, setC] = useLocalStorage("C", false);
  const [d1, setD1] = useLocalStorage("D1", false);
  const [d2, setD2] = useLocalStorage("D2", false);
  const [d, setD] = useLocalStorage("D", false);


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


  const onA1ValueChange = async () => {
    setA1(!a1);
    if (a1 === false && a2 === true) {
      setA(true);
    } else {
      setA(false);
    }
  };

  const onA2ValueChange = () => {
    setA2(!a2);
    if (a1 === true && a2 === false) {
      setA(true);
    } else {
      setA(false);
    }
  };

  const onB1ValueChange = () => {
    setB1(!b1);
    if (b1 === false && b2 === true) {
      setB(true);
    } else {
      setB(false);
    }
  };
  const onB2ValueChange = () => {
    setB2(!b2);
    if (b1 === true && b2 === false) {
      setB(true);
    } else {
      setB(false);
    }
  };

  const onC1ValueChange = () => {
    setC1(!c1);
    if (c1 === false && c2 === true) {
      setC(true);
    } else {
      setC(false);
    }
  };
  const onC2ValueChange = () => {
    setC2(!c2);
    if (c1 === true && c2 === false) {
      setC(true);
    } else {
      setC(false);
    }
  };

  const onD1ValueChange = () => {
    setD1(!d1);
    if (d1 === false && d2 === true) {
      setD(true);
    } else {
      setD(false);
    }
  };
  const onD2ValueChange = () => {
    setD2(!d2);
    if (d1 === true && d2 === false) {
      setD(true);
    } else {
      setD(false);
    }
  };

  const myFunction1 = () => {
    if (!a1) {
      document.getElementById("foo1").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo1").style.cssText = "color: black; ";
    }
  };
  const myFunction2 = () => {
    if (!a2) {
      document.getElementById("foo2").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo2").style.cssText = "color: black; ";
    }
  };
  const myFunction3 = () => {
    if (!b1) {
      document.getElementById("foo3").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo3").style.cssText = "color: black; ";
    }
  };
  const myFunction4 = () => {
    if (!b2) {
      document.getElementById("foo4").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo4").style.cssText = "color: black; ";
    }
  };
  const myFunction5 = () => {
    if (!c1) {
      document.getElementById("foo5").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo5").style.cssText = "color: black; ";
    }
  };
  const myFunction6 = () => {
    if (!c2) {
      document.getElementById("foo6").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo6").style.cssText = "color: black; ";
    }
  };
  const myFunction7 = () => {
    if (!d1) {
      document.getElementById("foo7").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo7").style.cssText = "color: black; ";
    }
  };
  const myFunction8 = () => {
    if (!d2) {
      document.getElementById("foo8").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo8").style.cssText = "color: black; ";
    }
  };
  return (
    <div>
      <div className="HeaderContainer">

      <div className="flowchart-navbarContainer navbarContainer" style={{ zIndex: "1000" }}>
            <div className="flowchart-navbar_content navbar_content">
              <div className="flowchart-navbar_new navbar_new isActive" href="/">Select Ports</div>
              <div className="flowchart-navbar_new navbar_new" href="/input-output" eventKey="link-1">Input/Output</div>
              <div className="flowchart-navbar_new navbar_new " href="/digital-analog" eventKey="link-2">Digital/Analog</div>
              <div className="flowchart-navbar_new navbar_new" href="/flowchart" eventKey="link-3">Flowchart</div>    
            </div>
            <img src={selectImg} style={{ height: "100%" ,width: "17%" ,position: "relative" , right : '43vw'  }} />
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
        {/* <img
          className="last-item"
          src={process.env.PUBLIC_URL + "/img/button 52x52 - stroke.png"}
        ></img>
        <img
          className="last-item"
          src={process.env.PUBLIC_URL + "img/connection status - on.png"}
        ></img> */}
      </div>
      <div className="MainContainer">
        <div className="ButtonDiv">
          <div className="tlb">
            <div className="tlbIn ">
              <span className="InputLabel">
                <input
                  className="InputCheckBox"
                  type="checkbox"
                  checked={a1}
                  onClick={() => myFunction1()}
                  onChange={() => onA1ValueChange()}
                />
                <span disabled="disabled" className="A1" id="foo1">
                  A1
                </span>
              </span>
              <span className="InputLabel">
                <input
                  className="InputCheckBox"
                  type="checkbox"
                  checked={a2}
                  onClick={() => myFunction2()}
                  onChange={() => onA2ValueChange()}
                />
                <span disabled="disabled" className="A1" id="foo2">
                  A2
                </span>
              </span>
            </div>
          </div>
          <div className="tlb">
            <div className="tlbIn ">
              <span className="InputLabel">
                <input
                  className="InputCheckBox"
                  type="checkbox"
                  checked={b1}
                  onClick={() => myFunction3()}
                  onChange={() => onB1ValueChange()}
                />
                <span disabled="disabled" className="A1" id="foo3">
                  B1
                </span>
              </span>
              <span className="InputLabel">
                <input
                  className="InputCheckBox"
                  type="checkbox"
                  checked={b2}
                  onClick={() => myFunction4()}
                  onChange={() => onB2ValueChange()}
                />
                <span disabled="disabled" className="A1" id="foo4">
                  B2
                </span>
              </span>
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
        <div className="ButtonRightDiv">
          <div className="tlb">
            <div className="tlbIn ">
              <span className="InputLabel">
                <input
                  className="InputCheckBox"
                  type="checkbox"
                  checked={c1}
                  onClick={() => myFunction5()}
                  onChange={() => onC1ValueChange()}
                />
                <span disabled="disabled" className="A1" id="foo5">
                  C1
                </span>
              </span>
              <span className="InputLabel">
                <input
                  className="InputCheckBox"
                  type="checkbox"
                  checked={c2}
                  onClick={() => myFunction6()}
                  onChange={() => onC2ValueChange()}
                />
                <span disabled="disabled" className="A1" id="foo6">
                  C2
                </span>
              </span>
            </div>
          </div>
          <div className="tlb">
            <div className="tlbIn ">
              <span className="InputLabel">
                <input
                  className="InputCheckBox"
                  type="checkbox"
                  checked={d1}
                  onClick={() => myFunction7()}
                  onChange={() => onD1ValueChange()}
                />
                <span disabled="disabled" className="A1" id="foo7">
                  D1
                </span>
              </span>
              <span className="InputLabel">
                <input
                  className="InputCheckBox"
                  type="checkbox"
                  checked={d2}
                  onClick={() => myFunction8()}
                  onChange={() => onD2ValueChange()}
                />
                <span disabled="disabled" className="A1" id="foo8">
                  D2
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="CenterImg">
              <img
                src={process.env.PUBLIC_URL + "/img/PC image@2x.png"}
                alt="logo"
                // width="280"
              />
            </div> */}
      <Bottom to="/flow/input-output" prev="/flow" description="Tap on the icon to select the in built Play Computer feature"/>
    </div>
  );
};

export default Port;
