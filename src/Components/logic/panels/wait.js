import React, { Component } from "react";
import Slider from "./helpers/Slider";
import { Link } from "react-router-dom";

import { timericon } from "../../../source/index";
import renderPrgImage from "../../../source/programImg";

var h = 0;
var m = 0;
var s = 0;
var ms = 0;

var _0to60 = {},
  _0to24 = {},
  _0to1000 = {};
for (let i = 0; i < 24; i++) _0to24[i] = i;
for (let i = 0; i < 60; i++) _0to60[i] = i;
for (let i = 0; i < 1000; i += 50) _0to1000[i] = i;
class WaitPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  onChange = (key, value) => {
    const { state, onChange } = this.props;
    state[key] = value;

    switch (key) {
      case "h": {
        h = value;
        break;
      }
      case "m": {
        m = value;
        break;
      }
      case "s": {
        s = value;
        break;
      }
      case "ms": {
        ms = value;
        break;
      }
    }

    onChange(state, "wait");
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
      <div className="Wait-main-container">
        <div className="slider-section">
          <div className="slider-item1" style={{ position: "relative" }}>
            <Slider
              title="Milliseconds"
              name="milliseconds"
              options={_0to1000}
              value={state["ms"] || 0}
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
              value={state["s"] || 0}
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
              value={state["m"] || 0}
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
              value={state["h"] || 0}
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
          <img
            src={renderPrgImage("timericon")}
            style={{ height: "33%", width: "60%" }}
          />
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
              <p>
                {h}:{m}:{s}:{ms}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WaitPanel;
/*<tr>
<td><Select options={_0to24} onChange={(value)=>this.onChange('h',value)} color={HexTypes['wait'].color} selected={h || 0}/> Hours</td>
<td><Select options={_0to60} onChange={(value)=>this.onChange('m',value)} color={HexTypes['wait'].color} selected={m || 0}/> Minutes</td>
<td><Select options={_0to60} onChange={(value)=>this.onChange('s',value)} color={HexTypes['wait'].color} selected={s || 0}/> Seconds</td>
<td><Select options={_0to1000} onChange={(value)=>this.onChange('ms',value)} color={HexTypes['wait'].color} selected={ms || 0}/> Milliseconds</td>
</tr>*/
