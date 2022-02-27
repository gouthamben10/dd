import React, { Component, useEffect } from "react";
import {
  Route,
  BrowserRouter,
  useHistory,
  Switch,
  HashRouter,
} from "react-router-dom";
import Assembly from "../src/Components/Assembly";
import Concept from "../src/Components/concept";
import "./App.css";

// import Login from './Components/Login';
import MidProgramming from "./Components/learn/mid_program_homePage";
import Learn from "./Components/learn/";
import saveTutorials from "../src/Components/tutorials";
import socketIOClient from "socket.io-client";
//flowchart
import Myflowchart from "../src/Components/FlowchartConnections/Myflowchart/Myflowchart";
import Flow from "../src/Components/flowchart_port/";
// concept/ select Screen
import SelectScreen from "./Components/selectScreen/SelectScreen";
import CenterMode from "./Components/concept";
import Level from "./Components/level";
import Logic from "../src/Components/logic";
import { connect } from "react-redux";
import Sizes from "./helpers/Sizes";
import Login from "../src/Components/Login/index";
// import Hexaboard from '../src/Components/Hexaboard/index'
import BiboxSelection from "./Components/Login/BiboxSelect.js";
import deviceSelection from "../src/Components/Login/deviceSelect.js";
import Selection from "../src/Components/Login/Selection.js";
import ProgramSelection from "../src/Components/Login/programSelection.js";
import { createBrowserHistory } from "history";
import { Socket } from "socket.io-client";
import ConceptHelp from "../src/Components/help/concept_help";
import Simulate from "./Components/Simulate";

import SavePage from "../src/Components/SavePage/index";
import SavedProgram from "../src/Components/SavePage/savedProgram";
import Project from "../src/Components/SavePage/project";

import PlaymodeScreen from "../src/Components/play/PlayMode";
import Remote from "../src/Components/play/Remote/Tern+/remote";
import Speak from "../src/Components/play/Speak/tern+/speak";
import Piano from "../src/Components/play/Piano/tern+/piano";
import Camera from "../src/Components/play/Camera/tern+/Camera.js";
import Traceme from "../src/Components/play/TraceMe/Traceme";
import Model3D from "../src/Components/play/3dModel/3dModel";
import AceRemote from "../src/Components/play/Remote/Ace/remote";

// Humanoid
import HumanoidRemote from "../src/Components/play/Remote/humanoid/remote";
import HumanoidSpeak from "../src/Components/play/Speak/humanoid/speak";
import HumanoidPiano from "../src/Components/play/Piano/humanoid/piano";
import HumanoidCamera from "../src/Components/play/Camera/humanoid/Camera";

////Itern Modules

import Input from "./Pages/InputOutput/Input";
import Ports from "./Pages/Ports/Port";
import Digital from "./Pages/Digital/Digital";
import FlowchartPage from "./Pages/FlowChartPage/FlowchartPage";
import Header from "./Components/Header/Header";

import BgComp1 from "./Components/humanoidFlowChart/BGComponents/BG1/BgComp1";
import Home from "./Components/humanoidFlowChart/Home/Home";
import LevelConatiner from "./Components/humanoidFlowChart/ReusableComp/LevelContainer/LevelContainer";
import Mid from "./Components/humanoidFlowChart/Mid_level/Mid";
import FlowChart from "./Components/humanoidFlowChart/FlowChart/FlowChart";
import EnableServos from "./Components/humanoidFlowChart/EnableServos/EnableServos";
import Humanoid from "./Components/humanoidFlowChart/EnableServos/Humanoid";
import AdjustTilt from "./Components/humanoidFlowChart/AdjustTilt/AdjustTilt";
import SelectPort from "./Components/humanoidFlowChart/SelectPort/SelectPort";
import InputOutput from "./Components/humanoidFlowChart/InputOutput/InputOutput";
import SwitchComp from "./Components/humanoidFlowChart/ReusableComp/SwitchComp/SwitchComp";
import Digital_Analog from "./Components/humanoidFlowChart/Digital_Analog/Digital_Analog";
import MainFlowChart from "./Components/humanoidFlowChart/MainFlowChart/MainFlowChart";
import ScratchProgramming from "./Components/humanoidFlowChart/ScratchLogicFlow/ScratchProgramming";

// PLAY_COMPUTER
import RemoteSection from "./Components/play/Remote/Ace/RemoteSection/RemoteSection";
import VisualProgram from "./Components/ProgramContainer/VisualProgram/VisualProgram";
import ExternalAccessoriesScreen from "./Components/selectScreen/ExternalAccessoriesScreen";
import InternalAccessoriesScreen from "./Components/selectScreen/InternalAccessoriesScreen";
import ConformationPopup from "./Components/Login/ConformationPopup";

// import musick from "./Assets/music group button.svg";

const socket = socketIOClient("http://localhost:3008");

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.AssemblyWrap = this.AssemblyWrap.bind(this);
    // socket.on("Alive", (e) => {
    //   console.log("Alive is Getting Called ...");
    //   socket.emit("_Alive", {"info" : window.location.href})
    // })
    socket.on("Alive", (e) => {
      socket.emit("_Alive", (e) => {});
    });
    window.addEventListener("resize", (e) => {
      const height = document.body.clientHeight;
      const width = document.body.clientWidth;
      Sizes._update(width, height);
      this.props.sizesHelper({ width, height });
    });

    window.addEventListener("load", () => {
      const height = document.body.clientHeight;
      const width = document.body.clientWidth;
      Sizes._update(document.body.clientWidth, document.body.clientHeight);
      this.props.sizesHelper({ width, height });
    });

    window.addEventListener(
      "beforeunload",
      (e) => {
        // console.log("refresh", e.returnValue)
        // e.returnValue = `Are you sure you want to leave?`;
        // e.preventDefault()

        if (window.location.href.includes("scratch-tool")) {
          socket.emit("Browserclose", "scratch-tool");
        } else {
          socket.emit("Browserclose", "hye");
        }
        // return "Leaving this page will reset the wizard";

        // if (performance.navigation.type == 1) {
        //   console.info("This page is reloaded");
        //   socket.emit("Browserclose", "refresh")
        // } else {
        //   // e.preventDefault()
        //   console.info("This page is not reloaded");
        //   socket.emit("Browserclose", "HYE")
        //   return "Do you really want to leave our brilliant application?";

        // }
      },
      false
    );
  }

  AssemblyWrap() {
    return (
      <Assembly
        height={this.props.state.assembly.height}
        width={Sizes.width}
      ></Assembly>
    );
  }
  render() {
    return (
      <BrowserRouter history={history}>
        {/* {sessionStorage.getItem("pgmode")=="flow-chart" 
          ?
        <Header prev="/"/>
          :
         null
         } */}

        {/* <img src={musick}></img> */}
        <Switch>
          <Route exact path="/serve-flow" component={Ports} />

          <Route exact path="/input-output" component={Input} />
          <Route exact path="/digital-analog" component={Digital} />
          <Route exact path="/flowchart" component={FlowchartPage} />

          {/* <Route path="/" component={Home} exact /> */}
          <Route
            path="/learn-mid"
            render={(props) => <Mid {...props} />}
            exact
          />
          <Route
            path="/learn-mid/flowChart"
            render={(props) => <FlowChart {...props} />}
            exact
          />
          <Route
            path="/learn-mid/flowChart/LetCode/Enable-Servos"
            render={(props) => <EnableServos {...props} />}
            exact
          />
          <Route
            path="/learn-mid/flowChart/LetCode/Adjust-Tilt"
            render={(props) => <AdjustTilt {...props} />}
            exact
          />
          <Route
            path="/learn-mid/flowChart/LetCode/Adjust-Tilt/selectPort"
            render={(props) => <SelectPort {...props} />}
            exact
          />
          <Route
            path="/learn-mid/flowChart/LetCode/Adjust-Tilt/input-output"
            render={(props) => <InputOutput {...props} />}
            exact
          />
          <Route
            path="/learn-mid/flowChart/LetCode/Adjust-Tilt/digital-analog"
            render={(props) => <Digital_Analog {...props} />}
            exact
          />
          <Route
            path="/learn-mid/flowChart/LetCode/Adjust-Tilt/flow-chart"
            component={MainFlowChart}
            exact
          />

          <Route
            path="/learn-mid/flowChart/LetCode/Adjust-Tilt/logic-flow/scratch"
            component={ScratchProgramming}
            exact
          />

          <Route path="/" exact component={Login} />

          <Route
            history={history}
            path="/Assembly"
            component={this.AssemblyWrap}
          />

          <Route path="/saveprogram" exact component={SavePage} />
          <Route path="/savedprogram" exact component={SavedProgram} />
          <Route path="/project/:id" exact component={Project} />

          <Route path="/Level" component={Level} />
          <Route path="/midProgramming" component={MidProgramming} />
          <Route
            path="/selectScreen/InternalAccessories"
            component={InternalAccessoriesScreen}
          />
          <Route
            path="/selectScreen/ExternalAccessories"
            component={ExternalAccessoriesScreen}
          />

          {/* <Route path="/Concept" component={CenterMode} /> */}
          <Route path="/logic" component={Logic} />
          <Route path="/Learn" component={Learn} />
          <Route path="/Program" component={Learn} />
          <Route path="/concepthelp" component={ConceptHelp} />
          <Route path="/programSelection" component={ProgramSelection}></Route>
          <Route path="/flow" component={Flow}></Route>
          <Route path="/simulate" component={Simulate} />

          <Route path="/visualProgram" component={VisualProgram} />

          {/* <Route exact path="/Hexaboard" component={Hexaboard} /> */}
          <Route exact path="/biboxSelection" component={BiboxSelection} />
          <Route exact path="/deviceSelection" component={deviceSelection} />
          <Route exact path="/Selection" component={Selection} />
          <Route exact path="/conformation" component={ConformationPopup} />
          <Route exact path="/saveTutorials" component={saveTutorials} />

          <Route exact path="/play">
            {" "}
            <Model3D />
          </Route>
          <Route exact path="/introduction">
            {" "}
            <PlaymodeScreen />
          </Route>

          <Route exact path="/SelectMode" />

          {/* Give path to tern+ and humanoid */}

          {/* Tern + */}
          <Route path="/remote" component={Remote}></Route>
          <Route path="/speak" component={Speak}></Route>
          <Route path="/music" component={Piano}></Route>
          <Route path="/camera" component={Camera}></Route>
          <Route path="/trace-me" component={Traceme}></Route>

          {/* the component Route change to AceRemote */}
          {/* <Route path="/remote-Ace" component={AceRemote}></Route> */}

          {/* PLAY_COMPUTER CHNAGE BY: SOUMITYA */}
          <Route path="/remote-Ace" component={RemoteSection}></Route>

          {/* Humanoid  */}
          <Route path="/Humanoid-Remote">
            {" "}
            <HumanoidRemote />
          </Route>
          <Route path="/Humanoid-Speak">
            {" "}
            <HumanoidSpeak />
          </Route>
          <Route path="/Humanoid-Music">
            {" "}
            <HumanoidPiano />
          </Route>
          <Route path="/Humanoid-Camera">
            {" "}
            <HumanoidCamera />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sizesHelper: (data) => {
      dispatch({ type: "sizesHelper", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
