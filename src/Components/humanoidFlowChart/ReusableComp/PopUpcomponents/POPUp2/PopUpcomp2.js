import React from "react";
import "./PopUpcomp2.css";

import { makeStyles } from "@material-ui/core/styles";

import closeIcon from "../../../../../Assets/Group_2194.png";

const useStyles = makeStyles((theme) => ({
  box: (props) => {
    return {
      position: "relative",
      margin: " 65px auto",
      // height: `${props.height}`,
      // width: `${props.width}`,
      // height: "250px",
      // width: "150px",
      [theme.breakpoints.down("sm")]: {
        // top: "30px",
        // left: "-100px",
        // height: `calc(${props.height}`,
        // width: `${props.width}`,
      },
    };
  },
  boxBgImg: (props) => {
    return {
      position: "relative",
      height: `${props.height}`,
      width: `${props.width}`,
      margin: `${props.margin}`,
      [theme.breakpoints.down("sm")]: {
        height: `${props.heightXS}`,
        width: `${props.widthXS}`,
        margin: `${props.marginXS}`,
      },
    };
  },
  close: (props) => {
    return {
      position: "absolute",
      left: "50%",
      height: "70px",
      width: "70px",

      margin: `${props.marginClose}`,
      [theme.breakpoints.down("sm")]: {
        top: 0,
        left: "50%",
        margin: `${props.marginCloseSM}`,
      },
    };
  },

  content: {
    position: "absolute",
    top: "0%",
    height: "60%",
    width: "55%",
    margin: "7% 0% 0% 18%",
    [theme.breakpoints.down("sm")]: {
      height: "25%",
      width: "80%",
      margin: "30% 0% 0% 6%",
    },
  },
}));

function PopUpcomp2(props) {
  const classes = useStyles(props);
  return (
    <div className="popup-box">
      <div>
        <div className={classes.box}>
          <img src={props.popupBg} className={classes.boxBgImg} style={{}} />
          <img
            src={closeIcon}
            className={classes.close}
            onClick={props.handleClose}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={classes.content}>{props.content}</div>
      </div>
    </div>
  );
}
export default PopUpcomp2;
