import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BgComp1 from "../BGComponents/BG1/BgComp1";

// icon
import login_button_back from "../../../Assets/login_button_back.png";
import button_help from "../../../Assets/button_help.png";
import humanoid_main_screen from "../../../Assets/humanoid_main_screen.png";
import { Grid, Hidden, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  btnBack: {
    position: "absolute",
    top: "2.7vh",
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

  item1: {
    backgroundColor: "red",
  },
  item2: {
    backgroundColor: "yellow",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  item1Img: {
    position: "relative",
    // border: "1px solid red",
    left: "20%",
  },

  item1ImgTitle: {
    position: "absolute",
    bottom: 10,
    right: "58%",
    transform: `translate(-50%, -50%)`,
    [theme.breakpoints.down("sm")]: {
      bottom: 10,
      right: "20%",
      // color: "red",
    },
    [theme.breakpoints.only("md")]: {
      bottom: 10,

      // color: "orange",
      right: "40%",
    },

    [theme.breakpoints.up("lg")]: {
      bottom: 10,
      right: "55%",
    },
  },
}));

function FlowChart(props) {
  const classes = useStyles();

  return (
    <BgComp1>
      {/* <div className={classes.root}></div> */}
      {/* <Link to="/learn-mid">
        <img className={classes.btnBack} src={login_button_back} />
      </Link> */}

      <Link to="/learn-mid">
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
              top: "2.2vh",
            }}
          ></img>
        </div>
      </Link>

      <img className={classes.btnHelp} src={button_help} />

      <Grid container>
        <Hidden xsDown>
          <Grid item xs={6} sm={3} />
        </Hidden>
        <Grid item xs={6} sm={3} className={classes.item1Img}>
          <Link
            to={{
              pathname: "/learn-mid/flowChart/LetCode/Enable-Servos",
              state: {
                prevPath: props.location.pathname,
              },
            }}
          >
            <img
              src={humanoid_main_screen}
              // style={{ border: "1px solid green" }}
            />
            <h3 className={classes.item1ImgTitle}>Let's go</h3>
          </Link>
        </Grid>

        {/* 2section */}
        {/* <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
        <Hidden xsDown>
          <Grid item xs={3} />
        </Hidden>
      </Grid>
    </BgComp1>
  );
}

export default FlowChart;
