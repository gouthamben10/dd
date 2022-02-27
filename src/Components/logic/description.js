// import Blockly from './blockly';

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import io from "socket.io-client";
import Hammer from "react-hammerjs";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
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

import Colors from "./Colors";
import { object } from "prop-types";
var _ = require("lodash");

var countLogic;
var oldDeltaX, oldDeltaY, panning;

var clientX, clientY;
var drawing,
  drawingNew,
  defaultScale = 1;
var panning = false,
  zooming = false,
  dontTriggerClick = false;
var finalOffset = { left: 0, top: 0 };

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
    border: "2px solid red",
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
    // console.log("THUIS", this.props)
    // this.click = this.click.bind(this)
    // this.add = this.add.bind(this)

    this.state = {
      hexType: "",
      uploadOpen: false,
      tutorialDesc: tutorialDesc,
      tutorialLogic: JSON.parse(tutorialLogic),
      modalIsOpen: false,
      usbOpen: false,
      currentLogicScreen: curLogicScreen,
      currentNode: {},
      visible: false,
      currentNodeIndex: 0,
      nodeCount: 1,
      detected: false,
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
  componentDidMount = () => {
    var socket = io.connect("http://localhost:3008");
    socket.emit("_usbDetection", "Hi");
    socket.on("/usbDetection", (data) => {
      // console.log("...............", data);
      this.setState({ detected: data.detected, usbOpen: !data.detected });
    });
    // console.log("indexLog")
    // this.setState({ hexType: "wait" })
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
        this.deleteNode
      );
      var logicState = {};
      // logicState['type'] = this.state.currentLogicScreen;
      // logicState['state'] = logic;

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
    if (instructions.length !== 0) {
      if (nesting === 0) instructions.push(toPush);
      else
        this.recurseAdd(
          instructions[instructions.length - 1].subprogram,
          nesting - 1,
          toPush
        );
    }
  };
  add = (type) => {
    if (dontTriggerClick) {
      dontTriggerClick = false;
      return;
    }
    var { logic } = this.props;
    logic.active = [-1, -1];

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
    var { logic } = this.props;
    if (!logic.insertState) {
      logic.insertState = true;
    } else {
      logic.insertState = false;
      var temp = drawing.activeParentRef[drawing.activeIndex];
      var toPush = { type: type, state: {} };
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
    var { logic } = this.props;

    if (type) {
      drawing.activeRef.type = type;
    }
    // if (state) {
    drawing.activeRef.state = state;
    // }

    if (drawing.activeRef.type === "end")
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

    socket.emit("/checkLogic", program, end);
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
        var Peripherial = JSON.parse(sessionStorage.getItem("Bluetooth"));
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
  };
  tutor = () => {
    this.props.history.push("/saveTutorials");
  };
  hexTypeCheck = (value) => {
    this.setState({ hexType: value });
  };
  if = (value, state) => {
    // console.log("DKK", state);
    if (!state) {
      return (
        <div>
          Click on the hand hex and click on condition hex ,double click the
          condition hex and select {value.type}{" "}
          {
            // <div>  Set {Object.entries(value.state).map(([key, value]) => {
            //   return (<span> {key} {value}</span>)
            // })}
            // </div>,
            // <div>  Down to  {value.type}   {value.subprogram ? (value.subprogram.map((value, index) => {
            //   return (value.type == "hardware" || value.type == "variable" || value.type == "wait") ? this.output(value) : (value.type == "sensor" || value.type == "variable") ? this.if(value) : ""
            //   // return <div>{index}{value.type}</div>
            // })) : ""}
            // </div>
          }
        </div>
      );
    } else if (state == "state") {
      // return <div>Click on the hand hex and click on condition hex ,double click the condition hex and select {value.type} {

      return (
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
      );

      // <div>  Down to  {value.type}   {value.subprogram ? (value.subprogram.map((value, index) => {
      //   return (value.type == "hardware" || value.type == "variable" || value.type == "wait") ? this.output(value) : (value.type == "sensor" || value.type == "variable") ? this.if(value) : ""
      //   // return <div>{index}{value.type}</div>
      // })) : ""}
      // </div>
      // }</div>
    } else if (state == "subprogram") {
      // return <div>Click on the hand hex and click on condition hex ,double click the condition hex and select {value.type} {

      return (
        <div>
          {" "}
          Down to {value.type}{" "}
          {value.subprogram
            ? value.subprogram.map((value1, index) => {
                return value.subprogram[index].type == "hardware" ||
                  value.subprogram[index].type == "variable" ||
                  value.subprogram[index].type == "wait"
                  ? this.output(value.subprogram[index], "state")
                  : value.subprogram[index].type == "sensor" ||
                    value.subprogram[index].type == "variable"
                  ? this.if(value)
                  : "";
                // return <div>{index}{value.type}</div>
              })
            : ""}
        </div>
      );
    }
  };
  output = (value, stateData) => {
    var hardware = [];
    var keyValueArray = [];
    var keyTypeArray = [];
    var keyValue;
    var keyType;
    // console.log("OutputValue1====>", value, stateData);
    if (value.type == "hardware") {
      //   hardware.push("Click on the hand icon and select Action ")
      //   hardware.push("Double Click and select hardware ")

      Object.entries(value.state).map(([key, value]) => {
        // return (<span> {key} {value}</span>)
        // var key1 = key[
        // var value1 = key["value"]
        // console.log("OutputValue1====>", key);

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
              keyValueArray.push([
                " " + keyTypeArray[i] + " to " + value + " ",
              ]);
            }
          }
        }

        //     hardware.push("set " + key + " to " + value)
      });
    }

    if (!stateData) {
      return (
        <div>
          Click on the hand hex and click on action hex ,double click the action
          hex and select {value.type}
          {
            // <div>  Set {Object.entries(value.state).map(([key, value]) => {
            //   return (<span> {key} {value}</span>)
            // })}
            // </div>
          }
        </div>
      );
    } else {
      return (
        <div>
          {" "}
          In {value.type} Set
          <span>
            {keyValueArray.map((value, index) => {
              return <span>{keyValueArray[index]}</span>;
            })}
          </span>
        </div>
      );
    }
  };
  render = () => {
    const { program, scale, offset, currentProgramGuide, active } =
      this.props.logic;

    var tempData;
    countLogic = 0;
    //description
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
                              ? this.output(value.subprogram[indexSub], "state")
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
                            : value.type == "sensor" || value.type == "variable"
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
      current === "highlighted_hand"
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

    return (
      <div
        style={{
          backgroundColor: "rgb(166, 209, 225",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <div style={{ backgroundColor: "rgb(166, 209, 225", height: "10vh" }}>
          {/* <img style={{ height: "10%", width: "5%", float: "left" }} src="images/Learn/login_button_back.png" /> */}
          <div style={{ width: "50%", marginLeft: "30%" }}>
            <Link>
              <div className="learn_mid_menu"> CONCEPT </div>
            </Link>
            <Link>
              <div className="learn_mid_menu">ASSEMBLY</div>
            </Link>
            <Link>
              <div className="current_screen">LOGIC</div>
            </Link>
            <div className="ble_connection">
              <img style={{ height: "40px", width: "35px" }} src={imageURL} />
            </div>
            {/* <div className="learn_mid_menu"> LOGIC</div> */}
          </div>
          <div className="CSD">
            <div
              onMouseOver={this.showConverter}
              onMouseOut={this.closeSetting}
              style={{
                height: "60px",
                width: "60px",
                margin: "5px 0 0 6px",
                float: "left",
              }}
            >
              <img
                src="images/Learn/learn_button_convert.png"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div
              onClick={this.tutor}
              style={{
                height: "60px",
                width: "60px",
                margin: "5px 0 0 6px",
                float: "left",
              }}
            >
              <img
                src="images/Learn/learn_button_save.png"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div
              onClick={this.check}
              style={{
                cursor: "pointer",
                height: "60px",
                width: "60px",
                margin: "5px 0 0 6px",
                float: "left",
              }}
            >
              <img
                src="images/Learn/learn_button_upload.png"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div
              onMouseOver={this.showSetting}
              onMouseOut={this.closeSetting}
              style={{
                height: "60px",
                width: "60px",
                margin: "5px 0 0 6px",
                float: "left",
              }}
            >
              <img
                src="images/Learn/learn_button_settings.png"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
            <div
              style={{
                height: "60px",
                width: "60px",
                margin: "5px 0 0 6px",
                float: "left",
              }}
            >
              <img
                src="images/Learn/button_help.png"
                style={{ height: "100%", width: "100%" }}
              />
            </div>

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

        <div onWheel={this.wheel} className="draw">
          <Link to="/assembly">
            <div className="back_btn_logic">BACK</div>
          </Link>

          {/* <div className="XXX">HELLO BUDDY</div> */}

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
            <div className="draw" style={{ height: "1000px" }}>
              <svg
                height="100%"
                width="100%"
                style={{ backgroundColor: "#A6D1E1" }}
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

              {localStorage.getItem("programMode") == "learn" ? (
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
                    connectedDevice not connectedDevice not connectedDevice not
                    connectedDevice not connectedDevice not connectedDevice not
                    connectedDevice not connected
                  </p>
                  <button className="">
                    {" "}
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/biboxSelection"
                    >
                      Reconnect
                    </Link>
                  </button>
                </div>
              </Modal>

              <Modal
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
                      style={{ textDecoration: "none", color: "white" }}
                      to="/biboxSelection"
                    >
                      Reconnect
                    </Link>
                  </button>
                </div>
              </Modal>
            </div>
          </Hammer>

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
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
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
export default Logic;
