import React, { DragEvent } from "react";
import "./dnd.css";
import Panel1 from "../../logic/panels/";
let flag = 0;
const onDragStart = (event, nodeType) => {
  console.log(nodeType, flag);

  if (flag === 0) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  } else if (nodeType !== "start") {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

  if (nodeType === "start") {
    flag = 1;
    setTimeout(function () {
      document.querySelector("#foo").classList.add("myClass");
    }, 200);
  }
};
var Panel = Panel1("");
const open = (event, type) => {
  var Panel = Panel1("");
};
const Sidebar = () => {
  const open = (event, type) => {
    Panel = Panel1("end");
  };
  return (
    <aside>
      <div className="description">
        <div
          className="dndnode_start"
          value="starts"
          onDragStart={(event) => onDragStart(event, "start")}
          draggable
          disabled="disabled"
          id="foo"
        ></div>
        <div
          className="dndnode_if"
          onDragStart={(event) => onDragStart(event, "if")}
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
