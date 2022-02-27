import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SaveStyle from "./SavePrgm.module.css";
import renderPrgImage from "../../../../source/programImg";

export class SavePrgm extends Component {
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
        <div className={SaveStyle.container}></div>
        <Slider {...settings}>
          {/* <div className="wdt>
            <img
              style={{ height: "40px" }}
              src={}
              className="img"
            />
          </div> */}
          <div className={SaveStyle.wdt}>
            <img
              className={SaveStyle.img}
              src={renderPrgImage("SavePrgf1")}
              className={SaveStyle.img}
            />
            <div className={SaveStyle.con}>
              <p className={SaveStyle.con_P}>
                For saving the program created, enter the required fields of the
                project like “name of the project”, “short description of the
                project” and “any live video link of the project uploaded”.
                Note: The project description and live video link is not
                mandatory to enter.
              </p>
            </div>
          </div>
          <div className={SaveStyle.wdt}>
            <img
              className={SaveStyle.img}
              src={renderPrgImage("SavePrgf2")}
              className={SaveStyle.img}
            />
            <div className={SaveStyle.Cam}>
              <p className={SaveStyle.Cam_P}>
                Use this button, when you want to upload the program to the
                playcomputer, for it to start functioning as created in the
                program.
              </p>
            </div>
          </div>

          <div className={SaveStyle.wdt}>
            <img
              className={SaveStyle.img}
              src={renderPrgImage("SavePrgf3")}
              className={SaveStyle.img}
            />
            <div className={SaveStyle.Mus}>
              <p className={SaveStyle.Mus_P}>
                Use this button to save your project after entering the details.
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

export default SavePrgm;
