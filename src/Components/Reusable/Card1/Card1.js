import React from "react";
import {Card1a} from './Card.styles';
import "./Card1.css";
function Card1(props) {
  // const Card1_container = {
  //   height: "100%",
  //   width: "100%",
  //   backgroundImage:
  //     "url(" + process.env.PUBLIC_URL + `/Assets/Group_3133.png` + ")",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "100% 100%",
  // };

  return (
    <Card1a title={props.title} disabled="disabled">
      <div className="Card1_Title">
        <p style={{textAlign: 'center', padding: '35px 0'}}>{props.title}</p>
      </div>

      <div style={{ alignSelf: "flex-end", textAlign: "center" }}>
        <img
          src={
            props.imageName === "playMode"
              ? process.env.PUBLIC_URL + `/playImages/orace.png`
              : process.env.PUBLIC_URL + `/Assets/robot_mode.png`
          }
          height="80%"
          width="50%"
          alt="img"
        />
        {/* COMING SOON */}
        <div className="Card1_Title">
          <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>
            {props.title2}
          </p>
        </div>
      </div>
    </Card1a>
  );
}

export default Card1;
