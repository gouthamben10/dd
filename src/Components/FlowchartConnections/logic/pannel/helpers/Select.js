import React, { Component } from "react";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    var style = {
      border: "2.1px solid #3C413E",
      borderRadius: "15px",
      color: "#000",
      background: "#FFF",
      height: "57px",
      width: "30em",
      margin: "1em",
      outline: "none",
      texAlign: "center",
      fontFamily: "Halcyon_Medium !important",
    };

    return (
      <select onChange={this.onChange} style={style}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    );
  }
}

export default Select;
