import selectedCompo_Reducer from "./componentSelection";
import assemblySelec_Reducer from "./assemblySelection";
import logicSelection from "./logicSection";
import flowlogicSelection from "./flowLogic";

import webSerialPortList_Reducer from "./WebSerial";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  webSerial: webSerialPortList_Reducer,
  concept: selectedCompo_Reducer,
  assembly: assemblySelec_Reducer,
  logic: logicSelection,
  flowlogic: flowlogicSelection,
});

export default allReducer;
