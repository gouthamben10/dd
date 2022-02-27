import React, { Component } from 'react'

import Select from '../helpers/Select'
import Checkbox from '../helpers/Checkbox'
import InputNumber from '../helpers/InputNumber'


import logicVariables from '../../logicVariables'
import Colors from '../../Colors'

// const AssignRow = React.createClass({
class AssignRow extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { name, assign, value, valuenum, onChange, SelectOptionsOrder } = this.props;
    return (
      <tr style={{ verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey', height: '72px', width: "98vw" }}>
        <td style={{ padding: '0.5em 0', fontWeight: 'bold', width: "15vw" }}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign' + name, value)} label='ASSIGN' />
        </td>
        {/* <td /> */}
        <td>
          <span style={{
            display: 'inline-block',
            margin: '0',
            border: '3px solid #FFF',
            padding: '0.25em 0',
            backgroundColor: Colors.blueshade,
            width: '25vw',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>{logicVariables[name]}</span>
        </td>
        <td style={{ textAlign: 'center' }}><span className='comp_lgc_pnl_out_equal' style={{ width: '100%', color: "black", fontSize: "2vw", margin: '0px 30px 0px 20px' }}> = </span></td>
        <td>
          <Select disabled={!assign} options={logicVariables} order={SelectOptionsOrder} selected={value}
            onChange={(value) => onChange('value' + name, value)} color='#FFF'
            style={{
              margin: '0 15%',
              color: 'black',
              padding: '0.25em 0',
              fontWeight: 'bold',
              width: '25vw',
              background: 'white',
              textAlign: 'center',
            }} />
        </td>
        <td>
          {(!value || value === 'edt') ? (
            <InputNumber disabled={!assign} value={valuenum || 0} onChange={(value) => onChange('valuenum' + name, value)}
              max={65535} min={0} style={{ padding: '0.25em 0', float: 'right' }} />
          ) : null}
        </td>
      </tr>
    );
  }
}

export default AssignRow
// module.exports = AssignRow;
