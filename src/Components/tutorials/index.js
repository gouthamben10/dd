import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./tutorial.css";
var styleT = {
  width: "35vw",
  backgroundColor: "#5faad9",
  outline: "0",
  borderWidth: "0 0 2px",
  borderColor: "black",
  textAlign: "center",
  backgroundColor: "transparent",
};
const customStylesUpload = {
  content: {
    top: "50%",
    left: "50%",
    height: " 30%",
    width: " 30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    zIndex: 1000000,
    borderRadius: "15px",
    transform: "translate(-50%, -50%)",
    border: "2px solid black",
  },
};

var countConcept = 1;
var countAssembly = 1;
var countLogic = 1;

class Save extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveOpen: false,
    };
  }
  save = () => {
    var name = document.getElementById("name").value;
    var SelectedComp = JSON.parse(sessionStorage.getItem("SelectedComp"));
    var program = JSON.parse(sessionStorage.getItem("logic"))["program"];
    var end = JSON.parse(sessionStorage.getItem("logic"))["end"];

    var PortConnections = JSON.parse(sessionStorage.getItem("assembly"))[
      "PortConnections"
    ];

    var concept = {
      // 1: document.getElementById("concept1").value,
      // 2: document.getElementById("concept2").value
    };
    //
    for (let i = 1; i <= countConcept; i++) {}

    var Description = {
      concept,
      // assembly1: document.getElementById("assembly1").value,
      // assembly2: document.getElementById("assembly2").value,
      // logic1: document.getElementById("logic1").value,
      // logic2: document.getElementById("logic2").value,
    };

    var socket = socketIOClient("http://localhost:3008");
    socket.emit(
      "/saveTutorials",
      name,
      SelectedComp,
      PortConnections,
      end,
      program,
      Description
    );
    socket.on("_saveTutorial", () => {
      this.setState({ saveOpen: true });
    });
  };
  closeSave = () => {
    this.setState({ saveOpen: false });
  };
  deleteConcept = () => {
    if (countConcept > 1) {
      var elem = document.getElementById("concept" + countConcept);
      elem.parentNode.removeChild(elem);
      var elem = document.getElementById("conceptLabel" + countConcept);
      elem.parentNode.removeChild(elem);
    }
    countConcept--;
  };
  addConcept = () => {
    countConcept++;
    if (countConcept <= 4) {
      var label = document.createElement("label");
      var text = document.createTextNode("Concept Desc" + countConcept);
      label.setAttribute("id", "conceptLabel" + countConcept);
      label.appendChild(text);
      var input = document.createElement("input");
      input.setAttribute("id", "concept" + countConcept);
      input.style.width = "35vw";
      input.style.outline = "0";
      input.style.backgroundColor = "#5faad9";
      input.style.borderWidth = "0 0 2px";
      input.style.borderColor = "black";
      input.style.textAlign = "center";
      input.style.marginTop = "5px";
      var br = document.createElement("br");

      var element = document.getElementById("conceptTutorId");
      element.appendChild(label);
      element.appendChild(input);
      element.appendChild(br);
      element.appendChild(br);
      element.appendChild(br);
    }
  };
  render() {
    return (
      <div className="Selection" style={{ height: "100vh", width: "100vw" }}>
        <Link to="/logic">
          {" "}
          <img
            className="save_back_button"
            src="images/Learn/login_button_back.png"
          />
        </Link>
        <div className="tutorail">
          <h1> SAVE THE TUTORIAL</h1> <br></br>
          <br></br>
          Name of the Tutorial :<input style={styleT} id="name"></input>
          <div
            id="conceptTutorId"
            style={{ position: "relative", marginTop: "5%", left: "2%" }}
          >
            <div>
              <label id="conceptLabel1">Concept Desc1 :</label>
              <input style={styleT} id="concept1"></input>
            </div>
            {/* <div className="conceptTutor"> Concept Desc2    <input style={styleT} id="concept2"></input></div> */}
            {/* Concept Desc2 <input style={styleT} id="concept2"></input><br></br><br></br> */}
          </div>
          <div style={{ position: "relative", marginTop: "2%" }}>
            <button onClick={this.addConcept}>Add</button>
            <button
              onClick={this.deleteConcept}
              style={{ position: "relative", left: "2%" }}
            >
              Delete
            </button>
          </div>
          <div style={{ position: "relative", marginTop: "3%", left: "1.5%" }}>
            <label>Assembly Desc1 :</label>
            <input style={styleT} id="assembly1"></input>
            {/* Concept Desc2 <input style={styleT} id="concept2"></input><br></br><br></br> */}
          </div>
          <button
            onClick={this.addAssembly}
            style={{ position: "relative", marginTop: "2%" }}
          >
            Add
          </button>
          <div style={{ position: "relative", marginTop: "3%", left: "3%" }}>
            <label>Logic Desc1 :</label>
            <input style={styleT} id="logic1"></input>
            {/* Concept Desc2 <input style={styleT} id="concept2"></input><br></br><br></br> */}
          </div>
          <button
            onClick={this.addLogic}
            style={{ position: "relative", marginTop: "2%" }}
          >
            Add
          </button>
          {/* Assembly Desc1  <input style={styleT} id="assembly1"></input><br></br><br></br>
            Assembly Desc2  <input style={styleT} id="assembly2"></input><br></br><br></br>
            Logic Desc1  <input style={styleT} id="logic1"></input><br></br><br></br>
            Logic Desc2  <input style={styleT} id="logic2"></input><br></br><br></br> */}
          <button
            onClick={this.save}
            style={{
              position: "absolute",
              top: "90%",
              left: "45%",
              width: "100px",
            }}
          >
            Save
          </button>
          <Modal
            isOpen={this.state.saveOpen}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStylesUpload}
            contentLabel="Example Modal"
            // id="conceptModal"
          >
            <img
              onClick={this.closeSave}
              className="closeconceptModal"
              src="images/login/button_exit@2x.png"
            ></img>
            <div className="UploadingMsg">
              <p
                style={{
                  color: "#311B92",
                  fontSize: "2vw",
                  textAlign: "center",
                  position: "absolute",
                  top: "12vh",
                  left: "15vh",
                }}
              >
                Tutorial Saved{" "}
              </p>
              {/* <button style={{ color: "#311B92", textAlign: "center" }}>OK</button> */}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Save;
