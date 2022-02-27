import Blockly from './blockly';


var React = require('react');
var PropTypes = React.PropTypes;
var Ports = require(__base + 'src/components/assembly/Ports');
const Hammer = require('react-hammerjs');
var xx = false;


const Colors = require('./Colors');
var HexBoard = require('./HexBoard');
const BottomPanel = require('./BottomPanel');
const RightPanel = require('./RightPanel');
const SizesHelper = require(__base + 'src/helpers/Sizes');
const Sizes = require('./Sizes');
const ProgramToDrawing = require('./ProgramToDrawing');
const PortConnections = require(__base + 'src/components/assembly/PortConnections');

const DragDropContext = require('react-dnd').DragDropContext;
const TouchBackend = require('react-dnd-touch-backend').default;

const CustomDragLayerNew = require('../logic-new/CustomDragLayer');
const SidebarNew = require('../logic-new/Sidebar');
const DropspaceNew = require('../logic-new/Dropspace');
const RightPanelNew = require('../logic-new/RightPanel');

var oldDeltaX, oldDeltaY, panning;

var drawing, drawingNew, defaultScale = 1;
var panning = false, zooming = false, dontTriggerClick = false;
var finalOffset = { left: 0, top: 0 };
var Tutorials = require('../../tutorials/tutorials');
var clicked = 0;
var respVal = '';
var editorRendered = true;
// var editor = null;
var http = new XMLHttpRequest();

var socket;
var socketHost = "http://localhost:9009";
// http.onreadystatechange = function() {
//   if (http.readyState == XMLHttpRequest.DONE) {
//     // alert(xhr.responseText);
//     respVal=http.responseText;
//     console.log("program Response  "+respVal);
//     myLogic.editorButtonClicked();

//   }
// }
var params = '';
// import React from 'react';
// import { render } from 'react-dom';
// import brace from 'brace';
// import AceEditor from 'react-ace';
// import 'brace/mode/c_cpp';
// import 'brace/theme/kuroir';


var Logic = React.createClass({
  getInitialState: function () {
    var curLogicScreen;
    if (sessionStorage.getItem("CurrentLogicScreen")) {
      curLogicScreen = sessionStorage.getItem("CurrentLogicScreen");
    } else {
      curLogicScreen = "hexa";
    }
    return { currentLogicScreen: curLogicScreen, currentNode: {}, currentNodeIndex: 0, nodeCount: 1, socket: io.connect(socketHost) };
  },
  componentWillMount: function () {
    const { program, end, offset, insertState, currentProgramGuide, active } = this.props.logic;
    const { cards } = this.props.logicNew;
    if (this.state.currentLogicScreen == "hexa") {
      drawing = ProgramToDrawing(program, end, currentProgramGuide, active, this.add, insertState, this.insertNode, this.deleteNode);
    }

  },

  componentWillUpdate: function (nextProps, nextState) {


    const { program, end, offset, insertState, currentProgramGuide, active } = this.props.logic;
    if (nextState.currentLogicScreen == "hexa") {
      drawing = ProgramToDrawing(program, end, currentProgramGuide, active, this.add, insertState, this.insertNode, this.deleteNode);
    }

  },
  componentDidUpdate: function (prevProps, prevState) {
    drawing.updated = false;
    drawingNew.updated = false;
  },
  componentDidMount: function () {
    var curLogicScreen;
    curLogicScreen = sessionStorage.getItem("CurrentLogicScreen");
    console.log("curLogicScreen", curLogicScreen);
    var socket = this.state.socket;
    console.log("DEVICE IS DETECTED", localStorage.getItem("biboxTypes"));
    socket.emit("/pathForC", { path: localStorage.getItem("biboxTypes") });

    // console.log(typeof(curLogicScreen));
    if (curLogicScreen == "text") {
      this.initEditor();
    }
    else if (curLogicScreen == "python") {
      this.pythonEditor();
    }


  },
  removeCardConnections: function (index) {
    var { logicNew } = this.props;
    logicNew.cards[index].connections.map((connection, portIndex) => {
      logicNew.cards[connection.to].connections[connection.toPort].to = connection.to
      logicNew.cards[connection.to].connections[connection.toPort].toPort = connection.toPort
      connection.to = index
      connection.toPort = portIndex
    })
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logicNew;
    this.props.update(logicState)
  },
  removeFromDropspace: function (index) {
    var nodeCount = this.props.logicNew.nodeCount;
    var { logicNew } = this.props;
    if (logicNew.cards[index].type != 'start') {
      this.removeCardConnections(index);
      logicNew.cards[index].invalid = true;
      if (logicNew.cardConnections[index]) {
        logicNew.cardConnections[index].invalid = true;
      }
      var logicState = {};
      logicState['type'] = this.state.currentLogicScreen;
      logicState['state'] = logicNew;
      this.props.update(logicState)
    }
  },
  removeConnection: function (from, fromPort, to, toPort) {
    var { logicNew } = this.props;
    logicNew.cards[from].connections[fromPort] = { to: from, toPort: fromPort };
    logicNew.cards[to].connections[toPort] = { to: to, toPort: toPort };
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logicNew;
    this.props.update(logicState)
  },
  constraintOffset: function (offset) {
    var el = document.getElementById('logicOffsetTransformer');
    const BBox = el.getBBox();
    const { height, width } = this.props;
    const scale = this.props.logic.scale * defaultScale;
    if (offset.left * scale > width / 2) offset.left = width / (2 * scale);
    else if (offset.left < -BBox.width + width / (2 * scale)) offset.left = -BBox.width + width / (2 * scale);
    if (offset.top * scale > height / 2) offset.top = height / (2 * scale);
    else if (offset.top < -BBox.height + height / (2 * scale)) offset.top = -BBox.height + height / (2 * scale);
  },

  /**
   * Pan event handler : does not update state for smooth panning. Also throttles the event
   */
  pan: function (e) {
    if (panning) return;
    panning = true;
    var el = document.getElementById('logicOffsetTransformer');
    var BBox = el.getBBox();
    const { offset } = this.props.logic;
    const { height, width } = this.props;
    finalOffset.left = offset.left + e.deltaX;
    finalOffset.top = offset.top + e.deltaY;
    if (finalOffset.left > width / 2) finalOffset.left = width / 2;
    else if (finalOffset.left < -BBox.width + width / 2) finalOffset.left = -BBox.width + width / 2;
    if (finalOffset.top > height / 2) finalOffset.top = height / 2;
    else if (finalOffset.top < -BBox.height + height / 2) finalOffset.top = -BBox.height + height / 2;
    el.setAttribute('transform', 'translate(' + finalOffset.left + ',' + finalOffset.top + ')');
    panning = false;
  },
  panNew: function (e) {
    if (panning) return;
    panning = true;
    var { logicNew } = this.props;
    logicNew.offset.left += (e.deltaX - oldDeltaX) / logicNew.scale;
    logicNew.offset.top += (e.deltaY - oldDeltaY) / logicNew.scale;
    oldDeltaX = e.deltaX;
    oldDeltaY = e.deltaY;
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    this.props.update(logicState, () => {
      panning = false
    });
  },
  /**
   * Set dontTriggerClick variable to true
   */
  panStart: function () {
    dontTriggerClick = true;
  },
  /**
   * Update state variables
   */
  panEnd: function (e) {
    var { logic, update } = this.props;
    logic.offset.left = finalOffset.left;
    logic.offset.top = finalOffset.top;
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    update(logicState, () => panning = false);
  },
  panEndNew: function () {
    panning = false;
    oldDeltaX = 0;
    oldDeltaY = 0;
  },
  /**
   * Zoom function with throttling
   * @param  {number} scale   The new scale
   * @param  {number} clientX The clientX (center of pinch or cursor position on wheel)
   * @param  {number} clientY The clientY (center of pinch or cursor position on wheel)
   */
  zoom: function (scale, clientX, clientY) {
    if (zooming) return;
    var { logic, height, width } = this.props;
    if ((logic.scale < 0.5 && scale < 1) ||
      (logic.scale > 2 && scale > 1)) return;
    zooming = true;
    clientY -= document.body.clientHeight - height;
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
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    this.props.update(logicState, () => {
      zooming = false
    });
  },
  zoomNew: function (scale, clientX, clientY) {
    if (zooming) return;
    var { logicNew, height, width } = this.props;
    if ((logicNew.scale < 0.25 && scale < 1) ||
      (logicNew.scale > 2 && scale > 1)) return;
    zooming = true;
    clientX -= width * 0.2;
    clientY -= document.body.clientHeight - height;
    // client = (offset + x/y) * scale
    // client of oldx/y = client of newx/y (current mouse position)
    // oldx/y = client / scale - offset
    // (newoffset + oldx/y) * newscale = (oldOffset + oldx/y) * oldscale
    const oldX = clientX / logicNew.scale - logicNew.offset.left;
    const oldY = clientY / logicNew.scale - logicNew.offset.top;
    logicNew.offset.left = (logicNew.offset.left + oldX) / scale - oldX;
    logicNew.offset.top = (logicNew.offset.top + oldY) / scale - oldY;
    logicNew.scale *= scale;
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logicNew;
    this.props.update(logicState, () => {
      zooming = false
    });
  },
  /**
   * Pinch Out event handler
   */
  pinchOut: function (e) {
    this.zoom(6 / 5, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  },
  showHints: function () {
    if (xx == false) {
      document.getElementsByClassName('hints')[0].style.display = "block";
      xx = true;
    }
    else if (xx == true) {
      document.getElementsByClassName('hints')[0].style.display = "none";
      xx = false;
    }
  },
  /**
   * Pinch In event handler
   */
  pinchIn: function (e) {
    this.zoom(5 / 6, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  },
  pinchOutNew: function (e) {
    this.zoomNew(12 / 11, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  },
  /**
   * Pinch In event handler
   */
  pinchInNew: function (e) {
    this.zoomNew(11 / 12, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  },
  /**
   * Reset pinch variables
   */
  pinchEnd: function () {
    zooming = false;
  },
  /**
   * Wheel event handler
   */
  wheel: function (e) {
    const { clientX, clientY, deltaY } = e;
    if (deltaY > 0) this.zoom(5 / 6, clientX, clientY);
    else this.zoom(6 / 5, clientX, clientY);
    e.preventDefault();
    return false;
  },
  wheelNew: function (e) {
    const { clientX, clientY, deltaY } = e;
    if (deltaY > 0) this.zoomNew(5 / 6, clientX, clientY);
    else this.zoomNew(6 / 5, clientX, clientY);
    e.preventDefault();
    return false;
  },
  click: function (row, col) {
    if (dontTriggerClick) {
      dontTriggerClick = false;
      return;
    }
    var { logic, update, logicNew, updateNew } = this.props;
    const { currentProgramGuide } = logic;
    var todo = 'current';
    logic.insertState = false;
    const { type } = drawing.board[row][col];
    if (type === 'blank' || type === 'hand' || type === 'highlighted_hand') todo = 'blank';
    if (todo === 'current') {
      logic.active = [row, col];
      drawing = ProgramToDrawing(logic.program, logic.end, logic.currentProgramGuide, logic.active, this.add,
        logic.insertState, this.insertNode, this.deleteNode);
      var logicState = {};
      logicState['type'] = this.state.currentLogicScreen;
      logicState['state'] = logic;
      update(logicState);
    } else if (todo === 'blank') {
      logic.active = [-1, -1];
      // Uncomment the following line to auto-minimize bottomPanel on blank space click
      // logic.bottomPanel = 'border';
      drawing = ProgramToDrawing(logic.program, logic.end, logic.currentProgramGuide, logic.active, this.add,
        logic.insertState, this.insertNode, this.deleteNode);
      var logicState = {};
      logicState['type'] = this.state.currentLogicScreen;
      logicState['state'] = logic;
      update(logicState);
    }
  },
  recurseAdd: function (instructions, nesting, toPush) {
    if (nesting === 0) instructions.push(toPush);
    else this.recurseAdd(instructions[instructions.length - 1].subprogram, nesting - 1, toPush);
  },
  add: function (type) {
    if (dontTriggerClick) {
      dontTriggerClick = false;
      return;
    }
    var { logic, update } = this.props;
    logic.active = [-1, -1];
    if (type === 'end_if' || type === 'end_loop' || type === 'repeat')
      logic.currentProgramGuide--;
    else {
      var toPush = { type: type, state: {} };
      if (type === 'if' || type === 'loop') toPush.subprogram = [];
      this.recurseAdd(logic.program, logic.currentProgramGuide, toPush);
      if (type === 'if' || type === 'loop') logic.currentProgramGuide++;
    }
    drawing = ProgramToDrawing(logic.program, logic.end, logic.currentProgramGuide, logic.active, this.add);
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    update(logicState);
  },
  insertNode: function (type) {
    var { logic, update } = this.props;
    if (!logic.insertState) {
      logic.insertState = true;
    } else {
      logic.insertState = false;
      var temp = drawing.activeParentRef[drawing.activeIndex];
      var toPush = { type: type, state: {} };
      if (type === 'if' || type === 'loop') toPush.subprogram = [];
      drawing.activeParentRef[drawing.activeIndex] = toPush;
      for (let i = drawing.activeIndex + 1; i < drawing.activeParentRef.length; i++) {
        var temp2 = drawing.activeParentRef[i];
        drawing.activeParentRef[i] = temp;
        temp = temp2;
      }
      if (temp) drawing.activeParentRef.push(temp);
      logic.active = [-1, -1];
    }
    drawing = ProgramToDrawing(logic.program, logic.end, logic.currentProgramGuide, logic.active, this.add,
      logic.insertState, this.insertNode, this.deleteNode);
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    update(logicState);
  },
  deleteNode: function () {
    var { logic, update } = this.props;
    if (drawing.activeParentRef.length - 1 == drawing.activeIndex &&
      (drawing.activeRef.type === 'if' || drawing.activeRef.type === 'loop')) {
      let currentProgramGuide = 0, temp = logic.program;
      while (temp != drawing.activeParentRef && currentProgramGuide < logic.currentProgramGuide) {
        temp = temp[temp.length - 1].subprogram;
        currentProgramGuide++;
      }
      if (currentProgramGuide < logic.currentProgramGuide) logic.currentProgramGuide = currentProgramGuide;
    }
    drawing.activeParentRef.splice(drawing.activeIndex, 1);
    logic.active = [-1, -1];
    drawing = ProgramToDrawing(logic.program, logic.end, logic.currentProgramGuide, logic.active, this.add,
      logic.insertState, this.insertNode, this.deleteNode);
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    update(logicState);
  },
  insertCard: function (card) {
    var nodeCount = this.props.logicNew.nodeCount;
    var cardCopy = jQuery.extend(true, {}, card);
    this.props.logicNew.cardConnections[nodeCount] = cardCopy;
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = this.props.logicNew;
    this.props.update(logicState);
    //this.setState({nodeCount: nodeCount+1});
  },
  toggleBottomPanel: function () {
    var { logic, logicNew, logicEditor, update, pythonEditor } = this.props;
    if (logic.bottomPanel === 'show') logic.bottomPanel = 'border';
    else logic.bottomPanel = 'show';
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    var logicToBeChanged;
    if (this.state.currentLogicScreen == "hexa") {
      logicToBeChanged = logic;
    } else if (this.state.currentLogicScreen == "flow") {
      logicToBeChanged = logicNew;
    }
    else if (this.state.currentLogicScreen == "python") {
      logicToBeChanged = pythonEditor;
    } else {
      logicToBeChanged = logicEditor;
    }
    logicState['state'] = logicToBeChanged;
    update(logicState);
  },
  /* 
    function to recursively delete start keys which are false and are 
    present in other nodes of the program.
  */
  bottomPanelDelete: function (key) {
    var { logic, update, logicNew } = this.props;
    var search = key;
    function recursiveDeleteFromObject(search, OBJ) {
      for (var key in OBJ) {
        if (!(key == search) && typeof OBJ[key] === 'object') {
          recursiveDeleteFromObject(search, OBJ[key]);
        } else {
          if (key == search) {
            delete OBJ[key];
            console.log('deleted', key);
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
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    update(logicState);
  },
  bottomPanelChange: function (state) {
    var { logic, update, logicNew } = this.props;
    if (this.state.currentLogicScreen == 'hexa') {
      drawing.activeRef.state = state;
      if (drawing.activeRef.type === 'end')
        drawing = ProgramToDrawing(logic.program, logic.end, logic.currentProgramGuide, logic.active, this.add);
      var logicState = {};
      logicState['type'] = this.state.currentLogicScreen;
      logicState['state'] = logic;
      update(logicState);
      console.log(logic.program);
    } else {
      var index = this.state.currentNodeIndex;
      logicNew.cards[index].state = state;
      logicNew.cardConnections[index].state = state;
      if (state == 'end' || state == 'repeat') {
        logicNew.end.state = state;
      }

      var logicState = {};
      logicState['type'] = this.state.currentLogicScreen;
      logicState['state'] = logicNew;
      update(logicState);
    }
  },
  handleBottomPanelClick: function () {
    var { logic, update } = this.props;
    if (logic.bottomPanel === 'show') {
      logic.bottomPanel = 'border';
      dontTriggerClick = true;
    }
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    update(logicState);

  },
  // uploadButtonClicked: function () {
  //   console.log('btn clicked');
  //   var getAreaText = document.getElementById("javascript-editor").value;
  //   console.log('getAreaText', getAreaText);
  //   if (editor != null)
  //     getAreaText = editor.getSession().getValue();
  //   else {
  //     getAreaText = "";
  //   }
  //   if (!getAreaText.equals("")) {
  //     alert("Uploaded text: " + getAreaText);
  //     this.clickmeUp();
  //     var res = JSON.stringify({ code: getAreaText });
  //     console.log("program Upload  " + res);
  //     var url = "http://localhost:3000/upload";
  //     $.ajax({
  //       url: url,
  //       dataType: 'json',
  //       type: 'POST',
  //       data: {
  //         "code": res
  //       },
  //       success: function (data) {
  //         respVal = data.success + '';
  //         console.log("hello: " + respVal);
  //         this.setState();
  //       }.bind(this),
  //       error: function (xhr, status, err) {
  //         respVal = err + '';
  //         this.setState();
  //       }.bind(this)
  //     });
  //   } 
  // },

  initEditor: function () {
    var { logic, update, logicEditor } = this.props;
    var curState = this.props.app.state.logicEditor;
    var appStateCode = this.props.app.state.logicEditor.code;
    console.log("appState", appStateCode);
    console.log("curState", curState);
    var _this = this;

    var ace = require('brace');
    require('brace/mode/c_cpp');
    require('brace/theme/kuroir');

    var editor = ace.edit('c_cpp-editor');
    editor.getSession().setMode('ace/mode/c_cpp');
    editor.setTheme('ace/theme/xcode');
    var CurrentLogic = this.state.currentLogicScreen;

    console.log("CurrentLogic", CurrentLogic);

    editor.getSession().on('change', function () {
      if (CurrentLogic == "text") {
        var getAreaText = document.getElementById("c_cpp-editor").value;
        var getAreaText = appStateCode;
        getAreaText = editor.getSession().getValue();
        logicEditor = {};
        logicEditor.code = getAreaText;
        curState['code'] = getAreaText;
        _this.setState(curState);
        sessionStorage.setItem("editorCode", getAreaText);
        var logicState = {};
        logicState['type'] = "text";
        logicState['state'] = curState;
        console.log("LOGI STATE", logicState)
        update(logicState);

      }

    });

    if (!appStateCode) {
      //editor.setKeyboardHandler('ace/keyboard/vim');
      editor.setValue([
        , '//WELCOME TO C PROGRAM COMPILER'
        , ''
        , '#include "bibox.h" '
        , '#include <stdint.h>'
        , '#include <string.h>'
        , '#include <stdbool.h>'
        , '#include <math.h>'
        , ' void setup(void)'
        , '{'
        , 'SET_AS_OUTPUT(A1);'
        , 'SET_AS_OUTPUT(A4);'
        , '}'
        , 'void loop(void)'
        , '{'
        , 'WRITE_LOGIC(A1,LOW);'
        , 'WRITE_LOGIC(A4,LOW);'
        , 'DELAY_US(200000);'
        , 'WRITE_LOGIC(A1,HIGH);'
        , 'WRITE_LOGIC(A4,HIGH);'
        , 'DELAY_US(500000);'
        , '}'
        , ''
      ].join('\n'), -1
      );

    }
    else {
      editor.setValue(appStateCode);
    }
    editor.$blockScrolling = 'Infinity';
    editor.clearSelection();
  },
  pythonEditor: function () {
    var { logic, update, logicEditor, pythonEditor } = this.props;

    if (this.props.app.state.pythonEditor == undefined) {
      var curState = {};
      var appStateCode = sessionStorage.getItem("pythonCode");
    }
    else {
      var curState = this.props.app.state.pythonEditor;
      var appStateCode = this.props.app.state.pythonEditor.code;
    }

    console.log("appState", appStateCode);
    console.log("curState", curState);
    var ace = require('brace');
    require('brace/mode/python');
    require('brace/theme/github');
    var _this = this;
    var editor = ace.edit('python-editor');
    editor.getSession().setMode('ace/mode/python');
    editor.setTheme('ace/theme/github');
    var CurrentLogic = this.state.currentLogicScreen;
    console.log("curState", CurrentLogic);

    editor.getSession().on('change', function () {
      if (CurrentLogic == "python") {
        var getAreaText = document.getElementById("python-editor").value;
        var getAreaText = appStateCode;
        getAreaText = editor.getSession().getValue();
        pythonEditor = {};
        pythonEditor.code = getAreaText;
        curState['code'] = getAreaText;
        _this.setState(curState);
        sessionStorage.setItem("pythonCode", getAreaText);
        var logicState = {};
        logicState['type'] = "python";
        logicState['state'] = curState;
        console.log("LOGI STATE", logicState)
        update(logicState);
      }

    });

    if (!appStateCode) {
      //editor.setKeyboardHandler('ace/keyboard/vim');
      editor.setValue([


        , '#Welcome to python program compiler'
        , "#Include import in this section"
        , 'import GPIO '

        , ''
        , ''
        , "#Set Import in this section"
        , 'GPIO.set(A1,output)'
        , ''
        , ''
        , "# Write Logic in this section"
        , ' while true:'
        , '      digital.write(A1,1)'
        , '      Repeat()'


      ].join('\n'), -1
      );

    }
    else {
      editor.setValue(appStateCode);
    }

    editor.$blockScrolling = 'Infinity';
    editor.clearSelection();

  },
  componentDidUpdate: function () {
    var { logic, update, logicEditor } = this.props;
    var CurrentLogic = this.state.currentLogicScreen;
    if (this.state.currentLogicScreen == 'text') {
      //console.log('comp did update:',editorRendered);
      if (editorRendered) {
        this.initEditor();

        editorRendered = false;
      }
    }
    else if (this.state.currentLogicScreen == 'python') {
      //console.log('comp did update:',editorRendered);
      if (editorRendered) {
        this.pythonEditor();

        editorRendered = false;
      }
    }

  },

  seperateClicked: function () {
    $(document).ready(function () {
      $(".hide").click(function () {
        $("p").hide();
      });
      $(".show").click(function () {
        $("p").show();

      });
    });
  },
  clickmeUp: function () {
    var { logic, update } = this.props;
    if (logic.bottomPanel != 'show') logic.bottomPanel = 'show';
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    update(logicState);

  },
  clickmeDown: function () {
    var { logic, update } = this.props;
    if (logic.bottomPanel === 'show') logic.bottomPanel = 'border';
    var logicState = {};
    logicState['type'] = this.state.currentLogicScreen;
    logicState['state'] = logic;
    update(logicState);
  },
  pythonButtonClicked: function () {

    window.location.reload();
    clicked = 1;
    sessionStorage.setItem("CurrentLogicScreen", "python");
    var currentLogicScreen = this.state.currentLogicScreen;
    this.state.currentLogicScreen = "python";
    this.setState({ currentLogicScreen: this.state.currentLogicScreen });
    //console.log('editor butn clicked:',editorRendered);

    if (this.state.currentLogicScreen == 'python') {
      // if (editorRendered) {
      this.pythonEditor();

      //   editorRendered = false;
      // }
    }

  },
  editorButtonClicked: function () {
    window.location.reload();
    clicked = 1;
    sessionStorage.setItem("CurrentLogicScreen", "text");
    var currentLogicScreen = this.state.currentLogicScreen;
    this.state.currentLogicScreen = "text";
    this.setState({ currentLogicScreen: this.state.currentLogicScreen });
    //console.log('editor butn clicked:',editorRendered);

    if (this.state.currentLogicScreen == 'text') {
      // if (editorRendered) {
      this.initEditor();

      //   editorRendered = false;
      // }
    }
  },
  convertButtonClicked: function () {
    alert('Hello');
    console.log(this.state);
  },
  LogicButtonClicked: function () {
    clicked = 0;
    sessionStorage.setItem("CurrentLogicScreen", "hexa");
    this.setState({ currentLogicScreen: 'hexa' });

  },

  LogicFlowButtonClicked: function () {
    clicked = 0;
    sessionStorage.setItem("CurrentLogicScreen", "flow");
    this.setState({ currentLogicScreen: 'flow' });
  },
  ScratchButtonClicked: function () {


    clicked = 0;
    sessionStorage.setItem("CurrentLogicScreen", "scratch");
    this.setState({ currentLogicScreen: 'scratch' });

  },
  setCurrentNode: function (current, index) {
    this.setState({ currentNode: current, currentNodeIndex: index });
  },
  logMessage: function () {
    console.log(editor.getSession().getValue());


  },
  render: function () {
    // As according to app approx 11.5 hexagons in a row in the display
    defaultScale = SizesHelper.width / (11.5 * Sizes.xdiff);
    const { program, scale, offset, currentProgramGuide, active } = this.props.logic;
    var { bottomPanel } = this.props.logic;
    const { logicNew, height, width } = this.props;
    const { cards } = this.props.logicNew;
    var value = {};
    var current = '';
    var App = this.props.app;
    var LogicFlowButtons;
    var logicEditorScreenType = this.state.currentLogicScreen;
    var { components } = this.props.workspace;
    Object.keys(PortConnections).map(port => PortConnections[port] = null);
    console.log("component", components);
    Object.keys(components).map(type => {



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
        }
        else {
          PortConnections[component.connectedTo] = { type, index };
        }
      });
    });
    if (this.state.currentLogicScreen == 'hexa') {

      if (active) { if (active[0] !== -1) current = drawing.board[active[0]][active[1]].type; }
      if (current === 'blank' || current === 'active_hand' || current === '' ||
        current === 'hand' || current === 'highlighted_hand') bottomPanel = 'none';
      if (drawing && drawing.activeRef.state) {
        value = drawing.activeRef.state;


      }
      return (
        <div>
          <div className="textButton" style={{ position: 'fixed', float: 'right', right: '0', zIndex: 9999, marginTop: '2%', width: '20%' }}>
            <div><button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid #F9CB2F', backgroundColor: '#F9CB2F', color: 'grey' }} type="button" onClick={this.LogicButtonClicked}><img title="Hexa Screen" style={{ height: '40px', width: '40px' }} src="./images/hex progright.png" /></button>
              <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.LogicFlowButtonClicked}><img title="Logic Screen" style={{ height: '40px', width: '40px' }} src="./images/flowchart2right.png" /></button>
              <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.editorButtonClicked} ><img title="Coding Screen coming soon" style={{ height: '40px', width: '40px' }} src="./images/cright.png" /></button>
              <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.pythonButtonClicked}><img title="Coding Screen coming soon" style={{ height: '40px', width: '40px' }} src="./images/pythonright.png" /></button>
              <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.ScratchButtonClicked}><img title="Coding Screen" style={{ height: '40px', width: '40px' }} src="./images/2-logic.png" /></button>



            </div>
          </div>
          <Tutorials step={this.props.step} msgAt={this.props.msgAt} projId={this.props.projId} currentTab={this.props.currentTab} tutorialMode={this.props.tutorialMode} app={App} />
          <div onWheel={this.wheel}>
            <Hammer onPan={this.pan} onPanStart={this.panStart} onPanEnd={this.panEnd}
              onPinchIn={this.pinchIn} onPinchOut={this.pinchOut} options={{
                recognizers: {
                  pinch: { enable: true }
                }
              }}>
              <div className="draw">
                <svg height='100%' width='100%' style={{ backgroundColor: '#A6D1E1' }} className='noselect'>
                  <g transform={'scale(' + defaultScale + ')'}>
                    <g transform={'scale(' + scale + ')'} id='logicScaleTransformer'>
                      <g transform={'translate(' + offset.left + ',' + offset.top + ')'} id='logicOffsetTransformer'>
                        <HexBoard drawing={drawing} onClick={this.click} />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </Hammer>

            <BottomPanel PortConnections={PortConnections} value={value} show={bottomPanel} toggle={this.toggleBottomPanel} current={current}
              state={drawing.activeRef.state} onChange={this.bottomPanelChange} startState={program[0].state}
              bottomPanelDeleteKey={this.bottomPanelDelete} />

          </div>

        </div>
      );
    }

    else if (this.state.currentLogicScreen == 'scratch') {
      return (
        <div>
          <Blockly></Blockly>
        </div>)
    }
    else if (this.state.currentLogicScreen == 'text') {
      return (
        <div>
          <div id="mainMenu" style={{ height: '100%' }}>
            <div className="textButton" style={{ position: 'fixed', float: 'right', right: '0', zIndex: 9999, marginTop: '2%', width: '20%' }}>
              <div><button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.LogicButtonClicked}><img title="Hexa Screen" style={{ height: '40px', width: '40px' }} src="./images/hex progright.png" /></button>
                <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.LogicFlowButtonClicked}><img title="Logic Screen" style={{ height: '40px', width: '40px' }} src="./images/flowchart2right.png" /></button>
                <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid #F9CB2F' }} type="button" onClick={this.editorButtonClicked}><img title="Coding Screen coming soon" style={{ height: '40px', width: '40px' }} src="./images/cright.png" /></button>
                <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.pythonButtonClicked}><img title="Coding Screen coming soon" style={{ height: '40px', width: '40px' }} src="./images/pythonright.png" /></button>

              </div>
              {/* *******************************************************C Programming Hints ***************************************************** */}
              <div style={{ position: 'fixed', float: 'right', right: '0', zIndex: 9999, marginTop: '-25px', width: '2%' }}>
                <button onClick={this.showHints} style={{ float: 'right', padding: 0 }} type="button"><img title="Coding Hints" style={{ height: '50px', width: '20px', borderRadius: "5px 0px 0px 5px" }} src="./images/sidepanel.png" /></button>
              </div>
              <div style={{ cursor: "pointer", fontSize: "14px", float: "right", marginTop: "5px" }} >
                {/* <button  onClick={this.showHints} style={{background:"transparent"}}><img style={{width:'35px',height:"35px",marginLeft:'5px'}} src="images/plus.png"/> </button>                       */}
                <div className="hints" style={{ zIndex: '10000', maxWidth: '600px', marginLeft: '-630px', marginRight: '5px', position: 'fixed', overflowX: "auto", overflowY: "auto" }}>
                  {/* <button style={{ float: 'right', marginRight: '0%', padding: 0, border: 'transparent' }} onClick={this.closeHints} type="button"><img src="images/btn_close9.png" style={{height: '24px',width: '24px', backgroundColor: 'transparent'}}/></button> */}
                  <div style={{ width: "600px", height: "600px", color: "white", marginLeft: "1%", marginTop: "1%" }}>
                    <div>
                      <p>
                        SET_AS_IN(PORT NAME); Setting a particular PORT as INPUT digital. Example:- SET_AS_IN(A1);<br />
                        SET_AS_OUT(PORT NAME); setting a particular PORT as OUTPUT digital, Example:- SET_AS_OUT(B2);<br />
                        WRITE_LOGIC(PORT NAME, LOGIC); writing a logic value to a particular PORT, Example:- WRITE_LOGIC(A2, HIGH); OR WRITE_LOGIC(A2, LOW);<br />
                        READ_LOGIC(PORT NAME);  Reading a LOGIC Value of the particular PORT, Example:- int val = READ_LOGIC(A3);<br />
                        WRITE_PWM(PORT NAME, VALUE);  writing a PWM value of the particular PORT, Example:- WRITE_PWM(A2, 255);<br />
                        PULSE_OUT(PORT NAME, TIME, LOGIC); Writing a PULSE signal to a PARTICULAR PORT, Example:- PULSE_OUT(B1, 3, HIGH);<br />
                      </p><br />
                      <p>
                        <h3> MOTORS</h3>
                        SERVO(PORT NAME, DEGREE); Writing a Degree value to the PORT, Example:- SERVO(A2, 120);<br />
                        MOTORx(DIRECTION, SPEED); Making a MOTOR rotate in the particular direction and speed on the MOTOR PORTS, here “x” means the particular MOTOR PORT number,  Example:- MOTOR1(CLOCKWISE, 20); OR MOTOR2(ANTICLOCKWISE, 20);<br />
                      </p><br />
                      <p>
                        <h3> ADC </h3>
                        ADC_ENABLE(); enabling ADC on the PORTS<br />
                        ADC_DISABLE();  Disabling ADC on the PORTS<br />
                        SELECT_ADC_PORT(PORT NAME); Selecting the ADC channel for analog input, Example:- SELECT_ADC_PORT(A1);<br />
                        READ_ADC(PORT NAME); reading a ADC value of the particular PORT, Example:- int value= READ_ADC(A2);<br />
                        SET_RESOLUTION(BIT SIZE); setting the bit size of the ADC resultant, Example:- SET_RESOLUTION(10);<br />
                      </p><br />

                    </div><br /><br />
                    {/* <a onClick={this.closeHints} style={{marginLeft:"250px",fontSize:"20px"}}>Close</a> */}
                  </div>
                </div>
              </div>

              {/* ******************************************************************************************** */}

            </div>
            <div id="c_cpp-editor" style={{ padding: '20px', width: '98%', height: '98%', fontSize: '16px' }}
              onClick={this.clickmeDown}>
            </div>
          </div>
          <div onWheel={this.wheel}>
            <Hammer onPan={this.pan} onPanStart={this.panStart} onPanEnd={this.panEnd} onTap={this.handleBottomPanelClick}>
              <div className="draw">
                <svg height='100%' width='100%' style={{ backgroundColor: '#A6D1E1' }} className='noselect'>
                  <g transform={'translate(' + offset.left + ',' + offset.top + ')'} id='logicOffsetTransformer'>
                    <g transform={'scale(' + scale + ')'} id='logicScaleTransformer'></g>
                  </g>
                </svg>
              </div>
            </Hammer>
          </div>
          <RightPanel PortConnections={PortConnections} value={respVal} show={bottomPanel} toggle={this.toggleBottomPanel} current={'editorPanel'}
            state={App.state} onChange={this.bottomPanelChange} startState={program[0].state} />
        </div>
      );
    }
    else if (this.state.currentLogicScreen == 'python') {
      return (
        <div>
          <div id="mainMenu" style={{ height: '100%' }}>
            <div className="textButton" style={{ position: 'fixed', float: 'right', right: '0', zIndex: 9999, marginTop: '2%', width: '20%' }}>
              <div><button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.LogicButtonClicked}><img title="Hexa Screen" style={{ height: '40px', width: '40px' }} src="./images/hex progright.png" /></button>
                <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.LogicFlowButtonClicked}><img title="Logic Screen" style={{ height: '40px', width: '40px' }} src="./images/flowchart2right.png" /></button>
                <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.editorButtonClicked}><img title="Coding Screen coming soon" style={{ height: '40px', width: '40px' }} src="./images/cright.png" /></button>
                <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid #F9CB2F' }} type="button" onClick={this.pythonButtonClicked}><img title="Coding Screen coming soon" style={{ height: '40px', width: '40px' }} src="./images/pythonright.png" /></button>

              </div>

              {/* *****************************************For Hints************************************************* */}
              <div style={{ position: 'fixed', float: 'right', right: '0', zIndex: 9999, marginTop: '-30px', width: '2%' }}>
                <button onClick={this.showHints} style={{ float: 'right', padding: 0 }} type="button"><img title="Coding Hints" style={{ height: '50px', width: '20px', borderRadius: "5px 0px 0px 5px" }} src="./images/sidepanel.png" /></button>
              </div>
              <div style={{ cursor: "pointer", fontSize: "14px", float: "right", marginTop: "-px" }} >
                {/* <button  onClick={this.showHints} style={{background:"transparent"}}><img style={{width:'35px',height:"35px",marginLeft:'5px'}} src="images/plus.png"/> </button>                       */}
                <div className="hints" style={{ zIndex: '10000', maxWidth: '600px', marginLeft: '-630px', marginRight: '5px', position: 'fixed', overflowX: "auto", overflowY: "auto" }}>
                  {/* <button style={{ float: 'right', marginRight: '0%', padding: 0, border: 'transparent' }} onClick={this.closeHints} type="button"><img src="images/btn_close9.png" style={{height: '24px',width: '24px', backgroundColor: 'transparent'}}/></button> */}
                  <div style={{ width: "600px", height: "600px", color: "white", marginLeft: "1%", marginTop: "1%" }}>
                    <div>
                      <p>
                        #Welcome to python programming<br /><br />
                        import GPIO<br /><br />
                        import Adc<br /><br />
                        import Ultrasonic<br /><br />
                        import Supersensor<br /><br />
                        import RFID<br /><br />
                        import Dotmatrix<br /><br />
                        import Motor<br /><br />
                        import Servo<br /><br />
                        import MP3<br /><br />
                        import wait<br /><br />
                        GPIO.set(Port,Logic)<br /><br />
                        Adc.set(Port)<br /><br />
                        Ultrasonic.set(Port)<br /><br />
                        Supersensor.set(Port)<br /><br />
                        RFID.set(Port)<br /><br />
                        Dotmatrix.set(Port)<br /><br />
                        Motor.set(Port)<br /><br />
                        Servo.set(Port)<br /><br />
                        MP3.set(Port)<br /><br />
                        while true:<br /><br />
                        if(condition)<br /><br />
                        endif()<br /><br />
                        for loop in range(number)<br /><br />
                        endloop()<br /><br />
                        digital.write(Port,Logic)<br /><br />
                        Pwm.write(Port,value)<br /><br />
                        Motor.write(Port,value)<br /><br />
                        Servo.write(Port,degree)<br /><br />
                        MP3.write(value)<br /><br />
                        Dotmatrix.write(Port,character)<br /><br />
                        digital.read(Port)<br /><br />
                        Adc.read(Port)<br /><br />
                        Ultrasonic.read(Port)<br /><br />
                        Supersensor.read(Sensor)<br /><br />
                        RFID.read(Port)<br /><br />
                        BiCountX.add(value)<br /><br />
                        BiCountX.sub(value)<br /><br />
                        BiCountX.set(value)<br /><br />
                        BiDataX.set(value)<br /><br />
                        BiFlagX.set(value)<br /><br />
                        BTRemote.set(value)<br /><br />
                        BTSlider.set(value)<br /><br />
                        BTSpeech.set(value)<br /><br />
                        IOTX.set(value)<br /><br />
                        wait.set(sec)<br /><br />
                        repeat()<br /><br />

                      </p><br />

                    </div><br /><br />
                    {/* <a onClick={this.closeHints} style={{marginLeft:"250px",fontSize:"20px"}}>Close</a> */}
                  </div>
                </div>
              </div>

            </div>
            <div id="python-editor" style={{ padding: '20px', width: '98%', height: '98%', fontSize: '16px' }}
              onClick={this.clickmeDown}>
            </div>
          </div>
          <div onWheel={this.wheel}>
            <Hammer onPan={this.pan} onPanStart={this.panStart} onPanEnd={this.panEnd} onTap={this.handleBottomPanelClick}>
              <div className="draw">
                <svg height='100%' width='100%' style={{ backgroundColor: '#A6D1E1' }} className='noselect'>
                  <g transform={'translate(' + offset.left + ',' + offset.top + ')'} id='logicOffsetTransformer'>
                    <g transform={'scale(' + scale + ')'} id='logicScaleTransformer'></g>
                  </g>
                </svg>
              </div>
            </Hammer>
          </div>
          <RightPanel PortConnections={PortConnections} value={respVal} show={bottomPanel} toggle={this.toggleBottomPanel} current={'editorPanel'}
            state={App.state} onChange={this.bottomPanelChange} startState={program[0].state} />
        </div>
      );
    } else {
      editorRendered = true;
      var index = this.state.currentNodeIndex;
      if (logicNew.cards)
        current = logicNew.cards[index].type;
      var currentState = {};
      if (this.state.currentNode.type) {
        current = this.state.currentNode.type;
        currentState = logicNew.cards[index].state;
        value = logicNew.cards[index].state;
        if (Object.keys(currentState).length === 0 && currentState.constructor === Object && current == 'end') {
          currentState = 'repeat';
        }
        //this.state.currentNode.state;
      }
      if (current === 'blank' || current === '' || this.state.currentNode.type === undefined) bottomPanel = 'none';
      return (
        <div>
          <div className="textButton" style={{ position: 'fixed', float: 'right', right: '0', zIndex: 9999, marginTop: '2%', width: '20%' }}>
            <div><button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.LogicButtonClicked}><img title="Hexa Screen" style={{ height: '40px', width: '40px' }} src="./images/hex progright.png" /></button>
              <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent', backgroundColor: '#F9CB2F', color: 'grey' }} type="button" onClick={this.LogicFlowButtonClicked}  ><img title="Logic Screen" style={{ height: '40px', width: '40px' }} src="./images/flowchart2right.png" /></button>
              <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.editorButtonClicked} ><img title="Coding Screen coming soon" style={{ height: '40px', width: '40px' }} src="./images/cright.png" /></button>
              <button style={{ float: 'left', marginRight: '1%', padding: 0, border: '3px solid transparent' }} type="button" onClick={this.pythonButtonClicked}><img title="Coding Screen coming soon" style={{ height: '40px', width: '40px' }} src="./images/pythonright.png" /></button>
            </div>
          </div>
          <div className="pure-g" style={{ height: '100%', width: '100%' }}>
            <div className="pure-u-1-6">
              <SidebarNew height={this.props.height} removeFromDropspace={this.removeFromDropspace} />
            </div>
            <div className="pure-u-5-6">
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }} onWheel={this.wheel}>

                <Hammer onPan={this.pan} onPanEnd={this.panEnd} onPinchIn={this.pinchIn}
                  onPinchOut={this.pinchOut} options={{
                    recognizers: {
                      pinch: { enable: true }
                    }
                  }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                  }} />
                </Hammer>
                <DropspaceNew logicNew={logicNew} update={this.props.update} makeCurrentNode={this.setCurrentNode}
                  removeCardConnections={this.removeCardConnections} nodeCount={this.state.nodeCount}
                  removeFromDropspace={this.removeFromDropspace} insertCard={this.insertCard} updateNodeCount={this.updateNodeCount}
                  height={height} width={width * 5 / 6} />
              </div>
            </div>
            <CustomDragLayerNew cards={logicNew.cards} height={height} width={width} sidebarWidth={width * 1 / 6} logicNew={logicNew} removeConnection={this.removeConnection} />
            <BottomPanel PortConnections={PortConnections} value={value} show={bottomPanel} toggle={this.toggleBottomPanel} current={current}
              state={currentState} onChange={this.bottomPanelChange} startState={cards[0].state}
              bottomPanelDeleteKey={this.bottomPanelDelete} />
          </div>
        </div>);
    }
  }
});
module.exports = DragDropContext(TouchBackend({ enableMouseEvents: true }))(Logic);
