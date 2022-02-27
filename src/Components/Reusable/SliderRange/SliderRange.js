import React, { useState } from "react";

import "./SliderRange.css";

function SliderRange(props) {
  const sliderStyle = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/Assets/${props.rangImgName}.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",

    // backgroundImage: `linear-gradient(to right, #B9B2D6, rgba(255,0,0,1))`,
  };

  const [isChangeRangeValue, setChangeRangeValue] = useState(0);

  const rangeSlider = (e) => {
    let selectorContainer = document.getElementById("selectorContainer");

    // .style.left = e.target.value + "%";
    selectorContainer.style.left = e.target.value + "%";
    setChangeRangeValue(e.target.value);

    console.log(selectorContainer.style.left);
    console.log(e.target.value);
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
        <input
          type="range"
          min="0"
          max="100"
          value={isChangeRangeValue}
          id="sliderRange"
          style={sliderStyle}
          onChange={rangeSlider}
        />
        <div id="selectorContainer">
          <div className="selectorButtonImg"></div>
        </div>
      </div>
    </div>
  );
}

export default SliderRange;
