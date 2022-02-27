/**
 * @typedef WorkspaceComponentsData
 * @type object
 * @property {number} top   The top offset
 * @property {number} left   The left offset
 * @property {string} connectedTo   The port to which it is connected. It does not exist if not connected to any port
 */

/**
 * It has keys as component types for eg led
 * @example
 * {
 * 	 "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
 * }
 * @typedef WorkspaceComponents
 * @type object
 * @property {WorkspaceComponentsData[]} ComponentType An array describing components of "ComponentType"
 */

/**
 * Describes a component in workspace. The last 3 properties may or may not be present.
 * (Different from {@link WorkspaceComponents})
 * @typedef AssemblyComponent
 * @type object
 * @property {string} type Type of the component
 * @property {?number} index Index of component in {@link WorkspaceComponents} if old component
 * @property {?number} left The left offset
 * @property {?number} top  The top offset
 * @property {?string} connectedTo Port connected to
 */

/**
 * This module is the workspace component of assembly tab and contains many functions for manipulation of the workspace object
 * This is a drop target.
 * @module components/assembly/Workspace
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import ItemTypes from "./ItemTypes";
import ImageSizes from "./ImageSizes";
import BiboxSize from "./ImageSizes";

import { DropTarget } from "react-dnd";
import DraggingInfo from "./DraggingInfo";
import socketIOClient from "socket.io-client";

// var cumulativeOffset  from './src/helpers/cumulativeOffset');

import Bibox from "./Bibox";
import Component1 from "./Component";
import IfPanel from "../logic/panels/if_O";

import Data from "../concept/data";
import Modal from "react-modal";

var tutorialDesc = "";
//Custom Styles

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
    // border: "2px solid #188dcc",
    zIndex: 1,
  },
};
var count = 0;

const workspaceTarget = {
  drop(props, monitor, component) {
    const { offset, scale } = props.workspace;
    const { width, height } = props;

    DraggingInfo.isDragging = false;
    const type = monitor.getItemType();
    const item = monitor.getItem();
    var currentOffset;
    if (
      monitor.getItemType() === ItemTypes.COMPONENT &&
      !DraggingInfo.draggingComponentOld
    ) {
      currentOffset = monitor.getClientOffset();
    } else currentOffset = monitor.getSourceClientOffset();
    currentOffset.x -= document.body.clientWidth - width;
    currentOffset.y -= document.body.clientHeight - height;
    currentOffset.x = currentOffset.x / scale - offset.left;
    currentOffset.y = currentOffset.y / scale - offset.top;
    if (type === ItemTypes.COMPONENT && !DraggingInfo.draggingComponentOld) {
      component.newComponent(item.type, currentOffset.x, currentOffset.y);
    } else {
      if (type === ItemTypes.BIBOX)
        component.moveBibox(currentOffset.x, currentOffset.y);
      else component.updateOldComponent(currentOffset.x, currentOffset.y);
    }
    // console.log(
    //   "type currentOffset",
    //   type,
    //   currentOffset,
    //   document.body.clientHeight,
    //   width,
    //   height
    // );
  },
};

let componentsDataSensor = JSON.parse(
  sessionStorage.getItem("concept")
).counter;

// var Workspace = React.createClass({
class Workspace extends Component {
  constructor(props) {
    super(props);

    var tutorialPortArray = [];
    var selectionType = localStorage.getItem("programMode");

    if (selectionType == "learn") {
      tutorialDesc = JSON.parse(sessionStorage.getItem("tutorialPort"));
      // tutorialPortArray.push(JSON.parse(tutorialDesc).assembly1)
      // tutorialPortArray.push(JSON.parse(tutorialDesc).assembly2)
    }

    this.state = {
      tutorialDesc: tutorialDesc,
      usbOpen: false,
      detected: false,
      internalAccessoriesData: JSON.parse(sessionStorage.getItem("concept"))
        .internalaccessories,
    };
  }

  componentDidMount = () => {
    const { height, width } = this.props;
    this.removeConnection = this.removeConnection.bind(this);

    // Move Bibox to center
    // this.moveBibox(340, 90);

    // Update the PortConnections module
    var { components, scale, offset } = this.props.workspace;
    var { PortConnections } = this.props.appState.assembly;
    Object.keys(PortConnections).map((port) => (PortConnections[port] = null));

    // console.log("componentscomponentscomponentscomponents", components);

    Object.keys(components).map((type) => {
      let SensorObj = componentsDataSensor.find((o) => o.type === type);
      // console.log("SOUMITYA++++++++++++++++>", SensorObj);

      components[type].map((component, index) => {
        if (component.connectedTo) {
          if (type == "pc_motor_driver") {
            if (component.connectedTo) {
              if (
                component.connectedTo == "A" ||
                component.connectedTo == "C"
              ) {
                PortConnections["A"] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections["C"] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              }
              if (
                component.connectedTo == "B" ||
                component.connectedTo == "D"
              ) {
                PortConnections["B"] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections["D"] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              }
            }
          } else if (type == "stepper_motor") {
            if (component.connectedTo) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                  .B !== null
              ) {
                if (
                  JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                    .B.type == "pc_motor_driver"
                ) {
                  if (
                    components["pc_motor_driver"][0].connectedTo == "B" ||
                    components["pc_motor_driver"][0].connectedTo == "D"
                  ) {
                    PortConnections["B1"] = {
                      type,
                      index,
                      signalType: SensorObj.signalType,
                    };
                    PortConnections["B2"] = {
                      type,
                      index,
                      signalType: SensorObj.signalType,
                    };
                    PortConnections["D1"] = {
                      type,
                      index,
                      signalType: SensorObj.signalType,
                    };
                    PortConnections["D2"] = {
                      type,
                      index,
                      signalType: SensorObj.signalType,
                    };
                  }
                }
              } else if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                  .A !== null
              ) {
                if (
                  JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                    .A.type == "pc_motor_driver"
                ) {
                  if (
                    components["pc_motor_driver"][0].connectedTo == "A" ||
                    components["pc_motor_driver"][0].connectedTo == "C"
                  ) {
                    PortConnections["A1"] = {
                      type,
                      index,
                      signalType: SensorObj.signalType,
                    };
                    PortConnections["A2"] = {
                      type,
                      index,
                      signalType: SensorObj.signalType,
                    };
                    PortConnections["C1"] = {
                      type,
                      index,
                      signalType: SensorObj.signalType,
                    };
                    PortConnections["C2"] = {
                      type,
                      index,
                      signalType: SensorObj.signalType,
                    };
                  }
                }
              }
            }
          } else {
            // type == "led"
            if (
              type != "ultrasonic_sensor" &&
              type != "servo_motor" &&
              type != "servo_motor_360" &&
              type != "rotatory"
            ) {
              if (component.connectedTo) {
                if (
                  component.connectedTo == "A" ||
                  component.connectedTo == "B" ||
                  component.connectedTo == "C" ||
                  component.connectedTo == "D"
                ) {
                  PortConnections[component.connectedTo] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections[`${component.connectedTo}1`] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections[`${component.connectedTo}2`] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                } else {
                  PortConnections[component.connectedTo] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            } else {
              PortConnections[component.connectedTo] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        }
      });
    });
    this.props.updatePort(PortConnections);

    var socket = socketIOClient.connect("http://localhost:3008");
    socket.emit("_usbDetection", "Hi");
    socket.on("/usbDetection", (data) => {
      if (data.detected) {
        var c = document.getElementById("assemblyConnections");
        var d = document.getElementById("biboxClass");
        var e = document.getElementById("connectPort");

        // c.style.zIndex = 2;
        // d.style.zIndex = 2;
        // e.style.zIndex = 2;
        this.setState({ detected: data.detected, usbOpen: !data.detected });
      } else {
        // var c = document.getElementById("assemblyConnections");
        // var d = document.getElementById("biboxClass");
        // var e = document.getElementById("connectPort");

        // to remove  Device not connected..  also set the zindex2
        // c.style.zIndex = 4;
        // d.style.zIndex = 4;
        // e.style.zIndex = 4;
        this.setState({ detected: data.detected, usbOpen: !data.detected });
      }
    });
  };

  /**
   * Move the bibox to a new position
   * @param  {number} left The new left
   * @param  {number} top  The new top
   */
  moveBibox(left, top) {
    var { workspace } = this.props;
    workspace.bibox.left = left;
    workspace.bibox.top = top;
    this.props.update(workspace);
  }
  /**
   * Update the position of an old component
   * @param  {number} left The new left
   * @param  {number} top  The new top
   */
  updateOldComponent(left, top) {
    // alert("dataa");

    var { workspace } = this.props;
    var item = DraggingInfo.draggingComponentOld;
    workspace.components[item.type][item.index].top = top;
    workspace.components[item.type][item.index].left = left;
    if (DraggingInfo.newComponentPort != undefined) {
      workspace.components[item.type][item.index].connectedTo =
        DraggingInfo.newComponentPort;
    }
    this.props.update(workspace);

    var { components, scale, offset } = this.props.workspace;

    var { PortConnections } = this.props.appState.assembly;
    Object.keys(PortConnections).map((port) => (PortConnections[port] = null));
    Object.keys(components).map((type) => {
      let SensorObj = componentsDataSensor.find((o) => o.type === type);
      // console.log("SOUMITYA++++++++++++++++>", SensorObj);

      components[type].map((component, index) => {
        if (type == "pc_motor_driver") {
          if (component.connectedTo) {
            if (component.connectedTo == "A" || component.connectedTo == "C") {
              // PortConnections[component.connectedTo] = { type, index, signalType:SensorObj.signalType  };

              PortConnections["A"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections["C"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
            if (component.connectedTo == "B" || component.connectedTo == "D") {
              PortConnections["B"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections["D"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "stepper_motor") {
          if (component.connectedTo) {
            if (
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .B !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
                  .type == "pc_motor_driver"
              ) {
                if (
                  components["pc_motor_driver"][0].connectedTo == "B" ||
                  components["pc_motor_driver"][0].connectedTo == "D"
                ) {
                  PortConnections["B1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["B2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["D1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["D2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            } else if (
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .A !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
                  .type == "pc_motor_driver"
              ) {
                if (
                  components["pc_motor_driver"][0].connectedTo == "A" ||
                  components["pc_motor_driver"][0].connectedTo == "C"
                ) {
                  PortConnections["A1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["A2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["C1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["C2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            }
          }
        } else if (component.connectedTo) {
          // type == "led")
          if (
            type != "ultrasonic_sensor" &&
            type != "servo_motor" &&
            type != "servo_motor_360"
          ) {
            if (component.connectedTo) {
              if (
                component.connectedTo == "A" ||
                component.connectedTo == "B" ||
                component.connectedTo == "C" ||
                component.connectedTo == "D"
              ) {
                PortConnections[component.connectedTo] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections[`${component.connectedTo}1`] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections[`${component.connectedTo}2`] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              } else {
                PortConnections[component.connectedTo] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              }
            }
          } else {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }

          // if (component.connectedTo == "A") {
          //   PortConnections["C"] = {
          //     notDriverMotot: "notConnectedDriverMotor",
          //   };
          // }
          // if (component.connectedTo == "C") {
          //   PortConnections["A"] = {
          //     notDriverMotot: "notConnectedDriverMotor",
          //   };
          // }
          // if (component.connectedTo == "B") {
          //   PortConnections["D"] = {
          //     notDriverMotot: "notConnectedDriverMotor",
          //   };
          // }
          // if (component.connectedTo == "D") {
          //   PortConnections["B"] = {
          //     notDriverMotot: "notConnectedDriverMotor",
          //   };
          // }
        }
      });
    });
    this.props.updatePort(PortConnections);
  }
  /**
   * Add a new component to workspace. Also if DraggingInfo.newComponentPort is
   * defined connect the new component to that port.
   * @param  {string} type The type of the component
   * @param  {number} left The left offset
   * @param  {number} top  The top offset
   */
  newComponent(type, left, top) {
    // alert("new dataa");

    var { workspace } = this.props;
    if (!workspace.components[type]) workspace.components[type] = [];
    var component = { left: left, top: top }; //IMP

    if (DraggingInfo.newComponentPort) {
      component.connectedTo = DraggingInfo.newComponentPort;
      DraggingInfo.newComponentPort = null;
    }
    workspace.components[type].push(component); //IMP
    // REDUX
    this.props.update(workspace);

    var { components, scale, offset } = this.props.workspace;

    var { PortConnections } = this.props.appState.assembly;
    Object.keys(PortConnections).map((port) => (PortConnections[port] = null));
    Object.keys(components).map((type) => {
      let SensorObj = componentsDataSensor.find((o) => o.type === type);
      // console.log("SOUMITYA++++++++++++++++>", SensorObj);

      components[type].map((component, index) => {
        if (type == "pc_motor_driver") {
          if (component.connectedTo) {
            if (component.connectedTo == "A" || component.connectedTo == "C") {
              // PortConnections[component.connectedTo] = { type, index, signalType:SensorObj.signalType  };

              PortConnections["A"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections["C"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
            if (component.connectedTo == "B" || component.connectedTo == "D") {
              PortConnections["B"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections["D"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        }

        if (type == "stepper_motor") {
          if (component.connectedTo) {
            if (
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .B !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
                  .type == "pc_motor_driver"
              ) {
                if (
                  components["pc_motor_driver"][0].connectedTo == "B" ||
                  components["pc_motor_driver"][0].connectedTo == "D"
                ) {
                  PortConnections["B1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["B2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["D1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["D2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            } else if (
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .A !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
                  .type == "pc_motor_driver"
              ) {
                if (
                  components["pc_motor_driver"][0].connectedTo == "A" ||
                  components["pc_motor_driver"][0].connectedTo == "C"
                ) {
                  PortConnections["A1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["A2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["C1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["C2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            }
          }
        } else if (component.connectedTo) {
          // type == "led")
          if (
            type != "ultrasonic_sensor" &&
            type != "servo_motor" &&
            type != "servo_motor_360"
          ) {
            if (component.connectedTo) {
              if (
                component.connectedTo == "A" ||
                component.connectedTo == "B" ||
                component.connectedTo == "C" ||
                component.connectedTo == "D"
              ) {
                PortConnections[component.connectedTo] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections[`${component.connectedTo}1`] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections[`${component.connectedTo}2`] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              } else {
                PortConnections[component.connectedTo] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              }
            }
          } else {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        }
      });
    });

    // console.log("-========>", PortConnections);

    this.props.updatePort(PortConnections);
  }
  /**
   * Connect a old component to a port in workspace (on drop)
   * @param  {AssemblyComponent} item
   * @param  {string} port The port
   */
  workspaceConnect(item, port) {
    var { workspace } = this.props;
    workspace.components[item.type][item.index].connectedTo = port;
    this.props.update(workspace);
  }
  /**
   * Remove connection of old component
   * @param  {AssemblyComponent} item
   */
  removeConnection(item) {
    var { workspace } = this.props;
    if (workspace.components[item.type][item.index].connectedTo) {
      var obj = workspace.components[item.type][item.index];
      delete obj.connectedTo;
    }
    this.props.update(workspace);

    var { components, scale, offset } = this.props.workspace;
    var { PortConnections } = this.props.appState.assembly;
    Object.keys(PortConnections).map((port) => (PortConnections[port] = null));
    Object.keys(components).map((type) => {
      let SensorObj = componentsDataSensor.find((o) => o.type === type);
      // console.log("SOUMITYA++++++++++++++++>", SensorObj);

      components[type].map((component, index) => {
        if (type == "pc_motor_driver") {
          if (component.connectedTo) {
            if (component.connectedTo == "A" || component.connectedTo == "C") {
              // PortConnections[component.connectedTo] = { type, index, signalType:SensorObj.signalType  };

              PortConnections["A"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections["C"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
            if (component.connectedTo == "B" || component.connectedTo == "D") {
              PortConnections["B"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
              PortConnections["D"] = {
                type,
                index,
                signalType: SensorObj.signalType,
              };
            }
          }
        } else if (type == "stepper_motor") {
          if (component.connectedTo) {
            if (
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .B !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
                  .type == "pc_motor_driver"
              ) {
                if (
                  components["pc_motor_driver"][0].connectedTo == "B" ||
                  components["pc_motor_driver"][0].connectedTo == "D"
                ) {
                  PortConnections["B1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["B2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["D1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["D2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            }

            if (
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .A !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
                  .type == "pc_motor_driver"
              ) {
                if (
                  components["pc_motor_driver"][0].connectedTo == "A" ||
                  components["pc_motor_driver"][0].connectedTo == "C"
                ) {
                  PortConnections["A1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["A2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["C1"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                  PortConnections["C2"] = {
                    type,
                    index,
                    signalType: SensorObj.signalType,
                  };
                }
              }
            }
          }
        } else if (component.connectedTo) {
          // type == "led")
          if (
            type != "ultrasonic_sensor" &&
            type != "servo_motor" &&
            type != "servo_motor_360"
          ) {
            if (component.connectedTo) {
              if (
                component.connectedTo == "A" ||
                component.connectedTo == "B" ||
                component.connectedTo == "C" ||
                component.connectedTo == "D"
              ) {
                PortConnections[component.connectedTo] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections[`${component.connectedTo}1`] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
                PortConnections[`${component.connectedTo}2`] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              } else {
                PortConnections[component.connectedTo] = {
                  type,
                  index,
                  signalType: SensorObj.signalType,
                };
              }
            }
          } else {
            PortConnections[component.connectedTo] = {
              type,
              index,
              signalType: SensorObj.signalType,
            };
          }
        }
      });
    });
    this.props.updatePort(PortConnections);
  }

  closeUsb = () => {
    var c = document.getElementById("assemblyConnections");
    var d = document.getElementById("biboxClass");
    var e = document.getElementById("connectPort");

    c.style.zIndex = 2;
    d.style.zIndex = 2;
    e.style.zIndex = 2;
    this.setState({ usbOpen: false });
  };
  render() {
    var count = 0;
    if (this.state.detected == true) {
      var imageURL = "images/Learn/ble_connection.png";
    } else {
      imageURL = "images/Learn/ble_disconnection.png";
    }
    var usbDetectionModel = (
      <Modal isOpen={this.state.usbOpen} style={customStyles}>
        <img
          onClick={this.closeUsb}
          className="closeconceptModal"
          src="images/login/button_exit@2x.png"
        ></img>
        <div className="connectconceptMsg">
          <p>Device not connected..</p>
          <button>
            {" "}
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/biboxSelection"
            >
              Reconnect
            </Link>
          </button>
        </div>
      </Modal>
    );
    const { connectDropTarget, removeFromWorkspace } = this.props;
    const { bibox, components, offset, scale } = this.props.workspace;
    var { PortConnections } = this.props.appState.assembly;

    return connectDropTarget(
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // border: "1px solid green",
        }}
      >
        {/* SHOWS DEVICE IMG ACE, HUMANOID, TEARN */}
        <Bibox
          left={(bibox.left + offset.left) * scale}
          top={(bibox.top + offset.top) * scale}
          scale={scale}
          workspaceConnect={this.workspaceConnect}
          responceTp0={this.props.responceTp0}
          responceTp1={this.props.responceTp1}
          responceTp2={this.props.responceTp2}
          mic={this.props.mic}
          // Ports
          rangeA1={this.props.rangeA1}
          rangeA2={this.props.rangeA2}
          tactswitch={this.props.tactswitch}
          temp={this.props.temp}
          gas={this.props.gas}
          one={this.props.one}
          two={this.props.two}
        />

        {/* USB detection is remove and the Zindex is also change from componentDidmount */}
        {/* {usbDetectionModel} */}

        {Object.keys(components).map((key) => {
          return (
            <div key={key}>
              {components[key].map((component, index) => {
                const { left, top, connectedTo } = component;
                return (
                  <Component1
                    key={index}
                    type={key}
                    index={index}
                    prop={this.props.prop}
                    left={(offset.left + left) * scale}
                    top={(offset.top + top) * scale}
                    scale={scale}
                    connectedTo={connectedTo}
                    appState={this.props.appState}
                    removeFromWorkspace={removeFromWorkspace}
                    removeConnection={this.removeConnection}
                    touch_pad={this.props.touch_pad}
                    touch_pad2={this.props.touch_pad2}
                    rangeA1={this.props.rangeA1}
                    rangeA2={this.props.rangeA2}
                    tactswitch={this.props.tactswitch}
                    temp={this.props.temp}
                    gas={this.props.gas}
                    one={this.props.one}
                    two={this.props.two}
                  />
                );
              })}
            </div>
          );
        })}

        {localStorage.getItem("programMode") == "learn" ? (
          <div
            style={{
              height: "10%",
              width: "65%",
              border: "2px solid #bed5fa",
              backgroundColor: "white",
              borderRadius: "20px",
              bottom: "3%",
              left: "10%",
              position: "inherit",
            }}
          >
            <h3 style={{ marginLeft: "20px", marginTop: "2px" }}>
              {Object.entries(this.state.tutorialDesc).map(([key, value]) => {
                if (PortConnections[key]) {
                  if (PortConnections[key].type == value) {
                  }
                } else {
                  if (count == 0) {
                    count++;
                    this.props.nextVisbility("hidden");
                    return (
                      <div>
                        {" "}
                        Drag &amp; connect {value} to {key} port
                      </div>
                    );
                  }
                }
              })}
              {count == 0 ? (
                <p>
                  {this.props.nextVisbility("visible")}
                  <div>Click on next</div>
                </p>
              ) : (
                ""
              )}
            </h3>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    );
  }
}

export default DropTarget(
  [ItemTypes.BIBOX, ItemTypes.COMPONENT],
  workspaceTarget,
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(Workspace);
