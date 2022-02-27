import React, { Component } from "react";

import "./remote.css";
import { Link } from "react-router-dom";

import io from "socket.io-client";
import Modal from "react-modal";
import {
  buttonAce1Src,
  buttonAce2Src,
  buttonAce3Src,
  buttonGestureSrc,
  autoLightSrc,
  buttonColorrecogSrc,
  buttonProximitySrc,
  joystickBGSrc,
  joystickSrc,
  buttonExitSrc,
  buttonBackSrc,
} from "../../../../source/source";
var setTime = 0;

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
var Peripherial;

Math.degrees = function (radians) {
  return (radians * 180) / Math.PI;
};

class RemotePage extends Component {
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

    this.stick.current.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));

    socket.emit("_usbDetection", "Hi");
    socket.on("/usbDetection", (data) => {
      console.log("...............0", data);
      this.setState({ detected: data.detected, usbOpen: !data.detected });
    });
  };

  handleMouseDown(event) {
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
  }

  handleMouseMove(event) {
    if (this.dragStart === null) return;
    // console.log("YESSSSSSSSSSS...");
    if (event.changedTouches) {
      event.clientX = event.changedTouches[0].clientX;
      event.clientY = event.changedTouches[0].clientY;
    }

    const xDiff = event.clientX - this.dragStart.x;
    const yDiff = event.clientY - this.dragStart.y;

    const angle = Math.atan2(yDiff, xDiff);
    const degrees = angle * -57;

    const distance = Math.min(50, Math.hypot(xDiff, yDiff));

    const xNew = distance * Math.cos(angle);
    const yNew = distance * Math.sin(angle);

    // console.log("Degree:", degrees);

    this.stick.current.style.transform = `translate(${xNew}px, ${yNew}px)`;

    event.preventDefault();

    // Get the distance between the cursor and the center
    const distanceOld = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    this.stick.current.style.transform = `translate3d(${xNew}px, ${yNew}px, 0px)`;
    this.currentPos = { x: xNew, y: yNew };

    // console.log('position: ', this.currentPos);

    // //------------------- Calling Sockets on directions-------------------

    var speed;
    // console.log("Degreeeeee",degrees);
    if (degrees < 3 && degrees > -3) {
      let xDir = this.currentPos.x;
      let yDir = this.currentPos.y;
      console.log("xDirrrrr", xDir);

      if (xDir > 10 && xDir < 20) {
        speed = 50;
        setTime += 1000;
        console.log("Timeeeeee", setTime);
        setTimeout(() => {
          this.rightJoy(speed);
        }, setTime);
        // console.log('right ', xDir, "speed", speed);
      } else if (xDir > 20 && xDir < 30) {
        speed = 125;
        console.log("Timeeeeee", setTime);
        setTime += 1000;

        setTimeout(() => {
          this.rightJoy(speed);
        }, setTime);

        // console.log('right ', xDir, "speed", speed);
      } else if (xDir > 30 && xDir < 40) {
        speed = 200;
        setTime += 1000;

        console.log("Timeeeeee", setTime);

        setTimeout(() => {
          this.rightJoy(speed);
        }, setTime);

        // console.log('right ', xDir, "speed", speed);
      } else if (xDir > 40 && xDir < 51) {
        speed = 255;
        setTime += 1000;

        console.log("Timeeeeee", setTime);

        setTimeout(() => {
          this.rightJoy(speed);
        }, setTime);

        // console.log('right ', xDir, "speed", speed);
      }
    } else if (degrees > 40 && degrees < 50) {
      let xDir = this.currentPos.x;
      let yDir = this.currentPos.y;

      if (xDir > 0 && xDir < 8) {
        speed = 50;
        setTime += 1000;
        setTimeout(() => {
          this.forwardRightJoy(speed);
        }, setTime);
        // console.log('upper right ', xDir, "speed", speed);
      } else if (xDir > 8 && xDir < 16) {
        speed = 125;
        setTime += 1000;

        setTimeout(() => {
          this.forwardRightJoy(speed);
        }, setTime);

        // console.log('upper right ', xDir, "speed", speed);
      } else if (xDir > 16 && xDir < 24) {
        speed = 200;
        setTime += 1000;

        setTimeout(() => {
          this.forwardRightJoy(speed);
        }, setTime);

        // console.log('upper right ', xDir, "speed", speed);
      } else if (xDir > 24 && xDir < 40) {
        speed = 255;
        setTime += 1000;

        setTimeout(() => {
          this.forwardRightJoy(speed);
        }, setTime);

        // console.log('upper right ', xDir, "speed", speed);
      }
      // console.log('upper right', degrees)
    } else if (degrees > 85 && degrees < 95) {
      let yDir = this.currentPos.y;
      // console.log('up ', yDir);
      if (yDir < -10 && yDir > -20) {
        speed = 50;
        setTime += 1000;

        setTimeout(() => {
          this.forwardJoy(speed);
        }, setTime);

        // console.log('up ', speed);
      } else if (yDir < -20 && yDir > -30) {
        speed = 125;
        setTime += 1000;

        setTimeout(() => {
          this.forwardJoy(speed);
        }, setTime);

        // console.log('up ', speed);
      } else if (yDir < -30 && yDir > -40) {
        speed = 200;
        setTime += 1000;

        setTimeout(() => {
          this.forwardJoy(speed);
        }, setTime);

        // console.log('up ', speed);
      } else if (yDir < -40 && yDir > -51) {
        speed = 255;
        setTime += 1000;

        setTimeout(() => {
          this.forwardJoy(speed);
        }, setTime);
        // console.log('up ', speed);
      }
    } else if (degrees > 140 && degrees < 150) {
      let xDir = this.currentPos.x;
      let yDir = this.currentPos.y;
      // console.log('up left ', xDir, yDir);

      if (xDir < -9 && xDir > -18) {
        speed = 50;
        setTime += 1000;

        setTimeout(() => {
          this.forwardLeftJoy(speed);
        }, setTime);
        // console.log('up left', speed);
      } else if (xDir < -18 && xDir > -27) {
        speed = 125;
        setTime += 1000;

        setTimeout(() => {
          this.forwardLeftJoy(speed);
        }, setTime);

        // console.log('up left', speed);
      } else if (xDir < -27 && xDir > -36) {
        speed = 200;
        setTime += 1000;

        setTimeout(() => {
          this.forwardLeftJoy(speed);
        }, setTime);

        // console.log('up left', speed);
      } else if (xDir < -36 && xDir > -51) {
        speed = 255;
        setTime += 1000;

        setTimeout(() => {
          this.forwardLeftJoy(speed);
        }, setTime);
        // console.log('up left', speed);
      }
    } else if (degrees > 175) {
      // console.log('left', degrees)
      var xDir = this.currentPos.x;
      var yDir = this.currentPos.y;

      if (xDir < -10 && xDir > -20) {
        speed = 50;
        setTime += 1000;

        setTimeout(() => {
          this.leftJoy(speed);
        }, setTime);

        // console.log('left ', speed);
      } else if (xDir < -20 && xDir > -30) {
        speed = 125;
        setTime += 1000;

        setTimeout(() => {
          this.leftJoy(speed);
        }, setTime);

        // console.log('left ', speed);
      } else if (xDir < -30 && xDir > -40) {
        speed = 200;
        setTime += 1000;

        setTimeout(() => {
          this.leftJoy(speed);
        }, setTime);

        // console.log('left ', speed);
      } else if (xDir < -40 && xDir > -51) {
        speed = 255;
        setTime += 1000;

        setTimeout(() => {
          this.leftJoy(speed);
        }, setTime);

        // console.log('left ', speed);
      }

      // console.log('left ', xDir, yDir);
    } else if (degrees < -140 && degrees > -150) {
      var xDir = this.currentPos.x;
      var yDir = this.currentPos.y;
      // console.log('Down left ' , xDir, yDir);

      if (yDir > 0 && yDir < 8) {
        speed = 50;
        setTime += 1000;

        setTimeout(() => {
          this.backwardLeftJoy(speed);
        }, setTime);

        // console.log('Down left ', "speed", speed);
      } else if (yDir > 8 && yDir < 16) {
        speed = 125;
        setTime += 1000;

        setTimeout(() => {
          this.backwardLeftJoy(speed);
        }, setTime);

        // console.log('Down left ', "speed", speed);
      } else if (yDir > 16 && yDir < 24) {
        speed = 200;
        setTime += 1000;

        setTimeout(() => {
          this.backwardLeftJoy(speed);
        }, setTime);

        // console.log('Down left ', "speed", speed);
      } else if (yDir > 24 && yDir < 40) {
        speed = 255;
        setTime += 1000;

        setTimeout(() => {
          this.backwardLeftJoy(speed);
        }, setTime);

        // console.log('Down left', "speed", speed);
      }
    } else if (degrees < -85 && degrees > -95) {
      var xDir = this.currentPos.x;
      var yDir = this.currentPos.y;
      // console.log('Down  ', xDir, yDir);
      // console.log('down ', degrees)
      if (yDir > 10 && yDir < 20) {
        speed = 50;
        setTime += 1000;

        setTimeout(() => {
          this.backwardJoy(speed);
        }, setTime);
        // console.log('Down ', "speed", speed);
      } else if (yDir > 20 && yDir < 30) {
        speed = 125;
        setTime += 1000;

        setTimeout(() => {
          this.backwardJoy(speed);
        }, setTime);

        // console.log('Down ', "speed", speed);
      } else if (yDir > 30 && yDir < 40) {
        speed = 200;
        setTime += 1000;

        setTimeout(() => {
          this.backwardJoy(speed);
        }, setTime);

        // console.log('Down ', "speed", speed);
      } else if (yDir > 40 && yDir < 51) {
        speed = 255;
        setTime += 1000;

        setTimeout(() => {
          this.backwardJoy(speed);
        }, setTime);

        // console.log('Down ', "speed", speed);
      }
    } else if (degrees < -40 && degrees > -50) {
      var xDir = this.currentPos.x;
      var yDir = this.currentPos.y;
      // console.log('Down right ', xDir, yDir);
      // console.log('down right', degrees)

      if (yDir > 0 && yDir < 8) {
        speed = 50;
        setTime += 1000;

        setTimeout(() => {
          this.backwardRightJoy(speed);
        }, setTime);
        // console.log('Down right ', "speed", speed);
      } else if (yDir > 8 && yDir < 16) {
        speed = 125;
        setTime += 1000;

        setTimeout(() => {
          this.backwardRightJoy(speed);
        }, setTime);

        // console.log('Down right ', "speed", speed);
      } else if (yDir > 16 && yDir < 24) {
        speed = 200;
        setTime += 1000;

        setTimeout(() => {
          this.backwardRightJoy(speed);
        }, setTime);

        // console.log('Down right ', "speed", speed);
      } else if (yDir > 24 && yDir < 40) {
        speed = 255;
        setTime += 1000;

        setTimeout(() => {
          this.backwardRightJoy(speed);
        }, setTime);

        // console.log('Down right', "speed", speed);
      }
    }
  }

  handleMouseUp(event) {
    setTime = 0;

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

  leftJoy = (speed) => {
    // console.log("leftJoy");

    let data = ["R".charCodeAt(), "l".charCodeAt(), "l".charCodeAt(), speed];
    console.log("emiiting leftjoy ", data);
    socket.emit("/remote", data, Peripherial);
  };

  rightJoy = (speed) => {
    // console.log("right");

    let data = ["R".charCodeAt(), "r".charCodeAt(), "r".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting rightJoy ", data);
  };

  forwardJoy = (speed) => {
    let data = ["R".charCodeAt(), "u".charCodeAt(), "u".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting Forwardjoy ", data);
  };
  backwardJoy = (speed) => {
    let data = ["R".charCodeAt(), "d".charCodeAt(), "d".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting backwardJoy ", data);
  };

  forwardLeftJoy = (speed) => {
    // console.log("forward");
    let data = ["R".charCodeAt(), "u".charCodeAt(), "l".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting forwardLeftJoy ", data);
  };
  forwardRightJoy = (speed) => {
    // console.log("forward");
    let data = ["R".charCodeAt(), "u".charCodeAt(), "r".charCodeAt(), speed];
    socket.emit("/remote", data, Peripherial);
    console.log("emiiting forwardRightJoy ", data);
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
  hornClick = () => {
    console.log("Horn Click ...TERN");
    let data = ["R".charCodeAt(), "h".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };
  // Light
  lightClick = () => {
    // console.log("Light click");
    let data = ["R".charCodeAt(), "b".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };

  // Spin

  spinClick = () => {
    // console.log("Spin click");
    let data = ["R".charCodeAt(), "s".charCodeAt()];
    socket.emit("/remote", data, Peripherial);
  };
  closeUsb = () => {
    this.setState({ usbOpen: false });
  };

  render() {
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
          src={buttonExitSrc}
          alt="44"
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
        <Link to="/introduction">
          <div
            className="backBtn"
            style={{ backgroundImage: `url(${buttonBackSrc})` }}
          ></div>
        </Link>
        <div>
          <p className="Playtitle">Remote</p>
        </div>
        {/* <div className="help click"></div> */}
        {/* <div className="usb "> </div> */}
        {usbDetectionModel}
        <div className="usb">
          <img
            style={{ height: "40px", width: "35px" }}
            src={imageURL}
            alt="image"
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

        <div className="Remote-Mode">
          <div className="Follow-me-div">
            <div
              className="follow-me click"
              onClick={this.followMeClick}
              style={{ backgroundImage: `url(${buttonProximitySrc})` }}
            ></div>
            <p className="Remote-mode-text">Proximity</p>
          </div>

          <div className="Smart-div">
            <div
              className="smart click"
              onClick={this.smartClick}
              style={{ backgroundImage: `url(${buttonColorrecogSrc})` }}
            ></div>
            <p className="Remote-mode-text2">Color Recognition</p>
          </div>
          <div className="disco-div">
            <div
              className="disco click"
              onClick={this.discoClick}
              style={{ backgroundImage: `url(${autoLightSrc})` }}
            ></div>
            <p className="Remote-mode-text3">Auto Light</p>
          </div>
          <div className="follow-line-div">
            <div
              className="follow-line click"
              onClick={this.followLineClick}
              style={{ backgroundImage: `url(${buttonGestureSrc})` }}
            ></div>
            <p className="Remote-mode-text4 follow-line-text">Gesture</p>
          </div>
        </div>

        <div className="Remote-unique">
          <div className="horn-div">
            <div
              className="horn click"
              onClick={this.hornClick}
              style={{ backgroundImage: `url(${buttonAce2Src})` }}
            ></div>
            <p className="remote-unique-text ">Disco</p>
          </div>
          <div className="light-div">
            <div
              className="light click"
              onClick={this.lightClick}
              style={{ backgroundImage: `url(${buttonAce1Src})` }}
            ></div>
            <p className="remote-unique-text2 ">Night Light</p>
          </div>
          <div className="spin-div">
            <div
              className="spin click"
              onClick={this.spinClick}
              style={{ backgroundImage: `url(${buttonAce3Src})` }}
            ></div>
            <p className="remote-unique-text ">Smile</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RemotePage;
