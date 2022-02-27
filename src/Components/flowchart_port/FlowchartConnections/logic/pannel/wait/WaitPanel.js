import React, { Component } from "react";
import Slider from "../helpers/Slider";
import { Link } from "react-router-dom";
import { timericon } from "../../../../../../source/index";
import "./wait.css";

var h = [];
var m = [];
var s = [];
var ms = [];
var chk = -1;
var _0to60 = {},
  _0to24 = {},
  _0to1000 = {};
for (let i = 0; i < 244; i++) {
  h[i] = 0;
  m[i] = 0;
  s[i] = 0;
  ms[i] = 0;
}
for (let i = 0; i < 24; i++) _0to24[i] = i;
for (let i = 0; i < 60; i++) _0to60[i] = i;
for (let i = 0; i < 1000; i += 50) _0to1000[i] = i;
class WaitPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      hr: h[this.props.check],
      min: m[this.props.check],
      sec: s[this.props.check],
      milliSec: ms[this.props.check],
    };
  }
  componentWillUnmount() {
    console.log("=====>props=====>======>", this.props.check);
    h[this.props.check] = this.state.hr;
    m[this.props.check] = this.state.min;
    s[this.props.check] = this.state.sec;
    ms[this.props.check] = this.state.milliSec;
  }
  onChange = (key, value) => {
    const { state, onChange } = this.props;
    state[key] = value;
    console.log("hi====>gsk===>=============>", this.props);
    switch (key) {
      case "h": {
        // h = value;
        this.setState({ hr: value });
        break;
      }
      case "m": {
        // m = value;
        this.setState({ min: value });
        break;
      }
      case "s": {
        // s = value;
        this.setState({ sec: value });
        break;
      }
      case "ms": {
        // ms = value;
        this.setState({ milliSec: value });
        break;
      }
    }
    //gsk edited for flowchart (uncomment the bellow line)
    // onChange(state, "wait");
  };

  hexTypeCheck = () => {
    const { state, onChange } = this.props;
    // state[key] = value;
    onChange(state, "wait");
    // this.props.hexTypeCheck("wait")
  };
  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      // console.log("waitvalueIN", prevProps.state, this.props.state);
      // return this.render
    }
  }

  render() {
    const min = this.props.min || 0;
    const max = this.props.max || 255;
    const { name, assign, value, port, state, onChange } = this.props;

    var timeDelays = ["Milliseconds", "Seconds", "Minutes", "Hours"];
    return (
      <div className="outertabDiv-wait">
        <div className="wait-container">
        <div className="slider-section">
          <div className="slider-item1" style={{ position: "relative" }}>
            <Slider
              title="Milliseconds"
              name="milliseconds"
              options={_0to1000}
              value={this.state.milliSec || state["ms"] || 0}
              min={0}
              max={950}
              renderIn="waitPropertyPanel"
              onChange={(value) => this.onChange("ms", value)}
            />

            <p
              style={{
                position: "absolute",
                top: "35%",
                left: "33%",
                fontSize: "16px",
              }}
            >
              0
            </p>
            <p
              style={{
                position: "absolute",
                top: "35%",

                fontSize: "16px",
                right: "13%",
              }}
            >
              950
            </p>
          </div>
          <div className="slider-item1" style={{ position: "relative" }}>
            <Slider
              title="Seconds"
              name="seconds"
              value={this.state.sec || state["s"] || 0}
              options={_0to60}
              min={0}
              max={59}
              renderIn="waitPropertyPanel"
              onChange={(value) => this.onChange("s", value)}
            />

            <p
              style={{
                position: "absolute",
                top: "35%",

                left: "33%",
                fontSize: "16px",
              }}
            >
              0
            </p>
            <p
              style={{
                position: "absolute",
                top: "35%",

                fontSize: "16px",
                right: "13%",
              }}
            >
              59
            </p>
          </div>

          <div className="slider-item1" style={{ position: "relative" }}>
            <Slider
              title="Minutes"
              name="minutes"
              value={this.state.min || state["m"] || 0}
              options={_0to60}
              min={0}
              max={59}
              renderIn="waitPropertyPanel"
              onChange={(value) => this.onChange("m", value)}
            />

            <p
              style={{
                position: "absolute",
                top: "35%",

                left: "33%",
                fontSize: "16px",
              }}
            >
              0
            </p>
            <p
              style={{
                position: "absolute",
                top: "35%",

                fontSize: "16px",
                right: "13%",
              }}
            >
              59
            </p>
          </div>

          <div className="slider-item1" style={{ position: "relative" }}>
            <Slider
              title="Hours"
              name="hours"
              value={this.state.hr || state["h"] || 0}
              options={_0to24}
              max={23}
              min={0}
              renderIn="waitPropertyPanel"
              onChange={(value) => this.onChange("h", value)}
            />

            <p
              style={{
                position: "absolute",
                top: "35%",

                left: "33%",
                fontSize: "16px",
              }}
            >
              0
            </p>
            <p
              style={{
                position: "absolute",
                top: "35%",

                fontSize: "16px",
                right: "13%",
              }}
            >
              23
            </p>
          </div>
        </div>

        <div className="timer-section">
          <img src={timericon} style={{ height: "40%", width: "90%" }} />
          <div
            style={{
              height: "10%",
              width: "53%",
              border: "0.5px solid #25245E",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <p style={{marginBottom: "0px"}}>
                {this.state.hr}:{this.state.min}:{this.state.sec}:
                {this.state.milliSec}
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default WaitPanel;
