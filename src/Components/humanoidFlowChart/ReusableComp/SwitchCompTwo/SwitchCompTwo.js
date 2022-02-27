import React from "react";
import "./SwitchCompTwo.css";
function SwitchCompTwo(props) {
  return (
    <div
      style={{ color: "#311B92", fontWeight: "bold" }}
      className="SwitchContainer"
    >
      <p className="txtSwitch">{props.title}</p>

      <label class="switchTwo">
        <input
          type="checkbox"
          id="togBtnTwo"
          value={props.title}
          onChange={props.switchActionHandler}
          checked={props.checked}
        />
        <div class="sliderTwo roundTwo"></div>
      </label>
    </div>
  );
}

export default SwitchCompTwo;
