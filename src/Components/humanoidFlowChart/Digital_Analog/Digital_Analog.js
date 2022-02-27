import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BgComp2 from "../BGComponents/BG2/BgComp2";
import { Grid, Hidden, Paper } from "@material-ui/core";
import MenuSection4 from "../ReusableComp/MenuSection/MenuSection4";
import spi_all_selected from "../../../Assets/spi_all_selected.png";
import learn_popup_height from "../../../Assets/learn_popup_height.png";
import next_button from "../../../Assets/learn_sliderbutton_bluebg.png";
import Descriptionbox from "../ReusableComp/Description/Descriptionbox";
import login_button_back from "../../../Assets/login_button_back.png";
import wifiOn from "../../../Assets/wifion.png";

import learn_slidebutton_bg from "../../../Assets/learn_slidebutton_bg.png";
import button_help from "../../../Assets/button_help.png";
import CheckBox_two from "../ReusableComp/CheckBox2/CheckBox_two";
import { Link, Redirect } from "react-router-dom";
import io_bg from "../../../Assets/io_bg.png";
import SwitchComp from "../ReusableComp/SwitchComp/SwitchComp";

import learn_slidebutton_bg_green from "../../../Assets/learn_slidebutton_bg_green.png";
import SwitchCompTwo from "../ReusableComp/SwitchCompTwo/SwitchCompTwo";
import SwitchCompThree from "../ReusableComp/SwitchCompThree/SwitchCompThree";
const useStyle = makeStyles((theme) => ({
  btnBack: {
    position: "absolute",
    top: "3.4vh",
    left: "5.7vw",
    height: "60px",
    width: "60px",
  },
  btnHelp: {
    position: "absolute",
    top: "2%",
    right: "2%",
    height: "60px",
    width: "60px",
  },

  btnNext: {
    position: "absolute",
    bottom: "3.4vh",
    right: "5%",
    height: "5vh",
    width: "8vw",
    textAlign: "center",
    overflow: "hidden",
    border: "2px outset black",
    borderRadius: "25px",
    backgroundColor: "#311B92",
    [theme.breakpoints.down("sm")]: {
      height: "45px",
      width: "20%",
    },
  },
  imgNextBtn: {
    height: "100%",
    width: "100%",
  },
  titleNextBtn: {
    fontFamily: "arial",
    position: "absolute",
    top: "-.5vh",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    color: "#ffffff",
    fontSize: "20px",
  },

  btnBottomBack: {
    position: "absolute",
    bottom: "3.4vh",
    left: "2%",
    height: "5vh",
    width: "8vw",
    textAlign: "center",
    overflow: "hidden",
    border: "2px outset black",
    borderRadius: "25px",
    backgroundColor: "#311B92",
    [theme.breakpoints.down("sm")]: {
      height: "45px",
      width: "20%",
    },
  },
  imgBtnBottomBack: {
    height: "100%",
    width: "100%",
  },
  titleBtnBottomBack: {
    fontFamily: "arial",
    position: "absolute",
    top: "-.5vh",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    color: "#ffffff",
    fontSize: "20px",
  },
  menuGrid: {
    height: "50px",
    width: "100%",
  },
  MenuGridItem: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      fontSize: "10px",
      textAlign: "start",
    },

    [theme.breakpoints.only("md")]: {
      marginLeft: "0px",
      fontSize: "12px",
      textAlign: "start",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  GridRoot: {
    height: "300px",
    width: "100%",
    marginTop: "10%",
  },

  GridImg: {
    position: "relative",
    backgroundImage: `url(${spi_all_selected})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "85% 84%",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "100% 80%",
      marginTop: "10px",
    },
  },
  checkbox: {
    marginTop: "70px",
    marginLeft: "40px",
    [theme.breakpoints.down("md")]: {
      marginTop: "85px",
      marginLeft: "15px",
    },
  },
  img2Details: {
    height: "230px",
    width: "160px",
    position: "absolute",
    top: "0%",
    left: "35%",

    [theme.breakpoints.down("md")]: {
      height: "235px",
      width: "120px",
      top: "0%",
      left: "35%",
    },
  },
  SectionImg: {
    position: "relative",
    backgroundImage: `url(${learn_popup_height})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "83% 87%",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "100% 80%",
      marginTop: "0",
      marginLeft: "0px",
    },
  },
  SectionImg2: {
    position: "relative",
    backgroundImage: `url(${learn_popup_height})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "83% 87%",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "100% 80%",
      marginTop: "0",
      marginLeft: "0px",
    },
  },

  SectionImg3: {
    position: "relative",
    backgroundImage: `url(${learn_popup_height})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "65% 87%",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "80% 80%",
      marginTop: "0",
      marginLeft: "0px",
    },
  },

  switch_CompPORT_A: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "10px",
    },
  },

  switch_CompPORT_B: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "10px",
    },
  },

  switch_Comp: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "3px",
    },
  },
  switchTitleC1: {
    position: "absolute",
    top: "-5px",
    left: "17%",
    color: "#fff",
  },
  pwm: {
    position: "absolute",
    height: "50px",
    width: "50px",
    top: "-5px",
    left: "45%",
  },

  pwmImg: {
    position: "absolute",
    width: "70px",
    height: "30px",
    marginTop: "30%",
    marginLeft: "20px",
    [theme.breakpoints.down("md")]: {
      width: "50px",
      height: "30px",

      marginLeft: "50px",
    },
  },

  pwmImgTitle: {
    position: "absolute",
    marginLeft: "35px",
    color: "red",
  },
  pwmImgTitleAnalog: {
    position: "absolute",
    marginLeft: "35px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "50px",
    },
  },
}));

let defaultState = {
  A1: "digital",
  A2: "digital",
  B1: "digital",
  B2: "digital",
  C1: "analog",
  C2: "digital",
  D1: "analog",
  D2: "digital",
};

function Digital_Analog(props) {
  console.log(props);
  const classes = useStyle();
  const [portData, setPortData] = useState(defaultState);
  const [isCheck, setCheck] = useState("");
  const [colorSwitch, setColorSwitch] = useState("#6a6a6a");

  // console.log(props.location.dataInputOutput.spi, "spi DATA");
  const dataInputOutput = JSON.parse(
    localStorage.getItem("SlectInputOutputData")
  ).InputOutputData;

  console.log(dataInputOutput);

  if (dataInputOutput.spi == true) {
    defaultState.C1 = dataInputOutput.C1;
    defaultState.C2 = dataInputOutput.C2;
    defaultState.D1 = dataInputOutput.D1;
    defaultState.D2 = dataInputOutput.D2;

    console.log(portData, "working 100%");
  }

  const switchActionHandler = (e) => {
    // console.log(e.target.checked, " CHECKED");
    // console.log(e.target.value, " CHECKED");

    let value = e.target.value;
    let isChecked = e.target.checked;

    let temp = { ...portData };

    if (e.target.checked) {
      setCheck("true");
      temp[`${value}`] = "digital";

      setPortData(temp);
    } else {
      setColorSwitch("#311B92");
      temp[`${value}`] = "analog";

      setPortData(temp);
    }
  };

  return (
    <BgComp2>
      {/* <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/input-output">
        <img className={classes.btnBack} src={login_button_back} />
      </Link> */}

      {/* <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/input-output">
        <div>
          <img
            src="images/Learn/login_button_back.png"
            style={{
              zIndex: "1",
              height: "39px",
              width: "39px",
              float: "left",
              position: "absolute",
              left: "1.6vw",
              top: "2.7vh",
            }}
          ></img>
        </div>
      </Link> */}

      <img className={classes.btnHelp} src={button_help} />

      <div className={classes.btnNext}>
        <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/flow-chart">
          <img className={classes.imgNextBtn} src={next_button} />
          <p className={classes.titleNextBtn}>NEXT</p>
        </Link>
      </div>

      <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/input-output">
        <div className={classes.btnBottomBack}>
          <img className={classes.imgBtnBottomBack} src={next_button} />
          <p className={classes.titleBtnBottomBack}>BACK</p>
        </div>
      </Link>
      {/* Menu */}
      <Grid container className={classes.menuGrid} spacing={1}>
        <Hidden xsDown>
          <Grid item xs={4} sm={3} />
        </Hidden>
        <Grid className={classes.MenuGridItem} item xs={12} sm={7} container>
          <Grid item xs={3} sm={2} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Select port" selectedMenu="no" />
          </Grid>

          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Input or output" selectedMenu="no" />
          </Grid>

          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Digital or Analog" selectedMenu="yes" />
          </Grid>
          <Grid item xs={3} sm={2} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Flowchart" selectedMenu="no" />
          </Grid>
          <Grid item xs={1} sm={2}>
            <img
              src={wifiOn}
              style={{
                marginTop: "-10px",
                position: "absolute",
                top: "0",
                right: "20%",
              }}
            />
          </Grid>
        </Grid>

        <Hidden xsDown>
          <Grid item xs={0} sm={2} />
        </Hidden>
      </Grid>

      {/* displaye */}
      <Grid container spacing={3} className={classes.GridRoot}>
        <Hidden xsDown={"sm"}>
          <Grid item xs={0} sm={4} />
        </Hidden>

        <Grid item xs={12} sm={6} container spacing={3}>
          <Grid item xs={6} sm={6} container spacing={3} direction="row">
            {/* A */}
            <Grid item xs={12} sm={12} className={classes.SectionImg3}>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  height: "40%",
                  width: "100%",
                }}
              >
                <div className={classes.switch_CompPORT_A}>
                  {" "}
                  <SwitchCompTwo
                    title="A1"
                    // switchActionHandler={switchActionHandler}
                    checked="checked"
                  />
                </div>

                {/* <h5 className={classes.switchTitleC1}>{portData.A1}</h5> */}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  height: "40%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    height: "40%",
                    width: "100%",
                  }}
                >
                  <div className={classes.switch_CompPORT_A}>
                    {" "}
                    <SwitchCompTwo
                      title="A2"
                      // switchActionHandler={switchActionHandler}
                      checked="checked"
                    />
                  </div>

                  {/* <h5 className={classes.switchTitleC1}>{portData.A2}</h5> */}
                </div>
              </div>
            </Grid>

            {/* B */}
            <Grid item xs={12} sm={12} className={classes.SectionImg3}>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  height: "40%",
                  width: "100%",
                }}
              >
                <div className={classes.switch_CompPORT_B}>
                  {" "}
                  <SwitchCompTwo
                    title="B1"
                    // switchActionHandler={switchActionHandler}
                    checked="checked"
                  />
                </div>

                {/* <h5 className={classes.switchTitleC1}>{portData.B2}</h5> */}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "70px",
                  height: "40%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    height: "40%",
                    width: "100%",
                  }}
                >
                  <div
                    className={classes.switch_CompPORT_B}
                    style={{ marginTop: "-20px" }}
                  >
                    {" "}
                    <SwitchCompTwo title="B2" checked="checked" />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          {dataInputOutput.spi == true ? (
            <Grid item xs={6} sm={6} className={classes.GridImg}>
              <div className={classes.checkbox}>
                <CheckBox_two title="spi" checkbox="checked" checked="true" />
                <div
                  className={classes.img2Details}
                  style={{ color: "#311B92", marginTop: "25px" }}
                >
                  <h3> C1 -&gt; Clock</h3>
                  <h3> C2 -&gt; MOSI</h3>
                  <h3> D1 -&gt; MISO</h3>
                  <h3> D2 -&gt; RST</h3>
                </div>
              </div>
            </Grid>
          ) : (
            <Grid item xs={6} sm={6} container spacing={3} direction="row">
              <Grid item xs={12} sm={12} className={classes.SectionImg}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    height: "40%",
                    width: "100%",
                  }}
                >
                  <div className={classes.switch_Comp}>
                    {" "}
                    <SwitchCompThree
                      title="C1"
                      switchActionHandler={switchActionHandler}
                    />
                  </div>

                  {/* <h5 className={classes.switchTitleC1}>{portData.C1}</h5> */}

                  {portData.C1 == "analog" ? (
                    <div className={classes.pwm}>
                      <img
                        className={classes.pwmImg}
                        src={learn_slidebutton_bg_green}
                      />
                      <h4 className={classes.pwmImgTitleAnalog}>PWM</h4>
                    </div>
                  ) : (
                    <div className={classes.pwm}>
                      <img
                        className={classes.pwmImg}
                        src={learn_slidebutton_bg}
                      />
                      <h4 className={classes.pwmImgTitleAnalog}>PWM</h4>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "70px",
                    height: "40%",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: "40%",
                      width: "100%",
                    }}
                  >
                    <div
                      className={classes.switch_Comp}
                      style={{ marginTop: "-10px" }}
                    >
                      <SwitchCompTwo
                        title="C2"
                        // switchActionHandler={switchActionHandler}
                        checked="checked"
                      />
                    </div>

                    {/* <h5 className={classes.switchTitleC1}>{portData.C2}</h5> */}
                  </div>
                </div>
              </Grid>

              {/* D */}
              <Grid item xs={12} sm={12} className={classes.SectionImg2}>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    height: "40%",
                    width: "100%",
                  }}
                >
                  <div className={classes.switch_Comp}>
                    {" "}
                    <SwitchCompThree
                      title="D1"
                      switchActionHandler={switchActionHandler}
                    />
                  </div>

                  {/* <h5 className={classes.switchTitleC1}>{portData.D1}</h5> */}

                  {portData.D1 == "analog" ? (
                    <div className={classes.pwm}>
                      <img
                        className={classes.pwmImg}
                        src={learn_slidebutton_bg_green}
                      />
                      <h4 className={classes.pwmImgTitleAnalog}>PWM</h4>
                    </div>
                  ) : (
                    <div className={classes.pwm}>
                      <img
                        className={classes.pwmImg}
                        src={learn_slidebutton_bg}
                      />
                      <h4 className={classes.pwmImgTitleAnalog}>PWM</h4>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "70px",
                    height: "40%",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",

                      height: "40%",
                      width: "100%",
                    }}
                  >
                    <div
                      className={classes.switch_Comp}
                      style={{ marginTop: "-10px" }}
                    >
                      {" "}
                      <SwitchCompTwo title="D2" checked="checked" />
                    </div>

                    {/* <h5 className={classes.switchTitleC1}>{portData.D2}</h5> */}
                  </div>
                </div>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Hidden xsDown={"sm"}>
          <Grid item xs={0} sm={0} />
        </Hidden>
      </Grid>
    </BgComp2>
  );
}
export default Digital_Analog;
