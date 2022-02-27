import React, { DragEvent, useRef, useState } from "react";
import "./dnd.css";
// import Panel1 from "../../logic/panels/";
let flag = 0;
let y;
let pro;
// var Panel = Panel1("");
const open = (event, type) => {
  // var Panel = Panel1("");
};
const Sidebar = () => {
  const [x, setX] = useState();
  const onDragStart = async (event, nodeType) => {
    // event.preventDefault();

    y = event.clientY;
    console.log(x, y, event, "sidebar===>");

    if (flag === 0) {
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    } else if (nodeType !== "start") {
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    }

    if (nodeType === "start") {
      setTimeout(function () {
        document.querySelector("#foo").classList.add("myClass");
      }, 200);
    }
  };
  const onDrag = (event, nodeType) => {
    console.log(event, "sidebar===>");
    event.dataTransfer.setData("check", "hhiGSK$$$$$$$");
    event.dataTransfer.effectAllowed = "move";
    // console.log("onDrag", event.clientX, event.clientY);
    // if (nodeType == "if") {
    // }
  };
  //  setX(y);
  console.log(x, y, "sidebar===>");

  return (
    <aside id="sidebar">
      <div className="description">
        <div
          className="dndnode_start myClass"
          value="starts"
          onDragStart={(event) => onDragStart(event, "start")}
          onDrag={(event) => onDrag(event, "start")}
          draggable
          id="foo"
        ></div>
        <div
          className="dndnode_if"
          onDragStart={(event) => onDragStart(event, "if")}
          onDrag={(event) => onDrag(event, "if")}
          draggable
        ></div>
        <div
          className="dndnode_loop"
          onDragStart={(event) => onDragStart(event, "loop")}
          draggable
        ></div>
        <div
          className="dndnode_output"
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
        ></div>
        <div
          className="dndnode_wait"
          onDragStart={(event) => onDragStart(event, "wait")}
          draggable
        ></div>
        <div
          className="dndnode_end-repeat"
          onDragStart={(event) => onDragStart(event, "end/repeat")}
          draggable
        ></div>
      </div>
    </aside>
  );
};

export default Sidebar;
