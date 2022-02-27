import React, { Component } from "react";
import "./speak.css";

import SpeechToText from "speech-to-text";
import { Link } from "react-router-dom";

import io from "socket.io-client";
import Modal from "react-modal";
import {
  buttonBackSrc,
  humanoid_img,
  // IllusVoiceSrc,
  speakhumanoid,
  playSpeakButtonTalkSrc,
  playSpeakIllusVoiceSrc,
} from "../../../../source/source";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "flex-end",
    marginTop: "20%",
    cursor: "pointer",
  },
  button: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    margin: "6em 0 2em 0",
    backgroundImage: `url(${playSpeakButtonTalkSrc})`,
    backgroundSize: "cover",
    border: "none",
    outline: "none",
    cursor: "pointer",
    zIndex: "10000",
  },
  interim: {
    color: "gray",
    border: "#ccc 1px solid",
    padding: "1em",
    margin: "1em",
    width: "300px",
  },
  final: {
    color: "black",
    border: "#ccc 1px solid",
    padding: "1em",
    margin: "1em",
    width: "300px",
  },
};

const lang = {
  English: "en-US",
  Hindi: "hi",
  Punjabi: "pa",
  kannada: "kn",
  Bengali: "bn",
  Gujarati: "gu",
  Marathi: "mr",
  Telugu: "te",
  Tamil: "ta",
  Malayalam: "ml",
};

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
let newconn;
class Speak extends Component {
  constructor(props) {
    super(props);
    Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));

    this.state = {
      colorMc: "linear-gradient(150deg, #FF6838 0%, #FFEC7E 100%)",
      message: "Mouse Event",
      speakD: "",
      error: "",
      interimText: "",
      finalisedText: [],
      listening: false,
      language: "en-US",
      value: "",
      langValue: "",
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  toggleListen() {
    this.setState(
      {
        listening: !this.state.listening,
      },
      this.handleListen
    );
  }

  handleListen() {
    console.log("listening?", this.state.listening, this.state.value);
    recognition.continous = false;
    // recognition.interimResults = true
    recognition.lang = this.state.value;

    if (this.state.listening) {
      recognition.start();
      recognition.onend = () => {
        console.log("...continue listening...");
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click");
      };
    }
    recognition.onstart = () => {
      console.log("Listening!");
    };
    let finalTranscript = "";
    recognition.onresult = (event) => {
      // let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        // else interimTranscript += transcript;
      }
      // document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById("final").innerHTML = finalTranscript;
      this.setState({ langValue: finalTranscript });

      //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(" ");
      const stopCmd = transcriptArr.slice(-3, -1);
      console.log("stopCmd", stopCmd);
      if (stopCmd[0] === "go" && stopCmd[1] === "forward") {
        console.log("forward emit");
        socket.emit(
          "/speak",
          ["S".charCodeAt(), "1".charCodeAt()],
          Peripherial
        );
      } else if (stopCmd[0] === "go" && stopCmd[1] === "backward") {
        socket.emit(
          "/speak",
          ["S".charCodeAt(), "2".charCodeAt()],
          Peripherial
        );
        console.log("backward emit");
      } else if (stopCmd[0] === "go" && stopCmd[1] === "left") {
        socket.emit(
          "/speak",
          ["S".charCodeAt(), "3".charCodeAt()],
          Peripherial
        );
        console.log("left emit");
      } else if (stopCmd[0] === "go" && stopCmd[1] === "right") {
        socket.emit(
          "/speak",
          ["S".charCodeAt(), "4".charCodeAt()],
          Peripherial
        );
        console.log("right emit");
      } else if (stopCmd[0] === "आगे" && stopCmd[1] === "जाओ") {
        console.log("forward emit");
        socket.emit(
          "/speak",
          ["S".charCodeAt(), "1".charCodeAt()],
          Peripherial
        );
      } else if (stopCmd[0] === "पीछे " && stopCmd[1] === "जाओ") {
        socket.emit(
          "/speak",
          ["S".charCodeAt(), "2".charCodeAt()],
          Peripherial
        );
      } else if (stopCmd[0] === "बाएं " && stopCmd[1] === "जाओ") {
        socket.emit(
          "/speak",
          ["S".charCodeAt(), "3".charCodeAt()],
          Peripherial
        );
      } else if (stopCmd[0] === "दाएं " && stopCmd[1] === "जाओ") {
        socket.emit(
          "/speak",
          ["S".charCodeAt(), "4".charCodeAt()],
          Peripherial
        );
      }

      if (stopCmd[0] === "stop" && stopCmd[1] === "listening") {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per command");
          const finalText = transcriptArr.slice(0, -3).join(" ");
          document.getElementById("final").innerHTML = finalText;
        };
      }
    };
    recognition.onerror = (event) => {
      console.log("Error occurred in recognition: " + event.error);
    };
  }

  componentDidMount = () => {
    socket.emit("_usbDetection", "Hi");
    socket.on("/usbDetection", (data) => {
      console.log("...............0", data);
      this.setState({ detected: data.detected, usbOpen: !data.detected });
    });
    newconn = sessionStorage.getItem("connectionMode");
  };

  onAnythingSaid = (text) => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = (text) => {
    this.setState({
      // finalisedText: [text, ...this.state.finalisedText],

      finalisedText: text,
      interimText: "",
    });
  };

  // Event Handle
  handleEvent = (event) => {
    if (event.type === "mousedown") {
      this.setState({ message: "Mouse Down" });
      // console.log("MDown");
      this.startListening();
    } else {
      this.setState({ message: "Mouse Up" });
      this.stopListening();
    }
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
          src="images/login/button_exit@2x.png"
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
        {/* <h1>Tern</h1> */}
        {/* <Link to="/introduction">
          <div
            className="backBtn"
            style={{ backgroundImage: `url(${buttonBackSrc})` }}
          ></div>
        </Link> */}

        {/* 
<div style={{ position: "absolute", top: "0" }}>
          <p className="Playtitle">Speak</p>
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
                SPEAK
              </span>
            </div>
          </div>
        </Link>

        {/* <div className="help click"></div> */}
        {usbDetectionModel}
        <div className="usb">
          <img
            style={{ height: "40px", width: "35px" }}
            src={imageURL}
            alt="image"
          />
        </div>

        {sessionStorage.getItem("connectedDevice") == "Humanoid" ? (
          <div className="human-speak_Ace1">
            <div
              className="human-speak_Ace"
              style={{ backgroundImage: `url(${speakhumanoid})` }}
            />
          </div>
        ) : (
          <div className="human-speak_Ace1">
            <div
              className="human-speak"
              style={{ backgroundImage: `url(${playSpeakIllusVoiceSrc})` }}
            />
          </div>
        )}

        {/* <div className="microBack microBack_effect"  
                style={{backgroundImage: `url(${playSpeakButtonBgSrc})`}}>
                        <div id='microphoneBtn click'  onClick={this.toggleListen}  
                        style={{backgroundImage: `url(${playSpeakButtonTalkSrc})`}}/>
                </div> */}

        <div style={styles.container}>
          <button
            id="microphone-btn"
            style={styles.button}
            onClick={() => {
              this.toggleListen();
            }}
          />
          <select
            name="lang"
            id="lang"
            onChange={(e) => {
              this.setState({ value: e.target.value });
            }}
            ref={(ref) => {
              this._select = ref;
              // console.log(this.state.langValue)
              // console.log(ref,this.state.value, 'नमस्ते')
            }}
          >
            <option value={lang.English}>English</option>
            <option value={lang.Hindi}>Hindi</option>
            <option value={lang.kannada}>Kannada</option>
            <option value={lang.Malayalam}>Malayalam</option>
            <option value={lang.Tamil}>Tamil</option>
            <option value={lang.Telugu}>Telugu</option>
            <option value={lang.Marathi}>Marathi</option>
            <option value={lang.Gujarati}>Gujarati</option>
            <option value={lang.Bengali}>Bengali</option>
            <option value={lang.Punjabi}>Punjabi</option>
          </select>
          <div id="final" style={styles.final}></div>
        </div>
      </div>
    );
  }
}

export default Speak;
