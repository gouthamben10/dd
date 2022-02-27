import React, { Component } from "react";
import { Link } from "react-router-dom";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
import components from "../concept/data"; //component details
import PortConnections from "../Assembly/PortConnections";
import {
  buttonNewProjectSrc,
  buttonSaveProjectSrc,
  Web1920Src,
  backBtn,
  programmenucard,
  flowchartbasedgroupbutton,
  yourprojectsgroupbutton,
  newfilegroupbutton,
} from "../../source/index";
import BgComp1 from "../humanoidFlowChart/BGComponents/BG1/BgComp1";
import renderPrgImage from "../../source/programImg";
import PrgmSelection from "../ReusableComponents/PrgmSlider/PrgmSelection/PrgmSelection";
const socket = openSocket("http://localhost:3008");

class ProgramSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHelp: false,
    };
  }

  componentDidMount = () => {
    // let deviceConnected=sessionStorage.getItem('connectedDevice');
    // sessionStorage.clear();
    // sessionStorage.setItem('connectedDevice',deviceConnected);
    var concept = { counter: [], componentProps: {} };
    var assembly = {
      components: components,
      PortConnections: PortConnections,
      workspace: {
        // bibox: { top: 100, left: 250 },
        bibox: { top: 162, left: 328 },
        components: {
          // Other components come here
          // eg. "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
        },
        offset: { top: 0, left: 0 },
        scale: 1,
      },

      height: document.body.clientHeight,
      width: document.body.clientWidth,
    };
    var logic = {
      program: [
        {
          type: "start",
          state: {
            bic1: false,
            bic2: false,
            bic3: false,
            bid2: false,
            bif1: false,
            bif2: false,
            bif3: false,
          },
          bic1: false,
          bic2: false,
          bic3: false,
          bid2: false,
          bif1: false,
          bif2: false,
          bif3: false,
          bid3: false,
          bid1: false,
          bmp3: false,
        },
      ],
      end: { type: "end", state: "repeat" },
      insertState: false,

      offset: { left: 0, top: 0 },
      scale: 1,
      currentProgramGuide: 0,
      active: [-1, -1],
      bottomPanel: "border",
    };

    this.props.selecteComponent(concept);
    this.props.assemblyComponent(assembly);
    this.props.logicComponent(logic);

    sessionStorage.setItem("AppDetails", null);
    sessionStorage.removeItem("SelectedComp");
  };

  change = (info) => {
    if (info == "new" || info == "tutorial") {
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
            sessionStorage.setItem(
              "tutorialLogic",
              JSON.stringify(logicToSend)
            );
            sessionStorage.setItem("tutorialEnd", JSON.stringify(end));

            sessionStorage.setItem("logicHelp", logicHelp);
            sessionStorage.setItem("conceptHelp", conceptHelp);
            sessionStorage.setItem("assemblyHelp", assemblyHelp);

            // sessionStorage.setItem("tutorialDesc", JSON.stringify(Description))

            // this.props.history.push("/concept");
            this.props.history.push("/selectScreen/InternalAccessories");
          }
        );
      } else {
        this.props.history.push("/selectScreen/InternalAccessories");

        // this.props.history.push("/concept");
      }
    } else if (info == "saved") {
      this.props.history.push("/savedprogram");
    }
  };

  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };
  render() {
    const item1Styl = {
      backgroundImage: `url("${renderPrgImage("yourprojectsgroupbutton")}")`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
    };
    const item2Styl = {
      backgroundImage: `url("${renderPrgImage("newfilegroupbutton")}")`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
    };
    return (
      <>
        <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
          <Link
            to={
              localStorage.getItem("programMode") == "program"
                ? "/visualProgram"
                : "/selection"
            }
          >
            <img
              src={renderPrgImage("backBtn")}
              className="iconBtnSize PS-backbtn"
            />
          </Link>

          <img
            src={renderPrgImage("programmenucard")}
            className="PS-programmenucard"
          />
          <p className="PS-txt-Menu">Program</p>
          {this.state.isHelp ? (
            <div className="PS-S_slide">
              <PrgmSelection />
            </div>
          ) : (
            <img
              className="iconBtnSize PS-helpiconBtnSize"
              src={renderPrgImage("helpBtnInActive")}
              onClick={this.helpBtn}
            ></img>
          )}

          {this.state.isHelp ? (
            <img
              className="PS-helpClose"
              src={renderPrgImage("closBtn")}
              onClick={this.helpBtn}
            ></img>
          ) : null}

          {localStorage.getItem("programMode") == "program" ? (
            <>
              <div
                className="PS-flowchartbased PS-item1"
                style={item2Styl}
                onClick={() => this.change("new")}
              >
                <div className="PS-sub1">
                  <p className="PS-sub-txt">New Project</p>
                </div>
              </div>

              <div
                className="PS-flowchartbased PS-item2"
                style={item1Styl}
                onClick={() => this.change("saved")}
              >
                <div className="PS-sub1">
                  <p className="PS-sub-txt">Your Project</p>
                </div>
              </div>
            </>
          ) : (
            <div className="pg_selection_div_learn">
              <div
                onClick={() => this.change("tutorial")}
                className="DF"
                style={{
                  backgroundImage: `url(${renderPrgImage(
                    "buttonNewProjectSrc"
                  )})`,
                }}
              >
                {/* <Link><img className="pg_selection_button" src="images/program/button_newproject.png"/></Link> */}
                <p className="tutorial_project">Tutorial Project</p>
              </div>
            </div>
          )}
        </div>
      </>
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

export default connect(null, mapDispatchToProps)(ProgramSelection);

// const ProgramSelection = () => {

//     change = () => {

//         // socket.emit("/tutorialFile", "Final");
//         // this.props.history.push("/concept")
//         var selectionType = localStorage.getItem("programMode")
//         if (selectionType == "learn") {

//             socket.emit("/tutorialLevel", "Final.txt");
//             socket.on("_tutorialLevel", (dataToSend, portToSend, logicToSend, Description, end, conceptHelp, assemblyHelp, logicHelp) => {
//                 sessionStorage.setItem("tutorialConcept", dataToSend)
//                 sessionStorage.setItem("tutorialPort", JSON.stringify(portToSend))
//                 sessionStorage.setItem("tutorialLogic", JSON.stringify(logicToSend))
//                 sessionStorage.setItem("tutorialEnd", JSON.stringify(end))

//                 sessionStorage.setItem("logicHelp", logicHelp)
//                 sessionStorage.setItem("conceptHelp", conceptHelp)
//                 sessionStorage.setItem("assemblyHelp", assemblyHelp)

//                 // sessionStorage.setItem("tutorialDesc", JSON.stringify(Description))

//                 this.props.history.push("/concept")
//             })
//         }
//         else {
//             this.props.history.push("/concept")

//         }

//     }

//     return (
//         <div style={{height:"100vh",width:"100vw",margin:"0"}}>
//            <div className="main12">
//            <Link to="/midProgramming">   <img className="learn_hm_back_button" src="images/Learn/login_button_back.png" /></Link>
//                <div className="pg_selection_div">
//                 <div onClick={this.change}>
//                     <Link><img className="pg_selection_button" src="images/program/button_newproject.png"/></Link>
//                 </div>
//                 <div>
//                     <Link to="/Level"><img className="pg_selection_button" src="images/program/button_saveproject.png"/></Link>
//                 </div>
//                </div>
//            </div>
//         </div>
//      );
// }

// export default ProgramSelection;
