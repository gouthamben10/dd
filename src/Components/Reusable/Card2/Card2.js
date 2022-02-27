import React from "react";
import "./Card2.css";

function Card2(props) {
  const Card2ContainerStyle = {
    height: "100%",
    width: "100%",
    /* background: red, */
    cursor: "pointer",
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      `/Assets/BUTTON_WITHOUT_SHADOW.png` +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  };
  return (
    <div className="Card2-container" style={Card2ContainerStyle}>
      <div className="Card2_Title">
        <p>{props.cardTitle}</p>
      </div>

      <div style={{ alignSelf: "flex-end", textAlign: "center" }}>
        <img
          src={process.env.PUBLIC_URL + `/Assets/${props.cardImag}.png`}
          height="80%"
          width="50%"
        />
      </div>
    </div>
  );
}

export default Card2;
