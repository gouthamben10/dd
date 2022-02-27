import React, { useState, useEffect } from "react";
import "./RemoteSection.css";

import { connect } from "react-redux";
import unicodeToChar from "../../../../../utils/unicodeToChar";
import io from "socket.io-client";
import Slider from "../../../../ReusableComponents/Slider/Slider";
import { Link } from "react-router-dom";
// import usbDetect from "usb-detection";

import { useHistory } from "react-router";
// import {
//   backBtn,
//   smile1_Active,
//   smile2_Active,
//   smile3_Active,
//   smile4_Active,
//   helpBtnInActive,
//   smile1,
//   smile2,
//   smile3,
//   smile4,
//   talk_IA,
//   disco_IA,
//   gesture_IA,
//   talk_Ac,
//   disco_Ac,
//   gesture_Ac,
//   eyeAc_Svg,
//   eyeIA_Svg,
//   buzzerAc_Svg,
//   buzzerIA_Svg,
//   eye_bg_Svg,
//   teeth_bg_Svg,
//   buzzer_bg_Svg,
//   teethIA_Svg,
//   teethAc_Svg,
//   FourteethIA_Svg,
//   UsbOn,
//   UsbOff,
//   clos,
// } from "../../../../../source/index";
import renderImage from "../../../../../source/importImg";
import RemSlider from "../../../../ReusableComponents/RemSlider/RemSlider";

// const cacheAvailable = "caches" in window.self;

// console.log("CACHE:-", cacheAvailable);
// var mydata = sessionStorage.getItem("assembly");
// var myVar = mydata.PortConnections || "defaultValue";
// console.log("CACHE VALUE:-", myVar);

const socket = io.connect("http://localhost:3008");

let initalRender = true;

let initalRenderG = true;
let initalRenderT = true;
let initalRenderD = true;

// var usbDetect = require("usb-detection");
// usbDetect.startMonitoring();

let value = false;
const RstyleDevicePC = {
  width: "69%",
  height: "67%",

  backgroundImage: `url(${
    process.env.PUBLIC_URL + "/Bisoft_UI/Main/PNG/PC_image@2x.png"
  })`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "76% 96%",
  backgroundPosition: "50% 50%",
  zIndex: 110,
  top: "25%",
  left: "15%",

  position: "relative",
};

function RemoteSection(props) {
  let history = useHistory();

  const gobackUrl = () => {
    // setTimeout(function () {
    //   window.location.reload();
    // }, 100);
    history.goBack();
    // window.location.reload();
    // Portclose();
  };
  const [isBuzzer, setBuzzer] = useState(0);
  const [isSmile1, setSmile1] = useState(false);
  const [isSmile2, setSmile2] = useState(false);
  const [isSmile3, setSmile3] = useState(false);
  const [isSmile4, setSmile4] = useState(false);

  const [isTalkback, setTalkback] = useState(false);
  const [isDisco, setDisco] = useState(false);
  const [isGesture, setGesture] = useState(false);

  const [isLeftGreenSlider, setLeftGreenSlider] = useState(0);
  const [isLeftBlueSlider, setLeftBlueSlider] = useState(0);
  const [isLeftRedSlider, setLeftRedSlider] = useState(0);

  const [isRightGreenSlider, setRightGreenSlider] = useState(0);
  const [isRightBlueSlider, setRightBlueSlider] = useState(0);
  const [isRightRedSlider, setRightRedSlider] = useState(0);

  const [isL_Red, setL_Red] = useState(0);
  const [isL_Green, setL_Green] = useState(0);
  const [isL_Blue, setL_Blue] = useState(0);

  const [isR_Red, setR_Red] = useState(0);
  const [isR_Green, setR_Green] = useState(0);
  const [isR_Blue, setR_Blue] = useState(0);

  const [isFreq, setFreq] = useState(0);

  const [valueBlue, setvalueBlue] = useState(0);
  const [cur, setCur] = useState(0);
  const [pre, setPre] = useState(0);

  let data;

  //talkback
  let data1 = ["R".charCodeAt(), "t".charCodeAt(), isTalkback ? 1 : 0];
  //gesture
  let data2 = ["R".charCodeAt(), "g".charCodeAt(), isGesture ? 1 : 0];
  //disco
  let data3 = ["R".charCodeAt(), "d".charCodeAt(), isDisco ? 1 : 0];

  /**
   * p= 82,116,0
   * c= 82, 100,0
   *
   *
   */

  // TB
  useEffect(() => {
    if (initalRenderT) {
      initalRenderT = false;
    } else {
      // console.log("i am useEffect Talkback", isTalkback);
      // console.log("i am useEffect Talkback", data);

      if (isTalkback) {
        talkClick();
      } else {
        let curActive = cur[1];
        // socket.emit("/remote", [
        //   [82, curActive, 1],
        //   [82, 116, 0],
        // ]);
        console.log("TALK BACK CURRENT", curActive);
        let d1 = [82, curActive, 1];
        let d2 = [82, 116, 0];
        console.log(d1, d2, "TalkBACK");
        writePort(d1);
        writePort(d2);
      }
    }
  }, [isTalkback]);

  useEffect(() => {
    if (initalRenderD) {
      initalRenderD = false;
    } else {
      if (isDisco) {
        // alert("USE-effect_DISCO isDIsoc IF", isDisco);
        discoClick();
      } else {
        // alert("USE-effect_DISCO isDIsoc ELSE", isDisco);
        let curActive = cur[1];
        // socket.emit(
        //   "/remote",
        //   [
        //     [82, curActive, 1],
        //     [82, 100, 0],
        //   ],
        //   "ELSE"
        // );
        console.log("DISCO CURRENT", curActive);
        let d1 = [82, curActive, 1];
        let d2 = [82, 100, 0];
        writePort(d1);
        writePort(d2);

        // [[82, curActive, 1,][82, 100, 0]]
        // socket.emit("/remote", [data[1], [82, 100, 0]], "ELSE");
        console.log(data[1]);
      }
    }
  }, [isDisco]);

  // GES
  useEffect(() => {
    if (initalRenderG) {
      initalRenderG = false;
    } else {
      if (isGesture) {
        // alert("USE-EFFECT GESTURE isGesture IF", isGesture);

        gestureClick();
      } else {
        // alert("USE-EFFECT GESTURE isGesture ELSE");
        // console.log("UE-GES  ELSE DATA", data);
        // console.log("UE-GES  ELSE CUR", cur);
        // console.log("UE-GES  ELSE prev", pre);

        // ,82103,0
        let curActive = cur[1];
        // socket.emit(
        //   "/remote",
        //   [
        //     [82, curActive, 1],
        //     [82, 103, 0],
        //   ],
        //   "ELSE"
        // );
        console.log("GESTURE CURRENT", curActive);
        let d1 = [82, curActive, 1];
        let d2 = [82, 103, 0];
        writePort(d1);
        writePort(d2);
        // console.log(data[1]);
      }
    }
  }, [isGesture]);

  useEffect(() => {
    if (initalRender) {
      initalRender = false;
    } else {
      leftEyeData();
    }
  }, [isSmile1, isSmile2, isSmile3, isSmile4]);

  const handleTalkback = (e) => {
    if (isTalkback) {
      setTalkback(false);
    } else {
      setGesture(false);
      setDisco(false);
      setTalkback(true);
    }
  };

  const handleDisco = (e) => {
    if (isDisco) {
      setDisco(false);
    } else {
      setTalkback(false);
      setGesture(false);
      setDisco(true);
    }
  };

  const handleGesture = (e) => {
    if (isGesture) {
      setGesture(false);
    } else {
      setTalkback(false);
      setDisco(false);
      setGesture(true);
    }
  };

  /*
   */

  const talkClick = (data, off) => {
    console.log("talk mode click");
    if (pre === 0) {
      // 1 n 1
      setPre(data1);
      setCur(data1);
      // console.log("talkback", pre, cur);
    } else if (off == "off") {
      console.log("haha", data);
      setPre(cur);
      setCur(data);
    } else {
      cur[2] = 0;

      setPre(cur);
      setCur(data1);
      // console.log(pre, "PREVIOUS DATA");
      // console.log(cur, "CURRENT DATA");
    }
  };

  const gestureClick = () => {
    // alert("GESTURE gestureClick()");
    console.log("Gesture mode on");
    if (pre === 0) {
      setPre(data2);
      setCur(data2);
    } else {
      cur[2] = 0;

      setPre(cur);
      setCur(data2);
      // console.log(pre, "PREVIOUS DATA");
      // console.log(cur, "CURRENT DATA");
    }
  };

  const discoClick = () => {
    // alert("discoClick discoClick()");

    console.log("Disco mode on");
    if (pre === 0) {
      setPre(data3);
      setCur(data3);
    } else {
      cur[2] = 0;
      setPre(cur);
      setCur(data3);

      // console.log(pre, "PREVIOUS DATA");
      // console.log(cur, "CURRENT DATA");
    }
  };

  // data = [pre, cur];

  data = cur;
  console.log("sent hardware data", data);

  useEffect(() => {
    // alert("SOCKET EMITs");

    if (pre != 0 && pre[2] != cur[2]) {
      setTimeout(() => {
        socket.emit("/remote", data, "IF ");
      }, 400);
      writePort(data);
    } else if (pre != 0 && pre[1] == cur[1] && pre[2] == cur[2]) {
      socket.emit("/remote", cur, "IF INITIAL");
    }
    // else if (cur == 0 && pre[0] == cur[0]) {
    //   socket.emit("/remote", cur);
    // }
  }, [cur]);

  const Sliderhandler = (value, name) => {
    if (name == "Right_green_slider") {
      setRightGreenSlider(value);
    } else if (name == "Right_blue_slider") {
      setRightBlueSlider(value);
    } else if (name == "Right_red_slider") {
      setRightRedSlider(value);
    }

    switch (name) {
      case "Left_green_slider": {
        setLeftGreenSlider(value);
        break;
      }
      case "Left_blue_slider": {
        setLeftBlueSlider(value);
        break;
      }
      case "Left_red_slider": {
        setLeftRedSlider(value);
        break;
      }
      case "buzzer_slider": {
        setBuzzer(value);
        break;
      }
    }
  };

  const [isHelp, setHelp] = useState(false);
  const [isUsb, setUsb] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
      console.log("CLICKED");
    } else {
      setHelp(true);
    }
  };

  const handleSimle1 = (e) => {
    setSmile1(!isSmile1);
  };
  const handleSimle2 = (e) => {
    setSmile2(!isSmile2);
  };

  const handleSimle3 = (e) => {
    setSmile3(!isSmile3);
  };

  const handleSimle4 = (e) => {
    setSmile4(!isSmile4);
  };

  // 24/02/2022   /////

  // usbDetect.find(4292, 60000, function (err, devices) {
  //   // console.log('find', devices, err);
  //   if (devices.length == 1) {
  //     socket.emit("/usbDetection", { detected: true });
  //     socket.emit("/usbDetection1", 1);
  //   } else if (devices.length == 0) {
  //     socket.emit("/usbDetection", { detected: false });
  //   }
  // });

  //*(************************************************************)*//

  const leftEyeData = () => {
    console.log("L_B", isL_Blue);

    console.log("left eye data activated");
    let data = [
      "R".charCodeAt(),
      "L".charCodeAt(),
      isLeftRedSlider ? JSON.parse(isL_Red) : 0,
      isLeftGreenSlider ? JSON.parse(isL_Green) : 0,
      isLeftBlueSlider ? JSON.parse(isL_Blue) : 0,

      "R".charCodeAt(),
      isRightRedSlider ? JSON.parse(isR_Red) : 0,
      isRightGreenSlider ? JSON.parse(isR_Green) : 0,
      isRightBlueSlider ? JSON.parse(isR_Blue) : 0,

      "B".charCodeAt(),
      JSON.parse(isFreq),
      isSmile1 ? 1 : 0,
      isSmile2 ? 1 : 0,
      isSmile3 ? 1 : 0,
      isSmile4 ? 1 : 0,
    ];
    console.log("emitting EyeData ", data);
    socket.emit("/remote", data, "firoz");
    let no = props.webserialPort.name;
    if (no != "Not Connected") {
      writePort(data);
    }
  };
  // console.log("Port Values", props.port);

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

  useEffect(() => {
    socket.emit("_usbDetection", "Hi i am firoz");
    socket.on("/usbDetection1", (data) => {
      // console.log("...............1", data);
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

  return (
    <div className="Main_Remote">
      <div className="Remote_Header">
        <div>
          {" "}
          <img
            className="Back_BTN"
            src={renderImage("backBtn")}
            onClick={gobackUrl}
          ></img>
        </div>
        <div>
          <p className="Play_Remote">Remote</p>
        </div>
        <div></div>
        <div>
          {isHelp == false ? (
            <img
              className="Help_Btn"
              src={renderImage("helpBtnInActive")}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className="Rem_Slider">
              <RemSlider />
            </div>
          )}
          {isHelp ? (
            <div>
              <img
                className="Cros"
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
      <div className="Remote_Body">
        <div className="Buzzer_Lefteye">
          <div className="Buzzer_Partition">
            <div>
              <img
                className="Buzzer_Bg"
                src={renderImage("buzzer_bg_Svg")}
              ></img>
              <h2 className="Buzzer_txt">Buzzer Frequency</h2>
            </div>

            <div className="Slider_Div3">
              {isBuzzer > 0 ? (
                <Slider
                  rangImgName="frequency_slider"
                  title="buzzer_slider"
                  onChangehandler={Sliderhandler}
                  componentName="freq"
                  leftEyeData={leftEyeData}
                  max={100}
                  setFreq={setFreq}
                  isFreq={isFreq}
                />
              ) : (
                <Slider
                  rangImgName="inactiveslider"
                  title="buzzer_slider"
                  onChangehandler={Sliderhandler}
                  componentName="freq"
                  leftEyeData={leftEyeData}
                  max={100}
                  setFreq={setFreq}
                  isFreq={isFreq}
                />
              )}
            </div>
          </div>

          <div className="Left_Partition">
            <div>
              <img
                className="Left_Eye_Backdround"
                src={renderImage("eye_bg_Svg")}
              ></img>
            </div>
            <div className="Slider_Div1">
              <div>
                {isLeftGreenSlider > 0 ? (
                  <Slider
                    rangImgName="green_slider"
                    title="Left_green_slider"
                    onChangehandler={Sliderhandler}
                    componentName="L_green"
                    leftEyeData={leftEyeData}
                    max={100}
                    setL_Green={setL_Green}
                    isL_Green={isL_Green}
                  />
                ) : (
                  <Slider
                    rangImgName="inactiveslider"
                    title="Left_green_slider"
                    onChangehandler={Sliderhandler}
                    componentName="L_green"
                    leftEyeData={leftEyeData}
                    max={100}
                    setL_Green={setL_Green}
                    isL_Green={isL_Green}
                  />
                )}
              </div>
              <div>
                {isLeftBlueSlider > 0 ? (
                  <Slider
                    rangImgName="blue_slider"
                    title="Left_blue_slider"
                    onChangehandler={Sliderhandler}
                    componentName="L_blue"
                    leftEyeData={leftEyeData}
                    max={100}
                    setL_Blue={setL_Blue}
                    isL_Blue={isL_Blue}
                  />
                ) : (
                  <Slider
                    rangImgName="inactiveslider"
                    title="Left_blue_slider"
                    onChangehandler={Sliderhandler}
                    componentName="L_blue"
                    leftEyeData={leftEyeData}
                    max={100}
                    setL_Blue={setL_Blue}
                    isL_Blue={isL_Blue}
                  />
                )}
              </div>
              <div>
                {isLeftRedSlider > 0 ? (
                  <Slider
                    rangImgName="red_slider"
                    title="Left_red_slider"
                    onChangehandler={Sliderhandler}
                    componentName="L_red"
                    leftEyeData={leftEyeData}
                    max={100}
                    setL_Red={setL_Red}
                    isL_Red={isL_Red}
                  />
                ) : (
                  <Slider
                    rangImgName="inactiveslider"
                    title="Left_red_slider"
                    onChangehandler={Sliderhandler}
                    componentName="L_red"
                    leftEyeData={leftEyeData}
                    max={100}
                    setL_Red={setL_Red}
                    isL_Red={isL_Red}
                  />
                )}
              </div>
            </div>

            <h2 className="Left_Eye_txt">
              Left <br /> Eye
            </h2>
          </div>
        </div>
        <div className="Ace_Teeth">
          <div style={RstyleDevicePC} className="ace">
            {isBuzzer > 0 ? (
              <img
                className="Buzzer_Inactive"
                src={renderImage("buzzerAc_Svg")}
              ></img>
            ) : (
              <img
                className="Buzzer_Inactive"
                src={renderImage("buzzerIA_Svg")}
              ></img>
            )}

            {isLeftGreenSlider > 0 ||
            isLeftRedSlider > 0 ||
            isLeftBlueSlider > 0 ? (
              <img
                className="Left_Eye_Inactive"
                src={renderImage("eyeAc_Svg")}
              ></img>
            ) : (
              <img
                className="Left_Eye_Inactive"
                src={renderImage("eyeIA_Svg")}
              ></img>
            )}

            {isRightGreenSlider > 0 ||
            isRightRedSlider > 0 ||
            isRightBlueSlider > 0 ? (
              <img
                className="Right_Eye_Inactive"
                src={renderImage("eyeAc_Svg")}
              ></img>
            ) : (
              <img
                className="Right_Eye_Inactive"
                src={renderImage("eyeIA_Svg")}
              ></img>
            )}
            {/* <img className="Right_Eye_Inactive" src={eyeIA}></img> */}

            {isSmile1 == false ? (
              <img
                className="Ace_Teeth1"
                src={renderImage("teethIA_Svg")}
              ></img>
            ) : (
              <img
                className="Ace_Teeth1"
                src={renderImage("teethAc_Svg")}
              ></img>
            )}

            {isSmile2 == false ? (
              <img
                className="Ace_Teeth2"
                src={renderImage("teethIA_Svg")}
              ></img>
            ) : (
              <img
                className="Ace_Teeth2"
                src={renderImage("teethAc_Svg")}
              ></img>
            )}

            {isSmile3 == false ? (
              <img
                className="Ace_Teeth3"
                src={renderImage("teethIA_Svg")}
              ></img>
            ) : (
              <img
                className="Ace_Teeth3"
                src={renderImage("teethAc_Svg")}
              ></img>
            )}

            {isSmile4 == false ? (
              <img
                className="Ace_Teeth4"
                src={renderImage("teethIA_Svg")}
              ></img>
            ) : (
              <img
                className="Ace_Teeth4"
                src={renderImage("teethAc_Svg")}
              ></img>
            )}

            <img
              className="Ace_4Teeth"
              src={renderImage("FourteethIA_Svg")}
            ></img>
          </div>
          <div>
            <img className="Teeth_Bg" src={renderImage("teeth_bg_Svg")}></img>

            {isSmile1 ? (
              <img
                className="Teeth_Smile1"
                src={renderImage("smile1_Active")}
                onClick={handleSimle1}
                alt="smileOneInactive"
              ></img>
            ) : (
              <img
                className="Teeth_Smile1"
                src={renderImage("smile1")}
                onClick={handleSimle1}
                alt="smileOneInactive"
              ></img>
            )}

            {isSmile2 ? (
              <img
                className="Teeth_Smile2"
                src={renderImage("smile2_Active")}
                onClick={handleSimle2}
                alt="smileTwoInactive"
              ></img>
            ) : (
              <img
                className="Teeth_Smile2"
                src={renderImage("smile2")}
                onClick={handleSimle2}
                alt="smileTwoInactive"
              ></img>
            )}

            {isSmile3 ? (
              <img
                className="Teeth_Smile3"
                src={renderImage("smile3_Active")}
                onClick={handleSimle3}
                alt="smileThreeInactive"
              ></img>
            ) : (
              <img
                className="Teeth_Smile3"
                src={renderImage("smile3")}
                onClick={handleSimle3}
                alt="smileThreeActive"
              ></img>
            )}
            {isSmile4 ? (
              <img
                className="Teeth_Smile4"
                src={renderImage("smile4_Active")}
                onClick={handleSimle4}
                alt="smileFourInactive"
              ></img>
            ) : (
              <img
                className="Teeth_Smile4"
                src={renderImage("smile4")}
                onClick={handleSimle4}
                alt="smileFourActive"
              ></img>
            )}
          </div>
        </div>
        <div className="Func_Righteye">
          <div>
            {isTalkback == false ? (
              <img
                className="Talkback_IA"
                src={renderImage("talk_IA")}
                onClick={(e) => {
                  handleTalkback();
                }}
                // onClick={handleTalkback}
                alt="TalkbackInactive"
              ></img>
            ) : (
              <img
                className="Talkback_IA"
                src={renderImage("talk_Ac")}
                onClick={(e) => {
                  handleTalkback();
                }}
                // onClick={handleTalkback}
                alt="TalkbackActive"
              ></img>
            )}

            <p className="Talkback_txt">Talk Back</p>

            {isDisco == false ? (
              <img
                className="Disco_IA"
                src={renderImage("disco_IA")}
                onClick={(e) => {
                  handleDisco();
                }}
                // onClick={handleDisco}
                alt="DiscoInactive"
              ></img>
            ) : (
              <img
                className="Disco_IA"
                src={renderImage("disco_Ac")}
                onClick={(e) => {
                  handleDisco();
                }}
                // onClick={handleDisco}
                alt="DiscoActive"
              ></img>
            )}
            <p className="Disco_txt">Disco</p>

            {isGesture == false ? (
              <img
                className="Gesture_IA"
                src={renderImage("gesture_IA")}
                onClick={(e) => {
                  handleGesture();
                }}
                // onClick={handleGesture}
                alt="GestureInactive"
              ></img>
            ) : (
              <img
                className="Gesture_IA"
                src={renderImage("gesture_Ac")}
                onClick={(e) => {
                  handleGesture();
                }}
                // onClick={handleGesture}
                alt="GestureActive"
              ></img>
            )}

            <p className="Gesture_txt">Gesture</p>
          </div>
          <div className="Right_Partition">
            <div>
              <img
                className="Right_Eye_Backdround"
                src={renderImage("eye_bg_Svg")}
              ></img>
              <h2 className="Right_Eye_txt">Right Eye</h2>
            </div>
            <div className="Slider_Div2">
              <div>
                {isRightGreenSlider > 0 ? (
                  <Slider
                    rangImgName="green_slider"
                    title="Right_green_slider"
                    onChangehandler={Sliderhandler}
                    componentName="R_green"
                    leftEyeData={leftEyeData}
                    max={100}
                    setR_Green={setR_Green}
                    isR_Green={isR_Green}
                  />
                ) : (
                  <Slider
                    rangImgName="inactiveslider"
                    title="Right_green_slider"
                    onChangehandler={Sliderhandler}
                    componentName="R_green"
                    leftEyeData={leftEyeData}
                    max={100}
                    setR_Green={setR_Green}
                    isR_Green={isR_Green}
                  />
                )}
              </div>

              <div>
                {isRightBlueSlider > 0 ? (
                  <Slider
                    rangImgName="blue_slider"
                    title="Right_blue_slider"
                    onChangehandler={Sliderhandler}
                    componentName="R_blue"
                    leftEyeData={leftEyeData}
                    max={100}
                    setR_Blue={setR_Blue}
                    isR_Blue={isR_Blue}
                  />
                ) : (
                  <Slider
                    rangImgName="inactiveslider"
                    title="Right_blue_slider"
                    onChangehandler={Sliderhandler}
                    componentName="R_blue"
                    leftEyeData={leftEyeData}
                    max={100}
                    setR_Blue={setR_Blue}
                    isR_Blue={isR_Blue}
                  />
                )}
              </div>
              <div>
                {isRightRedSlider > 0 ? (
                  <Slider
                    rangImgName="red_slider"
                    title="Right_red_slider"
                    onChangehandler={Sliderhandler}
                    componentName="R_red"
                    leftEyeData={leftEyeData}
                    max={101}
                    setR_Red={setR_Red}
                    isR_Red={isR_Red}
                  />
                ) : (
                  <Slider
                    rangImgName="inactiveslider"
                    title="Right_red_slider"
                    onChangehandler={Sliderhandler}
                    componentName="R_red"
                    leftEyeData={leftEyeData}
                    max={101}
                    setR_Red={setR_Red}
                    isR_Red={isR_Red}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
// export default RemoteSection;

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);

  return {
    webserialPort: state.webSerial,
  };
};

export default connect(mapStateToProps)(RemoteSection);
