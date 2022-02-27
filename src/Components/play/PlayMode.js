import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./PlayMode.css";
import {
  backBtn,
  PlayCard,
  helpBtnInActive,
  helpBtnActive,
  PlayCard_Svg,
  RemoteCard_Svg,
  SpeechCard_Svg,
  MusicCard_Svg,
  Camera_Svg,
  clos,
} from "../../source/index";

import renderImage from "../../source/importImg";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";

// import { webSerialAction } from "../../redux/actions/index";
import ImgSlider from "../ReusableComponents/ImgSlider/ImgSlider";
import RemoteSection from "./Remote/Ace/RemoteSection/RemoteSection";

function Play(props) {
  let history = useHistory();

  const gobackUrl = () => {
    history.goBack();
  };
  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };

  // const [p1, setP1] = useState({
  //   selected: false,
  //   port: {},
  // });

  // useEffect(async () => {
  //   try {
  //     const portList = await navigator.serial.getPorts();

  //     if (portList.length === 1) {
  //       console.log(portList, "Hardware connected");

  //       props.webSerialAction({ port: portList[0] });

  //       setP1({
  //         selected: true,
  //         port: portList[0],
  //       });
  //     } else {
  //       console.log("No hardware");

  //       setP1({ p1 });
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }, []);

  // console.log(p1, "render");
  return (
    <div className="Main_Play">
      <div>
        <img
          className="Back_Btn"
          src={renderImage("backBtn")}
          onClick={gobackUrl}
        ></img>
        <img className="Play_Card" src={renderImage("PlayCard_Svg")}></img>
        <h1 className="Play_txxt">Play</h1>
        {isHelp == false ? (
          <img
            className="Help_Button"
            src={renderImage("helpBtnInActive")}
            onClick={handleHelpBtn}
          ></img>
        ) : (
          <div className="IMG-slide">
            <ImgSlider />
          </div>
        )}
        {isHelp ? (
          <img
            className="help_close"
            src={renderImage("clos")}
            onClick={handleHelpBtn}
          ></img>
        ) : null}
        {/* <img className="Help_Button" src={help}></img> */}
      </div>
      <div className="Play_Functions">
        <div></div>
        {isHelp ? (
          <div style={{ zIndex: "-10" }}>
            <Link to="/remote">
              <img
                className="Remote_Card"
                src={renderImage("RemoteCard_Svg")}
              ></img>

              <h1 className="Remote_txt">Remote </h1>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to={{
                pathname: `/remote-Ace`,
                // state: { port: p1 },
              }}
            >
              <img
                className="Remote_Card"
                src={renderImage("RemoteCard_Svg")}
                // onClick={AskUserForComport}
              ></img>

              <h1 className="Remote_txt">Remote</h1>
            </Link>
          </div>
        )}

        <div></div>

        {isHelp ? (
          <div style={{ zIndex: "-10" }}>
            <Link to="/speak">
              <img
                className="Speech_Card"
                src={renderImage("SpeechCard_Svg")}
              ></img>
              {/* <Link to="/speech"> */}
              <h1 className="Speech_txt">Speech</h1>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/speak">
              <img
                className="Speech_Card"
                src={renderImage("SpeechCard_Svg")}
              ></img>
              {/* <Link to="/speech"> */}
              <h1 className="Speech_txt">Speech</h1>
            </Link>
          </div>
        )}
        <div></div>
        {/* <div>
          // {p1.selected === true ? <RemoteSection port={setP1} /> : null}
        </div> */}
        {isHelp ? (
          <div style={{ zIndex: "-10" }}>
            <Link to="/music">
              <img
                className="Music_Card"
                src={renderImage("MusicCard_Svg")}
              ></img>
              {/* <Link to="/music"> */}
              <h1 className="Music_txt">Music</h1>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/music">
              <img
                className="Music_Card"
                src={renderImage("MusicCard_Svg")}
              ></img>
              {/* <Link to="/music"> */}
              <h1 className="Music_txt">Music</h1>
            </Link>
          </div>
        )}

        <div></div>

        {isHelp ? (
          <div style={{ zIndex: "-10" }}>
            <Link to="/camera">
              <img
                className="Camera_Card"
                src={renderImage("Camera_Svg")}
              ></img>
              {/* <Link to="/camera"> */}
              <h1 className="Camera_txt">Camera</h1>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/camera">
              <img
                className="Camera_Card"
                src={renderImage("Camera_Svg")}
              ></img>
              {/* <Link to="/camera"> */}
              <h1 className="Camera_txt">Camera</h1>
            </Link>
          </div>
        )}

        <div></div>

        <div></div>
      </div>
      <div></div>
    </div>
  );
}

export default Play;
// const mapStateToProps = (state) => {
//   return {
//     webserialPort: state.webSerial,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     webSerialAction: (data) => {
//       console.log("mapDispatchToProps", data);
//       dispatch(webSerialAction(data));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Play);
