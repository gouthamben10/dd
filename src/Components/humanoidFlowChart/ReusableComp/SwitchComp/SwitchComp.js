import React, { useEffect } from "react";
import "./SwitchComp.css";
function SwitchComp(props) {
  // useEffect(() => {
  //   console.log("useEffect is running ");
  //   if (props.title == "B1" || props.title == "B2" || props.title == "C2") {
  //     document.getElementById("togBtn").style.cursor = "not-allowed";
  //     console.log("working SwitchComp");
  //   }
  // }, []);

  return (
    <div
      style={{ color: "#311B92", fontWeight: "bold" }}
      className="SwitchContainer"
    >
      <p className="txtSwitch">{props.title}</p>

      <label class="switch">
        <input
          type="checkbox"
          id="togBtn"
          value={props.title}
          onChange={props.switchActionHandler}
          checked={props.checked}
        />
        <div class="slider round"></div>
      </label>
    </div>
  );
}

export default SwitchComp;
