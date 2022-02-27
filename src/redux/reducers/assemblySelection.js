import components from "./data.js"; //component details
import PortConnections from "../../Components/Assembly/PortConnections";
// var PortConnections = require('../../components/Assembly/PortConnections')

if (sessionStorage.getItem("assembly")) {
  console.log("Iffffffffffffff");
  var assembly = sessionStorage.getItem("assembly");
  assembly = JSON.parse(assembly);
} else {
  console.log("777777777777777777");
  var assembly = {
    components: components,
    PortConnections: PortConnections,
    workspace: {
      // bibox: { top: 135, left: 317 },//Before change for Ace
      bibox: { top: 162, left: 328 },
      components: {
        // Other components come here
        // eg. "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
      },
      offset: { top: 0, left: 0 },
      scale: 1,
    },

    height: document.body.clientHeight,
    width: document.body.clientWidth,
  };
}

//    DD= JSON.parse(sessionStorage.getItem("SelectedComp"));

const assemblySelec_Reducer = (state = assembly, action) => {
  console.log("action==>", action);

  var { payload } = action;
  var workspace = payload;

  switch (action.type) {
    case "ASSEMBLY_SELECTION":
      console.log("ASSEMBLY_SELECTION", payload);

      var workspace = payload;
      var data = { ...state, workspace };
      console.log(data, "---------------->>>>>>>>>");
      sessionStorage.setItem("assembly", JSON.stringify(data));
      return data;

    case "PORT_CONNECTION":
      console.log("Port_Connections_Reducer", payload);
      var PortConnections = payload;
      var data = { ...state, PortConnections };
      sessionStorage.setItem("assembly", JSON.stringify(data));
      return data;

    case "sizesHelper":
      var { width, height } = payload;
      var data = { ...state, width, height };
      sessionStorage.setItem("assembly", JSON.stringify(data));

      return data;

    case "ASSEMBLY":
      var { PortConnections, width, height, workspace } = payload;
      var data = { ...state, PortConnections, width, height, workspace };

      return data;

    default:
      sessionStorage.setItem("assembly", JSON.stringify(state));
      return state;
  }
};

export default assemblySelec_Reducer;
