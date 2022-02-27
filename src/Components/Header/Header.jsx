import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter, useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import {
  HeaderContainer,
  HeaderOptions,
  HeaderLinksContainer,
  HeaderWifiImage,
  HeaderBackButton,
  // HeaderHelp,
} from "./Header.style";
import ListComponent from "../ListComponent/ListComponent";

import "./Header.scss";

const useStyles = makeStyles({
  root: {
    position: "relative",
    bottom: "5px",
  },

  sideImages: {
    position: "relative",
    top: "12px",
  },
});

const Header = (props) => {
  const [click] = React.useState(true);
  const handleClick = (e) => {
    if (click) {
      e.preventDefault();
    }
  };
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const settingsButton = () => {
    setShow(!show);
  };

  const history = useHistory();
  const back = () => {
    console.log(history.location.pathname);
    if (history.location.pathname === "/") {
      return null;
    } else if (history.location.pathname === "/input-output") {
      history.push("/serve-flow");
    } else if (history.location.pathname === "/digital-analog") {
      history.push("/input-output");
    } else if (history.location.pathname === "/flowchart") {
      history.push("/digital-analog");
    } else if (history.location.pathname === "/serve-flow") {
      //   history.push("/midProgramming");  chnage By SOUMITYA
      history.push("/learn-mid");
    }
  };

  console.log(history.location.pathname);

  if (history.location.pathname === "/flowchart") {
    return (
      <>
        <Grid container wrap="nowrap">
          <Grid item xs={6} sm={8} lg={8} />
          <Grid item className={classes.root}>
            <img
              src={
                process.env.PUBLIC_URL + "/images/header/bluetooth_inactive.png"
              }
              alt="logo"
              width="55"
            />
          </Grid>
          <Grid item className={classes.sideImages}>
            <img
              src={process.env.PUBLIC_URL + "/images/flowcharts/convert.png"}
              alt="pic"
              width="70"
              spacing={2}
            />
          </Grid>
          <Grid item className={classes.sideImages}>
            <img
              src={process.env.PUBLIC_URL + "/images/flowcharts/save.png"}
              alt="pic"
              width="70"
            />
          </Grid>
          <Grid item className={classes.sideImages}>
            <img
              src={process.env.PUBLIC_URL + "/images/flowcharts/upload.png"}
              alt="pic"
              width="70"
            />
          </Grid>
          {show ? (
            <ListComponent show={() => settingsButton()} />
          ) : (
            <Grid
              item
              className={classes.sideImages}
              onClick={() => settingsButton()}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/flowcharts/settings.png"}
                alt="pic"
                width="70"
              />
            </Grid>
          )}
        </Grid>
      </>
    );
  } else {
    return (
      <HeaderContainer>
        {props.topbackbtnVisibility == "false" ? null : (
          <div onClick={back}>
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
          </div>
        )}

        <div
        // style={{
        // cursor: "pointer",

        // width: "58px",
        // height: "58px",
        // position: "absolute",
        // top: "3vh",
        // left: "5.8vw",
        // zIndex: 999,
        // backgroundImage:
        //   "url(" +
        //   process.env.PUBLIC_URL +
        //   `/images/login/login_button_back.png` +
        //   ")",

        // backgroundRepeat: "no-repeat",
        // backgroundSize: "100% 100%",
        // }}
        // onClick={back}
        >
          {/* <img
            src={process.env.PUBLIC_URL + "/images/login/login_button_back.png"}
            height="100%"
            width="100%"
          /> */}
          {/* <HeaderBackButton
            onClick={back}
            src={process.env.PUBLIC_URL + "/images/login/login_button_back.png"}
            alt="back"
          /> */}
        </div>

        <HeaderOptions>
          <HeaderLinksContainer
            to="/serve-flow"
            onClick={handleClick}
            activeClassName="is-active"
            exact
          >
            Select ports
          </HeaderLinksContainer>

          <HeaderLinksContainer
            onClick={handleClick}
            to="/input-output"
            activeClassName="is-active"
          >
            Input or Output
          </HeaderLinksContainer>
          <HeaderLinksContainer
            onClick={handleClick}
            to="/digital-analog"
            activeClassName="is-active"
          >
            Digital or Analog
          </HeaderLinksContainer>
          <HeaderLinksContainer
            onClick={handleClick}
            to="/flowchart"
            activeClassName="is-active"
          >
            Flowchart
          </HeaderLinksContainer>
          <HeaderWifiImage
            src={
              process.env.PUBLIC_URL + "/images/header/bluetooth_inactive.png"
            }
            alt="logo"
          />
        </HeaderOptions>
        {/* <HeaderHelp src={process.env.PUBLIC_URL + '/images/login/button_help.png'}
                     alt="back" width="90"/> */}
      </HeaderContainer>
    );
  }
};

export default withRouter(Header);
