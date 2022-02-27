import React, { Component } from "react";

import NoUISlider from "./Nouislider";

class Slider extends Component {
  constructor(props) {
    super(props);
    var { value, max, min, disabled, sliderName } = this.props;
    this.state = {
      value: value,
    };
  }
  componentDidMount() {
    var { value, max, min, disabled } = this.props;
    this.setState({ value: value });
  }

  onChange = (e, name) => {
    console.log(e, "///////////////////////////");

    console.log(name, "/////////////////");

    this.props.onChange(e, name);
    this.setState({ value: e });

    // console.log("this.props.onSlide(parseInt(e[0])))",parseInt(e[0]))
    // if(parseInt(e[0])==0){
    //   value=0;
    // }
  };
  onSlide(e) {
    this.props.onSlide(parseInt(e[0]));
    this.setState({ value: e[0] });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.value == this.props.value ||
      nextProps.disabled == this.props.disabled
    ) {
      return true;
    } else {
      return true;
    }

    // if (nextProps.changedDueToSlider) return false;
    // else return true;
  }
  updateAndNotify1 = (value) => {
    // this.props.onChange(value)
    this.setState({ value: value });
  };
  // componentDidUpdate(prevProps) {
  //   if (prevProps.value !== this.props.value) {
  //     this.updateAndNotify1(this.props.value);
  //   }
  // }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.updateAndNotify1(this.props.value);
    }
  }
  render() {
    var { value, max, min, disabled } = this.props;

    return (
      <div
        style={{
          display: "inline-block",
          // width: "86%",
          // border: "1px solid red",
          width: "100%",
          paddingRight: "10%",
          paddingLeft: "3%",
        }}
      >
        <NoUISlider
          range={{ min: min, max: max }}
          value={this.state.value}
          step={1}
          connect="lower"
          onChange={this.onChange}
          disabled={disabled}
          onSlide={this.onSlide}
          sliderName={this.props.sliderName}
        />
      </div>
    );
  }
}

export default Slider;
