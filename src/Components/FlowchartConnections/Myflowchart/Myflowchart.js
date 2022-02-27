import React, { useState, DragEvent } from "react";
import Popup from "./Popup";
import "./myflowchart.css";
import Panel1 from "../logic/pannel/";
import { Button, Modal } from "react-bootstrap";
import { v4 } from "uuid";

import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

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

import Sidebar from "./Sidebar";

import "./dnd.css";
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
const initialElements = [];

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

let id = 0;
const getId = () => `${id++}`;
var Panel = Panel1("");
const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [showPopup, setShowPopUp] = useState(false);
  const [elements, setElements] = useState(initialElements);

  const onConnect = async (params) => {
    console.log("connect called", params.source, params.sourceHandle);
    var index1 = await elements.findIndex(
      (e) =>
        e.source === params.source && e.sourceHandle === params.sourceHandle
    );
    var index2 = await elements.findIndex(
      (e) =>
        e.target === params.target && e.targetHandle === params.targetHandle
    );
    if (index1 == -1 && index2 == -1)
      setElements((elements) => addEdge(params, elements));
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const flag = 0;
  const onDrop = async (event) => {
    console.log("event", event);
    event.preventDefault();
    const text = (type, _id) => {
      if (type == "start") {
        console.log("start");
        var urlSuffix = "/images/flowcharts/learn_flow_start.png";
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + urlSuffix})`,
                bottom: "38px",
              }}
              id="image-render"
              key={v4()}
            ></div>
          </>
        );
      }
      if (type == "if") {
        console.log("if");
        var urlSuffix = "/images/flowcharts/learn_flow_if.png";
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + urlSuffix})`,
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
            <Handle position="right" style={{ left: 140, top: 10 }} id="rYes" />
            <Handle
              type="source"
              position="right"
              style={{ left: 140, top: 30 }}
              id="rNo"
            />
          </>
        );
      }
      if (type == "wait") {
        var urlSuffix = "/images/flowcharts/learn_flow_wait.png";
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + urlSuffix})`,
              }}
              id="image-render"
              key={v4()}
            ></div>
            <Handle position="bottom" style={{ left: 90, top: 35 }} id="b" />
          </>
        );
      }
      if (type == "output") {
        var urlSuffix = "/images/flowcharts/learn_flow_output.png";
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + urlSuffix})`,
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
        var urlSuffix = "/images/flowcharts/learn_flow_loop.png";
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + urlSuffix})`,
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
        var urlSuffix = "/images/flowcharts/learn_flow_end-repeat.png";
        return (
          <>
            <div
              className="Image-render"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + urlSuffix})`,
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
        x: event.clientX,
        y: event.clientY - 40,
      });
      var nodeType;
      if (type == "start") nodeType = "input";
      else if (type == "end/repeat") nodeType = "output";
      else nodeType = "output";
      console.log("node type", nodeType);
      const newNode = {
        id: getId(),
        position,
        type: `${nodeType}`,
        data: {
          label: text(`${type}`, id),
          elType: "node",
          specificElType: `${type}`,
        },
      };
      await setElements([...elements, newNode]);
      console.log("Elements", elements);
    }
  };

  const onNodeDrag = async (event, node) => {
    event.preventDefault();
    console.log("position x and y", node.position.x, node.position.y);
    if (node.position.x >= 1135) {
      var index = await elements.findIndex((e) => e.id === node.id);
      if (index != -1) {
        setElements(
          elements.filter(
            (e) =>
              e.id !== node.id && e.source !== node.id && e.target != node.id
          )
        );
      }
    }
    console.log(elements, "elements");
  };

  var toDeleteEdge = null;
  var selectedNode = null;

  const onSelectionChange = async (node) => {
    console.log("selected", node);
  };
  let modalType;
  const onElementClick = (event, element) => {
    modalType = element.data.specificElType;
    console.log("element clicked", element);
    if (element.data) {
      //if node
      selectedNode = element.id;
      console.log("selected node", selectedNode);
    }
    //if edge
    else {
      toDeleteEdge = element.id;
      console.log("to delete edge", toDeleteEdge);
    }
  };

  const onDoubleClick = (event, element) => {
    console.log("double clicked==>");

    console.log(modalType);
    if (modalType === "end/repeat") {
      Panel = Panel1("end");
      handleShow();
      return;
    } else if (modalType === "wait") {
      Panel = Panel1("wait");
      handleShow();
    } else if (modalType === "if") {
      Panel = Panel1("condition");
      handleShow();
    }
  };

  async function togglePopup() {
    console.log("toggled");
    console.log(showPopup);
    await setShowPopUp(!showPopup);
    console.log(showPopup);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
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
            style={{ height: 1400, width: 1200 }}
          >
            <Controls />
          </ReactFlow>
          {showPopup ? <Popup /> : null}
        </div>
        <Sidebar />
      </ReactFlowProvider>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Panel
            value={{ ms: 0, s: 0, m: 0, h: 16 }}
            state={{ h: 0, m: 0, ms: 0, s: 0 }}
            onChange={() => {
              console.log("hello===>");
            }}
            current={"sensor"}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DnDFlow;
