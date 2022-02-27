import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LogicStyle from "./LogicPrgm.module.css";
import renderPrgImage from "../../../../source/programImg";

export class LogicPrgm extends Component {
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
        <div className={LogicStyle.container}></div>
        <Slider {...settings}>
          <div className={LogicStyle.wdt}>
            <img
              className={LogicStyle.img}
              src={renderPrgImage("LogicPrgf1")}
              className={LogicStyle.img}
            />
            <div className={LogicStyle.Hel}>
              <p className={LogicStyle.Hel_P}>
                1. START:This is the default hex block that indicates the start
                of the program flow.
                <br />
                2. Tap: Clicking this hex button, enables an option to add more
                hex blocks.
                <br />
                3. On long pressing for more than 3 seconds, on any block, we
                get 2 options “ Insert” and “Delete”. Note: this is not
                applicable to “Start” block.
                <br />
                4. Insert: Use this option, when you want to insert a new hex
                block in between 2 existing hex blocks.
                <br />
                5. delete: Use this option, when you want to delete a hex block.
                Note: this cannot be used for “Start” block.
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
          <div className={LogicStyle.wdt}>
            <img
              className={LogicStyle.img}
              src={renderPrgImage("LogicPrgf2")}
              className={LogicStyle.img}
            />
            <div className={LogicStyle.con}>
              <p className={LogicStyle.con_P}>
                Condition: use this hex block when you want to check for a
                condition of any sensor.
                <br />
                End-if: use this hex block, when you want to close the
                conditional check and its respective output blocks. This is
                similar to closing bracket for an if statement in C programming.
              </p>
            </div>
          </div>
          <div className={LogicStyle.wdt}>
            <img
              className={LogicStyle.img}
              src={renderPrgImage("LogicPrgf3")}
              className={LogicStyle.img}
            />
            <div className={LogicStyle.Mus}>
              <p className={LogicStyle.Mus_P}>
                Wait: use this hex block when you need a time delay for an
                activity or run that activity for a stipulated period of time.
                We an set the wait in milliseconds, seconds, minutes and hours.
                <br />
                Hardware: use this hex block, to set an output port as either on
                or off, or various frequencies, or set a variable to a defined
                value.
              </p>
            </div>
          </div>
          <div className={LogicStyle.wdt}>
            <img
              className={LogicStyle.img}
              src={renderPrgImage("LogicPrgf4")}
              className={LogicStyle.img}
            />
            <div className={LogicStyle.Cam}>
              <p className={LogicStyle.Cam_P}>
                loop: use this hex block, when you need a following set of hex
                blocks to run defined number of times, given by a value in its
                property panel. <br />
                End loop: use this hex block to close the loop set of hex
                blocks, which run for defined number of times.
              </p>
            </div>
          </div>

          <div className={LogicStyle.wdt}>
            <img
              className={LogicStyle.img}
              src={renderPrgImage("LogicPrgf5")}
              className={LogicStyle.img}
            />
            <div className={LogicStyle.Ca}>
              <p className={LogicStyle.Ca_P}>
                Repeat: Use this hex block, if you need to repeat the entire
                program indefinitely forever.
                <br />
                Stop: use this hex block, if you need the program to run only
                one time.
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

export default LogicPrgm;
