import React, { Component } from "react";
import Sidebar from "./sidebar";
import { Link, useLocation, withRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import WorkSpace from "./workspace";
import { connect } from "react-redux";
import Sizes, { width } from "../../helpers/Sizes";
import Hammer from "react-hammerjs";
import CustomDragLayer from "./CustomDragLayer";
import "../../css/assembly.css";
import "../../css/pure-grids.min.css";
import socketIOClient from "socket.io-client";
import { createBrowserHistory } from "history";
import Modal from "react-modal";
import PortConnections from "./PortConnections";
import CheckboxAssembly from "./CheckboxAssembly";
import { activeCheckBox } from "./CheckboxData";
import $, { type } from "jquery";
import html2canvas from "html2canvas";
import renderPrgImage from "../../source/programImg";
import unicodeToChar from "../../utils/unicodeToChar";
import PortConnect from "../../utils/portConnect";
import { webSerialAction } from "../../redux/actions/index";

import {
  bluetoothBtnActive,
  helpBtnInActive,
  saveBtnActive,
  saveBtnInActive,
  assemblebar,
  readPC,
  readPCActive,
  readPCInActive,
  backBtn,
  nextBtn,
  pcInternalSensorsInActive,
  closeBtnShadow,
  propertypanel,
  distancesensorsActive,
  distancesensorsInActive,
  gesturesensorActive,
  gesturesensorInActive,
  // lightsensorActive,
  lightsensorInActive,
  colorsensorActive,
  colorsensorInActive,
  usbOFF,
  usbON,
} from "../../source/index";
import AssemblyPrgm from "../ReusableComponents/PrgmSlider/AssemblyPrgm/AssemblyPrgm";

var zooming;
var oldDeltaX, oldDeltaY, panning;
const history = createBrowserHistory();

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: " 40%",
    width: " 50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    zIndex: 1000000,
    transform: "translate(-50%, -50%)",
    // border: "2px solid red",
  },
};
var nextVisbilityButton;

class Assembly extends Component {
  constructor(props) {
    super(props);
    // var props1 = props;
    var selectionType = localStorage.getItem("programMode");
    if (selectionType === "learn") {
      nextVisbilityButton = "hidden";
    } else {
      nextVisbilityButton = "visible";
    }

    Modal.setAppElement("body");
    this.state = {
      height: 0,
      width: 0,
      readbytes: false,
      modalIsOpen: false,
      props1: props,
      detected: false,
      usbOpen: false,
      isusb: false,
      isHelp: false,
      visible: nextVisbilityButton,
      isClickFourInOneSensor: false,
      p1: {
        selected: false,
        port: {},
      },

      reConnecting: false,

      responceTp0: "",
      responceTp1: "",
      responceTp2: "",
      touch_pad: "",
      touch_pad2: "",
      rangeA1: "",
      rangeA2: "",
      tactswitch: "",
      mic: "",
      temp: "",
      gas: "",
      one: "",
      two: "",
      red: "",
      green: "",
      blue: "",
      light: "",
      gesture: "",
      distance: "",
    };

    window.addEventListener("load", async (e) => {
      console.log("HEY_CALIIN", this.props.state);

      try {
        const portList = await navigator.serial.getPorts();

        if (portList.length === 1) {
          console.log(portList, "Hardware connected");

          await props.webSerialAction({ port: portList[0] }); // dispatching function of redux

          this.setState.p1({
            selected: true,
            port: portList[0],
          });
        } else {
          console.log("No hardware");

          this.setState.p1(this.state.p1);
        }
      } catch (err) {
        console.log(err.message);
      }

      const height = document.body.clientHeight;

      const width = document.body.clientWidth;
      Sizes._update(width, height);
      this.setState({
        height: height,
        width: width,
      });
    });

    Sizes._update(document.body.clientWidth, document.body.clientHeight);
  }

  OpenReadComPort = async () => {
    const port = this.props.webSerial;
    console.log("PORTLIST", port);
    // console.log(port, "pPort");
    setTimeout(async () => {
      try {
        await port.open({ baudRate: 115200 });
      } catch (e) {
        console.log(e);
      }
    }, 100);

    this.writePort("notWrite");
    setTimeout(async () => {
      try {
        let portReader = port.readable.getReader();

        // let portWriter = portList.writable.getWriter();

        while (true) {
          const { value, done } = await portReader.read();
          console.log("value", value);
          console.log("done", done);

          const strg = unicodeToChar(value);
          let str = strg.trim();

          console.log(str, "uniCodeTOCHAR");
          if (done) {
            console.log("[readLoop] DONE", done);
            portReader.releaseLock();
            break;
          }
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  };

  async writePort(data) {
    try {
      const ports = await navigator.serial.getPorts();
      console.log("portsss", ports);

      console.log("portsss", ports[0].writable);
      // const outputStream = ports[0].writable,
      const writer = ports[0].writable.getWriter();
      // writer = outputStream.getWriter();
      const sata = data;
      const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,
      console.log("send data:+", data1);

      await writer.write(data1);

      writer.releaseLock();
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidUpdate() {
    // await PortConnect();

    console.log(this.props.webSerial, "MMMMLLLL");
    // console.log(this.props.webserialPort, "852+963852");
    console.log(this.state.p1, "KKK");
    let no_port = this.props.webserialPort;
    if (typeof no_port !== undefined) {
      console.log("WORKING>>>>>>>>");
      this.OpenReadComPort();
    } else {
      // this.OpenReadComPort();
      console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
      console.log("SERIAL PORT NOT CONNECTED");
    }

    console.log("componentDidUpdate");
    let valresponceTp0 = "";
    let valresponceTp1 = "";
    let valresponceTp2 = "";
    let valtouch_pad = "";
    let valtouch_pad2 = "",
      valrangeA1 = "",
      valrangeA2 = "",
      valtactswitch = "",
      valtemp = "",
      valgas = "",
      valone = "",
      valtwo = "",
      valmic = "",
      valred = "",
      valgreen = "",
      valblue = "",
      vallight = "",
      valges = "",
      valdis = "";

    if (this.state.readbytes) {
      var socket = socketIOClient.connect("http://localhost:3008");
      let bytesData = Array(9).fill("O".charCodeAt());

      bytesData.unshift("A".charCodeAt());
      bytesData.unshift("P".charCodeAt());

      let sessionData = JSON.parse(sessionStorage.getItem("concept"));
      console.log(sessionData);
      console.log(sessionData.internalaccessories, "Internal data");

      let Tp0 = sessionData.internalaccessories.isTouchOne;
      console.log("TOUCH 0", Tp0);

      let portdata = JSON.parse(sessionStorage.getItem("assembly"));
      console.log(
        portdata.PortConnections,
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DATA>>>>>>>>>>>>>>>>>"
      );
      console.log(portdata.PortConnections, ">>???>>>>????<<<<");

      // console.log("TOUCH PAD DATA", sessionData.internalaccessories);
      // Obect.keys and Object.values n

      Object.keys(portdata.PortConnections).map((port) => {
        if (portdata.PortConnections[port] != null) {
          switch (port) {
            case "A": {
              let signalType = portdata.PortConnections[port].signalType;

              let Type = portdata.PortConnections[port].type;

              if (Type == "ultrasonic_sensor") {
                bytesData[2] = "U".charCodeAt();
                // bytesData[3] = "I".charCodeAt();
              } else if (signalType == "digital") {
                bytesData[2] = "I".charCodeAt();
                bytesData[3] = "I".charCodeAt();
              } else if (signalType == "analog") {
                bytesData[2] = "A".charCodeAt();
                bytesData[3] = "A".charCodeAt();
              }

              console.log(signalType, "signlay type");
              console.log("TOUCH 0", Tp0);
              break;
            }

            case "B": {
              let signalType = portdata.PortConnections[port].signalType;

              if (signalType == "analog") {
                bytesData[4] = "A".charCodeAt();
                bytesData[5] = "A".charCodeAt();
              } else if (signalType == "digital") {
                bytesData[4] = "I".charCodeAt();
                bytesData[5] = "I".charCodeAt();
              }

              console.log(signalType, "signlay type");
              break;
            }

            case "C": {
              let signalType = portdata.PortConnections[port].signalType;

              let Type = portdata.PortConnections[port].type;

              if (Type == "ultrasonic_sensor") {
                bytesData[6] = "U".charCodeAt();
                // bytesData[7] = "A".charCodeAt();
              } else if (signalType == "digital") {
                bytesData[6] = "I".charCodeAt();
                bytesData[7] = "I".charCodeAt();
              } else if (signalType == "analog") {
                bytesData[6] = "A".charCodeAt();
                bytesData[7] = "A".charCodeAt();
              }

              console.log(signalType, "signlay type");
              break;
            }
          }
        }
      });

      if (sessionData.internalaccessories.isMic) {
        bytesData[9] = "M".charCodeAt();
      }
      if (sessionData.internalaccessories.isTemprature) {
        bytesData[10] = "T".charCodeAt();
      }
      if (sessionData.internalaccessories.isTouchZero) {
        bytesData[2] = "T".charCodeAt();
        bytesData[3] = "T".charCodeAt();
      }
      if (sessionData.internalaccessories.isTouchOne) {
        bytesData[4] = "T".charCodeAt();
        bytesData[5] = "T".charCodeAt();
      }
      if (sessionData.internalaccessories.isTouchTwo) {
        bytesData[6] = "T".charCodeAt();
        bytesData[7] = "T".charCodeAt();
      }

      // if (sessionData.internalaccessories.isTouchZero) {
      //   bytesData[8] = "T".charCodeAt();
      // }
      // if (sessionData.internalaccessories.isTouchOne) {
      //   bytesData[9] = "T".charCodeAt();
      // }
      // if (sessionData.internalaccessories.isTouchTwo) {
      //   bytesData[10] = "T".charCodeAt();
      // }
      if (
        sessionData.internalaccessories.Four_in_one_sensor.isDistanceSensors
      ) {
        bytesData[8] = "D".charCodeAt();
      }
      if (sessionData.internalaccessories.Four_in_one_sensor.isGestureSensor) {
        bytesData[8] = "G".charCodeAt();
      }
      if (sessionData.internalaccessories.Four_in_one_sensor.isColorSensor) {
        bytesData[8] = "C".charCodeAt();
      }
      if (sessionData.internalaccessories.Four_in_one_sensor.isLightSensor) {
        // bytesData[8] = "L".charCodeAt();
        bytesData[8] = "L".charCodeAt();
      }

      console.log(bytesData);
      this.writePort(bytesData);
      socket.emit("/assemblyreadBytes", bytesData);

      socket.on("/PcBytes", async function (data) {
        var str = await data;
        console.log("SATTA", str);

        //Touch pad part(1) !!!!
        if (str.slice(str.length - 16, str.length - 14) === "31") {
          valresponceTp0 = 1;
        }
        if (str.slice(str.length - 16, str.length - 14) === "30") {
          valresponceTp0 = 0;
        }
        if (str.slice(str.length - 14, str.length - 12) === "31") {
          valresponceTp1 = 1;
        }
        if (str.slice(str.length - 14, str.length - 12) === "30") {
          valresponceTp1 = 0;
        }
        if (str.slice(str.length - 12, str.length - 10) == "31") {
          valresponceTp2 = 1;
        }
        if (str.slice(str.length - 12, str.length - 10) == "30") {
          valresponceTp2 = 0;
        }

        //Touch pad part(2) !!!!
        if (str.slice(str.length - 6, str.length - 4) === "31") {
          valresponceTp0 = 1;
        }
        if (str.slice(str.length - 6, str.length - 4) === "30") {
          valresponceTp0 = 0;
        }
        if (str.slice(str.length - 4, str.length - 2) === "31") {
          valresponceTp1 = 1;
        }
        if (str.slice(str.length - 4, str.length - 2) === "30") {
          valresponceTp1 = 0;
        }
        if (str.slice(str.length - 2, str.length) == "31") {
          valresponceTp2 = 1;
        }
        if (str.slice(str.length - 2, str.length) == "30") {
          valresponceTp2 = 0;
        }

        /// Digital touch pad dragging ////
        if (str.slice(str.length - 6, str.length - 4) == "31") {
          valtouch_pad = 1;
        }
        if (str.slice(str.length - 6, str.length - 4) == "30") {
          valtouch_pad = 0;
        }
        if (str.slice(str.length - 2, str.length) == "31") {
          valtouch_pad2 = 1;
        }
        if (str.slice(str.length - 2, str.length) == "30") {
          valtouch_pad2 = 0;
        }

        if (str.slice(str.length - 16, str.length - 14) == "31") {
          valtouch_pad = 1;
        }
        if (str.slice(str.length - 16, str.length - 14) == "30") {
          valtouch_pad = 0;
        }
        if (str.slice(str.length - 12, str.length - 10) == "31") {
          valtouch_pad2 = 1;
        }
        if (str.slice(str.length - 12, str.length - 10) == "30") {
          valtouch_pad2 = 0;
        }

        if (str.slice(str.length - 40, str.length - 36) != "0000") {
          console.log(
            "MMNNNMNJHBNN<<<<<<<<<<<<<<<<<<<",
            str.slice(str.length - 40, str.length - 36)
          );
          socket.on("/A1-port", function (data2) {
            valrangeA1 = data2;

            console.log("MATAta:", valrangeA1);
          });

          socket.on("/A2-port", function (data2) {
            valrangeA2 = data2;

            console.log("MATA:", valgas);
          });
        }
        if (str.slice(str.length - 35, str.length - 31) != "0000") {
          socket.on("/B1-port", function (data2) {
            valtemp = data2;
            console.log("B port value", data2);
          });
          socket.on("/B2-port", function (data2) {
            valgas = data2;
          });
        }
        if (str.slice(str.length - 25, str.length - 21) != "0000") {
          socket.on("/C1-port", function (data2) {
            valone = data2;
          });
          socket.on("/C2-port", function (data2) {
            valtwo = data2;
          });
        }

        ///////////////////         F0ur in 0ne RGB      ///////////////////////////
        if (str.slice(str.length - 10, str.length - 4) != "000000") {
          socket.on("/4IN1R-port", function (data) {
            valred = data;
          });
          // valmic = 15611;
        }
        if (str.slice(str.length - 10, str.length - 4) != "000000") {
          socket.on("/4IN1G-port", function (data) {
            valgreen = data;
          });
          // valmic = 15611;
        }
        if (str.slice(str.length - 10, str.length - 4) != "000000") {
          socket.on("/4IN1B-port", function (data) {
            valblue = data;
          });
          // valmic = 15611;
        }

        //////////////////   MIC       /////////////////////////////////////
        if (str.slice(str.length - 4, str.length) != "0000") {
          socket.on("/Mic-port", function (data) {
            valmic = data;
          });
          // valmic = 15611;
        }

        ////////////////  F0ur in 0ne Light,distance    /////////////////////////////////
        if (str.slice(str.length - 10, str.length - 8) != "00") {
          socket.on("/4IN1light-port", function (data) {
            vallight = data;
          });
          // valmic = 15611;
        }
        if (str.slice(str.length - 8, str.length - 6) != "00") {
          socket.on("/4IN1ges-port", function (data) {
            valges = data;
          });
          // valmic = 15611;
        }
        if (str.slice(str.length - 6, str.length - 4) != "00") {
          socket.on("/4IN1dis-port", function (data) {
            valdis = data;
          });
          // valmic = 15611;
        }

        // if (str.slice(str.length - 30, str.length - 26) != "0000") {
        //   socket.on("/B1-port", function (data2) {
        //     valone = data2;
        //   });
        //   socket.on("/B2-port", function (data2) {
        //     valtwo = data2;
        //   });
        // }
        // if (str.slice(str.length - 25, str.length - 21) != "0000") {
        //   socket.on("/C1-port", function (data2) {
        //     valrangeA1 = data2;
        //   });
        //   socket.on("/C2-port", function (data2) {
        //     valrangeA2 = data2;
        //   });
        // }

        // if (str.slice(str.length - 40, str.length - 36) != "0000") {
        //   console.log(
        //     "MMNNNMNJHBNN<<<<<<<<<<<<<<<<<<<",
        //     str.slice(str.length - 40, str.length - 36)
        //   );
        //   socket.on("/A1-port", function (data2) {
        //     valone = data2;

        //     console.log("MATAta:", valtemp);
        //   });

        //   socket.on("/A2-port", function (data2) {
        //     valtwo = data2;

        //     console.log("MATA:", valgas);
        //   });
        // }
        // if (str.slice(str.length - 30, str.length - 26) != "0000") {
        //   socket.on("/B1-port", function (data2) {
        //     valrangeA1 = data2;
        //   });
        //   socket.on("/B2-port", function (data2) {
        //     valrangeA2 = data2;
        //   });
        // }
        // if (str.slice(str.length - 25, str.length - 21) != "0000") {
        //   socket.on("/C1-port", function (data2) {
        //     valtemp = data2;
        //   });
        //   socket.on("/C2-port", function (data2) {
        //     valgas = data2;
        //   });
        // }

        console.log(str.slice(str.length - 6, str.length - 4), "3rd last");
        console.log(str.slice(str.length - 4, str.length - 2), "2nd last");
        console.log(str.slice(str.length - 2, str.length), "last");

        // <h2>{data}</h2>;
      });

      setTimeout(() => {
        console.log("valrespnse 22222222", valresponceTp0);

        this.setState({
          responceTp0: valresponceTp0,
          responceTp1: valresponceTp1,
          responceTp2: valresponceTp2,
          touch_pad: valtouch_pad,
          touch_pad2: valtouch_pad2,
          rangeA1: valrangeA1,
          rangeA2: valrangeA2,
          tactswitch: valtactswitch,
          temp: valtemp,
          gas: valgas,
          one: valone,
          two: valtwo,
          activePort: "A1",
          mic: valmic,
          red: valred,
          green: valgreen,
          blue: valblue,
          light: vallight,
          gesture: valges,
          distance: valdis,
        });
      }, 1000);
    }
    if (!this.state.readbytes) {
      valresponceTp0 = "";
      valresponceTp1 = "";
      valresponceTp2 = "";
      valtouch_pad = "";
      valtouch_pad2 = "";
      valtactswitch = "";
      console.log("going---------------->");
    }
    console.log("valrespnse", valresponceTp0);
  }

  handleUsb = (e) => {
    this.setState({ isusb: !this.state.isusb });
  };
  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };

  async componentDidMount() {
    let sessionDataCheckbox = JSON.parse(
      sessionStorage.getItem("assemblyCheckbox")
    );

    if (sessionStorage.getItem("Ace")) {
      Object.keys(sessionDataCheckbox).map((val, indx) => {
        document.getElementById(`${val}`).checked = sessionDataCheckbox[val];
      });
    }

    var socket = socketIOClient.connect("http://localhost:3008");
    socket.emit("_usbDetection", "Hi");
    socket.on("/usbDetection1", (data) => {
      // console.log("...............1", data);
      // // let kill = Array.from(data);
      // // console.log("...............5", kill);
      // if (data == 1) {
      //   this.handleUsb(true);
      //   console.log("LLLLLLLLLLLLLLL", data);
      // } else {
      //   this.handleUsb(false);
      // }
    });
    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      this.handleUsb();
    } else {
      // this.handleUsb(false);
    }
    Sizes._update(document.body.clientWidth, document.body.clientHeight);
    window.addEventListener("resize", (e) => {
      const height = document.body.clientHeight;
      const width = document.body.clientWidth;
      Sizes._update(width, height);
      this.setState({
        height: height,
        width: width,
      });
    });

    Sizes._update(document.body.clientWidth, document.body.clientHeight);
    // Reset panning and pinching variables
    this.panEnd();
    this.pinchEnd();

    // let no_port = this.props.webserialPort.name;
    // if (no_port == "Not Connected") {
    //   console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
    //   console.log("SERIAL PORT NOT CONNECTED");

    // } else {

    // await PortConnect();
    console.log(this.props.webserialPort, "852+963852");
    // this.OpenReadComPort();
    // }
  }

  /**
   * Remove a component from workspace
   * @param  {WorkspaceComponent} item
   */
  ParseNodeList = (node, port, type) => {
    for (var nodeKey in node) {
      var obj = node[nodeKey].state;
      if (obj["source"] == port) {
        delete node[nodeKey].state["source"];
        delete node[nodeKey].state["value"];
        delete node[nodeKey].state["value2"];
        delete node[nodeKey].state["condition"];
        delete node[nodeKey].state["hour"];
        delete node[nodeKey].state["hour2"];
        delete node[nodeKey].state["minute"];
        delete node[nodeKey].state["minute2"];
      }
      if (
        node[nodeKey].type == "variable_output" ||
        node[nodeKey].type == "hardware"
      ) {
        //  for tern+
        if (port.length == 1) {
          if (obj["assign" + port + "1"]) {
            delete node[nodeKey].state["assign" + port + "1"];
          }
          if (obj["value" + port + "1"]) {
            delete node[nodeKey].state["value" + port + "1"];
          }
          if (type == "dot_matrix") {
            for (var key in obj) {
              if (key.startsWith("dot_matrix")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (type == "7segment_display") {
            for (var key in obj) {
              if (key.includes("valueB") || key.includes("valueC")) {
                delete node[nodeKey].state[key];
              }
            }
          }
        } else {
          if (obj["assign" + port]) {
            delete node[nodeKey].state["assign" + port];
          }
          if (obj["value" + port]) {
            delete node[nodeKey].state["value" + port];
          }
          if (type == "dot_matrix") {
            for (var key in obj) {
              if (key.startsWith("dot_matrix")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (type == "7segment_display") {
            for (var key in obj) {
              if (key.includes("valueB") || key.includes("valueC")) {
                delete node[nodeKey].state[key];
              }
            }
          }
        }
      }
      if (node[nodeKey].subprogram) {
        this.ParseNodeList(node[nodeKey].subprogram, port, type);
      }
    }
    return node;
  };
  removeFromWorkspace = (item) => {
    var prev_data = this.props;
    var port = item.port;
    var updated_prog = this.ParseNodeList(
      prev_data.logic.program,
      port,
      item.type
    );
    // var updated_flow_prog1 = this.ParseNodeList(prev_data.logicNew.cardConnections, port, item.type);
    // var updated_flow_prog2 = this.ParseNodeList(prev_data.logicNew.cards, port, item.type);
    prev_data.logic.program = updated_prog;
    // prev_data.logicNew.cardConnections = updated_flow_prog1;
    // prev_data.logicNew.cards = updated_flow_prog2;
    if (sessionStorage.getItem("connectedDevice") == "Ace") {
      // when we connect driver motor components, then add led to any ports when we remove the led from workspace
      // then driver motor show only one connected port(B) not both(BD) prots so add this checking

      let sdad = JSON.parse(sessionStorage.getItem("assembly")).workspace
        .components;

      // if (
      //   JSON.parse(sessionStorage.getItem("assembly")).workspace.components[
      //     "pc_motor_driver"
      //   ] !== undefined
      // ) {
      //   if (
      //     JSON.parse(sessionStorage.getItem("assembly")).workspace.components[
      //       "pc_motor_driver"
      //     ][0].connectedTo
      //   ) {
      //     var dataConnectTo = JSON.parse(sessionStorage.getItem("assembly"))
      //       .workspace.components["pc_motor_driver"][0].connectedTo;
      //     if (dataConnectTo == "A" || dataConnectTo == "C") {
      //       prev_data.PortConnections["C"] = null;
      //       prev_data.PortConnections["A"] = null;
      //     }

      //     if (dataConnectTo == "B" || dataConnectTo == "D") {
      //       prev_data.PortConnections["B"] = null;
      //       prev_data.PortConnections["D"] = null;
      //     }
      //   }
      // }

      if (item.type == "pc_motor_driver") {
        if (item.connectedTo == "A" || item.connectedTo == "C") {
          prev_data.PortConnections["C"] = null;
          prev_data.PortConnections["A"] = null;
        }

        if (item.connectedTo == "B" || item.connectedTo == "D") {
          prev_data.PortConnections["B"] = null;
          prev_data.PortConnections["D"] = null;
        }
      } else if (item.type == "stepper_motor") {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B !==
          null
        ) {
          if (
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
              .type == "pc_motor_driver"
          ) {
            if (item.connectedTo == "STPM") {
              prev_data.PortConnections["B1"] = null;
              prev_data.PortConnections["B2"] = null;

              prev_data.PortConnections["D1"] = null;
              prev_data.PortConnections["D2"] = null;
            }
          }
        } else if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A !==
          null
        ) {
          if (
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
              .type == "pc_motor_driver"
          ) {
            if (item.connectedTo == "STPM") {
              prev_data.PortConnections["A1"] = null;
              prev_data.PortConnections["A2"] = null;

              prev_data.PortConnections["C1"] = null;
              prev_data.PortConnections["C2"] = null;
            }
          }
        }
      } else {
        prev_data.PortConnections[item.port] = null;
      }
    } else {
      prev_data.PortConnections[item.port] = null;
    }

    // sessionStorage.setItem("AppDetails-new", JSON.stringify(prev_data));
    // AppState.PortConnections = prev_data.PortConnections;
    // AppState.logic = prev_data.logic;
    // AppState.logicNew = prev_data.logicNew;
    var { logic } = prev_data;
    this.props.logicComponent(logic);
    var { workspace } = this.props.assembly;
    workspace.components[item.type].splice(item.index, 1);
    this.props.assemblyComponent(workspace);
  };
  /**
   * Pan event handler with throttling
   */
  pan = (e) => {
    if (panning) return;
    panning = true;
    var { workspace } = this.props.assembly;
    workspace.offset.left += (e.deltaX - oldDeltaX) / workspace.scale;
    workspace.offset.top += (e.deltaY - oldDeltaY) / workspace.scale;
    oldDeltaX = e.deltaX;
    oldDeltaY = e.deltaY;
    this.props.assemblyComponent(workspace, () => {
      panning = false;
    });
  };
  /**
   * Reset pan variables
   */
  panEnd = () => {
    panning = false;
    oldDeltaX = 0;
    oldDeltaY = 0;
  };
  /**
   * Zoom function with throttling
   * @param  {number} scale   The new scale
   * @param  {number} clientX The clientX (center of pinch or cursor position on wheel)
   * @param  {number} clientY The clientY (center of pinch or cursor position on wheel)
   */
  zoom = (scale, clientX, clientY) => {
    if (zooming) return;
    var { workspace, height, width } = this.props.assembly;
    if (
      (workspace.scale < 0.25 && scale < 1) ||
      (workspace.scale > 2 && scale > 1)
    )
      return;
    zooming = true;
    clientX -= width * 0.2;
    clientY -= document.body.clientHeight - height;
    // client = (offset + x/y) * scale
    // client of oldx/y = client of newx/y (current mouse position)
    // oldx/y = client / scale - offset
    // (newoffset + oldx/y) * newscale = (oldOffset + oldx/y) * oldscale
    const oldX = clientX / workspace.scale - workspace.offset.left;
    const oldY = clientY / workspace.scale - workspace.offset.top;
    workspace.offset.left = (workspace.offset.left + oldX) / scale - oldX;
    workspace.offset.top = (workspace.offset.top + oldY) / scale - oldY;
    workspace.scale *= scale;
    this.props.assemblyComponent(workspace, () => {
      zooming = false;
    });
  };
  /**
   * Pinch Out event handler
   */
  pinchOut = (e) => {
    this.zoom(12 / 11, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  };
  /**
   * Pinch In event handler
   */
  pinchIn = (e) => {
    this.zoom(11 / 12, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  };
  /**
   * Reset pinch variables
   */
  pinchEnd = () => {
    zooming = false;
  };
  /**
   * Wheel event handler
   */
  wheel = (e) => {
    const { clientX, clientY, deltaY } = e;
    if (deltaY > 0) this.zoom(5 / 6, clientX, clientY);
    else this.zoom(6 / 5, clientX, clientY);
    e.preventDefault();
    return false;
  };
  close = () => {
    var c = document.getElementById("assemblyConnections");
    var d = document.getElementById("biboxClass");
    var e = document.getElementById("connectPort");

    c.style.zIndex = 2;
    d.style.zIndex = 2;
    e.style.zIndex = 2;
    this.setState({ modalIsOpen: false });
  };

  check = () => {
    if (localStorage.getItem("programMode") == "learn") {
      var c = document.getElementById("assemblyConnections");
      var d = document.getElementById("biboxClass");
      var e = document.getElementById("connectPort");

      c.style.zIndex = 0;
      d.style.zIndex = 0;
      e.style.zIndex = 0;

      var PortConnections = JSON.parse(
        sessionStorage.getItem("assembly")
      ).PortConnections;
      var socket = socketIOClient("http://localhost:3008");
      socket.emit("/checkAssembly", PortConnections);
      socket.on("/assemblyResult", (data) => {
        if (!data) {
          this.setState({ modalIsOpen: true });
          return true;
        } else {
          this.props.history.push("/logic");
          // history.push('/logic');
          // window.location.href = "/logic"
          return false;
          // this.props.history.push("/Learn")
        }
      });
    } else {
      this.props.history.push("/logic");
    }
  };

  backBtn = () => {
    this.props.history.push("/selectScreen/ExternalAccessories");
  };

  nextVisbility = (value) => {
    this.setState({ visible: value });
  };

  componentWillUnmount() {
    this.screenshotInitiate();
  }
  screenshotInitiate = () => {
    var URL, BLOB;
    (function (exports) {
      function urlsToAbsolute(nodeList) {
        if (!nodeList.length) {
          return [];
        }
        var attrName = "href";
        if (
          nodeList[0].__proto__ === HTMLImageElement.prototype ||
          nodeList[0].__proto__ === HTMLScriptElement.prototype
        ) {
          attrName = "src";
        }
        nodeList = [].map.call(nodeList, function (el, i) {
          var attr = el.getAttribute(attrName);
          if (!attr) {
            return;
          }
          var absURL = /^(https?|data):/i.test(attr);
          if (absURL) {
            return el;
          } else {
            return el;
          }
        });
        return nodeList;
      }

      function screenshotPage() {
        if (JSON.parse(sessionStorage.getItem("Index"))) {
          urlsToAbsolute(document.images);
          urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
          var screenshot = document
            .getElementById("assemblyscreenid")
            .cloneNode(true);

          screenshot.getElementsByClassName("assemblySidebar")[0].innerHTML =
            "";
          $(screenshot)
            .find(".assemblySidebar")
            .css("background-color", "transparent");
          $(screenshot).find(".assemblySidebar").css("border", "none");
          $(screenshot).find(".assemblySidebar").css("box-shadow", "none");

          $(screenshot).find(".nextButton").css("display", "none");
          $(screenshot).find(".navbarContainer_assem").css("display", "none");
          $(screenshot)
            .find(".navbarContainer_assembly")
            .css("display", "none");

          //screenshot.getElementsByClassName("assemblyScreen")[0].style.backgroundImage='';
          $(screenshot)
            .find(".assemblyScreen")
            .css("background-color", "black");
          $(screenshot).find(".assemblyScreen").css("background-image", "none");

          // var b = document.createElement('base');
          // b.href = document.location.protocol + '//' + location.host;
          var head = screenshot.querySelector("head");
          // head.insertBefore(b, head.firstChild);
          screenshot.style.pointerEvents = "none";
          screenshot.style.overflow = "hidden";
          screenshot.style.webkitUserSelect = "none";
          screenshot.style.mozUserSelect = "none";
          screenshot.style.msUserSelect = "none";
          screenshot.style.oUserSelect = "none";
          screenshot.style.userSelect = "none";
          screenshot.dataset.scrollX = window.scrollX;
          screenshot.dataset.scrollY = window.scrollY;
          var script = document.createElement("script");
          script.textContent = "(" + addOnPageLoad_.toString() + ")();";
          // screenshot.querySelector('body').appendChild(script);

          var blob = new Blob([screenshot.outerHTML], {
            type: "text/html",
          });
          //screenshot.getElementsByClassName("pure-u-1-5")[0].style.display='none';
          URL = screenshot.outerHTML;
          return blob;
        }
      }
      function addOnPageLoad_() {
        window.addEventListener("DOMContentLoaded", function (e) {
          var scrollX = document.documentElement.dataset.scrollX || 0;
          var scrollY = document.documentElement.dataset.scrollY || 0;
          window.scrollTo(scrollX, scrollY);
        });
      }
      (function () {
        window.URL = window.URL || window.webkitURL;
        BLOB = screenshotPage();
        // window.open(window.URL.createObjectURL(screenshotPage()));
      })();

      exports.screenshotPage = screenshotPage;
      // exports.generate = generate;
    })(window);
    // generate();
    //var div=document.createElement("div");
    // you need to create an empty div element with some id and use that id here.
    var div = document.getElementById("assemblyShot");
    div.innerHTML = URL;
    sessionStorage.setItem("assempblyImageHTML", URL);
    // html2canvas(div, {
    //   onrendered: function(canvas) {
    //     div.innerHTML="";
    //     var img = canvas.toDataURL("image/png");
    //
    //     sessionStorage.setItem("assempblyImageURI",img);
    //   }
    // });

    html2canvas(div).then(function (canvas) {
      div.innerHTML = "";
      var img = canvas.toDataURL("image/png");
      sessionStorage.setItem("assempblyImageURI", img);
    });
  };
  handleAssemblyCheckbox = (e) => {
    let isCheckedValue = e.target.value;

    let isChecked = e.target.checked;

    // if (isCheckedValue == "FOUR_in_ONE_Sensor" && isChecked == true) {
    //
    //   this.props.assembly.PortConnections[isCheckedValue] = {
    //     type: "4_in_1_sensor",
    //     index: 0,
    //   };
    // } else if (isCheckedValue == "FOUR_in_ONE_Sensor" && isChecked == false) {
    //
    //   this.props.assembly.PortConnections[isCheckedValue] = null;
    // }

    // if (isCheckedValue == "MICROPHONE" && isChecked == true) {
    //
    //   this.props.assembly.PortConnections[isCheckedValue] = {
    //     type: "microphone",
    //     index: 0,
    //   };
    // } else if (isCheckedValue == "MICROPHONE" && isChecked == false) {
    //
    //   this.props.assembly.PortConnections[isCheckedValue] = null;
    // }

    activeCheckBox[isCheckedValue] = isChecked;

    sessionStorage.setItem("assemblyCheckbox", JSON.stringify(activeCheckBox));

    // var stored2 = JSON.parse(sessionStorage.getItem("assemblyCheckbox"));

    // var stored = JSON.parse(sessionStorage.getItem("assembly"));

    // // stored.push(stored2);

    // var obj = Object.assign({}, stored, stored2);

    // sessionStorage.setItem("assembly", JSON.stringify(obj));
  };

  handleFourInOneSensor = (e) => {
    if (this.state.isClickFourInOneSensor) {
      this.setState({
        isClickFourInOneSensor: false,
      });
    } else {
      this.setState({
        isClickFourInOneSensor: true,
      });
    }
  };

  handleReadByte = () => {
    let sessionData = JSON.parse(sessionStorage.getItem("concept"));
    console.log(sessionData);
    console.log(sessionData.internalaccessories, "Internal data");

    this.setState({ readbytes: !this.state.readbytes }, () => {
      console.log(this.state.responceTp0, "------------------------->>");
    });
    console.log("kamal", this.state.readbytes);
  };

  renderImg = (e) => {
    let fourInOneSensorName = null;
    let isFourInOneSensor = Object.keys(
      JSON.parse(sessionStorage.getItem("concept")).internalaccessories
        .Four_in_one_sensor
    ).some((val, inx) => {
      if (
        JSON.parse(sessionStorage.getItem("concept")).internalaccessories
          .Four_in_one_sensor[val] == true
      ) {
        fourInOneSensorName = val;
        return true;
      } else {
        return false;
      }
    });

    switch (fourInOneSensorName) {
      case "isGestureSensor": {
        return renderPrgImage("gesturesensorActive");
      }
      case "isDistanceSensors": {
        return renderPrgImage("distancesensorsActive");
      }
      case "isLightSensor": {
        return renderPrgImage("lightsensorActive");
      }
    }
  };

  render() {
    //     setTimeout(async () => {
    //       const portList = await navigator.serial.getPorts();
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>",portList);
    //       this.props.webSerialAction({ port: portList[0] }); // dispatching function of redux

    //       console.log(this.props.webserialPort, "852+963852");
    //       this.OpenReadComPort();
    //     }, 100);

    console.log("KKKAKAKAK", this.state.p1);
    var selectionType = localStorage.getItem("programMode");

    if (selectionType == "program") {
      this.state.visible = "visible";
    }

    const propertyPanelStyle = {
      // backgroundImage: `url("${propertypanel}")`,
      // backgroundRepeat: "no-repeat",
      // backgroundSize: "100% 100%",
      // backgroundPosition: "center",
    };

    //
    let fourInOneSensorName = null;
    const isFourInOneSensor = Object.keys(
      JSON.parse(sessionStorage.getItem("concept")).internalaccessories
        .Four_in_one_sensor
    ).some((val, inx) => {
      if (
        JSON.parse(sessionStorage.getItem("concept")).internalaccessories
          .Four_in_one_sensor[val] == true
      ) {
        fourInOneSensorName = val;
        return true;
      } else {
        return false;
      }
    });

    return (
      <>
        {/* NAV BAR */}
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
          <div className="navbarContainer" style={{ zIndex: "1000" }}>
            <div className="navbar_content">
              <div className="navbar_new ">Select</div>
              <div className="navbar_new isActive">Assemble</div>
              <div className="navbar_new">Code</div>
              <div className="navbar_new">Simulate</div>
            </div>

            {/* bar represent the selected section */}
            <img
              src={renderPrgImage("assemblebar")}
              style={{ height: "100%", width: "30%" }}
            />

            <div className="navbar-Action">
              {/* {this.state.readbytes ? (
                <img
                  src={renderPrgImage readPCActive}
                  className="iconBtnSize"
                  style={{ marginRight: "25px" }}
                  onClick={this.handleReadByte}
                />
              ) : (
                <img
                  src={renderPrgImage readPCInActive}
                  className="iconBtnSize"
                  style={{ marginRight: "25px" }}
                  onClick={this.handleReadByte}
                />
              )} */}

              <img
                src={renderPrgImage("saveBtnInActive")}
                className="iconBtnSize"
                style={{ marginRight: "25px" }}
                onClick={() => this.setState({ reConnecting: true })}
              />

              {/* <img
                className="iconBtnSize"
                src={renderPrgImage("helpBtnInActive")}
                style={{ marginRight: "25px" }}
              /> */}

              {this.state.isHelp ? (
                <div className="Ss_slide">
                  <AssemblyPrgm />
                </div>
              ) : (
                <img
                  className="iconBtnSize"
                  src={renderPrgImage("helpBtnInActive")}
                  onClick={this.helpBtn}
                ></img>
              )}

              {this.state.isHelp ? (
                <img
                  className="helpClo"
                  src={renderPrgImage("closBtn")}
                  onClick={this.helpBtn}
                ></img>
              ) : null}

              {this.state.isusb ? (
                <img src={renderPrgImage("usbON")} />
              ) : (
                <img src={renderPrgImage("usbOFF")} />
              )}
            </div>
          </div>
        </div>

        <div
          id="assemblyscreenid"
          className="pure-g assemblyScreen"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            // backgroundColor: "#FCFCFC",
            // background: "red",
          }}
        >
          {/* <button
            className="nextButton"
            style={{ visibility: this.state.visible }}
            onClick={this.check}
          >
            NEXT
          </button> */}

          <div className="pure-u-1-5 user-select" style={{ marginTop: "5%" }}>
            <Sidebar removeFromWorkspace={this.removeFromWorkspace} />
          </div>

          <div id="screenshotid" className="pure-u-4-5">
            <div
              id="assemblyConnections"
              style={{
                position: "absolute",
                width: "80%",
                height: "100%",
                zIndex: 1,
              }}
              onWheel={this.wheel}
            >
              {/* IMG of ACE and  Sensor Img */}
              <WorkSpace
                workspace={this.props.assembly.workspace}
                update={this.props.assemblyComponent}
                appState={this.props}
                height={this.props.height}
                width={this.props.width * 0.8}
                prop={this.props.assembly}
                updatePort={this.props.PortConnections}
                componentsData={this.props.assembly.components}
                removeFromWorkspace={this.removeFromWorkspace}
                nextVisbility={this.nextVisbility}
                responceTp0={this.state.responceTp0}
                responceTp1={this.state.responceTp1}
                responceTp2={this.state.responceTp2}
                touch_pad={this.state.touch_pad}
                touch_pad2={this.state.touch_pad2}
                rangeA1={this.state.rangeA1}
                rangeA2={this.state.rangeA2}
                tactswitch={this.state.tactswitch}
                mic={this.state.mic}
                temp={this.state.temp}
                gas={this.state.gas}
                one={this.state.one}
                two={this.state.two}
              />
            </div>
          </div>

          {/* WIRE ,WHITE DOTS POINT_ON ACE, SHOWS IMG at Draging Time   */}
          <CustomDragLayer
            style={{
              float: "right",
              width: "75%",
              height: "100%",
              position: "relative",
            }}
            height={this.props.height}
            width={this.props.width}
            workspace={this.props.assembly.workspace}
            PortConnections={this.props.assembly.PortConnections}
          />
          {this.state.readbytes ? (
            <img
              src={renderPrgImage("readPCActive")}
              // className="iconBtnSize1"
              style={{
                position: "absolute",
                top: "50%",
                right: "2%",
                transform: "translateY(-50%)",
                height: "60px",
                width: "60px",
                zIndex: "999999",
              }}
              onClick={this.handleReadByte}
            />
          ) : (
            <img
              src={renderPrgImage("readPCInActive")}
              // className="iconBtnSize1"
              style={{
                position: "absolute",
                top: "50%",
                right: "2%",
                transform: "translateY(-50%)",
                height: "60px",
                width: "60px",
                zIndex: "9",
              }}
              onClick={this.handleReadByte}
            />
          )}
          {isFourInOneSensor ? (
            this.state.isClickFourInOneSensor == false ? (
              <img
                src={renderPrgImage("readPCInActive")}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "2%",
                  transform: "translateY(-50%)",
                  height: "60px",
                  width: "60px",
                  zIndex: "999999",
                }}
                onClick={() => {
                  this.handleFourInOneSensor();
                  this.handleReadByte();
                }}
              />
            ) : (
              <div className="propertyPanel">
                {JSON.parse(sessionStorage.getItem("concept"))
                  .internalaccessories.Four_in_one_sensor.isColorSensor ? (
                  <div
                    className="propertyPanel-Details-colorSensor"
                    style={propertyPanelStyle}
                  >
                    <div className="colorSensor-container">
                      <div>
                        <img
                          src={renderPrgImage("colorsensorActive")}
                          style={{
                            height: "45px",
                            width: "45px",
                            marginTop: "5px",
                          }}
                        />
                        <p
                          style={{
                            color: "#707070",
                            fontSize: "12px",
                            marginTop: "5px",
                            transform: "translateX(20%)",
                          }}
                        ></p>
                      </div>
                      <div>
                        <p style={{ color: "#F16178" }}>
                          {" "}
                          R : {this.state.red}
                        </p>
                        <p style={{ color: "#3BB273" }}>
                          {" "}
                          G : {this.state.green}
                        </p>
                        <p style={{ color: "#30A8CE" }}>
                          {" "}
                          B : {this.state.blue}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="propertyPanel-Details"
                    style={propertyPanelStyle}
                  >
                    <div className="Item">
                      <img
                        src={this.renderImg()}
                        style={{ height: "45px", width: "45px" }}
                      />
                      <p>{this.state.light} </p>
                      <p>{this.state.distance} </p>
                      <p>{this.state.gesture} </p>
                    </div>
                  </div>
                )}

                <div className="propertyPanel-closeBtn">
                  <img
                    src={renderPrgImage("readPCActive")}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "2%",
                      transform: "translateY(-50%)",
                      height: "60px",
                      width: "60px",
                      zIndex: "999999",
                    }}
                    onClick={() => {
                      this.handleFourInOneSensor();
                      this.handleReadByte();
                    }}
                  />
                </div>
              </div>
            )
          ) : null}

          {/* CHECK BOX OLD UI  */}
          {/* {sessionStorage.getItem("connectedDevice") == "Ace" ? (
            <div className="AssemblycheckBoxContainer">
              <CheckboxAssembly
                title="RGB"
                value="RGB"
                handleAssemblyCheckbox={this.handleAssemblyCheckbox}
              />

              <CheckboxAssembly
                title="4-in-1 Sensor"
                handleAssemblyCheckbox={this.handleAssemblyCheckbox}
                value="FOUR_in_ONE_Sensor"
              />
              <CheckboxAssembly
                title="Buzzer"
                handleAssemblyCheckbox={this.handleAssemblyCheckbox}
                value="Buzzer"
              />

              <CheckboxAssembly
                title="Microphone"
                handleAssemblyCheckbox={this.handleAssemblyCheckbox}
                value="MICROPHONE"
              />
            </div>
          ) : null} */}

          <div id="assemblyShot"></div>
        </div>

        {/* BOTTOM BACK,NEXT BTN and discription*/}
        <div
          className="SelectScreenBottom"
          style={{ width: "80%", marginLeft: "15%" }}
        >
          <div className="bottom-child">
            {/* <img
              className="iconBtnSize imgBackBtn"
              src={backBtn}
              onClick={this.backBtn}
              draggable="false"
              style={{ border: "1px solid red" }}
            /> */}

            <div className="decription">
              <p>Drag and drop components to make connection </p>
            </div>
            <img
              className="iconBtnSize imgNextBtn"
              src={renderPrgImage("nextBtn")}
              onClick={this.check}
            />
          </div>
        </div>
      </>
    );
  }
}

// export default Assembly;

const mapStateToProps = (state) => {
  console.log("ASSEMBLY LOG", state);
  return state;
  // return { state, webserialPort: state.webSerial };
};
// const mapStateToProp = (state) => {
//   console.log("mapStateToProps", state);

//   return {
//     webserialPort: state.webSerial,
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    assemblyComponent: (data) => {
      dispatch({ type: "ASSEMBLY_SELECTION", payload: data });
    },
    logicComponent: (data) => {
      dispatch({ type: "LOGIC_SELECTION", payload: data });
    },
    PortConnections: (data) => {
      // console.log("=======================>", data);
      dispatch({ type: "PORT_CONNECTION", payload: data });
    },
    webSerialAction: (data) => {
      console.log("mapDispatchToProps", data);
      dispatch(webSerialAction(data));
    },
  };
};

Assembly = withRouter(connect(mapStateToProps, mapDispatchToProps)(Assembly));
Assembly = withRouter(DragDropContext(HTML5Backend)(Assembly));
// Sidebar = DragSource('items', itemSource, collect)(Sidebar)

export default Assembly;
// export default connect(mapStateToProp)(Assembly);
