// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import io from 'socket.io-client';
// import Modal from 'react-modal'
// import "./traceme.css";
// // import "../../../css/learn.css";
// const Immutable = require('immutable');

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     height: "28%",
//     width: " 30%",
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: "#9ecee8",
//     border: "2px solid #188dcc"
//   }

// }
// const socket = io('http://localhost:3008');

// var pathData;
// var clear = 0;

// class Traceme extends Component {
//   constructor() {
//     super();

//     this.state = {
//       detected: false,
//       usbOpen: false,
//       lines:new Immutable.List(),
//       isDrawing: false,
//       pathD: "M 300 150",
//       style1: {
//         display: " none"
//       },
//       arr: [],
//       res: []
//     };

//     this.moving = React.createRef();
//     this.handleMouseDown = this.handleMouseDown.bind(this);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.handleMouseUp = this.handleMouseUp.bind(this);
//   }

//   componentDidMount() {
//     console.log("PROCESS >>>>",process.env.NODE_ENV);
//     document.getElementById("DrawAREA").addEventListener("mousedown", this.handleMouseDown);
//     document.getElementById("DrawAREA").addEventListener("mousemove", this.handleMouseMove);
//     document.getElementById("DrawAREA").addEventListener("mouseup", this.handleMouseUp);

//     socket.emit('_usbDetection', "Hi");
//     socket.on('/usbDetection', (data) => {
//       console.log("...............0", data);
//       this.setState({ detected: data.detected, usbOpen: !data.detected })
//     });
//   }

//   componentWillUnmount() {
//     document.getElementById("DrawAREA").removeEventListener("mouseup", this.handleMouseUp);
//   }

//   componentDidCatch(error,info){
//      console.log('error ::: ', error);
//      console.log('info  ::: ', info);
//   }

//   handleMouseDown=(event)=>{
//     try{
//       if (event.button !== 0) return;
//       var point = this.relativeCoordinatesForEvent(event);
//       console.log("The PrevState of lines is ::",this.state.lines);
//       this.setState(prevState => {
//             return {
//               lines: prevState.lines.push(new Immutable.List([point])),
//               isDrawing: true
//             }
//           })
//       }
//     catch(ex){
//       console.log("Error in handleMouseDown",ex.message);
//     }
//   }

//   handleMouseMove=(mouseEvent)=>{
//     try{
//       console.log("handleMouseMove Event called ..");
//       if (!this.state.isDrawing) {
//         return;
//       }
//       const point = this.relativeCoordinatesForEvent(mouseEvent);
//       // console.log(this.state.lines);

//       // this.setState(prevState => ({
//       //   lines: prevState.lines.updateIn([prevState.lines.size - 1], (line) =>{
//       //     line.push(point)
//       //   }
//       //   )
//       // }));
//       this.setState(prevState => {
//         return {
//             lines: prevState.lines.updateIn([prevState.lines.size-1], line => line.push(point)),

//         };

//     });
//     }
//     catch(ex){
//       console.log("Eroor in handleMouseMove",ex);
//     }
//   }

//   handleMouseUp=()=>{
//     console.log("handleMouseUp Event called ..");
//     this.setState({ isDrawing: false });
//     document.getElementById("DrawAREA").removeEventListener("mousedown", this.handleMouseDown);
//     document.getElementById("DrawAREA").removeEventListener("mousemove", this.handleMouseMove);
//     this.setState({ pathD: `"` + pathData + `"` });
//     // console.log("PATH : : ", pathData);
//   }

//   // Taking the co-ordinates(position) of X and Y  while moving the mouse
//   relativeCoordinatesForEvent=(mouseEvent)=>{
//     try{

//       const boundingRect = this.refs.drawArea.getBoundingClientRect();
//       // console.log("X : ", mouseEvent.clientX - boundingRect.left);
//       // console.log("Y : ", mouseEvent.clientY - boundingRect.top);
//       this.setState({
//         arr: [
//           ...this.state.arr,
//           {
//             x: mouseEvent.clientX,
//             y: window.screen.height - mouseEvent.clientY
//           }
//         ]
//       });
//       return new Immutable.Map({
//         x: mouseEvent.clientX - boundingRect.left,
//         y: mouseEvent.clientY - boundingRect.top
//       });
//     }
//     catch(ex){
//       console.log("Error in relativeCoordinatesForEvent",ex);
//     }
//   }

//   startDrawing = () => {
//     document.getElementById("DrawAREA").addEventListener("mousedown", this.handleMouseDown);
//     document.getElementById("DrawAREA").addEventListener("mousemove", this.handleMouseMove);
//   }

//   // Drawing line and creating SVG path
//   DrawingLine = ({ line }) => {
//     console.log("PATH Fianl 11: : ",line);

//     pathData =
//       "M " +
//       line
//         .map(p => {
//           return `${p.get("x")} ${p.get("y")}`;
//         })
//         .join(" L ");

//      console.log("PATH Fianl : : ", pathData + "Z");

//     return <path style={{fill:"none",strokeWidth:"0.6vw",position:"relative",stroke:"#311b92",top:"50vw",strokeLinejoin:"round",strokeLinecap:"rund"}} d={pathData} stroke="green" />;
//   };

//   Drawing = ({ lines }) => {
//     return <svg style={{width:"60vw",height:"38vw"}}>
//         {lines.map((line, index) => {
//           //  return (<this.DrawingLine key={index} line={line} />);
//           return this.DrawingLine(line={line})
//         })}
//       </svg>

//   }

//   // Clear the data from div - removing lines
//   clear = () => {
//     // clear = 1;
//     const removeElements = elms => elms.forEach(el => el.remove());
//     removeElements(document.querySelectorAll(".path"));

//     this.setState({ pathD: "0" });
//     // this.state.pathD = "M 0 0"
//     this.setState({ pathD: "M0 0" });
//     // console.log("Path", this.state.pathD)
//     this.setState({arr : []});
//   };

//   // Palying tern image animation on line
//   play = () => {
//     // console.log(this.state.res);
//     if (clear == 1) {
//       var pathNew = "M 0 0";
//       this.setState({ pathD: pathNew });

//       // console.log("clear in IF play", this.state.pathD)
//       let style = {
//         // offsetPath: `"M 0 100 L 200 150 L 300 150"`,
//         // animation: "move 10s linear 0.5s 1 alternate ",
//         // position: "absolute ",
//         offsetPath: ` path( ${this.state.pathD} )`,
//         display: " none"
//       };
//       this.setState({ style1: style });
//       // console.log("Path", this.state.pathD)
//     } else {
//       var style = {
//         // offsetPath: `"M 0 100 L 200 150 L 300 150"`,
//         animation: "move 10s linear 0.5s 1 alternate ", //Here move is the animation name which is used in css file keyframes
//         position: "absolute ",
//         offsetPath: ` path( ${this.state.pathD} )`
//         // animationIterationCount: 1,
//         // offsetDistance: "-190 %"
//       };

//       this.setState({ style1: style });
//       // to remove image
//       setTimeout(() => {
//         var style = {
//           display: " none"
//         };
//         this.setState({ style1: style });
//         clearInterval(position);
//       }, 10500);
//     }

//     // -------------------Getting the current position of image ----------------

//     let position = setInterval(() => {
//       const ternImg = document.querySelector("#tern");
//       let topPostion = ternImg.getBoundingClientRect().top;
//       let leftPostion = ternImg.getBoundingClientRect().left;

//       // console.log(
//       //   " topPostion:   " + topPostion,
//       //   "leftposition:  " + leftPostion
//       // );
//     }, 100);

//     //send data to device
//     console.log("Now the bytes should upload now ..",this.state.arr);
//     // this.sendcd()
//   };

//   sendcd = () => {
//     var cur_angle_car = 0;
//     var cur_angle_line = 0;
//     var diff_x, diff_y, hypo, turn_angle;
//     var my_arr = this.state.arr;
//     var my_arr1 = [];
//     for (var i = 0; i < my_arr.length - 5; i += 5) {
//       cur_angle_car = cur_angle_line;
//       diff_x = my_arr[i + 5].x - my_arr[i].x;
//       diff_y = my_arr[i + 5].y - my_arr[i].y;

//       hypo = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
//       cur_angle_line = Math.asin(Math.abs(diff_x) / hypo) * (180 / Math.PI);

//       if (diff_x >= 0 && diff_y >= 0) {
//         cur_angle_line = cur_angle_line;
//       } else if (diff_x >= 0 && diff_y < 0) {
//         cur_angle_line = 180 - cur_angle_line;
//       } else if (diff_x < 0 && diff_y < 0) {
//         cur_angle_line = 180 + cur_angle_line;
//       } else if (diff_x < 0 && diff_y >= 0) {
//         cur_angle_line = -cur_angle_line;
//       }
//       turn_angle = cur_angle_line - cur_angle_car;

//       if (Math.abs(turn_angle) > 180 && turn_angle >= 0) {
//         turn_angle = turn_angle - 360;
//       }
//       if (Math.abs(turn_angle) > 180 && turn_angle < 0) {
//         turn_angle = 360 - Math.abs(turn_angle);
//       }

//       // console.log(turn_angle);
//       // console.log(hypo);
//       my_arr1.push({ angle: turn_angle, len: hypo });

//       // console.log(my_arr1);

//     }
//     console.log(my_arr1)
//     this.setState({ res: [...my_arr1] });
//   };
//   closeUsb = () => {
//     this.setState({ usbOpen: false })
//   }

//   render() {

//     if (this.state.detected == true) {
//       var imageURL = "images/Learn/ble_connection.png"
//     }
//     else {
//       imageURL = "images/Learn/ble_disconnection.png"
//     }

//     var usbDetectionModel = (
//       <Modal isOpen={this.state.usbOpen} style={customStyles}>
//         < img onClick={this.closeUsb} className="closeconceptModal" src="images/login/button_exit@2x.png"></img>
//         <div className="connectconceptMsg">
//           <p>Device not connected..</p>
//           <button> <Link style={{ textDecoration: "none", color: "white" }} to="/biboxSelection">Reconnect</Link></button>
//         </div>
//       </Modal>);
//     return (
//       <div className="play-introduction">
//         <Link to="/introduction">
//           <div className="backBtn"></div>
//         </Link>

//         <div>
//           <p className="Playtitle">Trace Me</p>
//         </div>
//         {/* <div className="help click"></div> */}
//         {/* <div className="usb "></div> */}
//         {usbDetectionModel}
//         <div className="usb"><img style={{ height: "40px", width: "35px" }} src={imageURL} /></div>

//         <div>
//           <section>
//             <div id="DrawAREA" className="drawArea" ref="drawArea">
//               {<this.Drawing lines={this.state.lines} />}
//               <div
//                 className="moving-element"
//                 id="tern"
//                 style={this.state.style1}
//                 ref={this.moving}
//               >
//                 <img src="/imagesplay/play_tern_4.png" width="50"></img>
//               </div>
//             </div>
//           </section>
//           <div id="traceme-btns">
//             <div id=" blue-btn-trace">
//               <div
//                 id="draw-btn"
//                 className="click"
//                 onClick={this.startDrawing}
//               ></div>

//               <div id="erase-btn" className="click" onClick={this.clear}></div>
//             </div>

//             <div id="play-btn" className="click" onClick={this.play}></div>
//             {/* <div id="send-btn" className="click btn btn-primary" onClick={this.sendcd} >SEND</div> */}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Traceme;

import React from "react";
import "./traceme.css";
import "../../../css/learn.css";
import Immutable from "immutable";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import io from "socket.io-client";
import {
  buttonBackSrc,
  tracebuttonDrawSrc,
  tracebuttonEraseSrc,
  tracebuttonPlaySrc,
} from "../../../source/source";

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

var pathData;
var clear = 0;
var Peripherial,
  count = { x: 0, y: 0 };
let newconn;
class Traceme extends React.Component {
  constructor() {
    super();

    this.state = {
      detected: false,
      usbOpen: false,
      lines: new Immutable.List(),
      isDrawing: false,
      pathD: "M 300 150",
      style1: {
        display: " none",
      },
      arr: [],
      res: [],
    };

    this.moving = React.createRef();
    // this.handleMouseDown = this.handleMouseDown.bind(this);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
    newconn = sessionStorage.getItem("connectionMode");
    document
      .getElementById("DrawAREA")
      .addEventListener("mousedown", this.handleMouseDown);
    document
      .getElementById("DrawAREA")
      .addEventListener("mousemove", this.handleMouseMove);
    document
      .getElementById("DrawAREA")
      .addEventListener("mouseup", this.handleMouseUp);
    // let data = ["T".charCodeAt(), "1".charCodeAt()];
    if (sessionStorage.getItem("type") != "USB") {
      socket.emit("/traceMe", Peripherial);
    }
    socket.emit("_usbDetection", "Hi");
    socket.on("/usbDetection", (data) => {
      console.log("...............0", data);
      this.setState({ detected: data.detected, usbOpen: !data.detected });
    });
  }

  componentWillUnmount() {
    document
      .getElementById("DrawAREA")
      .removeEventListener("mouseup", this.handleMouseUp);
    if (sessionStorage.getItem("type") != "USB") {
      socket.emit("/disconnectTrace", "disconnection");
    }
  }

  handleMouseDown = (mouseEvent) => {
    if (mouseEvent.button != 0) {
      return;
    }
    console.log(
      "At handleMouseDown ..",
      mouseEvent.clientX,
      mouseEvent.clientY
    );
    const point = this.relativeCoordinatesForEvent(mouseEvent);
    this.setState((prevState) => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      isDrawing: true,
    }));
  };

  handleMouseMove = (mouseEvent) => {
    if (!this.state.isDrawing) {
      return;
    }
    console.log(
      "At handleMouseMove ..",
      mouseEvent.clientX,
      mouseEvent.clientY
    );
    const point = this.relativeCoordinatesForEvent(mouseEvent);
    // console.log(this.state.lines);

    this.setState((prevState) => ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], (line) =>
        line.push(point)
      ),
    }));
  };

  handleMouseUp = () => {
    this.setState({ isDrawing: false });
    document
      .getElementById("DrawAREA")
      .removeEventListener("mousedown", this.handleMouseDown);
    document
      .getElementById("DrawAREA")
      .removeEventListener("mousemove", this.handleMouseMove);
    this.setState({ pathD: `"` + pathData + `"` });
    // console.log("PATH : : ", pathData);
  };

  // Taking the co-ordinates(position) of X and Y  while moving the mouse
  relativeCoordinatesForEvent = (mouseEvent) => {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    // console.log("X : ", mouseEvent.clientX - boundingRect.left);
    // console.log("Y : ", mouseEvent.clientY - boundingRect.top);
    this.setState({
      arr: [
        ...this.state.arr,
        {
          x: mouseEvent.clientX,
          y: window.screen.height - mouseEvent.clientY,
        },
      ],
    });
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  };

  startDrawing = () => {
    document
      .getElementById("DrawAREA")
      .addEventListener("mousedown", this.handleMouseDown);
    document
      .getElementById("DrawAREA")
      .addEventListener("mousemove", this.handleMouseMove);
  };

  // Drawing line and creating SVG path
  DrawingLine = ({ line }) => {
    pathData =
      "M " +
      line
        .map((p) => {
          return `${p.get("x")} ${p.get("y")}`;
        })
        .join(" L ");

    // console.log("PATH Fianl : : ", pathData + "Z");

    return <path className="path" d={pathData} stroke="green" />;
  };

  Drawing = ({ lines }) => {
    return (
      <svg className="drawing">
        {lines.map((line, index) => {
          // return <this.DrawingLine key={index} line={line} />;
          return this.DrawingLine((line = { line }));
        })}
      </svg>
    );
  };

  // Clear the data from div - removing lines
  clear = () => {
    // clear = 1;
    const removeElements = (elms) => elms.forEach((el) => el.remove());
    removeElements(document.querySelectorAll(".path"));

    this.setState({ pathD: "0" });
    // this.state.pathD = "M 0 0"
    this.setState({ pathD: "M0 0" });
    // console.log("Path", this.state.pathD)
    this.setState({ arr: [] });
  };

  // Palying tern image animation on line
  play = () => {
    // console.log(this.state.res);
    if (clear == 1) {
      var pathNew = "M 0 0";
      this.setState({ pathD: pathNew });

      // console.log("clear in IF play", this.state.pathD)
      let style = {
        // offsetPath: `"M 0 100 L 200 150 L 300 150"`,
        // animation: "move 10s linear 0.5s 1 alternate ",
        // position: "absolute ",
        offsetPath: ` path( ${this.state.pathD} )`,
        display: " none",
      };
      this.setState({ style1: style });
      // console.log("Path", this.state.pathD)
    } else {
      var style = {
        // offsetPath: `"M 0 100 L 200 150 L 300 150"`,
        animation: "move 10s linear 0.5s 1 alternate ", //Here move is the animation name which is used in css file keyframes
        position: "absolute ",
        offsetPath: ` path( ${this.state.pathD} )`,
        // animationIterationCount: 1,
        // offsetDistance: "-190 %"
      };

      this.setState({ style1: style });
      // to remove image
      setTimeout(() => {
        var style = {
          display: " none",
        };
        this.setState({ style1: style });
        clearInterval(position);
      }, 10500);
    }

    // -------------------Getting the current position of image ----------------

    let position = setInterval(() => {
      const ternImg = document.querySelector("#tern");
      let topPostion = ternImg.getBoundingClientRect().top;
      let leftPostion = ternImg.getBoundingClientRect().left;

      // console.log(
      //   " topPostion:   " + topPostion,
      //   "leftposition:  " + leftPostion
      // );
    }, 100);

    //send data to device
    // this.sendcd()
    var as = this.state.arr;
    console.log("Required data is ..", as);

    socket.emit("/uploadTraceData", as); //for server.js

    //for currentserver.js

    // for (let i = 0; i < as.length; i++) {
    //   // let data = ["T".charCodeAt(), "1".charCodeAt()];
    //   //  socket.emit('/uploadTraceData',data)
    //   console.log("...", count.x);
    //   if (as[i].x > count.x) {
    //     count = as[i];
    //     console.log("MOVE FORWARD ..");
    //     let data = ["T".charCodeAt(), "1".charCodeAt()];
    //     socket.emit("/uploadTraceData", data);
    //   } else if (as[i].x == count.x && as[i].y > count.y) {
    //     count = as[i];
    //     console.log("MOVE LEFT ..");
    //     let data = ["T".charCodeAt(), "3".charCodeAt()];
    //     socket.emit("/uploadTraceData", data);
    //   } else if (as[i].x == count.x && as[i].y < count.y) {
    //     count = as[i];
    //     console.log("MOVE RIGHT ..");
    //     let data = ["T".charCodeAt(), "4".charCodeAt()];
    //     socket.emit("/uploadTraceData", data);
    //   } else if (as[i].y == count.y && as[i].x < count.x) {
    //     count = as[i];
    //     console.log("MOVE BACK ..");
    //     let data = ["T".charCodeAt(), "2".charCodeAt()];
    //     socket.emit("/uploadTraceData", data);
    //   }
    // }
  };

  sendcd = () => {
    var cur_angle_car = 0;
    var cur_angle_line = 0;
    var diff_x, diff_y, hypo, turn_angle;
    var my_arr = this.state.arr;
    var my_arr1 = [];
    for (var i = 0; i < my_arr.length - 5; i += 5) {
      cur_angle_car = cur_angle_line;
      diff_x = my_arr[i + 5].x - my_arr[i].x;
      diff_y = my_arr[i + 5].y - my_arr[i].y;

      hypo = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
      cur_angle_line = Math.asin(Math.abs(diff_x) / hypo) * (180 / Math.PI);

      if (diff_x >= 0 && diff_y >= 0) {
        cur_angle_line = cur_angle_line;
      } else if (diff_x >= 0 && diff_y < 0) {
        cur_angle_line = 180 - cur_angle_line;
      } else if (diff_x < 0 && diff_y < 0) {
        cur_angle_line = 180 + cur_angle_line;
      } else if (diff_x < 0 && diff_y >= 0) {
        cur_angle_line = -cur_angle_line;
      }
      turn_angle = cur_angle_line - cur_angle_car;

      if (Math.abs(turn_angle) > 180 && turn_angle >= 0) {
        turn_angle = turn_angle - 360;
      }
      if (Math.abs(turn_angle) > 180 && turn_angle < 0) {
        turn_angle = 360 - Math.abs(turn_angle);
      }

      // console.log(turn_angle);
      // console.log(hypo);
      my_arr1.push({ angle: turn_angle, len: hypo });

      // console.log(my_arr1);
    }
    console.log(my_arr1);
    this.setState({ res: [...my_arr1] });
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
          src="/images/login/button_exit@2x.png"
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
                TRACE ME
              </span>
            </div>
          </div>
        </Link>

        {/* <Link to="/introduction">
          <div
            className="backBtn"
            style={{ backgroundImage: `url(${buttonBackSrc})` }}
          ></div>
        </Link>

        <div>
          <p className="Playtitle">Trace Me</p>
        </div> */}
        <div className="help click"></div>
        {/* <div className="usb "></div> */}
        {usbDetectionModel}
        <div className="usb">
          <img style={{ height: "40px", width: "35px" }} src={imageURL} />
        </div>

        <div>
          <section>
            <div id="DrawAREA" className="drawArea" ref="drawArea">
              <this.Drawing lines={this.state.lines} />
              <div
                className="moving-element"
                id="tern"
                style={this.state.style1}
                ref={this.moving}
              >
                <img src="/imagesplay/play_tern_4.png" width="50"></img>
              </div>
            </div>
          </section>
          <div id="traceme-btns">
            <div id=" blue-btn-trace">
              <div
                id="draw-btn"
                className="click"
                onClick={this.startDrawing}
                style={{ backgroundImage: `url(${tracebuttonDrawSrc})` }}
              ></div>

              <div
                id="erase-btn"
                className="click"
                onClick={this.clear}
                style={{ backgroundImage: `url(${tracebuttonEraseSrc})` }}
              ></div>
            </div>

            <div
              id="play-btn"
              className="click"
              onClick={this.play}
              style={{ backgroundImage: `url(${tracebuttonPlaySrc})` }}
            ></div>
            {/* <div id="send-btn" className="click btn btn-primary" onClick={this.sendcd} >SEND</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Traceme;
