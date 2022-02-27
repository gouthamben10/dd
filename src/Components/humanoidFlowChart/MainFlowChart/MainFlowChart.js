import React from "react";
import BgComp2 from "../BGComponents/BG2/BgComp2";
import "./MainFlowChart.css";
import Grid from "@material-ui/core/Grid";
import wifion from "../../../Assets/wifion.png";
import learn_button_save from "../../../Assets/learn_button_save.png";
import learn_button_settings from "../../../Assets/learn_button_settings.png";
import learn_button_upload from "../../../Assets/learn_button_upload.png";
import Paper from "@material-ui/core/Paper";
import buttonBg from "../../../Assets/learn_sliderbutton_bluebg.png";
import learn_mid_popup_bottom from "../../../Assets/learn_mid_popup_bottom.png";

import { makeStyles } from "@material-ui/core/styles";

import SideBar from "./panels/SideBar/SideBar";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  wifion: {
    height: "11vh",
    width: "5vw",
    position: "absolute",
    top: "0%",
    right: "30%",
    backgroundImage: `url(${wifion})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    marginTop: "-10px",

    [theme.breakpoints.down("xs")]: {
      height: "10vh",
      width: "10vw",
    },
  },

  menuContiner: {
    height: "70px",
    width: "20%",
    position: "absolute",
    top: "2%",
    right: "5%",
  },

  menu: {
    height: "90px",
    width: "90px",
    [theme.breakpoints.down("sm")]: {
      height: "60px",
      width: "60px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "45px",
      width: "45px",
      marginLeft: "-20px",
    },
  },

  btnBottomBack: {
    position: "absolute",
    bottom: "4vh",
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

  popup_bottom: {
    position: "absolute",
    bottom: "0%",
    left: "20%",
    height: "100px",
    width: "65%",
    backgroundImage: `url(${learn_mid_popup_bottom})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "20px",
      height: "150px",
      width: "70%",
    },
  },
}));

function MainFlowChart() {
  const classes = useStyles();

  const dragStart = (e) => {
    // console.log(e.target.id);
    e.dataTransfer.setData("text", e.target.id);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };
  const drop = (e) => {
    const draggableElementData = e.dataTransfer.getData("text");
    console.log(draggableElementData, "Drag-Item");

    console.log(document.getElementById(`${draggableElementData}`));

    // e.target.appendChild(document.getElementById(draggableElementData)).st;
    // console.log("data", data);

    e.target.insertAdjacentHTML("beforeend", `<span><h1>soumitya</h1></span>`);
  };

  return (
    <div
      // style={{ height: "100vh", width: "100vw", border: "1px solid black" }}
      onDrop={drop}
      onDragOver={allowDrop}
    >
      <BgComp2>
        {/* sideBar */}
        <SideBar dragStart={dragStart} />

        {/* wifi */}
        <div className={classes.wifion} />

        {/* menu */}
        <div className={classes.menuContiner}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <img src={learn_button_save} className={classes.menu} />
            </Grid>
            <Grid item xs={4}>
              <img src={learn_button_upload} className={classes.menu} />
            </Grid>
            <Grid item xs={4}>
              <img src={learn_button_settings} className={classes.menu} />
            </Grid>
          </Grid>
        </div>

        {/* backBtn */}
        <div className={classes.btnBottomBack}>
          <img className={classes.imgBtnBottomBack} src={buttonBg} />
          <p className={classes.titleBtnBottomBack}>Back</p>
        </div>

        {/* learn_mid_popup_bottom */}
        <div className={classes.popup_bottom}></div>

        <div></div>
      </BgComp2>
    </div>
  );
}

export default MainFlowChart;
