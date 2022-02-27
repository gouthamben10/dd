import React, { Component } from "react";
// import '../../src/css/learn.css';
import { Link } from "react-router-dom";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
import components from "./concept/data"; //component details

import PortConnections from "./Assembly/PortConnections";
const socket = openSocket("http://localhost:3008");

class Level extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    //// let deviceConnected=sessionStorage.getItem('connectedDevice');
    //// sessionStorage.clear();
    //// sessionStorage.setItem('connectedDevice',deviceConnected);
    // var concept = { counter: [], componentProps: {} }
    // var assembly = {
    //     components: components,
    //     PortConnections: PortConnections,
    //     workspace: {
    //         bibox: { top: 100, left: 250 },
    //         components: {
    //             //// Other components come here
    //             //// eg. "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...

    //         },
    //         offset: { top: 0, left: 0 },
    //         scale: 1,
    //     },

    //     height: document.body.clientHeight,
    //     width: document.body.clientWidth,

    // };
    // var logic = {
    //     program: [{
    //         type: "start",
    //         state: { bic1: false, bic2: false, bic3: false, bid2: false, bif1: false, bif2: false, bif3: false },
    //         bic1: false,
    //         bic2: false,
    //         bic3: false,
    //         bid2: false,
    //         bif1: false,
    //         bif2: false,
    //         bif3: false,
    //         bid3: false,
    //         bid1: false,
    //         bmp3: false
    //     },
    //     ],
    //     end: { type: "end", state: "repeat" },
    //     insertState: false,

    //     offset: { left: 0, top: 0 }
    //     ,
    //     scale: 1,
    //     currentProgramGuide: 0,
    //     active: [-1, -1],
    //     bottomPanel: "border",

    // };

    // console.log("LOGIC", concept, assembly, logic, this)
    // this.props.selecteComponent(concept)
    // this.props.assemblyComponent(assembly)
    // this.props.logicComponent(logic)

    sessionStorage.setItem("AppDetails", null);
    sessionStorage.removeItem("SelectedComp");
  };
  change = () => {
    // socket.emit("/tutorialFile", "Final");
    // this.props.history.push("/concept")
    var selectionType = localStorage.getItem("programMode");
    if (selectionType == "learn") {
      socket.emit("/tutorialLevel", "Final.txt");
      socket.on(
        "_tutorialLevel",
        (
          dataToSend,
          portToSend,
          logicToSend,
          Description,
          end,
          conceptHelp,
          assemblyHelp,
          logicHelp
        ) => {
          sessionStorage.setItem("tutorialConcept", dataToSend);
          sessionStorage.setItem("tutorialPort", JSON.stringify(portToSend));
          sessionStorage.setItem("tutorialLogic", JSON.stringify(logicToSend));
          sessionStorage.setItem("tutorialEnd", JSON.stringify(end));

          sessionStorage.setItem("logicHelp", logicHelp);
          sessionStorage.setItem("conceptHelp", conceptHelp);
          sessionStorage.setItem("assemblyHelp", assemblyHelp);

          // sessionStorage.setItem("tutorialDesc", JSON.stringify(Description))

          this.props.history.push("/concept");
        }
      );
    } else {
      this.props.history.push("/concept");
    }
  };
  render() {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <div style={{ position: "relative" }}>
          <img
            className="learn_hm_left_corner"
            src="images/Learn/learn_bg_top_left.png"
          ></img>

          <Link to="/programSelection">
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
                  top: "7%",
                  border: "2px solid #100a5e",
                  borderRadius: "10px 50px 50px 10px",
                  textAlign: "center",
                  color: "#2c258a",
                  fontSize: "large",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    left: "1.5%",
                    top: "7%",
                    fontSize: "16px",
                  }}
                >
                  SAVED PROGRAMS
                </span>
              </div>
            </div>
          </Link>

          {/* <Link to="/programSelection">
            {" "}
            <img
              className="learn_hm_back_button"
              src="images/Learn/login_button_back.png"
            />
          </Link>
          <h1
            style={{
              position: "absolute",
              top: "-2%",
              left: "12%",
              color: "#4b21a6",
            }}
          >
            Saved Programs
          </h1> */}
        </div>
        {/* <div onClick={this.change} className="learn_hm_main_img_div2" style={{ float: "left" }}>
                    <button className="learn_hm_main_image_button_level">
                        <img style={{ height: "340px", width: "220px" }} src="images/Learn/learn_basic_button_level.png" />
                        <h1 style={{ position: "absolute", top: "31px", left: "65px", color: "grey" }}>Level 1</h1>
                        <h2 style={{ position: "absolute", top: "35%", left: "21%", color: "grey" }}>Sample piano</h2>
                        <img style={{ height: "22%", width: "21%", position: "absolute", top: "65%", left: "12%" }} src="images/Learn/illus_star_left.png" />
                        <img style={{ height: "22%", width: "21%", position: "absolute", top: "56%", left: "35%" }} src="images/Learn/illus_star_mid.png" />
                        <img style={{ height: "22%", width: "21%", position: "absolute", top: "65%", left: "59%" }} src="images/Learn/illus_star_right.png" />
                    </button>
                </div> */}

        <div style={{ marginLeft: "20%", marginTop: "-4%", float: "left" }}>
          <button
            onClick={this.change}
            className="learn_hm_main_image_button_level"
          >
            <img
              style={{ height: "260px", width: "200px" }}
              src="images/Learn/learn_basic_button_level.png"
            />
            <h1
              style={{
                position: "absolute",
                top: "31px",
                left: "56px",
                color: "grey",
              }}
            >
              Level 1
            </h1>
            <h2
              style={{
                position: "absolute",
                top: "45%",
                left: "15%",
                color: "grey",
              }}
            >
              Sample piano
            </h2>
            {/* <img style={{ height: "22%", width: "21%", position: "absolute", top: "65%", left: "12%" }} src="images/Learn/illus_star_left.png" />
                        <img style={{ height: "22%", width: "21%", position: "absolute", top: "56%", left: "35%" }} src="images/Learn/illus_star_mid.png" />
                        <img style={{ height: "22%", width: "21%", position: "absolute", top: "65%", left: "59%" }} src="images/Learn/illus_star_right.png" /> */}
          </button>
          <button className="learn_hm_main_image_button_level">
            <img
              style={{ height: "260px", width: "200px" }}
              src="images/Learn/learn_basic_button_level.png"
            />
            <h1
              style={{
                position: "absolute",
                top: "31px",
                left: "56px",
                color: "grey",
              }}
            >
              Level 2
            </h1>
            {/* <img style={{ position: "absolute", height: "62px", width: "114px", top: "57%", left: "55px" }} src="images/Learn/learn_basic_starsoutline.png" /> */}
            <img
              style={{
                position: "absolute",
                height: "78px",
                width: "56px",
                top: "57%",
                left: "75px",
              }}
              src="images/Learn/lock.png"
            />
          </button>

          <button className="learn_hm_main_image_button_level">
            <img
              style={{ height: "260px", width: "200px" }}
              src="images/Learn/learn_basic_button_level.png"
            />
            <h1
              style={{
                position: "absolute",
                top: "31px",
                left: "56px",
                color: "grey",
              }}
            >
              Level 3
            </h1>
            <img
              style={{
                position: "absolute",
                height: "78px",
                width: "56px",
                top: "57%",
                left: "75px",
              }}
              src="images/Learn/lock.png"
            />
          </button>

          {/* <button className="learn_hm_main_image_button_level">
                        <img style={{ height: "260px", width: "200px" }} src="images/Learn/learn_basic_button_level.png" />
                        <h1 style={{ position: "absolute", top: "31px", left: "56px", color: "grey" }}>Level 4</h1>
                        <img style={{ position: "absolute", height: "78px", width: "56px", top: "57%", left: "75px" }} src="images/Learn/lock.png" />

                    </button>

                    <button className="learn_hm_main_image_button_level">
                        <img style={{ height: "260px", width: "200px" }} src="images/Learn/learn_basic_button_level.png" />
                        <h1 style={{ position: "absolute", top: "31px", left: "56px", color: "grey" }}>Level 5</h1>
                        <img style={{ position: "absolute", height: "78px", width: "56px", top: "57%", left: "75px" }} src="images/Learn/lock.png" />

                    </button> */}
        </div>
        {/* <div style={{ height: "10%", width: "59%", border: "2px solid #bed5fa", borderRadius: "50px", marginTop: "22%", marginLeft: "16%", position: 'absolute' }}></div> */}
        <div>
          <img
            style={{ position: "absolute", bottom: "0px", right: "0px" }}
            src="images/Learn/learn_bg_bottom_right.png"
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selecteComponent: (data) => {
      dispatch({ type: "COMPONENT", payload: data });
    },

    assemblyComponent: (data) => {
      dispatch({ type: "ASSEMBLY", payload: data });
    },
    logicComponent: (data) => {
      dispatch({ type: "LOGIC_RESET", payload: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(Level);
// export default Level;
