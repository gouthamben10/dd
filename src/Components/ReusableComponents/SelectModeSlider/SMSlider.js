import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SelectStyle from "./SMSlider.module.css";
import { Ply, Prog, Bild } from "../../../source/index";
import renderImage from "../../../source/importImg";

export class SMSlider extends Component {
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
        <div className={SelectStyle.container}></div>
        <Slider {...settings}>
          <div className={SelectStyle.wdt}>
            <img
              className={SelectStyle.img}
              src={renderImage("Ply")}
              className={SelectStyle.img}
            />
            <div className={SelectStyle.Hel}>
              <p className={SelectStyle.Hel_P}>
                {" "}
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
              </p>
            </div>
            <div className={SelectStyle.Rem}>
              <p className={SelectStyle.Rem_P}>
                {" "}
                In this mode, you can directly interact with the Playcomputer
                without having to program it.
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
          <div className={SelectStyle.wdt}>
            <img
              className={SelectStyle.img}
              src={renderImage("Prog")}
              className={SelectStyle.img}
            />
            <div className={SelectStyle.con}>
              <p className={SelectStyle.con_P}>
                This mode is a sandbox mode for the user to explore the complete
                programming platform to create code for the Playcomputer. Here
                the user will get to explore both visual based & script based
                programming.
              </p>
            </div>
          </div>
          <div className={SelectStyle.wdt}>
            <img
              className={SelectStyle.img}
              src={renderImage("Bild")}
              className={SelectStyle.img}
            />
            <div className={SelectStyle.Mus}>
              <p className={SelectStyle.Mus_P}>
                In this mode, you can see step-by-step process of building
                simple to complex Lego blocks based projects & directly making
                them work without. The user worrying about the programming
                steps.
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

export default SMSlider;
