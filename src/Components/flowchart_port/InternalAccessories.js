import React, { useEffect, useState } from "react";

import Panel1 from "./FlowchartConnections/logic/pannel";

import Bottom from "./Bottom";
import selectImg from "../../Assets/img/select bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import connectionImg from "../../Assets/img/connection status - on.png";
import "./InternalAccessories.css";
import "./style.css";

import popupcardImg from "../../Assets/internalAccessories/popupcard@2x.png";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";

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

import mic from "../../Assets/internalAccessories/inputsandoutputs/mic.png";
import micEnabled from "../../Assets/internalAccessories/inputsandoutputs/mic-enabled.png";
import temperature from "../../Assets/internalAccessories/inputsandoutputs/temperature.png";
import temperatureEnabled from "../../Assets/internalAccessories/inputsandoutputs/temperature-enabled.png";
import touchzero from "../../Assets/internalAccessories/inputsandoutputs/touchpad0.png";
import touchzeroEnabled from "../../Assets/internalAccessories/inputsandoutputs/touchpad0-enabled.png";
import touchone from "../../Assets/internalAccessories/inputsandoutputs/touchpad1.png";
import touchoneEnabled from "../../Assets/internalAccessories/inputsandoutputs/touchpad1-enabled.png";
import touchtwo from "../../Assets/internalAccessories/inputsandoutputs/touchpad2.png";
import touchtwoEnabled from "../../Assets/internalAccessories/inputsandoutputs/touchpad2-enabled.png";
import distancesensor from "../../Assets/internalAccessories/inputsandoutputs/distancesensor.png";
import distancesensorEnabled from "../../Assets/internalAccessories/inputsandoutputs/distancesensor-enabled.png";
import gesturesensor from "../../Assets/internalAccessories/inputsandoutputs/gesture.png";
import gesturesensorEnabled from "../../Assets/internalAccessories/inputsandoutputs/gesture-enabled.png";
import lightsensor from "../../Assets/internalAccessories/inputsandoutputs/lightsensor.png";
import lightsensorEnabled from "../../Assets/internalAccessories/inputsandoutputs/lightsensor-enabled.png";
import colorsensor from "../../Assets/internalAccessories/inputsandoutputs/colorsensor.png";
import colorsensorEnabled from "../../Assets/internalAccessories/inputsandoutputs/colorsensor-enabled.png";
import lefteye from "../../Assets/internalAccessories/inputsandoutputs/lefteye.png";
import lefteyeEnabled from "../../Assets/internalAccessories/inputsandoutputs/lefteye-enabled.png";
import righteye from "../../Assets/internalAccessories/inputsandoutputs/righteye.png";
import righteyeEnabled from "../../Assets/internalAccessories/inputsandoutputs/righteye-enabled.png";
import buzzer from "../../Assets/internalAccessories/inputsandoutputs/buzzer.png";
import buzzerEnabled from "../../Assets/internalAccessories/inputsandoutputs/buzzer-enabled.png";
import smileone from "../../Assets/internalAccessories/inputsandoutputs/smile1.png";
import smileoneEnabled from "../../Assets/internalAccessories/inputsandoutputs/smile1-enabled.png";
import smiletwo from "../../Assets/internalAccessories/inputsandoutputs/smile2.png";
import smiletwoEnabled from "../../Assets/internalAccessories/inputsandoutputs/smile2-enabled.png";
import smilethree from "../../Assets/internalAccessories/inputsandoutputs/smile3.png";
import smilethreeEnabled from "../../Assets/internalAccessories/inputsandoutputs/smile3-enabled.png";
import smilefour from "../../Assets/internalAccessories/inputsandoutputs/smile4.png";
import smilefourEnabled from "../../Assets/internalAccessories/inputsandoutputs/smile4-enabled.png";
import { Link, useHistory } from "react-router-dom";
import { useLocalStorage } from "../LocalStorage/LocalStorage";
var Panel = Panel1("");
const InternalAccessories = () => {
  const history = useHistory();

  const [isDistanceSensors, setDistanceSensors] = useLocalStorage(
    "isDistanceSensors",
    false
  );

  const [isGestureSensor, setGestureSensor] = useLocalStorage(
    "isGestureSensor",
    false
  );

  const [isLightSensor, setLightSensor] = useLocalStorage(
    "isLightSensor",
    false
  );

  const [isColorSensor, setColorSensor] = useLocalStorage(
    "isColorSensor",
    false
  );

  const [isTemperature, setTemperature] = useLocalStorage(
    "isTemperature",
    false
  );

  const [isMic, setMic] = useLocalStorage("isMic", false);
  // input
  const [isTouchZero, setTouchZero] = useLocalStorage("isTouchZero", false);
  const [isTouchOne, setTouchOne] = useLocalStorage("isTouchOne", false);
  const [isTouchTwo, setTouchTwo] = useLocalStorage("isTouchTwo", false);

  // outPut
  const [isTouchZeroOutput, setTouchZeroOutput] = useLocalStorage(
    "isTouchZeroOutput",
    false
  );
  const [isTouchOneOutput, setTouchOneOutput] = useLocalStorage(
    "isTouchOneOutput",
    false
  );
  const [isTouchTwoOutput, setTouchTwoOutput] = useLocalStorage(
    "isTouchTwoOutput",
    false
  );

  const [isEyeLeft, setEyeLeft] = useLocalStorage("isEyeLeft", false);
  const [isEyeRight, setEyeRight] = useLocalStorage("isEyeRight", false);
  const [isbuzzer, setbuzzer] = useLocalStorage("isBuzzer", false);

  const [isSimeleOne, setSimleOne] = useLocalStorage("isSmileOne", false);
  const [isSimeleTwo, setSimleTwo] = useLocalStorage("isSmileTwo", false);
  const [isSimeleThree, setSimleThree] = useLocalStorage("isSmileThree", false);
  const [isSimeleFour, setSimleFour] = useLocalStorage("isSmileFour", false);

  const [erasedProgram, setErasedProgram] = useState(false);

  const [isusb, setUsb] = useState(false);
  const handleEventsClick = (e) => {
    switch (e.target.alt) {
      case "mic": {
        if (isMic) {
          var x = document.getElementById("snackbar1");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
          setMic(false);
        } else {
          setMic(true);
        }
        break;
      }
      case "temperature": {
        var x = document.getElementById("snackbar2");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTemperature) {
          setTemperature(false);
        } else {
          setTemperature(true);
        }
        break;
      }

      case "touch0": {
        var x = document.getElementById("snackbar3");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchZero) {
          setTouchZero(false);
        } else {
          setTouchZero(true);
          setTouchZeroOutput(false);
        }
        break;
      }

      case "touch1": {
        var x = document.getElementById("snackbar4");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchOne) {
          setTouchOne(false);
        } else {
          setTouchOne(true);
          setTouchOneOutput(false);
        }
        break;
      }
      case "touch2": {
        var x = document.getElementById("snackbar5");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchTwo) {
          setTouchTwo(false);
        } else {
          setTouchTwo(true);
          setTouchTwoOutput(false);
        }
        break;
      }

      case "touch0Output": {
        var x = document.getElementById("snackbar6");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchZeroOutput) {
          setTouchZeroOutput(false);
        } else {
          setTouchZeroOutput(true);
          setTouchZero(false);
        }
        break;
      }
      case "touch1Output": {
        var x = document.getElementById("snackbar7");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchOneOutput) {
          setTouchOneOutput(false);
        } else {
          setTouchOneOutput(true);
          setTouchOne(false);
        }
        break;
      }

      case "touch2Output": {
        var x = document.getElementById("snackbar8");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchTwoOutput) {
          setTouchTwoOutput(false);
        } else {
          setTouchTwoOutput(true);
          setTouchTwo(false);
        }
        break;
      }

      case "leftEye": {
        var x = document.getElementById("snackbar9");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isEyeLeft) {
          setEyeLeft(false);
        } else {
          setEyeLeft(true);
        }
        break;
      }

      case "rightEye": {
        var x = document.getElementById("snackbar10");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isEyeRight) {
          setEyeRight(false);
        } else {
          setEyeRight(true);
        }
        break;
      }

      case "buzzer": {
        var x = document.getElementById("snackbar11");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isbuzzer) {
          setbuzzer(false);
        } else {
          setbuzzer(true);
        }
        break;
      }

      case "smile1": {
        var x = document.getElementById("snackbar12");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isSimeleOne) {
          setSimleOne(false);
        } else {
          setSimleOne(true);
        }
        break;
      }

      case "smile2": {
        var x = document.getElementById("snackbar13");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isSimeleTwo) {
          setSimleTwo(false);
        } else {
          setSimleTwo(true);
        }
        break;
      }

      case "smile3": {
        var x = document.getElementById("snackbar14");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isSimeleThree) {
          setSimleThree(false);
        } else {
          setSimleThree(true);
        }

        break;
      }

      case "smile4": {
        var x = document.getElementById("snackbar15");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isSimeleFour) {
          setSimleFour(false);
        } else {
          setSimleFour(true);
        }
      }
    }
  };
  const handleFounInOneSensor = (e) => {
    switch (e.target.alt) {
      case "distancesensors": {
        var x = document.getElementById("snackbar16");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isDistanceSensors) {
          setDistanceSensors(false);
        } else {
          setDistanceSensors(true);
          setColorSensor(false);
          setGestureSensor(false);
          setLightSensor(false);
        }

        break;
      }
      case "gesturesensor": {
        var x = document.getElementById("snackbar17");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isGestureSensor) {
          setGestureSensor(false);
        } else {
          setDistanceSensors(false);
          setColorSensor(false);
          setGestureSensor(true);
          setLightSensor(false);
        }
        break;
      }
      case "lightsensor": {
        var x = document.getElementById("snackbar18");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isLightSensor) {
          setLightSensor(false);
        } else {
          setDistanceSensors(false);
          setColorSensor(false);
          setGestureSensor(false);
          setLightSensor(true);
        }
        break;
      }
      case "colorsensor": {
        var x = document.getElementById("snackbar19");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isColorSensor) {
          setColorSensor(false);
        } else {
          setDistanceSensors(false);
          setColorSensor(true);
          setGestureSensor(false);
          setLightSensor(false);
        }
        break;
      }
    }
  };

  return (
    <div className="InternalAccessoriesScreen_Main">
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
        </div>

      <div className="Item-1">
        <div className="InternalAccessoriesScreen-Item1">
          <div
            className="device"
            style={{
              width: "78%",
              height: "70%",
              backgroundImage: `url(${pcImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "76% 96%",
              backgroundPosition: "50% 50%",
              zIndex: "110",
              top: "7%",
              position: "relative",
            }}
          >
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
        </div>
        <div className="InternalAccessoriesScreen-Item2">
          <div
            className="input"
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              backgroundImage: `url(${popupcardImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 90%",
            }}
          >
            <p className="inputText" style={{ fontFamily: "Halcyon_SemiBold" }}>
              Inputs
            </p>

            <div class="inputContiner">
              <div class="container-row ">
                {isMic ? (
                  <img
                    src={micEnabled}
                    className="imgStyle"
                    alt="mic"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={mic}
                    className="imgStyle"
                    alt="mic"
                    onClick={handleEventsClick}
                  />
                )}{" "}
                {isTemperature ? (
                  <img
                    src={temperatureEnabled}
                    className="imgStyle"
                    alt="temperature"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={temperature}
                    className="imgStyle"
                    alt="temperature"
                    onClick={handleEventsClick}
                  />
                )}{" "}
              </div>
              <div class="container-row">
                {isTouchZero ? (
                  <img
                    src={touchzeroEnabled}
                    className="imgStyle"
                    alt="touch0"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchzero}
                    className="imgStyle"
                    alt="touch0"
                    onClick={handleEventsClick}
                  />
                )}
                {isTouchOne ? (
                  <img
                    src={touchoneEnabled}
                    className="imgStyle"
                    alt="touch1"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchone}
                    className="imgStyle"
                    alt="touch1"
                    onClick={handleEventsClick}
                  />
                )}

                {isTouchTwo ? (
                  <img
                    src={touchtwoEnabled}
                    className="imgStyle"
                    alt="touch2"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchtwo}
                    className="imgStyle"
                    alt="touch2"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div class="container-row">
                {isDistanceSensors ? (
                  <img
                    src={distancesensorEnabled}
                    className="imgStyle"
                    alt="distancesensors"
                    onClick={handleFounInOneSensor}
                  />
                ) : (
                  <img
                    src={distancesensor}
                    className="imgStyle"
                    alt="distancesensors"
                    onClick={handleFounInOneSensor}
                  />
                )}
                {isGestureSensor ? (
                  <img
                    src={gesturesensorEnabled}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="gesturesensor"
                  />
                ) : (
                  <img
                    src={gesturesensor}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="gesturesensor"
                  />
                )}

                {isLightSensor ? (
                  <img
                    src={lightsensorEnabled}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="lightsensor"
                  />
                ) : (
                  <img
                    src={lightsensor}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="lightsensor"
                  />
                )}

                {isColorSensor ? (
                  <img
                    src={colorsensorEnabled}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="colorsensor"
                  />
                ) : (
                  <img
                    src={colorsensor}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="colorsensor"
                  />
                )}
              </div>

    
              {isMic ? (
                <div id="snackbar1">Microphone Enabled</div>
              ) : (
                <div id="snackbar1">Microphone Disabled</div>
              )}
              {isTemperature ? (
                <div id="snackbar2">Temperature Enabled</div>
              ) : (
                <div id="snackbar2">Temperature Disabled</div>
              )}

              {isTouchZero ? (
                <div id="snackbar3">Touch pad 0 Enabled</div>
              ) : (
                <div id="snackbar3">Touch pad 0 Disabled</div>
              )}
              {isTouchOne ? (
                <div id="snackbar4">Touch pad 1 Enabled</div>
              ) : (
                <div id="snackbar4">Touch pad 1 Disabled</div>
              )}
              {isTouchTwo ? (
                <div id="snackbar5">Touch pad 2 Enabled</div>
              ) : (
                <div id="snackbar5">Touch pad 2 Disabled</div>
              )}

              {isTouchZeroOutput ? (
                <div id="snackbar6">Touch pad 0 Enabled</div>
              ) : (
                <div id="snackbar6">Touch pad 0 Disabled</div>
              )}
              {isTouchOneOutput ? (
                <div id="snackbar7">Touch pad 1 Enabled</div>
              ) : (
                <div id="snackbar7">Touch pad 1 Disabled</div>
              )}
              {isTouchTwoOutput ? (
                <div id="snackbar8">Touch pad 2 Enabled</div>
              ) : (
                <div id="snackbar8">Touch pad 2 Disabled</div>
              )}

              {isEyeLeft ? (
                <div id="snackbar9">Left Eye Enabled</div>
              ) : (
                <div id="snackbar9">Left Eye Disabled</div>
              )}
              {isEyeRight ? (
                <div id="snackbar10">Rigth Eye Enabled</div>
              ) : (
                <div id="snackbar10">Rigth Eye Disabled</div>
              )}
              {isbuzzer ? (
                <div id="snackbar11">Buzzer Enabled</div>
              ) : (
                <div id="snackbar11">Buzzer Disabled</div>
              )}

              {isSimeleOne ? (
                <div id="snackbar12">Smile 1 Enabled</div>
              ) : (
                <div id="snackbar12">Smile 1 Disabled</div>
              )}
              {isSimeleTwo ? (
                <div id="snackbar13">Smile 2 Enabled</div>
              ) : (
                <div id="snackbar13">Smile 2 Disabled</div>
              )}
              {isSimeleThree ? (
                <div id="snackbar14">Smile 3 Enabled</div>
              ) : (
                <div id="snackbar14">Smile 3 Disabled</div>
              )}
              {isSimeleFour ? (
                <div id="snackbar15">Smile 4 Enabled</div>
              ) : (
                <div id="snackbar15">Smile 4 Disabled</div>
              )}
              {isDistanceSensors ? (
                <div id="snackbar16">Distance Sensor Enabled</div>
              ) : (
                <div id="snackbar16">Distance Sensor Disabled</div>
              )}
              {isGestureSensor ? (
                <div id="snackbar17">Gesture Sensor Enabled</div>
              ) : (
                <div id="snackbar17">Gesture Sensor Disabled</div>
              )}
              {isLightSensor ? (
                <div id="snackbar18">Light Sensor Enabled</div>
              ) : (
                <div id="snackbar18">Light Sensor Disabled</div>
              )}
              {isColorSensor ? (
                <div id="snackbar19">Color Sensor Enabled</div>
              ) : (
                <div id="snackbar19">Color Sensor Disabled</div>
              )}
            </div>
          </div>
          <div
            className="output"
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              backgroundImage: `url(${popupcardImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 90%",
            }}
          >
            <p className="txtTitle" style={{ fontFamily: "Halcyon_SemiBold" }}>
              Outputs
            </p>
            <div class="outputContiner">
              <div class="container-row ">
                {isTouchZeroOutput ? (
                  <img
                    src={touchzeroEnabled}
                    className="imgStyle"
                    alt="touch0Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchzero}
                    className="imgStyle"
                    alt="touch0Output"
                    onClick={handleEventsClick}
                  />
                )}
                {isTouchOneOutput ? (
                  <img
                    src={touchoneEnabled}
                    className="imgStyle"
                    alt="touch1Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchone}
                    className="imgStyle"
                    alt="touch1Output"
                    onClick={handleEventsClick}
                  />
                )}
                {isTouchTwoOutput ? (
                  <img
                    src={touchtwoEnabled}
                    className="imgStyle"
                    alt="touch2Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchtwo}
                    className="imgStyle"
                    alt="touch2Output"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div class="container-row">
                {isEyeLeft ? (
                  <img
                    src={lefteyeEnabled}
                    className="imgStyle"
                    alt="leftEye"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={lefteye}
                    className="imgStyle"
                    alt="leftEye"
                    onClick={handleEventsClick}
                  />
                )}
                {isEyeRight ? (
                  <img
                    src={righteyeEnabled}
                    className="imgStyle"
                    alt="rightEye"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={righteye}
                    className="imgStyle"
                    alt="rightEye"
                    onClick={handleEventsClick}
                  />
                )}
                {isbuzzer ? (
                  <img
                    src={buzzerEnabled}
                    className="imgStyle"
                    alt="buzzer"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={buzzer}
                    className="imgStyle"
                    alt="buzzer"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div class="container-row">
                {isSimeleOne ? (
                  <img
                    src={smileoneEnabled}
                    className="imgStyle"
                    alt="smile1"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={smileone}
                    className="imgStyle"
                    alt="smile1"
                    onClick={handleEventsClick}
                  />
                )}

                {isSimeleTwo ? (
                  <img
                    src={smiletwoEnabled}
                    className="imgStyle"
                    alt="smile2"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={smiletwo}
                    className="imgStyle"
                    alt="smile2"
                    onClick={handleEventsClick}
                  />
                )}

                {isSimeleThree ? (
                  <img
                    src={smilethreeEnabled}
                    className="imgStyle"
                    alt="smile3"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={smilethree}
                    className="imgStyle"
                    alt="smile3"
                    onClick={handleEventsClick}
                  />
                )}

                {isSimeleFour ? (
                  <img
                    src={smilefourEnabled}
                    className="imgStyle"
                    alt="smile4"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={smilefour}
                    className="imgStyle"
                    alt="smile4"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Bottom to="/flow/selectports" prev="/visualProgram" description="Tap on the icon to select the in built Play Computer feature"/>
    </div>
  );
};

export default InternalAccessories;
