import React from "react";
import "./SideBar.css";
import learn_popup_side_logic from "../../../../../Assets/learn_popup_side_logic.png";
import flow_start from "../../../../../Assets/learn_flow_start.png";
import flow_if from "../../../../../Assets/learn_flow_if.png";

import flow_wait from "../../../../../Assets/learn_flow_wait.png";
import flow_loop from "../../../../../Assets/learn_flow_loop.png";
import flow_output from "../../../../../Assets/learn_flow_output.png";
import flow_end_repeat from "../../../../../Assets/learn_flow_end-repeat.png";

import { makeStyles } from "@material-ui/core/styles";
import { getThemeProps } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  sideBar: {
    position: "relative",
    top: "-5px",
    left: "-5px",
    backgroundImage: `url(${learn_popup_side_logic})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundOrigin: "border-box",
    height: "480px",
    width: "200px",

    [theme.breakpoints.down("xs")]: {
      height: "500px",
      width: "150px",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function SideBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.sideBar}>
      <div className="container">
        {/* start */}
        <div
          id="StartAction"
          className="Startaction-img"
          style={{
            backgroundImage: `url(${flow_start})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          draggable="true"
          onDragStart={props.dragStart}
        ></div>

        {/* if */}
        <div
          id="IfAction"
          className="Ifaction-img"
          style={{
            backgroundImage: `url(${flow_if})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          draggable="true"
          onDragStart={props.dragStart}
        ></div>

        {/* wait */}
        <div
          id="WaitAction"
          className="Waitaction-img"
          style={{
            backgroundImage: `url(${flow_wait})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          draggable="true"
          onDragStart={props.dragStart}
        ></div>

        <div
          id="LoopAction"
          className="Loopaction-img"
          style={{
            backgroundImage: `url(${flow_loop})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          draggable="true"
          onDragStart={props.dragStart}
        ></div>

        <div
          id="OutputAction"
          className="Outputaction-img"
          style={{
            backgroundImage: `url(${flow_output})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          draggable="true"
          onDragStart={props.dragStart}
        ></div>

        <div
          id="End-RepeatAction"
          className="End-Repeataction-img"
          style={{
            backgroundImage: `url(${flow_end_repeat})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          draggable="true"
          onDragStart={props.dragStart}
        ></div>
      </div>
    </div>
  );
}

export default SideBar;
