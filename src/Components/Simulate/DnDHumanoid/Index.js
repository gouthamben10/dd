/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactFlow, { isEdge, addEdge, Handle } from "react-flow-renderer";
// import {IllusLoginSrc} from '../../../source/source';
import ColorSelectorNode from "./ColorSelectorNode";
import "./dnd.scss";

const onLoad = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);
const onNodeDragStop = (event, node) => console.log("drag stop", node);

const onElementClick = (event, element) => {
  console.log("click", element);
  console.log(event.target);
};

// const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [16, 16];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const CustomNodeFlowHumanoid = ({ compo, img, assembly }) => {
  // console.log(state)
  const [elements, setElements] = useState([]);
  let newArr = Object.keys(compo);
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
    portD2 = null;

  // var i = 0,y=-1;
  // var loopProgram='',loopcount=0,loop=1,ifResult=false,switchOff=false;
  var sent = "",
    touch_tack_port = "";
  let newArray = [];

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
        console.log("soumitya2 ", ind);

        var clone = [
          ...JSON.parse(sessionStorage.getItem("simulate")),
          { componentName: keys, port: ind.connectedTo },
        ];
        sessionStorage.setItem("simulate", JSON.stringify(clone));
        // alert(ind.connectedTo);
        var myImage = new Image(60, 66);
        myImage.src = `images/oldImages/component_${keys}.png`;

        console.log(myImage, "myImage1");

        myImage.setAttribute("id", `img_${ind.connectedTo}1`);
        myImage.style.position = "absolute";
        if (
          keys === "light_sensor" ||
          keys === "distance_sensor" ||
          keys === "temperature_sensor" ||
          keys === "sound_sensor" ||
          keys === "rain_sensor" ||
          keys === "gas_sensor" ||
          keys === "heartbeat_sensor" ||
          keys === "pir_sensor" ||
          keys === "bend_sensor" ||
          keys === "humidity_sensor" ||
          keys === "hall_sensor" ||
          keys === "metal_detector" ||
          keys === "ultrasonic_sensor" ||
          keys === "4_in_1_sensor"
        ) {
          //for the input component

          console.log("WELCOME>>>>");
          console.log(myImage, "image2");

          myImage.addEventListener("click", () => this.myFun(keys));
        }
        if (keys === "touch_sensor" || keys === "tact_switch") {
          myImage.addEventListener("mousedown", () => this.myFun2(keys));
          myImage.addEventListener("click", () => this.myFun(keys));
          touch_tack_port = ind.connectedTo;
        }
        if (ind.connectedTo === "A" || ind.connectedTo === "B") {
          if (keys === "dual_splitter")
            myImage.style.transform = "rotate(90deg)";
          else myImage.style.transform = "rotate(270deg)";
        } else if (ind.connectedTo === "F" || ind.connectedTo === "G") {
          myImage.style.transform = "rotate(90deg)";
        } else if (sessionStorage.getItem("connectedDevice") === "Ace") {
          if (ind.connectedTo === "C" || ind.connectedTo === "D") {
            if (keys === "dual_splitter")
              myImage.style.transform = "rotate(270deg)";
            else myImage.style.transform = "rotate(90deg)";
          }
        }
        return true;
      });
    });
  }, []);

  if (compo[newArr[1]]) {
    Object.values(compo[newArr[1]]).map((i) => {
      if (i.connectedTo === "A1") {
        return (portA1 = "A1");
      }
      if (i.connectedTo === "A2") {
        return (portA2 = "A2");
      }
      if (i.connectedTo === "B1") {
        return (portB1 = "B1");
      }
      if (i.connectedTo === "B2") {
        return (portB2 = "B2");
      }
      if (i.connectedTo === "C1") {
        return (portC1 = "C1");
      }
      if (i.connectedTo === "C2") {
        return (portC2 = "C2");
      }
      if (i.connectedTo === "D1") {
        return (portD1 = "D1");
      }
      if (i.connectedTo === "D2") {
        return (portD2 = "D2");
      }
    });
  }
  if (compo[newArr[2]]) {
    Object.values(compo[newArr[2]]).map((i) => {
      if (i.connectedTo === "A1") {
        return (portA1 = "A1");
      }
      if (i.connectedTo === "A2") {
        return (portA2 = "A2");
      }
      if (i.connectedTo === "B1") {
        return (portB1 = "B1");
      }
      if (i.connectedTo === "B2") {
        return (portB2 = "B2");
      }
      if (i.connectedTo === "C1") {
        return (portC1 = "C1");
      }
      if (i.connectedTo === "C2") {
        return (portC2 = "C2");
      }
      if (i.connectedTo === "D1") {
        return (portD1 = "D1");
      }
      if (i.connectedTo === "D2") {
        return (portD2 = "D2");
      }
    });
  }
  if (compo[newArr[3]]) {
    Object.values(compo[newArr[3]]).map((i) => {
      if (i.connectedTo === "A1") {
        return (portA1 = "A1");
      }
      if (i.connectedTo === "A2") {
        return (portA2 = "A2");
      }
      if (i.connectedTo === "B1") {
        return (portB1 = "B1");
      }
      if (i.connectedTo === "B2") {
        return (portB2 = "B2");
      }
      if (i.connectedTo === "C1") {
        return (portC1 = "C1");
      }
      if (i.connectedTo === "C2") {
        return (portC2 = "C2");
      }
      if (i.connectedTo === "D1") {
        return (portD1 = "D1");
      }
      if (i.connectedTo === "D2") {
        return (portD2 = "D2");
      }
    });
  }
  if (compo[newArr[4]]) {
    Object.values(compo[newArr[4]]).map((i) => {
      if (i.connectedTo === "A1") {
        return (portA1 = "A1");
      }
      if (i.connectedTo === "A2") {
        return (portA2 = "A2");
      }
      if (i.connectedTo === "B1") {
        return (portB1 = "B1");
      }
      if (i.connectedTo === "B2") {
        return (portB2 = "B2");
      }
      if (i.connectedTo === "C1") {
        return (portC1 = "C1");
      }
      if (i.connectedTo === "C2") {
        return (portC2 = "C2");
      }
      if (i.connectedTo === "D1") {
        return (portD1 = "D1");
      }
      if (i.connectedTo === "D2") {
        return (portD2 = "D2");
      }
      return null;
    });
  }
  if (compo[newArr[5]]) {
    Object.values(compo[newArr[5]]).map((i) => {
      if (i.connectedTo === "A1") {
        return (portA1 = "A1");
      }
      if (i.connectedTo === "A2") {
        return (portA2 = "A2");
      }
      if (i.connectedTo === "B1") {
        return (portB1 = "B1");
      }
      if (i.connectedTo === "B2") {
        return (portB2 = "B2");
      }
      if (i.connectedTo === "C1") {
        return (portC1 = "C1");
      }
      if (i.connectedTo === "C2") {
        return (portC2 = "C2");
      }
      if (i.connectedTo === "D1") {
        return (portD1 = "D1");
      }
      if (i.connectedTo === "D2") {
        return (portD2 = "D2");
      }
      return null;
    });
  }

  if (compo[newArr[0]]) {
    val = Object.keys(compo[newArr[0]]).length;
    connect = Object.values(compo[newArr[0]]);
    if (val === 1) {
      port1 = connect[0].connectedTo;
    }
    if (val === 2) {
      port1 = connect[0].connectedTo;
      port2 = connect[1].connectedTo;
      newArr[2] = newArr[0];
    }
    if (val === 3) {
      port1 = connect[0].connectedTo;
      port2 = connect[1].connectedTo;
      port3 = connect[2].connectedTo;
      newArr[2] = newArr[0];
      newArr[1] = newArr[0];
    }
    if (val === 4) {
      port1 = connect[0].connectedTo;
      port2 = connect[1].connectedTo;
      port3 = connect[2].connectedTo;
      port4 = connect[3].connectedTo;
      newArr[3] = newArr[0];
    }
  }
  if (compo[newArr[1]]) {
    val1 = Object.keys(compo[newArr[1]]).length;
    connect1 = Object.values(compo[newArr[1]]);
    if (val1 === 1) {
      port5 = connect1[0].connectedTo;
    }
    if (val1 === 2) {
      port5 = connect1[0].connectedTo;
      port6 = connect1[1].connectedTo;
      newArr[2] = newArr[1];
    }
    if (val1 === 3) {
      port5 = connect1[0].connectedTo;
      port6 = connect1[1].connectedTo;
      port7 = connect1[2].connectedTo;
    }
  }
  if (compo[newArr[2]]) {
    val2 = Object.keys(compo[newArr[2]]).length;
    connect2 = Object.values(compo[newArr[2]]);
    if (val2 === 1) {
      port9 = connect2[0].connectedTo;
    }
    if (val2 === 2) {
      port9 = connect2[0].connectedTo;
      port10 = connect2[1].connectedTo;
      newArr[3] = newArr[2];
    }
  }
  if (compo[newArr[3]]) {
    val3 = Object.keys(compo[newArr[3]]).length;
    connect3 = Object.values(compo[newArr[3]]);
    port13 = connect3[0].connectedTo;
  }
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
      // alert(port)
      return (
        <div id={arr[n]}>
          <img
            src={`/images/oldImages/component_${connections[port].type}.png`}
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
              src={`/images/oldImages/component_${newArr[n]}.png`}
              width="70"
              alt=""
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
            src={`/images/oldImages/component_${newArr[n]}.png`}
            width="70"
            alt=""
            id={`img_${port}1`}
          />
        </div>
      );
    };

    const firstCondition = () => {
      // alert(0);
      if (port4 === "A" || port3 === "A" || port2 === "A" || port1 === "A") {
        return text(0, "A");
      } else if (
        port8 === "A" ||
        port5 === "A" ||
        port6 === "A" ||
        port7 === "A"
      ) {
        return text(1, "A");
      } else if (
        port9 === "A" ||
        port10 === "A" ||
        port11 === "A" ||
        port12 === "A"
      ) {
        return text(2, "A");
      } else if (
        port13 === "A" ||
        port14 === "A" ||
        port15 === "A" ||
        port16 === "A"
      ) {
        return text(3, "A");
      }
    };

    const secondCondition = () => {
      // alert(port2);
      if (port4 === "B" || port3 === "B" || port2 === "B" || port1 === "B") {
        return text(0, "B");
      } else if (
        port8 === "B" ||
        port5 === "B" ||
        port6 === "B" ||
        port7 === "B"
      ) {
        return text(1, "B");
      } else if (
        port9 === "B" ||
        port10 === "B" ||
        port11 === "B" ||
        port12 === "B"
      ) {
        return text(2, "B");
      } else if (
        port13 === "B" ||
        port14 === "B" ||
        port15 === "B" ||
        port16 === "B"
      ) {
        return text(3, "B");
      }
    };

    const thirdCondition = () => {
      if (port4 === "C" || port3 === "C" || port2 === "C" || port1 === "C") {
        return text(0, "C");
      } else if (
        port8 === "C" ||
        port5 === "C" ||
        port6 === "C" ||
        port7 === "C"
      ) {
        return text(1, "C");
      } else if (
        port9 === "C" ||
        port10 === "C" ||
        port11 === "C" ||
        port12 === "C"
      ) {
        return text(2, "C");
      } else if (
        port13 === "C" ||
        port14 === "C" ||
        port15 === "C" ||
        port16 === "C"
      ) {
        return text(3, "C");
      }
    };

    const fourthCondition = () => {
      if (port4 === "D" || port3 === "D" || port2 === "D" || port1 === "D") {
        return text(0, "D");
      } else if (
        port8 === "D" ||
        port5 === "D" ||
        port6 === "D" ||
        port7 === "D"
      ) {
        return text(1, "D");
      } else if (
        port9 === "D" ||
        port10 === "D" ||
        port11 === "D" ||
        port12 === "D"
      ) {
        return text(2, "D");
      } else if (
        port13 === "D" ||
        port14 === "D" ||
        port15 === "D" ||
        port16 === "D"
      ) {
        return text(3, "D");
      }
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
        return { x: 80, y: 255 };
      }
      if (port === "A2") {
        return { x: 165, y: 255 };
      }
      if (port === "B1") {
        return { x: 100, y: 385 };
      }
      if (port === "B2") {
        return { x: 185, y: 385 };
      }
      if (port === "C1") {
        return { x: 500, y: 155 };
      }
      if (port === "C2") {
        return { x: 600, y: 155 };
      }
      if (port === "D1") {
        return { x: 500, y: 385 };
      }
      if (port === "D2") {
        return { x: 600, y: 385 };
      } else {
        return { x: 10000, y: 25 };
      }
    };

    const firstDotCondition = () => {
      if (port4 === "A" || port3 === "A" || port2 === "A" || port1 === "A") {
        return { x: 150, y: 175 };
      } else if (
        port8 === "A" ||
        port5 === "A" ||
        port6 === "A" ||
        port7 === "A"
      ) {
        return { x: 150, y: 175 };
      } else if (
        port9 === "A" ||
        port10 === "A" ||
        port11 === "A" ||
        port12 === "A"
      ) {
        return { x: 150, y: 175 };
      } else if (
        port13 === "A" ||
        port14 === "A" ||
        port15 === "A" ||
        port16 === "A"
      ) {
        return { x: 150, y: 175 };
      } else {
        return { x: 10000, y: 25 };
      }
    };

    const secondDotCondition = () => {
      if (port4 === "B" || port3 === "B" || port2 === "B" || port1 === "B") {
        return { x: 200, y: 305 };
      } else if (
        port8 === "B" ||
        port5 === "B" ||
        port6 === "B" ||
        port7 === "B"
      ) {
        return { x: 200, y: 305 };
      } else if (
        port9 === "B" ||
        port10 === "B" ||
        port11 === "B" ||
        port12 === "B"
      ) {
        return { x: 200, y: 305 };
      } else if (
        port13 === "B" ||
        port14 === "B" ||
        port15 === "B" ||
        port16 === "B"
      ) {
        return { x: 200, y: 305 };
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
        return { x: 550, y: 285 };
      } else if (
        port8 === "D" ||
        port5 === "D" ||
        port6 === "D" ||
        port7 === "D"
      ) {
        return { x: 550, y: 285 };
      } else if (
        port9 === "D" ||
        port10 === "D" ||
        port11 === "D" ||
        port12 === "D"
      ) {
        return { x: 550, y: 285 };
      } else if (
        port13 === "D" ||
        port14 === "D" ||
        port15 === "D" ||
        port16 === "D"
      ) {
        return { x: 550, y: 285 };
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

  return (
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
      {/* <Controls /> */}
    </ReactFlow>
  );
};
const mapStateToProps = (state, ownProps) => {
  return state;
};
export default connect(mapStateToProps)(CustomNodeFlowHumanoid);
