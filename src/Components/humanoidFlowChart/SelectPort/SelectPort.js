import React, { useEffect, useState } from "react";

import "./SelectPost.css";

import BgComp2 from "../BGComponents/BG2/BgComp2";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import MenuSection4 from "../ReusableComp/MenuSection/MenuSection4";
import wifiOn from "../../../Assets/wifion.png";

import login_button_back from "../../../Assets/login_button_back.png";
import button_help from "../../../Assets/button_help.png";
import humanoidImg from "../../../Assets/humanoid_img.png";
import io_bg from "../../../Assets/learn_mid_button.png";

import closeIcon from "../../../Assets/Group_2194.png";

import next_button from "../../../Assets/learn_sliderbutton_bluebg.png";
import Descriptionbox from "../ReusableComp/Description/Descriptionbox";
import SelectPortBg from "../ReusableComp/SelectPortBg/SelectProtBg";
import PopUpcomp from "../ReusableComp/PopUpcomponents/PopUpcomp";
import illus_tut1 from "../../../Assets/illus_tut1.png";
import PopUpcomp2 from "../ReusableComp/PopUpcomponents/POPUp2/PopUpcomp2";
import { Link } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
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

  btnNextPopUP: {
    position: "absolute",
    bottom: "3%",
    right: "2%",
    height: "7%",
    width: "20%",
    textAlign: "center",
    cursor: "pointer",
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

  gridRoot: {
    width: "99%",
    marginTop: "80px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
      // border: "1px solid red",
    },
  },

  GridhumanoidImg: {
    height: "450px",
    width: "450px",
    marginLeft: "-110px",
    marginTop: "-50px",
    [theme.breakpoints.down("xs")]: {
      height: "250px",
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "-90px",
    },
  },

  checkBoxContainer1: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
    },
  },

  checkBoxContainer2: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "150px",
    },
  },

  popText: {
    color: "#311B92",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
}));

let defaultState = {
  Switch_A: false,
  A1: false,
  A2: false,
  Switch_B: false,
  B1: false,
  B2: false,
  Switch_C: false,
  C1: false,
  C2: false,
  Switch_D: false,
  D1: false,
  D2: false,
};

function SelectPort(props) {
  const classes = useStyle();

  // console.log(props);

  const [portData, setPortData] = useState(defaultState);
  const [isOpen, setIsOpen] = useState(false);

  const Checkhandler = (e) => {
    // console.log(e.target.value, "value");
    // console.log(e.target.checked, "checked");

    let value = e.target.value;
    let isChecked = e.target.checked;

    let temp = { ...portData };
    // console.log(temp[`${value}`], "got it");
    if (temp[`${value}`] == false) {
      temp[`${value}`] = true;
      setPortData(temp);
    } else {
      temp[`${value}`] = false;
      setPortData(temp);
    }

    console.log("value", value);
    console.log("isChecked", isChecked);
    console.log("temp", temp);

    // B
    if (temp.B1 == true && temp.B2 == true) {
      console.log("WORKING=========>");
      temp.Switch_B = true;
    }
    if (temp.B1 == false || temp.B2 == false) {
      console.log("WORKING=========>");
      temp.Switch_B = false;
    }

    // A
    if (temp.A1 == true && temp.A2 == true) {
      console.log("WORKING=========>");
      temp.Switch_A = true;
    }
    if (temp.A1 == false || temp.A2 == false) {
      console.log("WORKING=========>");
      temp.Switch_A = false;
    }
    // C

    if (temp.C1 == true && temp.C2 == true) {
      console.log("WORKING=========>");
      temp.Switch_C = true;
    }
    if (temp.C1 == false || temp.C2 == false) {
      console.log("WORKING=========>");
      temp.Switch_C = false;
    }

    // D
    if (temp.D1 == true && temp.D2 == true) {
      console.log("WORKING=========>");
      temp.Switch_D = true;
    }
    if (temp.D1 == false || temp.D2 == false) {
      console.log("WORKING=========>");
      temp.Switch_D = false;
    }
  };

  const switchActionHandler = (e) => {
    let isChecked = e.target.checked;
    let value = e.target.value;
    let temp = { ...portData };

    if (isChecked) {
      if (value == "A") {
        temp.A1 = true;
        temp.A2 = true;
        temp.Switch_A = true;

        setPortData(temp);
        document.getElementById("A1").checked = true;
        document.getElementById("A2").checked = true;
      }
      if (value == "B") {
        temp.B1 = true;
        temp.B2 = true;
        temp.Switch_B = true;
        setPortData(temp);
        document.getElementById("B1").checked = true;
        document.getElementById("B2").checked = true;
      }
      if (value == "C") {
        temp.C1 = true;
        temp.C2 = true;
        temp.Switch_C = true;
        setPortData(temp);
        document.getElementById("C1").checked = true;
        document.getElementById("C2").checked = true;
      }
      if (value == "D") {
        temp.D1 = true;
        temp.D2 = true;
        temp.Switch_D = true;
        setPortData(temp);
        document.getElementById("D1").checked = true;
        document.getElementById("D2").checked = true;
      }
    } else {
      if (value == "A") {
        temp.A1 = false;
        temp.A2 = false;
        temp.Switch_A = false;
        setPortData(temp);
        document.getElementById("A1").checked = false;
        document.getElementById("A2").checked = false;
      }
      if (value == "B") {
        temp.B1 = false;
        temp.B2 = false;
        temp.Switch_B = false;
        setPortData(temp);
        document.getElementById("B1").checked = false;
        document.getElementById("B2").checked = false;
      }
      if (value == "C") {
        temp.C1 = false;
        temp.C2 = false;
        temp.Switch_C = false;
        setPortData(temp);
        document.getElementById("C1").checked = false;
        document.getElementById("C2").checked = false;
      }
      if (value == "D") {
        temp.D1 = false;
        temp.D2 = false;
        temp.Switch_D = false;
        setPortData(temp);
        document.getElementById("D1").checked = false;
        document.getElementById("D2").checked = false;
      }
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  //  console.log(portData, "portData");

  useEffect(() => {
    // console.log("useEffect has been called!");
    defaultState = { ...portData };

    // console.log(defaultState, "data effect");
  }, [portData]);

  const SelectedportData = { ...portData };

  var SlectPortMainData = {
    SelectedportData,
  };

  localStorage.setItem("SelectPortData", JSON.stringify(SlectPortMainData));

  var localStorageSlectPortData = JSON.parse(
    localStorage.getItem("SelectPortData")
  );

  console.log("SelectPort: ", localStorageSlectPortData);

  useEffect(() => {}, [defaultState]);

  // console.log(localStorageSlectPortData.SelectedportData.B1, "PORT");

  return (
    <BgComp2>
      {/* <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt">
        <img className={classes.btnBack} src={login_button_back} />
      </Link> */}

      {/* <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt">
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

      <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt">
        <div className={classes.btnBottomBack}>
          <img className={classes.imgBtnBottomBack} src={next_button} />
          <p className={classes.titleBtnBottomBack}>BACK</p>
        </div>
      </Link>
      {/* Menu */}
      <Grid container className={classes.menuGrid} spacing={3}>
        <Hidden xsDown>
          <Grid item xs={4} sm={3} />
        </Hidden>
        <Grid className={classes.MenuGridItem} item xs={12} sm={7} container>
          <Grid item xs={3} sm={2} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Select Port" selectedMenu="yes" />
          </Grid>

          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Input or Output" selectedMenu="no" />
          </Grid>

          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Digital or Analog" selectedMenu="no" />
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
          <Grid item xs={3} sm={2} />
        </Hidden>
      </Grid>

      {/* content Display */}
      <Grid container className={classes.gridRoot} spacing={2}>
        <Hidden xsDown>
          <Grid item xs={2} sm={2} />
        </Hidden>

        <Grid item item xs={12} sm={8} container>
          <Grid item xs={4} sm={4} container direction="column">
            <Grid style={{ height: "20%" }} />

            <Grid item style={{ height: "50%" }} container>
              <Grid item xs={12} sm={12} className={classes.checkBoxContainer1}>
                <SelectPortBg
                  title1="B1"
                  title2="B2"
                  value="B"
                  checked1={localStorageSlectPortData.SelectedportData.B1}
                  checked2={localStorageSlectPortData.SelectedportData.B2}
                  Switchchecked={
                    localStorageSlectPortData.SelectedportData.Switch_B
                  }
                  Checkhandler={Checkhandler}
                  switchActionHandler={switchActionHandler}
                />
              </Grid>

              <Grid item xs={12} sm={12} className={classes.checkBoxContainer1}>
                <SelectPortBg
                  title1="A1"
                  title2="A2"
                  value="A"
                  checked1={localStorageSlectPortData.SelectedportData.A1}
                  checked2={localStorageSlectPortData.SelectedportData.A2}
                  Switchchecked={
                    localStorageSlectPortData.SelectedportData.Switch_A
                  }
                  Checkhandler={Checkhandler}
                  switchActionHandler={switchActionHandler}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} sm={4}>
            <img src={humanoidImg} className={classes.GridhumanoidImg} />
          </Grid>

          {/* 2port */}

          <Grid item xs={4} sm={4} container direction="column">
            <Grid style={{ height: "20%" }} />

            <Grid
              item
              style={{ height: "50%" }}
              container
              className={classes.checkBoxContainer2}
            >
              <Grid item xs={12} sm={12}>
                <SelectPortBg
                  title1="C1"
                  title2="C2"
                  value="C"
                  checked1={localStorageSlectPortData.SelectedportData.C1}
                  checked2={localStorageSlectPortData.SelectedportData.C2}
                  Switchchecked={
                    localStorageSlectPortData.SelectedportData.Switch_C
                  }
                  Checkhandler={Checkhandler}
                  switchActionHandler={switchActionHandler}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <SelectPortBg
                  title1="D1"
                  title2="D2"
                  value="D"
                  checked1={localStorageSlectPortData.SelectedportData.D1}
                  checked2={localStorageSlectPortData.SelectedportData.D2}
                  Switchchecked={
                    localStorageSlectPortData.SelectedportData.Switch_D
                  }
                  Checkhandler={Checkhandler}
                  switchActionHandler={switchActionHandler}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item item xs={2} sm={2} />
        </Hidden>
      </Grid>

      {/* Description */}
      <Grid container className={classes.homeDescriptionBox}>
        <Grid item className={classes.homeDescriptionItem}>
          <Descriptionbox />
        </Grid>
      </Grid>

      {isOpen && (
        <div className="SelectPortPopUpContainer">
          <img
            src={closeIcon}
            className="SelectPortpopUpCloseIcon"
            onClick={togglePopup}
          />

          <img
            src={illus_tut1}
            style={{
              height: "44%",
              width: "90%",
              marginTop: "5%",
              marginLeft: "5%",
            }}
          />

          <h3
            style={{ color: "#311B92", fontSize: "2vw", textAlign: "center" }}
          >
            Activate SPI Protocol to use C and D ports with Dual functionality
          </h3>

          <Link
            to={{
              pathname: "/learn-mid/flowChart/LetCode/Adjust-Tilt/input-output",
              state: {
                prevPath: props.location.pathname,
              },
            }}
          >
            <div className="SelectPortpopUpbtnYes">
              <div style={{ height: "100%", width: "100%" }}>
                <h2
                  className="SelectPortpopUpMenuStyle"
                  style={{
                    color: "#fff",
                    marginTop: "3px",
                    marginLeft: "30%",
                    fontSize: "2vw",
                  }}
                >
                  {" "}
                  NEXT
                </h2>
              </div>
            </div>
          </Link>
        </div>
      )}
    </BgComp2>
  );
}

export default SelectPort;
