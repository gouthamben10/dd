import React, { Component } from "react";
import InputNumber from "../helpers/InputNumber";

class LoopPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: 0,
    };
  }
  onChange = (value) => {
    if (value < 1) value = 1;
    else if (value > 255) value = 255;
    this.setState({ times: value });
    // this.props.onChange({ times: value });
  };
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          color: "black",
          width: "80%",
          height: "100%",
          marginTop: "-5%",
          position: "relative",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
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
