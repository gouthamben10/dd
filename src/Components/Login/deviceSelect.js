import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import DeviceSelectStyle from "./DeviceSelect.module.css";
import { webSerialAction } from "../../redux/actions/index";
import { connect } from "react-redux";

import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import {
  backBtn,
  helpBtnActive,
  helpBtnInActive,
  devices,
  Computer,
  Pc,
  reconnect,
  skip,
  clos,
  Connect,
} from "../../source/index";
import { data } from "@tensorflow/tfjs";
import renderImage from "../../source/importImg";

const ENDPOINT = "localhost:3008";
let socket = socketIOClient("http://localhost:3008");

const DeviceSelect = (props) => {
  const [variDevice, setvariDevice] = useState(false);
  useEffect(() => {
    socket.emit("_usbDetection", "Hi i am firoz");
    socket.on("/usbDetection", (data) => {
      console.log("...............0", data);
      if (data == { detected: true }) {
        console.log("trur");
        let data1 = 1;
        socket.emit("/connected", data1);
      }
    });
  });

  let history = useHistory();

  useEffect(() => {
    if (variDevice) history.push("/Selection");
  });

  const gobackUrl = () => {
    history.push("/biboxSelection");
  };

  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };

  const scanDevice = () => {
    console.log("clicked");

    socket.emit("/scanDevice", (data) => {
      // console.log(data,'////////////////////////////////')
    });
    // alert();
    // socket.emit("/scanclick", (data) => {
    //   data = 1;
    // });
  };
  socket.on("/verifiedDevice", (res) => {
    setvariDevice(res);
    // console.log(res,"response come from server")
  });

  // async function connect() {
  //   let port = await navigator.serial.requestPort();
  //   // - Wait for the port to open.
  //   await port.open({ baudRate: 115200 });
  //   console.log("Open");

  //   // const decoder = new TextDecoderStream();
  //   // const inputDone = port.readable.pipeTo(decoder.writable);
  //   // let inputStream = decoder.readable;
  //   // const encoder = new TextEncoderStream();
  //   // const outputDone = encoder.readable.pipeTo(port.writable);
  //   // let outputStream = encoder.writable;
  //   // let reader = inputStream.getReader();
  //   // readLoop();
  // }
  const [p1, setP1] = useState({
    selected: false,
    port: {},
  });

  useEffect(async () => {
    try {
      const portList = await navigator.serial.getPorts();

      if (portList.length === 1) {
        console.log(portList, "Hardware connected");
        var user = 1;
        sessionStorage.setItem("user", JSON.stringify(user));
        props.webSerialAction({ port: portList[0] }); // dispatching function of redux

        setP1({
          selected: true,
          port: portList[0],
        });
      } else {
        console.log("No hardware");
        var user = 0;
        sessionStorage.setItem("user", JSON.stringify(user));
        setP1({ p1 });
      }
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className={DeviceSelectStyle.Connect_Device}>
      <div className={DeviceSelectStyle.Connect_Header}>
        {isHelp ? (
          <div>
            <img
              className={DeviceSelectStyle.back_btn}
              style={{ zIndex: "-1" }}
              src={renderImage("backBtn")}
              onClick={gobackUrl}
            ></img>{" "}
          </div>
        ) : (
          <div>
            <img
              className={DeviceSelectStyle.back_btn}
              src={renderImage("backBtn")}
              onClick={gobackUrl}
            ></img>{" "}
          </div>
        )}
        {isHelp ? (
          <div>
            <p
              className={DeviceSelectStyle.PlayComp_txt}
              style={{ zIndex: "-1" }}
            >
              Play Computer
            </p>
          </div>
        ) : (
          <div>
            <p className={DeviceSelectStyle.PlayComp_txt}>Play Computer</p>
          </div>
        )}

        <div></div>
        <div>
          {isHelp == false ? (
            <img
              className={DeviceSelectStyle.helpBtn}
              src={renderImage("helpBtnInActive")}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className={DeviceSelectStyle.modall}>
              <div className={DeviceSelectStyle.instr}>
                <p className={DeviceSelectStyle.instr_P}>
                  {" "}
                  Help Button will explain all the features and functionality of
                  the entire app for each screen{" "}
                </p>
              </div>
              <div className={DeviceSelectStyle.instr2}>
                <p className={DeviceSelectStyle.instr2_P}>
                  Manual scan will list all the Playcomputer devices if multiple
                  devices are ON
                </p>
              </div>
              <div className={DeviceSelectStyle.instr3}>
                <p className={DeviceSelectStyle.instr3_P}>
                  Add Button to add or scan for new devices you like to program{" "}
                </p>
              </div>
              <img src={renderImage("Connect")}></img>
            </div>
          )}
          {isHelp ? (
            <div>
              <img
                className={DeviceSelectStyle.Cross}
                src={renderImage("clos")}
                onClick={handleHelpBtn}
              ></img>
            </div>
          ) : null}
          {/* <img className="DeviceSelectStyle.Help_btn" src={help}></img> */}
        </div>
        {isHelp ? (
          <div style={{ zIndex: "-1" }}>
            <img
              className={DeviceSelectStyle.Devices_Button}
              src={renderImage("devices")}
            ></img>
          </div>
        ) : (
          <div>
            <img
              className={DeviceSelectStyle.Devices_Button}
              src={renderImage("devices")}
            ></img>
          </div>
        )}
      </div>
      <div className={DeviceSelectStyle.Connect_div}>
        <img
          className={DeviceSelectStyle.Pc_Image}
          src={renderImage("Pc")}
        ></img>
        <img
          className={DeviceSelectStyle.Computer_Img}
          src={renderImage("Computer")}
        ></img>
      </div>
      <div></div>
      <div>
        <img
          className={DeviceSelectStyle.Scan_Button}
          src={renderImage("reconnect")}
          onClick={() => {
            scanDevice();
            // connect();
          }}
        ></img>
        {/* <Link to="/Connect"> */}
        <h4
          className={DeviceSelectStyle.Scan_txt}
          onClick={scanDevice}
          // onClick={gobackUrl}
        >
          Scan Device
        </h4>
      </div>
      {/* <button className="DeviceSelectStyle.scanDevice" onClick={scanDevice}>
        Scan Device
      </button> */}
      {isHelp ? (
        <div
          className={DeviceSelectStyle.Connect_Footer}
          style={{ zIndex: "-1" }}
        >
          <div>
            <p className={DeviceSelectStyle.Instructions}>
              Connect the Play Computer to your system using the USB cable
              provided
            </p>
          </div>
          <Link to="/conformation">
            <div>
              <img
                className={DeviceSelectStyle.Skip_Button}
                src={renderImage("skip")}
              ></img>
            </div>
          </Link>
        </div>
      ) : (
        <div className={DeviceSelectStyle.Connect_Footer}>
          <div>
            <p className={DeviceSelectStyle.Instructions}>
              Connect the Play Computer to your system using the USB cable
              provided
            </p>
          </div>
          <Link to="/conformation">
            <div>
              <img
                className={DeviceSelectStyle.Skip_Button}
                src={renderImage("skip")}
              ></img>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

// export default DeviceSelect;
const mapStateToProps = (state) => {
  return {
    webserialPort: state.webSerial,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    webSerialAction: (data) => {
      console.log("mapDispatchToProps", data);
      dispatch(webSerialAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceSelect);
