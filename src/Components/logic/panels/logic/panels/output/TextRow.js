import React, { Component } from 'react';

import Checkbox from '../helpers/Checkbox'
import InputText from '../helpers/InputText'


class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { port, index, on, disabled, onChange } = this.props;
    return (
      <label style={{
        display: 'inline-block',
        width: '11.5%',
        height: '2em',
        marginRight: '1%',
        background: `no-repeat center/contain url(images/8switches/${port + index + (!on ? '_off' : '')}.png)`,
      }}>
        <input type='checkbox' style={{ display: 'none' }} disabled={disabled}
          onChange={() => onChange(`value${port + index}`, !on)} />
      </label>
    )
  }
}


class TextRow extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { assign, name, port, state, onChange } = this.props;
    return (
      <tr style={{ verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey', height: '72px' }}>
        <td style={{ padding: '0.5em 0', fontWeight: 'bold' }}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign' + port, value)} label={name} />
        </td>
        <td>
          <span style={{
            fontWeight: 'bold',
            fontSize: '0.9em',
          }}>-{port}</span>
        </td>
        <td style={{
          width: '70%'
        }}>
          {[1, 2, 3, 4, 5].map((char) => {
            return (
              <span key={char}>
                {[1].map((index) => {
                  return <InputText port={"dot_matrix" + char} index={index} value={state[`dot_matrix${char}`]} on={state[`value${char + index}`]}
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

// module.exports = TextRSow;
export default TextRow
