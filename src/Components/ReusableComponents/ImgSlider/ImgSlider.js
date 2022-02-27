import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ImgSlider.css";
import { Remt, Peech, Msic, Camr } from "../../../source/index";
import renderImage from "../../../source/importImg";
export class ImgSlider extends Component {
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
        <div class="container"></div>
        <Slider {...settings}>
          <div className="wdt">
            <img className="img" src={renderImage("Remt")} className="img" />
            <div className="Hel">
              <p className="Hel-P">
                {" "}
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
              </p>
            </div>
            <div className="Rem">
              <p className="Rem_P">
                {" "}
                In this screen you can control the playcomputer or put it under
                various modes using some buttons as a remote.
              </p>
            </div>
          </div>
          {/* <div className="wdt>
            <img
              style={{ height: "40px" }}
              src={"assets/w3.jpg"}
              className="img"
            />
          </div> */}
          <div className="wdt">
            <img className="img" src={renderImage("Peech")} className="img" />
            <div className="con">
              <p className="con_P">
                In this screen you can control the playcomputer for certain
                action using you voice. Here the PLODE app uses google speech
                recognition engine for detection.
              </p>
            </div>
          </div>
          <div className="wdt">
            <img className="img" src={renderImage("Msic")} className="img" />
            <div className="Mus">
              <p className="Mus_P">
                At this screen, you can have a dual functionality of making
                either the playcomputer play tones or the app plays piano tones.
              </p>
            </div>
          </div>
          <div className="wdt">
            <img className="img" src={renderImage("Camr")} className="img" />
            <div className="Cam">
              <p className="Cam_P">
                At this screen, you can control the playcomputer with the
                position of your face -tilting left, right, up or down or a
                smile face.{" "}
              </p>
            </div>
          </div>
          {/* <div className="wdt">
            <img className="img" src={"assets/w2.png"} className="img" />
          </div> */}
        </Slider>
      </div>
    );
  }
}

export default ImgSlider;
