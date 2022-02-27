import React, { useEffect, useState } from "react";
import "./Humanoid.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import humanoid_img from "../../../Assets/humanoid_img.png";
import SwitchBtn from "@material-ui/core/Switch";

import camera_options from "../../../Assets/camera_options.png";

import CheckBoxHumanoid from "../ReusableComp/CheckBoxHumanoid/CheckBoxHumanoid";

const useStyles = makeStyles((theme) => ({
  Gridroot: {
    marginTop: "60px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  ImageContainer: {
    position: "relative",
  },
  humanoidImg: {
    height: "450px",
    width: "450px",
    marginLeft: "-40px",
    marginTop: "-50px",
    [theme.breakpoints.only("xs")]: {
      height: "160%",
      width: "160%",
    },
  },

  root: {
    margin: "20% auto",
    // width: "80%",
    // height: "50%",
    padding: 0,
    transform: "rotate(-270deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "-10px",
    },
  },
  // height and width and radius  of switch
  track: {
    width: "80px",
    height: "30px",
    borderRadius: "50px",
    backgroundColor: "#311B92",
    opacity: 1,

    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "15px",
    },
  },
  // white ball
  thumb: {
    width: "22px",
    height: "22px",
    marginLeft: "-5px",
    marginTop: "-1px",
  },
  switchBase: {
    // white ball color
    // color: blue[300],
    //working
    "&$checked": {
      transform: "translateX(16px)",

      color: "#ffffff",
    },
    "&$checked + $track": {
      backgroundColor: "green",
      opacity: 1,
    },
  },

  checked: {
    marginLeft: "10px",
  },

  OPtiontext1: {
    marginLeft: "5px",
    fontSize: "13px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5px",
      fontSize: "8px",
    },
  },
}));

var EnableServosMainData;

let defaultstate = {
  head: false,
  is1: false,
  is2: false,
  is3: false,
  is4: false,
  is5: false,
  is6: false,
  is7: false,
  is8: false,
  is9: false,
  is10: false,
  is11: false,
  is12: false,
  is13: false,
  is14: false,
  is15: false,
  is16: false,
};

let defaultRecognition = "Image Recognition";

let defaultCameraOptionSwitch = false;

function Humanoid() {
  const classes = useStyles();

  const [allCheckData, setAllCheckedData] = useState(defaultstate);
  const [headEnable, setHeadEnable] = useState(false);
  const [headSwitch, setHeadSwitch] = useState(defaultRecognition);
  const [cameraOptionSwitch, setCameraOptionSwitch] = useState(
    defaultCameraOptionSwitch
  );

  const onCheckBoxSelect = (e) => {
    // console.log(e.target.value, "effect occure CHECK-BOX value");

    if (e.target.checked) {
      let temp = { ...allCheckData };

      temp[`${e.target.value}`] = true;
      // console.log(temp, "tempDATA True");
      setAllCheckedData(temp);

      if (e.target.value === "head") {
        setHeadEnable(true);
        document.getElementById("EnableServosSwitchBtn").style.cursor =
          "pointer";
      }
    } else {
      let temp = { ...allCheckData };

      temp[`${e.target.value}`] = false;
      setAllCheckedData(temp);

      if (e.target.value === "head") {
        document.getElementById("EnableServosSwitchBtn").style.cursor =
          "not-allowed";

        setHeadEnable(false);
        setHeadSwitch("");
      }
    }
  };

  const setPrivateSwap = (e) => {
    if (e.target.checked === true) {
      setHeadSwitch("Color Recognition");
      setCameraOptionSwitch(true);
    } else {
      setHeadSwitch("Image Recognition");
      setCameraOptionSwitch(false);
    }
  };

  const SelectedCheckBox = { ...allCheckData };
  const SelectedHeadSwitch = headSwitch;
  const SelectCameraOptionSwitch = cameraOptionSwitch;

  // defaultState
  useEffect(() => {
    console.log("useEffect has been called! Humanoid");
    defaultstate = { ...allCheckData };
  }, [allCheckData]);

  // defaultRecognation
  useEffect(() => {
    defaultRecognition = headSwitch;
  }, [headSwitch]);

  // Switch
  useEffect(() => {
    defaultCameraOptionSwitch = cameraOptionSwitch;
  }, [cameraOptionSwitch]);

  EnableServosMainData = {
    SelectedCheckBox,
    SelectedHeadSwitch,
    SelectCameraOptionSwitch,
  };

  localStorage.setItem(
    "EnableServosData",
    JSON.stringify(EnableServosMainData)
  );

  var localStorageEnableServosData = JSON.parse(
    localStorage.getItem("EnableServosData")
  );

  console.log("HumanoidData: ", localStorageEnableServosData);

  return (
    <div className={classes.Gridroot}>
      <Grid container spacing={3}>
        <Grid item xs={6} container className={classes.ImageContainer}>
          <div className="mainImgContainer">
            <img src={humanoid_img} className={classes.humanoidImg} />
            <div className="humanoidGridContainer">
              <div className="GridRow1">
                <CheckBoxHumanoid
                  width="23px"
                  height="23px"
                  title="head"
                  onCheckBoxSelect={onCheckBoxSelect}
                  isChecked={localStorageEnableServosData.SelectedCheckBox.head}
                />
              </div>

              <div className="GridRow2">
                <div className="checkBox15">
                  <CheckBoxHumanoid
                    title="is15"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is15
                    }
                  />
                </div>
                <div className="checkBox16">
                  <CheckBoxHumanoid
                    title="is16"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is16
                    }
                  />
                </div>

                <div className="checkBox8">
                  <CheckBoxHumanoid
                    title="is8"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is8
                    }
                  />
                </div>

                <div className="checkBox7">
                  <CheckBoxHumanoid
                    title="is7"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is7
                    }
                  />
                </div>
              </div>

              <div className="GridRow3">
                <div className="checkBox14">
                  <CheckBoxHumanoid
                    title="is14"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is14
                    }
                  />
                </div>

                <div className="checkBox13">
                  <CheckBoxHumanoid
                    title="is13"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is13
                    }
                  />
                </div>
                <div className="checkBox5">
                  <CheckBoxHumanoid
                    title="is5"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is5
                    }
                  />
                </div>

                <div className="checkBox6">
                  <CheckBoxHumanoid
                    title="is6"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is6
                    }
                  />
                </div>
              </div>

              <div className="GridRow4">
                <div className="checkBox12">
                  <CheckBoxHumanoid
                    title="is12"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is12
                    }
                  />
                </div>
                <div className="checkBox4">
                  <CheckBoxHumanoid
                    title="is4"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is4
                    }
                  />
                </div>
              </div>

              <div className="GridRow5">
                <div className="checkBox11">
                  <CheckBoxHumanoid
                    title="is11"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is11
                    }
                  />
                </div>
                <div className="checkBox3">
                  <CheckBoxHumanoid
                    title="is3"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is3
                    }
                  />
                </div>
              </div>

              <div className="GridRow6">
                <div className="checkBox10">
                  <CheckBoxHumanoid
                    title="is10"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is10
                    }
                  />
                </div>
                <div className="checkBox2">
                  <CheckBoxHumanoid
                    title="is2"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is2
                    }
                  />
                </div>
              </div>

              <div className="GridRow7">
                <div className="checkBox9">
                  <CheckBoxHumanoid
                    title="is9"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is9
                    }
                  />
                </div>
                <div className="checkBox1">
                  <CheckBoxHumanoid
                    title="is1"
                    onCheckBoxSelect={onCheckBoxSelect}
                    isChecked={
                      localStorageEnableServosData.SelectedCheckBox.is1
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={6} className="mainContainerCamera">
          {/* {headEnable ? console.log("yes") : console.log("no")} */}

          {headEnable ||
          localStorageEnableServosData.SelectedCheckBox.head == true ? (
            <div className="EnableServosCamera">
              <img className="camer_option" src={camera_options} />
              <div id="camer_option_details">
                <div className="camer_option_details1">
                  <p className="camer_option_title">Enable Camera</p>
                </div>
                <div className="camer_option_details2">
                  <p className="camer_option_description">
                    <p className={classes.OPtiontext1}> Image Recognition</p>
                    <p className={classes.OPtiontext1}>Color Recognition</p>
                  </p>

                  <div id="EnableServosSwitchBtn">
                    <SwitchBtn
                      checked={
                        localStorageEnableServosData.SelectCameraOptionSwitch
                      }
                      id="checkBtnMui"
                      onChange={setPrivateSwap}
                      classes={{
                        root: classes.root,
                        track: classes.track,
                        thumb: classes.thumb,
                        switchBase: classes.switchBase,
                        checked: classes.checked,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="EnableServosCamera">
              <img className="camer_option" src={camera_options} />
              <div id="camer_option_details">
                <div className="camer_option_details1">
                  <p className="camer_option_title">Enable Camera</p>
                </div>
                <div className="camer_option_details2">
                  <p className="camer_option_description">
                    <p className={classes.OPtiontext1}> Image Recognition</p>
                    <p className={classes.OPtiontext1}>Color Recognition</p>
                  </p>

                  <div id="EnableServosSwitchBtn">
                    <SwitchBtn
                      classes={{
                        root: classes.root,
                        track: classes.track,
                        thumb: classes.thumb,
                        switchBase: classes.switchBase,
                        // checked: classes.checked,
                      }}
                      disabled
                    />
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          )}
        </Grid>
      </Grid>
      {/* <div className="humanoidGridContainer">ASD</div> */}
    </div>
  );
}

export default Humanoid;
