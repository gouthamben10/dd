import React, { useEffect, useState } from "react";
import "./InternalAccessoriesScreen.css";
import { connect } from "react-redux";
import io from "socket.io-client";

import PortConnections from "../../Assembly/PortConnections";
/* IMAGES  */
import Modal from "react-modal";

import {
  saveBtnActive,
  usbOFF,
  usbON,
  saveBtnInActive,
  helpBtnActive,
  helpBtnInActive,
  selectbar,
  backBtn,
  nextBtn,
  colorsensorActive,
  colorsensorInActive,
  lightsensorActive,
  lightsensorInActive,
  gesturesensorActive,
  gesturesensorInActive,
  distancesensorsActive,
  distancesensorsInActive,
  micActive,
  micInActive,
  touch0Active,
  touch0InActive,
  touch1Active,
  touch1InActive,
  touch2Active,
  touch2InActive,
  lefteyeActive,
  lefteyeInActive,
  righteyeActive,
  righteyeInActive,
  smile1Active,
  smile1InActive,
  smile2Active,
  smile2InActive,
  smile3Active,
  smile3InActive,
  smile4Active,
  smile4InActive,
  buzzerActive,
  buzzerInActive,
  devicePc,
  PcinternalMicInActive,
  PcinternalMicActive,
  PcinternalBuzzerInActive,
  PcinternalBuzzerActive,
  PcinternalTouchpadsInActive,
  PcinternalTouchpadsActive,
  PcinternalEYEInActive,
  PcinternalEYEActive,
  PcinternalTeethActive,
  PcinternalTeethInActive,
  Pcinternal4in1InActive,
  Pcinternal4in1Active,
  popupcardType,
  tempActive,
  tempInActive,
} from "../../../source/index";

import { internalaccessoriesObj } from "./InternalAccessoriesStorage";
import { Link, useHistory } from "react-router-dom";
import renderPrgImage from "../../../source/programImg";
import InternalScPrgm from "../../ReusableComponents/PrgmSlider/InternalPrgm/InternalScPrgm";

const socket = io.connect("http://localhost:3008");

// sessionStorage.setItem(
//   "interAccessoriesData",
//   JSON.stringify(internalaccessoriesObj)
// );

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "23%",
    width: " 25%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "5px solid rgb(255,140,25)",
    borderRadius: "20px",
    overflow: "initial",
    // zIndex: 1,
  },
};

function InternalAccessoriesScreen(props) {
  const history = useHistory();

  const [isDistanceSensors, setDistanceSensors] = useState(false);
  const [isGestureSensor, setGestureSensor] = useState(false);
  const [isLightSensor, setLightSensor] = useState(false);
  const [isColorSensor, setColorSensor] = useState(false);

  const [isTemperature, setTemperature] = useState(false);
  const [isMic, setMic] = useState(false);

  // input
  const [isTouchZero, setTouchZero] = useState(false);
  const [isTouchOne, setTouchOne] = useState(false);
  const [isTouchTwo, setTouchTwo] = useState(false);

  // outPut
  const [isTouchZeroOutput, setTouchZeroOutput] = useState(false);
  const [isTouchOneOutput, setTouchOneOutput] = useState(false);
  const [isTouchTwoOutput, setTouchTwoOutput] = useState(false);

  const [isLeftEye, setEyeLeft] = useState(false);
  const [isRightEye, setEyeRight] = useState(false);
  const [isbuzzer, setbuzzer] = useState(false);

  const [isSmileOne, setSimleOne] = useState(false);
  const [isSmileTwo, setSimleTwo] = useState(false);
  const [isSmileThree, setSimleThree] = useState(false);
  const [isSmileFour, setSimleFour] = useState(false);

  const [erasedProgram, setErasedProgram] = useState(false);

  const [isusb, setUsb] = useState(false);

  // const [isColorSensor, setColorSensor] = useState(false);

  const styleInput = {
    width: "50%",
    height: "100%",
    position: "relative",
    backgroundImage: `url(${renderPrgImage("popupcardType")})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 90%",
    // backgroundSize: "contain",
  };

  const styleoutput = {
    width: "50%",
    height: "100%",
    position: "relative",
    backgroundImage: `url(${renderPrgImage("popupcardType")})`,
    backgroundRepeat: "no-repeat",
    // backgroundSize: "contain",
    backgroundSize: "100% 90%",
  };

  const styleTile = {};

  const styleDevicePC = {
    width: "78%",
    height: "70%",

    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/Bisoft_UI/Main/PNG/PC_image@3x.png"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "76% 96%",
    backgroundPosition: "50% 50%",
    zIndex: 110,
    top: "7%",
    position: "relative",
  };

  useEffect(() => {
    socket.emit("_usbDetection", "Hi i am firoz");
    socket.on("/usbDetection1", (data) => {
      console.log("...............1", data);
      // let kill = Array.from(data);
      // console.log("...............5", kill);
      if (data == 1) {
        setUsb(true);
        console.log("LLLLLLLLLLLLLLL", data);
      } else {
        setUsb(false);
      }
    });
    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      setUsb(true);
      console.log("LLLLLLLLLLLLLLL", data);
    } else {
      setUsb(false);
    }
  });

  const handleFounInOneSensor = (e) => {
    switch (e.target.alt) {
      case "distancesensors": {
        if (isDistanceSensors) {
          internalaccessoriesObj.Four_in_one_sensor.isDistanceSensors = false;
          props.selecteComponent({ isDistanceSensors: false });

          setDistanceSensors(false);
          var x = document.getElementById("snackbar16");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({
            isDistanceSensors: true,
            isColorSensor: false,
            isLightSensor: false,
            isGestureSensor: false,
          });

          internalaccessoriesObj.Four_in_one_sensor.isColorSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isLightSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isGestureSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isDistanceSensors = true;
          setDistanceSensors(true);
          setColorSensor(false);
          setGestureSensor(false);
          setLightSensor(false);

          var x = document.getElementById("snackbar16");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }

        break;
      }
      case "gesturesensor": {
        if (isGestureSensor) {
          props.selecteComponent({ isGestureSensor: false });
          internalaccessoriesObj.Four_in_one_sensor.isGestureSensor = false;
          setGestureSensor(false);
          var x = document.getElementById("snackbar17");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({
            isDistanceSensors: false,
            isColorSensor: false,
            isLightSensor: false,
            isGestureSensor: true,
          });

          internalaccessoriesObj.Four_in_one_sensor.isColorSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isLightSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isGestureSensor = true;
          internalaccessoriesObj.Four_in_one_sensor.isDistanceSensors = false;
          setDistanceSensors(false);
          setColorSensor(false);
          setGestureSensor(true);
          setLightSensor(false);
          var x = document.getElementById("snackbar17");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }
      case "lightsensor": {
        if (isLightSensor) {
          internalaccessoriesObj.Four_in_one_sensor.isLightSensor = false;
          props.selecteComponent({ isLightSensor: false });

          setLightSensor(false);
          var x = document.getElementById("snackbar18");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({
            isDistanceSensors: false,
            isColorSensor: false,
            isLightSensor: true,
            isGestureSensor: false,
          });

          internalaccessoriesObj.Four_in_one_sensor.isColorSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isLightSensor = true;
          internalaccessoriesObj.Four_in_one_sensor.isGestureSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isDistanceSensors = false;
          setDistanceSensors(false);
          setColorSensor(false);
          setGestureSensor(false);
          setLightSensor(true);
          var x = document.getElementById("snackbar18");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }
      case "colorsensor": {
        if (isColorSensor) {
          internalaccessoriesObj.Four_in_one_sensor.isColorSensor = false;
          props.selecteComponent({ isColorSensor: false });

          setColorSensor(false);
          var x = document.getElementById("snackbar19");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({
            isDistanceSensors: false,
            isColorSensor: true,
            isLightSensor: false,
            isGestureSensor: false,
          });
          internalaccessoriesObj.Four_in_one_sensor.isColorSensor = true;
          internalaccessoriesObj.Four_in_one_sensor.isLightSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isGestureSensor = false;
          internalaccessoriesObj.Four_in_one_sensor.isDistanceSensors = false;
          setDistanceSensors(false);
          setColorSensor(true);
          setGestureSensor(false);
          setLightSensor(false);
          var x = document.getElementById("snackbar19");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }
    }
  };

  const handleEventsClick = (e) => {
    switch (e.target.alt) {
      case "mic": {
        if (isMic) {
          internalaccessoriesObj.isMic = false;
          props.selecteComponent({ isMic: false });
          setMic(false);
          var x = document.getElementById("snackbar1");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          internalaccessoriesObj.isMic = true;
          props.selecteComponent({ isMic: true });

          setMic(true);
          var x = document.getElementById("snackbar1");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "temperature": {
        if (isTemperature) {
          internalaccessoriesObj.isTemperature = false;

          props.selecteComponent({ isTemperature: false });

          setTemperature(false);
          var x = document.getElementById("snackbar2");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          internalaccessoriesObj.isTemperature = true;
          props.selecteComponent({ isTemperature: true });

          setTemperature(true);
          var x = document.getElementById("snackbar2");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "touch0": {
        if (isTouchZero) {
          props.selecteComponent({ isTouchZero: false });

          internalaccessoriesObj.isTouchZero = false;
          setTouchZero(false);
          var x = document.getElementById("snackbar3");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({
            isTouchZero: true,
            isTouchZeroOutput: false,
          });

          internalaccessoriesObj.isTouchZero = true;
          internalaccessoriesObj.isTouchZeroOutput = false;

          setTouchZero(true);
          setTouchZeroOutput(false);
          var x = document.getElementById("snackbar3");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "touch1": {
        if (isTouchOne) {
          props.selecteComponent({ isTouchOne: false });

          internalaccessoriesObj.isTouchOne = false;
          setTouchOne(false);
          var x = document.getElementById("snackbar4");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isTouchOne: true, isTouchOneOutput: false });

          internalaccessoriesObj.isTouchOne = true;
          internalaccessoriesObj.isTouchOneOutput = false;

          setTouchOne(true);
          setTouchOneOutput(false);
          var x = document.getElementById("snackbar4");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }
      case "touch2": {
        if (isTouchTwo) {
          props.selecteComponent({ isTouchTwo: false });

          internalaccessoriesObj.isTouchTwo = false;
          setTouchTwo(false);
          var x = document.getElementById("snackbar5");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isTouchTwo: true, isTouchTwoOutput: false });

          internalaccessoriesObj.isTouchTwo = true;
          internalaccessoriesObj.isTouchTwoOutput = false;

          setTouchTwo(true);
          setTouchTwoOutput(false);
          var x = document.getElementById("snackbar5");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "touch0Output": {
        if (isTouchZeroOutput) {
          props.selecteComponent({ isTouchZeroOutput: false });

          internalaccessoriesObj.isTouchZeroOutput = false;
          setTouchZeroOutput(false);
          var x = document.getElementById("snackbar6");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({
            isTouchZeroOutput: true,
            isTouchZero: false,
          });

          internalaccessoriesObj.isTouchZeroOutput = true;
          internalaccessoriesObj.isTouchZero = false;

          setTouchZeroOutput(true);
          setTouchZero(false);
          var x = document.getElementById("snackbar6");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }
      case "touch1Output": {
        if (isTouchOneOutput) {
          props.selecteComponent({ isTouchOneOutput: false });
          internalaccessoriesObj.isTouchOneOutput = false;
          setTouchOneOutput(false);

          var x = document.getElementById("snackbar7");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isTouchOneOutput: true, isTouchOne: false });

          internalaccessoriesObj.isTouchOneOutput = true;
          internalaccessoriesObj.isTouchOne = false;

          setTouchOneOutput(true);
          setTouchOne(false);
          var x = document.getElementById("snackbar7");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "touch2Output": {
        if (isTouchTwoOutput) {
          props.selecteComponent({ isTouchTwoOutput: false });
          internalaccessoriesObj.isTouchTwoOutput = false;
          setTouchTwoOutput(false);
          var x = document.getElementById("snackbar8");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isTouchTwoOutput: true, isTouchTwo: false });

          internalaccessoriesObj.isTouchTwoOutput = true;
          internalaccessoriesObj.isTouchTwo = false;

          setTouchTwoOutput(true);
          setTouchTwo(false);
          var x = document.getElementById("snackbar8");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "leftEye": {
        if (isLeftEye) {
          props.selecteComponent({ isLeftEye: false });

          internalaccessoriesObj.isLeftEye = false;
          setEyeLeft(false);
          var x = document.getElementById("snackbar9");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isLeftEye: true });

          internalaccessoriesObj.isLeftEye = true;

          setEyeLeft(true);
          var x = document.getElementById("snackbar9");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "rightEye": {
        if (isRightEye) {
          props.selecteComponent({ isRightEye: false });

          internalaccessoriesObj.isRightEye = false;
          setEyeRight(false);
          var x = document.getElementById("snackbar10");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isRightEye: true });

          internalaccessoriesObj.isRightEye = true;
          setEyeRight(true);
          var x = document.getElementById("snackbar10");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "buzzer": {
        if (isbuzzer) {
          props.selecteComponent({ isbuzzer: false });

          internalaccessoriesObj.isbuzzer = false;
          setbuzzer(false);
          var x = document.getElementById("snackbar11");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isbuzzer: true });

          internalaccessoriesObj.isbuzzer = true;
          setbuzzer(true);
          var x = document.getElementById("snackbar11");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "smile1": {
        if (isSmileOne) {
          props.selecteComponent({ isSmileOne: false });

          internalaccessoriesObj.isSmileOne = false;
          setSimleOne(false);
          var x = document.getElementById("snackbar12");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isSmileOne: true });
          internalaccessoriesObj.isSmileOne = true;
          setSimleOne(true);
          var x = document.getElementById("snackbar12");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "smile2": {
        if (isSmileTwo) {
          props.selecteComponent({ isSmileTwo: false });

          internalaccessoriesObj.isSmileTwo = false;
          setSimleTwo(false);
          var x = document.getElementById("snackbar13");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isSmileTwo: true });

          internalaccessoriesObj.isSmileTwo = true;
          setSimleTwo(true);
          var x = document.getElementById("snackbar13");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
        break;
      }

      case "smile3": {
        if (isSmileThree) {
          props.selecteComponent({ isSmileThree: false });

          internalaccessoriesObj.isSmileThree = false;
          setSimleThree(false);
          var x = document.getElementById("snackbar14");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isSmileThree: true });

          internalaccessoriesObj.isSmileThree = true;
          setSimleThree(true);
          var x = document.getElementById("snackbar14");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }

        break;
      }

      case "smile4": {
        if (isSmileFour) {
          props.selecteComponent({ isSmileFour: false });

          internalaccessoriesObj.isSmileFour = false;
          setSimleFour(false);
          var x = document.getElementById("snackbar15");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        } else {
          props.selecteComponent({ isSmileFour: true });

          internalaccessoriesObj.isSmileFour = true;
          setSimleFour(true);
          var x = document.getElementById("snackbar15");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 1000);
        }
      }
    }
  };

  const backBtnAction = () => {
    setErasedProgram(true);
  };

  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };

  const shouldErase = (info) => {
    if (info == "Yes") {
      sessionStorage.removeItem("Index");
      props.indexData.concept.Index = [];
      props.history.push("/programSelection");
      window.location.reload();
    } else {
      setErasedProgram(false);
    }
  };

  var dataErased = (
    <Modal
      isOpen={erasedProgram}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="erasedConceptMsg" style={{ zIndex: "999" }}>
        <p>All Unsaved program will be Erased, Continue ?</p>
        <button
          className="BtnPopup"
          onClick={() => shouldErase("Yes")}
          style={{ position: "relative", top: "-7px" }}
        >
          Yes
        </button>
        <button
          className="BtnPopup"
          onClick={() => shouldErase("No")}
          style={{ position: "relative", top: "-7px", left: "10px" }}
        >
          No
        </button>
      </div>
    </Modal>
  );

  const next = () => {
    history.push("/selectScreen/ExternalAccessories");
  };

  sessionStorage.setItem("assemblyCheckbox", JSON.stringify(null));

  useEffect(() => {
    if (
      isDistanceSensors ||
      isGestureSensor ||
      isLightSensor ||
      isColorSensor
    ) {
      console.log("heeeeeeeeehehehehhhhhhhhhhhhhhhhhhhhhh, calling yes");
      internalaccessoriesObj.isFour_in_one_sensor = true;
      props.selecteComponent({ isFour_in_one_sensor: true });
    } else {
      console.log("heeeeeeeeehehehehhhhhhhhhhhhhhhhhhhhhh, calling no");

      internalaccessoriesObj.isFour_in_one_sensor = false;
      props.selecteComponent({ isFour_in_one_sensor: false });
    }
  }, [isDistanceSensors, isGestureSensor, isLightSensor, isColorSensor]);

  // return <div className="InternalAccessoriesScreen_Main"></div>;
  return (
    <div className="InternalAccessoriesScreen_Main">
      <div className="navbarContainer">
        <div className="navbar_content">
          <div className="navbar_new isActive">Select</div>
          <div className="navbar_new">Assemble</div>
          <div className="navbar_new">Create</div>
          <div className="navbar_new">Simulate</div>
        </div>

        <img
          src={renderPrgImage("selectbar")}
          style={{ height: "100%", width: "15%" }}
        />

        <div className="navbar-Action">
          <img
            src={renderPrgImage("saveBtnActive")}
            className="iconBtnSize"
            style={{ marginRight: "25px" }}
          />

          {isHelp == false ? (
            <img
              className="iconBtnSize"
              src={renderPrgImage("helpBtnInActive")}
              style={{ marginRight: "25%" }}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className="Ss_slide">
              {" "}
              <InternalScPrgm />{" "}
            </div>
          )}
          {isHelp ? (
            <img
              className="helpClo"
              src={renderPrgImage("closBtn")}
              onClick={handleHelpBtn}
            ></img>
          ) : null}

          {isusb ? (
            <img src={renderPrgImage("usbON")}></img>
          ) : (
            <img src={renderPrgImage("usbOFF")}></img>
          )}
        </div>
      </div>

      {dataErased}

      <div className="Item-1">
        <div className="InternalAccessoriesScreen-Item1">
          {/* <img src={renderPrgImage devicePc} className="devicePc" /> */}

          <div style={styleDevicePC} className="device">
            <div className="deviceContainer">
              {props.indexData.concept.internalaccessories.isLeftEye ? (
                <img
                  src={renderPrgImage("PcinternalEYEActive")}
                  className="imgStyleEyeL"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalEYEInActive")}
                  className="imgStyleEyeL"
                />
              )}

              {props.indexData.concept.internalaccessories.isRightEye ? (
                <img
                  src={renderPrgImage("PcinternalEYEActive")}
                  className="imgStyleEyeR"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalEYEInActive")}
                  className="imgStyleEyeR"
                />
              )}

              {props.indexData.concept.internalaccessories.isSmileOne ? (
                <img
                  src={renderPrgImage("PcinternalTeethActive")}
                  className="imgStyleTeeth1"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalTeethInActive")}
                  className="imgStyleTeeth1"
                />
              )}

              {props.indexData.concept.internalaccessories.isSmileTwo ? (
                <img
                  src={renderPrgImage("PcinternalTeethActive")}
                  className="imgStyleTeeth2"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalTeethInActive")}
                  className="imgStyleTeeth2"
                />
              )}

              {props.indexData.concept.internalaccessories.isSmileThree ? (
                <img
                  src={renderPrgImage("PcinternalTeethActive")}
                  className="imgStyleTeeth3"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalTeethInActive")}
                  className="imgStyleTeeth3"
                />
              )}

              {props.indexData.concept.internalaccessories.isSmileFour ? (
                <img
                  src={renderPrgImage("PcinternalTeethActive")}
                  className="imgStyleTeeth4"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalTeethInActive")}
                  className="imgStyleTeeth4"
                />
              )}

              {props.indexData.concept.internalaccessories.Four_in_one_sensor
                .isDistanceSensors ||
              props.indexData.concept.internalaccessories.Four_in_one_sensor
                .isColorSensor ||
              props.indexData.concept.internalaccessories.Four_in_one_sensor
                .isGestureSensor ||
              props.indexData.concept.internalaccessories.Four_in_one_sensor
                .isLightSensor ? (
                <img
                  src={renderPrgImage("Pcinternal4in1Active")}
                  className="imgStyle4in1"
                />
              ) : (
                <img
                  src={renderPrgImage("Pcinternal4in1InActive")}
                  className="imgStyle4in1"
                />
              )}

              {props.indexData.concept.internalaccessories.isMic ? (
                <img
                  src={renderPrgImage("PcinternalMicActive")}
                  className="imgStyleMic"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalMicInActive")}
                  className="imgStyleMic"
                />
              )}

              {props.indexData.concept.internalaccessories.isbuzzer ? (
                <img
                  src={renderPrgImage("PcinternalBuzzerActive")}
                  className="imgStyleBuzzer"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalBuzzerInActive")}
                  className="imgStyleBuzzer"
                />
              )}

              {props.indexData.concept.internalaccessories.isTouchZero ? (
                <img
                  src={renderPrgImage("PcinternalTouchpadsActive")}
                  className="imgStyleTouchpads1"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalTouchpadsInActive")}
                  className="imgStyleTouchpads1"
                />
              )}

              {props.indexData.concept.internalaccessories.isTouchOne ? (
                <img
                  src={renderPrgImage("PcinternalTouchpadsActive")}
                  className="imgStyleTouchpads2"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalTouchpadsInActive")}
                  className="imgStyleTouchpads2"
                />
              )}

              {props.indexData.concept.internalaccessories.isTouchTwo ? (
                <img
                  src={renderPrgImage("PcinternalTouchpadsActive")}
                  className="imgStyleTouchpads3"
                />
              ) : (
                <img
                  src={renderPrgImage("PcinternalTouchpadsInActive")}
                  className="imgStyleTouchpads3"
                />
              )}
            </div>
          </div>
        </div>

        <div className="InternalAccessoriesScreen-Item2">
          <div className="input" style={styleInput}>
            <p className="inputText" style={{ fontFamily: "Halcyon_SemiBold" }}>
              Inputs
            </p>
            <div className="inputContiner">
              <div className="container-row ">
                {props.indexData.concept.internalaccessories.isMic ? (
                  <img
                    src={renderPrgImage("micActive")}
                    className="imgStyle"
                    alt="mic"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("micInActive")}
                    className="imgStyle"
                    alt="mic"
                    onClick={handleEventsClick}
                  />
                )}{" "}
                {props.indexData.concept.internalaccessories.isTemperature ? (
                  <img
                    src={renderPrgImage("tempActive")}
                    className="imgStyle"
                    alt="temperature"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("tempInActive")}
                    className="imgStyle"
                    alt="temperature"
                    onClick={handleEventsClick}
                  />
                )}{" "}
              </div>
              <div className="container-row">
                {props.indexData.concept.internalaccessories.isTouchZero ? (
                  <img
                    src={renderPrgImage("touch0Active")}
                    className="imgStyle"
                    alt="touch0"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("touch0InActive")}
                    className="imgStyle"
                    alt="touch0"
                    onClick={handleEventsClick}
                  />
                )}

                {props.indexData.concept.internalaccessories.isTouchOne ? (
                  <img
                    src={renderPrgImage("touch1Active")}
                    className="imgStyle"
                    alt="touch1"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("touch1InActive")}
                    className="imgStyle"
                    alt="touch1"
                    onClick={handleEventsClick}
                  />
                )}

                {props.indexData.concept.internalaccessories.isTouchTwo ? (
                  <img
                    src={renderPrgImage("touch2Active")}
                    className="imgStyle"
                    alt="touch2"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("touch2InActive")}
                    className="imgStyle"
                    alt="touch2"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div className="container-row">
                {props.indexData.concept.internalaccessories.Four_in_one_sensor
                  .isDistanceSensors ? (
                  <img
                    src={renderPrgImage("distancesensorsActive")}
                    className="imgStyle"
                    alt="distancesensors"
                    onClick={handleFounInOneSensor}
                  />
                ) : (
                  <img
                    src={renderPrgImage("distancesensorsInActive")}
                    className="imgStyle"
                    alt="distancesensors"
                    onClick={handleFounInOneSensor}
                  />
                )}

                {props.indexData.concept.internalaccessories.Four_in_one_sensor
                  .isGestureSensor ? (
                  <img
                    src={renderPrgImage("gesturesensorActive")}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="gesturesensor"
                  />
                ) : (
                  <img
                    src={renderPrgImage("gesturesensorInActive")}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="gesturesensor"
                  />
                )}

                {props.indexData.concept.internalaccessories.Four_in_one_sensor
                  .isLightSensor ? (
                  <img
                    src={renderPrgImage("lightsensorActive")}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="lightsensor"
                  />
                ) : (
                  <img
                    src={renderPrgImage("lightsensorInActive")}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="lightsensor"
                  />
                )}

                {props.indexData.concept.internalaccessories.Four_in_one_sensor
                  .isColorSensor ? (
                  <img
                    src={renderPrgImage("colorsensorActive")}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="colorsensor"
                  />
                ) : (
                  <img
                    src={renderPrgImage("colorsensorInActive")}
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

              {isLeftEye ? (
                <div id="snackbar9">Left Eye Enabled</div>
              ) : (
                <div id="snackbar9">Left Eye Disabled</div>
              )}
              {isRightEye ? (
                <div id="snackbar10">Rigth Eye Enabled</div>
              ) : (
                <div id="snackbar10">Rigth Eye Disabled</div>
              )}
              {isbuzzer ? (
                <div id="snackbar11">Buzzer Enabled</div>
              ) : (
                <div id="snackbar11">Buzzer Disabled</div>
              )}

              {isSmileOne ? (
                <div id="snackbar12">Smile 1 Enabled</div>
              ) : (
                <div id="snackbar12">Smile 1 Disabled</div>
              )}
              {isSmileTwo ? (
                <div id="snackbar13">Smile 2 Enabled</div>
              ) : (
                <div id="snackbar13">Smile 2 Disabled</div>
              )}
              {isSmileThree ? (
                <div id="snackbar14">Smile 3 Enabled</div>
              ) : (
                <div id="snackbar14">Smile 3 Disabled</div>
              )}
              {isSmileFour ? (
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

          <div className="onput" style={styleoutput}>
            <p className="txtTitle">Outputs</p>
            <div className="outputContiner">
              <div className="container-row">
                {props.indexData.concept.internalaccessories
                  .isTouchZeroOutput ? (
                  <img
                    src={renderPrgImage("touch0Active")}
                    className="imgStyle"
                    alt="touch0Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("touch0InActive")}
                    className="imgStyle"
                    alt="touch0Output"
                    onClick={handleEventsClick}
                  />
                )}

                {props.indexData.concept.internalaccessories
                  .isTouchOneOutput ? (
                  <img
                    src={renderPrgImage("touch1Active")}
                    className="imgStyle"
                    alt="touch1Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("touch1InActive")}
                    className="imgStyle"
                    alt="touch1Output"
                    onClick={handleEventsClick}
                  />
                )}

                {props.indexData.concept.internalaccessories
                  .isTouchTwoOutput ? (
                  <img
                    src={renderPrgImage("touch2Active")}
                    className="imgStyle"
                    alt="touch2Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("touch2InActive")}
                    className="imgStyle"
                    alt="touch2Output"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div className="container-row">
                {" "}
                {props.indexData.concept.internalaccessories.isLeftEye ? (
                  <img
                    src={renderPrgImage("lefteyeActive")}
                    className="imgStyle"
                    alt="leftEye"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("lefteyeInActive")}
                    className="imgStyle"
                    alt="leftEye"
                    onClick={handleEventsClick}
                  />
                )}
                {props.indexData.concept.internalaccessories.isRightEye ? (
                  <img
                    src={renderPrgImage("righteyeActive")}
                    className="imgStyle"
                    alt="rightEye"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("righteyeInActive")}
                    className="imgStyle"
                    alt="rightEye"
                    onClick={handleEventsClick}
                  />
                )}
                {props.indexData.concept.internalaccessories.isbuzzer ? (
                  <img
                    src={renderPrgImage("buzzerActive")}
                    className="imgStyle"
                    alt="buzzer"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("buzzerInActive")}
                    className="imgStyle"
                    alt="buzzer"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div className="container-row">
                {props.indexData.concept.internalaccessories.isSmileOne ? (
                  <img
                    src={renderPrgImage("smile1Active")}
                    className="imgStyle"
                    alt="smile1"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("smile1InActive")}
                    className="imgStyle"
                    alt="smile1"
                    onClick={handleEventsClick}
                  />
                )}

                {props.indexData.concept.internalaccessories.isSmileTwo ? (
                  <img
                    src={renderPrgImage("smile2Active")}
                    className="imgStyle"
                    alt="smile2"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("smile2InActive")}
                    className="imgStyle"
                    alt="smile2"
                    onClick={handleEventsClick}
                  />
                )}

                {props.indexData.concept.internalaccessories.isSmileThree ? (
                  <img
                    src={renderPrgImage("smile3Active")}
                    className="imgStyle"
                    alt="smile3"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("smile3InActive")}
                    className="imgStyle"
                    alt="smile3"
                    onClick={handleEventsClick}
                  />
                )}

                {props.indexData.concept.internalaccessories.isSmileFour ? (
                  <img
                    src={renderPrgImage("smile4Active")}
                    className="imgStyle"
                    alt="smile4"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={renderPrgImage("smile4InActive")}
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

      {/* BOTTOM BACK,NEXT BTN and discription*/}
      <div className="SelectScreenBottom">
        <div className="bottom-child">
          {/* <Link to="/programSelection"> */}
          <img
            className="iconBtnSize imgBackBtn"
            src={renderPrgImage("backBtn")}
            onClick={backBtnAction}
          />
          {/* </Link> */}
          <div
            className="decription"
            style={{ fontFamily: "Halcyon_SemiBold", zIndex: "-10" }}
          >
            <p>Select the internal accessories of Play Computer</p>
          </div>

          <img
            className="iconBtnSize imgNextBtn"
            src={renderPrgImage("nextBtn")}
            onClick={next}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // return state;
  return {
    indexData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selecteComponent: (data) => {
      dispatch({ type: "INTERNAL_ACCESSORIES", payload: data });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalAccessoriesScreen);
