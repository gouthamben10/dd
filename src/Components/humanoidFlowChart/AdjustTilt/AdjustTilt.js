import React, { useEffect, useState } from "react";
import BgComp2 from "../BGComponents/BG2/BgComp2";

import "./AdjustTilt.css";

import closeIcon from "../../../Assets/Group_2194.png";

import { makeStyles } from "@material-ui/core/styles";

import login_button_back from "../../../Assets/login_button_back.png";
import button_help from "../../../Assets/button_help.png";
import next_button from "../../../Assets/learn_sliderbutton_bluebg.png";
import { Grid, Hidden } from "@material-ui/core";
import Descriptionbox from "../ReusableComp/Description/Descriptionbox";
import MenuSection4 from "../ReusableComp/MenuSection/MenuSection4";
import headControl from "../../../Assets/x-y_axis.png";
import finger_grasp from "../../../Assets/finger_grasp.png";
import wifiOn from "../../../Assets/wifion.png";

import blueBg from "../../../Assets/learn_sliderbutton_bluebg.png";

import Slider from "@material-ui/core/Slider";
import PopUpcomp from "../ReusableComp/PopUpcomponents/PopUpcomp";
import io_bg from "../../../Assets/learn_mid_button.png";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  btnBack: {
    position: "absolute",
    top: "4.5vh",
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
    bottom: "2vh",
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
    bottom: "2vh",
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
  homeDescriptionBox: {
    height: "10%",
    width: "70%",
    position: "absolute",
    bottom: "2px",
    left: "15%",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
      left: "20%",
    },
  },
  homeDescriptionItem: {
    height: "100%",
    width: "100%",
  },
  GridRoot: {
    width: "100%",
  },

  textXaxis: {
    color: "#311B92",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      fontSize: "12px",
    },
  },
  root: {
    color: "#52af77",
    width: "80%",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      top: -30,
      left: 5,
    },
  },
  active: {},
  valueLabel: {
    top: 30,
    left: 0,
    "& *": {
      background: "transparent",
      color: "#311B92",
      fontSize: "18px",
    },
  },

  thumb: {
    height: 25,
    width: 25,
    backgroundColor: "#ffffff",
    border: "2px solid #cccccc",
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },

  // select colore
  track: {
    height: "45%",
    borderRadius: "50px",
    backgroundColor: "#311B92",
    [theme.breakpoints.down("sm")]: {
      height: "30%",
    },
  },

  // select part height,width AND radius
  rail: {
    height: "30%",
    borderRadius: "50px",
    border: "3px solid #311B92",
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      height: "20%",
    },
  },
  popupRoot: {
    position: "absolute",
    height: "45%",
    width: "30%",
    marginTop: "80px",
    [theme.breakpoints.down("sm")]: {
      height: "45%",
      width: "100%",
    },
  },
}));

let defaultAdjustTiltData = {
  Xaxis: 0,
  Yaxis: 0,
  fingerValue: 0,
};

function AdjustTilt(props) {
  const classes = useStyles();

  const [XaxisseekValue, setXaxisSeekValue] = useState(
    defaultAdjustTiltData.Xaxis
  );
  const [YaxisseekValue, setYaxisSeekValue] = useState(
    defaultAdjustTiltData.Yaxis
  );
  const [FingerseekValue, setFingerSeekValue] = useState(
    defaultAdjustTiltData.fingerValue
  );

  const [isOpen, setIsOpen] = useState(false);

  const seekBarHandler = (e, value) => {
    // console.log(value, "X-axis");
    setXaxisSeekValue(value);
  };

  const YaxisSeekBarHandler = (e, value) => {
    setYaxisSeekValue(value);
    // console.log(value, "y-axis");
  };

  const FingerSeekBarHandler = (e, value) => {
    setFingerSeekValue(value);
    // console.log(value, "Finger value");
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // console.log(props);

  // x
  useEffect(() => {
    defaultAdjustTiltData.Xaxis = XaxisseekValue;
    // console.log(defaultAdjustTiltData.Xaxis, "useEffect x");
  }, [XaxisseekValue]);

  useEffect(() => {
    defaultAdjustTiltData.Yaxis = YaxisseekValue;
    // console.log(defaultAdjustTiltData.Yaxis, "useEffect y");
  }, [YaxisseekValue]);

  useEffect(() => {
    defaultAdjustTiltData.fingerValue = FingerseekValue;
    // console.log(defaultAdjustTiltData.fingerValue, "useEffect y");
  }, [FingerseekValue]);

  const XaxisSeekValue = XaxisseekValue;
  const YaxisSeekValue = YaxisseekValue;
  const FingerSeekValue = FingerseekValue;
  var adjustTiltMainData = {
    XaxisSeekValue,
    YaxisSeekValue,
    FingerSeekValue,
  };

  localStorage.setItem("adjustTiltData", JSON.stringify(adjustTiltMainData));

  var localStorageAdjustTiltData = JSON.parse(
    localStorage.getItem("adjustTiltData")
  );

  console.log("Adjust Tilit Data: ", localStorageAdjustTiltData);

  return (
    <BgComp2>
      {/* <Link to="/learn-mid/flowChart/LetCode/Enable-Servos">
        <img className={classes.btnBack} src={login_button_back} />
      </Link> */}

      {/* <Link to="/learn-mid/flowChart/LetCode/Enable-Servos">
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
              top: "4vh",
            }}
          ></img>
        </div>
      </Link> */}

      <img className={classes.btnHelp} src={button_help} />

      <div className={classes.btnNext} onClick={togglePopup}>
        <img className={classes.imgNextBtn} src={next_button} />
        <p className={classes.titleNextBtn}>NEXT</p>
      </div>

      <Link
        to={{
          pathname: "/learn-mid/flowChart/LetCode/Enable-Servos",
          state: {
            prevPath: props.location.pathname,
          },
        }}
      >
        <div className={classes.btnBottomBack}>
          <img className={classes.imgBtnBottomBack} src={next_button} />
          <p className={classes.titleBtnBottomBack}>BACK</p>
        </div>
      </Link>
      {/* Menu */}
      <Grid container className={classes.menuGrid} spacing={3}>
        <Hidden xsDown>
          <Grid item xs={4} sm={4} />
        </Hidden>
        <Grid className={classes.MenuGridItem} item xs={12} sm={5} container>
          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Enable Servos" selectedMenu="no" />
          </Grid>

          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Adjust Tilt" selectedMenu="yes" />
          </Grid>

          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Logic Flow" selectedMenu="no" />
          </Grid>
          <Grid item xs={1} sm={3}>
            <img
              src={wifiOn}
              style={{
                marginTop: "-10px",
                position: "absolute",
                top: "0",
                right: "30%",
              }}
            />
          </Grid>
        </Grid>

        <Hidden xsDown>
          <Grid item xs={3} sm={3} />
        </Hidden>
      </Grid>

      {/* content */}

      <Grid
        container
        spacing={3}
        style={{
          width: "100%",
          marginTop: "8%",
        }}
      >
        <Hidden xsDown>
          <Grid xs={0} sm={2}></Grid>
        </Hidden>
        <Grid xs={6} sm={4} container direction="column">
          <Grid item xs={12} sm={12} container>
            <Hidden xsDown>
              <Grid xs={0} sm={3}></Grid>
            </Hidden>
            <Grid xs={0} sm={7}>
              <img src={headControl} style={{ height: "180px" }} />
            </Grid>
            <Hidden xsDown>
              <Grid xs={0} sm={2}></Grid>
            </Hidden>
          </Grid>

          <Grid item container>
            <Grid item xs={3} sm={2}>
              <h3 className={classes.textXaxis} style={{ marginTop: "25px" }}>
                X-axis
              </h3>
            </Grid>
            <Grid item xs={9} sm={10}>
              <Slider
                classes={{
                  root: classes.root,
                  track: classes.track,
                  thumb: classes.thumb,
                  rail: classes.rail,
                  valueLabel: classes.valueLabel,
                }}
                min={0}
                max={180}
                onChange={seekBarHandler}
                valueLabelDisplay="on"
                defaultValue={localStorageAdjustTiltData.XaxisSeekValue}
                className="AdjustTilt-x-Axis-seek"
              />
            </Grid>

            <Grid item xs={3} sm={2}>
              <h3 className={classes.textXaxis} style={{ marginTop: "25px" }}>
                Y-axis
              </h3>
            </Grid>
            <Grid item xs={9} sm={10}>
              <Slider
                classes={{
                  root: classes.root,
                  track: classes.track,
                  thumb: classes.thumb,
                  rail: classes.rail,
                  valueLabel: classes.valueLabel,
                }}
                min={0}
                max={180}
                onChange={YaxisSeekBarHandler}
                valueLabelDisplay="on"
                defaultValue={localStorageAdjustTiltData.YaxisSeekValue}
                className="AdjustTilt-x-Axis-seek"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={6} sm={4}>
          <Grid item xs={12} sm={12} container>
            <Hidden xsDown>
              <Grid xs={0} sm={3}></Grid>
            </Hidden>
            <Grid xs={0} sm={7}>
              <img src={finger_grasp} style={{ height: "180px" }} />
            </Grid>
            <Hidden xsDown>
              <Grid xs={0} sm={2}></Grid>
            </Hidden>
          </Grid>

          <Grid item container>
            <Grid item xs={3} sm={2}>
              <h3 className={classes.textXaxis}>Finger Grasp</h3>
            </Grid>
            <Grid item xs={9} sm={10}>
              <Slider
                classes={{
                  root: classes.root,
                  track: classes.track,
                  thumb: classes.thumb,
                  rail: classes.rail,
                  valueLabel: classes.valueLabel,
                }}
                min={0}
                max={180}
                onChange={FingerSeekBarHandler}
                valueLabelDisplay="on"
                defaultValue={localStorageAdjustTiltData.FingerSeekValue}
                className="AdjustTilt-x-Axis-seek"
              />
            </Grid>
          </Grid>
        </Grid>

        <Hidden xsDown>
          <Grid xs={0} sm={2}></Grid>
        </Hidden>
      </Grid>

      {/* Description */}
      <Grid container className={classes.homeDescriptionBox}>
        <Grid item className={classes.homeDescriptionItem}>
          <Descriptionbox />
        </Grid>
      </Grid>

      {isOpen && (
        <div className="PopUpContainer">
          <img
            src={closeIcon}
            className="popUpCloseIcon"
            onClick={togglePopup}
          />

          <h2 className="popupTitle"> would you like to enable port?</h2>

          <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/selectPort">
            <div className="btnYes">
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 className="popUpMenuStyle1"> Yes, let me try</h2>
              </div>
            </div>
          </Link>

          <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/flow-chart">
            <div className="btnLater">
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 className="popUpMenuStyle"> Maybe later</h2>
              </div>
            </div>
          </Link>
        </div>
      )}
    </BgComp2>
  );
}

export default AdjustTilt;
