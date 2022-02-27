import React, { Component } from 'react'


import Checkbox from '../helpers/Checkbox'
import InputNumber from '../helpers/InputNumber'
import Switch from '../helpers/Switch'

import logicVariables from '../../logicVariables'


class CountRow extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  onSwitchStateChanged(key, value) {
    console.log('onSwitchStateChanged', key, value);
    this.props.onChange('assignCount' + key, value);
    if (value) {
      this.props.onChange('valueNumCount' + key, '1');
    }
  }

  render() {
    const { assign, value, valueNum, name, onChange } = this.props;
    return (
      <tr style={{ verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey', height: '72px' }}>
        <td style={{ padding: '0.5em 0', fontWeight: 'bold', width: "15vw" }}>
          <Checkbox checked={assign || false} onChange={(value) => this.onSwitchStateChanged(name, value)} label={logicVariables[name]} />
        </td>
        <td />
        <td colSpan={3}>
          <Switch disabled={!assign} value={value || false} onChange={(value) => onChange('valueCount' + name, value)}
            on='Add (+)' off='Sub (-)' />
        </td>
        <td style={{ width: "15vw" }}>
          <InputNumber disabled={!assign} value={valueNum || 1} min={0} max={255}
            style={{ padding: '0.25em 0', border: '0.25em solid #FFF', float: 'right' }}
            onChange={(value) => onChange('valueNumCount' + name, value)} />
        </td>
      </tr>
    );
  }

}

export default CountRow;
