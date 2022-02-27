import React from "react";

function Digitalbutton(props) {
  const a1CheckedState = () => {
    if (!props.a1Digi) {
      document.getElementById(props.txt).style.cssText = "  color: #fcfcfc;";
      document.getElementById("s" + props.txt).style.cssText =
        "color: #717171;";
    } else {
      document.getElementById(props.txt).style.cssText = "color: #717171; ";
      document.getElementById("s" + props.txt).style.cssText =
        "  color: #fcfcfc;";
    }
  };
  return (
    <div>
      <label className={"input upper-label-input"}>
        <span className="textsp">{props.txt}</span>
        <div
          class={"switch-button-" + (props.A1DIGI || false)}
          id={"s" + props.txt}
        >
          <input
            active={props.a1Digi}
            disabled={!props.A1DIGI || false}
            class="switch-button-checkbox"
            type="checkbox"
            onchange={a1CheckedState}
          ></input>
          <label class="switch-button-label" for="">
            <span class="switch-button-label-span" id={props.txt}>
              Digital
            </span>
          </label>
        </div>
      </label>
    </div>
  );
}

export default Digitalbutton;
