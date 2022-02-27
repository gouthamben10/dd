import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import ConformationPopupStyle from "./ConformationPopup.module.css";
import {
  backBtn,
  popup,
  close,
  reconnect,
  popup_Svg,
} from "../../source/index";
import renderImage from "../../source/importImg";

const PopupCD = {
  width: "90%",
  height: "90%",

  backgroundImage: `url(${
    process.env.PUBLIC_URL + "/Bisoft_UI/Play/SVG/popup.svg"
  })`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "110% 109%",
  backgroundPosition: "50% 50%",
  zIndex: 110,
  top: "5%",
  left: "5%",

  position: "relative",
};

function ConformationPopup() {
  let history = useHistory();

  const gobackUrl = () => {
    history.goBack();
  };
  return (
    <div className={ConformationPopupStyle.Main_Div}>
      <div className={ConformationPopupStyle.Div_Panel}>
        <div>
          <img
            className={ConformationPopupStyle.Back_Button}
            src={renderImage("backBtn")}
            onClick={gobackUrl}
          ></img>
          <p className={ConformationPopupStyle.Play_Com}>Play Computer</p>
        </div>
        <div className={ConformationPopupStyle.kak}>
          {/* <img
            className={ConformationPopupStyle.Popup_Card}
            src={popup_Svg}
          ></img> */}
          <div style={PopupCD} className={ConformationPopupStyle.ll}>
            <h2 className={ConformationPopupStyle.Popup_Alert}>
              Do you want to continue without your device being connected?
            </h2>
            <img
              className={ConformationPopupStyle.Close_Button}
              src={renderImage("clos")}
              onClick={gobackUrl}
            ></img>
            <img
              className={ConformationPopupStyle.Reconnect_Button}
              src={renderImage("reconnect")}
            ></img>
            <Link to="/Selection">
              <h4 className={ConformationPopupStyle.Reconnect_txt}>Yes</h4>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ConformationPopup;

/////*****************OLD*******************//////////////
//   <img
//   className={ConformationPopupStyle.Back_Button}
//   src={backBtn}
//   onClick={gobackUrl}
// ></img>
// <p className={ConformationPopupStyle.Play_Com}>Play Computer</p>
// <img
//   className={ConformationPopupStyle.Popup_Card}
//   src={popup_Svg}
// ></img>
// <h2 className={ConformationPopupStyle.Popup_Alert}>
//   Do you want to continue without your device being connected?
// </h2>

// <img
//   className={ConformationPopupStyle.Close_Button}
//   src={close}
//   onClick={gobackUrl}
// ></img>
// <img
//   className={ConformationPopupStyle.Reconnect_Button}
//   src={reconnect}
// ></img>
// <Link to="/Selection">
//   <h4 className={ConformationPopupStyle.Reconnect_txt}>Yes</h4>
// </Link>
