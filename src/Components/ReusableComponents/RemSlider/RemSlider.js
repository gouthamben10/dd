import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RemStyle from "./RemSlider.module.css";
import renderImage from "../../../source/importImg";

export class RemSlider extends Component {
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
        <div className={RemStyle.container}></div>
        <Slider {...settings}>
          <div className={RemStyle.wdt}>
            <img
              className={RemStyle.img}
              src={renderImage("Remt1")}
              className={RemStyle.img}
            />
            <div className={RemStyle.Hel}>
              <p className={RemStyle.Hel_P}>
                {" "}
                Help Button will explain all the features and functionality of
                the entire app for each screen{" "}
              </p>
            </div>

            <div className={RemStyle.Rem}>
              <p className={RemStyle.Rem_P}>
                When the app is connected to the Play Computer, the icon will be
                GREEN in colour, & when disconnected, the icon will turn RED. If
                the app gets disconnected from the Play computer, then on top of
                this button, it’ll attempt to connect automatically.
              </p>
            </div>
          </div>

          <div className={RemStyle.wdt}>
            <img
              className={RemStyle.img}
              src={renderImage("Remt2")}
              className={RemStyle.img}
            />
            <div className={RemStyle.con}>
              <p className={RemStyle.con_P}>
                You can make the playcomputer’s beeper play various tones from
                high frequency to low frequency.
              </p>
            </div>
          </div>
          <div className={RemStyle.wdt}>
            <img
              className={RemStyle.img}
              src={renderImage("Remt3")}
              className={RemStyle.img}
            />
            <div className={RemStyle.Mus}>
              <p className={RemStyle.Mus_P}>
                The playcomputer has 2 RGB LED as eye, which you can control
                independently. There are 3 sliders for each RGB LED using which
                you can control the RED GREEN BLUE contrasts of the LED.
              </p>
            </div>
          </div>
          <div className={RemStyle.wdt}>
            <img
              className={RemStyle.img}
              src={renderImage("Remt4")}
              className={RemStyle.img}
            />
            <div className={RemStyle.Cam}>
              <p className={RemStyle.Cam_P}>
                The playcomputer has 2 RGB LED as eye, which you can control
                independently. There are 3 sliders for each RGB LED using which
                you can control the RED GREEN BLUE contrasts of the LED.
              </p>
            </div>
          </div>
          <div className={RemStyle.wdt}>
            <img
              className={RemStyle.img}
              src={renderImage("Remt5")}
              className={RemStyle.img}
            />
            <div className={RemStyle.Re5}>
              <p className={RemStyle.Re5_P}>
                You can turn ON/OFF each of the 4 Smile leds using the buttons
              </p>
            </div>
          </div>

          <div className={RemStyle.wdt}>
            <img
              className={RemStyle.img}
              src={renderImage("Remt6")}
              className={RemStyle.img}
            />
            <div className={RemStyle.Re6}>
              <p className={RemStyle.Re6_P}>
                {" "}
                Talk back mode: The playcomputer will go into listening mode, as
                long as the button is pressed. You can speak anything you want
                to the playcomputer for a maximum of 5 seconds & the
                playcomputer will repeat the same in its own voice.
              </p>
            </div>
          </div>

          <div className={RemStyle.wdt}>
            <img
              className={RemStyle.img}
              src={renderImage("Remt6")}
              className={RemStyle.img}
            />
            <div className={RemStyle.Re6}>
              <p className={RemStyle.Re7_P}>
                Gesture mode: The playcomputer’s gesture sensor can detect the
                direction of motion of your hand/ finger above it. You can swipe
                above the sensor left, right, up or down & the playcomputer will
                emote the same using the RGB leds & the smile LEDs.
              </p>
            </div>
          </div>
          <div className={RemStyle.wdt}>
            <img
              className={RemStyle.img}
              src={renderImage("Remt6")}
              className={RemStyle.img}
            />
            <div className={RemStyle.Re8}>
              <p className={RemStyle.Re8_P}>
                Disco mode: This is mode that will put the Playcomputer in Disco
                mode, to continuously play a disco tone & flash Left & Right eye
                with random colours.
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

export default RemSlider;
