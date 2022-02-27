import React, { useState, useEffect } from "react";
import "./speak.css";
import io from "socket.io-client";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import unicodeToChar from "../../../../utils/unicodeToChar";

// import {
//   backBtn,
//   helpBtnInActive,
//   helpBtnActive,
//   bluetooth,
//   languageIA,
//   PC,
//   SpeechIA,
//   Soundwaves,
//   SpeechAc,
//   languageAc,
//   helpAc,
//   languagebar,
//   languageSVG,
//   Soundwaves_Svg,
//   languagebar_Svg,
//   SpeechIA_Svg,
//   SpeechAc_Svg,
//   UsbOn,
//   UsbOff,
//   clos,
// } from "../../../../source/index";

import renderImage from "../../../../source/importImg";

import Ace from "../../../../Assets/PC_image@2x.png";
import SpeechA from "../../../../Assets/speech active.svg";

import SpeechIAC from "../../../../Assets/speech inactive.svg";
import usboof from "../../../../Assets/usb - off@2x.png";
import backx from "../../../../Assets/back@2x.png";

import SpchSlider from "../../../ReusableComponents/SpchSlider/SpchSlider";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const socket = io("http://localhost:3008");
// recognition.start();

function Speech(props) {
  let history = useHistory();

  const gobackUrl = () => {
    // setTimeout(function () {
    //   window.location.reload();
    // }, 100);
    history.goBack();
  };

  const [isMic, setMic] = useState(false);

  const handleMic = (e) => {
    if (isMic == true) {
      setMic(false);
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click");
      };
    } else {
      setMic(true);
      recognition.start();
      recognition.onend = () => {
        console.log("...continue listening...");
      };
    }

    recognition.onstart = () => {
      console.log("Listening!");
    };

    let finalTranscript = "";
    recognition.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        console.log(transcript);
        if (e.results[i].isFinal) finalTranscript += transcript + " ";
      }
      document.getElementById("final").innerHTML = finalTranscript;

      const transcriptArray = finalTranscript.split(" ");
      const stopCmd = transcriptArray.slice(-4, -1);
      console.log("stopCmd", stopCmd);
      if (stopCmd[0] === "Light" && stopCmd[1] === "off.") {
        console.log("forward emit");
        socket.emit("/speak", ["S".charCodeAt(), "0".charCodeAt()]);
        let data = ["S".charCodeAt(), "0".charCodeAt()];
        writePort(data);
      } else if (
        stopCmd[0] === "White" &&
        stopCmd[1] === "light" &&
        stopCmd[2] === "on."
      ) {
        socket.emit("/speak", ["S".charCodeAt(), "1".charCodeAt()]);
        console.log("white light emit");
        let data = ["S".charCodeAt(), "1".charCodeAt()];
        writePort(data);
      } else if (
        stopCmd[0] === "Red" &&
        stopCmd[1] === "light" &&
        stopCmd[2] === "on."
      ) {
        socket.emit("/speak", ["S".charCodeAt(), "2".charCodeAt()]);
        console.log("red light emit");
        let data = ["S".charCodeAt(), "2".charCodeAt()];
        writePort(data);
      } else if (
        stopCmd[0] === "Green" &&
        stopCmd[1] === "light" &&
        stopCmd[2] === "on"
      ) {
        socket.emit("/speak", ["S".charCodeAt(), "3".charCodeAt()]);
        console.log("green light emit");
        let data = ["S".charCodeAt(), "3".charCodeAt()];
        writePort(data);
      } else if (
        stopCmd[0] === "Blue" &&
        stopCmd[1] === "light" &&
        stopCmd[2] === "on."
      ) {
        console.log("blue light emit");
        // socket.emit("/speak", ["S".charCodeAt(), "4".charCodeAt()]);
        let data = ["S".charCodeAt(), "4".charCodeAt()];
        writePort(data);
      } else if (stopCmd[0] === "disco" && stopCmd[1] === "on") {
        console.log("disco light emit");
        // socket.emit("/speak", ["S".charCodeAt(), "5".charCodeAt()]);
        let data = ["S".charCodeAt(), "5".charCodeAt()];
        writePort(data);
      } else if (stopCmd[0] === "Disco" && stopCmd[1] === "on.") {
        console.log("disco light emit");
        // socket.emit("/speak", ["S".charCodeAt(), "5".charCodeAt()]);
        let data = ["S".charCodeAt(), "5".charCodeAt()];
        writePort(data);
      } else if (stopCmd[0] === "smile" && stopCmd[1] === "on") {
        console.log("smile light emit");
        // socket.emit("/speak", ["S".charCodeAt(), "6".charCodeAt()]);
        let data = ["S".charCodeAt(), "6".charCodeAt()];
        writePort(data);
      } else if (stopCmd[0] === "Smile" && stopCmd[1] === "on.") {
        console.log("smile light emit");
        // socket.emit("/speak", ["S".charCodeAt(), "6".charCodeAt()]);
        let data = ["S".charCodeAt(), "6".charCodeAt()];
        writePort(data);
      }

      //Small Letters
      if (stopCmd[0] === "light" && stopCmd[1] === "off") {
        console.log("forward emit");
        socket.emit("/speak", ["S".charCodeAt(), "0".charCodeAt()]);
        let data = ["S".charCodeAt(), "0".charCodeAt()];
        writePort(data);
      } else if (
        stopCmd[0] === "white" &&
        stopCmd[1] === "light" &&
        stopCmd[2] === "on"
      ) {
        socket.emit("/speak", ["S".charCodeAt(), "1".charCodeAt()]);
        console.log("white light emit");
        let data = ["S".charCodeAt(), "1".charCodeAt()];
        writePort(data);
      } else if (
        stopCmd[0] === "red" &&
        stopCmd[1] === "light" &&
        stopCmd[2] === "on"
      ) {
        socket.emit("/speak", ["S".charCodeAt(), "2".charCodeAt()]);
        console.log("red light emit");
        let data = ["S".charCodeAt(), "2".charCodeAt()];
        writePort(data);
      } else if (
        stopCmd[0] === "green" &&
        stopCmd[1] === "light" &&
        stopCmd[2] === "on."
      ) {
        socket.emit("/speak", ["S".charCodeAt(), "3".charCodeAt()]);
        let data = ["S".charCodeAt(), "3".charCodeAt()];
        writePort(data);
        console.log("green light emit");
      } else if (
        stopCmd[0] === "blue" &&
        stopCmd[1] === "light" &&
        stopCmd[2] === "on"
      ) {
        console.log("blue light emit");
        socket.emit("/speak", ["S".charCodeAt(), "4".charCodeAt()]);
        let data = ["S".charCodeAt(), "4".charCodeAt()];
        writePort(data);
      }

      if (stopCmd[0] === "stop" && stopCmd[1] === "listening") {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per command");
          const finalText = transcriptArray.slice(0, -3).join(" ");
          document.getElementById("final").innerHTML = finalText;
        };
      }
    };
    recognition.onerror = (event) => {
      console.log("Error occurred in recognition: " + event.error);
    };
  };

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
    try {
      let portReader = p_Port.readable.getReader();

      // let portWriter = p_Port.writable.getWriter();

      while (true) {
        const { value, done } = await portReader.read();
        // console.log("value", value);
        console.log("done", done);

        const str = unicodeToChar(value);

        console.log(str, "uniCodeTOCHAR");

        if (done) {
          console.log("[readLoop] DONE", done);
          portReader.releaseLock();
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }

    console.log(p_Port, "p_Port");
  };

  async function writePort(data) {
    try {
      const ports = await navigator.serial.getPorts();
      console.log("portsss", ports);

      console.log("portsss", ports[0].writable);
      // const outputStream = ports[0].writable,
      const writer = ports[0].writable.getWriter();
      // writer = outputStream.getWriter();
      if (data != "notWrite") {
        const Wdata = data;

        console.log("Wdata", Wdata);

        const data1 = new Uint8Array(Wdata); //  82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,

        console.log("send data:+", data1);
        await writer.write(data1);
      }
      writer.releaseLock();
    } catch (e) {
      console.log(e);
    }
  }

  const [isLanguage, setLanguage] = useState(false);

  const handleLanguageBtn = (e) => {
    if (isLanguage) {
      setLanguage(false);
    } else {
      setLanguage(true);
    }
  };

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
    <div className="Speech-Main">
      <div className="Speech_Header">
        <div>
          <img
            className="Back_BTNN"
            src={renderImage("backBtn")}
            onClick={gobackUrl}
          ></img>
        </div>
        <div>
          <p className="Play_Speech">Speech</p>
        </div>
        <div></div>
        <div>
          {/* {isLanguage == false ? (
            <img
              className="LanguageIA_Btn"
              src={languageIA}
              onClick={handleLanguageBtn}
            ></img>
          ) : (
            <img
              className="LanguageIA_Btn"
              src={languageAc}
              onClick={handleLanguageBtn}
            ></img>
          )} */}
        </div>

        <div>
          {isHelp == false ? (
            <img
              className="Help_btn"
              src={renderImage("helpBtnInActive")}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className="Spch_Slider">
              <SpchSlider />
            </div>
          )}
          {isHelp ? (
            <div>
              <img
                className="ros"
                src={renderImage("clos")}
                onClick={handleHelpBtn}
              ></img>
            </div>
          ) : null}
        </div>
        <div>
          {isUsb ? (
            <img className="Bluetooth_Button" src={renderImage("UsbOn")}></img>
          ) : (
            <img className="Bluetooth_Button" src={renderImage("UsbOff")}></img>
          )}
        </div>
      </div>
      {/* {isLanguage == false ? null : (
        <div className="Lang_Bar">
          <div>
            <img className="Language_Bar" src={languagebar}></img>
          </div>
          <div className="Lang_Div">
            <div
              style={
                {
                  // border: "1px solid red",
                  // borderBottom: "3px solid #c2c1c1",
                }
              }
            >
              <p className="English_Lang">English</p>
            </div>
            <div
              style={{
                // border: "1px solid red",
                borderBottom: "3px solid #c2c1c1",
                opacity: "0.3",
              }}
            ></div>
            <div
              style={
                {
                  // border: "1px solid red",
                  // borderBottom: "3px solid #c2c1c1",
                }
              }
            >
              <p className="Hindi_Lang">Hindi</p>
            </div>
            <div
              style={{
                // border: "1px solid red",
                borderBottom: "3px solid #c2c1c1",
                opacity: "0.3",
              }}
            ></div>
            <div></div>
          </div>
        </div>
      )} */}

      <div className="Ace_Speech">
        <div>
          <img className="Ace_img" src={renderImage("PC")}></img>
        </div>
        <div>
          {isMic == false ? (
            <img
              className="Mic_img"
              src={renderImage("SpeechIA_Svg")}
              onClick={handleMic}
            ></img>
          ) : (
            <img
              className="Mic_img"
              src={renderImage("SpeechAc_Svg")}
              onClick={handleMic}
            ></img>
          )}
        </div>
      </div>
      <div className="SoundWave">
        {isMic == false ? null : (
          <img className="Sound_Wave" src={renderImage("Soundwaves_Svg")}></img>
        )}
        {/* <img className="Sound_Wave" src={Soundwaves_Svg}></img> */}
      </div>
      <div>
        {isMic == false ? (
          <h3 className="Speech_Instruc">
            Tap the microphone to start talking to your Play Computer
          </h3>
        ) : (
          <h3 id="final" className="Speech_Instruct">
            Listening......
          </h3>
        )}
      </div>
    </div>
  );
}
// export default Speech;

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);

  return {
    webserialPort: state.webSerial,
  };
};

export default connect(mapStateToProps)(Speech);
