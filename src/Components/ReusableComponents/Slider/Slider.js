import e from "cors";
import React, { useState, useEffect } from "react";

import { Slider1 } from "../Slider/SliderStyles";
import "./Slider.css";

var initialRendered = true;

const SliderRange = (props) => {
  // const sliderbtn = {
  //   backgroundImage:
  //     "url(" +
  //     process.env.PUBLIC_URL +
  //     `/Bisoft_UI/Play/PNG/sliderbutton.png` +
  //     ")",
  // };

  const sliderStyle = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/Bisoft_UI/Play/SVG/${props.rangImgName}.svg` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",

    // backgroundImage: `linear-gradient(to right, #B9B2D6, rgba(255,0,0,1))`,
  };

  const [isChangeRangeValue, setChangeRangeValue] = useState(0);
  const [isinitialStop, setInitialStop] = useState(false);

  const rangeSlider = (e) => {
    let selectorContainer = document.getElementById("selectorContainer");

    // .style.left = e.target.value + "%";
    selectorContainer.style.left = e.target.value + "%";
    setChangeRangeValue(e.target.value);
    setInitialStop(true);
    props.onChangehandler(e.target.value, props.title);
    // console.log(selectorContainer.style.left);
    console.log(e.target.value);
    console.log(props, "HAHAHAHAHAHAHHA");
    if (props.componentName === "L_green") props.setL_Green(e.target.value);
    if (props.componentName === "L_blue") props.setL_Blue(e.target.value);
    if (props.componentName === "L_red") props.setL_Red(e.target.value);

    if (props.componentName === "R_green") props.setR_Green(e.target.value);
    if (props.componentName === "R_blue") props.setR_Blue(e.target.value);
    if (props.componentName === "R_red") props.setR_Red(e.target.value);

    if (props.componentName === "freq") props.setFreq(e.target.value);

    // if (props.class === "intensity") props.setIntensity(e.target.value);
    // if (props.class === "freq") props.setFreq(e.target.value);
  };

  useEffect(() => {
    console.log("value", initialRendered);
    if (initialRendered) {
      initialRendered = false;
    } else {
      if (isinitialStop) {
        console.log("<<<<<<<<<<<<<<<<DARA");
        props.leftEyeData();
      }
    }
  }, [isChangeRangeValue]);
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
        {/* {props.title} */}
      </p>

      <div className="SliderRangeMain">
        <input
          type="range"
          min="0"
          // max={props.max}
          max={100}
          value={isChangeRangeValue}
          id="sliderRange"
          style={sliderStyle}
          onChange={rangeSlider}
          // onClick={() => props.leftEyeData()}
        />
        <div id="selectorContainer">
          <div className="selectorButtonImg"></div>
        </div>
      </div>
    </div>
  );
};

export default SliderRange;
