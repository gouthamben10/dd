import React, { Component } from "react";
import Panel1 from "./panels/";
import { Link } from "react-router-dom";

import Modal from "react-modal";
import { propertypanel, closeBtnShadow } from "../../source/index";

import HexTypes from "./HexTypes";
import Colors from "./Colors";
import renderPrgImage from "../../source/programImg";

const Sizes = {
  Button: 30,
  Border: 5,
  OneRow: 68,
};
const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "25%",
    width: " 30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "5px solid #FF8C19",
    borderRadius: "15px",
    zIndex: "10000",
  },
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
      erasedProgram: false,
      switchTab: "",
    };
  }

  change = (value) => {
    // var { onChange } = this.props;
    // onChange("", value)
    // this.setState({ currenttab: value })
    this.setState({ switchTab: value });
    this.setState({ erasedProgram: true });
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

  shouldErase = (info) => {
    if (info == "Yes") {
      var { onChange } = this.props;
      onChange("", this.state.switchTab);
      this.setState({ currenttab: this.state.switchTab, erasedProgram: false });
    } else {
      this.setState({ erasedProgram: false });
    }
  };

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

    var dataErased = (
      <Modal
        isOpen={this.state.erasedProgram}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <div className="erasedConceptMsg">
          <p style={{ marginTop: "-10px" }}>
            All changes here will be lost, Continue ?
          </p>
          <br />
          <br />
          <button onClick={() => this.shouldErase("Yes")}>Yes</button>
          <button
            onClick={() => this.shouldErase("No")}
            style={{ position: "relative", left: "10px" }}
          >
            No
          </button>
          
        </div> */}
        <div className="erasedConceptMsg">
          <p> All changes here will be lost, Continue ?</p>
          <button className="BtnPopup" onClick={() => this.shouldErase("Yes")}>
            Yes
          </button>
          <button
            className="BtnPopup"
            onClick={() => this.shouldErase("No")}
            style={{ position: "relative", left: "10px" }}
          >
            No
          </button>
        </div>
      </Modal>
    );

    return (
      <div
        style={{
          position: "absolute",
          top: "-10%",
          bottom: up,
          width: width,
          transition: width,
          height: "100%",
          backgroundColor: "rgba(245,245,245,0.7)",
          color: "#FFF",
          zIndex: 9999,
          // border: border,
        }}
      >
        <div
          style={{
            height: "85%",
            width: "65%",
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundImage: `url("${renderPrgImage("propertypanel")}")`,
            backgroundSize: "100% 90%",
            backgroundRepeat: "no-repeat",
            zIndex: 19999,

            overflow: "hidden",
          }}
        >
          {/* <Button color={Color} onClick={toggle} /> */}
          <div
            style={{
              width: "100%",
              // backgroundColor: "#00AAD9",
              height: Sizes.Border + 4,

              overflow: "hidden",
            }}
          />
          <div
            className="bottomPanel"
            style={{
              height: "79%",
              width: "100%",
              // overflow: "hidden",
              // border: "5px solid red",

              // overflowY: "scroll",
              // overflowX: "hidden",
              // padding: Sizes.Border + 2,
              // padding: '2%',
            }}
          >
            <img
              style={{
                position: "relative",
                height: "60px",
                width: "60px",
                left: "87%",
                top: "6.5%",
              }}
              onClick={toggle}
              src={renderPrgImage("closeBtnShadow")}
              alt="close"
            />

            {/* <svg height="70" width="70">
            <polygon fill={Color} points="1,40 12,19 35,19 45,40 35,60 12,60" />

          </svg> */}
            {/* {(current == "output") ? one : two} */}
            {/* 
          <div style={{ visibility: "visible" }}>{this.state.hexTypes}</div> */}
            {dataErased}
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
      </div>
    );
  }
}

export default BottomPanel;
