import React, { Component } from "react";
import DigitalAnalog from "../../Components/DigitalAnalog/DigitalAnalog.js";
import Header from "../../Components/Header/Header";

class Digital extends Component {
  render() {
    return (
      <React.Fragment>
        <Header prev="/" topbackbtnVisibility="false" />
        <DigitalAnalog />
      </React.Fragment>
    );
  }
}

export default Digital;
