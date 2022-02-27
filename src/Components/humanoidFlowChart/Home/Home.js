import React from "react";
import "./home.css";

import BgComp1 from "../BGComponents/BG1/BgComp1";

import learn_illus_basic from "../../../Assets/learn_illus_basic.png";
import learn_illus_mid from "../../../Assets/learn_illus_mid.png";
import learn_illus_advanced from "../../../Assets/learn_illus_advanced.png";
import opptionLayout from "../../../Assets/learn_button.png";
import login_button_back from "../../../Assets/login_button_back.png";
import button_help from "../../../Assets/button_help.png";
import next_button from "../../../Assets/learn_sliderbutton_bluebg.png";
// import Descriptionbox from "../ReusableComp/DescriptionBox/Descriptionbox";

import { makeStyles } from "@material-ui/styles";
import { Grid, Hidden } from "@material-ui/core";
import LevelConatiner from "../ReusableComp/LevelContainer/LevelContainer";
import Descriptionbox from "../ReusableComp/Description/Descriptionbox";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },

  btn: {
    position: "absolute",
    top: "2%",
    left: "2%",
    height: "85px",
    width: "85px",
  },
  btntxt: {
    position: "absolute",
    top: "1%",
    left: "120px",
    color: "#311B92",
  },

  homeDescriptionBox: {
    height: "10%",
    width: "70%",
    position: "absolute",
    bottom: "10px",
    left: "15%",
  },
  homeDescriptionItem: {
    height: "100%",
    width: "100%",
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <BgComp1>
      <img className={classes.btn} src={login_button_back} />
      <h1 className={classes.btntxt}>Learn</h1>

      <Grid container className={classes.root} spacing={3}>
        <Hidden xsDown>
          <Grid item xs={0} sm={3}>
            <div></div>
          </Grid>
        </Hidden>

        <Grid item xs={4} sm={2}>
          <LevelConatiner
            title="Basic"
            img={learn_illus_basic}
            // description1="Description about"
            // description2="the model"
            opptionLayout={opptionLayout}
          />
        </Grid>

        <Grid item xs={4} sm={2}>
          <Link to="/learn-mid">
            <LevelConatiner
              title="Mid"
              img={learn_illus_mid}
              // description1="Description about"
              // description2="the model"
              opptionLayout={opptionLayout}
            />
          </Link>
        </Grid>

        <Grid item xs={4} sm={2}>
          <LevelConatiner
            title="Advanced"
            img={learn_illus_advanced}
            // description1="Description about"
            // description2="the model"
            opptionLayout={opptionLayout}
          />
        </Grid>

        <Hidden xsDown>
          <Grid item xs={0} sm={3}>
            <div></div>
          </Grid>
        </Hidden>
      </Grid>

      <Grid container className={classes.homeDescriptionBox}>
        <Grid item className={classes.homeDescriptionItem}>
          <Descriptionbox />
        </Grid>
      </Grid>
    </BgComp1>
  );
}

export default Home;
