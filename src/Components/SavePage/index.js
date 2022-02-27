import React, { Component } from "react";
import html2canvas from "html2canvas";
import "./save.css";
import { saveBtn, backBtn, helpBtnInActive } from "../../source/index";
import renderPrgImage from "../../source/programImg";
import SimulatePrgm from "../ReusableComponents/PrgmSlider/SimulatePrgm/SimulatePrgm";
import SavePrgm from "../ReusableComponents/PrgmSlider/SavePrgm/SavePrgm";

const axios = require("axios");

class SaveProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      discription: "",
      link: "",
      imgURL: "",
      isHelp: false,
    };
  }
  componentDidMount = () => {
    var self = this;
    var div = document.getElementById("assemblyShot");

    if (
      sessionStorage.getItem("assempblyImageHTML") &&
      sessionStorage.getItem("assempblyImageHTML") != ""
    ) {
      div.innerHTML = sessionStorage.getItem("assempblyImageHTML");
      html2canvas(div).then(function (canvas) {
        div.innerHTML = "";
        var img = canvas.toDataURL("image/png");
        sessionStorage.setItem("assempblyImageURI", img);
        var imgTag = document.getElementById("screenshot");
        self.setState({ imgURL: img });
        imgTag.src = img;
      });
    }
    // var div=document.getElementById('assemblyShot');
    // div.innerHTML=sessionStorage.getItem("assempblyImageHTML");
  };

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };
  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };
  save = () => {
    console.log("SAVE BTN CLICK");
    let allData = {
      ...this.state,
      bytes: JSON.parse(sessionStorage.getItem("Bytes")),
    };
    axios
      .post("http://localhost:3008/saveProject", allData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // console.log(response.data);
        console.log("ERROR", error.message);
      });

    let history = {
      concept: JSON.parse(sessionStorage.getItem("concept")),
      assembly: JSON.parse(sessionStorage.getItem("assembly")),
      logic: JSON.parse(sessionStorage.getItem("logic")),
    };

    axios
      .post("http://localhost:3008/saveHistory", history)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // console.log(response.data);
        console.log("ERROR", error.message);
      });
  };
  render() {
    return (
      <div
        style={{ height: "100vh", width: "100vw", position: "relative" }}
        className="savePageConatiner"
      >
        <div
          style={{
            position: "absolute",
            top: "3%",
            width: "95%",
            height: "10vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
            // border: "1px solid red",
            marginLeft: "3%",
            position: "relative",
          }}
        >
          <img
            className="iconBtnSize imgBackBtn"
            src={renderPrgImage("backBtn")}
            style={{ marginTop: "1%", marginRight: "3%", cursor: "pointer" }}
            onClick={() => (window.location.href = "/simulate")}
          />
          <p className="saveHeadingTxt">Save Your Project</p>

          {this.state.isHelp ? (
            <div className="Slide">
              <SavePrgm />
            </div>
          ) : (
            <img
              className="iconBtnSize imgBackBtn"
              src={renderPrgImage("helpBtnInActive")}
              style={{
                marginTop: "1%",
                marginRight: "1.5%",
                position: "absolute",
                right: "0",
                cursor: "pointer",
              }}
              onClick={this.helpBtn}
            />
          )}

          {this.state.isHelp ? (
            <img
              className="hpClose"
              src={renderPrgImage("closBtn")}
              onClick={this.helpBtn}
            ></img>
          ) : null}
        </div>
        <div className="item-2">
          <div className="SavePageinputdetails">
            <input
              className="nameInputDetails saveHeadingTxt2"
              type="text"
              placeholder="Name"
              onChange={this.handleChange}
            />
            <textarea
              className="descriptionInputDetails saveHeadingTxt2"
              placeholder="Description"
              onChange={this.handleChange}
            />
            <input
              className="nameInputDetails saveHeadingTxt2"
              type="text"
              placeholder="Video Link.."
              onChange={this.handleChange}
            />
          </div>
          <div className="SavePageImgdetails saveHeadingTxt2">
            <p>Add Images</p>
            <div
              style={{
                height: "70%",
                width: "90%",
                backgroundColor: "#F5F5F5",
                marginTop: "15px",
              }}
            >
              {" "}
              <img
                id="screenshot"
                style={{ height: "100%", width: "100%", borderRadius: "30px" }}
                src={this.state.imgURL}
              />
            </div>
            <img
              src={renderPrgImage("saveBtn")}
              style={{
                height: "75px",
                width: "75px",
                position: "absolute",
                bottom: "0",
                right: "0",
                cursor: "pointer",
              }}
              onClick={this.save}
            />
            <div id="assemblyShot"></div>
          </div>
        </div>
      </div>
    );
    // return (
    //   <div style={{ height: "100vh", width: "100vw" }}>
    //     {/* back button */}
    //     <img
    //       alt="adfaf"
    //       onClick={() => (window.location.href = "/#/simulate")}
    //       src="imagesplay/button_back.png"
    //       style={{
    //         position: "absolute",
    //         top: "10px",
    //         width: "50px",
    //         cursor: "pointer",
    //         left: "10px",
    //       }}
    //     />
    //     <div style={{ display: "inline-block", width: "60%", height: "100%" }}>
    //       <div className="main">
    //         <div>
    //           <label for="input1">Project Name:&nbsp;</label>
    //           <input
    //             id="input1"
    //             type="text"
    //             name="name"
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //         <div>
    //           <label for="input2">Discription:&nbsp;&nbsp;&nbsp;</label>
    //           <input
    //             id="input2"
    //             type="text"
    //             name="discription"
    //             style={{ height: "80px" }}
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //         <div>
    //           <label for="input3">Video Link:&nbsp;&nbsp;&nbsp;</label>
    //           <input
    //             id="input3"
    //             type="text"
    //             name="link"
    //             onChange={this.handleChange}
    //           ></input>
    //         </div>
    //       </div>
    //     </div>
    //     <div style={{ width: "40%", height: "100%", float: "right" }}>
    //       <div className="right_div">
    //         {/* <div id='screenshot' style={{backgroundImage:`url(${this.state.imgURL})`,height:"100%",width:"100%",backgroundSize:"contain"}}></div> */}
    //         <img
    //           id="screenshot"
    //           style={{ height: "100%", width: "100%", borderRadius: "30px" }}
    //           src={this.state.imgURL}
    //         />
    //       </div>
    //       <div style={{ position: "absolute", top: "88vh", left: "92vw" }}>
    //         <img
    //           onClick={this.save}
    //           src="images/Learn/learn_button_save.png"
    //           style={{ height: "50px", width: "50px" }}
    //         />
    //       </div>
    //     </div>
    //     <div id="assemblyShot"></div>
    //   </div>
    // );
  }
}

export default SaveProgram;
