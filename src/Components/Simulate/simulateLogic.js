// import Blockly from './blockly';

import React, { Component } from "react";
// import { Link, withRouter } from 'react-router-dom'
import io from "socket.io-client";
import Hammer from "react-hammerjs";
// import HTML5Backend from 'react-dnd-html5-backend'
// import { DragDropContext } from 'react-dnd'
// import DragDropContext from 'react-dnd';
// import TouchBackend from 'react-dnd-touch-backend';

import { connect } from "react-redux";

// import RightPanel from './RightPanel'
import Modal from "react-modal";
import socketIOClient from "socket.io-client";

import HexBoard from "../logic/HexBoard";
import SizesHelper from "../../helpers/Sizes";
import Sizes from "../logic/Sizes";
import ProgramToDrawing from "../logic/ProgramToDrawing";
import "../../css/logic.css";
import { internalaccessoriesObj } from "../selectScreen/InternalAccessoriesScreen/InternalAccessoriesStorage";

import { rangeStoreVal } from "../Assembly/CheckboxData";

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

class SimulateLogic extends Component {
  constructor(props) {
    super(props);
    var { logic } = this.props;
    this.childRef = React.createRef();

    var tutorialLogic = sessionStorage.getItem("tutorialLogic");

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

    socket.emit("_usbDetection", "Hi BACKEND");

    socket.on("/usbDetection", (data) => {
      this.setState({ detected: data.detected, usbOpen: !data.detected });

      socket.emit("/getSimulateBytes", { code: params });

      socket.on("_getSimulateBytes", (data) => {
        sessionStorage.setItem("Bytes", JSON.stringify(data));
      });
    });

    // // CHECKBOX RGB, 4in1sensor, Buzzer, Microphone ASSINIG
    // console.log(sessionStorage.getItem("assemblyCheckbox"), "assemblyCheckbox");

    let checkboxData = JSON.parse(sessionStorage.getItem("assemblyCheckbox"));
    let assemblyCheckboxData = {};
    let conceptSession = JSON.parse(sessionStorage.getItem("concept"));
    for (const property in checkboxData) {
      // console.log(`${property}: ${checkboxData[property]}`);

      if (checkboxData[property] == true) {
        assemblyCheckboxData[property] = checkboxData[property];
      }
    }

    // console.log("assemblyCheckbox", assemblyCheckboxData);

    var params = {
      screen: "hexa",
      logic: this.props.logic,
      components: this.props.assembly.PortConnections,
      internalaccessories: conceptSession.internalaccessories,
    };

    var Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
    // console.log("this.props.history DONE LOGIC", Peripherial[0]["mac"])

    socket.emit("/getSimulateBytes", { code: params });
    socket.on("_getSimulateBytes", (data) => {});
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
    // if (dontTriggerClick) {
    //   dontTriggerClick = false;
    //   return;
    // }
    // var { logic } = this.props;
    // console.log("logic", this.props)
    // const { currentProgramGuide } = logic;
    // var todo = 'current';
    // logic.insertState = false;
    // const { type } = drawing.board[row][col];
    // if (type === 'blank' || type === 'hand' || type === 'highlighted_hand') todo = 'blank';
    // if (todo === 'current') {
    //   logic.active = [row, col];
    //   drawing = ProgramToDrawing(logic.program, logic.end, logic.currentProgramGuide, logic.active, this.add,
    //     logic.insertState, this.insertNode, this.deleteNode);
    //   var logicState = {};
    //   // logicState['type'] = this.state.currentLogicScreen;
    //   // logicState['state'] = logic;
    //   console.log("NOW ZOOM  3", this.props);
    //   this.props.update(logic);
    // } else if (todo === 'blank') {
    //   logic.active = [-1, -1];
    //   // Uncomment the following line to auto-minimize bottomPanel on blank space click
    //   // logic.bottomPanel = 'border';
    //   drawing = ProgramToDrawing(logic.program, logic.end, logic.currentProgramGuide, logic.active, this.add,
    //     logic.insertState, this.insertNode, this.deleteNode);
    //   var logicState = {};
    //   logicState['type'] = this.state.currentLogicScreen;
    //   logicState['state'] = logic;
    //   console.log("NOW ZOOM  4", this.props);
    //   this.props.update(logic);
    // }
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
            // console.log("deleted", key);
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

  anyFun = (value, compoName) => {
    this.childRef.current.simulateProgram(value, compoName); //it will call simulateProgram which is available at HexBoard.js(logic)
  };

  upload = () => {
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
          // this.setState({ modalIsOpen: true })
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
  closeUpload = () => {
    this.setState({ uploadOpen: false });
  };
  tutor = () => {
    this.props.history.push("/saveTutorials");
  };
  hexTypeCheck = (value) => {
    this.setState({ hexType: value });
  };

  render = () => {
    // As according to app approx 11.5 hexagons in a row in the display

    defaultScale = SizesHelper.width / (11.5 * Sizes.xdiff);
    const { program, scale, offset, currentProgramGuide, active } =
      this.props.logic;
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
          backgroundColor: "",
          height: "100%",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <div onWheel={this.wheel} className="draw">
          {/* <Link to="/assembly"><div className="back_btn_logic">BACK</div></Link> */}

          {/* <div className="XXX">HELLO BUDDY</div> */}
          <Modal
            isOpen={this.state.uploadOpen}
            style={customStylesUpload}
            contentLabel="Example Modal"
          >
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
            </div>
          </Modal>
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
                // style={{ backgroundColor: "#A6D1E1" }}

                style={{ backgroundColor: "#fff" }}
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
                        ref={this.childRef}
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </Hammer>
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
// Logic = withRouter(DragDropContext(HTML5Backend)(Logic))
// Logic = connect(mapStateToProps, mapDispatchToProps)(Logic)
// export default Logic
SimulateLogic = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(SimulateLogic);
export default SimulateLogic;
