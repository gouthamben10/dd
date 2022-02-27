import React, { Component } from 'react';

import Checkbox from '../helpers/Checkbox'
var defaultport

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {



    const { port, index, on, disabled, onChange } = this.props;
    if (port == "B12") {
      defaultport = "B"
    }
    if (port == "C12") {
      defaultport = "C"
    }

    else {
      defaultport = port;
    }
    return (
      <label style={{
        display: 'inline-block',
        width: '11.5%',
        height: '2em',
        marginBottom: "-1.7%",

        marginRight: '1%',
        background: `no-repeat center/contain url(images/8switches/${port + index + (!on ? '_off' : '')}.png)`,
      }}>
        <input type='checkbox' style={{ display: 'none' }} disabled={disabled}
          onChange={() => onChange(`value${port + index}`, !on)} />
      </label>
    )
  }
}


class SwitchesRow extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { assign, name, port, state, onChange } = this.props;
    var outputStyle;
    if (name == "OCTA SPLITTER" || name == "DUAL SPLITTER") {
      outputStyle = {
        verticalAlign: 'middle',
        color: '#FFF',
        borderBottom: '2px solid grey',
        height: '72px',
        display: 'none'
      }
    }
    else {
      outputStyle = {
        verticalAlign: 'middle',
        color: '#FFF',
        borderBottom: '2px solid grey',
        height: '72px',
      }
    }
    return (
      <tr style={outputStyle}>
        <td style={{ padding: '0.5em 0', fontWeight: 'bold' }}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign' + port, value)} label={name} />
        </td>
        <td>
          <span style={{
            fontWeight: 'bold',
            fontSize: '0.9em',
          }}>-{defaultport}</span>
        </td>
        <td colSpan={4} style={{
          width: '70%',
          padding: '1px'
        }}>
          {port.split('').map((char) => {
            return (
              <span key={char}>
                {[1, 2, 3, 4].map((index) => {
                  return <Switch port={char} index={index} on={state[`value${char + index}`]}
                    disabled={!assign} onChange={onChange} key={index} />
                })}
              </span>
            );
          })}
        </td>
      </tr>
    );
  }
}

export default SwitchesRow
