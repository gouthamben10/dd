var React = require("react");
// import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory } from "react-router";
import "../../../blockly2/blockly_compressed";
var Data = require("../../data");

var Blockly = React.createClass({
  xmlChange: function () {
    /* Taking ports from local storage */
    var local = sessionStorage.getItem("AppDetails-new");
    local = JSON.parse(local);
    var localObject = local.PortConnections;
    var portArray = [];
    var portInputArray = [];
    var devicesConnectedArray = [];
    var devicesInputArray = [];
    var portUltrasonic = [];
    var sensorsPort = [];
    var sensorsDevices = [];

    // console.log("localObject==========>>", localObject);

    for (let [key, value] of Object.entries(localObject)) {
      if (value) {
        // console.log("Blockly", ` ${key}= ${value["type"]} `);
        var type = value["type"];
        var componentType;
        for (let i = 0; i < Data.length; i++) {
          if (type == Data[i].type) {
            if (Data[i].color == "#15909d") {
              componentType = "output";
            }
            if (Data[i].color == "#ff8c19") {
              componentType = "input";
            }
          }
        }

        value["componentType"] = componentType;
      }
    }

    for (let [key, value] of Object.entries(localObject)) {
      if (value) {
        var type = value.type;
        // console.log("Blockly", ` ${key}= ${value.componentType} ${type}`);
        if (value.componentType == "input") {
          if (key === "B34") {
            key.split("").forEach((char) => {
              if (char == "B") {
                [3, 4].forEach((number) => {
                  sensorsPort.push(char + number);
                  sensorsDevices.push(value.type);
                });
              }
            });
          } else {
            sensorsPort.push(key);
            sensorsDevices.push(value.type);
          }
        }

        if (type) {
          var port = key.toUpperCase();
          if (type == "ultrasonic_sensor") {
            var port = key.toUpperCase();
            portUltrasonic.push([port, port]);
            // console.log('portUltrasonic Blockly ', portUltrasonic)
          }

          Data.forEach((component) => {
            //Logic for Output devices
            if (component.type == type && component.color == "#15909d") {
              if (type == "servo_extender") {
                type = "servo_motor";
              }

              var devicesConnected = type.toUpperCase();

              if (port === "BC") {
                port.split("").forEach((char) => {
                  [1, 2, 3, 4].forEach((number) => {
                    portArray.push(char + number);
                  });
                });
              } else if (
                (port === "B12" || port === "C12") &&
                (devicesConnected == "4_CH_RELAY" ||
                  devicesConnected == "STEPPER_MOTOR")
              ) {
                port.split("").forEach((char) => {
                  if (char === "B" || char === "C") {
                    [1, 2, 3, 4].forEach((number) => {
                      portArray.push(char + number);
                    });
                  }
                });
              } else portArray.push(port);

              devicesConnectedArray.push(devicesConnected);
            } //Logic for Input devices
            else if (component.type == type && component.color == "#ff8c19") {
              var devicesConnected = type.toUpperCase();
              devicesInputArray.push(devicesConnected);

              if (port === "B34") {
                port.split("").forEach((char) => {
                  if (char == "B") {
                    [3, 4].forEach((number) => {
                      portInputArray.push(char + number);
                    });
                    devicesInputArray.push(devicesConnected);
                  }
                });
              } else {
                portInputArray.push(port);
              }
            }
          });
        }
      }
    }

    // console.log("swapnil raje", sensorsPort, sensorsDevices)

    // console.log("swapnil raje", devicesInputArray)
    var Allport = [
      "A1",
      "A2",
      "A3",
      "A4",
      "B1",
      "B2",
      "B3",
      "B4",
      "C1",
      "C2",
      "C3",
      "C4",
      "F1",
      "F2",
      "G1",
      "G2",
      "MOTOR1",
      "MOTOR2",
    ];
    var AllDevices = [
      "LED",
      "GEARED_MOTOR",
      "MINI_GEARED_MOTOR",
      "STEPPER_MOTOR",
      "SERVO_MOTOR",
      "SERVO_EXTENDER",
      "BEEPER",
      "LASER",
      "DOT_MATRIX",
      "MP3",
      ,
      "DUAL_SPLITTER",
      "OCTA_SPLITTER",
      "HUMIDITY_SENSOR",
      "METAL_DETECTOR",
      "COLOR_SENSOR",
      "HEARTBEAT_SENSOR",
      "ULTRASONIC_SENSOR",
      "HALL_SENSOR",
      "RFID",
      "DC_MOTOR",
      "7SEGMENT_DISPLAY",
      "7SEGMENT_DISPLAY",
      "RELAY",
      "4_CH_RELAY",
      "ELECTROMAGNET",
      "LED_STRIP",
      "LIGHT_SENSOR",
      "BEND_SENSOR",
      "GAS_SENSOR",
      "DISTANCE_SENSOR",
      "SOUND_SENSOR",
      "TEMPERATURE_SENSOR",
      "RAIN_SENSOR",
      "TACT_SWITCH",
      "DUAL_SWITCH",
      "TOUCH_SENSOR",
      "PIR_SENSOR",
      "JOYSTICK",
      "4_IN_1_SENSOR",
      "GYRO_SENSOR",
      "COMPASS",
      "ROTATIONAL_SENSOR",
      "ACCELEROMETER",
      "SOLAR_PANEL",
      "BATTERY",
      "GESTURE_SENSOR",
    ];

    var connectedPort = Allport.filter((e) => portArray.indexOf(e) !== -1);

    //Change name for Motor to M
    var index = connectedPort.indexOf("MOTOR1");
    if (index !== -1) {
      connectedPort[index] = "M1";
    }
    var index1 = connectedPort.indexOf("MOTOR2");
    if (index1 !== -1) {
      connectedPort[index1] = "M2";
    }

    var connectedDevicestoPort = AllDevices.filter(
      (e) => devicesConnectedArray.indexOf(e) !== -1
    );

    var sonsorsArray = [
      "HUMIDITY_SENSOR",
      "METAL_DETECTOR",
      "COLOR_SENSOR",
      "HEARTBEAT_SENSOR",
      "ULTRASONIC_SENSOR",
      "HALL_SENSOR",
      "RFID",
      "LIGHT_SENSOR",
      "BEND_SENSOR",
      "GAS_SENSOR",
      "DISTANCE_SENSOR",
      "SOUND_SENSOR",
      "TEMPERATURE_SENSOR",
      "RAIN_SENSOR",
      "TACT_SWITCH",
      "DUAL_SWITCH",
      "TOUCH_SENSOR",
      "PIR_SENSOR",
      "JOYSTICK",
      "4_IN_1_SENSOR",
      "ROTATIONAL_SENSOR",
    ];

    // connectedDevicestoPort = connectedDevicestoPort.filter((item) => !sonsorsArray.includes(item));
    // console.log('Filtered array from sensors : ', connectedDevicestoPort)

    // console.log('connectedDevicestoPort for xml :', connectedPort, connectedDevicestoPort.join());
    var length = connectedPort.length;

    /*---------------------------------------------------------------------------------------------*/

    var data = document.getElementById("xmlContent");
    data.style.display = "none";
    // console.log("XML change")

    var Ports = "";
    var specialAccessories,
      ultrasonic,
      RFID,
      SENSOR_4_in_1,
      logic_compare,
      Value_Logic;
    var cat_A, cat_B, cat_C, cat_F, cat_G, cat_M;
    var category = () => {
      /* PORTs*/
      if (true) {
        cat_A = "";

        cat_B = "";
        cat_C = "";
        cat_F = "";
        cat_G = "";
        cat_M = "";
        // console.log("PORT FUNCTION", connectedPort);

        for (let i = 0; i < length; i++)
          if (connectedPort[i].startsWith("A")) {
            var A = '<category name="A" colour="110">';
            if (cat_A === "") {
              cat_A = A;
            }
            cat_A += `<block type=${connectedPort[i]}></block>`;
          } else if (connectedPort[i].startsWith("B")) {
            var B = '<category name="B" colour="120">';
            if (cat_B === "") {
              cat_B = B;
            }
            cat_B += `<block type=${connectedPort[i]}></block>`;
          } else if (connectedPort[i].startsWith("C")) {
            var C = '<category name="C" colour="130">';
            if (cat_C === "") {
              cat_C = C;
            }
            cat_C += `<block type=${connectedPort[i]}></block>`;
          } else if (connectedPort[i].startsWith("F")) {
            var F = '<category name="F" colour="140">';
            if (cat_F === "") {
              cat_F = F;
            }
            cat_F += `<block type=${connectedPort[i]}></block>`;
          } else if (connectedPort[i].startsWith("G")) {
            var G = '<category name="G" colour="140">';
            if (cat_G === "") {
              cat_G = G;
            }
            cat_G += `<block type=${connectedPort[i]}></block>`;
          } else if (connectedPort[i].startsWith("M")) {
            // console.log("I AM MOTOR");
            var M = '<category name="M" colour="150">';
            if (cat_M === "") {
              cat_M = M;
            }
            cat_M += `<block type=${connectedPort[i]}></block>`;
          }

        cat_A += "</category>";
        cat_B += "</category>";
        cat_C += "</category>";
        cat_F += "</category>";
        cat_G += "</category>";
        cat_M += "</category>";

        if (cat_A !== "</category>") {
          Ports = Ports + cat_A;
        }
        if (cat_B !== "</category>") {
          Ports = Ports + cat_B;
        }
        if (cat_C !== "</category>") {
          Ports = Ports + cat_C;
        }
        if (cat_F !== "</category>") {
          Ports = Ports + cat_F;
        }
        if (cat_G !== "</category>") {
          Ports = Ports + cat_G;
        }
        if (cat_M !== "</category>") {
          Ports = Ports + cat_M;
        }
      }

      return Ports;
    };
    category();
    // console.log('RENDER swapnil::::', cat_A)

    /****************************** Special Accessories******************************************************/

    function specialAcc() {
      var specialAcc = '<category name="Special Accessories" colour="180">';

      if (connectedDevicestoPort.includes("DOT_MATRIX")) {
        specialAcc += '<block type="Dot_Matrix"></block>';
      }
      if (connectedDevicestoPort.includes("MP3")) {
        specialAcc += '<block type="MP3"></block>';
      }
      specialAcc += "</category>";
      specialAccessories = specialAcc;
      return specialAccessories;
    }

    if (
      connectedDevicestoPort.includes("DOT_MATRIX") ||
      connectedDevicestoPort.includes("MP3")
    ) {
      specialAcc();
    }

    /********************************DECISION ******************** */

    RFID = () => {
      RFID = "";
      if (devicesInputArray.includes("RFID")) {
        RFID += ' <block type="RFID"></block>  ';
      }

      return RFID;
    };

    RFID();

    ultrasonic = () => {
      ultrasonic = "";
      if (devicesInputArray.includes("ULTRASONIC_SENSOR")) {
        // for (let i; i <= portUltrasonic.length; i++) {
        ultrasonic += '<block type="ultrasonic"></block>  ';

        // }

        return ultrasonic;
      }
    };

    ultrasonic();

    SENSOR_4_in_1 = () => {
      SENSOR_4_in_1 = "";
      if (devicesInputArray.includes("4_IN_1_SENSOR")) {
        SENSOR_4_in_1 += ' <block type="4in1"></block>  ';
      }
      return SENSOR_4_in_1;
    };
    SENSOR_4_in_1();

    logic_compare = () => {
      logic_compare = ` `;
      for (let i = 0; i < sensorsPort.length; i++) {
        if (
          sensorsDevices[i] === "rfid" ||
          sensorsDevices[i] === "ultrasonic_sensor" ||
          sensorsDevices[i] === "4_in_1_sensor"
        ) {
          console.log("SENSOT", sensorsDevices[i]);
        } else logic_compare += `<block type= 'logic_compare ${i}'}></block> `;

        // if(sensorsDevices[i]==="JOYSTICK"){
        //   logic_compare += `<block type= 'logic_compare ${i}'}></block> `
        // }

        // console.log('logic_compare', logic_compare)
      }

      // console.log("HTMLLLLLLL", logic_compare)

      return logic_compare;
    };

    logic_compare();

    Value_Logic = () => {
      // <category name="Value/Logic" colour="240">
      //   <block type="value"></block>
      //   <block type="logic"></block>
      //   <block type="matrix_input"></block>
      // </category>

      Value_Logic =
        '<category name="Value/Logic" colour="240">  <block type="value"></block> <block type="logic"></block>';
      if (connectedDevicestoPort.includes("DOT_MATRIX")) {
        Value_Logic += ' <block type="matrix_input"></block> ';
      }

      Value_Logic += " </category> ";

      return Value_Logic;
    };

    Value_Logic();

    /************************************** XML RENDERING *************************************** */

    var start =
      '<category name="Start/End" colour="200" > <block type="start"></block>  <block type="end"></block> </category>';
    var data1 = start.toString();

    var value = `<xml id="toolbox"  > 
          ${start}
          <category name="Ports" colour="100">
            ${Ports}  
          
          </category>
         ${specialAccessories}
          <category name="Variables" colour="180">
            <block type="BiCounter"></block>
            <block type="BiFlag"></block>
            <block type="BiData"></block>
            <block type="IOT"></block>
          </category>
          ${Value_Logic}
          <category name="Wait" colour="280">
            <block type="wait"></block>
          </category>
          <category name="Decision" colour="300">
            <block type="if_do"></block>
            ${logic_compare}
             ${ultrasonic}
            ${RFID}
             ${SENSOR_4_in_1}
        
        
             
             
            <block type="Bivariable"></block>
            <block type="IOTinput"></block>

          </category>
          <category name="Loop" colour="340">
            <block type="repeat"></block>
          </category></xml>`;

    // ${ultrasonic}
    // ${RFID}
    // ${SENSOR_4_in_1}

    //             <block type="val"></block>

    {
      /*    
      <category name="Ports" colour="240"> 
        <category name="A" colour="110">
          <block type="A1"></block>  
         <block type="A4"></block>
           <block type="A3"></block>
          <block type="A4"></block>  
         </category>
         <category name="B" colour="120">
          <block type="B1"></block>
          <block type="B2"></block>
          <block type="B3"></block>
          <block type="B4"></block>
        </category>
        <category name="C" colour="130">
          <block type="C1"></block>
          <block type="C2"></block>
          <block type="C3"></block>
          <block type="C4"></block>
        </category>
        <category name="F" colour="140">
          <block type="F1"></block>
          <block type="F2"></block>
        </category>
        <category name="G" colour="150">
          <block type="G1"></block>
          <block type="G2"></block>
        </category>
        <category name="Motor" colour="160">
          <block type="M1"></block>
          <block type="M2"></block> 
        </category> 
      </category>
      <category name="Special Accessories" colour="180">
        <block type="Dot_Matrix"></block>
        <block type="MP3"></block> 
      </category>
      <category name="Variables" colour="180">
          <block type="BiCounter"></block>
          <block type="BiFlag"></block>
          <block type="BiData"></block>
          <block type="IOT"></block>
        </category>		
      <category name="Value/Logic" colour="240">
        <block type="value"></block>
        <block type="logic"></block>
        <block type="matrix_input"></block> 
        <block type="val"></block> 
      </category>
      <category name="Wait" colour="280">	
        <block type="wait"></block>
      </category>
      <category name="Decision" colour="300">
        <block type="if_do"></block>
        <block type="logic_compare"></block>
        <block type="RFID"></block>
        <block type="ultrasonic"></block>
        <block type="4in1"></block>
        <block type="Bivariable"></block>
        <block type="IOTinput"></block>
    
      </category>
      <category name="Loop" colour="340">
      <block type="repeat"></block>
      </category>
    
    
    </xml>  */
    }

    // console.log("value", value);
    data.innerHTML = data.innerHTML + value; // Append the text to <li>

    // document.getElementById('xmlContent').appendChild(data)
    // document.getElementById("xmlContent")=value;
    // console.log(document.getElementById('xmlContent'));
  },
  getInitialState: function () {
    return { match: false };
  },
  componentWillMount: function () {
    // console.log("componentDidMount================>");
    this.xmlChange();
  },
  componentWillUnmount: function () {
    // console.log("componentDidMount================>");
    // this.xmlChange();
    // $('#toolbox').remove()
  },

  render: function () {
    // {
    //   console.log("codehere", document.getElementById("codehere2"));
    // }

    // {
    //   console.log("codehere", document.getElementById("codehere1"));
    // }
    // {
    //   console.log("codehere", document.getElementById("codehere"));
    // }

    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid" style={{ display: "none" }}>
            <a className="navbar-brand" href="#">
              <img
                src="images/logo.png"
                alt="Logo"
                style={{ width: "35px", display: "none" }}
              />
            </a>
            <div className="navbar-header">
              <a
                className="navbar-brand"
                style={{ color: "whitesmoke", display: "none" }}
                href="#"
              >
                Bibox-Scratch
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <img
                src="images/save_button.png"
                onClick={this.savef}
                className="img-rounded"
                alt="Cinque Terre"
              />
              {/* <img src="images/save_button.png" onClick={this.loada} className="img-rounded" alt="Cinque Terre" /> */}
              <div
                className="fileUpload btn btn-primary"
                style={{ display: "none" }}
              >
                <span>Upload</span>
                <input type="file" className="upload" id="loadfile" />
              </div>
              <form
                action="/"
                method="POST"
                style={{ display: "inline" }}
                onsubmit="checkend(event)"
              >
                <input type="hidden" id="text" name="code" />
                <div
                  className="fileUpload btn btn-primary"
                  style={{ display: "none" }}
                >
                  <span>Submit</span>
                  <input type="submit" className="upload" />
                </div>
              </form>
            </ul>
          </div>
        </nav>
        <p id="codehere"></p>
        <div id="blocklyDiv" style={{ height: "600px", width: "100%" }}></div>
        <p id="codehere1"></p>
        <p id="codehere2"></p>
      </div>
    );
  },
});

module.exports = Blockly;

// class  extends Component {
//     state = {  }
//     render() {
//         return (  );
//     }
// }

// export default ;
