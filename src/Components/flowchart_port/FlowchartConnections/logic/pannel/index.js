import Condition from "./condition/Condition";
import WaitPanel from "./wait/WaitPanel";
import End from "./end/End";
import LoopPanel from "./loop/loop";
import OutputPanel from "./output/Output";
export default function (panel) {
  var data;
  console.log("Condition===>");
  switch (panel) {
    case "condition":
      return Condition;
    case "wait":
      return WaitPanel;
    case "loop":
      return LoopPanel;
    case "output":
      return OutputPanel;
    case "repeat":
    case "end":
      return End;
  }
}
