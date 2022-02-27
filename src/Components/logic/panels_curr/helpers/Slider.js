import React, { Component } from 'react'
import OnlySlider from './OnlySlider'
import InputNumber from './InputNumber'

var avoidSliderUpdate = false;


class Slider extends Component {
  constructor(props) {
    super(props);
    var { value, max, min, disabled } = this.props;
    this.state = {
      value: value,
      disabled: disabled
    }
  }
  // componentDidMount() {
  //   var { value, max, min, disabled } = this.props;
  //   this.setState({ value: value })



  // }

  updateValue = (value, shouldSliderNotUpdate) => {
    console.log("updateValue:" + value + ":" + shouldSliderNotUpdate);
    console.log("updateValue is Getting caleed", this.props);
    value = parseInt(value);
    if (value === this.props.value) return;
    const { min, max } = this.props;
    if (value > max) value = max;
    else if (value < min) value = min;
    if (shouldSliderNotUpdate) avoidSliderUpdate = true;
    console.log("2updateValue:" + value + ":" + shouldSliderNotUpdate);
    this.setState({ value: value })
    this.props.onChange(value);
  }
  onSliderChange = (value) => {
    console.log("ON SLIDER CHANGE IS CALLED  22222222", value);
    this.setState({ value: value })

    this.updateValue(value, true);
  }
  onInputChange = (value) => {
    this.updateValue(value);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value == this.props.value || nextProps.disabled == this.props.disabled) {
      return true;
    } else {
      this.setState({ disabled: this.props.disabled })
      return true;
    }
  }
  updateAndNotify1 = (value) => {
    console.log("Notify...", value)
    // this.props.onChange(value)
    this.setState({ value: value })

  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.updateAndNotify1(this.props.value);
    }
  }

  render() {
    const { value, max, min, disabled } = this.props;
    console.log("valuechange Slider1", this.props.value, this.state.value);
    const oldAvoidSliderUpdate = avoidSliderUpdate;
    avoidSliderUpdate = false;
    return (
      <div style={{ display: 'inline-block', width: '100%' }}>
        <table width='100%'>
          <tbody>
            <tr style={{ verticalAlign: 'middle' }}>
              <td style={{ width: '90%', height: '2px' }}>
                <OnlySlider value={this.state.value} onChange={this.onSliderChange}
                  onSlide={this.onSliderChange}
                  changedDueToSlider={oldAvoidSliderUpdate}
                  max={max} min={min} disabled={disabled} />
              </td>
              <td style={{ width: '20%' }}>
                <InputNumber style={{ float: 'right' }} value={this.state.value} onChange={this.onInputChange}
                  max={max} min={min} disabled={disabled} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default Slider;
