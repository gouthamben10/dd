import React, { useEffect, useState } from "react";
import BgComp2 from "../BGComponents/BG2/BgComp2";

import { makeStyles } from "@material-ui/core/styles";
import wifiOn from "../../../Assets/wifion.png";

import closeIcon from "../../../Assets/Group_2194.png";

import next_button from "../../../Assets/learn_sliderbutton_bluebg.png";
import Descriptionbox from "../ReusableComp/Description/Descriptionbox";
import login_button_back from "../../../Assets/login_button_back.png";
import button_help from "../../../Assets/button_help.png";
import spi_button_bg from "../../../Assets/spi_button_bg.png";
import io_bg from "../../../Assets/io_bg.png";
import learn_popup_height from "../../../Assets/learn_popup_height.png";
import "./InputOutput.css";

import learn_sliderbutton_bluebg from "../../../Assets/learn_sliderbutton_bluebg.png";
import { Grid, Hidden, Paper } from "@material-ui/core";
import MenuSection4 from "../ReusableComp/MenuSection/MenuSection4";
import SwitchComp from "../ReusableComp/SwitchComp/SwitchComp";
import CheckBox_two from "../ReusableComp/CheckBox2/CheckBox_two";
import PopUpcomp from "../ReusableComp/PopUpcomponents/PopUpcomp";

import spi_all_selected from "../../../Assets/spi_all_selected.png";
import { Link } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  btnBack: {
    position: "absolute",
    top: "3.4vh",
    left: "5.7vw",
    height: "60px",
    width: "60px",
    cursor: "pointer",
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

  homeDescriptionBox: {
    height: "10%",
    width: "70%",
    position: "absolute",
    bottom: "10px",
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
    height: "300px",
    width: "100%",
    marginTop: "10%",
  },
  GridImg: {
    position: "relative",
    backgroundImage: `url(${spi_button_bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "85% 75%",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "100% 80%",
      marginTop: "10px",
    },
  },
  GridImg2: {
    position: "relative",
    backgroundImage: `url(${spi_all_selected})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "85% 75%",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "100% 80%",
      marginTop: "10px",
    },
  },

  leftImg: {
    position: "relative",
    backgroundImage: `url(${io_bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "180px 85%",
    marginTop: "-10px",
    marginLeft: "90px",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "85% 85%",
      marginTop: "0",
      marginLeft: "0px",
    },
  },

  switchTitleA1: {
    position: "absolute",
    top: "-5px",
    left: "40%",
    color: "#fff",
  },
  switchTitleC1: {
    position: "absolute",
    top: "-5px",
    left: "37%",
    color: "#fff",
  },

  switchTitleC2: {
    position: "absolute",
    top: "45px",
    left: "37%",
    color: "#fff",
  },

  switchTitleD1: {
    position: "absolute",
    bottom: "45px",
    left: "37%",
    color: "#fff",
  },
  switchTitleD2: {
    position: "absolute",
    bottom: "-5px",
    left: "37%",
    color: "#fff",
  },

  checkbox: {
    marginTop: "70px",
    marginLeft: "40px",
    [theme.breakpoints.down("md")]: {
      marginTop: "85px",
      marginLeft: "15px",
    },
  },
  popupRoot: {
    position: "absolute",
    height: "45%",
    width: "30%",
    [theme.breakpoints.down("md")]: {
      height: "45%",
      width: "100%",
    },
  },

  popupBtn: {
    height: "50px",
    backgroundImage: `url(${learn_sliderbutton_bluebg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "85% 75%",
    cursor: "pointer",
    marginLeft: "17px",
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
}));

let defaultState = {
  A1: false,
  A2: false,
  B1: true,
  B2: true,
  C1: false,
  C2: true,
  D1: false,
  D2: false,
  spi: false,
};

let defaultCheckedSpi = "false";

function InputOutput() {
  const classes = useStyle();

  const [portData, setPortData] = useState(defaultState);
  const [isCheck, setCheck] = useState("");
  const [switchText, setSwitchText] = useState("");
  const [colorSwitch, setColorSwitch] = useState("#6a6a6a");

  const [SpiCheck, setSpiCheck] = useState(defaultCheckedSpi);

  const yesClickHandle = () => {
    let temp = { ...portData };
    temp.C1 = "Clock";
    temp.C2 = "MOSI";
    temp.D1 = "MISO";
    temp.D2 = "RST";
    temp.spi = true;
    setSpiCheck("true");
    setPortData(temp);

    setIsOpen(!isOpen);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    document.getElementById("spi").checked = false;
  };

  const switchActionHandler = (e) => {
    let value = e.target.value;
    let isChecked = e.target.checked;

    let temp = { ...portData };

    if (e.target.checked) {
      setCheck("true");
      temp[`${value}`] = true;
      // console.log(temp, "tempDATA");
      setPortData(temp);
    } else {
      setColorSwitch("#311B92");
      temp[`${value}`] = false;

      // console.log(temp, "tempDATA");
      setPortData(temp);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const Checkhandler = (e) => {
    // console.log(e.target.checked, "checked box");

    if (e.target.checked) {
      // opeing popUp box
      setIsOpen(!isOpen);
    } else {
      setSpiCheck("false");

      let temp = { ...portData };
      temp.C1 = "input";
      temp.C2 = "output";
      temp.D1 = "input";
      temp.D2 = "input";
      temp.spi = false;
      setPortData(temp);
    }
  };

  useEffect(() => {
    defaultState = { ...portData };
  }, [portData]);

  useEffect(() => {
    defaultCheckedSpi = SpiCheck;
  }, [SpiCheck]);

  const InputOutputData = { ...portData };

  var SlectInputOutputData = {
    InputOutputData,
  };

  localStorage.setItem(
    "SlectInputOutputData",
    JSON.stringify(SlectInputOutputData)
  );

  var localStorageSlectInputOutputData = JSON.parse(
    localStorage.getItem("SlectInputOutputData")
  );

  console.log("InputOrOutput: ", localStorageSlectInputOutputData);

  // console.log(switchText, " switchText value");
  // console.log(isCheck, " isCheck value");
  // console.log(portData, "portData STATE");

  return (
    <BgComp2>
      {/* <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/selectPort">
        <img className={classes.btnBack} src={login_button_back} />
      </Link> */}

      {/* <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/selectPort">
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
        <Link
          to={{
            pathname: "/learn-mid/flowChart/LetCode/Adjust-Tilt/digital-analog",
            dataInputOutput: portData,
          }}
        >
          <img className={classes.imgNextBtn} src={next_button} />
          <p className={classes.titleNextBtn}>NEXT</p>
        </Link>
      </div>
      <Link to="/learn-mid/flowChart/LetCode/Adjust-Tilt/selectPort">
        <div className={classes.btnBottomBack}>
          <img className={classes.imgBtnBottomBack} src={next_button} />
          <p className={classes.titleBtnBottomBack}>BACK</p>
        </div>
      </Link>
      {/* Menu bar */}
      <Grid container className={classes.menuGrid} spacing={1}>
        <Hidden xsDown>
          <Grid item xs={4} sm={3} />
        </Hidden>
        <Grid className={classes.MenuGridItem} item xs={12} sm={7} container>
          <Grid item xs={3} sm={2} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Select port" selectedMenu="no" />
          </Grid>

          <Grid item xs={3} sm={3} style={{ marginRight: "5px" }}>
            <MenuSection4 title="Input or output" selectedMenu="yes" />
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

      {/* Container */}
      <Grid container spacing={3} className={classes.GridRoot}>
        <Hidden xsDown={"sm"}>
          <Grid item xs={3} />
        </Hidden>
        <Grid item xs={6} sm={3} container direction="row">
          <Grid item xs={12} className={classes.leftImg}>
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "17px",
              }}
            >
              <SwitchComp
                switchActionHandler={switchActionHandler}
                title="A1"
                switchColor={colorSwitch}
                checked={localStorageSlectInputOutputData.InputOutputData.A1}
              />
            </div>

            <div
              style={{
                position: "absolute",
                top: "60px",
                left: "17px",
              }}
            >
              <SwitchComp
                switchActionHandler={switchActionHandler}
                title="A2"
                switchColor={colorSwitch}
                checked={localStorageSlectInputOutputData.InputOutputData.A2}
              />
            </div>
          </Grid>
          <Grid item xs={12} className={classes.leftImg}>
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "17px",
              }}
            >
              <SwitchComp
                // switchActionHandler={switchActionHandler}
                title="B1"
                switchColor={colorSwitch}
                checked="checked"
              />

              {/* <h5 className={classes.switchTitleA1}>{portData.B1}</h5> */}
            </div>

            <div
              style={{
                position: "absolute",
                top: "60px",
                left: "17px",
              }}
            >
              <SwitchComp
                // switchActionHandler={switchActionHandler}
                title="B2"
                switchColor={colorSwitch}
                checked="checked"
              />
            </div>
          </Grid>
        </Grid>

        {SpiCheck == "false" ? (
          <Grid
            item
            xs={6}
            sm={3}
            container
            className={classes.GridImg}
            direction="column"
            spacing={3}
          >
            <div className={classes.checkbox}>
              <CheckBox_two
                title="spi"
                Checkhandler={Checkhandler}
                checked={localStorageSlectInputOutputData.InputOutputData.spi}
              />
            </div>

            <div
              style={{
                height: "120px",
                width: "150px",
                position: "absolute",
                top: "1%",
                left: "35%",
              }}
            >
              <SwitchComp
                switchActionHandler={switchActionHandler}
                title="C1"
                switchColor={colorSwitch}
                checked={localStorageSlectInputOutputData.InputOutputData.C1}
              />

              <div style={{ position: "absolute", top: "30%", left: "0" }}>
                <SwitchComp
                  // switchActionHandler={switchActionHandler}
                  title="C2"
                  switchColor={colorSwitch}
                  checked="checked"
                />
              </div>

              {/* <h5 className={classes.switchTitleC2}>{portData.C2}</h5> */}
            </div>

            <div
              style={{
                height: "100px",
                width: "150px",
                position: "absolute",
                top: "45%",
                left: "35%",
              }}
            >
              <SwitchComp
                switchActionHandler={switchActionHandler}
                title="D1"
                switchColor={colorSwitch}
                checked={localStorageSlectInputOutputData.InputOutputData.D1}
              />

              <div style={{ position: "absolute", top: "35%", left: "0" }}>
                <SwitchComp
                  switchActionHandler={switchActionHandler}
                  title="D2"
                  switchColor={colorSwitch}
                  checked={localStorageSlectInputOutputData.InputOutputData.D2}
                />
              </div>
            </div>
          </Grid>
        ) : (
          <Grid
            item
            xs={6}
            sm={3}
            container
            className={classes.GridImg2}
            direction="column"
            spacing={3}
          >
            <div className={classes.checkbox}>
              <CheckBox_two
                title="spi"
                Checkhandler={Checkhandler}
                checked={localStorageSlectInputOutputData.InputOutputData.D2}
              />
            </div>
            <div
              className={classes.img2Details}
              style={{ color: "#311B92", marginTop: "20px" }}
            >
              <h3> C1 -&gt; Clock</h3>
              <h3> C2 -&gt; MOSI</h3>
              <h3> D1 -&gt; MISO</h3>
              <h3> D2 -&gt; RST</h3>
            </div>
          </Grid>
        )}

        <Hidden xsDown={"sm"}>
          <Grid item xs={3} />
        </Hidden>
      </Grid>

      {/* Description */}
      <Grid container className={classes.homeDescriptionBox}>
        <Grid item className={classes.homeDescriptionItem}>
          <Descriptionbox />
        </Grid>
      </Grid>

      {/* pop up */}

      {isOpen && (
        <>
          <div className="inputOutputPopupContainer"></div>
          <div className="inputOutputPopupMain">
            <img
              src={closeIcon}
              className="inputOutputPopupCloseIcon"
              onClick={togglePopup}
            />

            <div className="inputOutputPopupTExt">
              Activating SPI Protocol will enable C and D ports Continue?
            </div>
            <div className="inputOutputPopupbtn" onClick={yesClickHandle}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 className="popUpMenuStyle1"> Yes</h2>
              </div>
            </div>

            <div className="inputOutputPopupbtn" onClick={togglePopup}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 className="inputOutputpopUpMenuStyle1"> No</h2>
              </div>
            </div>
          </div>
        </>
      )}

      {/* {isOpen && 
      (
        <PopUpcomp
          handleClose={togglePopup}
          height="250px"
          width="300px"
          heightXS="250px"
          widthXS="300px"
          margin="100px 0 0 490px"
          marginXS="30px 0 0 40px"
          marginClose="0 0 0 65px"
          marginCloseSM="0 0 0 100px"
          popupBg={io_bg}
          content={
            <Grid
              container
              direction="column"
              spacing={3}
              className={classes.popupRoot}
              direction="row"
            >
              <Grid item xs={12}>
                <div
                  style={{
                    color: "orange",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "100px",
                  }}
                >
                  <p>Activating SPI Protocol will</p>
                  <p>enable C and D ports</p>
                  <p>Continue?</p>
                </div>{" "}
              </Grid>

              <Grid item container direction="row">
                <Grid item xs="6">
                  <div className={classes.popupBtn} onClick={yesClickHandle}>
                    <p
                      style={{
                        position: "absolute",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "bold ",
                        marginTop: "5px",
                        marginLeft: "30px",
                      }}
                    >
                      Yes
                    </p>
                  </div>
                </Grid>
                <Grid item xs="6">
                  <div className={classes.popupBtn} onClick={togglePopup}>
                    <p
                      style={{
                        position: "absolute",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "bold ",
                        marginTop: "5px",
                        marginLeft: "40px",
                        cursor: "pointer",
                      }}
                    >
                      {" "}
                      No
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          }
        />
      )} */}
    </BgComp2>
  );
}

export default InputOutput;
