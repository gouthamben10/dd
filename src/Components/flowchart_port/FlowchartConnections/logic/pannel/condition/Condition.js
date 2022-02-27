import React, { Component } from "react";
import {
  greaterthanInActive,
  greaterthanActive,
  lessthanActive,
  lessthanInActive,
  inbetweenActive,
  inbetweenInActive,
  equaltoActive,
  equaltoInActive,
  notequaltoActive,
  notequaltoInActive,
} from "../../../../../../source/index";
import Select from "../helpers/Select";
import Slider from "../helpers/Slider";

import "./condition.css";

let a1Checked = JSON.parse(sessionStorage.getItem("a1-I/O"));
let a1Digi = JSON.parse(sessionStorage.getItem("A1DIGI"));
let a2Checked = JSON.parse(sessionStorage.getItem("a2-I/O"));
let a2Digi = JSON.parse(sessionStorage.getItem("A2DIGI"));
let b1Checked = JSON.parse(sessionStorage.getItem("b1-I/O"));
let b1Digi = JSON.parse(sessionStorage.getItem("B1DIGI"));
let b2Checked = JSON.parse(sessionStorage.getItem("b2-I/O"));
let b2Digi = JSON.parse(sessionStorage.getItem("B2DIGI"));
let c1Checked = JSON.parse(sessionStorage.getItem("c1-I/O"));
let c1Digi = JSON.parse(sessionStorage.getItem("C1DIGI"));
let c2Checked = JSON.parse(sessionStorage.getItem("c2-I/O"));
let c2Digi = JSON.parse(sessionStorage.getItem("C2DIGI"));
let d1Checked = JSON.parse(sessionStorage.getItem("D1"));
let d1Digi = JSON.parse(sessionStorage.getItem("D1DIGI"));
let d2Checked = JSON.parse(sessionStorage.getItem("D2"));
let d2Digi = JSON.parse(sessionStorage.getItem("D2DIGI"));
let min;
let count = [];
let count1 = [];
let isG = [];
let isL = [];
let isNe = [];
let isE = [];
let isIb = [];
let selected = [],
  selectedTwo = [];

for (let i = 0; i < 1000; i++) selected[i] = "null";
class Condition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: false,
      isGraterThan: isG[this.props.check],
      isLessThan: isL[this.props.check],
      isNotequalTo: isNe[this.props.check],
      isEqualTo: isE[this.props.check],
      isInBtween: isIb[this.props.check],
      isRead: false,

      responceTp0: "",
      responceTp1: "",
      responceTp2: "",
      touch_pad: "",
      touch_pad2: "",
      rangeA1: "252",
      rangeA2: "",
      tactswitch: "",
      mic: "",
      temp: "",
      gas: "",
      one: "",
      two: "",
      red: "",
      green: "",
      blue: "",
      light: "",
      gesture: "",
      distance: "",
      readToggel: "",
      value: count[this.props.check],
      value1: count1[this.props.check],
      max: 1,
      selected: selected[this.props.check],
      selectedTwo: selectedTwo[this.props.check],
    };
  }
  componentWillMount() {
    a1Checked = JSON.parse(sessionStorage.getItem("a1-I/O"));
    a1Digi = JSON.parse(sessionStorage.getItem("A1DIGI"));
    a2Checked = JSON.parse(sessionStorage.getItem("a2-I/O"));
    a2Digi = JSON.parse(sessionStorage.getItem("A2DIGI"));
    b1Checked = JSON.parse(sessionStorage.getItem("b1-I/O"));
    b1Digi = JSON.parse(sessionStorage.getItem("B1DIGI"));
    b2Checked = JSON.parse(sessionStorage.getItem("b2-I/O"));
    b2Digi = JSON.parse(sessionStorage.getItem("B2DIGI"));
    c1Checked = JSON.parse(sessionStorage.getItem("c1-I/O"));
    c1Digi = JSON.parse(sessionStorage.getItem("C1DIGI"));
    c2Checked = JSON.parse(sessionStorage.getItem("c2-I/O"));
    c2Digi = JSON.parse(sessionStorage.getItem("C2DIGI"));
    if (selected[this.props.check] == "null") return;

    this.onChange("hi", selected[this.props.check]);
  }
  componentWillUnmount() {
    count[this.props.check] = this.state.value;
    selected[this.props.check] = this.state.selected;
    selectedTwo[this.props.check] = this.state.selectedTwo;
    isG[this.props.check] = this.state.isGraterThan;

    isL[this.props.check] = this.state.isLessThan;
    isNe[this.props.check] = this.state.isNotequalTo;
    isE[this.props.check] = this.state.isEqualTo;
    isIb[this.props.check] = this.state.isInBtween;
    count1[this.props.check] = this.state.value1;
    console.log("====>selected", selected[this.props.check]);
  }
  onChange = (name, val) => {
    console.log("value===>gsk===>", val);

    if (name == "value") {
      this.setState({ value: val });
      return;
    } else if (name == "value1") {
      this.setState({ value1: val });
      return;
    }
    if (name !== "sourceTwo") {
      if (
        val === "distanceSensor" ||
        val === "lightSensor" ||
        val === "colorSensor" ||
        val === "gestureSensor"
      ) {
        console.log("mic======>=====>", this.state.max);
        this.setState({ max: 255 });
      } else if (val === "microphone") {
        this.setState({ max: 65535 });
      } else if (val.search("touch") == -1 || val === "temperature") {
        this.setState({ max: 1024 });
      } else if (val === "port A1") {
        if (a1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port A2") {
        if (a2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port B1") {
        if (b1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port B2") {
        if (b2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port C1") {
        if (c1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port C2") {
        if (c2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else {
        if (!a1Checked) {
          this.onChange("hi", "port A1");
        } else if (!a2Checked) {
          this.onChange("hi", "port A2");
        } else if (!b1Checked) {
          this.onChange("hi", "port B1");
        } else if (!b2Checked) {
          this.onChange("hi", "port B2");
        } else if (!c1Checked) {
          this.onChange("hi", "port C1");
        } else if (!c2Checked) {
          this.onChange("hi", "port C2");
        }
      }
    }
    if (name === "source") this.setState({ selected: val });
    else if (name == "sourceTwo") this.setState({ selectedTwo: val });
    // if (this.state.value > this.state.max) this.setState({ value: 0 });
  };
  handleOperators(val) {
    if (val == "greaterThan")
      if (this.state.isGraterThan) this.setState({ isGraterThan: false });
      else {
        this.setState({ isGraterThan: true });
        this.setState({ isLessThan: false });
        this.setState({ isInBtween: false });
        this.setState({ isEqualTo: false });
        this.setState({ isNotequalTo: false });
      }
    else if (val == "lessThan")
      if (this.state.isLessThan) this.setState({ isLessThan: false });
      else {
        this.setState({ isLessThan: true });
        this.setState({ isGraterThan: false });
        this.setState({ isInBtween: false });
        this.setState({ isEqualTo: false });
        this.setState({ isNotequalTo: false });
      }
    else if (val == "inBetween")
      if (this.state.isInBtween) this.setState({ isInBtween: false });
      else {
        this.setState({ isInBtween: true });
        this.setState({ isGraterThan: false });
        this.setState({ isLessThan: false });
        this.setState({ isEqualTo: false });
        this.setState({ isNotequalTo: false });
      }
    else if (val == "equalTo")
      if (this.state.isEqualTo) this.setState({ isEqualTo: false });
      else {
        this.setState({ isEqualTo: true });
        this.setState({ isInBtween: false });
        this.setState({ isGraterThan: false });
        this.setState({ isLessThan: false });

        this.setState({ isNotequalTo: false });
      }
    else if (val == "notEqualTo")
      if (this.state.isNotequalTo) this.setState({ isNotequalTo: false });
      else {
        this.setState({ isNotequalTo: true });
        this.setState({ isInBtween: false });
        this.setState({ isGraterThan: false });
        this.setState({ isLessThan: false });
        this.setState({ isEqualTo: false });
      }
  }
  render() {
    min = 0;
    return (
      <div className="outertabDiv-Condition">
        <div className="select-sensor margin-section">
          <span className="sensor-txt">
            If the value of is{" "}
            <Select
              onChange={(value) => this.onChange("source", value)}
              componetName="flowchart"
              selected={this.state.selected}
            />
          </span>
        </div>

        <div className="select-Condition margin-section">
          {this.state.isGraterThan ? (
            <div className="item">
              <img
                src={greaterthanActive}
                onClick={() => this.handleOperators("greaterThan")}
              />
              <p className="sensor-txt">Greater Than</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={greaterthanInActive}
                onClick={() => this.handleOperators("greaterThan")}
              />
              <p className="sensor-txt">Greater Than</p>
            </div>
          )}

          {this.state.isLessThan ? (
            <div className="item">
              <img
                src={lessthanActive}
                onClick={() => this.handleOperators("lessThan")}
              />
              <p className="sensor-txt">Less Than</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={lessthanInActive}
                onClick={() => this.handleOperators("lessThan")}
              />
              <p className="sensor-txt">Less Than</p>
            </div>
          )}

          {this.state.isInBtween ? (
            <div className="item">
              <img
                src={inbetweenActive}
                onClick={() => this.handleOperators("inBetween")}
              />
              <p className="sensor-txt">In Between</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={inbetweenInActive}
                onClick={() => this.handleOperators("inBetween")}
              />
              <p className="sensor-txt">In Between</p>
            </div>
          )}

          {this.state.isEqualTo ? (
            <div className="item">
              <img
                src={equaltoActive}
                onClick={() => this.handleOperators("equalTo")}
              />
              <p className="sensor-txt">Equals To</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={equaltoInActive}
                onClick={() => this.handleOperators("equalTo")}
              />
              <p className="sensor-txt">Equals To</p>
            </div>
          )}

          {this.state.isNotequalTo ? (
            <div className="item">
              <img
                src={notequaltoActive}
                onClick={() => this.handleOperators("notEqualTo")}
              />
              <p className="sensor-txt">Not Equals To</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={notequaltoInActive}
                onClick={() => this.handleOperators("notEqualTo")}
              />
              <p className="sensor-txt">Not Equals To</p>
            </div>
          )}

          {/* OPERATOR */}
        </div>

        <div className="select-slider margin-section">
          <span>{min}</span>
          <Slider
            value={this.state.value || 0}
            onChange={(value) => this.onChange("value", value)}
            max={this.state.max}
            min={min}
            renderIn="conditionPropertyPanel"
          />
          <span>{this.state.max}</span>
        </div>
        {this.state.isInBtween ? (
          <div className="select-slider margin-section">
            <span>{min}</span>
            <Slider
              value={this.state.value1 || 0}
              onChange={(value) => this.onChange("value1", value)}
              max={this.state.max}
              min={min}
              renderIn="conditionPropertyPanel"
            />
            <span>{this.state.max}</span>
          </div>
        ) : (
          <></>
        )}

        <div className="select-sensor-Read margin-section">
          <span>
            Read the
            <Select
              onChange={(value) => this.onChange("sourceTwo", value)}
              componetName="flowchart"
              selected={this.state.selectedTwo}
            />
          </span>

          <div>
            {this.state.isRead ? (
              <div
                style={{
                  width: "120px",
                  height: "45px",
                  background: "#fafafa",
                  borderRadius: "15px",
                  color: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                //   onClick={() => this.handleRead()}
              >
                {this.state.readToggel == "A1" ? (
                  <p>{this.state.rangeA1}</p>
                ) : this.state.readToggel == "A2" ? (
                  <p>{this.state.rangeA2}</p>
                ) : this.state.readToggel == "B1" ? (
                  <p>{this.state.temp}</p>
                ) : this.state.readToggel == "B2" ? (
                  <p>{this.state.gas}</p>
                ) : this.state.readToggel == "C1" ? (
                  <p>{this.state.one}</p>
                ) : this.state.readToggel == "C2" ? (
                  <p>{this.state.two}</p>
                ) : this.state.readToggel == "TOUCH PAD 0" ? (
                  <p>{this.state.rangeA1}</p>
                ) : this.state.readToggel == "TOUCH PAD 1" ? (
                  <p>{this.state.temp}</p>
                ) : this.state.readToggel == "TOUCH PAD 2" ? (
                  <p>{this.state.one}</p>
                ) : this.state.readToggel == "MICROPHONE" ? (
                  <p>{this.state.mic}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  BLUE" ? (
                  <p>{this.state.blue}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  GREEN" ? (
                  <p>{this.state.green}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  RED" ? (
                  <p>{this.state.red}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  LIGHT" ? (
                  <p>{this.state.light}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  GESTURE" ? (
                  <p>{this.state.gesture}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  DIST" ? (
                  <p>{this.state.distance}</p>
                ) : null}
              </div>
            ) : (
              <div
                style={{
                  width: "120px",
                  height: "45px",
                  background: "#25245E",
                  borderRadius: "15px",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                //   onClick={() => this.handleRead()}
              >
                Read
              </div>
            )}
          </div>

          {/* <Conditions
                      responceTp0={this.state.responceTp0}
                      responceTp1={this.state.responceTp1}
                      responceTp2={this.state.responceTp2}
                      touch_pad={this.state.touch_pad}
                      touch_pad2={this.state.touch_pad2}
                      rangeA1={this.state.rangeA1}
                      rangeA2={this.state.rangeA2}
                      tactswitch={this.state.tactswitch}
                      mic={this.state.mic}
                      temp={this.state.temp}
                      gas={this.state.gas}
                      one={this.state.one}
                      two={this.state.two}
                    /> */}
        </div>
      </div>
    );
  }
}

export default Condition;
