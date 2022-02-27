import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AssemblyStyle from "./AssemblyPrgm.module.css";
import renderPrgImage from "../../../../source/programImg";

export class AssemblyPrgm extends Component {
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
        <div className={AssemblyStyle.container}></div>
        <Slider {...settings}>
          <div className={AssemblyStyle.wdt}>
            <img
              className={AssemblyStyle.img}
              src={renderPrgImage("AssemblyPrgf1")}
              className={AssemblyStyle.img}
            />
            <div className={AssemblyStyle.Hel}>
              <p className={AssemblyStyle.Hel_P}>
                {" "}
                You can use this button to read the live sensor values of the
                internal & external accessories connected to playcomputer. Only
                accessories enabled at the select screen will work.
              </p>
            </div>
            <div className={AssemblyStyle.Cam1}>
              <p className={AssemblyStyle.Cam1_P}>
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
              </p>
            </div>
            <div className={AssemblyStyle.Cam2}>
              <p className={AssemblyStyle.Cam2_P}>
                To save the new project or overwrite the saved & loaded project.
              </p>
            </div>
            <div className={AssemblyStyle.Cam3}>
              <p className={AssemblyStyle.Cam3_P}>
                Bluetooth connection status; red: disconnected, green:
                connected.
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
          <div className={AssemblyStyle.wdt}>
            <img
              className={AssemblyStyle.img}
              src={renderPrgImage("AssemblyPrgf2")}
              className={AssemblyStyle.img}
            />
            <div className={AssemblyStyle.con}>
              <p className={AssemblyStyle.con_P}>
                All external accessories selected at the select screen are shown
                here. These can be dragged & dropped at the respective ports of
                Playcomputer.
              </p>
            </div>
          </div>
          <div className={AssemblyStyle.wdt}>
            <img
              className={AssemblyStyle.img}
              src={renderPrgImage("AssemblyPrgf3")}
              className={AssemblyStyle.img}
            />
            <div className={AssemblyStyle.Mus}>
              <p className={AssemblyStyle.Mus_P}>
                1. While dragging the external accessories near playcomputer, a
                red-dot appears at the ports, where it can be connected. Once
                connnected, a wire diagram forms between them.
                <br /> 2. to remove a connection of the external accessories,
                you can drag them towards the left panel of the screen. The
                connection will automatically disconnect.
              </p>
            </div>
          </div>
          <div className={AssemblyStyle.wdt}>
            <img
              className={AssemblyStyle.img}
              src={renderPrgImage("AssemblyPrgf4")}
              className={AssemblyStyle.img}
            />
            <div className={AssemblyStyle.Cam}>
              <p className={AssemblyStyle.Cam_P}>
                You can use this button to read the live sensor values of the
                internal & external accessories connected to playcomputer. Only
                accessories enabled at the select screen will work.
              </p>
            </div>
            <div className={AssemblyStyle.Ca}>
              <p className={AssemblyStyle.Ca_P}>
                To go back to the internal accessories screen.
              </p>
            </div>
            <div className={AssemblyStyle.Camr}>
              <p className={AssemblyStyle.Camr_P}>To go to the code screen</p>
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

export default AssemblyPrgm;
