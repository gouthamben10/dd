import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import BgComp2 from "../BGComponents/BG2/BgComp2";

import login_button_back from "../../../Assets/login_button_back.png";
import button_help from "../../../Assets/button_help.png";
import wifiOn from "../../../Assets/wifion.png";
import next_button from "../../../Assets/learn_sliderbutton_bluebg.png";
import { Grid, Hidden } from "@material-ui/core";
import MenuSection4 from "../ReusableComp/MenuSection/MenuSection4";
import Humanoid from "./Humanoid";
import Descriptionbox from "../ReusableComp/Description/Descriptionbox";

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
    },
  },
  homeDescriptionItem: {
    height: "100%",
    width: "100%",
  },
}));

function EnableServos(props) {
  const classes = useStyles();

  return (
    <BgComp2>
      {/* <Link to="/learn-mid/flowChart">
        <img className={classes.btnBack} src={login_button_back} />
      </Link> */}
      <Link to="/learn-mid/flowChart">
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
      </Link>

      <img className={classes.btnHelp} src={button_help} />

      <div className={classes.btnNext}>
        <Link
          to={{
            pathname: "/learn-mid/flowChart/LetCode/Adjust-Tilt",
            state: {
              prevPath: props.location.pathname,
            },
          }}
        >
          <img className={classes.imgNextBtn} src={next_button} />
          <p className={classes.titleNextBtn}>NEXT</p>
        </Link>
      </div>

      {/* menu */}
      <Grid container className={classes.menuGrid} spacing={3}>
        <Hidden xsDown>
          <Grid item xs={4} sm={4} />
        </Hidden>
        <Grid className={classes.MenuGridItem} item xs={12} sm={5} container>
          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Enable Servos" selectedMenu="yes" />
          </Grid>

          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Adjust Tilt" selectedMenu="no" />
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

      <Grid container spacing={3} className={classes.menuGrid}>
        <Hidden xsDown>
          <Grid item xs={3} />
        </Hidden>
        <Grid item xs={12} sm={6}>
          <Humanoid />
        </Grid>
        <Hidden xsDown>
          <Grid item xs={0} />
        </Hidden>{" "}
      </Grid>

      {/* description */}
      <Grid container className={classes.homeDescriptionBox}>
        <Grid item className={classes.homeDescriptionItem}>
          <Descriptionbox />
        </Grid>
      </Grid>
    </BgComp2>
  );
}
export default EnableServos;
