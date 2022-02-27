import React, { Component } from "react";
import { connect } from "react-redux";
import { color_sensor } from "../../IOComponents";
import Checkbox from "../helpers/Checkbox";
import Slider from "../helpers/Slider";
import LogicSwitchComp from "../helpers/SwitchComp/LogicSwitchComp";

import { rangeStoreVal } from "../../../Assembly/CheckboxData";

var device = localStorage.getItem("biboxTypes");
var outputStyle;

class SliderRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuzzerFrequency: true,
      isBuzzerTone: false,
    };
  }

  static getDerivedStateFromProps(props, state) {}

  onhandleBuzzerFrequency = () => {
    const { state, onChange } = this.props.changeState;

    console.log("FREQUENCY");
    this.setState({ isBuzzerFrequency: true, isBuzzerTone: false });
    if (state.assignBuzzer) {
      state[`assignBuzzerFrequency`] = true;
      state[`assignBuzzerTone`] = false;

      rangeStoreVal["BuzzerFrequency"].isChecked = true;
      rangeStoreVal["BuzzerTone"].isChecked = false;
    } else {
      state[`assignBuzzerFrequency`] = false;
      state[`assignBuzzerTone`] = false;

      rangeStoreVal["BuzzerFrequency"].isChecked = false;
      rangeStoreVal["BuzzerTone"].isChecked = false;
    }

    onChange(state, "hardware");
  };

  onhandleBuzzerTone = () => {
    const { state, onChange } = this.props.changeState;
    console.log("BUZZER");
    this.setState({ isBuzzerFrequency: false, isBuzzerTone: true });
    if (state.assignBuzzer) {
      state[`assignBuzzerFrequency`] = false;
      state[`assignBuzzerTone`] = true;
      rangeStoreVal["BuzzerFrequency"].isChecked = false;
      rangeStoreVal["BuzzerTone"].isChecked = true;
    } else {
      state[`assignBuzzerFrequency`] = false;
      state[`assignBuzzerTone`] = false;
      rangeStoreVal["BuzzerFrequency"].isChecked = false;
      rangeStoreVal["BuzzerTone"].isChecked = false;
    }
    onChange(state, "hardware");
  };

  render() {
    console.log(this.props, "SOUMITYA SLIDER_ROW");

    var { name, assign, port, value, onChange, handlecheckbox, getRangeVal } =
      this.props;

    // if (assign == undefined) {//temporaray fix
    //   assign = true
    // }
    const { PortConnections } = this.props.assembly;
    var defaultport;
    var min = this.props.min || 0;
    var max = this.props.max || 255;

    // NEW UI
    if (name == "smile") {
      console.log("SMILE DATA SLIDER>>>");

      console.log("SMILE DATA SLIDER>>>", min, max);

      return (
        <div className={`hardwareInfo-section`}>
          <div className="portDetails-hw" style={{}}>
            <Checkbox
              checked={assign || false}
              onChange={() => {
                handlecheckbox();
              }}
              label={this.props.name}
              activePort={port}
            />
          </div>
          <div
            className={`portSlider-hw  isActivehardwareInfo${assign}`}
            style={{ position: "relative" }}
          >
            <Slider
              title="Intensity"
              disabled={!assign}
              value={value || 0}
              min={min}
              max={max}
              onChange={(value, name) => {
                console.log("RANGE CLCIK");

                getRangeVal(this.props.title, port, value);
              }}
              renderIn="hardwarePropertyPanel"
            />
            <p style={{ position: "absolute", left: "27%", bottom: "10%" }}>
              {min}
            </p>
            <p style={{ position: "absolute", right: "12%", bottom: "10%" }}>
              {max}
            </p>
          </div>
        </div>
      );
    }

    if (name == "touchPadOutput") {
      return (
        <div className={`hardwareInfo-section`}>
          <div className="portDetails-hw" style={{}}>
            <Checkbox
              checked={assign || false}
              onChange={() => {
                handlecheckbox();
              }}
              label={this.props.title}
            />
          </div>
          <div
            className={`portSlider-hw  isActivehardwareInfo${assign}`}
            style={{ position: "relative" }}
          >
            <Slider
              title="Intensity"
              disabled={!assign}
              value={value || 0}
              min={min}
              max={max}
              onChange={(value, name) => {
                console.log("RANGE CLCIK");

                getRangeVal(this.props.title, port, value);
              }}
              renderIn="hardwarePropertyPanel"
            />
            <p style={{ position: "absolute", left: "27%", bottom: "10%" }}>
              {min}
            </p>
            <p style={{ position: "absolute", right: "12%", bottom: "10%" }}>
              {max}
            </p>
          </div>
        </div>
      );
    }

    if (name == "LeftEye") {
      return (
        <div className="hardwareInfo-section">
          <div className="portDetails-hw" style={{}}>
            <Checkbox
              checked={assign || false}
              onChange={() => {
                handlecheckbox();
              }}
              label={this.props.title}
              // activePort={port}
            />
          </div>
          <div
            className={`portSlider-hw  isActivehardwareInfo${assign}`}
            style={{
              position: "relative",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                title=""
                disabled={!assign}
                value={value || 0}
                min={min}
                max={max}
                onChange={(value, name) => {
                  console.log("RANGE CLCIK");
                  getRangeVal(this.props.title, "R", value);
                }}
                renderIn="hardwarePropertyPanel"
                sliderName="R"
              />
              <p style={{ position: "absolute", left: "27%", bottom: "-17%" }}>
                {min}
              </p>
              <p style={{ position: "absolute", right: "12%", bottom: "-17%" }}>
                {max}
              </p>
            </div>
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                title=""
                disabled={!assign}
                value={value || 0}
                min={min}
                max={max}
                onChange={(value, name) => {
                  console.log("RANGE CLCIK");

                  getRangeVal(this.props.title, "G", value);
                }}
                renderIn="hardwarePropertyPanel"
                sliderName="G"
              />
              <p style={{ position: "absolute", left: "27%", bottom: "-17%" }}>
                {min}
              </p>
              <p style={{ position: "absolute", right: "12%", bottom: "-17%" }}>
                {max}
              </p>
            </div>{" "}
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                title=""
                disabled={!assign}
                value={value || 0}
                min={min}
                max={max}
                onChange={(value, name) => {
                  console.log("RANGE CLCIK");
                  getRangeVal(this.props.title, "B", value);
                }}
                renderIn="hardwarePropertyPanel"
                sliderName="B"
              />
              <p style={{ position: "absolute", left: "27%", bottom: "-17%" }}>
                {min}
              </p>
              <p style={{ position: "absolute", right: "12%", bottom: "-17%" }}>
                {max}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (name == "RightEye") {
      return (
        <div className="hardwareInfo-section">
          <div className="portDetails-hw" style={{}}>
            <Checkbox
              checked={assign || false}
              onChange={() => {
                handlecheckbox();
              }}
              label={this.props.title}
              // activePort={port}
            />
          </div>
          <div
            className={`portSlider-hw  isActivehardwareInfo${assign}`}
            style={{
              position: "relative",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                title=""
                disabled={!assign}
                value={value || 0}
                min={min}
                max={max}
                onChange={(value, name) => {
                  console.log("RANGE CLCIK");
                  getRangeVal(this.props.title, "R", value);
                }}
                renderIn="hardwarePropertyPanel"
                sliderName="R"
              />
              <p style={{ position: "absolute", left: "27%", bottom: "-17%" }}>
                {min}
              </p>
              <p style={{ position: "absolute", right: "12%", bottom: "-17%" }}>
                {max}
              </p>
            </div>
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                title=""
                disabled={!assign}
                value={value || 0}
                min={min}
                max={max}
                onChange={(value, name) => {
                  console.log("RANGE CLCIK");

                  getRangeVal(this.props.title, "G", value);
                }}
                renderIn="hardwarePropertyPanel"
                sliderName="G"
              />
              <p style={{ position: "absolute", left: "27%", bottom: "-17%" }}>
                {min}
              </p>
              <p style={{ position: "absolute", right: "12%", bottom: "-17%" }}>
                {max}
              </p>
            </div>{" "}
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                title=""
                disabled={!assign}
                value={value || 0}
                min={min}
                max={max}
                onChange={(value, name) => {
                  console.log("RANGE CLCIK");
                  getRangeVal(this.props.title, "B", value);
                }}
                renderIn="hardwarePropertyPanel"
                sliderName="B"
              />
              <p style={{ position: "absolute", left: "27%", bottom: "-17%" }}>
                {min}
              </p>
              <p style={{ position: "absolute", right: "12%", bottom: "-17%" }}>
                {max}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (name == "Buzzer") {
      console.log("Buzzer DATA SLIDER>>>", assign);

      console.log("RBGBuzzer LED DATA SLIDER>>>", min, max);

      console.log("BUZZER");

      return (
        <div className="hardwareInfo-section" style={{ height: "180px" }}>
          <div className="portDetails-hw" style={{ height: "100px" }}>
            <Checkbox
              checked={assign || false}
              onChange={() => {
                handlecheckbox();
              }}
              label={this.props.name}
              activePort={port}
            />
          </div>
          <div
            className={`portSlider-hw  isActivehardwareInfo${assign} `}
            style={{
              position: "relative",
              display: "block",
            }}
          >
            <div
              className=""
              style={{
                width: "90%",
                height: "28%",
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: `translate(-50%,-50%)`,
                borderRadius: "10px",
                background: "#fff",
                display: "flex",
              }}
            >
              <button
                className={`activeBuzzer${this.state.isBuzzerFrequency}`}
                style={{
                  width: "50%",
                  height: "100%",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  outline: "inherit",
                }}
                disabled={!assign}
                onClick={this.onhandleBuzzerFrequency}
              >
                <p1 style={{ marginTop: "0.9%" }}>Frequency</p1>
              </button>
              <button
                className={`activeBuzzer${this.state.isBuzzerTone}`}
                style={{
                  width: "50%",
                  height: "100%",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  outline: "inherit",
                }}
                disabled={!assign}
                onClick={this.onhandleBuzzerTone}
              >
                <p1>Tone</p1>
              </button>
            </div>
            {this.state.isBuzzerFrequency ? (
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  top: "70%",
                  left: "50%",
                  transform: `translate(-50%,-50%)`,
                }}
              >
                <Slider
                  title="Intensity"
                  disabled={!assign}
                  value={this.props.valueBuzzerFrequency || 0}
                  min={min}
                  max={max}
                  onChange={(value) => {
                    console.log("RANGE CLCIK");
                    getRangeVal(this.props.title, "Frequency", value);
                  }}
                  renderIn="hardwarePropertyPanel"
                />

                <p style={{ position: "absolute", left: "28%", bottom: "0%" }}>
                  {min}
                </p>
                <p style={{ position: "absolute", right: "12%", bottom: "0%" }}>
                  {max}
                </p>
              </div>
            ) : this.state.isBuzzerTone ? (
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  top: "70%",
                  left: "50%",
                  transform: `translate(-50%,-50%)`,
                }}
              >
                <Slider
                  title="Intensity"
                  disabled={!assign}
                  value={this.props.valueBuzzerTone || 0}
                  min={0}
                  max={5}
                  onChange={(value) => {
                    console.log("RANGE CLCIK");
                    getRangeVal(this.props.title, "Tone", value);
                  }}
                  renderIn="hardwarePropertyPanel"
                />

                <p style={{ position: "absolute", left: "28%", bottom: "0%" }}>
                  {0}
                </p>
                <p style={{ position: "absolute", right: "12%", bottom: "0%" }}>
                  {5}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    if (port == "STPM" || name == "STEPPER MOTOR") {
      if (port == "STPM") {
        return (
          <div>
            {" "}
            <tr className="hide" style={outputStyle}>
              <td
                style={{
                  padding: "1%",
                  textAlign: "start",
                  fontWeight: "bold",
                }}
              >
                <Checkbox
                  checked={assign || false}
                  onChange={() => {
                    this.props.onChangeSTPM();
                  }}
                  label={name}
                />
              </td>
            </tr>
          </div>
        );
      } else if (name == "STEPPER MOTOR") {
        return (
          <div
            style={{
              height: "50px",
              width: "100%",
            }}
          >
            <div
              style={
                {
                  // background: "green",
                }
              }
            >
              <LogicSwitchComp
                ComponentName="STEPPER MOTOR"
                title={port}
                switchActionHandler={this.props.onChange}
                checked={!this.props.isClickSTMP ? false : this.props.assign}
              />
            </div>

            {/* <div
              style={{
                backgroundColor: "red",
                width: "20%",
                display: "inline-block",
              }}
            >
              <h1>adasdassa</h1>
            </div> */}
            {/* <div style={{ width: "100px" }}>
            </div> */}
          </div>
        );
      }
    }

    if (device == "*SNI#") {
      if (port == "B12") {
        defaultport = "B";
      }

      if (port == "C12") {
        defaultport = "C";
      }
      if (port == "G12") {
        defaultport = "PB";
      } else if (port == "F12") {
        defaultport = "PD";
      } else if (port == "AB") {
        defaultport = "A2";
      } else if (port == "AC") {
        defaultport = "PC";
      } else {
        defaultport = port;
      }
    } else {
      var connect = ["F", "G", "B12", "B34", "C12", "C34"];
      for (let i = 0; i < connect.length; i++) {
        if (PortConnections[connect[i]]) {
          if (PortConnections[connect[i]].type == "dual_splitter") {
            if (port == "A2") {
              defaultport = "A1";
            } else if (port == "A1") {
              defaultport = "A2";
            } else if (port == "A3") {
              defaultport = "A4";
            } else if (port == "A4") {
              defaultport = "A3";
            } else if (port == "F2") {
              defaultport = "F1";
            } else if (port == "F1") {
              defaultport = "F2";
            } else if (port == "G1") {
              defaultport = "G2";
            } else if (port == "G2") {
              defaultport = "G1";
            } else if (port == "B1") {
              defaultport = "B2";
            } else if (port == "B3") {
              defaultport = "B4";
            } else {
              defaultport = port;
            }
          } else {
            defaultport = port;
          }
        } else {
          if (port == "MOTOR1") {
            defaultport = "M1";
          } else if (port == "MOTOR2") {
            defaultport = "M2";
          } else {
            defaultport = port;
          }
        }
      }
    }
    //  else{
    //       defaultport = port;
    //       console.log("portportportport 111111",port);

    //       }

    console.log("portportportport", defaultport);

    if (name == "DUAL SPLITTER" || name == "SERVO EXTENDER") {
      outputStyle = {
        verticalAlign: "middle",
        color: "#FFF",
        // borderBottom: '2px solid grey',
        height: "72px",
        display: "none",
      };
    } else {
      outputStyle = {
        verticalAlign: "middle",
        color: "#FFF",
        // borderBottom: '2px solid grey',
        height: "72px",
        width: "100%",
      };
    }
    return (
      <div className="hardwareInfo-section">
        <div className="portDetails-hw" style={{}}>
          <Checkbox
            checked={assign || false}
            onChange={(value) => onChange("assign" + port, value)}
            label={name}
            activePort={defaultport}
          />
          {/* <p style={{ fontFamily: "Halcyon_SemiBold" }}>Port {defaultport} :</p>
          {name} */}
        </div>

        <div
          className={`portSlider-hw  isActivehardwareInfo${assign}`}
          style={{ position: "relative" }}
        >
          <Slider
            disabled={!assign}
            value={value || 0}
            min={min}
            max={max}
            onChange={(value) => onChange("value" + port, value)}
            renderIn="hardwarePropertyPanel"
            title="Intensity"
          />
          <p style={{ position: "absolute", left: "27%", bottom: "10%" }}>
            {min}
          </p>
          <p style={{ position: "absolute", right: "12%", bottom: "10%" }}>
            {max}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    PortConnections: (data) => {
      dispatch({ type: "PORT_Connection", payload: data });
    },
  };
};
SliderRow = connect(mapStateToProps, mapDispatchToProps)(SliderRow);
export default SliderRow;

// export default SliderRow
