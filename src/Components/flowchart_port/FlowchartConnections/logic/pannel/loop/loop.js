import React, { Component } from "react";
import InputNumber from "../helpers/InputNumber";
import "./loop.css";
let count = [];
for (let i = 0; i < 1000; i++) count[i] = 0;
class LoopPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: count[this.props.check],
    };
  }
  componentWillUnmount() {
    count[this.props.check] = this.state.times;
  }
  onChange = (value) => {
    if (value < 1) value = 1;
    else if (value > 255) value = 255;
    this.setState({ times: value });
    // this.props.onChange({ times: value });
  };
  render() {
    return (
      <div className="outertabDiv-loop">
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            paddingTop: "0.5em",
            height: "72px",
            color: "black",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          Loop for{" "}
          <InputNumber
            value={this.state.times || 1}
            min={1}
            max={255}
            onChange={this.onChange}
          />{" "}
          times
        </div>
      </div>
    );
  }
}

export default LoopPanel;
