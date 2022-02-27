import React, { useState } from "react";

import SliderRange from "../../../../ReusableComponents/SliderRange/SliderRange.js";

import "./RemoteSection.css";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
// import SliderRange2 from '../../../../ReusableComponents/SliderRange2/SliderRange2';
// import sessionStorage from '../../../../LocalStorage/LocalStorage';

const socket = io("http://localhost:3008");
function RemoteSection() {
  let history = useHistory();

  let Peripherial;
  const goBackUrl = () => {
    history.goBack();
  };

  const RemoteSection_container_Style = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/imagesplay/PlayComputerAssets/Mask_Group_22.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    width: "100vw",
    height: "100vh",
  };

  const INFO_Btn = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/imagesplay/PlayComputerAssets/Group_3116.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    width: "100px",
    height: "100px",
  };

  const BluetoothStyle = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/imagesplay/PlayComputerAssets/Group_3115.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    width: "100px",
    height: "140px",
  };

  const LedControlStyle = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/imagesplay/PlayComputerAssets/Group_3107.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "95% 100%",
    width: "100%",
    height: "100%",
    marginLeft: "6%",
  };

  const BeeperControlStyle = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/imagesplay/PlayComputerAssets/Group3106.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    width: "100%",
    height: "100%",
  };

  const PlayComputerImg = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/imagesplay/PlayComputerAssets/pc.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "102% 90%",
    marginTop: "25%",
  };

  const getData = () => {
    console.log("Called........");
  };
  const [isClickLeftEye, setCheckLeftEye] = useState(false);

  const [isClickRightEye, setCheckRightEye] = useState(false);

  const [disco, setDisco] = useState(true);

  const [gesture, setGesture] = useState(true);

  const [detected, setDetected] = useState();
  const [usbOpen, setUsbOpen] = useState();

  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [red, setRed] = useState(0);

  const [intensity, setIntensity] = useState(0);
  const [freq, setFreq] = useState(0);

  const [talk, setTalk] = useState(true);
  const handlerLeftEye = (e) => {
    console.log("left");
    if (isClickLeftEye) {
      setCheckLeftEye(false);
    } else {
      setCheckLeftEye(true);
    }
  };

  React.useEffect(() => {
    Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
    console.log(Peripherial);
    socket.emit("_usbDetection", "Hi");
    socket.on("/usbDetection", (data) => {
      console.log("...............0", data);
      setDetected(data.detected);
      setUsbOpen(!data.detected);
    });
  }, []);

  const handlerRightEye = (e) => {
    console.log("right", isClickRightEye);
    if (isClickRightEye) {
      setCheckRightEye(false);
    } else {
      setCheckRightEye(true);
    }
  };

  const discoClick = () => {
    // console.log("Follow Line click");
    let data = ["R".charCodeAt(), "D".charCodeAt(), disco ? 1 : 0];
    console.log("Emitting disco data", data, Peripherial);
    socket.emit("/remote", data, Peripherial);
  };

  const talkClick = () => {
    // console.log("Follow Line click");
    let data = ["R".charCodeAt(), "T".charCodeAt(), talk ? 1 : 0];
    console.log("Emitting talk data", data);
    socket.emit("/remote", data, Peripherial);
  };

  const gestureClick = () => {
    // console.log("Follow Line click");
    let data = ["R".charCodeAt(), "G".charCodeAt(), gesture ? 1 : 0];
    console.log("Emitting gesture data", data);
    socket.emit("/remote", data, Peripherial);
  };

  const leftEyeData = () => {
    let data = [
      "R".charCodeAt(),
      "l".charCodeAt(),
      isClickLeftEye ? JSON.parse(green) : 0,
      isClickLeftEye ? JSON.parse(red) : 0,
      isClickLeftEye ? JSON.parse(blue) : 0,
      "R".charCodeAt(),
      isClickRightEye ? JSON.parse(green) : 0,
      isClickRightEye ? JSON.parse(blue) : 0,
      isClickRightEye ? JSON.parse(red) : 0,
      "B".charCodeAt(),
      JSON.parse(intensity),
      JSON.parse(freq),
    ];
    Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
    console.log("emitting EyeData ", data);
    socket.emit("/remote", data, Peripherial);
  };

  return (
    <div
      className="RemoteSection-container"
      style={RemoteSection_container_Style}
    >
      <div className="Item1-RemoteSection">
        {/* <div className="Item1-Section-BackButton" onClick={goBackUrl}>
         
          <img
            src={
              process.env.PUBLIC_URL +
              "/imagesplay/PlayComputerAssets/Back_Button.png"
            }
            style={{
              cursor: "pointer",
              marginTop: "10px",
              width: "70px",
              height: "70px",
              position: "absolute",
              top: "-1vh",
              left: "2.3vw",
            }}
          />
          <h1 className="RemoteSection-TEXT-BackButton">REMOTE</h1>
        </div>
 */}

        <div onClick={goBackUrl}>
          <img
            src="images/Learn/login_button_back.png"
            style={{
              zIndex: "1",
              height: "39px",
              width: "39px",
              float: "left",
              position: "relative",
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
              top: "12%",
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

        <div className="Item2-Section-Top-Right">
          <div className="Item2-Section-Info" style={INFO_Btn}></div>

          <div className="Item2-Section-Bluetooth" style={BluetoothStyle}></div>
        </div>
      </div>

      <div className="Item2-RemoteSection">
        <div className="Item2-Section1-LedControl" style={LedControlStyle}>
          <div className="LedControl-Main">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/imagesplay/PlayComputerAssets/Group3105.png`
                }
                height="35px"
                width="30px"
                style={{
                  placeSelf: "center",
                  marginRight: "30px",
                  marginTop: "-3%",
                }}
              />
              <p
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  marginLeft: "-10px",
                  color: "#ffff",
                  fontSize: "4vh",
                  textAlign: "center",
                  marginTop: "4%",
                }}
              >
                LED Remote Controls
              </p>
            </div>

            <div className="LedControl_Bottom_section">
              <div className="LedControl_Eyes_Section">
                <div
                  className="Led_control_let_eye"
                  style={{
                    width: "70%",
                    height: "65%",
                    marginTop: "3%",
                    justifySelf: "flex-end",
                  }}
                  onClick={() => {
                    handlerLeftEye();
                    leftEyeData();
                  }}
                >
                  {isClickLeftEye ? (
                    <>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/imagesplay/PlayComputerAssets/eye_left_selection.png`
                        }
                        width="100%"
                        height="100%"
                        style={{
                          boxShadow: "18px 8px 18px  #DAD5EA",
                        }}
                      />
                      <span
                        style={{
                          position: "relative",
                          left: "18%",
                          bottom: "70%",
                        }}
                      >
                        ON
                      </span>
                    </>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        // backgroundColor: "#4527A0",
                        backgroundImage:
                          process.env.PUBLIC_URL +
                          `/imagesplay/PlayComputerAssets/p_eye_selection.png`,
                        boxShadow: "18px 8px 18px  #DAD5EA",
                      }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/imagesplay/PlayComputerAssets/p_eye_selection.png`
                        }
                        width="100%"
                        height="100%"
                        style={{
                          boxShadow: "18px 8px 18px  #DAD5EA",
                        }}
                      />
                      <span
                        style={{
                          position: "relative",
                          left: "18%",
                          bottom: "70%",
                        }}
                      >
                        OFF
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className="Led_control_let_eye"
                  style={{
                    width: "70%",
                    height: "65%",
                    marginTop: "3%",
                    justifySelf: "flex-start",
                  }}
                  onClick={() => {
                    handlerRightEye();
                    leftEyeData();
                  }}
                >
                  {isClickRightEye ? (
                    <>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/imagesplay/PlayComputerAssets/eye_right_selection.png`
                        }
                        // onClick={() => {
                        //   handlerRightEye();
                        //   leftEyeData()
                        // }}
                        width="100%"
                        height="100%"
                        style={{
                          boxShadow: "0 12px 10px -5px #DAD5EA",
                        }}
                      />{" "}
                      <span
                        style={{
                          position: "relative",
                          left: "64%",
                          bottom: "70%",
                        }}
                      >
                        ON
                      </span>
                    </>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/imagesplay/PlayComputerAssets/p_eye_selection.png`
                        }
                        width="100%"
                        height="99%"
                        style={{
                          transform: `rotate(180deg)`,
                        }}
                      />
                      <span
                        style={{
                          position: "relative",
                          left: "64%",
                          bottom: "70%",
                        }}
                      >
                        OFF
                      </span>
                    </div>
                  )}
                </div>

                <p
                  style={{
                    justifySelf: "center",
                    alignSelf: "end",
                    color: "#4527A0",
                    fontSize: "1.5vw",
                  }}
                >
                  Left Eye
                </p>

                <p
                  style={{
                    justifySelf: "center",
                    color: "#4527A0",
                    alignSelf: "end",
                    fontSize: "1.5vw",
                  }}
                >
                  Right Eye
                </p>
              </div>

              <div
                className="LedControl_RBG_Section"
                // style={{ border: "1px solid purple" }}
              >
                {isClickLeftEye || isClickRightEye ? (
                  <>
                    <div className="RBG-Led-SeekItem1">
                      <SliderRange
                        title="Green"
                        rangImgName="green_slider"
                        class="green"
                        leftEyeData={leftEyeData}
                        max={255}
                        setGreen={setGreen}
                        green={green}
                      />
                    </div>
                    <div className="RBG-Led-SeekItem1">
                      <SliderRange
                        title="Blue"
                        rangImgName="blue_slider"
                        class="blue"
                        leftEyeData={leftEyeData}
                        max={255}
                        setBlue={setBlue}
                        blue={blue}
                      />
                    </div>
                    <div className="RBG-Led-SeekItem1">
                      <SliderRange
                        title="Red"
                        rangImgName="red_slider"
                        class="red"
                        leftEyeData={leftEyeData}
                        max={255}
                        setRed={setRed}
                        red={red}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="RBG-Led-SeekItem1">
                      <SliderRange
                        title="Green"
                        rangImgName="green_slider"
                        class="green"
                        disabled
                        leftEyeData={leftEyeData}
                        max={255}
                        setGreen={setGreen}
                        green={green}
                      />
                    </div>
                    <div className="RBG-Led-SeekItem1">
                      <SliderRange
                        title="Blue"
                        rangImgName="blue_slider"
                        class="blue"
                        disabled
                        leftEyeData={leftEyeData}
                        max={255}
                        setBlue={setBlue}
                        blue={blue}
                      />
                    </div>
                    <div className="RBG-Led-SeekItem1">
                      <SliderRange
                        title="Red"
                        rangImgName="red_slider"
                        class="red"
                        disabled
                        leftEyeData={leftEyeData}
                        max={255}
                        setRed={setRed}
                        red={red}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="Item2-Section2-PlayComputerImg"
          style={PlayComputerImg}
        ></div>

        <div className="Item2-Section3-BeeperControl">
          <div
            className="Section3-BeeperControl-IMG"
            style={BeeperControlStyle}
          >
            <div className="Section3-BeeperControl-MainContainer">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/imagesplay/PlayComputerAssets/Group3102.png`
                  }
                  height="20px"
                  width="30px"
                  style={{
                    placeSelf: "center",
                    marginRight: "30px",
                  }}
                />
                <p
                  style={{
                    textAlign: "center",
                    color: "#ffffff",
                    marginLeft: "-10px",
                    color: "#ffff",
                    fontSize: "4vh",
                    textAlign: "center",
                    marginTop: "4%",
                  }}
                >
                  Beeper Control
                </p>
              </div>

              <div className="Section3-BeeperControl-SeekContainer">
                <div className="Section3-BeeperControl-Low_HighTxt">
                  <p style={{ fontSize: "1.5vw" }}>Low</p>
                  <p style={{ fontSize: "1.5vw" }}>High</p>
                </div>
                <div className="Section3-BeeperControl-SeekItem">
                  <div className="Section3-BeeperControl-SeekItem1">
                    <SliderRange
                      title="Intensity"
                      rangImgName="intensity_slider_for_sound"
                      leftEyeData={leftEyeData}
                      max={100}
                      setIntensity={setIntensity}
                      intensity={intensity}
                      class="intensity"
                    />
                  </div>
                  <div className="Section3-BeeperControl-SeekItem2">
                    <SliderRange
                      title="Frequency"
                      rangImgName="intensity_slider_for_sound"
                      leftEyeData={leftEyeData}
                      max={100}
                      setFreq={setFreq}
                      freq={freq}
                      class="freq"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="Section3-BeeperControl-Mode">
            <div className="Item1-Section3-BeeperControl-Mode">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/imagesplay/PlayComputerAssets/disco.png`
                }
                onClick={(e) => {
                  discoClick();
                  setDisco(!disco);
                  if (disco) e.target.style.backgroundColor = "#DAE4E3";
                  if (!disco) e.target.style.backgroundColor = "transparent";
                }}
                height="95%"
                width="100%"
              />
              <p
                style={{
                  color: "#4527A0",
                  position: "absolute",
                  fontSize: "1.4vw",

                  left: "20%",
                  bottom: "0%",
                }}
              >
                {" "}
                Disco Mode
              </p>
            </div>

            <div className="Item1-Section3-BeeperControl-Mode">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/imagesplay/PlayComputerAssets/Talk.png`
                }
                height="95%"
                width="100%"
                style={{ marginLeft: "-15%" }}
                onClick={(e) => {
                  talkClick();
                  setTalk(!talk);
                  if (talk) e.target.style.backgroundColor = "#DAE4E3";
                  if (!talk) e.target.style.backgroundColor = "transparent";
                }}
              />
              <p
                style={{
                  fontSize: "1.4vw",
                  color: "#4527A0",
                  position: "absolute",

                  left: "10%",
                  bottom: "-14%",
                }}
              >
                {" "}
                Talk Back <span style={{ marginLeft: "17%" }}> Mode</span>
              </p>
            </div>

            <div className="Item1-Section3-BeeperControl-Mode">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/imagesplay/PlayComputerAssets/gestures_.png`
                }
                height="95%"
                width="100%"
                style={{ marginLeft: "-30%" }}
                onClick={(e) => {
                  gestureClick();
                  setGesture(!gesture);
                  if (gesture) e.target.style.backgroundColor = "#DAE4E3";
                  if (!gesture) e.target.style.backgroundColor = "transparent";
                }}
              />
              <p
                style={{
                  color: "#4527A0",
                  position: "absolute",
                  fontSize: "1.4vw",

                  left: " -15%",
                  bottom: "-14%",
                }}
              >
                {" "}
                Gesture Sense <span style={{ marginLeft: "25%" }}> Mode</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoteSection;
