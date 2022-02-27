// import editor from './editorPanel';
import StartPanel from "./start";

import action from "./action";
import hardware from "./output/index_o";
import WaitPanel from "./wait";
import VariableOutput from "./output/index";

import condition from "./condition";

import empty from "./empty";
import End from "./end";

import variable from "./if";
import sensor from "./if_O";

import EndIfLoop from "./end_if_loop";
import EditorPanel from "./editorPanel";
import LoopPanel from "./loop";
import CodePanel from "./code";

// import loop from './loop';

// import code from './code';
// import endif from './end_if_loop';

// import if1 from './if';

export default function (panel) {
  console.log("panel", panel);
  var data;
  switch (panel) {
    // case 'output':
    // //   return require('./ns');
    case "editorPanel":
      return EditorPanel;
    case "start":
      return StartPanel;
    case "condition":
      return condition;
    case "end_if":
      return EndIfLoop;
    case "end_condition":
      return EndIfLoop;
    case "end_sensor":
      return EndIfLoop;
    case "end_variable":
      return EndIfLoop;
    case "loop":
      return LoopPanel;
    case "end_loop":
      return EndIfLoop;
    case "code":
      return CodePanel;
    case "action":
      return action;
    case "hardware":
      return hardware;
    case "variable_output":
      return VariableOutput;
    case "sensor":
      return sensor;
    case "variable":
      return variable;
    case "wait":
      return WaitPanel;

    case "repeat":
    case "end":
      return End;
    default:
      return empty;
  }
}
