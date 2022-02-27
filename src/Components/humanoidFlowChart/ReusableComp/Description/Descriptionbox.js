import React from "react";
import "./Descriptionbox.css";
import descBox from "../../../../Assets/description_box.png";

function Descriptionbox(props) {
  return (
    <div>
      <img src={descBox} className="DesImg" />
      <div
        className="DesboxText"
        style={{ fontSize: "18px", fontWeight: "500" }}
      >
        {" "}
        {props.details}
      </div>
    </div>
  );
}

export default Descriptionbox;
