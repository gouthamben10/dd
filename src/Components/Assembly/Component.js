/**
 * This module exports a draggable Component which is drawn in Workspace
 * @module components/assembly/Component
 */

import React, { Component } from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";
import ImageSizes from "./ImageSizes";
import DraggingInfo from "./DraggingInfo";
import { getEmptyImage } from "react-dnd-html5-backend";

var clickStartTimestamp = undefined; // Posible as only one component can be clicked at a particular time

const style = {
  position: "absolute",
  cursor: "move",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  zIndex: 2,
};

const componentSource = {
  beginDrag(props) {
    DraggingInfo.isDragging = true;
    const { type, index, left, top, connectedTo } = props;
    sessionStorage.setItem("dragingItem", props.type);
    props.removeConnection({ type, index });
    DraggingInfo.newComponentPort = connectedTo;
    DraggingInfo.draggingComponentOld = { type, index };
    return { type, index, left, top, connectedTo };
  },
  endDrag() {
    clickStartTimestamp = undefined;
    DraggingInfo.isDragging = false;
    DraggingInfo.draggingComponentOld = null;
    DraggingInfo.newComponentPort = null;
  },
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}
// var Component = React.createClass({
class Component1 extends Component {
  constructor(props) {
    super(props);
    // this.removeComponent = this.removeComponent.bind(this);
    // () => this.typeCheck(this) = () => this.typeCheck(this)(this)
  }

  componentDidMount = () => {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      //   captureDraggingState: true,
    });
  };

  checkForLongPress = () => {
    if (!clickStartTimestamp) return;
    else if (Date.now() - clickStartTimestamp > 1000) {
      this.removeComponent();
    }
    clickStartTimestamp = undefined;
  };
  ParseNodeList = (node, port, type) => {
    for (var nodeKey in node) {
      var obj = node[nodeKey].state;
      if (obj["source"] == port) {
        delete node[nodeKey].state["source"];
        delete node[nodeKey].state["value"];
        delete node[nodeKey].state["value2"];
        delete node[nodeKey].state["condition"];
        delete node[nodeKey].state["hour"];
        delete node[nodeKey].state["hour2"];
        delete node[nodeKey].state["minute"];
        delete node[nodeKey].state["minute2"];
      }
      if (
        node[nodeKey].type == "variable_output" ||
        node[nodeKey].type == "wait" ||
        node[nodeKey].type == "hardware"
      ) {
        //  for tern+
        if (obj["assign" + port] && port.length == 1) {
          if (obj["assign" + port + "1"]) {
            delete node[nodeKey].state["assign" + port + "1"];
          }
          if (obj["value" + port + "1"]) {
            delete node[nodeKey].state["value" + port + "1"];
          }
          if (type == "dot_matrix") {
            for (var key in obj) {
              if (key.startsWith("dot_matrix")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (type == "7segment_display") {
            for (var key in obj) {
              if (key.includes("valueB") || key.includes("valueC")) {
                delete node[nodeKey].state[key];
              }
            }
          }
        } else {
          if (obj["assign" + port]) {
            delete node[nodeKey].state["assign" + port];
          }
          if (obj["value" + port]) {
            delete node[nodeKey].state["value" + port];
          }
          if (type == "dot_matrix") {
            for (var key in obj) {
              if (key.startsWith("dot_matrix")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (type == "7segment_display") {
            for (var key in obj) {
              if (key.includes("valueB") || key.includes("valueC")) {
                delete node[nodeKey].state[key];
              }
            }
          }
        }
      }
      if (node[nodeKey].subprogram) {
        this.ParseNodeList(node[nodeKey].subprogram, port, type);
      }
    }
    return node;
  };
  removeComponent = () => {
    const { type, index } = this.props;

    // var prop = this.props.prop;
    // if (sessionStorage.getItem("AppDetails-" + prop.projId)) {
    var prev_data = this.props.appState;

    var port = this.props.connectedTo;

    var updated_prog = this.ParseNodeList(prev_data.logic.program, port, type);
    // var updated_flow_prog1 = this.ParseNodeList(prev_data.logicNew.cardConnections, port, type);
    // var updated_flow_prog2 = this.ParseNodeList(prev_data.logicNew.cards, port, type);
    prev_data.logic.program = updated_prog;
    // prev_data.logicNew.cardConnections = updated_flow_prog1;
    // prev_data.logicNew.cards = updated_flow_prog2;

    if (sessionStorage.getItem("connectedDevice") == "Ace") {
      if (type == "pc_motor_driver") {
        if (port == "A" || port == "C") {
          prev_data.assembly.PortConnections["A"] = null;
          prev_data.assembly.PortConnections["C"] = null;
        }
        if (port == "B" || port == "D") {
          prev_data.assembly.PortConnections["B"] = null;
          prev_data.assembly.PortConnections["D"] = null;
        }
      } else if (type == "stepper_motor") {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B !==
          null
        ) {
          if (
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
              .type == "pc_motor_driver"
          ) {
            if (port == "STPM") {
              prev_data.assembly.PortConnections["B1"] = null;
              prev_data.assembly.PortConnections["B2"] = null;
              prev_data.assembly.PortConnections["D2"] = null;
              prev_data.assembly.PortConnections["D1"] = null;
            }
          }
        }

        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A !==
          null
        ) {
          if (
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
              .type == "pc_motor_driver"
          ) {
            if (port == "STPM") {
              prev_data.assembly.PortConnections["A1"] = null;
              prev_data.assembly.PortConnections["A2"] = null;
              prev_data.assembly.PortConnections["C2"] = null;
              prev_data.assembly.PortConnections["C1"] = null;
            }
          }
        }
      } else if (type != "servo_motor" || type != "ultrasonic_sensor") {
        if (port == "A") {
          prev_data.assembly.PortConnections["A"] = null;
          prev_data.assembly.PortConnections["A1"] = null;
          prev_data.assembly.PortConnections["A2"] = null;
        }
        if (port == "B") {
          prev_data.assembly.PortConnections["B"] = null;
          prev_data.assembly.PortConnections["B1"] = null;
          prev_data.assembly.PortConnections["B2"] = null;
        }
        if (port == "C") {
          prev_data.assembly.PortConnections["C"] = null;
          prev_data.assembly.PortConnections["C1"] = null;
          prev_data.assembly.PortConnections["C2"] = null;
        }
        if (port == "D") {
          prev_data.assembly.PortConnections["D"] = null;
          prev_data.assembly.PortConnections["D1"] = null;
          prev_data.assembly.PortConnections["D2"] = null;
        }
      } else {
        prev_data.assembly.PortConnections[port] = null;
      }
    } else {
      prev_data.assembly.PortConnections[port] = null;
    }

    // sessionStorage.setItem("AppDetails-" + prop.projId, JSON.stringify(prev_data));
    // this.props.appState.PortConnections = prev_data.PortConnections;
    // this.props.appState.logic = prev_data.logic;
    // this.props.appState.logicNew = prev_data.logicNew;

    // }
    this.props.removeFromWorkspace({ type, index, port });

    this.props.appState.PortConnections(prev_data.assembly.PortConnections);
    var { logic } = this.props.appState;
    this.props.appState.logicComponent(logic);

    // Object.keys(components).map(type => {

    //   components[type].map((component, index) => {
    //   var componentType
    //   for (let i = 0; i < Data.length; i++) {
    //   if (type == Data[i].type) {
    //   if (Data[i].color == "#15909d") {
    //   componentType = "output"
    //   }
    //   if (Data[i].color == "#ff8c19") {
    //   componentType = "input"
    //   }

    //   }

    //   }

    //   if (component.connectedTo) {
    //   PortConnections[component.connectedTo] = { type, index, componentType };

    //   }

    //   });
    //   });
  };
  typeCheck = () => {
    this.removeComponent();
  };
  render() {
    if (this.props.type == "rotatory") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 140 * scale;
      var width = 140 * scale;
      left = left - 20;
      top = top - 20;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2.1%",
              marginLeft: "-1.1%",
              left,
              zIndex: "3",
              color: "#707070",
              fontSize: "20px",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2.6%",
              marginLeft: "10.5%",
              left,
              zIndex: "3",
              color: "#707070",
              fontSize: "20px",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "distance_sensor") {
      let connectedToPort = this.props.connectedTo;
      console.log(this.props.connectedTo, "<<<<:<:<:<:<:");

      console.log(this.props.rangeA1, "<<<<:<:<:<:<:");

      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;
      left = left + 2;
      top = top - 4;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />

          <p
            style={{
              position: "absolute",
              top,
              marginTop: "3%",
              marginLeft: "-2%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "3%",
              marginLeft: "7%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "tact_switch") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      //CONNECTION WIRE
      var height = 100 * scale;
      var width = 100 * scale;
      top = top - 5;
      left = left - 5;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,

              // border: "1px solid red",
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />

          <p
            style={{
              position: "absolute",
              top,
              marginTop: "1%",
              marginLeft: "5.5%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {/* {this.props.one} */}
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2%",
              marginLeft: "12.5%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {/* {this.props.two} */}
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "dual_splitter") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 120 * scale;
      var width = 120 * scale;
      top = top - 12;
      left = left - 10;

      return connectDragSource(
        <div
          style={{
            ...style,
            left,
            top,
            // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
            backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

            height,
            width,
          }}
          onMouseDown={() => {
            clickStartTimestamp = Date.now();
          }}
          onMouseUp={this.checkForLongPress}
          onDoubleClick={() => this.typeCheck(this)}
        />
      );
    } else if (this.props.type == "joystick") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 120 * scale;
      var width = 120 * scale;
      left = left - 10;
      top = top - 15;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2%",
              marginLeft: "-0.5%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {/* {this.props.one} */}
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2%",
              marginLeft: "7%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {/* {this.props.two} */}
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "ultrasonic_sensor") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;
      left = left - 10;
      top = top + 10;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "-0.7%",
              marginLeft: "3%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {/* {this.props.temp} */}
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "C"
                ? this.props.one
                : null}
          </p>
        </div>
      );
    } else if (this.props.type == "light_sensor") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;
      left = left;
      top = top;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "3%",
              marginLeft: "-3%",
              left,
              zIndex: "3",
              color: "#707070",
              fontSize: "20px",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "3%",
              marginLeft: "6.5%",
              left,
              zIndex: "3",
              color: "#707070",
              fontSize: "20px",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "touch_sensor") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;
      left = left;
      top = top - 8;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "-1%",
              marginLeft: "0%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "-0.6%",
              marginLeft: "6%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "dual_switch") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;
      left = left;
      top = top - 8;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "-1%",
              marginLeft: "0%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "-0.6%",
              marginLeft: "6%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "octa_splitter") {
      let { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 125 * scale;
      var width = 125 * scale;

      if (height == 115 || height == 95.83333333333334) {
      } else {
        top = top - 40;
        left = left - 10;
      }
      // var top1=100-top;
      return connectDragSource(
        <div
          style={{
            ...style,
            left,
            top,
            // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
            height,
            width,
          }}
          onMouseDown={() => {
            clickStartTimestamp = Date.now();
          }}
          onMouseUp={this.checkForLongPress}
          onDoubleClick={() => this.typeCheck(this)}
        />
      );
    } else if (this.props.type == "temp_gas") {
      const {
        type,
        left,
        top,
        scale,
        connectDragSource,
        isDragging,
        children,
      } = this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2%",
              marginLeft: "-2%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {/* {this.props.temp} */}
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2%",
              marginLeft: "7%",
              left,
              zIndex: "3",
              fontSize: "20px",
              color: "#707070",
            }}
          >
            {/* {this.props.gas} */}
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "temp_dew") {
      const {
        type,
        left,
        top,
        scale,
        connectDragSource,
        isDragging,
        children,
      } = this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;

      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

              height,
              width,
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2.5%",
              marginLeft: "-2.5%",
              left,
              zIndex: "3",
              color: "#707070",
              fontSize: "20px",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA1
              : this.props.connectedTo == "B"
                ? this.props.temp
                : this.props.connectedTo == "C"
                  ? this.props.one
                  : null}
          </p>
          <p
            style={{
              position: "absolute",
              top,
              marginTop: "2.5%",
              marginLeft: "6.5%",
              left,
              zIndex: "3",
              color: "#707070",
              fontSize: "20px",
            }}
          >
            {this.props.connectedTo == "A"
              ? this.props.rangeA2
              : this.props.connectedTo == "B"
                ? this.props.gas
                : this.props.connectedTo == "C"
                  ? this.props.two
                  : null}
          </p>
        </div>
      );
    } else if (this.props.type == "servo_motor") {
      var { type, left, top, scale, connectDragSource, isDragging, children } =
        this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;
      top = top;
      left = left;

      return connectDragSource(
        <div
          style={{
            ...style,
            left,
            top,
            // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
            backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,

            height,
            width,
          }}
          onMouseDown={() => {
            clickStartTimestamp = Date.now();
          }}
          onMouseUp={this.checkForLongPress}
          onDoubleClick={() => this.typeCheck(this)}
        />
      );
    } else {
      const {
        type,
        left,
        top,
        scale,
        connectDragSource,
        isDragging,
        children,
      } = this.props;
      if (isDragging) {
        return null;
      }

      var height = 100 * scale;
      var width = 100 * scale;
      return connectDragSource(
        <div>
          <div
            style={{
              ...style,
              left,
              top,
              // backgroundImage: "url(images/oldImages/component_" + type + ".png)",
              backgroundImage: `url(Bisoft_UI/Accessories/newComponents/component_${type}.png)`,
              height,
              width,
              // border: "1px solid red",
            }}
            onMouseDown={() => {
              clickStartTimestamp = Date.now();
            }}
            onMouseUp={this.checkForLongPress}
            onDoubleClick={() => this.typeCheck(this)}
          />

          {/* <p
             style={{
               position: "absolute",
               top,
               marginTop: "-1%",
               marginLeft: "3%",
               left,
               zIndex: "3",
               fontSize: "20px",
             }}
           >
             {this.props.touch_pad}
           </p>
           <p
             style={{
               position: "absolute",
               top,
               marginTop: "-0.6%",
               marginLeft: "5.5%",
               left,
               zIndex: "3",
               fontSize: "20px",
             }}
           >
             {this.props.touch_pad2}
           </p> */}
        </div>
      );
    }
  }

  // });
}

export default DragSource(
  ItemTypes.COMPONENT,
  componentSource,
  collect
)(Component1);
