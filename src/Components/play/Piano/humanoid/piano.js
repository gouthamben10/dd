import React, { Component } from "react";
import "./piano.css";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Modal from "react-modal";
import { buttonBackSrc } from "../../../../source/source";
const socket = io("http://localhost:3008");
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
let Peripherial;
//
//socket.emit('/scanDevice');

class HumanoidPiano extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humanoidIsConnected: false,
      clickedData: "0",

      humanoidIsConnectedStyle: {
        backgroundImage: `url('/imagesplay/humanoid/connectedHumanoid.png')`,
        position: "relative",
        top: "-7vw",
        left: " 51vw",
        width: "21vw",
        height: "53vh",
        backgroundSize: "contain",
        backgroundRepeat: " no-repeat ",
      },
    };

    // cheking the connection of tern in 2000 ms

    setInterval(() => {
      if (!this.state.humanoidIsConnected) {
        const disconnected = {
          backgroundImage: `url('/imagesplay/humanoid/disconnectedHumanoid.png')`,
          position: "relative",
          top: "-7vw",
          left: " 51vw",
          width: "21vw",
          height: "53vh",
          backgroundSize: "contain",
          backgroundRepeat: " no-repeat ",
        };
        this.setState({ humanoidIsConnectedStyle: disconnected });
      }
    }, 2000);
  }
  componentDidMount = () => {
    Peripherial = JSON.parse(localStorage.getItem("Bluetooth"));
  };
  M1 = () => {
    socket.emit(
      "/music/keys",
      ["M".charCodeAt(), "1".charCodeAt()],
      Peripherial
    );
    console.log("1");
  };
  M2 = () => {
    socket.emit(
      "/music/keys",
      ["M".charCodeAt(), "2".charCodeAt()],
      Peripherial
    );
    console.log("2");
  };
  M3 = () => {
    socket.emit(
      "/music/keys",
      ["M".charCodeAt(), "3".charCodeAt()],
      Peripherial
    );
    console.log("3");
  };
  M4 = () => {
    socket.emit(
      "/music/keys",
      ["M".charCodeAt(), "4".charCodeAt()],
      Peripherial
    );
    console.log("4");
  };
  M5 = () => {
    socket.emit(
      "/music/keys",
      ["M".charCodeAt(), "5".charCodeAt()],
      Peripherial
    );

    console.log("5");
  };
  M6 = () => {
    socket.emit(
      "/music/keys",
      ["M".charCodeAt(), "6".charCodeAt()],
      Peripherial
    );

    console.log("6");
  };
  M7 = () => {
    socket.emit(
      "/music/keys",
      ["M".charCodeAt(), "7".charCodeAt()],
      Peripherial
    );

    console.log("7");
  };
  M8 = () => {
    socket.emit(
      "/music/keys",
      ["M".charCodeAt(), "8".charCodeAt()],
      Peripherial
    );

    console.log("8");
  };
  render() {
    return (
      <div className="play-introduction">
        {/* <Link to="/introduction">
                    <div className="backBtn" style={{backgroundImage: `url(${buttonBackSrc})`}}></div>
                </Link>
                
                <div>
                    <p className="Playtitle">Music</p>
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
                MUSIC
              </span>
            </div>
          </div>
        </Link>

        {/* <div className="help click"></div> */}
        <div className="usb "></div>

        {/* Piano code below */}

        <div className="set">
          <div className=" a white a li" onClick={this.M1}></div>
          <div className="black as li"></div>
          <div className="white b li" onClick={this.M2}></div>
          <div className="black bs li"></div>
          <div className="white c li" onClick={this.M3}></div>

          <div className="white d li" onClick={this.M4}></div>
          <div className="black ds li"></div>
          <div className="white e li" onClick={this.M5}></div>
          <div className="black es li"></div>
          <div class="white f li" onClick={this.M6}></div>

          <div className="white g li" onClick={this.M7}></div>
          <div className="white h li" onClick={this.M8}></div>
          <div className="black hs li"></div>

          <div
            className="tern-device-music"
            style={this.state.humanoidIsConnectedStyle}
          />
        </div>
      </div>
    );
  }
}

export default HumanoidPiano;
