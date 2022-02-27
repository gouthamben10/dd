import { Grid } from "@material-ui/core";
import React from "react";

import section from "../../../../Assets/learn_button.png";
import learn_illus_basic from "../../../../Assets/learn_illus_basic.png";

import { makeStyles } from "@material-ui/core/styles";

const useState = makeStyles((theme) => ({
  LevelBgimg: (props) => {
    return {
      backgroundImage: `url( ${props.opptionLayout})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      height: "266px",
      marginTop: "-50px",
      [theme.breakpoints.down("sm")]: {
        height: "170px",
        width: "115%",
        marginTop: "10%",
      },
    };
  },
  LevelTitle: {
    marginTop: "10px",
    color: "#311B92",
    [theme.breakpoints.down("md")]: {
      fontSize: "2vh",
    },
  },

  LevelImg: (props) => {
    return {
      backgroundImage: `url( ${props.img})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      height: "80px",
      width: "50%",
      marginTop: "15%",
      // marginBottom: "10%",

      [theme.breakpoints.down("sm")]: {
        height: "50px",
        width: "55%",
        marginBottom: "10%",
      },
    };
  },
  LevelDescription: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px ",
    },
  },
}));

function LevelConatiner(props) {
  const classes = useState(props);

  return (
    <>
    <Grid
      container
      className={classes.LevelBgimg}
      alignItems="center"
      direction="column"
    >
      <Grid item xm={12} className={classes.LevelTitle} >
        {" "}
        <h3>{props.title}</h3>
      </Grid>
      <Grid item xm={12} className={classes.LevelImg}>
        {" "}
      </Grid>
      <Grid
        item
        xm={12}
        className={classes.LevelDescription}
        container
        direction="column"
        alignItems="center"
      >
        {" "}
        <Grid item xm={6}>
          {props.description1}
        </Grid>
        <Grid item>{props.description2}</Grid>
      </Grid>
    </Grid>
    </>
  );
}

export default LevelConatiner;
