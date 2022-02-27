import React, { Component } from "react";
import { Link } from "react-router-dom";
import Output from "./output/index_o";
import WaitPanel from "./wait";
import VariableOutput from "./output/index";

// var BottomPanel = React.createClass({
class Actions extends Component {
  constructor(props) {
    super(props);
    var { value, show, toggle, current, PortConnections, state, onChange } =
      this.props;

    this.state = {
      currenttab: "hardware",
    };
  }
  shouldComponentUpdate() {
    return true;
  }
  // componentDidMount = () => {

  //     console.log("Called...")
  //     var { value, show, toggle, current, PortConnections, state, onChange } = this.props;
  //     this.setState({ currenttab: current })

  // }
  change = (value) => {
    // this.setState({ currenttab: value })

    this.props.hexChange(value);
  };

  render() {
    var {
      value,
      PortConnections,
      state,
      onChange,
      hexChange,
      hexTypeCheck,
      current,
      startState,
      bottomPanelDeleteKey,
    } = this.props;

    // var stored2 = JSON.parse(sessionStorage.getItem("assemblyCheckbox"));

    // var PortConnections2 = Object.assign({}, PortConnections, stored2);
    // console.log(PortConnections2, "PortConnections2PortConnections2");

    if (current == "action") {
      current = "hardware";
    }

    return (
      <div>
        {/* <div className="tabDiv">
                    <Link className="tabButton" onClick={() => hexChange("hardware")}><div > Hardware  </div></Link>
                    <Link className="tabButton" onClick={() => hexChange("wait")}><div >Wait</div></Link>
                    <Link className="tabButton" onClick={() => hexChange("variable_output")}><div >Variable</div></Link>
                </div> */}

        {current == "hardware" ? (
          <Output
            value={value}
            PortConnections={PortConnections}
            state={state}
            onChange={onChange}
            hexTypeCheck={hexTypeCheck}
            current={current}
            startState={startState}
            bottomPanelDeleteKey={bottomPanelDeleteKey}
            hexChange={hexChange}
          />
        ) : current == "wait" ? (
          <WaitPanel
            value={value}
            PortConnections={PortConnections}
            state={state}
            onChange={onChange}
            hexTypeCheck={hexTypeCheck}
            current={current}
            startState={startState}
            bottomPanelDeleteKey={bottomPanelDeleteKey}
            hexChange={hexChange}
          />
        ) : (
          <VariableOutput
            value={value}
            PortConnections={PortConnections}
            state={state}
            onChange={onChange}
            hexTypeCheck={hexTypeCheck}
            current={current}
            startState={startState}
            bottomPanelDeleteKey={bottomPanelDeleteKey}
            hexChange={hexChange}
          />
        )}
      </div>
    );
  }
}

export default Actions;
