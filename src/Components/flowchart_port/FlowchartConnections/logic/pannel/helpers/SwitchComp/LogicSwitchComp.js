import React, { useEffect } from "react";
import "./LogicSwitchComp.css";
function LogicSwitchComp(props) {
  return (
    <div
      style={{ color: "#311B92", fontWeight: "bold" }}
      className="Logic-SwitchContainer"
    >
      <p className="Logic-txtSwitch">{props.title}</p>

      {/* {(this.props.ComponentName = "STEPPER MOTOR")} */}

      <label class="Logic-switch">
        <input
          type="checkbox"
          id="togBtn"
          value={props.title}
          onChange={props.switchActionHandler}
          checked={props.checked}
        />
        <div class="Logic-slider Logic-round"></div>
      </label>
    </div>
  );
}

export default LogicSwitchComp;
