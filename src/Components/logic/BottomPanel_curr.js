import React, { Component } from "react";
import Panel1 from "./panels/";
import { Link } from "react-router-dom";

import HexTypes from "./HexTypes";
import Colors from "./Colors";

const Sizes = {
  Button: 30,
  Border: 5,
  OneRow: 68,
};

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={{
          position: "absolute",
          // right: '5%',
          padding: 5,
          bottom: "46%",
          left: "-2.8%",
          backgroundColor: "#00AAD9" /*this.props.color*/,
          // top: -Sizes.Button + 5,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          cursor: "pointer",
          width: "20px",
          height: "50px",
        }}
      >
        <div
          style={{
            backgroundImage: "url(images/bottompanel.png)",
            backgroundSize: "contain",
            height: Sizes.Button - 10,
            width: Sizes.Button + 20,
          }}
        />
      </div>
    );
  }
}

// var BottomPanel = React.createClass({
class BottomPanel extends Component {
  constructor(props) {
    super(props);
    var { value, show, toggle, current, PortConnections, state, onChange } =
      this.props;

    this.state = {
      currenttab: current,
      hexTypes: "hello",
    };
  }

  change = (value) => {
    var { onChange } = this.props;
    onChange("", value);
    this.setState({ currenttab: value });
  };
  componentWillMount = () => {
    var { value, show, toggle, current, PortConnections, state, onChange } =
      this.props;

    this.setState({ currenttab: current });
  };
  // componentDidMount = () => {
  //   var { value, show, toggle, current, PortConnections, state, onChange } = this.props;
  //   this.setState({ currenttab: current })
  // }
  componentDidMount = () => {
    var { value, show, toggle, current, PortConnections, state, onChange } =
      this.props;
    this.setState({ currenttab: current });
  };
  updateAndNotify = (value) => {
    this.setState({ currenttab: value });
  };
  // updateAndNotify1 = (value) => {
  //   console.log("Notify...")
  //   this.setState({ hexTypes: value })
  // }
  componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      this.updateAndNotify(this.props.current);
    }
    // if (prevProps.value !== this.props.value) {
    //   this.updateAndNotify1(this.props.current);
    //   return this.shouldComponentUpdate
    // }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("next:prev" + nextProps.value + ":" + this.props.value, nextState);
  //   if (nextProps.value == this.props.value) {
  //     return true;
  //   } else {
  //     return true;
  //   }

  //   // if (nextProps.changedDueToSlider) return false;
  //   // else return true;
  // }

  render() {
    var { value, show, toggle, current, PortConnections, state, onChange } =
      this.props;
    if (current == "") {
      this.state.currenttab = current;
    }

    var Panel = Panel1(this.state.currenttab ? this.state.currenttab : current);

    var Color;
    if (show === "none") Color = Colors.white;
    else if (
      this.state.currenttab ? this.state.currenttab : current === "editorPanel"
    )
      Color = Colors.blueshade;
    else
      Color =
        HexTypes[this.state.currenttab ? this.state.currenttab : current].color;
    var up, width, left, border;
    // if (show === 'border') { up = 0; height = Sizes.OneRow; }
    if (show === "border") {
      up = 0;
      width = 0;
      left = "98%";
      border = "none";
    } else if (show === "none") {
      up = -(Sizes.Border + Sizes.Button);
      width = 0;
      left = "100%";
      border = "none";
    } else {
      up = 0;
      width = "100%";
      left = "10%";
      border = " 1px solid deepskyblue";
    }
    var startState = null;
    // if ( this.state.currenttab? this.state.currenttab:current === 'output' ||  this.state.currenttab? this.state.currenttab:current === 'if') startState = this.props.startState;
    startState = this.props.startState;
    return (
      <div
        style={{
          position: "absolute",
          // top: '30px',
          bottom: up,
          // left: left,
          width: width,
          transition: width,
          height: "100%",
          backgroundColor: "white",
          backgroundSize: "100% 100%",
          backgroundImage: "url(images/Learn/MaskGroup7.png)",
          color: "#FFF",
          zIndex: 9999,
          border: border,
        }}
      >
        {/* <Button color={Color} onClick={toggle} /> */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#00AAD9",
            height: Sizes.Border + 4,
          }}
        />
        <div
          className="bottomPanel"
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            // padding: Sizes.Border + 2,
            // padding: '2%',
          }}
        >
          <img
            style={{ position: "relative", left: "95%" }}
            onClick={toggle}
            src="images/Learn/Group 2194.png"
          ></img>

          {/* <svg height="70" width="70">
            <polygon fill={Color} points="1,40 12,19 35,19 45,40 35,60 12,60" />

          </svg> */}
          {/* {(current == "output") ? one : two} */}

          <div style={{ visibility: "visible" }}>{this.state.hexTypes}</div>
          <Panel
            componentProps={this.props.componentProps}
            value={value}
            PortConnections={PortConnections}
            state={state}
            hexChange={this.change}
            onChange={onChange}
            hexTypeCheck={this.props.hexTypeCheck}
            current={this.state.currenttab ? this.state.currenttab : current}
            startState={startState}
            bottomPanelDeleteKey={this.props.bottomPanelDeleteKey}
          />
          {/* <div style={{ height: Sizes.Border }} /> */}
        </div>
      </div>
    );
  }
}

export default BottomPanel;
