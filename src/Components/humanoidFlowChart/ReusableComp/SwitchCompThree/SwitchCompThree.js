import React from "react";
import "./SwitchCompThree.css";
function SwitchCompThree(props) {
  return (
    <div
      style={{ color: "#311B92", fontWeight: "bold" }}
      className="SwitchContainer"
    >
      <p className="txtSwitch">{props.title}</p>

      <label class="switchThree">
        <input
          type="checkbox"
          id="togBtnThree"
          value={props.title}
          onChange={props.switchActionHandler}
          checked={props.checked}
        />
        <div class="sliderThree roundThree"></div>
      </label>
    </div>
  );
}

export default SwitchCompThree;
