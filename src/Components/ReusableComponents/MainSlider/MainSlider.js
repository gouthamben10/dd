import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MainStyle from "./MainSlider.module.css";
import { AddInfo, PlyComp } from "../../../source/index";
import renderImage from "../../../source/importImg";

export class MainSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <div className={MainStyle.container}></div>
        <Slider {...settings}>
          <div className={MainStyle.wdt}>
            <img
              className={MainStyle.img}
              src={renderImage("AddInfo")}
              className={MainStyle.img}
            />
            <div className={MainStyle.Hel}>
              <p className={MainStyle.Hel_P}>
                {" "}
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
              </p>
            </div>
            <div className={MainStyle.Rem}>
              <p className={MainStyle.Rem_P}>
                {" "}
                Add Button to add or scan for new devices you like to program{" "}
              </p>
            </div>
          </div>
          {/* <div className="wdt>
            <img
              style={{ height: "40px" }}
              src={}
              className="img"
            />
          </div> */}
          <div className={MainStyle.wdt}>
            <img
              className={MainStyle.img}
              src={renderImage("PlyComp")}
              className={MainStyle.img}
            />
            <div className={MainStyle.con}>
              <p className={MainStyle.con_P}>
                Select the device you will be using from the list
              </p>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default MainSlider;
