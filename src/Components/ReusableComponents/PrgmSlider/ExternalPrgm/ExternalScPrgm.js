import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ExternalStyle from "./ExternalScPrgm.module.css";
import renderPrgImage from "../../../../source/programImg";

export class ExternalScPrgm extends Component {
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
        <div className={ExternalStyle.container}></div>
        <Slider {...settings}>
          {/* <div className="wdt>
            <img
              style={{ height: "40px" }}
              src={}
              className="img"
            />
          </div> */}
          <div className={ExternalStyle.wdt}>
            <img
              className={ExternalStyle.img}
              src={renderPrgImage("ExternalPrgf2")}
              className={ExternalStyle.img}
            />
            <div className={ExternalStyle.con}>
              <p className={ExternalStyle.con_P}>
                A scrollable list of all the external accessories - both input &
                output type are present here. User can select any or all of them
                from this list.
              </p>
            </div>
          </div>
          <div className={ExternalStyle.wdt}>
            <img
              className={ExternalStyle.img}
              src={renderPrgImage("ExternalPrgf3")}
              className={ExternalStyle.img}
            />
            <div className={ExternalStyle.Mus}>
              <p className={ExternalStyle.Mus_P}>
                All external accessories that are selected from the list appear
                here to be used for the next set of screens.
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

export default ExternalScPrgm;
