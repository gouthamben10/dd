import React from "react";
import "./SelectPortBg.css";

import { Grid, Switch } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import bgImg from "../../../../Assets/learn_popup_wide.png";
import CheckBox_two from "../CheckBox2/CheckBox_two";

const useStyle = makeStyles((theme) => ({
  gridRoot: {
    height: "50%",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "50%",
      width: "100%",
      marginLeft: "-20px",
    },
  },
  humanoidImg: {
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  SwitchCheckBox: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "-1.2vw",
    },
  },
  boxes: {
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: "-15px",
    //   marginRight: "15px",
    // },

    [theme.breakpoints.down("md")]: {
      marginLeft: "-2px",
      marginRight: "15px",
      // border: "1px solid red",
    },
  },
  portContainer: {
    position: "absolute",
    height: "100%",
    width: "80%",
    marginTop: "2px",
    [theme.breakpoints.down("sm")]: {
      height: "30px",
      width: "115px",
      marginLeft: "22px",
    },
    textAlign: "center",
  },
  portContainer2: {
    height: "100%",
    marginTop: "-10px",
    color: "#98A38F",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },
  portName: {
    marginLeft: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6vw",
      marginLeft: "-20px",
    },
  },
  root: {
    top: "14px",
    [theme.breakpoints.down("sm")]: {
      top: "5px",
      width: 50,
      height: 26,
    },
  },
  track: {
    [theme.breakpoints.down("sm")]: {
      height: "10px",
    },
  },
  thumb: {
    border: "2px solid #bbbbbb",
    width: "15px",
    height: "15px",
    [theme.breakpoints.down("sm")]: {
      width: "10px",
      height: "10px",
    },
  },
  switchBase: {
    "&$checked": {
      color: "#ffffff",
    },
    "&$checked + $track": {
      backgroundColor: "#4CAF50",

      opacity: "1",
    },
  },

  checked: {},
}));

function SelectPortBg(props) {
  const classes = useStyle();

  console.log(props.value);
  console.log(props.checked1);
  return (
    <Grid container className={classes.gridRoot}>
      <img className={classes.humanoidImg} src={bgImg} />
      <div className={classes.portContainer}>
        <Grid container className={classes.portContainer2}>
          <Grid item xs={1} sm={2}>
            <h3 className={classes.portName}> {props.title1}</h3>
          </Grid>

          <Grid item xs={3} sm={2} className={classes.boxes}>
            <CheckBox_two
              title={props.title1}
              Checkhandler={props.Checkhandler}
              checked={props.checked1}
            />
          </Grid>

          <Grid item xs={2} sm={2}>
            <h3 className={classes.portName}> {props.title2}</h3>
          </Grid>

          <Grid item xs={2} sm={2} className={classes.boxes}>
            <CheckBox_two
              title={props.title2}
              Checkhandler={props.Checkhandler}
              checked={props.checked2}
            />
          </Grid>

          <Grid item xs={2} sm={2} className={classes.SwitchCheckBox}>
            <Switch
              id={props.value}
              classes={{
                root: classes.root,
                track: classes.track,
                thumb: classes.thumb,
                switchBase: classes.switchBase,
                checked: classes.checked,
              }}
              value={props.value}
              onChange={props.switchActionHandler}
              checked={props.Switchchecked}
            />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

export default SelectPortBg;
