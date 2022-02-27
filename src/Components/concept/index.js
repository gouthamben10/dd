// /**
//  * This module is the main module of the concept tab and is a dumb component
//  * @see module:components/concept/Coverflow
//  * @module components/concept/
//  */

// var React = require('react');
// var PropTypes = React.PropTypes;
// var Coverflow = require('./Coverflow.js');
// var Sidebar = require('./Sidebar.js');
// var Tutorials = require('../../tutorials/tutorials');
// var Content = React.createClass({

//   render: function() {
//     var App=this.props.app;
//     return (
//       <div className="pure-g" style={{height: '100%', width: '100%',backgroundImage: 'url(images/newbisoft-screens-15.png)',backgroundSize: 'contain',backgroundPosition:'center'}}>
//         <Tutorials ref='tutorial' step={this.props.step} projId={this.props.projId} currentTab={this.props.currentTab} tutorialMode={this.props.tutorialMode} app={App}/>
//         <div className="pure-u-4-5" style={{}}>
//           {this.props.sidebarContents.length === this.props.components.length ? (
//             <div style={{display: 'table', width: '100%', height: '100%'}}>
//               <div style={{
//                   height: '100%',
//                   width: '100%',
//                   display: 'table-cell',
//                   textAlign: 'center',
//                   verticalAlign: 'middle',
//                   fontSize: 'x-large',
//                   fontWeight: 'bold',
//                   color: '#656768',
//                 }}>
//                 All Components have been selected
//               </div>
//             </div>
//           ) : (
//             <div style={{display: 'table', width: '100%', height: '100%'}}>
//               <div style={{display: 'table-row',
//                         color: '#656768',
//                         textAlign: 'center',
//                         height: '15%',
//                         fontWeight: 'normal',
//                         fontSize: '30',
//                       }}>
//                 <div style={{display: 'table-cell',textAlign: 'left',color: '#423D3D', paddingLeft: '10%', paddingBottom: '2%', verticalAlign: 'bottom'}}>
//                   Select components:
//                 </div>
//               </div>

//               <div style={{display: 'table-row', height: '65%',zIndex: '100'}}>
//                 <div className="compos" style={{display: 'table-cell', verticalAlign: 'middle'}}>
//                   <Coverflow components={this.props.components}
//                       select={this.props.select}
//                       active={this.props.coverflowActive}
//                       onChange={this.props.onCoverflowChange}
//                       displayQuantityOfSide={2}
//                       navigation
//                       infiniteScroll
//                       enableHeading
//                       media={{
//                         '@media (max-width: 900px)': {
//                           width: '600px',
//                           height: '300px'
//                         },
//                         '@media (min-width: 900px)': {
//                           width: '960px',
//                           height: '600px'
//                         }
//                       }}
//                   />
//                 </div>
//               </div>
//               <img src="images/description_hand.png" style={{ height: '80px',width:'80px',position:'absolute',marginLeft:'2%'}}/>
//               <div style={{display: 'table-row',
//                         color: '#000',
//                         textAlign: 'center',
//                         height: '30%',
//                         fontWeight: 'bold',
//                         fontSize: '20px',
//                       }}>
//                 <div className="desc" style={{padding: '5px', paddingTop: '2%',paddingBottom: '2%', verticalAlign: 'top',width: '80%', marginLeft: '10%',border: '2px solid #000',borderRadius: '16px'}}>
//                   {(this.props.components[this.props.coverflowActive]) ?
//                       this.props.components[this.props.coverflowActive].description : ''}
//                 </div>
//               </div>
//             </div>

//           )}
//         </div>
//         <div className="pure-u-1-5" style={{zIndex: '1000'}}>
//           <Sidebar appState={App.state} components={this.props.components} sidebarContents={this.props.sidebarContents} remove={this.props.remove} projId={this.props.projId}/>
//         </div>
//       </div>

//     );
//   }

// });

// module.exports = Content;

import { activeCheckBox } from "../Assembly/CheckboxData";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/learn.css";
import Coverflow from "./Coverflow.js";
import Sidebar from "./Sidebar.js";
// var Tutorials = require('../../tutorials/tutorials');
import components from "./data.js"; //component details
import componentProps from "./componentProps"; //Empty object
import { connect } from "react-redux";
import Modal from "react-modal";
import { webSerialAction } from "../../redux/actions/index";
import { backBtn, nextBtn } from "../../source/index";

import socketIOClient from "socket.io-client";
import renderPrgImage from "../../source/programImg";

var socket = socketIOClient("http://localhost:3008");
var data;
var nextButtonVisibilty = "visible";

var pageReload = false;

// STYLE CHANGE BY : SOUMITYA
// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     height: "28%",
//     width: " 30%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "#9ecee8",
//     border: "2px solid #188dcc",
//   },
// };

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "23%",
    width: " 25%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "#9ecee8",
    // border: "2px solid #188dcc",

    border: "5px solid rgb(255,140,25)",
    borderRadius: "20px",

    overflow: "initial",
    // zIndex: 1,
  },
};

class Content extends Component {
  constructor(props) {
    var Device = [];
    var Device = sessionStorage.getItem("tutorialConcept");

    var selectionType = localStorage.getItem("programMode");
    if (selectionType == "program") {
      data = components;
    } else {
      data = components.filter((value) => {
        if (Device.includes(value.name)) {
          //commented code for restriction
          return value;
        }
      });
    }

    var tutorialDescArray = [];
    // var selectionType = localStorage.getItem("programMode")
    var compData;
    if (selectionType == "learn") {
      tutorialDescArray = sessionStorage.getItem("tutorialConcept").split(",");
      compData = data;
      // var tutorialDesc = sessionStorage.getItem("tutorialDesc")
      // tutorialDescArray.push(JSON.parse(tutorialDesc).concept1)
      // tutorialDescArray.push(JSON.parse(tutorialDesc).concept2)
    } else {
      compData = components;
    }

    super(props);
    this.state = {
      Alldata: data,
      sidebarContents: [],
      components: compData,
      redata: components,
      coverflowActive: 0,
      workspace: {
        bibox: { top: 20, left: 80 },
        components: {
          // Other components come here
          // eg. "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
        },
        offset: { top: 0, left: 0 },
        scale: 1,
      },
      modalIsOpen: false,
      detected: false,
      usbOpen: false,
      erasedProgram: false,
    };
    data.forEach(function (component) {
      componentProps[component.type] = component; //set all these propaties to empty object(Imported from componentProps) type:"..."
      // component.url = require('../' + component.url);
    });
    this.props.ComponentProps(componentProps);
  }
  componentDidMount() {
    // var socket = socketIOClient.connect("http://localhost:3008");

    sessionStorage.setItem("Reload", false);

    if (localStorage.getItem("programMode") == "learn") {
      // this.setState({components: this.state.Alldata});
      this.state.components.forEach(function (component) {
        component.selected = false; //set the selected proparties in component(imported from data.js)
        component.name = component.type.replace(/_/g, " "); //removeing the _ from component type
        // component.url =
        //   "Bisoft_UI/Accessories/oldComponents/component_" +
        //   component.type +
        //   ".png";

        component.url =
          "/Bisoft_UI/Accessories/newComponents/component_" +
          component.type +
          ".png"; //setting the image path

        componentProps[component.type] = component; //set all these propaties to empty object(Imported from componentProps) type:"..."
        // component.url = require('../' + component.url);
      });

      this.setState({ redata: this.state.components });
    } else {
      // if(localStorage.getItem('biboxTypes')){
      components.forEach(function (component) {
        component.selected = false; //set the selected proparties in component(imported from data.js)
        component.name = component.type.replace(/_/g, " ").toUpperCase(); //removeing the _ from component type

        // component.url =
        //   "Bisoft_UI/Accessories/oldComponents/component_" +
        //   component.type +
        //   ".png";

        component.url =
          "/Bisoft_UI/Accessories/newComponents/component_" +
          component.type +
          ".png"; //setting the image path

        componentProps[component.type] = component; //set all these propaties to empty object(Imported from componentProps) type:"..."
        // component.url = require('../' + component.url);
      });
      // }
      this.setState({ redata: this.state.components });
    }

    if (JSON.parse(sessionStorage.getItem("AppDetails")) != null) {
      this.setState({
        redata: JSON.parse(sessionStorage.getItem("AppDetails")),
      });
    }
    if (sessionStorage.getItem("Index") != null) {
      this.setState({
        sidebarContents: JSON.parse(sessionStorage.getItem("Index")),
      });
      var ret = JSON.parse(sessionStorage.getItem("Index"));
      var ttt = this.state.components;
      for (let i = 0; i < ret.length; i++) {
        ttt[ret[i]].selected = true;
      }
      this.setState({ redata: ttt });
    } else if (this.props.indexData.concept.Index.length > 0) {
      this.setState({ sidebarContents: this.props.indexData.concept.Index });

      var ret = this.props.indexData.concept.Index;
      var ttt = this.state.components;
      for (let i = 0; i < ret.length; i++) {
        ttt[ret[i]].selected = true;
      }

      // components[index].selected = true;
      // this.setState({
      //   redata: components,
      // });
    }

    // if(sessionStorage.getItem("tutorialConcept")!=null){
    //    console.log("THE DATA IS 000",sessionStorage.getItem("tutorialConcept"));
    // }

    if (localStorage.getItem("programMode") == "learn") {
      socket.emit("/tutorialLevel", "Final.txt");
      socket.on("_loadCarousel", (data) => {
        if (
          data.comp != 0 &&
          JSON.parse(sessionStorage.getItem("AppDetails")) == null
        ) {
          this.setState({ Alldata: data.comp, components: data.comp });
        }
      });
    }

    socket.emit("_usbDetection", "Hi");
    socket.on("/usbDetection", (data) => {
      this.setState({ detected: data.detected, usbOpen: !data.detected });
    });

    // when the concept screen reload/refresed it will set value as true/false this is for get the correct coverflow card on reload time

    window.onbeforeunload = function () {
      sessionStorage.setItem("pageReloadConcept", true);
      // return true;
    };
  }

  select = (index, coverflowActive) => {
    var sidebarContents = this.state.sidebarContents;
    sidebarContents.push(index);
    sessionStorage.setItem("Index", JSON.stringify(sidebarContents));
    var components = this.state.components;
    components[index].selected = true;
    // if (this.props.tutorialMode == "true") {
    //   this.refs.concept.refs.tutorial.workspaceUpdate(index, components);
    // }
    this.setState({
      coverflowActive: coverflowActive,
      sidebarContents: sidebarContents,
      components: components,
    });

    var arr = [];
    // if (sessionStorage.getItem('SelectedComp') != null)
    // {
    //   arr = JSON.parse(sessionStorage.getItem('SelectedComp'));
    // }
    // else { arr = []; }

    this.state.sidebarContents.map((el) => {
      arr.push(this.state.components[el]);
    });
    sessionStorage.setItem("SelectedComp", JSON.stringify(arr));

    var { sidebarContents, components, Alldata } = this.state;
    components[index].selected = true;
    this.setState({
      redata: components,
    });
    sessionStorage.setItem("AppDetails", JSON.stringify(this.state.Alldata));

    const filterData = this.state.Alldata.filter((m) => {
      return m.name.toUpperCase() == components[index].name.toUpperCase();
    });

    // console.log("YEP",filterData);
    //  this.setState({ Alldata: filterData })
    // sessionStorage.setItem("AppDetails", JSON.stringify(this.state.Alldata));
    // this.props.selecteComponent(filterData[0]);
    this.props.selecteComponent(
      JSON.parse(sessionStorage.getItem("SelectedComp"))
    );
    this.props.indexSelection(JSON.parse(sessionStorage.getItem("Index")));
  };
  /**
   * Remove a component from project (Remove mean removal from sidebar)
   * @param  {number} index Index wrt sidebar
   */
  remove = (index) => {
    var { sidebarContents, components, workspace, coverflowActive, redata } =
      this.state;
    var removeIndex = sidebarContents[index];
    if (sidebarContents.length === components.length)
      coverflowActive = removeIndex;
    sidebarContents.splice(index, 1);
    components[removeIndex].selected = false;
    delete workspace.components[components[removeIndex].type];
    if (this.props.tutorialMode == "true") {
      this.refs.concept.refs.tutorial.workspaceUpdate(index, components);
    }

    redata[removeIndex].selected = false;
    sessionStorage.setItem("AppDetails", JSON.stringify(this.state.Alldata));
    sessionStorage.setItem("Index", JSON.stringify(sidebarContents));

    let GP = JSON.parse(sessionStorage.getItem("SelectedComp"));
    var x = GP.filter((m) => m.name != redata[removeIndex].name);

    sessionStorage.setItem("SelectedComp", JSON.stringify(x));

    this.setState({
      sidebarContents: sidebarContents,
      workspace: workspace,
      redata: redata,
      coverflowActive: coverflowActive,
    });

    // let arr=this.state.redata;
    // let data=components[index]
    // console.log("OLD DATA",this.state.redata);
    // console.log("NEW DATA",data);
    //  arr.splice(index, 0, data);
    // console.log("TYTY",arr);
  };

  /**
   * Changes the active element of the coverflow in concept tab
   * @param  {number} coverflowActive
   * @see module:components/concept/Coverflow~onChange
   */
  changeCoverflowActive = (coverflowActive) => {
    sessionStorage.setItem("pageReloadConcept", false);

    this.setState({
      coverflowActive: coverflowActive,
    });
  };
  check = async () => {
    let reloadRetrive = sessionStorage.getItem("Reload");
    if (localStorage.getItem("programMode") == "program") {
      this.props.history.push("/Assembly");
      window.location.href = "/Assembly";

      if (reloadRetrive) {
        window.location.reload();
        const portList = await navigator.serial.getPorts();
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>", portList);
        this.props.webSerialAction({ port: portList[0] }); // dispatching function of redux

        sessionStorage.setItem("Reload", true);
      }
    } else {
      // for restriction...

      var SelectedComp = JSON.parse(sessionStorage.getItem("SelectedComp"));
      socket.emit("/checkConcept", SelectedComp, "Final");
      socket.on("/conceptResult", (data) => {
        if (!data) {
          this.setState({ modalIsOpen: true });
        } else {
          this.props.history.push("/Assembly");
        }
      });
    }
  };
  close = () => {
    this.setState({ modalIsOpen: false });
  };
  closeUsb = () => {
    this.setState({ usbOpen: false });
  };
  goBack = () => {
    this.props.history.goBack();
  };
  erasedConceptData = () => {
    // this.setState({ erasedProgram: true });
    this.props.history.push("/selectScreen/InternalAccessories");
    window.location.reload();
  };
  shouldErase = (info) => {
    if (info == "Yes") {
      sessionStorage.removeItem("Index");
      this.props.indexData.concept.Index = [];
      this.props.history.push("/selectScreen/InternalAccessories");
      window.location.reload();
    } else {
      this.setState({ erasedProgram: false });
    }
  };

  // static getDerivedStateFromProps(props, state) {
  //   console.log("CALLING888 getDerivedStateFromProps PROPS", props);

  //   console.log("CALLING888 getDerivedStateFromProps STATE", state);
  //   console.log(document.querySelector("#coverflowElement"), "WORKING");

  //   // if (document.querySelector("#coverflowElement") != null) {
  //   //   console.log(
  //   //     document.querySelector("#coverflowElement").getAttribute("cardId"),
  //   //     "WORKING GDSFP"
  //   //   );
  //   // }
  //   // this.setState({
  //   //   coverflowActive: document.querySelector("#coverflowElement").cardid,
  //   // });
  // }

  componentDidUpdate() {
    if (document.querySelector("#coverflowElement") != null) {
      sessionStorage.setItem(
        "coverflowActive",
        document.querySelector("#coverflowElement").getAttribute("cardId")
      );
    }
  }

  render() {
    sessionStorage.setItem("assemblyCheckbox", JSON.stringify(activeCheckBox));

    // var App=this.props.app;
    if (localStorage.getItem("programMode") == "learn") {
      if (this.state.sidebarContents.length === this.state.components.length) {
        // this.state.Alldata != 0
        nextButtonVisibilty = "visible";
      }
    } else {
      nextButtonVisibilty = "visible";
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
              style={{ textDecoration: "none", color: "black" }}
              to="/biboxSelection"
            >
              Reconnect
            </Link>
          </button>
        </div>
      </Modal>
    );
    var tutorialModal = (
      <Modal
        isOpen={this.state.modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img
          onClick={this.close}
          className="closeconceptModal"
          src="images/login/button_exit@2x.png"
        ></img>
        <div className="connectconceptMsg">
          <p>Device not connected</p>
          <button className="">
            {" "}
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/biboxSelection"
            >
              Reconnect
            </Link>
          </button>
        </div>
      </Modal>
    );
    var dataErased = (
      <Modal
        isOpen={this.state.erasedProgram}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* STYLE CHANGES By: SOUMITYA 
            both btn STYLE 
            customStyles STYLE
        */}
        <div className="erasedConceptMsg" style={{ zIndex: "999" }}>
          <p>All Unsaved program will be Erased, Continue ?</p>
          <button className="BtnPopup" onClick={() => this.shouldErase("Yes")}>
            Yes
          </button>
          <button
            className="BtnPopup"
            onClick={() => this.shouldErase("No")}
            style={{ position: "relative", left: "10px" }}
          >
            No
          </button>
        </div>
      </Modal>
    );

    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          userSelect: "none",
        }}
      >
        {/* <Tutorials ref='tutorial' step={this.props.step} projId={this.props.projId} currentTab={this.props.currentTab} tutorialMode={this.props.tutorialMode} app={App}/> */}

        {/* COVERFLOW  */}
        <div
          style={{
            width: "82.5%",
            height: "100%",
            position: "absolute",
            left: 0,
            background: "#FCFCFC",
          }}
        >
          {/* DESCRIPTION */}
          <div
            className=""
            style={{
              display: "flex",
              position: "absolute",
              bottom: "5%",
              left: "50%",
              transform: "translate(-50%,0%)",
              clear: "both",
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {this.state.sidebarContents.length ===
            this.state.components.length ? null : JSON.parse(
                sessionStorage.getItem("pageReloadConcept")
              ) === true ? (
              <p className="sensor-txt" style={{ color: "#707070" }}>
                {
                  this.state.components[
                    sessionStorage.getItem("coverflowActive")
                  ].description
                }
              </p>
            ) : this.state.components[this.state.coverflowActive] ? (
              <p style={{ color: "#707070" }}>
                {this.state.components[this.state.coverflowActive].description}
              </p>
            ) : (
              ""
            )}
          </div>
          <div
            style={{
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {
              // console.log(
              //   "NOOOOOO",
              //   this.state.sidebarContents,
              //   this.state.components
              // )
            }
            {this.state.sidebarContents.length ===
            this.state.components.length ? (
              <div style={{ display: "table", width: "100%", height: "100%" }}>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "table-cell",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "x-large",
                    fontWeight: "bold",
                    color: "#656768",
                  }}
                >
                  All Components have been selected
                </div>
                {dataErased}
              </div>
            ) : (
              <div style={{ display: "table", width: "100%", height: "100%" }}>
                <div
                  style={{
                    display: "table-row",
                    color: "#656768",
                    textAlign: "center",
                    height: "15%",
                    fontWeight: "normal",
                    fontSize: "30px",
                  }}
                >
                  {/* <div
                  style={{
                    display: "table-cell",
                    textAlign: "left",
                    color: "#423D3D",
                    paddingLeft: "10%",
                    paddingTop: "7%",
                    verticalAlign: "bottom",
                  }}
                >
                  Select components:
                </div> */}
                </div>
                {tutorialModal}

                {/* REMOVE the pop */}
                {/* {usbDetectionModel} */}
                {dataErased}
                <div
                  style={{
                    display: "table-row",
                    height: "65%",
                    zIndex: "100",
                  }}
                >
                  <div
                    style={{
                      display: "table-cell",
                      verticalAlign: "middle",
                    }}
                  >
                    <Coverflow
                      components={this.state.redata}
                      select={this.select}
                      active={
                        JSON.parse(
                          sessionStorage.getItem("pageReloadConcept")
                        ) == true
                          ? JSON.parse(
                              sessionStorage.getItem("coverflowActive")
                            )
                          : this.state.coverflowActive
                      }
                      onChange={this.changeCoverflowActive}
                      displayQuantityOfSide={2}
                      navigation
                      infiniteScroll
                      enableHeading
                      media={{
                        "@media (max-width: 900px)": {
                          width: "600px",
                          height: "300px",
                        },
                        "@media (min-width: 900px)": {
                          width: "960px",
                          height: "600px",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SIDE_BAR */}
        <div
          style={{
            width: "17.5%",
            height: "100%",
            // border: "1px solid green",
            backgroundColor: "#F6F6F6",
            position: "absolute",
            left: "82.5%",
            top: "0",
          }}
        >
          <Sidebar
            appState={this}
            components={this.state.components}
            sidebarContents={this.state.sidebarContents}
            remove={this.remove}
            projId={this.props.projId}
          />
        </div>

        {/* BOTTOM BACK,NEXT BTN and discription*/}
        <div className="SelectScreenBottom">
          <div className="bottom-child">
            <img
              className="iconBtnSize imgBackBtn"
              src={renderPrgImage("backBtn")}
              onClick={this.erasedConceptData}
            />
            <img
              className="iconBtnSize imgNextBtn"
              src={renderPrgImage("nextBtn")}
              onClick={this.check}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return state;
  return {
    indexData: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selecteComponent: (data) => {
      dispatch({ type: "COMPONENT_SELECTION", payload: data });
    },
    ComponentProps: (data) => {
      dispatch({ type: "COMPONENT_PROPS", payload: data });
    },
    indexSelection: (data) => {
      dispatch({ type: "Index_selection", payload: data });
    },
    webSerialAction: (data) => {
      console.log("mapDispatchToProps", data);
      dispatch(webSerialAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
// export default Content;
