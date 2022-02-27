import React from "react";

// materialUI
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// icon
import fullBg from "../../../../Assets/learn_bg_bottom.png";
import learn_bg_top_left from "../../../../Assets/learn_bg_top_left.png";
import learn_bg_bottom_right from "../../../../Assets/learn_bg_bottom_right.png";
import { width } from "@material-ui/system";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${fullBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    position: "relative",
  },
  GridItem1: {},

  GridImg1: {
    height: "100%",
    width: "100%",
  },
  GridImg2: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "180px",
  },
});

function BgComp1(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={10} sm={5} className={classes.GridItem1}>
          <img className={classes.GridImg1} src={learn_bg_top_left} />
          <img src={learn_bg_bottom_right} className={classes.GridImg2} />
        </Grid>

        {props.children}
      </Grid>
    </div>
  );
}

export default BgComp1;
