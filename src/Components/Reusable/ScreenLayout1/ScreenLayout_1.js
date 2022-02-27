import React from "react";
import "./ScreenLayout_1.css";
import { useHistory } from "react-router-dom";

function ScreenLayout_1(props) {
  const ScreenLayoutcontainerStyle = {
    backgroundImage:
      "url(" + process.env.PUBLIC_URL + `/Assets/Mask_Group_22.png` + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    width: "100vw",
    height: "100vh",
  };

  const ScreenLayoutDiscriptionDetailsStyle = {
    backgroundImage:
      "url(" + process.env.PUBLIC_URL + `/Assets/Rectangle_1706.png` + ")",
    backgroundRepeat: " no-repeat",
    backgroundSize: "100% 100%",
    width: "65%",
    height: "70%",
  };

  let history = useHistory();

  console.log("COMPONENTS: ", props.titleComponent);

  const goBackUrl = () => {
    if (history.location.pathname === "/introduction") {
      history.push('/SelectMode')
    }else{
      history.push('/selection')
    }
  };
  return (
    <div className="ScreenLayoutcontainer" style={ScreenLayoutcontainerStyle}>
      <div className="ScreenLayout-Item-BackButton">
        <img
          src={process.env.PUBLIC_URL + `/Assets/Back_Button.png`}
          height="80%"
          width="auto"
          onClick={goBackUrl}
        />
        <h1 style={{fontSize: '30px', position: 'relative', top: '27px'}}>{props.pageTitle}</h1>
      </div>

      <div className="ScreenLayout-Item-Content">{props.children}</div>

      <div className="ScreenLayout-Item-discriptions">
        <div
          className="ScreenLayout-DiscriptionDetails"
          style={ScreenLayoutDiscriptionDetailsStyle}
        >
          {props.details}
        </div>
      </div>
    </div>
  );
}

export default ScreenLayout_1;
