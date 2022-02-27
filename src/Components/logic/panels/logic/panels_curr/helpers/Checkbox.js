import React, { Component } from 'react'

import Colors from '../../Colors'


class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { checked, onChange, label, disabled } = this.props;
    var style = {
      width: '1.5em',
      height: '1.5em',
      display: 'inline-block',
      borderRadius: '20px',
      marginRight: '1em',
      backgroundColor: 'white',
      border: '2px solid green'
    };
    if (checked) {
      style.boxShadow = 'inset 0 0 0 0em #FFF';
      style.backgroundColor = 'green';
    }
    return (
      <label style={{ display: 'inline-block' }}>
        <input type="checkbox" checked={checked} style={{ display: 'none' }}
          onChange={() => onChange(!checked)} disabled={disabled} />
        <span style={style} />
        <span style={{ color: "black", position: 'relative', top: '-10px' }}>{label}</span>
      </label>
    );
  }
}

export default Checkbox

