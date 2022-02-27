import React, { useState } from "react";
// import sessionStorage from "../../LocalStorage/LocalStorage";
import { Inputs } from "./Slider.styles";
import "./SliderRange.css";

// SOUMITYA

function SliderRange(props) {
  const [isChangeRangeValue, setChangeRangeValue] = useState(0);

  const rangeSlider = (e) => {
    let selectorContainer = document.getElementById("selectorContainer");
    // .style.left = e.target.value + "%";
    selectorContainer.style.left = e.target.value + "%";
    setChangeRangeValue(e.target.value);
    if (props.class === "green") props.setGreen(e.target.value);
    if (props.class === "blue") props.setBlue(e.target.value);
    if (props.class === "red") props.setRed(e.target.value);
    if (props.class === "intensity") props.setIntensity(e.target.value);
    if (props.class === "freq") props.setFreq(e.target.value);
    // props.leftEyeData();
  };

  return (
    <div className="SliderRangeContainer">
      <p
        style={{
          color: "#4527A0",
          fontSize: "1.5vw",
          marginLeft: "-15px",
          justifySelf: "end",
        }}
      >
        {" "}
        {props.title}
      </p>

      <div className="SliderRangeMain">
        <Inputs
          type="range"
          min="0"
          image={`imagesplay/PlayComputerAssets/${props.rangImgName}.png`}
          max={props.max}
          value={isChangeRangeValue}
          id="sliderRange"
          // style={sliderStyle}
          onChange={rangeSlider}
          disabled={props.disabled}
          onClick={() => props.leftEyeData()}
        />
        <div id="selectorContainer">
          <div className="selectorButtonImg"></div>
        </div>
      </div>
    </div>
  );
}

export default SliderRange;
