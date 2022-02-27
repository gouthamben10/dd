import React, { Component } from "react";
import Port from "../../Components/Port/Port.js";
import Header from "../../Components/Header/Header";
class Ports extends Component {
  render() {
    return (
      <div>
        <Header prev="/learn-mid" />
        <Port />
      </div>
    );
  }
}

export default Ports;
