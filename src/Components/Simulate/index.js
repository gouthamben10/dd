/* eslint-disable no-fallthrough */
/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import CustomNodeFlow from "./DnD/Index";
import Modal from "react-modal";
import "../../css/simulate.css";
import CustomNodeFlowHumanoid from "./DnDHumanoid/Index";
import SimulateLogic from "./simulateLogic";
import $ from "jquery";
import socketIOClient from "socket.io-client";

import {
  assemblebar,
  readPC,
  saveBtnInActive,
  saveBtnActive,
  helpBtnActive,
  helpBtnInActive,
  bluetoothBtnInActive,
  bluetoothBtnActive,
  readPCInActive,
  backBtn,
  uploadBtn,
  nextBtn,
  OneXspeed,
  HW_SW_btn,
  SWbtn,
  HWbtn,
  oneXspeedInActive,
  playrunBtn,
  pauseBtn,
  usbOFF,
  usbON,
} from "../../source/index";
import renderPrgImage from "../../source/programImg";
import SimulatePrgm from "../ReusableComponents/PrgmSlider/SimulatePrgm/SimulatePrgm";

let j = 0;

let jj = 0;
let jjj = 0;
let jjjj = 0;
let jjjjj = 0;
let j6 = 0;

let myImage;
let loopCount = [];

let myImage1,
  myImage2,
  myImage3,
  myImage4,
  myImage5,
  myImage6,
  myImage7 = null;
let mm = 0;
var loopProgram = "",
  loopcount = 0,
  loop = 0,
  //   ifResult = false,
  switchOff = false;
var sent = "",
  touch_tack_port = "",
  allLoopCount = 1;
var PortConnectionArr;
let k = 0;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    // height: "28%",
    // width: " 30%",
    height: "25%",
    width: "30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "#9ecee8",
    // border: "2px solid #188dcc",
    border: "5px solid rgb(255, 140, 25)",
    background: "rgb(255, 255, 255)",
    borderRadius: "15px",
  },
};

const styleSimulate_ = {
  rangeStyle_: {
    width: "85%",
  },
  numberStyle: {
    width: "10%",
    height: "20px",
    border: "1px solid black",
    marginLeft: "5%",
  },
};
class Simulate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: false,
      value: "0",
      componentClicked: "",
      compName: "",
      paly_pause_btn: true,
      clicked: false,
      number: 0,
      glowTime: 0,
      variable: 0,
      isConditionEnd: false,
      isusb: false,
      isHelp: false,

      rangeCountNumber_: 0,
      rangeValue_: 0,

      countClick: 0,
    };
    this.myRef = React.createRef();
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleUsb = (e) => {
    this.setState({ isusb: !this.state.isusb });
  };
  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };
  componentDidMount() {
    var socket = io.connect("http://localhost:3008");
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
      // this.handleUsb();
    }
    window.addEventListener("load", this.handleLoad);
    let byte = null;
    const logicData = JSON.parse(sessionStorage.getItem("logic"));
    const logicValues = Object.entries(logicData);
    logicValues[0][1].map((i) => {
      if (i.type === "hardware") {
        byte = `o${i}`;
        // console.log(i);
      }
    });

    var PortConnection = this.props.assembly.PortConnections;
    PortConnectionArr = Object.entries(PortConnection);
    var Compo = this.props.assembly.workspace.components;
    sessionStorage.setItem("simulate", JSON.stringify([]));
    console.log("PROPS FROM SIMULATE..", Compo);
    Object.keys(Compo).map((keys) => {
      return Compo[keys].map((ind) => {
        var clone = [
          ...JSON.parse(sessionStorage.getItem("simulate")),
          { componentName: keys, port: ind.connectedTo },
        ];
        sessionStorage.setItem("simulate", JSON.stringify(clone));

        // console.log("The Value is", ind.connectedTo);
        var myImage = new Image(60, 66);
        // myImage.src = `images/Simulate/${keys}.png`;
        myImage.src =
          // process.env.PUBLIC_URL + `/images/oldImages/component_${keys}.png`;
          process.env.PUBLIC_URL +
          `/Bisoft_UI/Accessories/newComponents/component_${keys}.png`;
        myImage.setAttribute("id", `img_${ind.connectedTo}`);
        // document.getElementById(ind.connectedTo).style.visibility="visible"
        // myImage.style.filter="drop-shadow(0 0 10px blue)";
        myImage.style.position = "absolute";
        if (
          keys === "light_sensor" ||
          keys === "distance_sensor" ||
          keys === "temperature_sensor" ||
          keys === "sound_sensor" ||
          keys === "rain_sensor" ||
          keys === "gas_sensor" ||
          keys === "heartbeat_sensor" ||
          keys === "pir_sensor" ||
          keys === "bend_sensor" ||
          keys === "humidity_sensor" ||
          keys === "hall_sensor" ||
          keys === "metal_detector" ||
          keys === "ultrasonic_sensor" ||
          keys === "4_in_1_sensor"
        ) {
          //for the input component
          myImage.addEventListener("click", () => this.myFun(keys));
        }
        if (keys === "touch_sensor" || keys === "tact_switch") {
          myImage.addEventListener("mousedown", () => this.myFun2(keys));
          myImage.addEventListener("click", () => this.myFun(keys));
          touch_tack_port = ind.connectedTo;
        }
        if (ind.connectedTo === "A" || ind.connectedTo === "B") {
          if (keys === "dual_splitter")
            myImage.style.transform = "rotate(90deg)";
          else myImage.style.transform = "rotate(270deg)";
        } else if (ind.connectedTo === "F" || ind.connectedTo === "G") {
          myImage.style.transform = "rotate(90deg)";
        } else if (sessionStorage.getItem("connectedDevice") === "Ace") {
          if (ind.connectedTo === "C" || ind.connectedTo === "D") {
            if (keys === "dual_splitter")
              myImage.style.transform = "rotate(270deg)";
            else myImage.style.transform = "rotate(90deg)";
          }
        }
        return true;
      });
    });
  }
  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }

  handleLoad() {
    $(`#img_A1`);
    $(`#img_B1`);
    $(`#img_C1`);
    $(`#img_D1`);
  }

  hardware = (j) => {
    if (this.props.logic.program[j].state.assignA1) {
      myImage = document.getElementById(`img_A1`);
      if (this.props.logic.program[j].state.valueA1 > 0) {
        myImage.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage.style.filter = "drop-shadow(0 0 0)";
      }
    }
    if (this.props.logic.program[j].state.assignB1) {
      myImage1 = document.getElementById(`img_B1`);
      if (this.props.logic.program[j].state.valueB1 > 0) {
        myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage1.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (this.props.logic.program[j].state.assignC1) {
      myImage2 = document.getElementById(`img_C1`);
      if (this.props.logic.program[j].state.valueC1 > 0) {
        myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage2.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (this.props.logic.program[j].state.assignD1) {
      myImage3 = document.getElementById(`img_D1`);
      if (this.props.logic.program[j].state.valueD1 > 0) {
        myImage3.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage3.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (this.props.logic.program[j].state.assignA2) {
      myImage4 = document.getElementById(`img_A2`);
      if (this.props.logic.program[j].state.valueA2 > 0) {
        myImage4.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage4.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (this.props.logic.program[j].state.assignB2) {
      myImage5 = document.getElementById(`img_B2`);
      if (this.props.logic.program[j].state.valueB2 > 0) {
        myImage5.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage5.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (this.props.logic.program[j].state.assignC2) {
      myImage6 = document.getElementById(`img_C2`);
      if (this.props.logic.program[j].state.valueC2 > 0) {
        myImage6.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage6.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (this.props.logic.program[j].state.assignD2) {
      myImage7 = document.getElementById(`img_D2`);
      if (this.props.logic.program[j].state.valueD2 > 0) {
        myImage7.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage7.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
  };

  hardware2 = (sub, loop) => {
    if (sub[loop].state.assignA1) {
      myImage = document.getElementById(`img_A1`);
      if (sub[loop].state.valueA1 > 0) {
        myImage.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage.style.filter = "drop-shadow(0 0 0)";
      }
    }
    if (sub[loop].state.assignB1) {
      myImage1 = document.getElementById(`img_B1`);
      if (sub[loop].state.valueB1 > 0) {
        myImage1.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage1.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (sub[loop].state.assignC1) {
      myImage2 = document.getElementById(`img_C1`);
      if (sub[loop].state.valueC1 > 0) {
        myImage2.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage2.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (sub[loop].state.assignD1) {
      myImage3 = document.getElementById(`img_D1`);

      if (sub[loop].state.valueD1 > 0) {
        myImage3.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage3.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (sub[loop].state.assignA2) {
      myImage4 = document.getElementById(`img_A2`);
      if (sub[loop].state.valueA2 > 0) {
        myImage4.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage4.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (sub[loop].state.assignB2) {
      myImage5 = document.getElementById(`img_B2`);
      if (sub[loop].state.valueB2 > 0) {
        myImage5.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage5.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (sub[loop].state.assignC2) {
      myImage6 = document.getElementById(`img_C2`);
      if (sub[loop].state.valueC2 > 0) {
        myImage6.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage6.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
    if (sub[loop].state.assignD2) {
      myImage7 = document.getElementById(`img_D2`);
      if (sub[loop].state.valueD2 > 0) {
        myImage7.style.filter = "drop-shadow(0 0 10px #07b03f)";
      } else {
        myImage7.style.filter = "drop-shadow(0 0 0px #07b03f)";
      }
    }
  };

  play = (time) => {
    setTimeout(() => {
      if (j < this.props.logic.program.length) {
        switch (this.props.logic.program[j].type) {
          case "start": {
            j++;
            return this.play(10);
          }
          case "hardware": {
            this.hardware(j);
            j++;
            return this.play(0);
          }
          case "wait": {
            let timeArr = this.props.logic.program[j].state;
            let time =
              timeArr["ms"] +
              timeArr["s"] * 1000 +
              timeArr["m"] * 60 * 1000 +
              timeArr["h"] * 60 * 60 * 1000;
            j++;
            return this.play(time);
          }
          case "sensor": {
            let sub = this.props.logic.program[j].subprogram;
            if (sub.length === 0) {
              j++;
              return this.play(0);
            }
            let newSubs = sessionStorage.getItem("simulate");
            newSubs = JSON.parse(newSubs);
            let newItemval = {};
            newSubs.map((i) => {
              if (i.value) {
                newItemval[String(i.port)] = Number(i.value);
              }
            });
            let logicval = this.props.logic.program[j].state.value;
            let sourceval = this.props.logic.program[j].state.source;

            switch (this.props.logic.program[j].state.condition) {
              case "gt": {
                if (
                  logicval < newItemval[sourceval] ||
                  logicval < newItemval[sourceval[0]]
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              case "lt": {
                if (
                  logicval > newItemval[sourceval] ||
                  logicval > newItemval[sourceval[0]]
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              case "eq": {
                if (
                  logicval === newItemval[sourceval] ||
                  logicval === newItemval[sourceval[0]]
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              case "ne": {
                if (
                  logicval !== newItemval[sourceval] ||
                  logicval !== newItemval[sourceval[0]]
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              case "bw": {
                if (
                  logicval <
                    newItemval[sourceval] <
                    this.props.logic.program[j].state.value2 ||
                  logicval <
                    newItemval[sourceval[0]] <
                    this.props.logic.program[j].state.value2
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              default: {
                j++;
                break;
              }
            }
          }
          case "loop": {
            if (this.props.logic.program[j].type === "loop") {
              if (!this.props.logic.program[j].state.times) {
                this.props.logic.program[j].state.times = 1;
              }
              loopCount = [
                ...loopCount,
                this.props.logic.program[j].state.times,
              ];
              let sub = this.props.logic.program[j].subprogram;
              return this.playLoop(0, sub);
            } else {
              return this.play(0);
            }
          }
          default: {
            j++;
            break;
          }
        }
      } else {
        if (this.props.logic.end.state === "end") {
          j = 0;
          return;
        } else {
          j = 0;
          return this.play(0);
        }
      }
    }, time);
  };

  playLoop = (time, sub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        // if(image) image.style.stroke = "white"
        if (loop < sub.length) {
          switch (sub[loop].type) {
            case "hardware": {
              this.hardware2(sub, loop);
              loop++;
              return this.playLoop(0, sub);
            }
            case "wait": {
              let timeArr = sub[loop].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              loop++;
              return this.playLoop(time, sub);
            }
            case "loop": {
              if (sub[loop].type === "loop") {
                let sub1 = sub[loop].subprogram;
                k++;
                loopCount = [...loopCount, sub[loop].state.times];
                return this.playLoop2(0, sub1, sub);
              } else {
                return this.playLoop(0, sub);
              }
            }
            case "sensor": {
              let sub1 = sub[loop].subprogram;
              if (sub1.length === 0) {
                loop++;
                return this.playLoop(0, sub);
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[loop].state.source;

              switch (sub[loop].state.condition) {
                case "gt": {
                  if (
                    sub[loop].state.value < newItemval[sourceval] ||
                    sub[loop].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, sub);
                    }
                    break;
                  }
                }

                case "lt": {
                  if (
                    sub[loop].state.value > newItemval[sourceval] ||
                    sub[loop].state.value > newItemval[sourceval[0]]
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, sub);
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[loop].state.value === newItemval[sourceval] ||
                    sub[loop].state.value === newItemval[sourceval[0]]
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, sub);
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[loop].state.value !== newItemval[sourceval] ||
                    sub[loop].state.value !== newItemval[sourceval[0]]
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, sub);
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[loop].state.value >
                      newItemval[sourceval] >
                      sub[loop].state.value2 ||
                    sub[loop].state.value >
                      newItemval[sourceval[0]] >
                      sub[loop].state.value2
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, sub);
                    }
                    break;
                  }
                }
                default: {
                  loop++;
                  break;
                }
              }
            }
            default: {
              loop++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          loop = 0;
          if (loopCount[k] === 0) {
            j++;
            k++;
            return this.play(0);
          }
          return this.playLoop(0, sub);
        }
      }, time);
    } else {
      j++;
      loopCount.pop();
      this.play(0);
    }
  };

  playLoop2 = (time, sub, originalSub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        // if(image) image.style.stroke = "white"
        if (jj < sub.length) {
          switch (sub[jj].type) {
            case "hardware": {
              this.hardware2(sub, jj);
              jj++;
              return this.playLoop2(0, sub, originalSub);
            }
            case "wait": {
              let timeArr = sub[jj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jj++;
              return this.playLoop2(time, sub, originalSub);
            }
            case "sensor": {
              let sub1 = sub[jj].subprogram;
              if (sub1.length === 0) {
                jj++;
                return this.playLoop2(0, sub, originalSub);
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[jj].state.source;

              switch (sub[jj].state.condition) {
                case "gt": {
                  if (
                    sub[jj].state.value < newItemval[sourceval] ||
                    sub[jj].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, originalSub, sub);
                    }
                    break;
                  }
                }
                case "lt": {
                  if (
                    sub[jj].state.value > newItemval[sourceval] ||
                    sub[jj].state.value > newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, originalSub, sub);
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[jj].state.value === newItemval[sourceval] ||
                    sub[jj].state.value === newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, originalSub, sub);
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[jj].state.value !== newItemval[sourceval] ||
                    sub[jj].state.value !== newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, originalSub, sub);
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[jj].state.value < newItemval[sourceval] ||
                    sub[jj].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, originalSub, sub);
                    }
                    break;
                  }
                }
                default: {
                  jj++;
                }
              }
            }
            case "loop": {
              if (sub[jj].type === "loop") {
                let sub1 = sub[jj].subprogram;
                jjj = 0;
                k++;
                // console.log(sub1, "ssssssssaaaaaaaaaaaaa");
                loopCount = [...loopCount, sub[jj].state.times];
                return this.playLoop3(0, originalSub, sub, sub1);
              } else {
                this.playLoop2(0, sub, originalSub);
              }
            }
            default: {
              jj++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          jj = 0;
          if (loopCount[k] === 0) {
            k--;
            loop++;
            loopCount.pop();
            return this.playLoop(0, originalSub);
          }
          return this.playLoop2(0, sub, originalSub);
        }
      }, time);
    } else {
      loop++;
      k--;
      jj = 0;
      loopCount.pop();
      this.playLoop(0, originalSub);
    }
  };

  playLoop3 = (time, originalSub, originalSub2, sub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (jjj < sub.length) {
          switch (sub[jjj].type) {
            case "hardware": {
              this.hardware2(sub, jjj);
              jjj++;
              return this.playLoop3(0, originalSub, originalSub2, sub);
            }
            case "wait": {
              let timeArr = sub[jjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjj++;
              return this.playLoop3(time, originalSub, originalSub2, sub);
            }
            case "loop": {
              if (sub[jjj].type === "loop") {
                let sub1 = sub[jjj].subprogram;
                jjjj = 0;
                k++;
                loopCount = [...loopCount, sub[jjj].state.times];
                return this.playLoop4(0, originalSub, originalSub2, sub, sub1);
              } else {
                return this.playLoop3(0, originalSub, originalSub2, sub);
              }
            }
            case "sensor": {
              let sub1 = sub[jjj].subprogram;
              if (sub1.length === 0) {
                jjj++;
                return this.playLoop3(0, originalSub, originalSub2, sub);
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[jjj].state.source;

              switch (sub[jjj].state.condition) {
                case "gt": {
                  if (
                    sub[jjj].state.value < newItemval[sourceval] ||
                    sub[jjj].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(0, originalSub, originalSub2, sub);
                    }
                    break;
                  }
                }
                case "lt": {
                  if (
                    sub[jjj].state.value > newItemval[sourceval] ||
                    sub[jjj].state.value > newItemval[sourceval[0]]
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(0, originalSub, originalSub2, sub);
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[jjj].state.value === newItemval[sourceval] ||
                    sub[jjj].state.value === newItemval[sourceval[0]]
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(0, originalSub, originalSub2, sub);
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[jjj].state.value !== newItemval[sourceval] ||
                    sub[jjj].state.value !== newItemval[sourceval[0]]
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(0, originalSub, originalSub2, sub);
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[jjj].state.value <
                      newItemval[sourceval] <
                      sub[jjj].state.value2 ||
                    sub[jjj].state.value <
                      newItemval[sourceval[0]] <
                      sub[jjj].state.value2
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(0, originalSub, originalSub2, sub);
                    }
                    break;
                  }
                }
                default: {
                  jjj++;
                }
              }
            }
            default: {
              jjj++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          jjj = 0;
          if (loopCount[k] === 0) {
            k--;
            jj++;
            loopCount.pop();
            return this.playLoop2(0, originalSub2, originalSub, sub);
          }
          return this.playLoop3(0, originalSub, originalSub2, sub);
        }
      }, time);
    }
  };

  playLoop4 = (time, originalSub, originalSub2, originalSub3, sub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (jjjj < sub.length) {
          switch (sub[jjjj].type) {
            case "hardware": {
              this.hardware2(sub, jjjj);
              jjjj++;
              return this.playLoop4(
                0,
                originalSub,
                originalSub2,
                originalSub3,
                sub
              );
            }
            case "wait": {
              let timeArr = sub[jjjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjjj++;
              return this.playLoop4(
                time,
                originalSub,
                originalSub2,
                originalSub3,
                sub
              );
            }
            case "loop": {
              if (sub[jjjj].type === "loop") {
                let sub1 = sub[jjjj].subprogram;
                jjjjj = 0;
                k++;
                loopCount = [...loopCount, sub[jjjj].state.times];
                this.playLoop5(
                  0,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub,
                  sub1
                );
              } else {
                return this.playLoop4(
                  0,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
            }
            case "sensor": {
              let sub1 = sub[jjjj].subprogram;
              if (sub1.length === 0) {
                jjjj++;
                return this.playLoop4(
                  0,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[jjjj].state.source;

              switch (sub[jjjj].state.condition) {
                case "gt": {
                  if (
                    sub[jjjj].state.value < newItemval[sourceval] ||
                    sub[jjjj].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }
                case "lt": {
                  if (
                    sub[jjjj].state.value > newItemval[sourceval] ||
                    sub[jjjj].state.value > newItemval[sourceval[0]]
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[jjjj].state.value === newItemval[sourceval] ||
                    sub[jjjj].state.value === newItemval[sourceval[0]]
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[jjjj].state.value !== newItemval[sourceval] ||
                    sub[jjjj].state.value !== newItemval[sourceval[0]]
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[jjjj].state.value <
                      newItemval[sourceval] <
                      sub[jjjj].state.value2 ||
                    sub[jjjj].state.value <
                      newItemval[sourceval[0]] <
                      sub[jjjj].state.value2
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }
                default: {
                  jjjj++;
                }
              }
            }
            default: {
              jjjj++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          jjjj = 0;
          if (loopCount[k] === 0) {
            k--;
            jjj++;
            loopCount.pop();
            return this.playLoop3(
              0,
              originalSub,
              originalSub2,
              originalSub3,
              sub
            );
          }
          return this.playLoop4(
            0,
            originalSub,
            originalSub2,
            originalSub3,
            sub
          );
        }
      }, time);
    }
  };

  playLoop5 = (time, originalSub, originalSub2, originalSub3, sub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (jjjjj < sub.length) {
          switch (sub[jjjjj].type) {
            case "hardware": {
              this.hardware2(sub, jjjjj);
              jjjjj++;
              return this.playLoop5(
                0,
                originalSub,
                originalSub2,
                originalSub3,
                sub
              );
            }
            case "wait": {
              let timeArr = sub[jjjjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjjjj++;
              return this.playLoop5(
                time,
                originalSub,
                originalSub2,
                originalSub3,
                sub
              );
            }
            case "loop": {
              if (sub[jjjjj].type === "loop") {
                let sub1 = sub[jjjjj].subprogram;
                j6 = 0;
                k++;
                loopCount = [...loopCount, sub[jjjjj].state.times];
                return this.playLoop6(
                  0,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub,
                  sub1
                );
              } else {
                return this.playLoop5(
                  0,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
            }
            case "sensor": {
              let sub1 = sub[jjjjj].subprogram;
              if (sub1.length === 0) {
                jjjjj++;
                return this.playLoop5(
                  0,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[jjjjj].state.source;

              switch (sub[jjjjj].state.condition) {
                case "gt": {
                  if (
                    sub[jjjjj].state.value <
                    (newItemval[sourceval] || newItemval[sourceval[0]])
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjjj++;
                    break;
                  }
                }
                case "lt": {
                  if (
                    sub[jjjjj].state.value >
                    (newItemval[sourceval] || newItemval[sourceval[0]])
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "eq": {
                  if (
                    sub[jjjjj].state.value ===
                    (newItemval[sourceval] || newItemval[sourceval[0]])
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "ne": {
                  if (
                    sub[jjjjj].state.value !==
                    (newItemval[sourceval] || newItemval[sourceval[0]])
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "bw": {
                  if (
                    sub[jjjjj].state.value >
                    (newItemval[sourceval] || newItemval[sourceval[0]]) >
                    sub[jjjjj].state.value2
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop4(
                      0,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }
                default: {
                  jjjjj++;
                }
              }
            }
            default: {
              jjjjj++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          jjjjj = 0;
          if (loopCount[k] === 0) {
            k--;
            jjjj++;
            loopCount.pop();
            return this.playLoop4(
              0,
              originalSub,
              originalSub2,
              originalSub3,
              sub
            );
          }
          return this.playLoop5(
            0,
            originalSub,
            originalSub2,
            originalSub3,
            sub
          );
        }
      }, time);
    }
  };

  saveProgram = () => {
    this.props.history.push("/saveprogram");
  };

  uploadProgram = () => {
    this.myRef.current.upload(); //it will call anyFun which is available at simulateLogic.js
  };

  indexChange = (t, component) => {
    if (component == "switchComponents") {
      switch (t) {
        // HW/SW
        case 0: {
          let index = document.querySelector(".animation");

          document.getElementById("hex-Board-Grid").style.display = "none";
          index.style.zIndex = "0";
          document.getElementById("HW/SW-Display").style.zIndex = "-1";
          this.setState({
            countClick: 1,
          });
          break;
        }
        // SW
        case 1: {
          let index = document.querySelector(".animation");
          index.style.zIndex = "-1";

          document.getElementById("hex-Board-Grid").style.display = "block";
          document.getElementById("HW/SW-Display").style.zIndex = "-1";
          this.setState({
            countClick: 2,
            clicked: true,
          });

          break;
        }

        // HW
        case 2: {
          let index = document.querySelector(".animation");
          index.style.zIndex = "10";

          document.getElementById("hex-Board-Grid").style.display = "block";

          document.getElementById("HW/SW-Display").style.zIndex = "3000";

          this.setState({
            countClick: 0,
          });
          break;
        }
      }
    } else {
      this.setState({ clicked: false });
      let index = document.querySelector(".animation");
      index.style.zIndex = "-1";
    }

    // if (t === "clicked") {
    //   this.setState({ clicked: true });
    //   let index = document.querySelector(".animation");
    //   index.style.zIndex = "1000";
    // }
    //  else {
    //   this.setState({ clicked: false });
    //   let index = document.querySelector(".animation");
    //   index.style.zIndex = "-1";
    // }
  };

  closeModel = () => {
    let value = document.getElementById("inputValue").value;
    let data = JSON.parse(sessionStorage.getItem("simulate"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].componentName === this.state.componentClicked) {
        data[i].value = value;
      }
    }
    this.setState({
      model: false,
      rangeValue_: 0,
      rangeCountNumber_: 0,
    });
    sessionStorage.setItem("simulate", JSON.stringify(data));
    // CHANGING THE FOCUS
    let index = document.querySelector(".animation");
    index.style.zIndex = "1000";
  };

  updateState = (values, compName, realName, rangeValue) => {
    this.setState({
      model: values,
      componentClicked: realName,
      compName: compName,
      rangeValue_: rangeValue,
    });

    this.indexChange();
  };
  rangeNumeberHandler = (e) => {
    this.setState({
      rangeCountNumber_: e.target.value,
    });
  };
  render() {
    //bytes code
    var takingInput = (
      <Modal
        isOpen={this.state.model}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* < img onClick={this.closeModel} className="closeconceptModal" src="images/login/button_exit@2x.png"></img> */}
        <div className="connectconceptMsg">
          <h3>
            {/* Give an input for the{" "} */}
            <span
              style={{
                color: "red",
                position: "absolute",
                top: "15%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {this.state.compName}
            </span>
          </h3>
          {/* <input type="number" id="inputValue" min="0" />  */}

          <div style={{ display: "flex" }}>
            <input
              type="range"
              style={styleSimulate_.rangeStyle_}
              id="inputValue"
              min="0"
              max={this.state.rangeValue_}
              value={this.state.rangeCountNumber_}
              onChange={this.rangeNumeberHandler}
            />

            <div style={styleSimulate_.numberStyle}>
              {this.state.rangeCountNumber_}
            </div>
          </div>
          {/* <div style={{ width: " 90%" }}>
          <SliderRangeTwo />
        </div> */}
          <button
            className="BtnPopup"
            style={{ marginTop: "8%" }}
            onClick={this.closeModel}
          >
            OK
          </button>
        </div>
      </Modal>
    );
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          // backgroundColor: "rgb(166, 209, 225)",
          backgroundColor: "#fff",
        }}
      >
        <div className="navbarContainer">
          <div className="navbar_content">
            <div className="navbar_new ">Select</div>
            <div className="navbar_new ">Assemble</div>
            <div className="navbar_new">Code</div>
            <div className="navbar_new isActive">Simulate</div>
          </div>

          <img
            src={renderPrgImage("assemblebar")}
            style={{ height: "100%", width: "63%" }}
          />

          <div className="navbar-Action">
            <img
              src={renderPrgImage("saveBtnInActive")}
              className="iconBtnSize"
              style={{ marginRight: "25px" }}
              onClick={this.saveProgram}
            />

            {/* <img
              className="iconBtnSize"
              src={renderPrgImage("helpBtnInActive")}
              style={{ marginRight: "25px" }}
            /> */}
            {this.state.isHelp ? (
              <div className="Ss_slide">
                <SimulatePrgm />
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

        {/* BOTTOM BACK,NEXT BTN and discription*/}
        <div className="SelectScreenBottom" style={{ zIndex: "500200" }}>
          <div className="bottom-child">
            {this.state.isHelp ? null : (
              <img
                className="iconBtnSize imgBackBtn"
                src={renderPrgImage("backBtn")}
                onClick={() => {
                  this.props.history.push("/logic");
                  window.location.reload();
                }}
              />
            )}

            {this.state.isHelp ? null : (
              <div className="simulateBtnBottom">
                {this.state.countClick == 0 ? (
                  <img
                    className="iconBtnSize simulateBtn"
                    src={renderPrgImage("HW_SW_btn")}
                    onClick={(e) =>
                      this.indexChange(
                        this.state.countClick,
                        "switchComponents"
                      )
                    }
                  />
                ) : this.state.countClick == 1 ? (
                  <img
                    className="iconBtnSize simulateBtn"
                    src={renderPrgImage("HWbtn")}
                    onClick={(e) =>
                      this.indexChange(
                        this.state.countClick,
                        "switchComponents"
                      )
                    }
                  />
                ) : (
                  <img
                    className="iconBtnSize simulateBtn"
                    src={renderPrgImage("SWbtn")}
                    onClick={(e) =>
                      this.indexChange(
                        this.state.countClick,
                        "switchComponents"
                      )
                    }
                  />
                )}{" "}
                <img
                  className="iconBtnSize simulateBtn"
                  src={renderPrgImage("oneXspeedInActive")}
                />{" "}
                {/* PLAY PAUSE */}
                <div
                  className="iconBtnSize simulateBtn"
                  onClick={() => {
                    this.play(0, true);
                    this.myRef.current.anyFun();
                  }}
                >
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={
                      this.state.paly_pause_btn
                        ? renderPrgImage("playrunBtn")
                        : renderPrgImage("pauseBtn")
                    }
                    onClick={() => {
                      this.setState({
                        paly_pause_btn: !this.state.paly_pause_btn,
                      });
                      if (this.state.paly_pause_btn === false)
                        window.location.reload();
                    }}
                    alt="save"
                  />
                </div>
              </div>
            )}

            {/* UPLOAD */}
            {this.state.isHelp == false ? (
              <img
                className="imgUploadBtn"
                src={renderPrgImage("uploadBtn")}
                style={{ height: "70px", width: "70px" }}
                onClick={this.uploadProgram}
              />
            ) : null}
          </div>
        </div>

        {/* <div className="CSD_simulate">
        // SAVE BTN
          <div
            onClick={this.saveProgram}
            style={{
              height: "100px",
              width: "100px",
              margin: "5px 0 0 6px",
              float: "left",
              position: "relative",
              top: "84vh",
            }}
          >
            <img
              src="images/Simulate/icon_save.png"
              style={{ height: "100%", width: "100%" }}
              alt="asddsad"
            />
          </div>
          // 
          <div upload btn
            onClick={this.uploadProgram}
            style={{
              cursor: "pointer",
              height: "100px",
              width: "100px",
              margin: "5px 0 0 6px",
              float: "left",
              position: "relative",
              top: "84vh",
            }}
          >
            <img
              src="images/Simulate/icon_upload.png"
              style={{ height: "100%", width: "100%" }}
              alt="imgasdf"
            />
          </div>
        </div> */}

        <div style={{ height: "90%", position: "relative" }}>
          {takingInput}
          {/*HEX-BOARD Logic Screen for the simulation screen */}

          <div className="simulate_logic" id="hex-Board-Grid">
            <SimulateLogic ref={this.myRef} />
          </div>

          {/* HW/SW */}
          <div
            id="HW/SW-Display"
            style={{
              // top: "10vh",
              height: "100%",
              width: "100vw",
              position: "absolute",
              float: "left",
              zIndex: "50000",
              opacity: "0",
            }}
          ></div>

          {/* Assembly scrren for the simulation screen */}
          <div
            className="animation"
            style={{
              top: "10vh",
              height: "80%",
              width: "100vw",
              position: "absolute",
              float: "left",
            }}
          >
            {sessionStorage.getItem("connectedDevice") === "Humanoid" ? (
              <React.Fragment>
                <CustomNodeFlowHumanoid
                  compo={this.props.assembly.workspace.components}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <CustomNodeFlow
                  compo={this.props.assembly.workspace.components}
                  updateState={this.updateState}
                  indexChange={this.indexChange}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(Simulate);
