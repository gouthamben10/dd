import React, { Component } from 'react';
import InputNumber from './helpers/InputNumber';

class LoopPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onChange = (value) => {
    if (value < 1) value = 1;
    else if (value > 255) value = 255;
    this.props.onChange({ times: value });
  }
  render() {
    const { state } = this.props;
    return (
      <div style={{
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: '0.5em',
        height: '72px',
        color: 'blueviolet'
      }}>
        Loop for <InputNumber value={state.times || 1} min={1} max={255}
          onChange={this.onChange} /> times
      </div>
    );
  }
}

export default LoopPanel;
