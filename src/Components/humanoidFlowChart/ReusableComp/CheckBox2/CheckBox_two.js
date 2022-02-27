import React from "react";
import "./CheckBox_two.css";

function CheckBox_two(props) {
  console.log(props);
  return (
    <div>
      <label className="checkbox_container">
        <p className="checkboxTitle"></p>
        <input
          id={props.title}
          type="checkbox"
          onChange={props.Checkhandler}
          value={props.title}
          checked={props.checked}
        />
        <span className="check_Mark"></span>
      </label>
    </div>
  );
}
export default CheckBox_two;
