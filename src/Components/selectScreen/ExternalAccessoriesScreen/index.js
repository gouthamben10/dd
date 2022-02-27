import { React, useEffect } from "react";
// import "./ExternalAccessories.css";
import "./ExternalAccessories.css";
import { createBrowserHistory } from "history";
import io from "socket.io-client";

import CenterMode from "../../concept/index";

import {
  saveBtnActive,
  usbOFF,
  usbON,
  saveBtnInActive,
  helpBtnActive,
  helpBtnInActive,
  bluetoothBtnActive,
  bluetoothBtnInActive,
  backBtn,
  nextBtn,
  toggle,
  externalAccessoriesBtnAtive,
  externalAccessoriesBtnInAtive,
  pcInternalSensorsActive,
  pcInternalSensorsInActive,
  selectbar,
} from "../../../source/index";
import { useState } from "react";
import renderPrgImage from "../../../source/programImg";
import EXternalScPrgm from "../../ReusableComponents/PrgmSlider/ExternalPrgm/ExternalScPrgm";

const socket = io.connect("http://localhost:3008");

// const history = createBrowserHistory();
function ExternalAccessoriesScreen(props) {
  console.log("props history", props);
  const [isusb, setUsb] = useState(false);

  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
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

  return (
    <div className="ExternalAccessories-Main">
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

          {/* <img
            className="iconBtnSize"
            src={renderPrgImage("helpBtnInActive")}
            style={{ marginRight: "25px" }}
          /> */}

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
              <EXternalScPrgm />{" "}
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

      <div style={{ width: "100%", height: "90vh" }}>
        <CenterMode history={props.history} />
      </div>

      {/* <CenterMode history={props.history} /> */}
    </div>
  );
}

export default ExternalAccessoriesScreen;
