import React from "react";
import "./MenuSection.css";

import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import learn_mid_menu from "../../../../Assets/learn_mid_menu.png";
import learn_mid_menuselect from "../../../../Assets/learn_mid_menuselect.png";
const useStyles = makeStyles((theme) => ({
  menuImg: {},
}));

function MenuSection4(props) {
  const classes = useStyles();
  const selectedMenu = props.selectedMenu;

  return (
    <>
      {selectedMenu === "yes" ? (
        <div className="selectPort-menu-item1">
          <img className="selectPort-menuImg2" src={learn_mid_menuselect} />
          <p className="selectPortMenu2Text">{props.title}</p>
        </div>
      ) : (
        <div className="selectPort-menu-item1">
          <img className="selectPort-menuImg" src={learn_mid_menu} />
          <p className="selectPortMenuText">{props.title}</p>
        </div>
      )}
    </>
  );
}
export default MenuSection4;
