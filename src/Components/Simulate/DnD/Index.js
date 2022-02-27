/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactFlow, { isEdge, addEdge, Handle } from "react-flow-renderer";
// import {IllusLoginSrc} from '../../../source/source';
import ColorSelectorNode from "./ColorSelectorNode";
import "./dnd.scss";
import PortValuesRangeMapping from "../../logic/PortValuesRangeMapping";
import Modal from "react-modal";

const onLoad = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);
const onNodeDragStop = (event, node) => console.log("drag stop", node);

// const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [16, 16];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};
let newvals = [];
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "28%",
    width: " 30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#9ecee8",
    border: "2px solid #188dcc",
    zIndex: "1000",
  },
};

const CustomNodeFlow = ({ compo, img, assembly, updateState, indexChange }) => {
  console.log("CustomNodeFlow PROPS", compo, img, assembly);

  const onElementClick = (event, element) => {
    console.log(event.target);
    console.log(event.target.getAttribute("namecomp"));
    let compName = event.target.getAttribute("namecomp");

    console.log("click", element);

    // setModel(true);

    if (
      compName !== "led" &&
      compName !== "laser" &&
      compName !== "dual_splitter"
    ) {
      let removeUnderScore = compName.replace(/_/g, " "); //returns my_name

      let data = event.target.getAttribute("id").slice(4, 6);
      console.log("DATA, PORT ", data);

      let valueRange = PortValuesRangeMapping[data][compName]();

      console.log(valueRange.max, "valueRange");

      updateState(true, removeUnderScore, compName, valueRange.max);
      indexChange();
    }
  };

  const closeModel = () => {
    console.log("CLOSE MODEL CALLING");

    let value = document.getElementById("inputValue").value;
    let data = JSON.parse(sessionStorage.getItem("simulate"));
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].componentName === this.state.componentClicked) {
    //     data[i].value = value;
    //   }
    // }
    // sessionStorage.setItem("simulate", JSON.stringify(data));

    setModel(false);
  };

  // console.log(state)
  const [elements, setElements] = useState([]);
  let newArr = Object.keys(compo);
  console.log(newArr, "val14578");
  if (newArr.includes("dual_splitter")) {
    let ind = newArr.indexOf("dual_splitter");
    let temp = 0;
    temp = newArr[0];
    newArr[0] = newArr[ind];
    newArr[ind] = temp;
  }

  let val,
    val1,
    val2,
    val3,
    port1,
    port2,
    port3,
    port4,
    port5,
    port6,
    port7,
    port8,
    port9,
    port10,
    port11,
    port12,
    port13,
    port14,
    port15,
    port16,
    connect,
    connect1,
    connect2,
    connect3,
    portA1,
    portA2,
    portB1,
    portB2,
    portC1,
    portC2,
    portD1,
    portD2,
    portA,
    portB,
    portC,
    portD = null;

  // var i = 0,y=-1;
  // var loopProgram='',loopcount=0,loop=1,ifResult=false,switchOff=false;
  var sent = "",
    touch_tack_port = "";
  let newArray = [];

  const [model, setModel] = useState(false);

  const [componentClicked, setComponentClicked] = useState("");

  useEffect(() => {
    let ports = JSON.parse(sessionStorage.getItem("assembly"));
    let connections = ports.PortConnections;
    newArray.push(connections);
    console.log(newArray);
    let Compo = assembly.workspace.components;
    sessionStorage.setItem("simulate", JSON.stringify([]));
    console.log("PROPS FROM SIMULATE..", Compo);

    Object.keys(Compo).map((keys) => {
      const dict = {
        A: "1-compo",
        B: "2-compo",
        C: "3-compo",
        D: "4-compo",
        A1: "5-compo",
        A2: "6-compo",
        B1: "7-compo",
        B2: "8-compo",
        C1: "9-compo",
        C2: "10-compo",
        D1: "11-compo",
        D2: "12-compo",
      };
      return Compo[keys].map((ind) => {
        var clone = [
          ...JSON.parse(sessionStorage.getItem("simulate")),
          { componentName: keys, port: ind.connectedTo },
        ];
        sessionStorage.setItem("simulate", JSON.stringify(clone));
        return true;
      });
    });
  }, []);

  if (compo[newArr[1]]) {
    Object.values(compo[newArr[1]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
    });
  }
  if (compo[newArr[2]]) {
    Object.values(compo[newArr[2]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
    });
  }
  if (compo[newArr[3]]) {
    Object.values(compo[newArr[3]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
    });
  }
  if (compo[newArr[4]]) {
    Object.values(compo[newArr[4]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
      return null;
    });
  }
  if (compo[newArr[7]]) {
    Object.values(compo[newArr[7]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
      return null;
    });
  }
  if (compo[newArr[6]]) {
    Object.values(compo[newArr[6]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
      return null;
    });
  }
  if (compo[newArr[5]]) {
    Object.values(compo[newArr[5]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
      return null;
    });
  }
  if (compo[newArr[8]]) {
    Object.values(compo[newArr[8]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
      return null;
    });
  }
  if (compo[newArr[9]]) {
    Object.values(compo[newArr[9]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
      return null;
    });
  }
  if (compo[newArr[10]]) {
    Object.values(compo[newArr[10]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
      return null;
    });
  }
  if (compo[newArr[11]]) {
    Object.values(compo[newArr[11]]).map((i) => {
      switch (i.connectedTo) {
        case "A": {
          return (portA = "A");
        }
        case "B": {
          return (portB = "B");
        }
        case "C": {
          return (portC = "C");
        }
        case "D": {
          return (portD = "D");
        }
        case "A1": {
          return (portA1 = "A1");
        }
        case "A2": {
          return (portA2 = "A2");
        }
        case "B1": {
          return (portB1 = "B1");
        }
        case "B2": {
          return (portB2 = "B2");
        }
        case "C1": {
          return (portC1 = "C1");
        }
        case "C2": {
          return (portC2 = "C2");
        }
        case "D1": {
          return (portD1 = "D1");
        }
        case "D2": {
          return (portD2 = "D2");
        }
      }
      return null;
    });
  }

  if (compo[newArr[0]]) {
    val = Object.keys(compo[newArr[0]]).length;
    connect = Object.values(compo[newArr[0]]);
    console.log(compo[0], "comccccc", newArr, val, compo, val, connect[1]);
    if (val === 1) {
      port1 = connect[0].connectedTo;
    }
    if (val === 2) {
      port1 = connect[0].connectedTo;
      port2 = connect[1].connectedTo;
      // newArr[2] = newArr[0];
    }
    if (val === 3) {
      port1 = connect[0].connectedTo;
      port2 = connect[1].connectedTo;
      port3 = connect[2].connectedTo;
      // newArr[2] = newArr[0];
      // newArr[1] = newArr[0];
    }
    if (val === 4) {
      port1 = connect[0].connectedTo;
      port2 = connect[1].connectedTo;
      port3 = connect[2].connectedTo;
      port4 = connect[3].connectedTo;
      console.log(port1, port2, port3, port4, "comccccc");
      // newArr[3] = newArr[0];
    }
  }

  console.log(newArr, "val14578");

  if (compo[newArr[1]]) {
    val1 = Object.keys(compo[newArr[1]]).length;
    connect1 = Object.values(compo[newArr[1]]);
    console.log(compo, "val1457", connect1, val1);
    if (val1 === 1) {
      port5 = connect1[0].connectedTo;
    }
    if (val1 === 2) {
      port5 = connect1[0].connectedTo;
      port6 = connect1[1].connectedTo;
      console.log(port5, port6, "val1457");
      // newArr[2] = newArr[1];
    }
    if (val1 === 3) {
      port5 = connect1[0].connectedTo;
      port6 = connect1[1].connectedTo;
      port7 = connect1[2].connectedTo;
    }
    if (val1 === 4) {
      port5 = connect1[0].connectedTo;
      port6 = connect1[1].connectedTo;
      port7 = connect1[2].connectedTo;
      port8 = connect1[3].connectedTo;
    }
    if (val1 === 5) {
      port5 = connect1[0].connectedTo;
      port6 = connect1[1].connectedTo;
      port7 = connect1[2].connectedTo;
      port8 = connect1[3].connectedTo;
      port9 = connect1[4].connectedTo;
    }
    if (val1 === 6) {
      port5 = connect1[0].connectedTo;
      port6 = connect1[1].connectedTo;
      port7 = connect1[2].connectedTo;
      port8 = connect1[3].connectedTo;
      port9 = connect1[4].connectedTo;
      port10 = connect1[5].connectedTo;
    }
    if (val1 === 7) {
      port5 = connect1[0].connectedTo;
      port6 = connect1[1].connectedTo;
      port7 = connect1[2].connectedTo;
      port8 = connect1[3].connectedTo;
      port9 = connect1[4].connectedTo;
      port10 = connect1[5].connectedTo;
      port11 = connect1[6].connectedTo;
    }
  }
  if (compo[newArr[2]]) {
    val2 = Object.keys(compo[newArr[2]]).length;
    connect2 = Object.values(compo[newArr[2]]);
    console.log(compo[newArr[2]], "comccccc", val2);
    console.log(val2, "val1457", newArr, compo);

    // console.log(val2, 'asdasdasdasd', connect2, newArr)
    if (val2 === 1) {
      port9 = connect2[0].connectedTo;
    }
    if (val2 === 2) {
      port9 = connect2[0].connectedTo;
      port10 = connect2[1].connectedTo;
      console.log(port9, port10, "val1457", newArr[2]);
    }

    if (val2 === 3) {
      port9 = connect2[0].connectedTo;
      port10 = connect2[1].connectedTo;
    }
    if (val2 === 4) {
      port9 = connect2[0].connectedTo;
      port10 = connect2[1].connectedTo;
    }
    if (val2 === 5) {
      port9 = connect2[0].connectedTo;
      port10 = connect2[1].connectedTo;
    }
    if (val2 === 6) {
      port9 = connect2[0].connectedTo;
      port10 = connect2[1].connectedTo;
    }
    // alert(val2)
  }
  if (compo[newArr[3]]) {
    console.log("comccccc", compo, newArr[3], newArr);
    val3 = Object.keys(compo[newArr[3]]).length;
    connect3 = Object.values(compo[newArr[3]]);
    if (val3 === 1) {
      port11 = connect3[0].connectedTo;
    }
  }
  if (compo[newArr[4]]) {
    console.log("comccccc", compo, newArr[3], newArr);
    val3 = Object.keys(compo[newArr[4]]).length;
    connect3 = Object.values(compo[newArr[4]]);
    if (val3 === 1) {
      port12 = connect3[0].connectedTo;
    }
  }
  if (compo[newArr[5]]) {
    val3 = Object.keys(compo[newArr[5]]).length;
    connect3 = Object.values(compo[newArr[5]]);
    console.log("comccccc", compo, newArr[3], newArr, connect3, val3);
    if (val3 === 1) {
      port13 = connect3[0].connectedTo;
    }
  }

  if (compo[newArr[6]]) {
    val3 = Object.keys(compo[newArr[6]]).length;
    connect3 = Object.values(compo[newArr[6]]);
    console.log("comccccc", compo, newArr[6], newArr, val3);
    if (val3 === 1) {
      port14 = connect3[0].connectedTo;
    }
  }
  if (compo[newArr[7]]) {
    val3 = Object.keys(compo[newArr[7]]).length;
    connect3 = Object.values(compo[newArr[7]]);
    if (val3 === 1) {
      port15 = connect3[0].connectedTo;
    }
    console.log("comccccc", compo, newArr[7], newArr, val3, connect3, port13);
  }

  if (compo[newArr[8]]) {
    val3 = Object.keys(compo[newArr[8]]).length;
    connect3 = Object.values(compo[newArr[8]]);
    if (val3 === 1) {
      port16 = connect3[0].connectedTo;
    }
    console.log("comccccca", compo, newArr[8], newArr, val3, connect3, port16);
  }

  console.log(newArr, "newvals");
  useEffect(() => {
    const onChange = (event) => {
      setElements((els) =>
        els.map((e) => {
          if (isEdge(e) || e.id !== "2") {
            return e;
          }

          const color = event.target.value;

          return {
            ...e,
            data: {
              ...e.data,
              color,
            },
          };
        })
      );
    };

    const arr = [
      "1-compo",
      "2-compo",
      "3-compo",
      "4-compo",
      "5-compo",
      "6-compo",
      "7-compo",
      "8-compo",
      "9-compo",
      "10-compo",
      "11-compo",
      "12-compo",
    ];

    const textSplitter = (n, port) => {
      let ports = JSON.parse(sessionStorage.getItem("assembly"));
      let connections = ports.PortConnections;

      return (
        <div id={arr[n]}>
          <img
            // src={`/images/oldImages/component_${connections[port].type}.png`}
            src={`/Bisoft_UI/Accessories/newComponents/component_${connections[port].type}.png`}
            nameComp={connections[port].type}
            width="70"
            alt=""
            id={`img_${port}`}
            style={{ position: "absolute", top: "-7px", left: "-1px" }}
          />
        </div>
      );
    };
    const text = (n, port) => {
      if (newArr[n] === "dual_splitter") {
        return (
          <div id={arr[n]}>
            <img
              // src={`/images/oldImages/component_${newArr[n]}.png`}
              src={`/Bisoft_UI/Accessories/newComponents/component_${newArr[n]}.png`}
              width="70"
              alt=""
              nameComp={newArr[n]}
              id={`img_${port}`}
              style={{ position: "absolute", top: "-10px", left: "-1px" }}
            />

            <Handle
              type="source"
              // position="left"
              className="target3"
              onConnect={(params) => console.log("handle onConnect", params)}
              id={`splitter-port-1`}
              style={{
                position: "absolute",
                top: "-0px",
                left: "33px",
              }}
            />
            <Handle
              // data-handleid={`${port}1`}
              onConnect={(params) => console.log("handle onConnect", params)}
              className={"target1"}
              type="source"
              // data-nodeid={`${port}1`}
              id={`${port}1`}
            />
            <Handle
              // data-handleid={`${port}2`}
              onConnect={(params) => console.log("handle onConnect", params)}
              className={"target2"}
              type="source"
              id={`${port}2`}
              // data-nodeid={`${port}2`}
            />
          </div>
        );
      }
      return (
        <div id={arr[n]}>
          <img
            // src={`/images/oldImages/component_${newArr[n]}.png`}
            src={`/Bisoft_UI/Accessories/newComponents/component_${newArr[n]}.png`}
            width="70"
            alt=""
            nameComp={newArr[n]}
            id={`img_${port}1`}
          />
        </div>
      );
    };

    const firstCondition = () => {
      let int = 0;
      Object.entries(compo).map((i) => {
        newArr.map((j, index) => {
          if (i[0] === j) {
            console.log(i[0], i[1], "val145", j);
            if (i[1].length !== 0) {
              if (i[1][0].connectedTo === "A") {
                int = index;
              }
            }
          }
        });
      });
      return text(int, "A");
    };

    const secondCondition = () => {
      let int = 0;
      Object.entries(compo).map((i) => {
        newArr.map((j, index) => {
          if (i[0] === j) {
            console.log(i[0], i[1], "val145", j);
            if (i[1].length !== 0) {
              if (i[1][0].connectedTo === "B") {
                int = index;
              }
            }
          }
        });
      });
      return text(int, "B");
    };

    const thirdCondition = () => {
      let int = 0;
      Object.entries(compo).map((i) => {
        newArr.map((j, index) => {
          if (i[0] === j) {
            if (i[1].length !== 0) {
              console.log(i[0], i[1], "val14578", j, i[1][0], compo, i, newArr);
              i[1].map((k) => {
                if (k.connectedTo === "C") {
                  int = index;
                }
              });
              // if(i[1][0].connectedTo === 'C'){
              //   int = index
              //   console.log(int, 'val145')
              // }
            }
          }
        });
      });
      console.log(int, "val145");
      return text(int, "C");
    };

    const fourthCondition = () => {
      let int = 0;
      Object.entries(compo).map((i) => {
        newArr.map((j, index) => {
          if (i[0] === j) {
            if (i[1].length !== 0) {
              i[1].map((k) => {
                if (k.connectedTo === "D") {
                  int = index;
                }
              });
              // if(i[1][0].connectedTo === 'D'){
              //   int = index;
              // }
            }
          }
        });
      });
      return text(int, "D");
    };

    const firstSplitterCondition = () => {
      if (portA1 === "A1") {
        return textSplitter(4, "A1");
      }
    };

    const secondSplitterCondition = () => {
      if (portA2 === "A2") {
        return textSplitter(5, "A2");
      }
    };

    const firstSplitterB1Condition = () => {
      if (portB1 === "B1") {
        return textSplitter(6, "B1");
      }
    };

    const secondSplitterB2Condition = () => {
      if (portB2 === "B2") {
        return textSplitter(7, "B2");
      }
    };
    const firstC1SplitterCondition = () => {
      if (portC1 === "C1") {
        return textSplitter(8, "C1");
      }
    };

    const secondC2SplitterCondition = () => {
      if (portC2 === "C2") {
        return textSplitter(9, "C2");
      }
    };

    const firstD1SplitterCondition = () => {
      if (portD1 === "D1") {
        return textSplitter(10, "D1");
      }
    };

    const secondD2SplitterCondition = () => {
      if (portD2 === "D2") {
        return textSplitter(11, "D2");
      }
    };

    const firstLineCondition = () => {
      if (port4 === "A" || port3 === "A" || port2 === "A" || port1 === "A") {
        return "1";
      } else if (
        port8 === "A" ||
        port5 === "A" ||
        port6 === "A" ||
        port7 === "A"
      ) {
        return "1";
      } else if (
        port9 === "A" ||
        port10 === "A" ||
        port11 === "A" ||
        port12 === "A"
      ) {
        return "1";
      } else if (
        port13 === "A" ||
        port14 === "A" ||
        port15 === "A" ||
        port16 === "A"
      ) {
        return "1";
      } else {
        return "25";
      }
    };

    const secondLineCondition = () => {
      // alert(port2);
      if (port4 === "B" || port3 === "B" || port2 === "B" || port1 === "B") {
        return "2";
      } else if (
        port8 === "B" ||
        port5 === "B" ||
        port6 === "B" ||
        port7 === "B"
      ) {
        return "2";
      } else if (
        port9 === "B" ||
        port10 === "B" ||
        port11 === "B" ||
        port12 === "B"
      ) {
        return "2";
      } else if (
        port13 === "B" ||
        port14 === "B" ||
        port15 === "B" ||
        port16 === "B"
      ) {
        return "2";
      } else {
        return "25";
      }
    };

    const thirdLineCondition = () => {
      if (port4 === "C" || port3 === "C" || port2 === "C" || port1 === "C") {
        return "2";
      } else if (
        port8 === "C" ||
        port5 === "C" ||
        port6 === "C" ||
        port7 === "C"
      ) {
        return "2";
      } else if (
        port9 === "C" ||
        port10 === "C" ||
        port11 === "C" ||
        port12 === "C"
      ) {
        return "2";
      } else if (
        port13 === "C" ||
        port14 === "C" ||
        port15 === "C" ||
        port16 === "C"
      ) {
        return "2";
      } else {
        return "25";
      }
    };

    const fourthLineCondition = () => {
      if (port4 === "D" || port3 === "D" || port2 === "D" || port1 === "D") {
        return "2";
      } else if (
        port8 === "D" ||
        port5 === "D" ||
        port6 === "D" ||
        port7 === "D"
      ) {
        return "2";
      } else if (
        port9 === "D" ||
        port10 === "D" ||
        port11 === "D" ||
        port12 === "D"
      ) {
        return "2";
      } else if (
        port13 === "D" ||
        port14 === "D" ||
        port15 === "D" ||
        port16 === "D"
      ) {
        return "2";
      } else {
        return "25";
      }
    };

    const lineA1Condition = () => {
      if (portA1 === "A1") {
        return "1";
      } else {
        return "25";
      }
    };
    const lineA2Condition = () => {
      if (portA2 === "A2") {
        return "1";
      } else {
        return "25";
      }
    };
    const lineB1Condition = () => {
      if (portB1 === "B1") {
        return "7";
      } else {
        return "25";
      }
    };
    const lineB2Condition = () => {
      if (portB2 === "B2") {
        return "7";
      } else {
        return "25";
      }
    };
    const lineC1Condition = () => {
      if (portC1 === "C1") {
        return "3";
      } else {
        return "25";
      }
    };
    const lineC2Condition = () => {
      if (portC2 === "C2") {
        return "3";
      } else {
        return "25";
      }
    };
    const lineD1Condition = () => {
      if (portD1 === "D1") {
        return "4";
      } else {
        return "25";
      }
    };
    const lineD2Condition = () => {
      if (portD2 === "D2") {
        return "4";
      } else {
        return "25";
      }
    };

    const firstSpliiterDotCondition = (port) => {
      // let ports = JSON.parse(sessionStorage.getItem("assembly"));
      // let connections = ports.PortConnections;
      if (port === "A1") {
        return { x: 0, y: 255 };
      }
      if (port === "A2") {
        return { x: 85, y: 255 };
      }
      if (port === "B1") {
        return { x: 100, y: 385 };
      }
      if (port === "B2") {
        return { x: 185, y: 385 };
      }
      if (port === "C1") {
        return { x: 550, y: 25 };
      }
      if (port === "C2") {
        return { x: 600, y: 25 };
      }
      if (port === "D1") {
        return { x: 400, y: 385 };
      }
      if (port === "D2") {
        return { x: 500, y: 385 };
      } else {
        return { x: 10000, y: 25 };
      }
    };

    const firstDotCondition = () => {
      if (port4 === "A" || port3 === "A" || port2 === "A" || port1 === "A") {
        return { x: 40, y: 155 };
      } else if (
        port8 === "A" ||
        port5 === "A" ||
        port6 === "A" ||
        port7 === "A"
      ) {
        return { x: 40, y: 155 };
      } else if (
        port9 === "A" ||
        port10 === "A" ||
        port11 === "A" ||
        port12 === "A"
      ) {
        return { x: 40, y: 155 };
      } else if (
        port13 === "A" ||
        port14 === "A" ||
        port15 === "A" ||
        port16 === "A"
      ) {
        return { x: 40, y: 155 };
      } else {
        return { x: 10000, y: 25 };
      }
    };

    const secondDotCondition = () => {
      if (port4 === "B" || port3 === "B" || port2 === "B" || port1 === "B") {
        return { x: 150, y: 285 };
      } else if (
        port8 === "B" ||
        port5 === "B" ||
        port6 === "B" ||
        port7 === "B"
      ) {
        return { x: 150, y: 285 };
      } else if (
        port9 === "B" ||
        port10 === "B" ||
        port11 === "B" ||
        port12 === "B"
      ) {
        return { x: 150, y: 285 };
      } else if (
        port13 === "B" ||
        port14 === "B" ||
        port15 === "B" ||
        port16 === "B"
      ) {
        return { x: 150, y: 285 };
      } else {
        return { x: 10000, y: 25 };
      }
    };

    const thirdDotCondition = () => {
      if (port4 === "C" || port3 === "C" || port2 === "C" || port1 === "C") {
        return { x: 550, y: 25 };
      } else if (
        port8 === "C" ||
        port5 === "C" ||
        port6 === "C" ||
        port7 === "C"
      ) {
        return { x: 550, y: 25 };
      } else if (
        port9 === "C" ||
        port10 === "C" ||
        port11 === "C" ||
        port12 === "C"
      ) {
        return { x: 550, y: 25 };
      } else if (
        port13 === "C" ||
        port14 === "C" ||
        port15 === "C" ||
        port16 === "C"
      ) {
        return { x: 550, y: 25 };
      } else {
        return { x: 10000, y: 25 };
      }
    };

    const fourthDotCondition = () => {
      if (port4 === "D" || port3 === "D" || port2 === "D" || port1 === "D") {
        return { x: 450, y: 285 };
      } else if (
        port8 === "D" ||
        port5 === "D" ||
        port6 === "D" ||
        port7 === "D"
      ) {
        return { x: 450, y: 285 };
      } else if (
        port9 === "D" ||
        port10 === "D" ||
        port11 === "D" ||
        port12 === "D"
      ) {
        return { x: 450, y: 285 };
      } else if (
        port13 === "D" ||
        port14 === "D" ||
        port15 === "D" ||
        port16 === "D"
      ) {
        return { x: 450, y: 285 };
      } else {
        return { x: 10000, y: 25 };
      }
    };

    setElements([
      {
        id: "1",
        type: "input",
        data: { label: firstCondition() },
        position: firstDotCondition(),
        sourcePosition: "right",
      },

      {
        id: "7",
        type: "input",
        data: { label: secondCondition() },
        position: secondDotCondition(),
        sourcePosition: "right",
      },
      {
        id: "2",
        type: "selectorNode",
        data: { onChange: onChange },
        style: { border: "1px solid #777", padding: 10 },
        position: { x: 250, y: 50 },
      },
      {
        id: "3",
        type: "output",
        data: { label: thirdCondition() },
        position: thirdDotCondition(),
        targetPosition: "left",
      },
      {
        id: "4",
        type: "output",
        data: { label: fourthCondition() },
        position: fourthDotCondition(),
        targetPosition: "left",
      },

      {
        id: "8",
        type: "output",
        data: { label: firstSplitterCondition() },
        position: firstSpliiterDotCondition(portA1),
        sourcePosition: "left",
      },
      {
        id: "9",
        type: "output",
        data: { label: secondSplitterCondition() },
        position: firstSpliiterDotCondition(portA2),
        sourcePosition: "left",
      },
      {
        id: "10",
        type: "output",
        data: { label: firstSplitterB1Condition() },
        position: firstSpliiterDotCondition(portB1),
        sourcePosition: "left",
      },
      {
        id: "11",
        type: "output",
        data: { label: secondSplitterB2Condition() },
        position: firstSpliiterDotCondition(portB2),
        sourcePosition: "left",
      },
      {
        id: "12",
        type: "output",
        data: { label: firstC1SplitterCondition() },
        position: firstSpliiterDotCondition(portC1),
        sourcePosition: "right",
      },
      {
        id: "13",
        type: "output",
        data: { label: secondC2SplitterCondition() },
        position: firstSpliiterDotCondition(portC2),
        sourcePosition: "right",
      },
      {
        id: "14",
        type: "output",
        data: { label: firstD1SplitterCondition() },
        position: firstSpliiterDotCondition(portD1),
        sourcePosition: "right",
      },
      {
        id: "15",
        type: "output",
        data: { label: secondD2SplitterCondition() },
        position: firstSpliiterDotCondition(portD2),
        sourcePosition: "right",
      },

      {
        id: "e1-2",
        source: firstLineCondition(),
        target: "2",
        style: { stroke: "#000" },
      },
      {
        id: "e2a-3",
        source: thirdLineCondition(),
        sourceHandle: "a",
        target: "3",
        style: { stroke: "#000" },
      },
      {
        id: "e2b-4",
        source: fourthLineCondition(),
        sourceHandle: "b",
        target: "4",
        style: { stroke: "#000" },
      },
      {
        id: "e7c-5",
        source: secondLineCondition(),
        sourceHandle: "c",
        target: "7",
        style: { stroke: "#000" },
      },

      {
        id: "e1A1-8",
        source: lineA1Condition(),
        sourceHandle: "A2",
        target: "8",
        style: { stroke: "#000" },
      },
      {
        id: "e1A2-9",
        source: lineA2Condition(),
        sourceHandle: "A1",
        target: "9",
        style: { stroke: "#000" },
      },

      {
        id: "e7B1-10",
        source: lineB1Condition(),
        sourceHandle: "B2",
        target: "10",
        style: { stroke: "#000" },
      },
      {
        id: "e7B2-11",
        source: lineB2Condition(),
        sourceHandle: "B1",
        target: "11",
        style: { stroke: "#000" },
      },
      {
        id: "e3C1-12",
        source: lineC1Condition(),
        sourceHandle: "C2",
        target: "12",
        style: { stroke: "#000" },
      },
      {
        id: "e3C1-13",
        source: lineC2Condition(),
        sourceHandle: "C1",
        target: "13",
        style: { stroke: "#000" },
      },
      {
        id: "e4D1-14",
        source: lineD1Condition(),
        sourceHandle: "D2",
        target: "14",
        style: { stroke: "#000" },
      },
      {
        id: "e4D2-15",
        source: lineD2Condition(),
        sourceHandle: "D1",
        target: "15",
        style: { stroke: "#000" },
      },
    ]);
  }, []);
  // const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) =>
    setElements((els) =>
      addEdge({ ...params, animated: false, style: { stroke: "#000" } }, els)
    );

  var takingInput = (
    <Modal isOpen={model} style={customStyles} contentLabel="Example Modal">
      {/* < img onClick={this.closeModel} className="closeconceptModal" src="images/login/button_exit@2x.png"></img> */}
      <div className="connectconceptMsg">
        <h3>
          Give an input for the <span style={{ color: "red" }}>WELCOME</span>
        </h3>
        <input type="number" id="inputValue" min="0" />
        <button style={{ margin: "10px" }} onClick={closeModel}>
          Ok
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        // onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        //   style={{ background: bgColor }}
        onLoad={onLoad}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultZoom={1}
      >
        {/* {takingInput} */}
      </ReactFlow>
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  return state;
};
export default connect(mapStateToProps)(CustomNodeFlow);
