// import React, { Component } from "react";
// import "./camera.css";

// import { useState } from "react";
// import PoseNet from "react-posenet";

// import { Link } from "react-router-dom";

// import io from "socket.io-client";
// import Modal from "react-modal";
// import { buttonBackSrc } from "../../../../source/source";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     height: "28%",
//     width: " 30%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "#9ecee8",
//     border: "2px solid #188dcc",
//   },
// };
// const socket = io("http://localhost:3008");

// //
// //socket.emit('/scanDevice');

// // Sending data to server after 1 second - data from local storage to device
// setInterval(() => {
//   let data = localStorage.getItem("faceSide");
//   // alert("The URL of this page is: " + window.location.href);
//   let url = window.location.href;
//   let path = "http://localhost:3000/Humanoid-Camera";
//   if (url === path) {
//     console.log("5ms : ", url);
//     if (data === "leftside") {
//       let data = ["C".charCodeAt(), "2".charCodeAt()];
//       console.log("L emit", data);
//       socket.emit("/camera", data);
//     } else if (data === "rightside") {
//       let data = ["C".charCodeAt(), "1".charCodeAt()];
//       socket.emit("/camera", data);
//       console.log("R emit", data);
//     } else if (data === "Center") {
//       let data = ["C".charCodeAt(), "0".charCodeAt()];
//       socket.emit("/camera", data);
//       console.log("C emit", data);
//     }
//   } else return;
// }, 500);

// function HumanoidCamera() {
//   var faceMovement = "";
//   var faceArr = [];

//   const [posesString, setPosesString] = useState([]);
//   const [detected, setdetected] = useState([]);
//   const [usbOpen, setusbOpen] = useState([]);

//   try {
//     if (posesString[0]) {
//       // console.log("left Eye :", posesString[0].keypoints[1].position.y)
//       // console.log("Right Eye :", posesString[0].keypoints[2].position.y)

//       if (
//         posesString[0]["keypoints"]["1"].score > 0.87 &&
//         posesString[0]["keypoints"]["2"].score > 0.87
//       ) {
//         // console.log("leftEye :", poses[0].pose['leftEye'].y, " \nRightEye : ", poses[0].pose['rightEye'].y)
//         if (
//           posesString[0]["keypoints"]["1"].position.y >
//           posesString[0]["keypoints"]["2"].position.y
//         ) {
//           if (
//             posesString[0]["keypoints"]["1"].position.y -
//               posesString[0]["keypoints"]["2"].position.y >
//             40
//           ) {
//             // console.log("Left Side");
//             faceMovement = "Left Side";
//             let faceData = "leftside";
//             faceArr.push(faceData);
//           }
//         } else if (
//           posesString[0]["keypoints"]["2"].score >
//           posesString[0]["keypoints"]["1"].score
//         ) {
//           // console.log("diff R = ", posesString[0]["keypoints"]["2"].score - posesString[0]["keypoints"]["1"].score)
//           if (
//             posesString[0]["keypoints"]["2"].score -
//               posesString[0]["keypoints"]["1"].score >
//             0.007
//           ) {
//             // console.log("Right Side")
//             faceMovement = "Right Side";
//             let faceData = "rightside";
//             faceArr.push(faceData);
//           }
//         } else if (
//           posesString[0].keypoints[1].position.y -
//             posesString[0].keypoints[2].position.y >
//             -9 ||
//           posesString[0].keypoints[1].position.y -
//             posesString[0].keypoints[2].position.y <
//             9
//         ) {
//           // console.log("Center : ", posesString[0].keypoints[1].position.y - posesString[0].keypoints[2].position.y)
//           faceMovement = "Center";
//           let faceData = "Center";
//           faceArr.push(faceData);
//         }
//       }
//     }
//   } catch (error) {
//     console.log("no person in cam", error);
//   }

//   // store the face movement in local storage
//   localStorage.setItem("faceSide", faceArr);

//   // style for tern backgroud image - connected || disconnected
//   const style = {
//     backgroundImage: `url('/imagesplay/humanoid/connectedHumanoid.png')`,
//     position: "absolute",
//     top: "5vw",
//     left: "60.5vw",
//     width: "21vw",
//     height: "53vh",
//     backgroundSize: "cover",
//     backgroundRepeat: "no - repeat",
//   };

//   return (
//     <div className="play-introduction">
//       <Link to="/introduction">
//         <div
//           className="backBtn"
//           style={{ backgroundImage: `url(${buttonBackSrc})` }}
//         ></div>
//       </Link>

//       <div>
//         <p className="Playtitle">Camera</p>
//       </div>
//       {/* <div className="help click"></div> */}
//       <div className="usb "></div>

//       <div className="">
//         <PoseNet
//           inferenceConfig={{ decodingMethod: "single-person" }}
//           onEstimate={(poses) => {
//             setPosesString(poses);
//           }}
//           className="camera"
//         />

//         <p className="faceOP"> {faceMovement} </p>

//         <div className="tern-device-camera" style={style} />
//       </div>
//     </div>
//   );
// }

// export default HumanoidCamera;

import React, { useEffect, useState } from "react";

import "./camera.css";
import { Link } from "react-router-dom";
import { buttonBackSrc } from "../../../../source/source";

import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

import Webcam from "react-webcam";
import { useRef } from "react";

import { drawMesh } from "./utilities";

import io from "socket.io-client";

function Camera() {
  // setup
  const webcamRef = useRef(null);

  const canvasRef = useRef(null);

  const connectedHumanoid = {
    height: "100%",
    width: "60%",
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `imagesplay/humanoid/connectedHumanoid.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  };

  // DATA FACE
  let [faceData, setFaceData] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // facemesh
    const runFacemesh = async () => {
      // document.getElementById("loaderContainer").style.display = "block";

      const net = await facemesh.load(
        facemesh.SupportedPackages.mediapipeFacemesh,
        { maxFaces: "1", detectionConfidence: "0.9" }
      );

      // document.getElementById("loaderContainer").style.display = "none";

      console.log("net", net);
      setInterval(() => {
        // Get canvas context

        detect(net, ctx);
      }, 10);
    };

    const detect = async (net, ctx) => {
      console.log();

      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make Detections
        const face = await net.estimateFaces({
          input: video,
        });

        setFaceData(true);

        console.log("FACE", face);

        // // Get canvas context
        // const ctx = canvasRef.current.getContext("2d");

        if (ctx != null) {
          requestAnimationFrame(() => {
            drawMesh(face, ctx);
          });
        }
      }
    };

    runFacemesh();
  }, []);

  let interval;

  const socket = io("http://localhost:3008");

  useEffect(() => {
    // Anything in here is fired on component mount.
    var Peripherial;

    // Sending data to server after 1 second - data from local storage to device
    interval = setInterval(() => {
      let data = localStorage.getItem("faceSide");
      Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));

      // setFaceData(data);

      // alert("The URL of this page is: " + window.location.href);
      let url = window.location.href;
      let path = "http://localhost:3008/camera";
      // if (url === path) {
      console.log("5ms : ", url);
      if (data === "Left") {
        let data = ["C".charCodeAt(), "2".charCodeAt()];
        console.log(" emit L ", data);
        socket.emit("/camera", data, Peripherial);
      } else if (data === "Right") {
        let data = ["C".charCodeAt(), "1".charCodeAt()];
        socket.emit("/camera", data, Peripherial);
        console.log("emit R ", data);
      } else if (data === "Center") {
        let data = ["C".charCodeAt(), "0".charCodeAt()];
        socket.emit("/camera", data, Peripherial);
        console.log("emit C ", data);
      } else if (data === "Top") {
        let data = ["C".charCodeAt(), "3".charCodeAt()];
        socket.emit("/camera", data, Peripherial);
        console.log("emit T ", data);
      } else if (data === "Bottom") {
        let data = ["C".charCodeAt(), "4".charCodeAt()];
        socket.emit("/camera", data, Peripherial);
        console.log("emit B ", data);
      } else if (data === "Smile") {
        let data = ["C".charCodeAt(), "5".charCodeAt()];
        socket.emit("/camera", data, Peripherial);
        console.log("emit S ", data);
      } else return;
    }, 500);
    return () => {
      // Anything in here is fired on component unmount.
      clearInterval(interval);
    };
  }, []);

  console.log("interval", interval);

  return (
    <div className="play-introduction">
      {/* <Link to="/introduction">
        <div
          className="backBtn"
          style={{ backgroundImage: `url(${buttonBackSrc})` }}
        ></div>
      </Link>

      <div>
        <h3 className="Playtitle">Camera</h3>
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
              CAMERA
            </span>
          </div>
        </div>
      </Link>

      {/* <div className="help click"></div> */}
      <div className="usb "></div>

      <div className="XY">
        <div className="camera">
          {!faceData ? (
            <div id="loaderContainer">
              <div id="loader" class="Camera_loader"></div>
              <p className="loaderText" style={{ marginLeft: "-15%" }}>
                Loading Modules
              </p>
            </div>
          ) : (
            console.log("SO YES")
          )}

          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: "100%",
              height: "100%",
              //   transform: "scaleX(-1)",
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: "100%",
              height: "100% + 10%",

              display: "none",
              // height: "100%",
              // border: "2px solid red",
              display: "block",
            }}
          />
        </div>

        <div className="connectionContainer">
          <div className="connectedHumanoid" style={connectedHumanoid}></div>
        </div>

        {/* <h1>{faceData}</h1> */}
      </div>
    </div>
  );
}
export default Camera;
