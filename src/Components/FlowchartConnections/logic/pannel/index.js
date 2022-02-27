import Condition from "./condition/Condition";
import WaitPanel from "./wait/WaitPanel";
import End from "./end/End";
import LoopPanel from "./loop/loop";
export default function (panel) {
  var data;
  console.log("Condition===>");
  switch (panel) {
    case "condition":
      console.log("Condition===>");
      return Condition;
    case "wait":
      return WaitPanel;
    case "loop":
      return LoopPanel;
    case "repeat":
    case "end":
      return End;
  }
}
