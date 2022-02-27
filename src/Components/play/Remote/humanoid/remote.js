import React, { Component } from "react";

import "./remote.css";
import { Link } from "react-router-dom";

import io from "socket.io-client";
import Modal from "react-modal";
import {
  autoLightSrc,
  buttonBackSrc,
  buttonColorrecogSrc,
  buttonExitSrc,
  buttonGestureSrc,
  buttonProximitySrc,
  humanoidAttentionSrc,
  humanoidBowSrc,
  humanoidDanceSrc,
  humanoidSaluteSrc,
  joystickBGSrc,
  joystickSrc,
  humanoidPushup,
  humanoidSquat,
} from "../../../../source/source";

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
  },
};
const socket = io("http://localhost:3008");

Math.degrees = function (radians) {
  return (radians * 180) / Math.PI;
};
let newconn;
let Peripherial;
class HumanoidRemote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detected: false,
      usbOpen: false,
    };

    //
    //socket.emit('/scanDevice');

    this.myRef = React.createRef();
    this.dragStart = null;
  }
  componentDidMount = () => {
    this.stick = this.myRef;

    Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
    this.stick.current.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );

    document.addEventListener("mousemove", this.handleMouseMove.bind(this));

    document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    socket.emit("_usbDetection", "Hi");

    socket.on("/usbDetection", (data) => {
      console.log("...............0", data);
      this.setState({ detected: data.detected, usbOpen: !data.detected });
    });

    newconn = sessionStorage.getItem("connectionMode");
    console.log(newconn, "newconn");
  };

  handleMouseDown(event) {
    console.log("JOYSTICK handleMouseDown");

    if (event.changedTouches) {
      this.dragStart = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      };
      return;
    }
    this.dragStart = {
      x: event.clientX,
      y: event.clientY,
    };

    console.log(this.dragStart, "dragStrt");
  }

  handleMouseMove(event) {
    console.log("JOYSTICK handleMouseMove");

    if (this.dragStart === null) return;

    if (event.changedTouches) {
      event.clientX = event.changedTouches[0].clientX;
      event.clientY = event.changedTouches[0].clientY;
    }

    console.log(event.clientX, event.clientY);
    const xDiff = event.clientX - this.dragStart.x;
    const yDiff = event.clientY - this.dragStart.y;

    const angle = Math.atan2(yDiff, xDiff);
    const degrees = angle * -57;
    const distance = Math.min(50, Math.hypot(xDiff, yDiff));

    console.log("angle", angle);
    console.log("degrees", degrees);
    console.log("distance", distance);

    const xNew = distance * Math.cos(angle);
    const yNew = distance * Math.sin(angle);

    console.log("xNew:", xNew, " yNew", yNew);

    // moveing the stick
    this.stick.current.style.transform = `translate(${xNew}px, ${yNew}px)`;

    event.preventDefault();

    // Get the distance between the cursor and the center
    const distanceOld = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    this.stick.current.style.transform = `translate3d(${xNew}px, ${yNew}px, 0px)`;
    this.currentPos = { x: xNew, y: yNew };

    // console.log('position: ', this.currentPos);

    // //------------------- Calling Sockets on directions-------------------

    //4-directions F,L,R,B

    // FORWARD
    if (degrees < 120 && degrees > 20) {
      // this.stick.current.style.backgroundColor = "red";
      console.log("JOYSTICKM FORWARD");
      this.forwardJoyStick();
    }
    // LEFT
    else if (degrees > 120 && degrees > -150) {
      this.leftJoyStick();
      console.log("JOYSTICKM LEFT");
      // this.stick.current.style.backgroundColor = "green";
    }
    // BACKWARD
    else if (degrees > -150 && degrees < -60) {
      this.backwordJoyStick();
      console.log("JOYSTICKM BACKWARD");
      // this.stick.current.style.backgroundColor = "blue";
    }
    // RIGHT
    else if (degrees > -60 && degrees < 20) {
      console.log("JOYSTICKM RIGHT");
      this.rightJoyStick();
      // this.stick.current.style.backgroundColor = "black";
    }

    var speed;

    // 8-directions F,FL,FR, B,BL,BR, R,L
    // if (degrees < 3 && degrees > -3) {
    //   this.stick.current.style.backgroundColor = "red";
    //   console.log("3 deg");

    //   if (xDir > 10 && xDir < 20) {
    //     speed = 50;
    //     this.rightJoy(speed);
    //     // console.log('right ', xDir, "speed", speed);
    //   } else if (xDir > 20 && xDir < 30) {
    //     speed = 125;
    //     this.rightJoy(speed);

    //     // console.log('right ', xDir, "speed", speed);
    //   } else if (xDir > 30 && xDir < 40) {
    //     speed = 200;
    //     this.rightJoy(speed);

    //     // console.log('right ', xDir, "speed", speed);
    //   } else if (xDir > 40 && xDir < 51) {
    //     speed = 255;
    //     this.rightJoy(speed);

    //     // console.log('right ', xDir, "speed", speed);
    //   }
    // } else if (degrees > 40 && degrees < 50) {
    //   console.log("40 deg");

    //   // this.stick.current.style.backgroundColor = "yellow";
    //   let xDir = this.currentPos.x;
    //   let yDir = this.currentPos.y;

    //   if (xDir > 0 && xDir < 8) {
    //     speed = 50;
    //     this.forwardRightJoy(speed);
    //     // console.log('upper right ', xDir, "speed", speed);
    //   } else if (xDir > 8 && xDir < 16) {
    //     speed = 125;
    //     this.forwardRightJoy(speed);

    //     // console.log('upper right ', xDir, "speed", speed);
    //   } else if (xDir > 16 && xDir < 24) {
    //     speed = 200;
    //     this.forwardRightJoy(speed);

    //     // console.log('upper right ', xDir, "speed", speed);
    //   } else if (xDir > 24 && xDir < 40) {
    //     speed = 255;
    //     this.forwardRightJoy(speed);

    //     // console.log('upper right ', xDir, "speed", speed);
    //   }
    //   // console.log('upper right', degrees)
    // } else if (degrees > 85 && degrees < 95) {
    //   console.log("85deg");

    //   // this.stick.current.style.backgroundColor = "green";
    //   let yDir = this.currentPos.y;
    //   // console.log('up ', yDir);
    //   if (yDir < -10 && yDir > -20) {
    //     speed = 50;
    //     this.forwardJoy(speed);

    //     // console.log('up ', speed);
    //   } else if (yDir < -20 && yDir > -30) {
    //     speed = 125;
    //     this.forwardJoy(speed);

    //     // console.log('up ', speed);
    //   } else if (yDir < -30 && yDir > -40) {
    //     speed = 200;
    //     this.forwardJoy(speed);

    //     // console.log('up ', speed);
    //   } else if (yDir < -40 && yDir > -51) {
    //     speed = 255;
    //     this.forwardJoy(speed);
    //     // console.log('up ', speed);
    //   }
    // } else if (degrees > 140 && degrees < 150) {
    //   console.log("140deg");

    //   // this.stick.current.style.backgroundColor = "skyblue";
    //   let xDir = this.currentPos.x;
    //   let yDir = this.currentPos.y;
    //   // console.log('up left ', xDir, yDir);

    //   if (xDir < -9 && xDir > -18) {
    //     speed = 50;
    //     this.forwardLeftJoy(speed);
    //     // console.log('up left', speed);
    //   } else if (xDir < -18 && xDir > -27) {
    //     speed = 125;
    //     this.forwardLeftJoy(speed);

    //     // console.log('up left', speed);
    //   } else if (xDir < -27 && xDir > -36) {
    //     speed = 200;
    //     this.forwardLeftJoy(speed);

    //     // console.log('up left', speed);
    //   } else if (xDir < -36 && xDir > -51) {
    //     speed = 255;
    //     this.forwardLeftJoy(speed);
    //     // console.log('up left', speed);
    //   }
    // } else if (degrees > 175) {
    //   console.log("175deg");

    //   // this.stick.current.style.backgroundColor = "#91c788";
    //   // console.log('left', degrees)
    //   var xDir = this.currentPos.x;
    //   var yDir = this.currentPos.y;

    //   if (xDir < -10 && xDir > -20) {
    //     speed = 50;
    //     this.leftJoy(speed);

    //     // console.log('left ', speed);
    //   } else if (xDir < -20 && xDir > -30) {
    //     speed = 125;
    //     this.leftJoy(speed);

    //     // console.log('left ', speed);
    //   } else if (xDir < -30 && xDir > -40) {
    //     speed = 200;
    //     this.leftJoy(speed);

    //     // console.log('left ', speed);
    //   } else if (xDir < -40 && xDir > -51) {
    //     speed = 255;
    //     this.leftJoy(speed);

    //     // console.log('left ', speed);
    //   }

    //   // console.log('left ', xDir, yDir);
    // } else if (degrees < -140 && degrees > -150) {
    //   console.log("-140deg");

    //   // this.stick.current.style.backgroundColor = "black";
    //   var xDir = this.currentPos.x;
    //   var yDir = this.currentPos.y;
    //   // console.log('Down left ' , xDir, yDir);

    //   if (yDir > 0 && yDir < 8) {
    //     speed = 50;
    //     this.backwardLeftJoy(speed);

    //     // console.log('Down left ', "speed", speed);
    //   } else if (yDir > 8 && yDir < 16) {
    //     speed = 125;
    //     this.backwardLeftJoy(speed);

    //     // console.log('Down left ', "speed", speed);
    //   } else if (yDir > 16 && yDir < 24) {
    //     speed = 200;
    //     this.backwardLeftJoy(speed);

    //     // console.log('Down left ', "speed", speed);
    //   } else if (yDir > 24 && yDir < 40) {
    //     speed = 255;
    //     this.backwardLeftJoy(speed);

    //     // console.log('Down left', "speed", speed);
    //   }
    // } else if (degrees < -85 && degrees > -95) {
    //   console.log("-85deg");

    //   // this.stick.current.style.backgroundColor = "orange";

    //   var xDir = this.currentPos.x;
    //   var yDir = this.currentPos.y;
    //   // console.log('Down  ', xDir, yDir);
    //   // console.log('down ', degrees)
    //   if (yDir > 10 && yDir < 20) {
    //     speed = 50;
    //     this.backwardJoy(speed);
    //     // console.log('Down ', "speed", speed);
    //   } else if (yDir > 20 && yDir < 30) {
    //     speed = 125;
    //     this.backwardJoy(speed);

    //     // console.log('Down ', "speed", speed);
    //   } else if (yDir > 30 && yDir < 40) {
    //     speed = 200;
    //     this.backwardJoy(speed);

    //     // console.log('Down ', "speed", speed);
    //   } else if (yDir > 40 && yDir < 51) {
    //     speed = 255;
    //     this.backwardJoy(speed);

    //     // console.log('Down ', "speed", speed);
    //   }
    // } else if (degrees < -40 && degrees > -50) {
    //   console.log("-40deg");

    //   // this.stick.current.style.backgroundColor = "#845460";
    //   var xDir = this.currentPos.x;
    //   var yDir = this.currentPos.y;
    //   // console.log('Down right ', xDir, yDir);
    //   // console.log('down right', degrees)

    //   if (yDir > 0 && yDir < 8) {
    //     speed = 50;
    //     this.backwardRightJoy(speed);
    //     // console.log('Down right ', "speed", speed);
    //   } else if (yDir > 8 && yDir < 16) {
    //     speed = 125;
    //     this.backwardRightJoy(speed);

    //     // console.log('Down right ', "speed", speed);
    //   } else if (yDir > 16 && yDir < 24) {
    //     speed = 200;
    //     this.backwardRightJoy(speed);

    //     // console.log('Down right ', "speed", speed);
    //   } else if (yDir > 24 && yDir < 40) {
    //     speed = 255;
    //     this.backwardRightJoy(speed);

    //     // console.log('Down right', "speed", speed);
    //   }
    // }
  }

  handleMouseUp(event) {
    console.log("JOYSTICK handleMouseUp");

    if (this.dragStart === null) return;

    this.stick.current.style.transition = ".2s";

    this.stick.current.style.transform = `translate3d(0px, 0px, 0px)`;

    this.dragStart = null;

    //------------------- Calling Sockets on directions-------------------

    //     var xDir = this.currentPos.x;
    //     var yDir = this.currentPos.y;

    //     if (((xDir > -9) && (yDir < -49.5)) || ((xDir < 9) && (yDir < -49.5))) {
    //         console.log("up")
    //         this.forwardJoy()
    //     }
    //     else if ((xDir < -48 && yDir < -10) || (xDir < -48 && yDir < 10)) {
    //         console.log("left")
    //         this.leftJoy();

    //     } else if (((xDir < 6) && (yDir > 48.3)) || ((xDir < -6) && (yDir > 48.3))) {
    //         console.log("down");
    //         this.backwardJoy();
    //     } else if (((xDir > 48) && (yDir < -10)) || ((xDir > 48) && (yDir < 10))) {
    //         console.log("right");
    //         this.rightJoy()
    //     }

    //     this.currentPos = { x: 0, y: 0 };
    // }
  }

  rightJoyStick = () => {
    let data = ["R".charCodeAt(), "r".charCodeAt(), "r".charCodeAt(), 0];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting rightJoy ", data, Peripherial);
  };
  leftJoyStick = () => {
    let data = ["R".charCodeAt(), "l".charCodeAt(), "l".charCodeAt(), 0];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting rightJoy ", data, Peripherial);
  };
  forwardJoyStick = () => {
    let data = ["R".charCodeAt(), "u".charCodeAt(), "u".charCodeAt(), 0];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting rightJoy ", data, Peripherial);
  };

  backwordJoyStick = () => {
    let data = ["R".charCodeAt(), "d".charCodeAt(), "d".charCodeAt(), 0];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting rightJoy ", data, Peripherial);
  };

  leftJoy = (speed) => {
    // console.log("leftJoy");

    let data = ["R".charCodeAt(), "l".charCodeAt(), "l".charCodeAt(), speed];
    console.log("emiiting leftjoy ", data);
    socket.emit("/remote", data);

    socket.emit("/remote", data, Peripherial);
  };

  rightJoy = (speed) => {
    // console.log("right");

    let data = ["R".charCodeAt(), "r".charCodeAt(), "r".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting rightJoy ", data, Peripherial);
  };

  forwardJoy = (speed) => {
    let data = ["R".charCodeAt(), "u".charCodeAt(), "u".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting Forwardjoy ", data, Peripherial);
  };
  backwardJoy = (speed) => {
    let data = ["R".charCodeAt(), "d".charCodeAt(), "d".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting backwardJoy ", data, Peripherial);
  };

  forwardLeftJoy = (speed) => {
    // console.log("forward");
    let data = ["R".charCodeAt(), "u".charCodeAt(), "l".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting forwardLeftJoy ", data, Peripherial);
  };
  forwardRightJoy = (speed) => {
    // console.log("forward");
    let data = ["R".charCodeAt(), "u".charCodeAt(), "r".charCodeAt(), speed];

    console.log("SPEED", speed);

    console.log("data Remote", data);

    socket.emit("/remote", data, Peripherial);
    console.log("emiiting forwardRightJoy ", data, Peripherial);
  };
  backwardLeftJoy = (speed) => {
    // console.log("backward");
    let data = ["R".charCodeAt(), "d".charCodeAt(), "l".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting backwardLeftJoy ", data);
  };
  backwardRightJoy = (speed) => {
    // console.log("backward");
    let data = ["R".charCodeAt(), "d".charCodeAt(), "r".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting backwardRightJoy ", data);
  };

  //------------- Remote Modes--------------------------
  // Follow Me mode
  followMeClick = () => {
    // console.log("followMeclick");
    let data = ["R".charCodeAt(), "f".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };
  // smart mode
  smartClick = () => {
    // console.log("Smart click");
    let data = ["R".charCodeAt(), "a".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };
  // disco mode
  discoClick = () => {
    // console.log("Disco click");
    let data = ["R".charCodeAt(), "l".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };
  // follow line mode

  followLineClick = () => {
    // console.log("Follow Line click");
    let data = ["R".charCodeAt(), "g".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };
  // ----------------Special Mode
  // Horn click

  pushUpClick = () => {
    console.log("pushup Click ..HUMENOID");
    let data = ["R".charCodeAt(), "a".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };

  squatClick = () => {
    console.log("pushup Click ..HUMENOID");
    let data = ["R".charCodeAt(), "e".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };

  bowClick = () => {
    console.log("Horn Click ..HUMENOID");
    let data = ["R".charCodeAt(), "h".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };
  // Light
  attentionClick = () => {
    // console.log("Light click");
    let data = ["R".charCodeAt(), "b".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };

  // Spin
  saluteClick = () => {
    // console.log("Spin click");
    let data = ["R".charCodeAt(), "s".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };

  danceClick = () => {
    // console.log("Spin click");
    let data = ["R".charCodeAt(), "d".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };

  closeUsb = () => {
    this.setState({ usbOpen: false });
  };

  render() {
    if (this.state.detected == true) {
      if (newconn === "USB") {
        var imageURL = "images/Learn/ble_connection.png";
      } else {
        var imageURL = "images/header/bluetooth_active.png";
      }
    } else {
      // if(newconn === 'BLUETOOTH'){
      //     imageURL = "images/Learn/ble_disconnection.png"
      // }else{
      //     imageURL = "images/header/bluetooth_inactive.png"
      // }
      if (newconn === "BLUETOOTH") {
        var imageURL = "images/header/bluetooth_active.png";
      }
      imageURL = "images/Learn/ble_disconnection.png";
    }

    var usbDetectionModel = (
      <Modal isOpen={this.state.usbOpen} style={customStyles}>
        <img
          onClick={this.closeUsb}
          className="closeconceptModal"
          alt="7"
          src={buttonExitSrc}
        ></img>
        <div className="connectconceptMsg">
          <p>Device not connected..</p>
          <button>
            {" "}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/biboxSelection"
            >
              Reconnect
            </Link>
          </button>
        </div>
      </Modal>
    );
    return (
      <div className="play-introduction">
        {/* <Link to="/introduction">
                    <div className="backBtn"  style={{backgroundImage: `url(${buttonBackSrc})`}}></div>

                </Link>
                <div>
                    <p className="Playtitle">Remote</p>
                </div> */}

        <Link to="/introduction">
          <div>
            <img
              src="images/Learn/login_button_back.png"
              style={{
                zIndex: "1",
                height: "39px",
                width: "39px",
                float: "left",
                position: "absolute",
                left: "1.6vw",
                top: "2.2vh",
              }}
            ></img>
            <div
              style={{
                height: "30px",
                width: "168px",
                position: "absolute",
                /* display: inline-block, */
                float: "left",
                left: "3%",
                top: "2.5%",
                border: "2px solid #100a5e",
                borderRadius: "10px 50px 50px 10px",
                textAlign: "center",
                color: "#2c258a",
                fontSize: "large",
              }}
            >
              <span style={{ position: "relative", left: "0%", top: "7%" }}>
                REMOTE
              </span>
            </div>
          </div>
        </Link>

        {/* <div className="help click"></div> */}
        {/* <div className="usb "></div> */}
        {usbDetectionModel}
        <div className="usb">
          <img
            style={{ height: "40px", width: "35px" }}
            src={imageURL}
            alt="85"
          />
        </div>

        <div className="Remote-Keys">
          <div className="joystickDiv">
            <div
              id="joystick"
              style={{ backgroundImage: `url(${joystickBGSrc})` }}
            >
              <div
                id="stick"
                ref={this.myRef}
                className="click"
                style={{ backgroundImage: `url(${joystickSrc})` }}
              >
                {" "}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="Remote-Mode">
          <div className="Follow-me-div">
            <div
              className="follow-me click"
              onClick={this.followMeClick}
              style={{ backgroundImage: `url(${buttonProximitySrc})` }}
            ></div>
            <p className="Remote-mode-text">Follow Me Mode</p>
          </div>

          <div className="Smart-div">
            <div
              className="smart click"
              onClick={this.smartClick}
              style={{ backgroundImage: `url(${buttonColorrecogSrc})` }}
            ></div>
            <p className="Remote-mode-text">Smart Mode</p>
          </div>
          <div className="disco-div">
            <div
              className="disco click"
              onClick={this.discoClick}
              style={{ backgroundImage: `url(${autoLightSrc})` }}
            ></div>
            <p className="Remote-mode-text">Fight Mode</p>
          </div>
          <div className="follow-line-div">
            <div
              className="follow-line click"
              onClick={this.followLineClick}
              style={{ backgroundImage: `url(${buttonGestureSrc})` }}
            ></div>
            <p className="Remote-mode-text follow-line-text">
              Follow Line Mode
            </p>
          </div>
        </div> */}

        <div className="Remote-unique">
          <div className="push-div">
            <div
              className="push click"
              onClick={this.pushUpClick}
              style={{ backgroundImage: `url(${humanoidPushup})` }}
            ></div>
            <p className="remote-unique-text-H">Push-up</p>
          </div>

          <div className="squat-div">
            <div
              className="squat click"
              onClick={this.squatClick}
              style={{ backgroundImage: `url(${humanoidSquat})` }}
            ></div>
            <p className="remote-unique-text-H ">Squats</p>
          </div>

          <div className="bow-div">
            <div
              className="bow click"
              onClick={this.bowClick}
              style={{ backgroundImage: `url(${humanoidBowSrc})` }}
            ></div>
            <p className="remote-unique-text-H ">Bow</p>
          </div>
          <div className="attention-div">
            <div
              className="attention click"
              onClick={this.attentionClick}
              style={{ backgroundImage: `url(${humanoidAttentionSrc})` }}
            ></div>
            <p className="remote-unique-text-H ">Attention</p>
          </div>
          <div className="salute-div">
            <div
              className="salute click"
              onClick={this.saluteClick}
              style={{ backgroundImage: `url(${humanoidSaluteSrc})` }}
            ></div>
            <p className="remote-unique-text-H ">Salute</p>
          </div>
          <div className="dance-div">
            <div
              className="dance click"
              onClick={this.danceClick}
              style={{ backgroundImage: `url(${humanoidDanceSrc})` }}
            ></div>
            <p className="remote-unique-text-H ">Dance</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HumanoidRemote;
