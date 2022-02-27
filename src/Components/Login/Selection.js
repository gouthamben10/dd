import React from "react";
import SelectionStyle from "./Selection.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import unicodeToChar from "../../utils/unicodeToChar";
import {
  backBtn,
  helpBtnInActive,
  helpBtnActive,
  // play,
  // build,
  // program,
  Pc,
  PlayCard,
  PlayCard2,
  PlayCard_Svg,
  clos,
} from "../../source/index";
import play from "../../Assets/play button.png";
import program from "../../Assets/program button.png";
import build from "../../Assets/build button.png";
import SMSlider from "../ReusableComponents/SelectModeSlider/SMSlider";

function Selection(props) {
  let history = useHistory();

  const gobackUrl = () => {
    history.push("/deviceSelection");
  };

  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };
  const playBtn = () => {
    history.push("/introduction");
  };
  const programBtn = () => {
    localStorage.setItem("programMode", "program");

    history.push("/visualProgram");
  };
  const buildBtn = () => {
    window.location.assign("http://metik.bibox.in/");
  };

  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem("user")), "KAMAL");
    let no_port = props.webserialPort.name;
    console.log("PORT Data", no_port);
    if (no_port == "Not Connected") {
      console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
      console.log("SERIAL PORT NOT CONNECTED");
    } else {
      OpenReadComPort();
    }
  }, []);

  const OpenReadComPort = async () => {
    const p_Port = props.webserialPort; //redux props
    console.log(p_Port, "p_Port");

    try {
      console.log("OPENED");
      await p_Port.open({ baudRate: 115200 });
    } catch (e) {
      console.log(e);
      // p_Port.close();
      // await p_Port.open({ baudRate: 115200 });
    }

    // writePort("notWrite");
    // let portReader = p_Port.readable.getReader();

    // let portWriter = p_Port.writable.getWriter();

    // while (true) {
    //   const { value, done } = await portReader.read();
    //   // console.log("value", value);
    //   console.log("done", done);

    //   const strg = unicodeToChar(value);
    //   let str = strg.trim();

    //   console.log(str, "uniCodeTOCHAR");
    //   if (done) {
    //     console.log("[readLoop] DONE", done);
    //     portReader.releaseLock();
    //     break;
    //   }
    // }

    console.log(p_Port, "p_Port");
  };

  // async function writePort(data) {
  //   const ports = await navigator.serial.getPorts();
  //   console.log("portsss", ports);

  //   console.log("portsss", ports[0].writable);
  //   // const outputStream = ports[0].writable,
  //   const writer = ports[0].writable.getWriter();
  //   // writer = outputStream.getWriter();
  //   const sata = data;
  //   const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,
  //   console.log("send data:+", data1);

  //   await writer.write(data1);

  //   writer.releaseLock();
  // }

  return (
    <div className={SelectionStyle.Main_Select}>
      <div className={SelectionStyle.Select_Header}>
        <div>
          {/* <Link to="/connect-device"> */}
          <img
            className={SelectionStyle.Back_Btn}
            src={backBtn}
            onClick={gobackUrl}
          ></img>
          {/* </Link> */}
        </div>
        <div>
          <p className={SelectionStyle.Play_Comp}>Play Computer</p>
        </div>
        <div></div>
        <div>
          {isHelp == false ? (
            <img
              className={SelectionStyle.Help_Bttn}
              src={helpBtnInActive}
              onClick={handleHelpBtn}
            ></img>
          ) : (
            <div className={SelectionStyle.S_slide}>
              <SMSlider />
            </div>
          )}
          {isHelp ? (
            <img
              className={SelectionStyle.helpClose}
              src={clos}
              onClick={handleHelpBtn}
            ></img>
          ) : null}
        </div>
      </div>
      <div></div>
      <div className={SelectionStyle.Play_Body}>
        <div></div>

        {/* <Link to="/play"> */}
        <div className={SelectionStyle.Play_Div}>
          <div onClick={playBtn}>
            <img className={SelectionStyle.Play_Button} src={play}></img>
            {/* <img className={SelectionStyle.Play_Btn} src={PlayCard_Svg}></img> */}
            <h1 className={SelectionStyle.Play_txt}>Play</h1>
          </div>
        </div>
        {/* </Link> */}
        <div></div>
        <div>
          <div onClick={programBtn}>
            <img className={SelectionStyle.Program_Button} src={program}></img>
            <h1 className={SelectionStyle.Program_txt}>Program</h1>
          </div>
        </div>
        <div></div>
        <div onClick={buildBtn}>
          <img className={SelectionStyle.Build_Button} src={build}></img>
          <h1 className={SelectionStyle.Build_txt}>Build</h1>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}
// export default Selection;

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);

  return {
    webserialPort: state.webSerial,
  };
};

export default connect(mapStateToProps)(Selection);
