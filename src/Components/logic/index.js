import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import io from "socket.io-client";
import Hammer from "react-hammerjs";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import unicodeToChar from "../../utils/unicodeToChar";
// import DragDropContext from 'react-dnd';
// import TouchBackend from 'react-dnd-touch-backend';

import { connect } from "react-redux";
import HexBoard from "./HexBoard";
import BottomPanel from "./BottomPanel";
// import RightPanel from './RightPanel'
import SizesHelper from "../../helpers/Sizes";
import Sizes from "./Sizes";
import ProgramToDrawing from "./ProgramToDrawing";

import "../../css/logic.css";
import Modal from "react-modal";
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
  nextBtn,
  usbOFF,
  usbON,
  UsbOff,
} from "../../source/index";
import Colors from "./Colors";
import { object } from "prop-types";
import renderPrgImage from "../../source/programImg";
import LogicPrgm from "../ReusableComponents/PrgmSlider/LogicPrgm/LogicPrgm";
var _ = require("lodash");

var countLogic;
var oldDeltaX, oldDeltaY, panning;
var idss = [];
var IDIS = "";
var clientX, clientY;
var drawing,
  drawingNew,
  defaultScale = 1;
var panning = false,
  zooming = false,
  dontTriggerClick = false;
var finalOffset = { left: 0, top: 0 };
let newArr = [];
let num = 0;
// CHNAGE by: SOUMITYA

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     height: "28%",
//     width: " 30%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "#9ecee8",
//     border: "2px solid #188dcc",
//     zIndex: 1,
//   },
// };

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
    // backgroundColor: "#9ecee8",
    // border: "2px solid #188dcc",

    border: "5px solid rgb(255,140,25)",
    borderRadius: "20px",

    overflow: "initial",
    // zIndex: 1,
  },
};

const customStylesUpload = {
  content: {
    top: "50%",
    left: "50%",
    height: " 30%",
    width: " 30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    zIndex: 1000000,
    borderRadius: "15px",
    transform: "translate(-50%, -50%)",
    border: "5px solid skyblue",
  },
};

let newId = 0;

class Logic extends Component {
  constructor(props) {
    super(props);
    var { logic } = this.props;

    var tutorialLogic = sessionStorage.getItem("tutorialLogic");

    var tutorialDescArray = [];
    var selectionType = localStorage.getItem("programMode");

    if (selectionType == "learn") {
      var tutorialDesc = JSON.parse(sessionStorage.getItem("tutorialLogic"));
      // tutorialDescArray.push(JSON.parse(tutorialDesc).logic1)
      // tutorialDescArray.push(JSON.parse(tutorialDesc).logic2)
    }

    drawing = ProgramToDrawing(
      logic.program,
      logic.end,
      logic.currentProgramGuide,
      logic.active,
      this.add,
      logic.insertState,
      this.insertNode,
      this.deleteNode
    );
    var curLogicScreen;
    curLogicScreen = "hexa";
    // this.click = this.click.bind(this)
    // this.add = this.add.bind(this)

    this.state = {
      hexType: "",
      uploadOpen: false,
      tutorialDesc: tutorialDesc,
      tutorialLogic: JSON.parse(tutorialLogic),
      modalIsOpen: false,
      usbOpen: false,
      isusb: false,
      isHelp: false,
      currentLogicScreen: curLogicScreen,
      currentNode: {},
      visible: false,
      currentNodeIndex: 0,
      nodeCount: 1,
      detected: false,
      readyForSimulation: "",
      checkEndProgram: false,
      clickedBottom: false,
    };
  }

  componentWillMount = () => {
    const { program, end, insertState, currentProgramGuide, active } =
      this.props.logic;

    drawing = ProgramToDrawing(
      program,
      end,
      currentProgramGuide,
      active,
      this.add,
      insertState,
      this.insertNode,
      this.deleteNode
    );
  };

  componentWillUpdate(nextProps, nextState) {
    const { program, end, insertState, currentProgramGuide, active } =
      this.props.logic;

    drawing = ProgramToDrawing(
      program,
      end,
      currentProgramGuide,
      active,
      this.add,
      insertState,
      this.insertNode,
      this.deleteNode
    );
  }
  componentDidUpdate(prevProps, prevState) {
    drawing.updated = false;
    // drawingNew.updated = false;
  }

  handleUsb = (e) => {
    this.setState({ isusb: !this.state.isusb });
  };
  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };
  componentDidMount = () => {
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
    socket.on("/usbDetection", (data) => {
      console.log("DATAE:----", data);
      this.setState({ detected: data.detected, usbOpen: !data.detected });
    });
    // this.setState({ hexType: "wait" })
    if (sessionStorage.getItem("programEnd") != null) {
      this.setState({ readyForSimulation: "repeat" });
    }
  };

  constraintOffset = (offset) => {
    var el = document.getElementById("logicOffsetTransformer", this.props);
    const BBox = el.getBBox();
    const { height, width } = this.props.assembly;
    const scale = this.props.logic.scale * defaultScale;
    if (offset.left * scale > width / 2) offset.left = width / (2 * scale);
    else if (offset.left < -BBox.width + width / (2 * scale))
      offset.left = -BBox.width + width / (2 * scale);
    if (offset.top * scale > height / 2) offset.top = height / (2 * scale);
    else if (offset.top < -BBox.height + height / (2 * scale))
      offset.top = -BBox.height + height / (2 * scale);
  };

  /**
   * Pan event handler : does not update state for smooth panning. Also throttles the event
   */
  pan = (e) => {
    if (panning) return;
    panning = true;
    var el = document.getElementById("logicOffsetTransformer");
    var BBox = el.getBBox();
    const { offset } = this.props.logic;

    const { height, width } = this.props.assembly;

    finalOffset.left = offset.left + e.deltaX;
    finalOffset.top = offset.top + e.deltaY;
    if (finalOffset.left > width / 2) finalOffset.left = width / 2;
    else if (finalOffset.left < -BBox.width + width / 2)
      finalOffset.left = -BBox.width + width / 2;
    if (finalOffset.top > height / 2) finalOffset.top = height / 2;
    else if (finalOffset.top < -BBox.height + height / 2)
      finalOffset.top = -BBox.height + height / 2;
    el.setAttribute(
      "transform",
      "translate(" + finalOffset.left + "," + finalOffset.top + ")"
    );
    panning = false;
  };

  /**
   * Set dontTriggerClick variable to true
   */
  panStart = () => {
    dontTriggerClick = true;
  };
  /**
   * Update state variables
   */
  panEnd = (e) => {
    var { logic } = this.props;
    logic.offset.left = finalOffset.left;
    logic.offset.top = finalOffset.top;
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic, () => (panning = false));
  };
  panEndNew = () => {
    panning = false;
    oldDeltaX = 0;
    oldDeltaY = 0;
  };

  zoom = (scale, clientX, clientY) => {
    var { height, width } = this.props.assembly;
    var { logic } = this.props;
    var clientY = height;
    if (zooming) return;
    var { height, width } = this.props.assembly;
    var { logic } = this.props;
    var clientY = height;

    if ((logic.scale < 0.5 && scale < 1) || (logic.scale > 2 && scale > 1))
      return;
    // zooming = true;
    var clientY = height;
    // client = (offset + x/y) * scale
    // client of oldx/y = client of newx/y (current mouse position)
    // oldx/y = client / scale - offset
    // (newoffset + oldx/y) * newscale = (oldOffset + oldx/y) * oldscale
    const oldX = clientX / (logic.scale * defaultScale) - logic.offset.left;

    const oldY = clientY / (logic.scale * defaultScale) - logic.offset.top;
    logic.offset.left = (logic.offset.left + oldX) / scale - oldX;
    logic.offset.top = (logic.offset.top + oldY) / scale - oldY;

    logic.scale *= scale;

    this.constraintOffset(logic.offset);
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic, () => {
      zooming = false;
    });
  };

  /**
   * Pinch Out event handler
   */
  pinchOut = (e) => {
    this.zoom(6 / 5, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  };

  /**
   * Pinch In event handler
   */
  pinchIn = (e) => {
    this.zoom(5 / 6, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  };
  pinchOutNew = (e) => {
    this.zoomNew(12 / 11, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  };
  /**
   * Pinch In event handler
   */
  pinchInNew = (e) => {
    this.zoomNew(11 / 12, e.center.x, e.center.y);
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
    // e.preventDefault();
    const { clientX, clientY, deltaY } = e;
    if (deltaY > 0) {
      this.zoom(5 / 6, clientX, clientY);
    } else {
      this.zoom(6 / 5, clientX, clientY);
    }
    return false;
  };
  wheelNew = (e) => {
    const { clientX, clientY, deltaY } = e;
    if (deltaY > 0) this.zoomNew(5 / 6, clientX, clientY);
    else this.zoomNew(6 / 5, clientX, clientY);
    // e.preventDefault();
    return false;
  };
  click = (row, col) => {
    // alert("CLICK");
    // alert(window.event.clientX)
    // IDIS = `${1}${col}`;
    // IDIS = window.event.clientX*window.event.clientY;

    if (dontTriggerClick) {
      dontTriggerClick = false;
      return;
    }
    var { logic } = this.props;

    const { currentProgramGuide } = logic;

    var todo = "current";

    logic.insertState = false;

    const { type } = drawing.board[row][col];

    if (type === "blank" || type === "hand" || type === "highlighted_hand")
      todo = "blank";
    if (todo === "current") {
      logic.active = [row, col];

      drawing = ProgramToDrawing(
        logic.program,
        logic.end,
        logic.currentProgramGuide,
        logic.active,
        this.add,
        logic.insertState,
        this.insertNode,
        this.deleteNode,
        this.click
      );

      var logicState = {};
      // logicState['type'] = this.state.currentLogicScreen;
      // logicState['state'] = logic;
      // IDIS=Math.floor(Math.random()*10000000000000)
      // idss.push(`${row}-${col}`);
      //  logic.ids=idss;

      this.props.update(logic);
    } else if (todo === "blank") {
      logic.active = [-1, -1];

      // Uncomment the following line to auto-minimize bottomPanel on blank space click
      // logic.bottomPanel = 'border';
      drawing = ProgramToDrawing(
        logic.program,
        logic.end,
        logic.currentProgramGuide,
        logic.active,
        this.add,
        logic.insertState,
        this.insertNode,
        this.deleteNode
      );
      var logicState = {};
      logicState["type"] = this.state.currentLogicScreen;
      logicState["state"] = logic;

      this.props.update(logic);
    }
  };
  recurseAdd = (instructions, nesting, toPush) => {
    // alert("RECURSE_ADD");

    if (instructions.length !== 0) {
      if (nesting === 0) {
        instructions.push(toPush);
      } else {
        this.recurseAdd(
          instructions[instructions.length - 1].subprogram,
          nesting - 1,
          toPush
        );
      }
    }
  };
  add = (type) => {
    // alert("ADD()");

    if (type == "repeat") {
      this.setState({ readyForSimulation: type });
      sessionStorage.setItem("programEnd", type);
    }

    if (dontTriggerClick) {
      dontTriggerClick = false;
      return;
    }

    var { logic } = this.props;

    logic.active = [-1, -1];

    // console.log("logic.program new", logic.program, type)

    if (
      type === "end_variable" ||
      type === "end_sensor" ||
      type === "end_condition" ||
      type === "end_if" ||
      type === "end_loop" ||
      type === "repeat"
    )
      logic.currentProgramGuide--;
    else {
      var toPush = { type: type, state: {} };

      if (
        type === "variable" ||
        type === "sensor" ||
        type === "condition" ||
        type === "loop"
      )
        toPush.subprogram = [];
      this.recurseAdd(logic.program, logic.currentProgramGuide, toPush);
      if (
        type === "variable" ||
        type === "sensor" ||
        type === "condition" ||
        type === "loop"
      )
        logic.currentProgramGuide++;
    }

    drawing = ProgramToDrawing(
      logic.program,
      logic.end,
      logic.currentProgramGuide,
      logic.active,
      this.add
    );
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic);
  };

  insertNode = (type) => {
    // for(let n = 0; n<drawing.activeParentRef.slice(drawing.activeIndex, drawing.activeParentRef.length).length; n++){
    //   drawing.activeParentRef[n].id= JSON.stringify(Number(drawing.activeParentRef[n].id) + 1)
    // }

    num++;

    var { logic } = this.props;

    if (!logic.insertState) {
      logic.insertState = true;
    } else {
      // this condition is for the  render the bolck wait click it action and then wait hadrware panke will open
      if (type != "action") {
        logic.insertState = false;
        var temp = drawing.activeParentRef[drawing.activeIndex];

        // HERE I AM STOPING TO ADD THE ACTION on HEXBOARD

        var toPush = { type: type, state: {}, id: IDIS };

        if (
          type === "variable" ||
          type === "condition" ||
          type === "sensor" ||
          type === "loop"
        )
          toPush.subprogram = [];
        drawing.activeParentRef[drawing.activeIndex] = toPush;
        for (
          let i = drawing.activeIndex + 1;
          i < drawing.activeParentRef.length;
          i++
        ) {
          var temp2 = drawing.activeParentRef[i];
          drawing.activeParentRef[i] = temp;
          temp = temp2;
        }
        if (temp) drawing.activeParentRef.push(temp);
        logic.active = [-1, -1];

        logic.program.map((i, id) => {
          i.id = `${1}${id}`;
        });
      }
    }

    drawing = ProgramToDrawing(
      logic.program,
      logic.end,
      logic.currentProgramGuide,
      logic.active,
      this.add,
      logic.insertState,
      this.insertNode,
      this.deleteNode,
      type
    );
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic);
  };

  deleteNode = () => {
    var { logic } = this.props;
    if (
      drawing.activeParentRef.length - 1 == drawing.activeIndex &&
      (drawing.activeRef.type === "variable" ||
        drawing.activeRef.type === "sensor" ||
        drawing.activeRef.type === "condition" ||
        drawing.activeRef.type === "loop")
    ) {
      let currentProgramGuide = 0,
        temp = logic.program;
      while (
        temp != drawing.activeParentRef &&
        currentProgramGuide < logic.currentProgramGuide
      ) {
        temp = temp[temp.length - 1].subprogram;
        currentProgramGuide++;
      }
      if (currentProgramGuide < logic.currentProgramGuide)
        logic.currentProgramGuide = currentProgramGuide;
    }
    // alert(drawing.activeIndex)
    drawing.activeParentRef.splice(drawing.activeIndex, 1);
    logic.active = [-1, -1];

    drawing = ProgramToDrawing(
      logic.program,
      logic.end,
      logic.currentProgramGuide,
      logic.active,
      this.add,
      logic.insertState,
      this.insertNode,
      this.deleteNode
    );
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic);
  };

  toggleBottomPanel = () => {
    var { logic, logicEditor, update } = this.props;
    if (logic.bottomPanel === "show") logic.bottomPanel = "border";
    else logic.bottomPanel = "show";
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    var logicToBeChanged;
    // if (this.state.currentLogicScreen == "hexa") {
    logicToBeChanged = logic;
    // } else if (this.state.currentLogicScreen == "flow") {
    //   logicToBeChanged = logicNew;
    // }
    // else if (this.state.currentLogicScreen == "python") {
    //   logicToBeChanged = pythonEditor;
    // } else {
    //   logicToBeChanged = logicEditor;
    // }

    logicState["state"] = logicToBeChanged;

    this.props.update(logic);
  };
  /* 
    function to recursively delete start keys which are false and are 
    present in other nodes of the program.
  */
  bottomPanelDelete = (key) => {
    var { logic } = this.props;
    var search = key;
    function recursiveDeleteFromObject(search, OBJ) {
      for (var key in OBJ) {
        if (!(key == search) && typeof OBJ[key] === "object") {
          recursiveDeleteFromObject(search, OBJ[key]);
        } else {
          if (key == search) {
            delete OBJ[key];
          }
        }
      }
      return OBJ;
    }
    function recursiveDeleteFromArrayObject(search, Arr_OBJ) {
      for (var key in Arr_OBJ) {
        Arr_OBJ[key] = recursiveDeleteFromObject(search, Arr_OBJ[key]);
      }
      return Arr_OBJ;
    }
    var result = recursiveDeleteFromArrayObject(search, logic.program);
    logic.program = result;
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic);
  };
  bottomPanelChange = (state, type) => {
    // alert("BOTTOMPANEL CHANGE");
    var { logic } = this.props;

    if (type) {
      drawing.activeRef.type = type;
    }
    // if (state) {
    drawing.activeRef.state = state;
    // }

    if (drawing.activeRef.type === "end") console.log("bottomPanelChange end");

    drawing = ProgramToDrawing(
      logic.program,
      logic.end,
      logic.currentProgramGuide,
      logic.active,
      this.add
    );
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic);
  };
  handleBottomPanelClick = () => {
    var { logic } = this.props;
    if (logic.bottomPanel === "show") {
      logic.bottomPanel = "border";
      dontTriggerClick = true;
    }
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic);
  };

  seperateClicked = () => {
    // $(document).ready(function =()=>{
    //   $(".hide").click(function =()=>{
    //     $("p").hide();
    //   });
    //   $(".show").click(function =()=>{
    //     $("p").show();
    //   });
    // });
  };
  clickmeUp = () => {
    var { logic } = this.props;
    if (logic.bottomPanel != "show") logic.bottomPanel = "show";
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic);
  };
  clickmeDown = () => {
    var { logic } = this.props;
    if (logic.bottomPanel === "show") logic.bottomPanel = "border";
    var logicState = {};
    logicState["type"] = this.state.currentLogicScreen;
    logicState["state"] = logic;

    this.props.update(logic);
  };

  setCurrentNode(current, index) {
    this.setState({ currentNode: current, currentNodeIndex: index });
  }

  showSetting = () => {
    document.getElementById("divH").style.display = "inline";
  };
  closeSetting = () => {
    document.getElementById("divH").style.display = "none";
    document.getElementById("divH1").style.display = "none";
  };
  showConverter = () => {
    document.getElementById("divH1").style.display = "block";
  };

  Save = () => {
    // console.log("SAVE==>");
  };
  close = () => {
    this.setState({ modalIsOpen: false });
  };
  closeUpload = () => {
    this.setState({ uploadOpen: false });
  };
  closeUsb = () => {
    this.setState({ usbOpen: false });
  };
  check = () => {
    var program = JSON.parse(sessionStorage.getItem("logic")).program;
    var end = JSON.parse(sessionStorage.getItem("logic")).end;

    this.setState({ uploadOpen: true });
    setTimeout(() => {
      this.setState({ uploadOpen: false });
    }, 2000);

    var socket = socketIOClient("http://localhost:3008");
    if (localStorage.getItem("programMode") == "learn") {
      socket.emit("/checkLogic", program, end, "Final");
      socket.on("/logicResult", (data) => {
        if (!data) {
          this.setState({ modalIsOpen: true });
          return true;
        } else {
          var params = {
            screen: "hexa",
            logic: this.props.logic,
            components: this.props.assembly.PortConnections,
          };
          var Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
          // console.log("this.props.history DONE LOGIC", Peripherial[0]["mac"])

          if (Peripherial) {
            socket.emit("/upload", { code: params }, Peripherial[0]["mac"]);
          } else {
            socket.emit("/upload", { code: params });
          }

          socket.on("_upload", (data) => {
            // this.setState({ modalIsOpen: true })
          });
          return false;
          // this.props.history.push("/Learn")
        }
      });
    } else {
      var params = {
        screen: "hexa",
        logic: this.props.logic,
        components: this.props.assembly.PortConnections,
      };
      var Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
      // console.log("this.props.history DONE LOGIC", Peripherial[0]["mac"])

      if (Peripherial) {
        socket.emit("/upload", { code: params }, Peripherial[0]["mac"]);
      } else {
        socket.emit("/upload", { code: params });
      }

      socket.on("_upload", (data) => {
        // this.setState({ modalIsOpen: true })
      });
      return false;
      // this.props.history.push("/Learn")
    }
  };
  tutor = () => {
    this.props.history.push("/saveTutorials");
  };
  hexTypeCheck = (value) => {
    this.setState({ hexType: value });
  };
  if = (value) => {
    return (
      <div>
        Click on the hand hex and click on action hex ,double click the action
        hex and select {value.type}{" "}
        {
          ((
            <div>
              {" "}
              Set{" "}
              {Object.entries(value.state).map(([key, value]) => {
                return (
                  <span>
                    {" "}
                    {key} {value}
                  </span>
                );
              })}
            </div>
          ),
          (
            <div>
              {" "}
              Down to {value.type}{" "}
              {value.subprogram
                ? value.subprogram.map((value, index) => {
                    return value.type == "hardware" ||
                      value.type == "variable" ||
                      value.type == "wait"
                      ? this.output(value)
                      : value.type == "sensor" || value.type == "variable"
                      ? this.if(value)
                      : "";
                    // return <div>{index}{value.type}</div>
                  })
                : ""}
            </div>
          ))
        }
      </div>
    );
  };
  output = (value) => {
    var hardware = [];
    var keyValueArray = [];
    var keyTypeArray = [];
    var keyValue;
    var keyType;
    if (value.type == "hardware") {
      hardware.push("Click on the hand icon and select Action ");
      hardware.push("Double Click and select hardware ");
      Object.entries(value.state).map(([key, value]) => {
        // return (<span> {key} {value}</span>)
        // var key1 = key[
        // var value1 = key["value"]
        if (key.includes("assign")) {
          keyType = key.split("gn");
          keyTypeArray.push(keyType[1]);
        }

        if (key.includes("value")) {
          keyValue = key.split("ue");
        }

        for (let i = 0; i < keyTypeArray.length; i++) {
          if (keyValue) {
            if (keyValue[1] == keyTypeArray[i]) {
              keyValueArray.push([keyTypeArray[i] + ":" + value]);
            }
          }
        }

        hardware.push("set " + key + " to " + value);
      });
    }

    return (
      <div>
        Click on the hand hex and click on action hex ,double click the action
        hex and select {value.type}{" "}
        {
          <div>
            {" "}
            Set{" "}
            {Object.entries(value.state).map(([key, value]) => {
              return (
                <span>
                  {" "}
                  {key} {value}
                </span>
              );
            })}
          </div>
        }
      </div>
    );
  };

  checkForSimulation = () => {
    // let {bottomPanel} = this.props.logic
    // if(bottomPanel){
    //   return;
    // }
    if (this.state.readyForSimulation === "repeat") {
      this.props.history.push("/simulate");
      window.location.reload();
    } else {
      this.setState({ checkEndProgram: true });
    }
  };
  closecheckEndProgram = () => {
    this.setState({ checkEndProgram: false });
  };

  // ITS =(e) => {
  //   alert(e)
  // }
  render = () => {
    const { program, scale, offset, currentProgramGuide, active } =
      this.props.logic;

    var tempData;
    countLogic = 0;
    //description
    if (localStorage.getItem("programMode") == "learn") {
      this.state.tutorialDesc.map((value, index) => {
        // (value.type == "hardware" || value.type == "variable" || value.type == "wait") ? this.output(value) : (value.type == "sensor" || value.type == "variable") ? this.if(value) : ""
        // return <div>{index}{value.type}</div>
        if (countLogic == 0) {
          if (program[index]) {
            if (program[index].type != "start") {
              if (program[index].type == value.type) {
                // console.log("program check khushboo", value, program[index].state, countLogic, JSON.stringify(program[index].state) == JSON.stringify(value.state))
                // _.isEqual(program[index].state, value.state);
                if (_.isEqual(program[index].state, value.state)) {
                  if (value.subprogram !== undefined) {
                    value.subprogram.map((value1, indexSub) => {
                      if (
                        program[index].subprogram[indexSub] &&
                        value.subprogram[indexSub]
                      ) {
                        if (
                          program[index].subprogram[indexSub].type ==
                          value.subprogram[indexSub].type
                        ) {
                          if (
                            _.isEqual(
                              program[index].subprogram[indexSub].state,
                              value.subprogram[indexSub].state
                            )
                          ) {
                            // countLogic++
                            // tempData = (value.type == "hardware" || value.type == "variable" || value.type == "wait") ? this.output(value, "state") : (value.type == "sensor" || value.type == "variable") ? this.if(value) : ""
                          } else {
                            countLogic++;
                            tempData =
                              value.subprogram[indexSub].type == "hardware" ||
                              value.subprogram[indexSub].type == "variable" ||
                              value.subprogram[indexSub].type == "wait"
                                ? this.output(
                                    value.subprogram[indexSub],
                                    "state"
                                  )
                                : value.type == "sensor" ||
                                  value.type == "variable"
                                ? this.if(value, "state")
                                : "";
                          }
                        } else {
                          countLogic++;
                          tempData =
                            value.subprogram[indexSub].type == "hardware" ||
                            value.subprogram[indexSub].type == "variable" ||
                            value.subprogram[indexSub].type == "wait"
                              ? this.output(value.subprogram[indexSub])
                              : value.type == "sensor" ||
                                value.type == "variable"
                              ? this.if(value, "subprogram")
                              : "";
                        }
                      } else {
                        countLogic++;
                        tempData =
                          value.subprogram[indexSub].type == "hardware" ||
                          value.subprogram[indexSub].type == "variable" ||
                          value.subprogram[indexSub].type == "wait"
                            ? this.output(value.subprogram[indexSub])
                            : value.type == "sensor" || value.type == "variable"
                            ? this.if(value, "subprogram")
                            : "";
                      }
                    });
                  }
                  // countLogic++
                  // tempData = (value.type == "hardware" || value.type == "variable" || value.type == "wait") ? this.output(value, "state") : (value.type == "sensor" || value.type == "variable") ? this.if(value) : ""
                } else {
                  countLogic++;
                  tempData =
                    value.type == "hardware" ||
                    value.type == "variable" ||
                    value.type == "wait"
                      ? this.output(value, "state")
                      : value.type == "sensor" || value.type == "variable"
                      ? this.if(value, "state")
                      : "";
                }
              } else {
                countLogic++;
                tempData =
                  value.type == "hardware" ||
                  value.type == "variable" ||
                  value.type == "wait"
                    ? this.output(value)
                    : value.type == "sensor" || value.type == "variable"
                    ? this.if(value)
                    : "";
              }
            }
          } else {
            countLogic++;

            tempData =
              value.type == "hardware" ||
              value.type == "variable" ||
              value.type == "wait"
                ? this.output(value)
                : value.type == "sensor" || value.type == "variable"
                ? this.if(value)
                : "";
          }
        }
        // tempData = <div>hye</div>
      });
    }
    // As according to app approx 11.5 hexagons in a row in the display

    defaultScale = SizesHelper.width / (11.5 * Sizes.xdiff);
    var { bottomPanel } = this.props.logic;

    const { height, width } = this.props.assembly;

    var value = {};
    var current = "";
    var App = this.props.app;
    var LogicFlowButtons;
    var logicEditorScreenType = this.state.currentLogicScreen;
    var { components } = this.props.assembly.workspace;
    var { PortConnections } = this.props.assembly;

    // Object.keys(PortConnections).map(port => PortConnections[port] = null);
    Object.keys(components).map((type) => {
      components[type].map((component, index) => {
        if (type == "dc_motor" && component.connectedTo == "A2") {
          PortConnections[component.connectedTo] = { type, index };
          index = index + 1;
          PortConnections["A1"] = { type, index };
        }
        if (type == "dc_motor" && component.connectedTo == "A3") {
          PortConnections[component.connectedTo] = { type, index };
          index = index + 1;
          PortConnections["A4"] = { type, index };
        }
        if (type == "dc_motor" && component.connectedTo == "F1") {
          PortConnections[component.connectedTo] = { type, index };
          index = index + 1;
          PortConnections["F2"] = { type, index };
        }
        if (type == "dc_motor" && component.connectedTo == "G1") {
          PortConnections[component.connectedTo] = { type, index };
          index = index + 1;
          PortConnections["G2"] = { type, index };
        } else {
          PortConnections[component.connectedTo] = { type, index };
        }
      });
    });

    if (active) {
      if (active[0] !== -1) current = drawing.board[active[0]][active[1]].type;
    }

    if (
      current === "blank" ||
      current === "active_hand" ||
      current === "" ||
      current === "hand" ||
      current === "highlighted_hand" ||
      current == "action"
    )
      bottomPanel = "none";

    if (drawing && drawing.activeRef.state) {
      value = drawing.activeRef.state;
    }
    if (!drawing.activeRef.state) {
      drawing.activeRef.state = {};
    }

    if (this.state.detected == true) {
      var imageURL = "images/Learn/ble_connection.png";
    } else {
      imageURL = "images/Learn/ble_disconnection.png";
    }
    newId = newArr.push(Math.floor(Math.random() * 1000000000000));
    return (
      <div
        style={{
          // backgroundColor: "rgb(166, 209, 225)",
          background: "#FCFCFC",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* MENU */}
        <div style={{ backgroundColor: "#fff", height: "8vh" }}>
          <div className="navbarContainer">
            <div className="navbar_content">
              <div className="navbar_new ">Select</div>
              <div className="navbar_new ">Assemble</div>
              <div className="navbar_new isActive">Code</div>
              <div className="navbar_new">Simulate</div>
            </div>

            <img
              src={renderPrgImage("assemblebar")}
              style={{ height: "100%", width: "45%" }}
            />

            <div className="navbar-Action">
              <img
                src={renderPrgImage("saveBtnInActive")}
                className="iconBtnSize"
                style={{ marginRight: "25px" }}
              />

              {/* <img
                className="iconBtnSize"
                src={renderPrgImage("helpBtnInActive")}
                style={{ marginRight: "25px" }}
              /> */}
              {this.state.isHelp ? (
                <div className="Ss_slide">
                  <LogicPrgm />
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
              {/* <img src={usbOFF} /> */}
            </div>
          </div>

          <div className="CSD">
            {/* <div onMouseOver={this.showConverter} onMouseOut={this.closeSetting} style={{ height: "60px", width: "60px", margin: "5px 0 0 6px", float: "left" }}><img src="images/Learn/learn_button_convert.png" style={{ height: "100%", width: "100%" }} /></div> */}

            {/*OLD SAVE BTN */}
            {/* <div
              onClick={this.tutor}
              style={{
                height: "60px",
                width: "60px",
                margin: "5px 0 0 6px",
                float: "left",
              }}
            >
              <img
                alt="asdefsfad"
                src="images/Learn/learn_button_save.png"
                style={{ height: "100%", width: "100%" }}
              />
            </div> */}

            {/* <div onClick={this.check} style={{ cursor: "pointer", height: "60px", width: "60px", margin: "5px 0 0 6px", float: "left" }}><img src="images/Learn/learn_button_upload.png" style={{ height: "100%", width: "100%" }} /></div> */}
            {/* <div onMouseOver={this.showSetting} onMouseOut={this.closeSetting} style={{ height: "60px", width: "60px", margin: "5px 0 0 6px", float: "left" }}><img src="images/Learn/learn_button_settings.png" style={{ height: "100%", width: "100%" }} /></div> */}
            {/* <div style={{ height: "60px", width: "60px", margin: "5px 0 0 6px", float: "left" }}><img src="images/Learn/button_help.png" style={{ height: "100%", width: "100%" }} /></div> */}

            {/* DISPLAY : NONE */}
            <div
              id="divH"
              onMouseOver={this.showSetting}
              onMouseOut={this.closeSetting}
              style={{
                position: "absolute",
                top: "10vh",
                left: "-2vw",
                height: "70%",
                width: "70%",
                display: "none",
              }}
            >
              <div>
                {/* <div style={{ margin: "5px 0px 0px 140px" }}> */}

                <div
                  style={{ height: "60px", width: "300px", display: "flex" }}
                >
                  {" "}
                  <h3
                    style={{
                      color: "#3234a8",
                      width: "230px",
                      textAlign: "end",
                    }}
                  >
                    Remote
                  </h3>
                  <img
                    src="images/Learn/learn_button_remote.png"
                    style={{ height: "100%", width: "70px" }}
                  />
                </div>
              </div>
              <div>
                {/* <div style={{ margin: "5px 0px 0px 93px" }}> */}

                <div
                  style={{ height: "60px", width: "300px", display: "flex" }}
                >
                  {" "}
                  <h3
                    style={{
                      color: "#3234a8",
                      width: "230px",
                      textAlign: "end",
                    }}
                  >
                    Music Player
                  </h3>
                  <img
                    src="images/Learn/learn_button_music.png"
                    style={{ height: "100%", width: "70px" }}
                  />
                </div>
              </div>
              <div>
                {/* <div style={{ margin: "5px 0px 0px 54px" }}> */}

                <div
                  style={{ height: "60px", width: "300px", display: "flex" }}
                >
                  {" "}
                  <h3
                    style={{
                      color: "#3234a8",
                      width: "230px",
                      textAlign: "end",
                    }}
                  >
                    Image Processing
                  </h3>
                  <img
                    src="images/Learn/learn_button_image.png"
                    style={{ height: "100%", width: "70px" }}
                    alt="adfasfdsgr"
                  />
                </div>
              </div>
              {/* <div style={{ margin: "5px 0px 0px 155px" }}> */}
              <div>
                <div
                  style={{ height: "60px", width: "300px", display: "flex" }}
                >
                  {" "}
                  <h3
                    style={{
                      color: "#3234a8",
                      width: "230px",
                      textAlign: "end",
                    }}
                  >
                    Plotter
                  </h3>{" "}
                  <img
                    src="images/Learn/learn_button_plotter.png"
                    style={{ height: "100%", width: "70px" }}
                  />
                </div>
              </div>
              {/* <div style={{ margin: "5px 0px 0px 150px" }}> */}
              <div>
                <div
                  style={{ height: "60px", width: "300px", display: "flex" }}
                >
                  {" "}
                  <h3
                    style={{
                      width: "230px",
                      textAlign: "end",
                      color: "#3234a8",
                    }}
                  >
                    Speech
                  </h3>
                  <img
                    src="images/Learn/learn_button_speech.png"
                    style={{ height: "100%", width: "70px" }}
                  />
                </div>
              </div>
              {/* <div style={{ margin: "5px 0px 0px 155px" }}> */}
              <div>
                <div
                  style={{ height: "60px", width: "300px", display: "flex" }}
                >
                  {" "}
                  <h3
                    style={{
                      width: "230px",
                      textAlign: "end",
                      color: "#3234a8",
                    }}
                  >
                    Update
                  </h3>
                  <img
                    src="images/Learn/learn_button_update.png"
                    style={{ height: "100%", width: "70px" }}
                  />
                </div>
              </div>
            </div>
            {/* DISPLAY : NONE */}
            <div
              id="divH1"
              onMouseOver={this.showConverter}
              onMouseOut={this.closeSetting}
              style={{
                marginTop: "17%",
                marginLeft: "0%",
                height: "22%",
                width: "40%",
                display: "none",
              }}
            >
              <div style={{ height: "24%", marginLeft: "-77%" }}>
                <h3 style={{ float: "left", color: "#3234a8" }}>
                  Convert to C
                </h3>
                <div style={{ height: "60px", width: "60px", float: "left" }}>
                  <img
                    src="images/Learn/learn_button_remote.png"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>
              <div
                style={{ height: "25%", color: "#3234a8", marginLeft: "-113%" }}
              >
                <h3 style={{ float: "left" }}>Convert to Python</h3>
                <div style={{ height: "60px", width: "60px", float: "left" }}>
                  <img
                    src="images/Learn/learn_button_remote.png"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HAX BLOCKS  */}
        <div className="draw">
          {/* <Link to="/assembly">
            <div className="back_btn_logic">BACK</div>
          </Link> */}

          <div
            className="SelectScreenBottom"
            style={{ zIndex: "1000", bottom: "11%" }}
          >
            <div className="bottom-child">
              <Link to="/assembly">
                <img
                  className="iconBtnSize imgBackBtn"
                  src={renderPrgImage("backBtn")}
                />
              </Link>
              <img
                className="iconBtnSize imgNextBtn"
                src={renderPrgImage("nextBtn")}
                onClick={this.checkForSimulation}
              />
            </div>
          </div>

          {/* <div className="XXX">HELLO BUDDY</div> */}
          <div onWheel={this.wheel}>
            <Hammer
              onPan={this.pan}
              onPanStart={this.panStart}
              onPanEnd={this.panEnd}
              onPinchIn={this.pinchIn}
              onPinchOut={this.pinchOut}
              options={{
                recognizers: {
                  pinch: { enable: true },
                },
              }}
            >
              <div
                className="draw"
                style={{
                  height: "1000px",
                  marginTop: "1%",
                }}
              >
                <svg
                  height="100%"
                  width="100%"
                  style={{ backgroundColor: "#FCFCFC" }}
                  className="noselect"
                >
                  <g transform={"scale(" + defaultScale + ")"}>
                    <g
                      transform={"scale(" + scale + ")"}
                      id="logicScaleTransformer"
                    >
                      <g
                        transform={
                          "translate(" + offset.left + "," + offset.top + ")"
                        }
                        id="logicOffsetTransformer"
                      >
                        <HexBoard
                          hexType={this.state.hexType}
                          drawing={drawing}
                          onClick={this.click}
                          onDoubleClick={this.toggleBottomPanel}
                          // onClick={this.ITS}
                          id={IDIS}
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                {/* <div style={{ height: "10%", width: "65%", border: "2px solid #bed5fa", backgroundColor: "white", borderRadius: "20px", top: "80vh", left: "10%", position: 'inherit' }}>
                <h3 style={{ marginLeft: "20px", marginTop: "2px" }}>
                  {Object.entries(this.state.tutorialDesc).map(([key, value]) => {
                    console.log("logic Connections 2", key, value)
                    return < div> {parseInt(key) + 1}. {value}</div>
                  })}
                </h3>
              </div> */}

                {localStorage.getItem("programMode") == "learn" && tempData ? (
                  <div
                    style={{
                      height: "auto",
                      width: "65vw",
                      border: "2px solid #bed5fa",
                      backgroundColor: "white",
                      borderRadius: "20px",
                      bottom: "3%",
                      left: "17%",
                      position: "fixed",
                    }}
                  >
                    <h3 style={{ marginLeft: "20px", marginTop: "2px" }}>
                      {/* {this.state.tutorialDesc[0].type} */}

                      {/* {Object.entries(this.state.tutorialDesc).map(([key, value]) => {
                    console.log("logic Connections 2", key, value)
                    return < div> {key}. {value}</div>
                  })} */}

                      {/* {this.state.tutorialDesc.map((value, index) => {
                    console.log("program check", program[index].type)
                    return (value.type == "hardware" || value.type == "variable" || value.type == "wait") ? this.output(value) : (value.type == "sensor" || value.type == "variable") ? this.if(value) : ""
                    // return <div>{index}{value.type}</div>
                  })} */}
                      {tempData}
                    </h3>
                  </div>
                ) : (
                  ""
                )}
                {}

                <Modal
                  isOpen={this.state.uploadOpen}
                  // onAfterOpen={afterOpenModal}
                  // onRequestClose={closeModal}
                  style={customStylesUpload}
                  contentLabel="Example Modal"
                  // id="conceptModal"
                >
                  {/* <img onClick={this.closeUpload} className="closeconceptModal" src="images/login/button_exit@2x.png"></img> */}
                  <div className="UploadingMsg">
                    <p
                      style={{
                        color: "#311B92",
                        fontSize: "2vw",
                        textAlign: "center",
                        position: "absolute",
                        top: "12vh",
                        left: "15vh",
                      }}
                    >
                      Uploading Program
                    </p>
                    {/* <button style={{ color: "#311B92", textAlign: "center" }}>OK</button> */}
                  </div>
                </Modal>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  // onAfterOpen={afterOpenModal}
                  // onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                  // id="conceptModal"
                >
                  <img
                    onClick={this.close}
                    className="closeconceptModal"
                    src="images/login/button_exit@2x.png"
                  ></img>
                  <div className="connectconceptMsg">
                    <p>
                      Device not connectedDevice not connectedDevice not
                      connectedDevice not connectedDevice not connectedDevice
                      not connectedDevice not connectedDevice not
                      connectedDevice not connectedDevice not connected
                    </p>
                    <button className="">
                      {" "}
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/biboxSelection"
                      >
                        Reconnect
                      </Link>
                    </button>
                  </div>
                </Modal>

                {/* <Modal
                isOpen={this.state.usbOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                // id="conceptModal"
              >
                <img
                  onClick={this.closeUsb}
                  className="closeconceptModal"
                  src="images/login/button_exit@2x.png"
                ></img>
                <div className="connectconceptMsg">
                  <p>Device not connected..</p>
                  <button className="">
                    {" "}
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/biboxSelection"
                    >
                      Reconnect
                    </Link>
                  </button>
                </div>
              </Modal> */}

                <Modal
                  isOpen={this.state.checkEndProgram}
                  // onAfterOpen={afterOpenModal}
                  // onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                  // id="conceptModal"
                >
                  <img
                    alt="fgfs"
                    onClick={this.closecheckEndProgram}
                    className="closeconceptModal"
                    src="images/login/button_exit@2x.png"
                  ></img>
                  <div className="connectconceptMsg">
                    <p>Please end the program with End or Repeat.</p>
                  </div>
                </Modal>
              </div>
            </Hammer>
          </div>

          {/* OPEN THE PANEL THIE ACTIONS When you dubble click it will open  */}
          <BottomPanel
            componentProps={this.props.concept.componentProps}
            PortConnections={PortConnections}
            value={value}
            show={bottomPanel}
            toggle={this.toggleBottomPanel}
            current={current}
            state={drawing.activeRef.state}
            onChange={this.bottomPanelChange}
            startState={program[0].state}
            hexTypeCheck={this.hexTypeCheck}
            bottomPanelDeleteKey={this.bottomPanelDelete}
          />
        </div>

        {/* <button
          onClick={this.checkForSimulation}
          className="nextButton"
          style={{ visibility: "visible" }}
        >
          NEXT
        </button> */}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};
const mapStateToProp = (state) => {
  console.log("mapStateToProps", state);

  return {
    webserialPort: state.webSerial,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    update: (data) => {
      dispatch({ type: "LOGIC_SELECTION", payload: data });
    },
    PortConnections: (data) => {
      dispatch({ type: "PORT_Connection", payload: data });
    },
  };
};
// Logic = DragDropContext(TouchBackend({ enableMouseEvents: true }))(Logic);
Logic = withRouter(DragDropContext(HTML5Backend)(Logic));
Logic = connect(mapStateToProps, mapDispatchToProps)(Logic);
// export default Logic;
export default connect(mapStateToProp)(Logic);
