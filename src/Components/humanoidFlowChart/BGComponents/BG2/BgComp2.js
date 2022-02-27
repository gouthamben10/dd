import React from "react";

// materialUI
import { makeStyles } from "@material-ui/core/styles";

// icon
import learn_mid_bg from "../../../../Assets/learn_mid_bg.png";
const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${learn_mid_bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundColor: "#fff",
    position: "relative",
  },
});

function BgComp2(props) {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
}

export default BgComp2;
