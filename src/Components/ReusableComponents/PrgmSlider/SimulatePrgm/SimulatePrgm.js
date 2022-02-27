import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SimulateStyle from "./SimulatePrgm.module.css";
import renderPrgImage from "../../../../source/programImg";

export class SimulatePrgm extends Component {
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
        <div className={SimulateStyle.container}></div>
        <Slider {...settings}>
          {/* <div className="wdt>
            <img
              style={{ height: "40px" }}
              src={}
              className="img"
            />
          </div> */}
          <div className={SimulateStyle.wdt}>
            <img
              className={SimulateStyle.img}
              src={renderPrgImage("SimulatePrgf1")}
              className={SimulateStyle.img}
            />
            <div className={SimulateStyle.con}>
              <p className={SimulateStyle.con_P}>
                Screen toggle button is used to toggle the simulation screen to
                show between – hardware only, software only, or both hardware
                and software together one at a time.
              </p>
            </div>
            <div className={SimulateStyle.Cam1}>
              <p className={SimulateStyle.Cam1_P}>
                This button is used to run the simulation in a step-by-step
                flow.
              </p>
            </div>
            <div className={SimulateStyle.Cam2}>
              <p className={SimulateStyle.Cam2_P}>
                This button will start and run the simulation until the user
                stops. Here the user can see the live simulation of the program
                that the user created in the previous screens, including
                interacting virtually with the sensors used.
              </p>
            </div>
          </div>
          <div className={SimulateStyle.wdt}>
            <img
              className={SimulateStyle.img}
              src={renderPrgImage("SimulatePrgf2")}
              className={SimulateStyle.img}
            />
            <div className={SimulateStyle.Mus}>
              <p className={SimulateStyle.Mus_P}>
                Use this button, when you want to upload the program to the
                playcomputer, for it to start functioning as created in the
                program.
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

export default SimulatePrgm;
