import React from "react";
import "./PopUpcomp.css";

import { makeStyles } from "@material-ui/core/styles";

import closeIcon from "../../../../Assets/Group_2194.png";

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
      top: "80px",
      left: "50%",
      height: "80px",
      width: "80px",
      margin: `${props.marginClose}`,
      cursor: "pointer",
      zIndex: "999",
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
    height: "80%",
    width: "68%",
    margin: "7% 0% 0% 37.5%",
    [theme.breakpoints.down("sm")]: {
      margin: "30% 0% 0% 17%",
    },
  },
}));

function PopUpcomp(props) {
  const classes = useStyles(props);
  return (
    <div className="popup-box">
      <div>
        <div className={classes.box}>
          <img src={props.popupBg} className={classes.boxBgImg} />
          <img
            src={closeIcon}
            className={classes.close}
            onClick={props.handleClose}
          />
        </div>
        <div className={classes.content}>{props.content}</div>
      </div>
    </div>
  );
}
export default PopUpcomp;
