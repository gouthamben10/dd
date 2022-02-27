import React from "react";
import "./RadioBtn.css";

import { HumanoidActiveBtn } from "../../logic/HumanoidActionData";
function RadioBtn(props) {
  // console.log(sessionStorage.getItem("HumanoidActiveBtn"));
  // console.log(HumanoidActiveBtn, "HumanoidActiveBtn 5");
  var str = props.isClickRadio;
  console.log(props.isClickRadio, "props.isClickRadio");
  // if (sessionStorage.getItem("HumanoidActiveBtn") != null) {
  //   str = sessionStorage.getItem("HumanoidActiveBtn");
  // }
  // console.log(str);

  // console.log(typeof str);

  let data = str.split("#");
  console.log(data);
  let activeActionName = data[0].replace(/_/g, " ");

  console.log(props.isClickRadio, "RadioBtn");

  let isactive = data[1] === "true";

  console.log(activeActionName, isactive, "WORKING 66");

  console.log(activeActionName, props.val, "WORKING 55");

  if (activeActionName == props.val) {
    return (
      <div className="RadioContainer">
        <input
          className="radioBtnBox"
          type="radio"
          id={props.val}
          name="humanoidActionName"
          value={props.val}
          onChange={props.handleRadioBtn}
          checked={isactive}
        />
        <p className="radioBtnBoxTxt">{props.val}</p>
      </div>
    );
  }

  return (
    <div className="RadioContainer">
      <input
        className="radioBtnBox"
        type="radio"
        id={props.val}
        name="humanoidActionName"
        value={props.val}
        onChange={props.handleRadioBtn}
      />
      <p className="radioBtnBoxTxt">{props.val}</p>
    </div>
  );
}

export default RadioBtn;
