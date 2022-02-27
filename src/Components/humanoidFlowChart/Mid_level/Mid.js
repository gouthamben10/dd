import React, { useState } from "react";

import BgComp1 from "../BGComponents/BG1/BgComp1";

import learn_illus_hexagonal from "../../../Assets/learn_illus_hexagonal.png";
import learn_illus_flowchart from "../../../Assets/learn_illus_flowchart.png";
import learn_illus_scratch from "../../../Assets/learn_illus_scratch.png";
import opptionLayout from "../../../Assets/learn_basic_button_level.png";
import login_button_back from "../../../Assets/login_button_back.png";
import button_help from "../../../Assets/button_help.png";
import next_button from "../../../Assets/learn_sliderbutton_bluebg.png";
// import Descriptionbox from "../ReusableComp/DescriptionBox/Descriptionbox";

import { makeStyles } from "@material-ui/core/styles";
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
    top: "2.7vh",
    left: "5.7vw",
    height: "60px",
    width: "60px",

    [theme.breakpoints.down("md")]: {
      height: "60px",
      width: "60px",
    },
  },
  btntxt: {
    position: "absolute",
    top: "1%",
    left: "12%",
    color: "#311B92",
    fontSize: "2vw",
    [theme.breakpoints.down("md")]: {
      fontSize: "2vw",
    },
  },

  homeDescriptionBox: {
    height: "10%",
    width: "70%",
    position: "absolute",
    bottom: "30px",
    left: "15%",
  },
  homeDescriptionItem: {
    height: "100%",
    width: "100%",
  },
}));

function Mid(props) {
  const classes = useStyles();

  console.log(props);

  let [desDetails, setDesDetails] = useState("");

  const modeDesc = (data) => {
    console.log("*******", data, "********");

    switch (data) {
      case "hexagonal": {
        console.log("GOT HEXAGONAL DETAILIS");
        setDesDetails("Hexagonal programming structure");
        break;
      }
      case "flowChart": {
        console.log("GOT flowchart DETAILIS");
        // enale them while enabling flowchart
        // setDesDetails("Flowchart programming structure");

        break;
      }
      case "scratch": {
        console.log("GOT scratch DETAILIS");

        setDesDetails("GOT scratch DETAILIS");
        break;
      }

      // case "empty": {
      //   console.log("======= EMPTY ==========");

      //   setDesDetails("");
      //   break;
      // }

      default: {
        setDesDetails("");
      }
    }
  };

  return (
    <BgComp1>
      {/* <Link to="/selection">
        <img className={classes.btn} src={login_button_back} />
        <h1 className={classes.btntxt}>Mid</h1>
      </Link> */}

      <Link to="/Selection">
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
            alt="asdsaf"
          ></img>
          <div
            style={{
              height: "30px",
              width: "168px",
              position: "absolute",
              /* display: inline-block, */
              float: "left",
              left: "3%",
              top: "2.5%",
              border: "2px solid #100a5e",
              borderRadius: "10px 50px 50px 10px",
              textAlign: "center",
              color: "#2c258a",
              fontSize: "large",
            }}
          >
            <span style={{ position: "relative", left: "0%", top: "7%" }}>
              MID
            </span>
          </div>
        </div>
      </Link>

      <Grid container className={classes.root} spacing={3}>
        <Hidden xsDown>
          <Grid item xs={0} sm={3}>
            <div></div>
          </Grid>
        </Hidden>

        {/* TO ADD SCRATCH BLOCK JUST REMOVE BELOW HIDDEN AND UNCOMMENT LINE 223 */}

        <Hidden xsDown>
          <Grid item xs={4} sm={1}>
            <div></div>
          </Grid>
        </Hidden>

        <Hidden xsDown>
          <Grid item xs={4} sm={1}>
            <div></div>
          </Grid>
        </Hidden>

        <Grid item xs={4} sm={2} className={classes.item1}>
          <Link
            to="/programSelection"
            onMouseOver={() => modeDesc("hexagonal")}
            onMouseOut={() => modeDesc("empty")}
          >
            <LevelConatiner
              title="Hexagonal"
              img={learn_illus_hexagonal}
              // description1="Description about"
              // description2="the model"
              opptionLayout={opptionLayout}
            />
          </Link>
        </Grid>

        {/* <Grid item xs={4} sm={2}>
          {sessionStorage.getItem("connectedDevice") === "Humanoid" ? (
            <Link
              to={{
                pathname: "/learn-mid/flowChart",
                state: {
                  prevPath: props.location.pathname,
                },
              }}
              // onMouseOver={() => modeDesc("flowChart")}
              // onMouseOut={() => modeDesc("empty")}
            >
              <LevelConatiner
              disable="disable"
                title="Flow Chart"
                img={learn_illus_flowchart}
                // description1="Description about"
                //description2="the model"
                opptionLayout={opptionLayout}
              />
            </Link>
          ) : (
            <Link
              to={{
                pathname: "/serve-flow",
                state: {
                  prevPath: props.location.pathname,
                },
              }}
              onMouseOver={() => modeDesc("flowChart")}
              onMouseOut={() => modeDesc("empty")}
            >
              <LevelConatiner
                title="Flow Chart"
                img={learn_illus_flowchart}
                // description1="Description about"
                //description2="the model"
                opptionLayout={opptionLayout}
              />
            </Link>
          )}
        </Grid> */}

        <Grid item xs={4} sm={2}>
          <div
            onMouseOver={() => modeDesc("scratch")}
            onMouseOut={() => modeDesc("empty")}
          >
            <LevelConatiner
              title="Scratch"
              img={learn_illus_scratch}
              //description1="Description about"
              //description2="the model"
              opptionLayout={opptionLayout}
            />
          </div>
        </Grid>

        <Hidden xsDown>
          <Grid item xs={0} sm={3}>
            <div></div>
          </Grid>
        </Hidden>
      </Grid>

      <Grid
        container
        className={classes.homeDescriptionBox}
        // style={{ border: "1px solid red" }}
      >
        <Grid item className={classes.homeDescriptionItem}>
          <Descriptionbox details={desDetails} />
        </Grid>
      </Grid>
    </BgComp1>
  );
}

export default Mid;
