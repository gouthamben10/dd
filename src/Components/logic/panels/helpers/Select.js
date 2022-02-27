import React, { Component } from "react";

import Colors from "../../Colors";

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

    console.log(this.props, "CONDITUOAN");
    if (this.props.disabled) style.background = Colors.disabledgrey;

    if (this.props.typeDropDown == "read") {
      return (
        <select
          onChange={this.onChange}
          style={style}
          value={this.props.selected}
          disabled={this.props.disabled}
        >
          {this.props.order
            ? this.props.order.map((value, index) => (
                <option className="sensor-txt" key={index} value={value}>
                  {this.props.options[value] || value}
                </option>
              ))
            : Object.keys(this.props.options).map((value, index) => (
                <option className="sensor-txt" key={index} value={value}>
                  {this.props.options[value]}
                </option>
              ))}
        </select>
      );
    } else {
      return (
        <select
          onChange={this.onChange}
          style={style}
          value={this.props.selected}
          disabled={this.props.disabled}
        >
          {this.props.order
            ? this.props.order.map((value, index) => (
                <option className="sensor-txt" key={index} value={value}>
                  {this.props.options[value] || value}
                </option>
              ))
            : Object.keys(this.props.options).map((value, index) => (
                <option className="sensor-txt" key={index} value={value}>
                  {this.props.options[value]}
                </option>
              ))}
        </select>
      );
    }
  }
}

export default Select;
