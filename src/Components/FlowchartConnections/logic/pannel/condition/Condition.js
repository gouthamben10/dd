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
} from "../../../../../source/index";
import Select from "../helpers/Select";
import Slider from "../helpers/Slider";
class Condition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: false,
      isGraterThan: false,
      isLessThan: false,
      isNotequalTo: false,
      isEqualTo: false,
      isInBtween: false,
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
      value: 0,
    };
  }
  onChange = (name, val) => {};
  render() {
    let max = 100,
      min = 0;
    return (
      <div className="outertabDiv-Condation">
        <div className="select-sensor margin-section">
          <span className="sensor-txt">
            If the value of is{" "}
            <Select
              onChange={(value) => this.onChange("source", value)}
              componetName="flowchart"
            />
          </span>
        </div>

        <div className="select-Condition margin-section">
          {this.state.isGraterThan ? (
            <div className="item">
              <img
                src={greaterthanActive}
                //   onClick={() => this.handleOperators("greaterThan")}
              />
              <p className="sensor-txt">Greater Than</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={greaterthanInActive}
                //   onClick={() => this.handleOperators("greaterThan")}
              />
              <p className="sensor-txt">Greater Than</p>
            </div>
          )}

          {this.state.isLessThan ? (
            <div className="item">
              <img
                src={lessthanActive}
                //   onClick={() => this.handleOperators("lessThan")}
              />
              <p className="sensor-txt">Less Than</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={lessthanInActive}
                //   onClick={() => this.handleOperators("lessThan")}
              />
              <p className="sensor-txt">Less Than</p>
            </div>
          )}

          {this.state.isInBtween ? (
            <div className="item">
              <img
                src={inbetweenActive}
                //   onClick={() => this.handleOperators("inBetween")}
              />
              <p className="sensor-txt">In Between</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={inbetweenInActive}
                //   onClick={() => this.handleOperators("inBetween")}
              />
              <p className="sensor-txt">In Between</p>
            </div>
          )}

          {this.state.isEqualTo ? (
            <div className="item">
              <img
                src={equaltoActive}
                //   onClick={() => this.handleOperators("equalTo")}
              />
              <p className="sensor-txt">Equals To</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={equaltoInActive}
                //   onClick={() => this.handleOperators("equalTo")}
              />
              <p className="sensor-txt">Equals To</p>
            </div>
          )}

          {this.state.isNotequalTo ? (
            <div className="item">
              <img
                src={notequaltoActive}
                //   onClick={() => this.handleOperators("notEqualTo")}
              />
              <p className="sensor-txt">Not Equals To</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={notequaltoInActive}
                //   onClick={() => this.handleOperators("notEqualTo")}
              />
              <p className="sensor-txt">Not Equals To</p>
            </div>
          )}

          {/* OPERATOR */}
        </div>

        <div className="select-slider margin-section">
          <Slider
            value={this.state.value || 0}
            onChange={(value) => this.onChange("value", value)}
            max={max}
            min={min}
            renderIn="conditionPropertyPanel"
          />
        </div>

        <div className="select-sensor-Read margin-section">
          <span>
            Read the
            <Select
              onChange={(value) => this.onChange("source", value)}
              componetName="flowchart"
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
