import React, { Component } from 'react'


import Checkbox from '../helpers/Checkbox'
import Switch from '../helpers/Switch'

import logicVariables from '../../logicVariables'


class FlagRow extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { assign, value, name, onChange, port } = this.props;
    return (
      <tr style={{ verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey', height: '72px' }}>
        <td style={{ padding: '0.5em 0', fontWeight: 'bold', width: "15vw" }}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign' + name, value)} label={logicVariables[name]} />
        </td>
        {/* <td /> */}
        <td style={{ width: "85vw" }}>
          <Switch disabled={!assign} value={value || false} onChange={(value) => onChange('value' + name, value)}
            on='True' off='False' />
        </td>
      </tr>
    );
  }

}
export default FlagRow

