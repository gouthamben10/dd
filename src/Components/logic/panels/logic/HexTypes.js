// const Colors = require('./Colors')
import Colors from "./Colors";

var HexTypes = {
  "": { color: Colors.blue },
  start: { color: "#55C11E" },
  end: { color: "	#FF4500" },

  condition: { color: Colors.purple, image: "condition" },
  if: { color: Colors.if },
  sensor: { color: "#6F11D2", image: "sensor" },
  variable: { color: "#5A00B9", image: "variable" },

  repeat_one: { color: Colors.blueshade, image: "repeat_one" },
  loop_one: { color: Colors.orange, image: "loop_one" },

  repeat: { color: "	#FF7F50 ", name: "loop", image: "loop" }, //there is a swap of functionality.
  output: { color: Colors.orange, image: "output12" },

  action: { color: Colors.blueshade, image: "action" },
  hardware: { color: "#2691DA", image: "hardware" },
  variable_output: { color: "#355599", image: "variable 2", name: "variable" },
  wait: { color: "#355599", image: "wait" },

  code: { color: "#883902" },
  end_if: { color: Colors.purple, name: "END IF", image: "end if" },
  end_condition: { color: Colors.purple, name: "END IF", image: "end if" },

  end_variable: { color: "#5A00B9", name: "END IF", image: "end if" },
  end_sensor: { color: "#6F11D2", name: "End IF", image: "end if" },

  loop: { color: "#FF9757", name: "Repeat", image: "repeat" },
  end_loop: { color: "#FF9757", name: "End Loop", image: "end" },

  hand: { color: Colors.grey, image: "touch" },
  active_hand: { color: Colors.flash_yellow, name: "", image: "touch" },
  highlighted_hand: { color: Colors.cyan, name: "", image: "touch" },
  blank: { color: Colors.white, name: "" },
  insert: { color: Colors.insert, image: "insert" },
  delete: { color: Colors.delete, image: "delete" },
};

Object.keys(HexTypes).map((hextype) => {
  var data = HexTypes[hextype];
  if (data.name == undefined) data.name = hextype;
  const imgPathPrefix = "images/logic_icon/";
  const imgPathPostfix = ".png";
  if (data.image) data.image = imgPathPrefix + data.image + imgPathPostfix;
  else data.image = imgPathPrefix + hextype + imgPathPostfix;
});

HexTypes.blank.image = "";

export default HexTypes;
