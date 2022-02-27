import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import unicodeToChar from "../../../../utils/unicodeToChar";
// import {
//   TextEncoderStream,
//   TextDecoderStream,
// } from "@stardazed/streams-text-encoding";
import io from "socket.io-client";
import {
  backBtn,
  AudioDb,
  helpBtnInActive,
  helpBtnActive,
  bluetooth,
  Pianobig,
  Disconnect,
  Disconnected,
  Pc,
  Pianotogglebg,
  Pcpiano,
  Pianokeys,
  PianokeysIA,
  PcpianoIA,
  PcpianoAc,
  PianokeysAc,
  Pianosmall,
  Pianobig_Svg,
  // Pianosmall_Svg,
  // Disconnected_Svg,
  Pianotogglebg_Svg,
  AudioC,
  AudioE,
  AudioD,
  AudioF,
  AudioG,
  AudioA,
  AudioB,
  UsbOn,
  UsbOff,
  clos,
  Disconnected_Svg,
  Pianosmall_Svg,
} from "../../../../source/index";

import renderImage from "../../../../source/importImg";
import MuscSlider from "../../../ReusableComponents/MuscSlider/MuscSlider";
import "./pianoo.css";
const socket = io("http://localhost:3008");

function Music(props) {
  let history = useHistory();

  const gobackUrl = () => {
    // setTimeout(function () {
    //   window.location.reload();
    // }, 100);
    history.goBack();
  };
  // const refresh = () => {

  //   // window.location.reload();
  // };

  var count = 0;

  const [isPianoKey, setPianoKey] = useState(true);
  const [isPcPiano, setPcPiano] = useState(false);

  const M1 = () => {
    socket.emit("/music-keys", ["M".charCodeAt(), "0".charCodeAt()]);
    let data = ["M".charCodeAt(), "0".charCodeAt()];
    writePort(data);
  };
  const M2 = () => {
    socket.emit("/music-keys", ["M".charCodeAt(), "1".charCodeAt()]);
    let data = ["M".charCodeAt(), "1".charCodeAt()];
    writePort(data);
  };
  const M3 = () => {
    socket.emit("/music-keys", ["M".charCodeAt(), "2".charCodeAt()]);
    let data = ["M".charCodeAt(), "2".charCodeAt()];
    writePort(data);
  };
  const M4 = () => {
    socket.emit("/music-keys", ["M".charCodeAt(), "3".charCodeAt()]);
    let data = ["M".charCodeAt(), "3".charCodeAt()];
    writePort(data);
  };
  const M5 = () => {
    socket.emit("/music-keys", ["M".charCodeAt(), "4".charCodeAt()]);
    let data = ["M".charCodeAt(), "4".charCodeAt()];
    writePort(data);
  };
  const M6 = () => {
    socket.emit("/music-keys", ["M".charCodeAt(), "5".charCodeAt()]);
    let data = ["M".charCodeAt(), "5".charCodeAt()];
    writePort(data);
  };
  const M7 = () => {
    socket.emit("/music-keys", ["M".charCodeAt(), "6".charCodeAt()]);
    let data = ["M".charCodeAt(), "6".charCodeAt()];
    writePort(data);
  };
  const M8 = () => {
    socket.emit("/music-keys", ["M".charCodeAt(), "7".charCodeAt()]);
    let data = ["M".charCodeAt(), "7".charCodeAt()];
    writePort(data);
  };
  const handlePianoKey = (e) => {
    if (isPianoKey) {
      setPianoKey(!isPianoKey);
      setPcPiano(!isPcPiano);
    } else {
      // window.location.reload();
      setPcPiano(!isPcPiano);
      setPianoKey(!isPianoKey);
    }
  };

  const handlePcPiano = (e) => {
    if (isPcPiano) {
      setPcPiano(!isPcPiano);
      setPianoKey(!isPianoKey);
    } else {
      setPcPiano(!isPcPiano);
      setPianoKey(!isPianoKey);
    }
  };

  // var portData = {};
  // async function connect() {
  //   const port = await navigator.serial.requestPort();

  //   portData = Object.assign(port);
  //   console.log(portData, "__postData");
  //   // - Wait for the port to open.
  //   await port.open({ baudRate: 115200 });
  //   const decoder = new TextDecoderStream();
  //   const inputDone = port.readable.pipeTo(decoder.writable);
  //   const inputStream = decoder.readable;

  //   const reader = inputStream.getReader();
  //   readLoop();
  //   // const encoder = new TextEncoderStream();
  //   // const outputDone = encoder.readable.pipeTo(port.writable);
  //   // const outputStream = encoder.writable;
  //   writePort();
  //   async function readLoop() {
  //     console.log("Readloop");
  //     while (true) {
  //       const { value, done } = await reader.read();
  //       console.log("value", value);
  //       let str = value.trim();
  //       // console.log("DATA IN STRING", str);
  //       if (str === "K494848") {
  //         console.log("VALUE IS COMING");
  //         var audio = new Audio(`${AudioC}`);
  //         audio.play();
  //       } else if (str === "K484948") {
  //         var audio = new Audio(`${AudioD}`);
  //         audio.play();
  //       } else if (str === "K484849") {
  //         var audio = new Audio(`${AudioE}`);
  //         audio.play();
  //       } else if (str === "K494948") {
  //         var audio = new Audio(`${AudioF}`);
  //         audio.play();
  //       } else if (str === "K484949") {
  //         var audio = new Audio(`${AudioG}`);
  //         audio.play();
  //       } else if (str === "K494849") {
  //         var audio = new Audio(`${AudioA}`);
  //         audio.play();
  //       } else if (str === "K494949") {
  //         var audio = new Audio(`${AudioB}`);
  //         audio.play();
  //       }
  //       console.log("done", done);

  //       // let comingData = value;

  //       if (done) {
  //         console.log("[readLoop] DONE", done);
  //         reader.releaseLock();
  //         break;
  //       }
  //     }
  //   }
  //   // if (gobackUrl) {
  //   //   await port.close();
  //   // }
  // }

  useEffect(() => {
    let no_port = props.webserialPort.name;
    if (no_port == "Not Connected") {
      console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
      console.log("SERIAL PORT NOT CONNECTED");
    } else {
      OpenReadComPort();
    }
  }, []);

  const OpenReadComPort = async () => {
    const p_Port = props.webserialPort;
    console.log(p_Port, "p_Port");

    try {
      console.log("OPENED");
      await p_Port.open({ baudRate: 115200 });
    } catch (e) {
      console.log(e);
      // p_Port.close();
      // await p_Port.open({ baudRate: 115200 });
    }

    writePort("notWrite");
    // let portReader = p_Port.readable.getReader();

    // let portWriter = p_Port.writable.getWriter();

    setTimeout(async () => {
      try {
        let portReader = p_Port.readable.getReader();

        // let portWriter = portList.writable.getWriter();

        while (true) {
          const { value, done } = await portReader.read();
          // console.log("value", value);
          console.log("done", done);

          const strg = unicodeToChar(value);
          let str = strg.trim();

          console.log(str, "uniCodeTOCHAR");
          if (str === "K494848") {
            console.log("VALUE IS COMING");
            var audio = new Audio(`${AudioC}`);
            audio.play();
          } else if (str === "K484948") {
            var audio = new Audio(`${AudioD}`);
            audio.play();
          } else if (str === "K484849") {
            var audio = new Audio(`${AudioE}`);
            audio.play();
          } else if (str === "K494948") {
            var audio = new Audio(`${AudioF}`);
            audio.play();
          } else if (str === "K484949") {
            var audio = new Audio(`${AudioG}`);
            audio.play();
          } else if (str === "K494849") {
            var audio = new Audio(`${AudioA}`);
            audio.play();
          } else if (str === "K494949") {
            var audio = new Audio(`${AudioB}`);
            audio.play();
          }
          if (done) {
            console.log("[readLoop] DONE", done);
            portReader.releaseLock();
            break;
          }
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    // while (true) {
    //   const { value, done } = await portReader.read();
    //   // console.log("value", value);
    //   console.log("done", done);

    //   const strg = unicodeToChar(value);
    //   let str = strg.trim();

    //   console.log(str, "uniCodeTOCHAR");
    //   if (str === "K494848") {
    //     console.log("VALUE IS COMING");
    //     var audio = new Audio(`${AudioC}`);
    //     audio.play();
    //   } else if (str === "K484948") {
    //     var audio = new Audio(`${AudioD}`);
    //     audio.play();
    //   } else if (str === "K484849") {
    //     var audio = new Audio(`${AudioE}`);
    //     audio.play();
    //   } else if (str === "K494948") {
    //     var audio = new Audio(`${AudioF}`);
    //     audio.play();
    //   } else if (str === "K484949") {
    //     var audio = new Audio(`${AudioG}`);
    //     audio.play();
    //   } else if (str === "K494849") {
    //     var audio = new Audio(`${AudioA}`);
    //     audio.play();
    //   } else if (str === "K494949") {
    //     var audio = new Audio(`${AudioB}`);
    //     audio.play();
    //   }
    //   if (done) {
    //     console.log("[readLoop] DONE", done);
    //     portReader.releaseLock();
    //     break;
    //   }
    // }

    console.log(p_Port, "p_Port");
  };

  async function writePort(data) {
    // const ports = await navigator.serial.getPorts();
    // console.log("portsss", ports);

    // console.log("portsss", ports[0].writable);
    // // const outputStream = ports[0].writable,
    // const writer = ports[0].writable.getWriter();
    // // writer = outputStream.getWriter();
    // const sata = data;
    // const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,
    // console.log("send data:+", data1);

    // await writer.write(data1);

    // writer.releaseLock();

    try {
      const ports = await navigator.serial.getPorts();
      console.log("portsss", ports);

      console.log("portsss", ports[0].writable);
      // const outputStream = ports[0].writable,
      const writer = ports[0].writable.getWriter();
      // writer = outputStream.getWriter();
      const sata = data;
      const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,
      console.log("send data:+", data1);

      await writer.write(data1);

      writer.releaseLock();
    } catch (e) {
      console.log(e);
    }
  }

  if (isPcPiano) {
    let data = ["K".charCodeAt(), "P".charCodeAt()];
    // socket.emit("/Pc-keys", data);
    writePort(data);
    console.log("pcpiano on");
    // socket.on("/hw-music", (data) => {
    //   // console.log("===========================>data", data.trim());
    //   // console.log("===========================>data", data.trim().length);
    //   let comingData = data.trim();
    //   // let data1 = ["K".charCodeAt(), "P".charCodeAt()];
    //   // socket.emit("/Pc-keys", data1);
    //   if (comingData === "494848") {
    //     var audio = new Audio(`${AudioC}`);
    //     audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   } else if (comingData === "484948") {
    //     var audio = new Audio(`${AudioD}`);
    //     audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   } else if (comingData === "484849") {
    //     var audio = new Audio(`${AudioE}`);
    //     audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   } else if (comingData === "484848") {
    //     // count = count + 1;
    //     // console.log("Count", count);
    //     setTimeout(() => {
    //       // if (count <= 5) {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //       // }
    //     }, 500);
    //   } else if (comingData === "494948") {
    //     var audio = new Audio(`${AudioF}`);
    //     audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   } else if (comingData === "484949") {
    //     var audio = new Audio(`${AudioG}`);
    //     audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   } else if (comingData === "494849") {
    //     var audio = new Audio(`${AudioA}`);
    //     audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   } else if (comingData === "494949") {
    //     var audio = new Audio(`${AudioB}`);
    //     audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   } else if (comingData.includes("48")) {
    //     // var audio = new Audio(`${AudioB}`);
    //     // audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   } else if (comingData.includes("49")) {
    //     // var audio = new Audio(`${AudioB}`);
    //     // audio.play();
    //     setTimeout(() => {
    //       let data = ["K".charCodeAt(), "P".charCodeAt()];
    //       socket.emit("/Pc-keys", data);
    //     }, 500);
    //   }
    // });
  }

  const [isHelp, setHelp] = useState(false);
  const [isUsb, setUsb] = useState(false);
  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };

  useEffect(() => {
    socket.emit("_usbDetection", "Hi i am firoz");
    socket.on("/usbDetection1", (data) => {
      // console.log("...............6", data);
      // // let kill = Array.from(data);
      // // console.log("...............5", kill);
      // if (data == 1) {
      //   // setUsb(true);
      //   console.log("LLLLLLLLLLLLLLL", data);
      // } else {
      //   // setUsb(false);
      // }
    });
    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      setUsb(true);
      console.log("LLLLLLLLLLLLLLL", data);
    } else {
      setUsb(false);
    }
  });

  return (
    <div className="Music-Main">
      <div className="Music_Header">
        <div>
          <img
            className="Back_BTNN"
            src={renderImage("backBtn")}
            onClick={gobackUrl}
          ></img>
        </div>
        <div>
          <p className="Play_Speech">Music</p>
        </div>
        <div></div>
        <div>
          {isHelp == false ? (
            <img
              className="Help_btn"
              src={renderImage("helpBtnInActive")}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className="Musc_Slider">
              <MuscSlider />
            </div>
          )}
          {isHelp ? (
            <div>
              <img
                className="Ros"
                src={renderImage("clos")}
                onClick={handleHelpBtn}
              ></img>
            </div>
          ) : null}
        </div>
        <div>
          {" "}
          {isUsb ? (
            <img className="Bluetooth_Button" src={renderImage("UsbOn")}></img>
          ) : (
            <img className="Bluetooth_Button" src={renderImage("UsbOff")}></img>
          )}
        </div>
      </div>
      <div className="Music_Body">
        <div
          className="Piano"
          // style={{ border: "1px solid red" }}
        >
          {isPianoKey == false ? null : (
            // <img className="Music_Ac" src={renderImage Pc}></img>
            // <img className="Piano_Big" src={renderImage Pianobig_Svg}></img>
            <div className="Piano_p">
              <div
                // style={{ border: "5px solid blue" }}
                className=" a white a li"
                onClick={M1}
              ></div>
              <div className="black as li"></div>
              <div className="white b li" onClick={M2}></div>
              <div className="black bs li"></div>
              <div className="white c li" onClick={M3}></div>

              <div className="white d li" onClick={M4}></div>
              <div className="black ds li"></div>
              <div className="white e li" onClick={M5}></div>
              <div className="black es li"></div>
              <div className="white f li" onClick={M6}></div>

              <div className="white g li" onClick={M7}></div>
              <div className="white h li" onClick={M8}></div>
              <div className="black hs li"></div>
            </div>
          )}
          {isPcPiano == false ? null : (
            <img className="Music_Ac" src={renderImage("Pc")}></img>
          )}
        </div>
        <div className="">
          {isPianoKey == false ? null : (
            <img
              className="Disconnected"
              src={renderImage("Disconnected_Svg")}
            ></img>
          )}
          {isPcPiano == false ? null : (
            <img
              className="Disconnect"
              src={renderImage("Disconnected_Svg")}
            ></img>
          )}
        </div>
        <div className="">
          {isPianoKey == false ? null : (
            <img className="Music_Ace" src={renderImage("Pc")}></img>
          )}
          {isPcPiano == false ? null : (
            <img
              className="Piano_Small"
              src={renderImage("Pianosmall_Svg")}
            ></img>
          )}
        </div>
        <div className="">
          <img
            className="Pianotoggle_Bg"
            src={renderImage("Pianotogglebg_Svg")}
          ></img>

          {isPianoKey == false ? (
            <img
              className="Piano_Keys"
              src={renderImage("PianokeysIA")}
              onClick={handlePianoKey}
            ></img>
          ) : (
            <img
              className="Piano_Keys"
              src={renderImage("PianokeysAc")}
              onClick={handlePianoKey}
            ></img>
          )}

          {isPcPiano == false ? (
            <img
              className="Pc_Piano"
              src={renderImage("PcpianoIA")}
              onClick={handlePcPiano}
            ></img>
          ) : (
            <img
              className="Pc_Piano"
              src={renderImage("PcpianoAc")}
              onClick={handlePcPiano}
            ></img>
          )}
        </div>
      </div>
      <div>
        {isPcPiano == false ? (
          <h3 className="Music_Instruc">
            Tap the keys of the piano to play music
          </h3>
        ) : (
          <h3 className="Music_Instruc2">
            Tap the touch pads on Play Computer to play music
          </h3>
        )}

        {/* <p className="test">Millisecond</p> */}
      </div>
    </div>
  );
}
// export default Music;

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);

  return {
    webserialPort: state.webSerial,
  };
};

export default connect(mapStateToProps)(Music);
