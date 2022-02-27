import React, { useState, DragEvent, useLayoutEffect, useEffect } from "react";
import Popup from "./Popup";
import "./myflowchart.css";
import Panel1 from "../logic/pannel/";
import { Button, Modal } from "react-bootstrap";
import { v4 } from "uuid";
import CustomDragLayer from "../logic/connection/CustomDragLayer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import closeImg from "../../../../Assets/img/close.png";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  ElementId,
  Node,
  Handle,
} from "react-flow-renderer";

import start from "../../../../Assets/flowchart/start.png";
import fxvariable from "../../../../Assets/flowchart/hardware.png";
import wait from "../../../../Assets/flowchart/wait.png";
import condition2 from "../../../../Assets/flowchart/condition2.png";
import loop from "../../../../Assets/flowchart/loop.png";
import repeat from "../../../../Assets/flowchart/repeat.png";
import end from "../../../../Assets/flowchart/stopButton.png";
import Sidebar from "./Sidebar";
import { useLocalStorage } from "../../../LocalStorage/LocalStorage";
import "./dnd.css";
import "../../style.css";

import { element, elementType } from "prop-types";
const Sizes = {
  Button: 30,
  Border: 5,
  OneRow: 68,
};
const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "25%",
    width: " 30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "5px solid #FF8C19",
    borderRadius: "15px",
    zIndex: "10000",
  },
};

let initialElements = [
  {
    id: "0",
    type: "output",
    data: {
      label: "<Fragment />",
      elType: "node",
      specificElType: "if",
    },
    xPos: 546,
    yPos: 174,
    isDragging: false,
    isInitialized: true,
    snapGrid: [15, 15],
    snapToGrid: false,
    selectNodesOnDrag: true,
    onClick: "ƒ onElementClick() {}",
    onNodeDrag: "ƒ onNodeDrag() {}",
    scale: 1,
    selected: true,
    isDraggable: true,
    isSelectable: true,
    isConnectable: true,
    resizeObserver: {
      disconnect: "ƒ disconnect() {}",
      observe: "ƒ observe() {}",
      unobserve: "ƒ unobserve() {}",
    },
  },
];
let d = "M 120 450 l 170 -100";
let modal;
const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};
let flagPos = 0;
let id = 1;
let eid = 0;
const getId = () => `${id++}`;
const getEid = () => `${eid++}`;
var Panel = Panel1("");
const text = (type, _id) => {
  if (type == "start") {
    // console.log("start");

    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${start})`,
            bottom: "38px",
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "if") {
    // console.log("if");
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${condition2})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="source"
          position="bottom"
          style={{ left: 90, top: 35 }}
          id="b"
        />
        <Handle position="left" style={{ left: 140, top: 10 }} id="rYes" />
        <Handle
          type="source"
          position="left"
          style={{ left: 140, top: 30 }}
          id="rNo"
        />
      </>
    );
  }
  if (type == "wait") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${wait})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle position="bottom" style={{ left: 90, top: 35 }} id="b" />
      </>
    );
  }
  if (type == "output") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${fxvariable})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="source"
          position="bottom"
          style={{ left: 90, top: 35 }}
          id="b"
        />
      </>
    );
  }
  if (type == "loop") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${loop})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
        <Handle
          type="source"
          position="bottom"
          style={{ left: 90, top: 35 }}
          id="b"
        />
        <Handle
          type="source"
          position="right"
          style={{ left: 140, top: 20 }}
          id="r"
        />
      </>
    );
  }
  if (type == "end/repeat") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${repeat})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
  if (type == "end") {
    return (
      <>
        <div
          className="Image-render"
          style={{
            backgroundImage: `url(${end})`,
          }}
          id="image-render"
          key={v4()}
        ></div>
      </>
    );
  }
};
let prevElement = [
  {
    id: "0",
    type: "input", // input node
    data: { label: "Input Node", specificElType: "start" },

    id: "0",

    position: { x: 500, y: 65 },
    type: `input`,
    data: {
      label: text(`start`, 0),
      elType: "node",
      specificElType: `start`,
    },
  },
];
let prevReactFlowInstance = null;
let x = [];
let y = [];
let dictX = {};
let dictY = {};
var head; // head of list
let ele;
/* Node Class */
class LinkedNode {
  // Constructor to create a new node
  constructor(d) {
    this.data = d;
    this.next = null;
  }
}

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [x1Pos, setx1Pos] = useState();
  const [y1Pos, sety1Pos] = useState();
  const [x2Pos, setx2Pos] = useState();
  const [y2Pos, sety2Pos] = useState();
  const [passEnd, setPassEnd] = useState();
  const [showPopup, setShowPopUp] = useState(false);
  const [data, setData] = useLocalStorage("element_data");
  const [elements, setElements] = useState(prevElement);

  function click(x, y) {
    var ev = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: x,
      screenY: y,
    });

    var el = document.elementFromPoint(x, y);

    el.dispatchEvent(ev);
  }
  //linked list add node at the end
  function append(new_data) {
    /* 1. Allocate the Node &
         2. Put in the data
         3. Set next as null */
    var new_node = new LinkedNode(new_data);

    /* 4. If the Linked List is empty, then make the
             new node as head */
    if (head == null) {
      head = new LinkedNode(new_data);
      return;
    }

    /* 4. This new node is going to be the last node, so
           make next of it as null */
    new_node.next = null;

    /* 5. Else traverse till the last node */
    var last = head;
    while (last.next != null) last = last.next;

    /* 6. Change the next of last node */
    last.next = new_node;
    return;
  }
  //linked list traversal
  function printList() {
    var n = head;
    while (n != null) {
      document.write(n.data + " ");
      n = n.next;
    }
  }
  //end
  useLayoutEffect(() => {
    return () => {
      // console.log("unmounting-", typeof elements, elements);

      // setData(elements);
      // console.log("=====>=====>@@@###@@@@@===>", data);
      // let prev = [];
      // data.map((el) => {
      //   let pre = {
      //     id: el.id,
      //     type: el.type, // input node
      //     data: {
      //       label: text(el.data.specificElType, el.id),
      //       elType: el.data.elType,
      //       specificElType: el.data.specificElType,
      //     },
      //   };
      //   // prevElement.push(pre);
      //   //prev += pre;
      // });
      // console.log("+++==>", prev);

      prevElement = elements;
      // console.log(JSON.parse(sessionStorage.getItem("element_data")));
      // console.log("unmounting-", prevElement);
      // console.log(
      //   JSON.parse(sessionStorage.getItem("element_data")) ==
      //     JSON.stringify(prevElement)
      // );

      prevReactFlowInstance = reactFlowInstance;
    };
  });
  useEffect(() => {
    console.log("rerendering!!!!!");
  });
  const onConnect = async (params) => {
    // console.log("connect called", params.source, params.sourceHandle);
    console.log(params);
    var index1 = await elements.findIndex(
      (e) =>
        e.source === params.source && e.sourceHandle === params.sourceHandle
    );
    var index2 = await elements.findIndex(
      (e) =>
        e.target === params.target && e.targetHandle === params.targetHandle
    );
    console.log("&", params.target, params.source);
    if (index1 == -1 && index2 == -1 && params.target != params.source){
      setElements((elements) => addEdge(params, elements));
      click(260, 200);
    }
  };
  function search(arr, n, x, not) {
    let i;
    console.log(arr, "arr=>>>=>>===>");
    for (i = 0; i < n; i++) {
      console.log(arr[i], "arr=>>>=>>===>");
      if (arr[i] + 10 >= x && arr[i] - 10 <= x && i != not) return i;
    }
    return -1;
  }
  const dictSearch = (dict, x, not) => {
    for (var key in dict) {
      if (dict[key] + 10 >= x && dict[key] - 10 <= x && key != not) return key;
    }
    return -1;
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const flag = 0;
  const handler = async (e, chk) => {
    if (chk == "end") {
      const text = (type, _id) => {
        if (type == "end") {
          return (
            <>
              <div
                className="Image-render"
                style={{
                  backgroundImage: `url(${end})`,
                }}
                id="image-render"
                key={_id}
              ></div>
            </>
          );
        }
      };

      await setElements((els) =>
        els.map((el) => {
          if (el.id === `${e}`) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            console.log("@@done");
            el.data.specificElType = "end";

            el.data.label = text(`end`, e);
          }

          return el;
        })
      );
    } else {
      const text = (type, _id) => {
        if (type == "end/repeat") {
          return (
            <>
              <div
                className="Image-render"
                style={{
                  backgroundImage: `url(${repeat})`,
                }}
                id="image-render"
                key={_id}
              ></div>
            </>
          );
        }
      };

      await setElements((els) =>
        els.map((el) => {
          if (el.id === `${e}`) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            console.log("@@done");
            el.data.specificElType = "end/repeat";

            el.data.label = text(`end/repeat`, e);
          }

          return el;
        })
      );
    }

    // onDoubleClick();
    // onElementClick("hi", elements[0]);
  };
  const onDrop = async (event) => {
    // console.log("event", event);
    event.preventDefault();

    const text = (type, _id) => {
      if (type == "start") {
        // console.log("start");

        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${start})`,
                bottom: "38px",
              }}
              id="image-render"
              key={v4()}
            ></div>
          </>
        );
      }
      if (type == "if") {
        // console.log("if");
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${condition2})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle
              type="source"
              position="bottom"
              style={{ left: 90, top: 35 }}
              id="b"
            />
            <Handle position="left" style={{ left: 140, top: 10 }} id="rYes" />
            <Handle
              type="source"
              position="left"
              style={{ left: 140, top: 30 }}
              id="rNo"
            />
          </>
        );
      }
      if (type == "wait") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${wait})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle position="bottom" style={{ left: 90, top: 35 }} id="b" />
          </>
        );
      }
      if (type == "output") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${fxvariable})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle
              type="source"
              position="bottom"
              style={{ left: 90, top: 35 }}
              id="b"
            />
          </>
        );
      }
      if (type == "loop") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${loop})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle
              type="source"
              position="bottom"
              style={{ left: 90, top: 35 }}
              id="b"
            />
            <Handle
              type="source"
              position="right"
              style={{ left: 140, top: 20 }}
              id="r"
            />
          </>
        );
      }
      if (type == "end/repeat") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${repeat})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
          </>
        );
      }
      if (type == "end") {
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${end})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
          </>
        );
      }
    };
    if (reactFlowInstance) {
      const type = event.dataTransfer.getData("application/reactflow");

      const position = reactFlowInstance.project({
        x: event.clientX - 230,
        y: event.clientY - 80,
      });
      const connected = false;
      var nodeType;
      if (type == "start") nodeType = "input";
      else if (type == "end/repeat") nodeType = "output";
      else nodeType = "output";
      // console.log("node type", nodeType);
      let newNode;
      if (type == "if") {
        newNode = {
          id: `${getId()}`,

          position,
          type: `${nodeType}`,
          data: {
            label: text(`${type}`, id),
            elType: "node",
            specificElType: `${type}`,
            connected,
            edgeCount: 0,
            edgeOne: false,
            edgeTwo: false,
            edgeThree: false,
          },
        };
      } else {
        newNode = {
          id: `${getId()}`,

          position,
          type: `${nodeType}`,
          data: {
            label: text(`${type}`, id),
            elType: "node",
            specificElType: `${type}`,
            connected,
            edgeCount: 0,
          },
        };
      }

      await setElements([...elements, newNode]);
      console.log("node:===>postion===>", newNode.position);
      // if (newNode.id === "0") {
      //   setx1Pos(newNode.position.x);
      //   sety1Pos(newNode.position.y);
      // } else {
      // setx2Pos(newNode.position.x);
      // sety2Pos(newNode.position.y);
      // }
      dictX[newNode.id] = newNode.position.x;
      dictY[newNode.id] = newNode.position.y;
      x[newNode.id] = newNode.position.x;
      y[newNode.id] = newNode.position.y;
      // let resultx = search(x, x.length - 1, event.clientX);
      // let resulty = search(y, y.length - 1, event.clientY - 40);
      // console.log(resultx, resulty);
      // let curPos;
      // if (resultx != -1 && resulty != -1) {
      //   setx1Pos(event.clientX);
      //   sety1Pos(event.clientY - 40);
      //   curPos = resultx;
      // }
      // console.log("elemnt", await elements);
      // console.log("node:", newNode);
    }
  };
  function getKeyByValue(object, value) {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop] === value) return prop;
      }
    }
  }

  const onNodeDrag = async (event, node) => {
    event.preventDefault();
    console.log("@", elements, event.clientX, event.clientY);

    // console.log("@", dictX, dictY);

    // dictX[node.id] = node.position.x;
    // dictY[node.id] = node.position.y;

    // let ele = elements.map((ele) => {
    //   if (ele.id != node.id && ele.id.search("react") == -1) {
    //     if (
    //       ele.position.x + 10 >= node.position.x &&
    //       ele.position.x - 10 <= node.position.x &&
    //       ele.position.y + 10 >= node.position.y &&
    //       ele.position.y - 10 <= node.position.y
    //     ) {
    //       return ele;
    //     }
    //   }
    // });
    // console.log("@", ele);
    // ele = [];
    // for (let i = 0; i < Object.keys(elements).length; i++) {
    //   if (elements[i].id != node.id && elements[i].id.search("react") == -1) {
    //     if (
    //       elements[i].position.x + 10 >= node.position.x &&
    //       elements[i].position.x - 10 <= node.position.x &&
    //       elements[i].position.y + 10 >= node.position.y &&
    //       elements[i].position.y - 10 <= node.position.y
    //     ) {
    //       ele = i;
    //       console.log("@@", i);
    //       break;
    //     }
    //   }
    // }

    // if (ele != null) {
    //   console.log("@", ele);
    //   let sourceHandle = "b";

    //   // if (elements[ele].data.specificElType == "loop") {
    //   //   if (elements[ele].position.x >= node.position.x) sourceHandle = "r";
    //   //   else sourceHandle = "b";
    //   // } else if (elements[ele].data.specificElType == "if") {
    //   //   if (
    //   //     elements[ele].position.x >= node.position.x &&
    //   //     elements[ele].position.y <= node.position.y
    //   //   )
    //   //     sourceHandle = "rYes";
    //   //   else if (
    //   //     elements[ele].position.x >= node.position.x &&
    //   //     elements[ele].position.y >= node.position.y
    //   //   )
    //   //     sourceHandle = "rNo";
    //   //   else sourceHandle = "b";
    //   // }
    //   // console.log("@", elements, node.id, elements[ele], sourceHandle);

    //   // let connect = {
    //   //   source: `${ele}`,
    //   //   sourceHandle: sourceHandle,
    //   //   target: `${node.id}`,
    //   //   targetHandle: null,
    //   // };
    //   // onConnect(connect);
    // }

    // gsk code 14/2/22 remove array mismatch error but used connect to connect once
    // x[node.id] = node.position.x;
    // y[node.id] = node.position.y;

    // let posX = dictSearch(x, node.position.x, node.id);
    // let posY = dictSearch(y, node.position.y, node.id);
    // if (posX == posY && posX != -1 && posY != -1) {
    //   let sourceHandle;

    //   if (elements[posX].data.specificElType == "loop") {
    //     if (x[posX] >= node.position.x) sourceHandle = "r";
    //     else sourceHandle = "b";
    //   } else if (elements[posX].data.specificElType == "if") {
    //     if (x[posX] >= node.position.x && y[posY] <= node.position.y)
    //       sourceHandle = "rYes";
    //     else if (x[posX] >= node.position.x && y[posY] >= node.position.y)
    //       sourceHandle = "rNo";
    //     else sourceHandle = "b";
    //   }
    //   console.log("@", elements, node.id, posX, sourceHandle);

    //   let connect = {
    //     source: `${posX}`,
    //     sourceHandle: sourceHandle,
    //     target: `${node.id}`,
    //     targetHandle: null,
    //   };
    //   onConnect(connect);
    // }
    //gsk 14/02/22 end
    // console.log(elements, Object.keys(elements).length);
    // let indexE = 0;
    // elements.map((ele) => {
    //   if (node.id == ele.id) return;
    //   indexE++;
    // });
    // console.log("@@@@@@@@@@=======>@@@@@@@====>", parseInt(node.id) + eid);
    // x[parseInt(node.id) + eid] = node.position.x;
    // y[parseInt(node.id) + eid] = node.position.y;
    // console.log("position x and y", x, y, "node =>", node.id, elements, node);
    //gsk update code with remove error
    // let posX = search(x, x.length, node.position.x, node.id);
    // let posY = search(y, y.length, node.position.y, node.id);
    // if (posX == posY && posX != -1 && posY != -1) {
    //   console.log(
    //     "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    //     node.id,
    //     posX,
    //     elements[posX].data.specificElType,
    //     elements[posX].data.edgeCount
    //   );
    //   //10/2/2022
    //   if (elements[posX].data.specificElType == "start") {
    //     if (elements[posX].data.edgeCount == 1) return;
    //   } else if (elements[posX].data.specificElType == "if") {
    //     if (elements[posX].data.edgeCount == 3) return;
    //   } else if (elements[posX].data.specificElType == "loop") {
    //     if (elements[posX].data.edgeCount == 2) return;
    //   } else if (elements[posX].data.specificElType == "wait") {
    //     if (elements[posX].data.edgeCount == 1) return;
    //   } else if (elements[posX].data.specificElType == "output") {
    //     if (elements[posX].data.edgeCount == 1) return;
    //   }

    //   let id = parseInt(node.id) + 1;
    //   let source_handle = "rYes";
    //   if (elements[posX].data.specificElType == "if") {
    //     if (elements[posX].data.edgeCount == 0) source_handle = "rYes";
    //     else if (elements[posX].data.edgeCount == 1) source_handle = "rNo";
    //     else if (elements[posX].data.edgeCount == 2) source_handle = "b";
    //   } else if (elements[posX].data.specificElType == "loop") {
    //     if (elements[posX].data.edgeCount == 0) source_handle = "r";
    //     else if (elements[posX].data.edgeCount == 1) source_handle = "b";
    //   }

    //   let flag = 0;
    //   elements.map((ele) => {
    //     if (ele.id == `e${id}`) flag = 1;
    //   });
    //   if (flag == 1) return;
    //   setElements((elements) =>
    //     addEdge(
    //       {
    //         // id: `${id}`,
    //         // type: "source",

    //         id: `e${id}`,
    //         source: `${posX}`,
    //         target: `${node.id}`,
    //         type: "source",
    //         sourceHandle: source_handle,
    //       },
    //       elements
    //     )
    //   );
    //   console.log("edge added=====>@@@@@", source_handle);
    //   append(posX);
    //   append(node.id);
    //   if (dict[posX] == node.id) return;
    //   dict[posX] = node.id;
    //   dict[node.id] = posX;
    //   elements[posX].data.edgeCount++;
    //   return;
    // }
    //gsk update code end
    //gsk older connect code
    // if (dict[node.id] != null) node.data.connected = true;
    // if (!node.data.connected) {
    //   let posX = search(x, x.length, node.position.x, node.id);
    //   let posY = search(y, y.length, node.position.y, node.id);
    //   if (posX == posY && posX != -1 && posY != -1) {
    //     console.log(
    //       "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    //       node.id,
    //       posX
    //     );
    //     // if (elements[posX].data.connected == true) return;
    //     dict[posX] = node.id;
    //     dict[node.id] = posX;
    //     node.data.connected = true;

    //     elements.map((el) => {
    //       if (el.id === `${posX}`) {
    //         el.data.connected = true;
    //       }
    //     });

    //     setElements((elements) =>
    //       addEdge(
    //         {
    //           id: `e${node.id}`,
    //           type: "source",

    //           source: `${posX}`,
    //           target: `${node.id}`,

    //           sourceHandle: "b",
    //           position: "right",
    //         },
    //         elements
    //       )
    //     );
    //   }

    //   console.log(posX, posY, node.connected, node);

    //   // node.connected = true;
    // }

    flagPos++;
    if (event.clientX <= 80) {
      var index = await elements.findIndex((e) => e.id === node.id);
      if (index != -1) {
        setElements(
          elements.filter(
            (e) =>
              e.id !== node.id && e.source !== node.id && e.target != node.id
          )
        );
        if (elements[index].type == "input") {
          setTimeout(function () {
            document.querySelector("#foo").classList.remove("myClass");
          }, 200);
        }
      }

      // let elementNew = [];

      // for (let i = 0; i < Object.keys(elements).length; i++) {
      //   if (elements[i].id.search("react") == -1) {
      //     elementNew[elements[i].id] = elements[i];
      //     x[i] = elements[i].position.x;
      //     y[i] = elements[i].position.y;
      //   }
      // }
      // console.log("@@@@", elementNew);
      // setElements(elementNew, []);
      // // for (let i = 0, j = 0; i < Object.keys(elements).length; i++) {
      // //   if (elements[i].id.search("react") != -1) {
      // //     elementNew[Object.keys(elements).length - 1 + j] = elements[i];
      // //     j++;
      // //   }
      // // }
      // setElements(elementNew, []);
      // var index = await elements.findIndex((e) => e.id === node.id);
      // if (index != -1) {
      //   setElements(
      //     elements.filter(
      //       (e) =>
      //         e.id !== node.id && e.source !== node.id && e.target != node.id
      //     )
      //   );
      // }

      // console.log("@@@", elements);
      // // elements[dict[node.id]].data.edgeCount--;
      // // printList();
      // // console.log(elements[dict[node.id]], "elements");
      // // dict[dict[node.id]] = -1;
      // // dict[node.id] = -1;
    }
  };

  const onNodeDragStop = async (event, node) => {
    await setElements((els) =>
      els.map((el) => {
        if (el.id === `${node.id}`) {
          el.position.x = node.position.x;
          el.position.y = node.position.y;
        }
        return el;
      })
    );
  };

  var toDeleteEdge = null;
  var selectedNode = null;

  const onSelectionChange = async (node) => {
    // console.log("selected", node);
  };
  let modalType;

  const onElementClick = async (event, element) => {
    if (element.id.search("react") != -1) {
      toDeleteEdge = element.id;
      await setElements((elements) =>
        addEdge(
          {
            id: `${element.id}`,
            type: "source",

            style: { stroke: "red" },
            source: `${element.source}`,
            target: `${element.target}`,

            sourceHandle: `${element.sourceHandle}`,
            targetHandle: `${element.targetHandle}`,
          },
          elements
        )
      );
      console.log("to delete edge", toDeleteEdge);
      return;
    }
    modalType = element.data.specificElType;
    modal = element.id;
    console.log("element clicked", element);
    if (element.data) {
      //if node
      selectedNode = element.id;
      // console.log("selected node", selectedNode);
    }
    //if edge
    else {
      toDeleteEdge = element.id;
      console.log("to delete edge", toDeleteEdge);
    }
    return element.id;
  };

  const onDoubleClick = async (event, element) => {
    console.log("double clicked==>", modal);
    console.log(modalType);
    if (modalType === "end/repeat") {
      Panel = Panel1("end");
      handleShow();
      setPassEnd(modal);
    } else if (modalType === "wait") {
      Panel = Panel1("wait");
      handleShow();
    } else if (modalType === "if") {
      Panel = Panel1("condition");
      handleShow();
    } else if (modalType === "loop") {
      Panel = Panel1("loop");
      handleShow();
    } else if (modalType === "output") {
      Panel = Panel1("output");
      handleShow();
    } else if (modalType === "end") {
      Panel = Panel1("end");
      handleShow();
    }

    var index = await elements.findIndex((e) => e.id === toDeleteEdge);
    if (index != -1) {
      //edge is double clicked
      setElements(elements.filter((node) => node.id !== toDeleteEdge));
      toDeleteEdge = null;
      console.log(toDeleteEdge);
    }
  };

  async function togglePopup() {
    // console.log("toggled");
    // console.log(showPopup);
    await setShowPopUp(!showPopup);
    // console.log(showPopup);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      console.log("clicked==>");
      // eventFire(document.getElementById("image-render"), "click");
      click(260, 200);
    }, 0);
  };
  const handleShow = () => setShow(true);
  // console.log(elements, "=====>======>element=====>");
  let resetX = 0,
    resetY = 0;
  // const getData = async () => {
  //   let x = 0,
  //     y = 40;
  //   let position = reactFlowInstance.project({
  //     x: x,
  //     y: y,
  //   });
  //   await setElements((els) =>
  //     els.map((el) => {
  //       if (el.id.search("react") == -1) {
  //         if (el.type === "input") {
  //           // it's important that you create a new object here
  //           // in order to notify react flow about the change
  //           console.log("@@done");
  //           el.position = position;
  //         }
  //       }
  //       return el;
  //     })
  //   );
  //   for (var key in elements) {
  //     console.log("@@@##", elements[key].id.search("react"));

  //     if (
  //       elements[key].id.search("react") === -1 &&
  //       elements[key].type == "output"
  //     ) {
  //       console.log("@", elements[key]);
  //       await setElements((els) =>
  //         els.map((el) => {
  //           console.log("@@@#", elements[key]);
  //           if (el.id == elements[key].id) el.position = position;
  //           return el;
  //         })
  //       );
  //       y = y + 50;
  //       position = reactFlowInstance.project({
  //         x: x,
  //         y: y,
  //       });
  //       console.log("@end", position);
  //     }
  //   }
  //   console.log("@", elements);
  //   // for (var key in elements) {
  //   //   if (elements[key].id.search("react") == -1) {
  //   //     if (elements[key].type == "input") {
  //   //       elements[key].position.x = resetX;
  //   //       elements[key].position.y = resetY;
  //   //       console.log("@");
  //   //     }
  //   //   }
  //   // }
  //   handler(1);
  // };

  return (
    <div className="dndflow">
      {console.log(x, y, "===>array>")}
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onSelectionChange={onSelectionChange}
            onDoubleClick={onDoubleClick}
            onElementClick={onElementClick}
            onDragOver={onDragOver}
            zoomOnDoubleClick={false}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            className="react-flow-screen"
            // style={{ height: 750, width: "inherit" }}
            id="reactFlow"
          >
         {/*    <Controls /> */}
            {/* <Popup
              x1Pos={x2Pos}
              y1Pos={y2Pos}
              x2Pos={592}
              y2Pos={286}
              onNodeDrag={onNodeDrag}
              className="canvas"
            /> */}

            {/* <svg width="1200" height="550">
              <path
                id="lineAB"
                d={"M " + (x2Pos + 90) + " " + (y2Pos + 10) + " l 150 -300"}
                stroke="red"
                stroke-width="3"
                fill="none"
              />
            </svg> */}
          </ReactFlow>
          {showPopup ? <Popup /> : null}
        </div>
      </ReactFlowProvider>
      <Modal show={show} onHide={handleClose}>
        <img
          className="panelcloseImg"
          onClick={handleClose}
          src={closeImg}
          alt="close"
          style={{
            position: "relative",
            height: "60px",
            width: "60px",
            top: "125px",
            zIndex: "1",
            left: "215%",
            cursor: "pointer",
          }}
        />
        <Modal.Body>
          <Panel
            value={{ ms: 0, s: 0, m: 0, h: 16 }}
            state={{ h: 0, m: 0, ms: 0, s: 0 }}
            check={modal}
            onChange={() => {
              console.log("hello===>");
            }}
            current={"sensor"}
            handler={handler}
            passEnd={passEnd}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DnDFlow;
