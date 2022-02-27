/**
 * This module  is a function that returns the port over which the component is
 * currently, if that port is already not oocupied and of an allowable type or
 * returns false otherwise
 * @module components/assembly/IsOverPort
 */

import ItemTypes from "./ItemTypes";
import ImageSizes from "./ImageSizes";
import Ports from "./Ports";
import PortTypes from "./PortTypes";

import AllowedPortTypes from "./AllowedPortTypes";

var IsOverPort = function (
  component,
  bibox,
  componentConnected,
  PortConnections
) {
  var portName = false;
  var LeftPort, TopPort;
  var LeftOcta, TopOcta;
  var LeftB, TopB;
  var LeftC, TopC;
  var LeftCL, TopCL;
  var TopBF, LeftBF;
  var LeftG, TopG;
  var LeftSM, TopSM;
  var LeftSSM, TopSSM;

  // TOUCHPAD
  let internalAccessoriesData = JSON.parse(
    sessionStorage.getItem("concept")
  ).internalaccessories;

  // STEPPER
  let isStepperConnected = () => {
    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.STPM !=
      null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.STPM
          .type == "stepper_motor"
      ) {
        return "STPM";
      }
    }
  };

  // SERVO

  let isServoMotorConnected_BD = () => {
    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1
          .type == "servo_motor"
      ) {
        return "B1";
      }
    }

    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B2 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B2
          .type == "servo_motor"
      ) {
        return "B2";
      }
    }

    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D2 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D2
          .type == "servo_motor"
      ) {
        return "D2";
      }
    }
    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1
          .type == "servo_motor"
      ) {
        return "D1";
      }
    }
  };

  let isServoMotorConnected_AC = () => {
    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1
          .type == "servo_motor"
      ) {
        return "A1";
      }
    }

    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A2 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A2
          .type == "servo_motor"
      ) {
        return "A2";
      }
    }

    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C2 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C2
          .type == "servo_motor"
      ) {
        return "C2";
      }
    }
    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1
          .type == "servo_motor"
      ) {
        return "C1";
      }
    }
  };

  // GEARED
  let isGearedConnected_BD = () => {
    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1
          .type == "geared_motor" ||
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1
          .type == "mini_geared_motor" ||
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B1
          .type == "dc_motor"
      ) {
        return "B1";
      }
    }

    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1
          .type == "geared_motor" ||
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1
          .type == "mini_geared_motor" ||
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D1
          .type == "dc_motor"
      ) {
        return "D1";
      }
    }
  };

  let isGearedConnected_AC = () => {
    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1
          .type == "geared_motor" ||
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1
          .type == "mini_geared_motor" ||
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A1
          .type == "dc_motor"
      ) {
        return "A1";
      }
    }

    if (
      JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1 != null
    ) {
      if (
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1
          .type == "geared_motor" ||
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1
          .type == "mini_geared_motor" ||
        JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C1
          .type == "dc_motor"
      ) {
        return "C1";
      }
    }
  };

  if (localStorage.getItem("programMode") == "learn") {
    var PortConnectionsTutor = JSON.parse(
      sessionStorage.getItem("tutorialPort")
    );
    var AllowedPortTypesTutor = {};

    Object.entries(PortConnectionsTutor).map(([key, value]) => {
      if (AllowedPortTypesTutor[value]) {
        AllowedPortTypesTutor[value].push(key);
      } else {
        AllowedPortTypesTutor[value] = [key];
      }
    });
  } else {
    // this var have a PORTS (A1,A2.............) on which the SLIDE-COMPONENTS WILL BE ACTIVETED on the DEVICE
    var AllowedPortTypesTutor = AllowedPortTypes;
  }

  if (AllowedPortTypesTutor[component.type]) {
    // led :[a,b,c,d.....]
    AllowedPortTypesTutor[component.type].some((portType) => {
      // A,B,C,D......

      return PortTypes[portType]["ports"].some((port) => {
        if (PortConnections[port]) {
          // ABCD
          return false;
        } else if (port == "A" && internalAccessoriesData.isTouchZero == true) {
          return false;
        } else if (port == "B" && internalAccessoriesData.isTouchOne == true) {
          return false;
        } else if (port == "C" && internalAccessoriesData.isTouchTwo == true) {
          return false;
        }

        // if (sessionStorage.getItem("dragingItem") !== "pc_motor_driver") {
        //   if (PortConnections[port] == "notConnectedDriverMotor") {
        //     PortConnections[port] = null;

        //   }
        // }

        if (port == "F1" || port == "F2") {
          Object.keys(componentConnected).map((key) => {
            if (key == "dual_splitter") {
              componentConnected[key].map((componentConnected, index) => {
                if (componentConnected.connectedTo == "F") {
                  LeftPort = componentConnected.left;
                  TopPort = componentConnected.top;

                  l = Ports[port][0] + LeftPort;
                  t = Ports[port][1] + TopPort;
                }
              });
            } else if (key == "servo_extender") {
              componentConnected[key].map((componentConnected, index) => {
                if (componentConnected.connectedTo == "F") {
                  LeftPort = componentConnected.left;
                  TopPort = componentConnected.top;

                  l = Ports[port][0] + LeftPort;
                  t = Ports[port][1] + TopPort;
                }
              });
            }
          });
        } else if (port == "A1" || port == "A2") {
          Object.keys(componentConnected).map((dual_splitter) => {
            if (dual_splitter == "dual_splitter") {
              componentConnected[dual_splitter].map(
                (componentConnected, index) => {
                  if (componentConnected.connectedTo == "A") {
                    LeftPort = componentConnected.left;
                    TopPort = componentConnected.top;

                    l = Ports[port][0] + LeftPort;
                    t = Ports[port][1] + TopPort;
                  }
                }
              );
            }
            /** */

            let adaasd = JSON.parse(sessionStorage.getItem("assembly"))
              .PortConnections.A;

            if (
              dual_splitter == "pc_motor_driver" &&
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .A !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
                  .type == "pc_motor_driver"
              ) {
                componentConnected[dual_splitter].map(
                  (componentConnected, index) => {
                    if (
                      componentConnected.connectedTo == "A" ||
                      componentConnected.connectedTo == "C"
                    ) {
                      LeftPort = componentConnected.left;
                      TopPort = componentConnected.top;

                      switch (component.type) {
                        case "mini_geared_motor":
                        case "dc_motor":
                        case "geared_motor": {
                          let DataServoMotorConnected_AC =
                            isServoMotorConnected_AC();

                          let DataisStepperConnected = isStepperConnected();

                          if (
                            DataServoMotorConnected_AC == "A1" ||
                            DataServoMotorConnected_AC == "A2" ||
                            DataServoMotorConnected_AC == "C1" ||
                            DataServoMotorConnected_AC == "C2" ||
                            DataisStepperConnected == "STPM"
                          ) {
                            // console.log("GOOD");
                          } else {
                            // console.log("BAD");
                            l = Ports[port][0] + LeftPort - 70;
                            t = Ports[port][1] + TopPort + 30;
                          }

                          break;
                        }

                        case "servo_motor": {
                          let DataGearedMotorConnected_AC =
                            isGearedConnected_AC();
                          let DataisStepperConnected = isStepperConnected();

                          if (
                            DataGearedMotorConnected_AC == "A1" ||
                            DataGearedMotorConnected_AC == "B1" ||
                            DataisStepperConnected == "STPM"
                          ) {
                            // console.log("GOOD");
                          } else {
                            switch (port) {
                              case "A1": {
                                l = Ports[port][0] + LeftPort - 30;
                                t = Ports[port][1] + TopPort;
                                break;
                              }

                              case "A2": {
                                l = Ports[port][0] + LeftPort - 10;
                                t = Ports[port][1] + TopPort;
                                break;
                              }
                            }
                          }

                          break;
                        }
                      }
                    }
                  }
                );
              }
            }
            /** */
          });
        } else if (port == "I1" || port == "I2") {
          Object.keys(componentConnected).map((dual_splitter) => {
            if (dual_splitter == "dual_splitter") {
              componentConnected[dual_splitter].map(
                (componentConnected, index) => {
                  if (componentConnected.connectedTo == "I") {
                    LeftPort = componentConnected.left;
                    TopPort = componentConnected.top;

                    l = Ports[port][0] + LeftPort;
                    t = Ports[port][1] + TopPort;
                  }
                }
              );
            }
          });
        } else if (port == "H1" || port == "H2") {
          Object.keys(componentConnected).map((dual_splitter) => {
            if (dual_splitter == "dual_splitter") {
              componentConnected[dual_splitter].map(
                (componentConnected, index) => {
                  if (componentConnected.connectedTo == "H") {
                    LeftPort = componentConnected.left;
                    TopPort = componentConnected.top;

                    l = Ports[port][0] + LeftPort;
                    t = Ports[port][1] + TopPort;
                  }
                }
              );
            }
          });
        } else if (port == "E1" || port == "E2") {
          Object.keys(componentConnected).map((dual_splitter) => {
            if (dual_splitter == "dual_splitter") {
              componentConnected[dual_splitter].map(
                (componentConnected, index) => {
                  if (componentConnected.connectedTo == "E") {
                    LeftPort = componentConnected.left;
                    TopPort = componentConnected.top;

                    l = Ports[port][0] + LeftPort;
                    t = Ports[port][1] + TopPort;
                  }
                }
              );
            }
          });
        } else if (port == "D1" || port == "D2") {
          Object.keys(componentConnected).map((dual_splitter) => {
            if (dual_splitter == "dual_splitter") {
              componentConnected[dual_splitter].map(
                (componentConnected, index) => {
                  if (componentConnected.connectedTo == "D") {
                    LeftPort = componentConnected.left;
                    TopPort = componentConnected.top;

                    l = Ports[port][0] + LeftPort;
                    t = Ports[port][1] + TopPort;
                  }
                }
              );
            }

            if (
              dual_splitter == "pc_motor_driver" &&
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .D !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D
                  .type == "pc_motor_driver"
              ) {
                componentConnected[dual_splitter].map(
                  (componentConnected, index) => {
                    if (
                      componentConnected.connectedTo == "B" ||
                      componentConnected.connectedTo == "D"
                    ) {
                      LeftPort = componentConnected.left;
                      TopPort = componentConnected.top;

                      switch (component.type) {
                        case "mini_geared_motor":
                        case "dc_motor":
                        case "geared_motor": {
                          let DataServoMotorConnected_BD =
                            isServoMotorConnected_BD();
                          let DataisStepperConnected = isStepperConnected();

                          if (
                            DataServoMotorConnected_BD == "B1" ||
                            DataServoMotorConnected_BD == "B2" ||
                            DataServoMotorConnected_BD == "D1" ||
                            DataServoMotorConnected_BD == "D2" ||
                            DataisStepperConnected == "STPM"
                          ) {
                            // console.log("GOOD");
                          } else {
                            // console.log("BAD");
                            l = Ports[port][0] + LeftPort + 125;
                            t = Ports[port][1] + TopPort + 30;
                          }

                          break;
                        }

                        case "servo_motor": {
                          let DataGearedMotorConnected_BD =
                            isGearedConnected_BD();

                          let DataisStepperConnected = isStepperConnected();

                          if (
                            DataGearedMotorConnected_BD == "B1" ||
                            DataGearedMotorConnected_BD == "D1" ||
                            DataisStepperConnected == "STPM"
                          ) {
                            // console.log("GOOD");
                          } else {
                            switch (port) {
                              case "D1": {
                                l = Ports[port][0] + LeftPort + 60;
                                t = Ports[port][1] + TopPort;
                                break;
                              }

                              case "D2": {
                                l = Ports[port][0] + LeftPort + 80;
                                t = Ports[port][1] + TopPort;
                                break;
                              }
                            }
                          }

                          break;
                        }
                      }
                    }
                  }
                );
              }
            }
          });
        } else if (port == "C1" || port == "C2") {
          Object.keys(componentConnected).map((dual_splitter) => {
            if (dual_splitter == "dual_splitter") {
              componentConnected[dual_splitter].map(
                (componentConnected, index) => {
                  if (componentConnected.connectedTo == "C") {
                    LeftPort = componentConnected.left;
                    TopPort = componentConnected.top;

                    l = Ports[port][0] + LeftPort;
                    t = Ports[port][1] + TopPort;
                  }
                }
              );
            }

            /** */

            if (
              dual_splitter == "pc_motor_driver" &&
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .C !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C
                  .type == "pc_motor_driver"
              ) {
                componentConnected[dual_splitter].map(
                  (componentConnected, index) => {
                    if (
                      componentConnected.connectedTo == "A" ||
                      componentConnected.connectedTo == "C"
                    ) {
                      LeftPort = componentConnected.left;
                      TopPort = componentConnected.top;

                      switch (component.type) {
                        case "mini_geared_motor":
                        case "dc_motor":
                        case "geared_motor": {
                          let DataServoMotorConnected_AC =
                            isServoMotorConnected_AC();
                          let DataisStepperConnected = isStepperConnected();

                          if (
                            DataServoMotorConnected_AC == "A1" ||
                            DataServoMotorConnected_AC == "A2" ||
                            DataServoMotorConnected_AC == "C1" ||
                            DataServoMotorConnected_AC == "C2" ||
                            DataisStepperConnected == "STPM"
                          ) {
                            // console.log("GOOD");
                          } else {
                            // console.log("BAD");
                            l = Ports[port][0] + LeftPort + 125;
                            t = Ports[port][1] + TopPort + 30;
                          }

                          break;
                        }

                        case "servo_motor": {
                          let DataGearedMotorConnected_AC =
                            isGearedConnected_AC();

                          let DataisStepperConnected = isStepperConnected();

                          if (
                            DataGearedMotorConnected_AC == "A1" ||
                            DataGearedMotorConnected_AC == "C1" ||
                            DataisStepperConnected == "STPM"
                          ) {
                            // console.log("GOOD");
                          } else {
                            switch (port) {
                              case "C1": {
                                l = Ports[port][0] + LeftPort + 60;
                                t = Ports[port][1] + TopPort;
                                break;
                              }

                              case "C2": {
                                l = Ports[port][0] + LeftPort + 80;
                                t = Ports[port][1] + TopPort;
                                break;
                              }
                            }
                          }

                          break;
                        }
                      }
                    }
                  }
                );
              }
            }
            /** */
          });
        } else if (port == "B1" || port == "B2") {
          Object.keys(componentConnected).map((key) => {
            if (key == "dual_splitter") {
              componentConnected[key].map((componentConnected, index) => {
                if (componentConnected.connectedTo == "B") {
                  LeftPort = componentConnected.left;
                  TopPort = componentConnected.top;

                  l = Ports[port][0] + LeftPort;
                  t = Ports[port][1] + TopPort;
                }
              });
            }
            if (key == "servo_extender") {
              componentConnected[key].map((componentConnected, index) => {
                if (componentConnected.connectedTo == "B") {
                  LeftPort = componentConnected.left;
                  TopPort = componentConnected.top;

                  l = Ports[port][0] + LeftPort;
                  t = Ports[port][1] + TopPort;
                }
              });
            }

            if (
              key == "pc_motor_driver" &&
              JSON.parse(sessionStorage.getItem("assembly")).PortConnections
                .B !== null
            ) {
              if (
                JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
                  .type == "pc_motor_driver"
              ) {
                componentConnected[key].map((componentConnected, index) => {
                  if (
                    componentConnected.connectedTo == "B" ||
                    componentConnected.connectedTo == "D"
                  ) {
                    LeftPort = componentConnected.left;
                    TopPort = componentConnected.top;

                    switch (component.type) {
                      case "mini_geared_motor":
                      case "dc_motor":
                      case "geared_motor": {
                        let DataServoMotorConnected_BD =
                          isServoMotorConnected_BD();

                        let DataisStepperConnected = isStepperConnected();

                        if (
                          DataServoMotorConnected_BD == "B1" ||
                          DataServoMotorConnected_BD == "B2" ||
                          DataServoMotorConnected_BD == "D1" ||
                          DataServoMotorConnected_BD == "D2" ||
                          DataisStepperConnected == "STPM"
                        ) {
                          // console.log("GOOD");
                        } else {
                          // console.log("BAD");
                          l = Ports[port][0] + LeftPort - 70;
                          t = Ports[port][1] + TopPort + 30;
                        }
                        break;
                      }

                      case "servo_motor": {
                        let DataGearedMotorConnected_BD =
                          isGearedConnected_BD();
                        let DataisStepperConnected = isStepperConnected();

                        if (
                          DataGearedMotorConnected_BD == "B1" ||
                          DataGearedMotorConnected_BD == "D1" ||
                          DataisStepperConnected == "STPM"
                        ) {
                          // console.log("GOOD");
                        } else {
                          switch (port) {
                            case "B1": {
                              l = Ports[port][0] + LeftPort - 30;
                              t = Ports[port][1] + TopPort;
                              break;
                            }

                            case "B2": {
                              l = Ports[port][0] + LeftPort - 10;
                              t = Ports[port][1] + TopPort;
                              break;
                            }
                          }
                        }

                        break;
                      }
                    }
                  }
                });
              }
            }
          });
        } else if (port == "G1" || port == "G2") {
          Object.keys(componentConnected).map((dual_splitter) => {
            if (dual_splitter == "dual_splitter") {
              componentConnected[dual_splitter].map(
                (componentConnected, index) => {
                  if (componentConnected.connectedTo == "G") {
                    LeftG = componentConnected.left;
                    TopG = componentConnected.top;

                    l = Ports[port][0] + LeftG;
                    t = Ports[port][1] + TopG;
                  }
                }
              );
            }
          });
        } else if (port == "STPM") {
          Object.keys(componentConnected).map((dual_splitter) => {
            if (dual_splitter == "pc_motor_driver") {
              componentConnected[dual_splitter].map(
                (componentConnected, index) => {
                  if (
                    componentConnected.connectedTo == "B" ||
                    componentConnected.connectedTo == "D"
                  ) {
                    let DataServoMotorConnected_BD = isServoMotorConnected_BD();

                    let DataisGearedConnected_BD = isGearedConnected_BD();
                    if (
                      DataServoMotorConnected_BD == "B1" ||
                      DataServoMotorConnected_BD == "B2" ||
                      DataServoMotorConnected_BD == "D1" ||
                      DataServoMotorConnected_BD == "D2" ||
                      DataisGearedConnected_BD == "B1" ||
                      DataisGearedConnected_BD == "D1"
                    ) {
                      // console.log("GOOD");
                    } else {
                      LeftG = componentConnected.left;
                      TopG = componentConnected.top;

                      l = Ports[port][0] + LeftG;
                      t = Ports[port][1] + TopG;
                    }
                  } else if (
                    componentConnected.connectedTo == "A" ||
                    componentConnected.connectedTo == "C"
                  ) {
                    let DataServoMotorConnected_AC = isServoMotorConnected_AC();

                    let DataisGearedConnected_AC = isGearedConnected_AC();
                    if (
                      DataServoMotorConnected_AC == "A1" ||
                      DataServoMotorConnected_AC == "A2" ||
                      DataServoMotorConnected_AC == "C1" ||
                      DataServoMotorConnected_AC == "C2" ||
                      DataisGearedConnected_AC == "A1" ||
                      DataisGearedConnected_AC == "C1"
                    ) {
                      // console.log("GOOD");
                    } else {
                      LeftG = componentConnected.left;
                      TopG = componentConnected.top;

                      l = Ports[port][0] + LeftG;
                      t = Ports[port][1] + TopG;
                    }
                  }
                }
              );
            }
          });
        } else {
          var l = Ports[port][0] + bibox.left;
          var t = Ports[port][1] + bibox.top;
        }

        if (
          component.left < l &&
          l < component.left + ImageSizes[ItemTypes.COMPONENT][0] &&
          component.top < t &&
          t < component.top + ImageSizes[ItemTypes.COMPONENT][1]
        ) {
          portName = port;
          return true;
        }
      });
    });

    // These conditon is for make connectedTo as false and portName for driverMotor
    if (sessionStorage.getItem("dragingItem") == "pc_motor_driver") {
      if (portName == "C") {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A ===
            null &&
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C ===
            null
        ) {
          return portName;
        }
      }
      if (portName == "A") {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A ===
            null &&
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.C ===
            null
        ) {
          return portName;
        }
      }
      if (portName == "B") {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B ===
            null &&
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D ===
            null
        ) {
          return portName;
        }
      }
      if (portName == "D") {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B ===
            null &&
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.D ===
            null
        ) {
          return portName;
        }
      } else {
        return false;
      }
    } else {
      return portName;
    }
  }
};

export default IsOverPort;
