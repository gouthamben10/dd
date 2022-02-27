import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SpchStyle from "./SpchSlider.module.css";
import renderImage from "../../../source/importImg";

// import { Remt, Peech, Msic, Camr } from "../../../Source/index";
export class SpchSlider extends Component {
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
          <div className={SpchStyle.wdt}>
            <img
              className={SpchStyle.img}
              src={renderImage("Spch1")}
              className={SpchStyle.img}
            />
            <div className={SpchStyle.Hdg}>
              <p className={SpchStyle.Hdg_P}>
                {" "}
                Here languages English & hindi can be setected.
              </p>
            </div>
            <div className={SpchStyle.Mdl}>
              <p className={SpchStyle.Mdl_P}>
                Help Button will explain all the features and functionality of
                the entire app for each screen
              </p>
            </div>
            <div className={SpchStyle.Ftr}>
              <p className={SpchStyle.Ftr_P}>
                When the app is connected to the Play Computer, the icon will be
                GREEN in colour, & when disconnected, the icon will turn RED. If
                the app gets disconnected from the Play computer, then on top of
                this button, it’ll attempt to connect automatically.
              </p>
            </div>
          </div>
          {/* <div className="SpchStyle.wdt>
            <img
              style={{ height: "40px" }}
              src={"assets/w3.jpg"}
              className="SpchStyle.img"
            />
          </div> */}
          <div className={SpchStyle.wdt}>
            <img
              className={SpchStyle.img}
              src={renderImage("Spch2")}
              className={SpchStyle.img}
            />
            <div className={SpchStyle.con}>
              <p
                className={SpchStyle.con_P}
                style={{
                  textAlign: "left",
                  alignItems: "flex-start",
                  fontSize: "18px",
                  letterSpacing: "0px",
                  color: "#707070",
                  fontFamily: "Halcyon_Regular",
                  position: "absolute",
                  top: "5%",
                  left: "5%",
                  height: "5%",
                  width: "91%",
                  // zIndex: "10",
                }}
              >
                • Tap on the mic button once, which will begin to listening to
                words you speak. <br /> • The app will detect the words spoken &
                check if it is part of the pre-defined phrases. <br /> • There
                are pre-defined words / phrases that the app will recognise, and
                the respective action will be performed by the playcomputer.
              </p>
            </div>
          </div>

          <div className={SpchStyle.wdt}>
            <img
              className={SpchStyle.img}
              src={renderImage("Spch2")}
              className={SpchStyle.img}
            />
            <div className={SpchStyle.Mus}>
              <p
                className={SpchStyle.Mus_P}
                style={{
                  textAlign: "left",
                  alignItems: "flex-start",
                  fontSize: "18px",
                  letterSpacing: "0px",
                  color: "#707070",
                  fontFamily: "Halcyon_Regular",
                  position: "absolute",
                  top: "5%",
                  left: "5%",
                  height: "5%",
                  width: "91%",
                  // zIndex: "10",
                }}
              >
                • The app will detect the words spoken & check if it is part of
                the pre-defined phrases.
                <br />
                • For this to work, see to that you allow your app to record
                audio and enable the mic of your smarphone. Set permission to
                allow whenever the app is in use.
                <br />
                • If yes, then the PLODE app will send a command to the
                playcomputer to perform the respective action.
                <br /> • To command a different action, tap on the mic again &
                then speak the command.
              </p>
            </div>
          </div>
          <div className={SpchStyle.wdt}>
            <img
              className={SpchStyle.img}
              src={renderImage("Spch2")}
              className={SpchStyle.img}
            />
            <div className={SpchStyle.Cam}>
              <p className={SpchStyle.Cam_P}>
                Predefined phrases:
                <br />
                • LIGHTS OFF - this will turn off all the lights of the
                PLaycomputer.
                <br />
                • RED light ON - this will turn ON both the RGB led in red
                colour. <br />
                • Blue light ON - this will turn ON both the RGB led in blue
                colour. <br />
              </p>
            </div>
          </div>

          <div className={SpchStyle.wdt}>
            <img
              className={SpchStyle.img}
              src={renderImage("Spch2")}
              className={SpchStyle.img}
            />
            <div className={SpchStyle.Cam1}>
              <p className={SpchStyle.Cam1_P}>
                Predefined phrases:
                <br />
                • Green light ON - this will turn ON both the RGB led in green
                colour. <br />
                • White light ON - this will turn ON both the RGB led in white
                colour. <br />
              </p>
            </div>
          </div>
          <div className={SpchStyle.wdt}>
            <img
              className={SpchStyle.img}
              src={renderImage("Spch2")}
              className={SpchStyle.img}
            />
            <div className={SpchStyle.Cam2}>
              <p className={SpchStyle.Cam2_P}>
                Predefined phrases:
                <br />
                • SMILE ON - this will turn on the LED at the mouth, to make a
                smile emotion.
                <br />
                • SMILE OFF - this will turn OFF the led at the mouth, to remove
                the smile.
                <br />
                • Disco lights - this will make the playcomputer to go into
                dicso mode, just like the the remote option.
                <br />
              </p>
            </div>
          </div>

          {/* <div className="SpchStyle.wdt">
            <img className="img" src={"assets/w2.png"} className="img" />
          </div> */}
        </Slider>
      </div>
    );
  }
}

export default SpchSlider;
