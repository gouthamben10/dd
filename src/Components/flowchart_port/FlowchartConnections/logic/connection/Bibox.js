/**
 * This module exports a draggable Bibox which is drawn in Workspace
 * @module components/assembly/Bibox
 */

import React, { Component } from "react";

import { DragSource } from "react-dnd";

import ItemTypes from "./ItemTypes";
import ImageSizes from "./ImageSizes";

import DraggingInfo from "./DraggingInfo";

import {
  devicePc,
  PlayComputerImg,
  PcinternalMicActive,
  PcinternalMicInActive,
  PcinternalTouchpadsInActive,
  PcinternalTouchpadsActive,
  PcinternalEYEInActive,
  PcinternalEYEActive,
  PcinternalTeethActive,
  PcinternalTeethInActive,
  Pcinternal4in1Active,
  Pcinternal4in1InActive,
} from "../../source/index";

var biboxImg;
var style = {
  position: "relative",
  cursor: "move",
  // backgroundImage: "url(images/Learn/tern.png)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  maxWidth: "100%",
  height: "100%",
  width: "100%",
  zIndex: "1",

  // border: "1px solid blue",
};

const biboxSource = {
  beginDrag(props) {
    DraggingInfo.isDragging = true;
    const { left, top } = props;
    return { left, top };
  },
  endDrag() {
    DraggingInfo.isDragging = false;
  },
};

// var Bibox = React.createClass({

class Bibox extends Component {
  componentDidMount() {}

  render() {
    let Url;
    let Device = sessionStorage.getItem("connectedDevice");
    if (Device == "Ace") {
      // Url = "images/login/pc_1.png";

      Url = PlayComputerImg;
    } else if (Device == "Humanoid") {
      Url = "images/login/humanoid_img.png";
    } else {
      Url = "images/login/login_illus_tern@2x.png";
    }
    var { left, top, scale, connectDragSource, isDragging, workspaceConnect } =
      this.props;
    if (isDragging) {
      return null;
    }
    // left = left + 200;
    if (sessionStorage.getItem("connectedDevice") == "Tern") {
      var height = ImageSizes[ItemTypes.BIBOX][1] * scale + 15;
      var width = ImageSizes[ItemTypes.BIBOX][0] * scale - 17;
    } else if (sessionStorage.getItem("connectedDevice") == "Humanoid") {
      var height = ImageSizes[ItemTypes.BIBOX][1] * scale;
      var width = ImageSizes[ItemTypes.BIBOX][0] * scale;
    } else {
      var height = ImageSizes[ItemTypes.BIBOX][1] * scale;
      var width = ImageSizes[ItemTypes.BIBOX][0] * scale;
    }

    // ISACTIVE_DATA
    let isCheckedMic = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isMic"];
    let isCheckedEyeLeft = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isEyeLeft"];
    let isCheckedEyeRight = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isEyeRight"];
    let isCheckedSimeleFour = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isSimeleFour"];
    let isCheckedSimeleOne = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isSimeleOne"];
    let isCheckedSimeleThree = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isSimeleThree"];
    let isCheckedSimeleTwo = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isSimeleTwo"];
    let isCheckedTouchOne = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchOne"];
    let isCheckedTouchTwo = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchTwo"];
    let isCheckedTouchZero = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isTouchZero"];
    let isCheckedbuzzer = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories["isbuzzer"];
    let isCheckedColorSensor = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.Four_in_one_sensor["isColorSensor"];
    let isCheckedDistanceSensors = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.Four_in_one_sensor["isDistanceSensors"];
    let isCheckedGestureSensor = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.Four_in_one_sensor["isGestureSensor"];
    let isCheckedLightSensor = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.Four_in_one_sensor["isLightSensor"];

    let TouchPads = {
      isCheckedTouchZero,
      isCheckedTouchOne,
      isCheckedTouchTwo,
    };

    console.log("kkkkkkkkkkDATA:_____>>", TouchPads);
    if (Device == "Ace") {
      return connectDragSource(
        // PLEASE NOTE THIS IS ONLY FOR ACE/PLAYCOMPUTER
        <div
          style={{
            ...style,
            left,
            top,
            height,
            width,
            backgroundImage: `url("${Url}")`,
            overflow: "visible",
            // background: "red",
          }}
        >
          {isCheckedMic ? (
            <img
              src={PcinternalMicActive}
              style={{
                height: "35%",
                width: "15%",
                marginTop: "-100px",
                marginLeft: "42%",
              }}
            />
          ) : (
            <img
              src={PcinternalMicInActive}
              style={{
                height: "35%",
                width: "15%",
                marginTop: "-100px",
                marginLeft: "42%",
              }}
            />
          )}

          {/*LEFT EYE  */}
          {isCheckedEyeLeft ? (
            <img
              src={PcinternalEYEActive}
              style={{
                height: "8%",
                width: "10%",
                position: "absolute",
                top: "31%",
                left: "34%",
                transform: `translate(-34%,-31%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalEYEInActive}
              style={{
                height: "8%",
                width: "10%",
                position: "absolute",
                top: "31%",
                left: "34%",
                transform: `translate(-34%,-31%)`,
              }}
            />
          )}

          {/*RIGHT EYE  */}
          {isCheckedEyeRight ? (
            <img
              src={PcinternalEYEActive}
              style={{
                height: "8%",
                width: "10%",
                position: "absolute",
                top: "31%",
                left: "67.5%",
                transform: `translate(-67.5%,-31%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalEYEInActive}
              style={{
                height: "8%",
                width: "10%",
                position: "absolute",
                top: "31%",
                left: "67.5%",
                transform: `translate(-67.5%,-31%)`,
              }}
            />
          )}

          {/* 1-teeth Active*/}
          {isCheckedSimeleOne ? (
            <img
              src={PcinternalTeethActive}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "60%",
                left: "40.4%",
                transform: `translate(-40.4%,-60%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalTeethInActive}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "60%",
                left: "40.4%",
                transform: `translate(-40.4%,-60%)`,
              }}
            />
          )}
          {/* 2-teeth Active*/}
          {isCheckedSimeleTwo ? (
            <img
              src={PcinternalTeethActive}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "61%",
                left: "43.5%",
                transform: `translate(-43.5%,-61%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalTeethInActive}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "61%",
                left: "43.5%",
                transform: `translate(-43.5%,-61%)`,
              }}
            />
          )}

          {/* 4-in-1 Sensor  */}
          {isCheckedColorSensor ||
          isCheckedDistanceSensors ||
          isCheckedGestureSensor ||
          isCheckedLightSensor ? (
            <img
              src={Pcinternal4in1Active}
              style={{
                height: "5%",
                width: "8%",
                position: "absolute",
                left: "48.5%",
                top: "61%",
                transform: `translate(-30%,-61%)`,
              }}
            />
          ) : (
            <img
              src={Pcinternal4in1InActive}
              style={{
                height: "5%",
                width: "8%",
                position: "absolute",
                left: "48.5%",
                top: "61%",
                transform: `translate(-30%,-61%)`,
              }}
            />
          )}

          {/* 3-teeth Active*/}
          {isCheckedSimeleThree ? (
            <img
              src={PcinternalTeethActive}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "61%",
                left: "57%",
                transform: `translate(-57%,-61%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalTeethInActive}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "61%",
                left: "57%",
                transform: `translate(-57%,-61%)`,
              }}
            />
          )}

          {/* 4-teeth Active*/}
          {isCheckedSimeleFour ? (
            <img
              src={PcinternalTeethActive}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "60%",
                left: "60.3%",
                transform: `translate(-60.3%,-60%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalTeethInActive}
              style={{
                height: "6%",
                width: "2.7%",
                position: "absolute",
                top: "60%",
                left: "60.3%",
                transform: `translate(-60.3%,-60%)`,
              }}
            />
          )}

          {/*  0 Touch Pad*/}
          {isCheckedTouchZero ? (
            <img
              src={PcinternalTouchpadsActive}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "14%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalTouchpadsInActive}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "14%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          )}

          {/*  1 Touch Pad*/}
          {isCheckedTouchOne ? (
            <img
              src={PcinternalTouchpadsActive}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "30%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalTouchpadsInActive}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "30%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          )}

          {/*  2 Touch Pad*/}
          {isCheckedTouchTwo ? (
            <img
              src={PcinternalTouchpadsActive}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "48.5%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          ) : (
            <img
              src={PcinternalTouchpadsInActive}
              style={{
                height: "14%",
                width: "8%",
                position: "absolute",
                left: "48.5%",
                bottom: "4.5%",
                transform: `translate(-30%,0%)`,
              }}
            />
          )}

          <p
            style={{
              fontSize: "18px",
              height: "5%",
              width: "20%",
              // position: "fixed",
              marginTop: "37%",
              marginLeft: "-17%",
              color: "#707070",
            }}
          >
            {isCheckedTouchZero ? this.props.rangeA1 : null}
            {/* {this.props.responceTp0} */}
          </p>

          <p
            style={{
              fontSize: "18px",
              // backgroundColor: "blue",
              height: "5%",
              width: "20%",
              position: "fixed",
              marginTop: "3%",
              marginLeft: " -3%",
              color: "#707070",
            }}
          >
            {isCheckedTouchOne ? this.props.temp : null}
          </p>
          <p
            style={{
              fontSize: "18px",
              height: "5%",
              width: "20%",
              position: "fixed",
              marginTop: "-1%",
              marginLeft: "19%",
              color: "#707070",
            }}
          >
            {/* {this.props.responceTp2} */}
            {isCheckedTouchTwo ? this.props.one : null}
          </p>
          <p
            style={{
              fontSize: "18px",
              // height: "5%",
              // width: "5%",
              position: "absolute",
              top: "85%",
              marginTop: "-102.5%",
              marginLeft: "68%",
              color: "#707070",
            }}
          >
            {this.props.mic}
          </p>
        </div>

        // OLD RENDER IMG
        // <img
        //   className="user-select"
        //   src={Url}
        //   id="biboxClass"
        //   style={{
        //     ...style,
        //     left,
        //     top,
        //     height,
        //     width,
        //     border: "1px solid red",
        //   }}
        // />
        // </div>
      );
    } else {
      return connectDragSource(
        <img
          className="user-select"
          src={Url}
          id="biboxClass"
          style={{
            ...style,
            left,
            top,
            height,
            width,
            // border: "1px solid red",
          }}
        />
      );
    }
  }
}
// });

export default DragSource(ItemTypes.BIBOX, biboxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Bibox);
