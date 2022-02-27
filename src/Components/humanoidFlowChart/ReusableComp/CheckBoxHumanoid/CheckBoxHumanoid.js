import React from "react";
import "./CheckBoxHumanoid.css";

function CheckBoxHumanoid(props) {
  const str = props.title;

  const words = str.split("is");

  return (
    <div>
      <label className="checkboxContainer">
        <input
          type="checkbox"
          value={props.title}
          onChange={props.onCheckBoxSelect}
          checked={props.isChecked}
        />
        <span
          className="checkmark"
          style={{ height: `${props.height}`, width: `${props.height}` }}
        >
          <p className="CheckBoxtext">{words[1] != "head" ? words[1] : null}</p>
        </span>
      </label>
    </div>
  );
}

export default CheckBoxHumanoid;
